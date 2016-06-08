var workspace = Blockly.inject('blocklyDiv', {toolbox: document.getElementById('toolbox')});

var runCode = function() {
    var code = Blockly.JavaScript.workspaceToCode(workspace);
    var myInterpreter = new Interpreter(code, initApi);
    myInterpreter.run();
}

function initApi(interpreter, scope) {
    // Add an API function for the alert() block.
    var wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(alert(text));
    };
    interpreter.setProperty(scope, 'alert',
                            interpreter.createNativeFunction(wrapper));

    // Add an API function for the prompt() block.
    wrapper = function(text) {
        text = text ? text.toString() : '';
        return interpreter.createPrimitive(prompt(text));
    };
    interpreter.setProperty(scope, 'prompt',
                            interpreter.createNativeFunction(wrapper));
}
