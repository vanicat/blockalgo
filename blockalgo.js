// © 2016 Rémi Vanicat (vanicat@debian.org)
//
// Vous pouvez uitilisez, modifier et redistribuer ce code suivant les
// termes de la licence APACHE Version 2.0 (Fichier LICENSE)

var workspace = Blockly.inject('blocklyDiv', {toolbox: document.getElementById('toolbox')});
var myInterpreter;

var firstrun = true;


function myUpdateFunction(event) {
    var code = Blockly.JavaScript.workspaceToCode(workspace);

    document.getElementById('code').innerHTML = code;
    var xmlDom = Blockly.Xml.workspaceToDom(workspace);
    var xmlText = Blockly.Xml.domToPrettyText(xmlDom);

    document.getElementById('xml').value = xmlText;
}

workspace.addChangeListener(myUpdateFunction);

var runButton = function() {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    if(firstrun) {
        firstrun = false;
    } else {
        var console = document.getElementById('console');

        var n = document.createElement('br');
        console.appendChild(n);

        n = document.createElement('hr');
        console.appendChild(n);
    }

    var div = document.getElementById('code');
    div.innerHTML = code;


    myInterpreter = new Interpreter(code, initApi);
    var runCode = function () {
        if(myInterpreter.run()) {
            // Ran until an async call.  Give this call a chance to run.
            // Then start running again later.
            // 1000ms is waaay too long, but is used here to demo the pause.
            setTimeout(runCode, 10);
        };
    };
    runCode();
};

var clean = function () {
    var div = document.getElementById('console');
    div.innerHTML = "";
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
}

function loadWorkspace() {
    var xmlText = localStorage.getItem("blockly.xml");
    if (xmlText) {
        workspace.clear();
        xmlDom = Blockly.Xml.textToDom(xmlText);
        Blockly.Xml.domToWorkspace(workspace, xmlDom);
    }
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
    // Add an API function for the alert() block.
    var wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(displayText(text));
    };

    interpreter.setProperty(scope, 'alert',
                            interpreter.createNativeFunction(wrapper));

    // Add an API function for the prompt() block.
    wrapper = function(text,callback) {
        text = text ? text.toString() : '';
        promptOk = function () {
            var div = document.getElementById('console');
            var input = document.getElementById('input'+promptId);
            var button = document.getElementById('button'+promptId);

            input.disabled = true;
            button.disabled = true;

            var value = input.value;
            callback(interpreter.createPrimitive(value));
        };
        return consolePrompt(text);
    };
    interpreter.setProperty(scope, 'prompt',
                            interpreter.createAsyncFunction(wrapper));
};
