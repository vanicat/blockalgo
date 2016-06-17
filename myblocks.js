// © 2016 Rémi Vanicat (vanicat@debian.org)
//
// Vous pouvez uitilisez, modifier et redistribuer ce code suivant les
// termes de licence APACHE Version 2.0 (Fichier LICENSE)
//
// Ce fichier contient les modifications et ajout à la bibliothèque blockly de Google
// Une partie de ce code a été généré par l'app blockfactory de google, les
// liens se trouvent dans les commentaires.
//
// Il contient du code modifié de blockly:
// * Copyright 2012 Google Inc.
// * https://developers.google.com/blockly/
// * Licensed under the Apache License, Version 2.0 (the "License");
// * you may not use this file except in compliance with the License.
// * You may obtain a copy of the License at
// *
// *   http://www.apache.org/licenses/LICENSE-2.0
// *
// * Unless required by applicable law or agreed to in writing, software
// * distributed under the License is distributed on an "AS IS" BASIS,
// * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// * See the License for the specific language governing permissions and
// * limitations under the License.


//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#6f7hfn

Blockly.Blocks['variables_affectation'] = {
  init: function() {
    this.appendValueInput("value")
        .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR")
        .appendField("prend la valeur");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['variables_affectation'] = function(block) {
  var variable_name = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('VAR'), Blockly.Variables.NAME_TYPE);
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
        .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(330);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['variables_lire'] = function(block) {
  var display_name = block.getFieldValue('VAR');
  var variable_name = Blockly.JavaScript.variableDB_.getName(display_name, Blockly.Variables.NAME_TYPE);
  // TODO: Assemble JavaScript into code variable.
  var code = variable_name + ' = ' + 'parseFloat(prompt(\'' + display_name + ': \'));\n';
  return code;
};

// Change the flyoutCategory function. This is derived from Google's flyoutCategory
Blockly.Variables.flyoutCategory = function(workspace) {
  var variableList = Blockly.Variables.allVariables(workspace);
  variableList.sort(goog.string.caseInsensitiveCompare);
  // In addition to the user's variables, we also want to display the default
  // variable name at the top.  We also don't want this duplicated if the
  // user has created a variable of the same name.
  goog.array.remove(variableList, Blockly.Msg.VARIABLES_DEFAULT_NAME);
  variableList.unshift(Blockly.Msg.VARIABLES_DEFAULT_NAME);

  var xmlList = [];
  for (var i = 0; i < variableList.length; i++) {
    if (Blockly.Blocks['variables_affectation']) {
      // <block type="variables_affectation" gap="8">
      //   <field name="VAR">item</field>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'variables_affectation');
      block.setAttribute('gap', 8);

      var field = goog.dom.createDom('field', null, variableList[i]);
      field.setAttribute('name', 'VAR');
      block.appendChild(field);
      xmlList.push(block);
    }
    if (Blockly.Blocks['variables_get']) {
      // <block type="variables_get" gap="24">
      //   <field name="VAR">item</field>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'variables_get');
      block.setAttribute('gap', 8);

      var field = goog.dom.createDom('field', null, variableList[i]);
      field.setAttribute('name', 'VAR');
      block.appendChild(field);
      xmlList.push(block);
    }
    if (Blockly.Blocks['variables_lire']) {
      // <block type="variables_get" gap="24">
      //   <field name="VAR">item</field>
      // </block>
      var block = goog.dom.createDom('block');
      block.setAttribute('type', 'variables_lire');
      block.setAttribute('gap', 24);

      var field = goog.dom.createDom('field', null, variableList[i]);
      field.setAttribute('name', 'VAR');
      block.appendChild(field);
      xmlList.push(block);
    }
  }
  return xmlList;
};


// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3hc9fz
Blockly.Blocks['controls_pour'] = {
  init: function() {
    this.appendValueInput("FROM")
        .setCheck("Number")
        .appendField("répéter pour")
        .appendField(new Blockly.FieldVariable(Blockly.Msg.VARIABLES_DEFAULT_NAME), "VAR")
        .appendField("allant de");
    this.appendValueInput("TO")
        .setCheck("Number")
        .appendField("à");
    this.appendValueInput("BY")
        .setCheck(null)
        .appendField("avec pas de");
    this.appendStatementInput("DO")
        .setCheck(null)
        .appendField("faire");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['controls_pour'] = Blockly.JavaScript['controls_for'];

Blockly.Msg.VARIABLES_DEFAULT_NAME = "x";
