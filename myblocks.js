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

    var variableList = workspace.variableList;
    variableList.sort(goog.string.caseInsensitiveCompare);

    var xmlList = [];
    var button = goog.dom.createDom('button');
    button.setAttribute('text', Blockly.Msg.NEW_VARIABLE);
    xmlList.push(button);

    if (variableList.length > 0) {
        if (Blockly.Blocks['variables_set']) {
            // <block type="variables_set" gap="20">
            //   <field name="VAR">item</field>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'variables_set');
            if (Blockly.Blocks['math_change']) {
                block.setAttribute('gap', 8);
            } else {
                block.setAttribute('gap', 24);
            }
            var field = goog.dom.createDom('field', null, variableList[0]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);
            xmlList.push(block);
        }
        if (Blockly.Blocks['variables_lire']) {
            // <block type="variables_lire">
            //   <value name="DELTA">
            //     <shadow type="math_number">
            //       <field name="NUM">1</field>
            //     </shadow>
            //   </value>
            // </block>
            var block = goog.dom.createDom('block');
            block.setAttribute('type', 'variables_lire');
            if (Blockly.Blocks['variables_get']) {
                block.setAttribute('gap', 20);
            }
            var field = goog.dom.createDom('field', null, variableList[0]);
            field.setAttribute('name', 'VAR');
            block.appendChild(field);

            xmlList.push(block);
        }

        for (var i = 0; i < variableList.length; i++) {
            if (Blockly.Blocks['variables_get']) {
                // <block type="variables_get" gap="8">
                //   <field name="VAR">item</field>
                // </block>
                var block = goog.dom.createDom('block');
                block.setAttribute('type', 'variables_get');
                if (Blockly.Blocks['variables_set']) {
                    block.setAttribute('gap', 8);
                }
                var field = goog.dom.createDom('field', null, variableList[i]);
                field.setAttribute('name', 'VAR');
                block.appendChild(field);
                xmlList.push(block);
            }
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

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#kkwhhq
Blockly.Blocks['text_afficher'] = {
  init: function() {
    this.appendValueInput("TEXT")
        .setCheck(null)
        .appendField("afficher");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["avec un retour à la ligne", "LF"], ["sans retour à la ligne", "NOLF"]]), "NEWLINE");
    this.setInputsInline(true);
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(160);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.JavaScript['text_afficher'] = function(block) {
    var value_text = Blockly.JavaScript.valueToCode(block, 'TEXT', Blockly.JavaScript.ORDER_ATOMIC);
    var dropdown_newline = block.getFieldValue('NEWLINE');
    // TODO: Assemble JavaScript into code variable.
    var code = 'display(' + value_text + ');\n';
    if(dropdown_newline == "LF") {
        code += 'display(\'\\n\');\n';
    }
    return code;
};

// https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#27d22b
Blockly.Blocks['math_compute'] = {
    init: function() {
        this.appendDummyInput()
            .appendField("Calcule:")
            .appendField(new Blockly.FieldTextInput("x*x"), "FORMULA");
        this.setInputsInline(true);
        this.setOutput(true, "Number");
        this.setColour(230);
        this.setTooltip('');
        this.setHelpUrl('http://www.example.com/');
    }
};

Blockly.JavaScript['math_compute'] = function(block) {
    var text_formula = block.getFieldValue('FORMULA');
    // TODO: Assemble JavaScript into code variable.
    var code = text_formula;
    // TODO: Change ORDER_NONE to the correct strength.
    return [code, Blockly.JavaScript.ORDER_NONE];
};

Blockly.Msg.VARIABLES_DEFAULT_NAME = "x";
