// © 2016 Rémi Vanicat (vanicat@debian.org)
//
// Vous pouvez uitilisez, modifier et redistribuer ce code suivant les
// termes de la licence APACHE Version 2.0 (Fichier LICENSE)

// injecting
var blocklyArea = document.getElementById('blocklyArea');
var blocklyDiv = document.getElementById('blocklyDiv');
var workspace = null;

var onresize = function(e) {
    // Compute the absolute coordinates and dimensions of blocklyArea.
    var element = blocklyArea;
    var x = 0;
    var y = 0;
    do {
        x += element.offsetLeft;
        y += element.offsetTop;
        element = element.offsetParent;
    } while (element);
    console.log("resize",x,y,blocklyArea.offsetWidth,blocklyArea.offsetHeight);
    // Position blocklyDiv over blocklyArea.
    blocklyDiv.style.left = x + 'px';
    blocklyDiv.style.top = y + 'px';
    blocklyDiv.style.width = blocklyArea.offsetWidth + 'px';
    blocklyDiv.style.height = blocklyArea.offsetHeight + 'px';
    if(!workspace) {
        workspace = Blockly.inject(blocklyDiv,
                                   {toolbox: document.getElementById('toolbox')});
        workspace.addChangeListener(myUpdateFunction);
    }
};

window.addEventListener('resize', onresize, false);
window.addEventListener('load', onresize, false);

function myUpdateFunction(event) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);

    document.getElementById('code').innerHTML = code;
    var xmlDom = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);

    document.getElementById('xml').value = xmlText;
}

var myInterpreter;
var firstrun = true;
var highlightPause = false;
var readPause = false;
var pauseLength = 200;
var code;

var showClass = function(c){
    var elementList = document.getElementsByClassName(c);
    for(var i = 0; i < elementList.length; i++){
        var element = elementList[i];
        element.className = element.className.replace( /(?:^|\s)hidden(?!\S)/g , '' );
    }
};

var hideClass = function(c){
    var elementList = document.getElementsByClassName(c);
    for(var i = 0; i < elementList.length; i++){
        var element = elementList[i];
        element.className += " hidden";
    }
};

var showRunningElement = function() {
    showClass("running");
    hideClass("notrunning");
    console.log(workspace);
    onresize();
    workspace.setVisible(false);
};

var hideRunningElement = function() {
    showClass("notrunning");
    hideClass("running");
    onresize();
    workspace.setVisible(true);
};

var runButton = function() {
    var old_statement_prefix = Blockly.JavaScript.STATEMENT_PREFIX;
    Blockly.JavaScript.STATEMENT_PREFIX = 'highlightBlock(%1);\n';
    code = Blockly.JavaScript.workspaceToCode(workspace);
    Blockly.JavaScript.STATEMENT_PREFIX = old_statement_prefix;

    showRunningElement();
};

var stopIt = function() {
    hideRunningElement();
};

var runIt = function() {
    if(firstrun) {
        firstrun = false;
    } else {
        var console = document.getElementById('console');

        var n = document.createElement('br');
        console.appendChild(n);

        n = document.createElement('hr');
        console.appendChild(n);
    }

    highlightPause = false;

    myInterpreter = new Interpreter(code, initApi);
    workspace.traceOn(true);
    workspace.highlightBlock(null);

    var runCode = function () {
        if(myInterpreter.step()) {
            if(readPause) {
                setTimeout(runCode, 250);
            } else if(highlightPause) {
                setTimeout(runCode, pauseLength);
                highlightPause = false;
            } else {
                runCode();
            }
        };
    };
    runCode();
};

var clean = function () {
    var div = document.getElementById('console');
    div.innerHTML = "";
    firstrun = true;
}

function displayText(text) {
    var div = document.getElementById('console');
    var t = document.createTextNode(text);
    div.appendChild(t);
}

function displayTextLN(text) {
    var div = document.getElementById('console');
    var n = document.createTextNode(text);
    div.appendChild(n);
    n = document.createNode('br');
    div.appendChild(n);
}

function saveWorkspace() {
    var xmlDom = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);

    localStorage.setItem("blockly.xml", xmlText);
    var blob = new window.Blob([xmlText], { type: "text/plain;charset=utf-8;"});
    saveAs(blob, "program.xml");
}

function loadWorkspace() {
    var xmlText = localStorage.getItem("blockly.xml");
    if (xmlText) {
        workspace.clear();
        var xmlDom = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(workspace, xmlDom);
    }
}

function openWorkspace() {
    var fileElem = document.getElementById("fileElem");
    fileElem.click();
}

function realyOpenWorkspace(e) {
    var file;
    if (!e) {
        file = document.getElementById("fileElem").files;
    } else {
        file = e.dataTranfer.files;
    }
    var loading = new FileReader();
    loading.readAsText(file[0]);
    loading.onloadend = function(e) {
        var xmlText = e.target.result;
        if (xmlText) {
            workspace.clear();
            var xmlDom = Blockly.Xml.textToDom(xmlText);
            Blockly.Xml.domToWorkspace(workspace, xmlDom);
        }
    };
}


var promptId;
var promptOk;

function consolePrompt(text) {
    var div = document.getElementById('console');

    var n = document.createTextNode(text);
    div.appendChild(n);

    n = document.createElement('input');
    n.setAttribute('type', 'number');
    promptId = Date.now();
    n.setAttribute('name', promptId);
    n.setAttribute('id', 'input' + promptId);
    n.setAttribute('onchange', 'promptOk();');
    div.appendChild(n);
    n.focus();

    n = document.createElement('button');
    n.setAttribute('type', 'button');
    n.setAttribute('onclick', 'promptOk();');
    n.setAttribute('id', 'button' + promptId);

    n.innerHTML = 'ok';
    div.appendChild(n);

    n = document.createElement('br');
    div.appendChild(n);
}

function initApi(interpreter, scope) {
    // Add an API function for the display() block.
    var wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(displayText(text));
    };

    interpreter.setProperty(scope, 'display',
                            interpreter.createNativeFunction(wrapper));

    // Add an API function for the prompt() block.
    wrapper = function(text,callback) {
        text = text ? text.toString() : '';
        readPause = true;
        promptOk = function () {
            var div = document.getElementById('console');
            var input = document.getElementById('input'+promptId);
            var button = document.getElementById('button'+promptId);

            input.disabled = true;
            button.disabled = true;
            readPause = false;

            var value = input.value;
            callback(interpreter.createPrimitive(value));
        };
        return consolePrompt(text);
    };
    interpreter.setProperty(scope, 'prompt',
                            interpreter.createAsyncFunction(wrapper));

    wrapper = function(id) {
        id = id ? id.toString() : '';
        workspace.highlightBlock(id);
        highlightPause = true;
        return interpreter.createPrimitive(null);
    };
    interpreter.setProperty(scope, 'highlightBlock',
                            interpreter.createNativeFunction(wrapper));
};

Blockly.JavaScript.addReservedWords('highlightBlock');
