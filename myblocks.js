//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#6f7hfn

Blockly.Blocks['affectation'] = {
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

Blockly.JavaScript['affectation'] = function(block) {
  var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('NAME'), Blockly.Variables.NAME_TYPE);
  var value_value = Blockly.JavaScript.valueToCode(block, 'value', Blockly.JavaScript.ORDER_ATOMIC);
  // TODO: Assemble JavaScript into code variable.
  var code = variable_name + ' = ' + value_value + ';\n';
  return code;
};
