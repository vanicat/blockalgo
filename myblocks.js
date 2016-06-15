//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#6f7hfn

Blockly.Blocks['variables_affectation'] = {
  init: function() {
    this.appendValueInput("value")
        .appendField(new Blockly.FieldVariable("variable"), "NAME")
        .appendField("prend la valeur");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['variables_affectation'] = function(block) {
  var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = variable_name + ' = ' + value_value + ';\n';
  return code;
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#4okpf7

Blockly.Blocks['variables_lire'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Lire")
        .appendField(new Blockly.FieldVariable("variable"), "NAME");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['variables_lire'] = function(block) {
  var display_name = block.getFieldValue('NAME');
  var variable_name = Blockly.JavaScript.variableDB_.getName(display_name, Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = variable_name + ' = ' + 'parseFloat(prompt(\'' + display_name + ': \'));\n';
  return code;
};


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html

Blockly.Blocks['controls_pour'] = {
  init: function() {
    this.appendValueInput("FROM")
        .setCheck("Number")
        .appendField("répéter pour ")
        .appendField(new Blockly.FieldVariable("variable"), "VAR")
        .appendField("allant de");
    this.appendValueInput("TO")
        .setCheck("Number")
        .appendField("à");
    this.appendValueInput("BY")
        .setCheck("Number")
        .appendField("par");
    this.appendStatementInput("DO")
        .setCheck(null);
    this.setInputsInline(true);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['controls_pour'] = Blockly.JavaScript['controls_for'];
