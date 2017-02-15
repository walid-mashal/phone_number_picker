odoo.define('phone_number_picker', function (require) {
"use strict";

var core = require('web.core');
var char_field = require('web.form_widgets').FieldChar;
var common = require('web.form_common');

var PhoneWidget = char_field.extend(common.ReinitializeFieldMixin,{
    template: "FieldPhone",
    events: {
        "click .dialDigit": "dialDigitClickHandler",
        "click #phoneNo": "inputBoxClickHandler",
    },
    init: function(parent, options) {
        this._super.apply(this, arguments);
        this.$input = this.$el.find("#phoneNo");
    },
    start: function(){
    	var self = this;
    	self._super();
    	self.createTable();
    	$("body").click(function(){
    		self.inputFocusOutClickHandler(this);
    	})
    },
    createTable:function(){
    	var dial = document.createElement('table');
        dial.setAttribute('id', 'dial');
        dial.style.position="absolute";
        dial.style.visibility="hidden";
        for (var rowNum = 0; rowNum < 4; rowNum++) {
          var row = dial.insertRow(rowNum);
          for (var colNum = 0; colNum < 3; colNum++) {
            if (rowNum === 3) {
              var cell = row.insertCell(colNum);
              cell.textContent = 'Del';
              cell.className = 'dialDigit';
              cell.style.paddingTop = "5px";
              cell.style.paddingLeft = "10px";
              cell = row.insertCell(colNum);
              cell.textContent = '0';
              cell.className = 'dialDigit';
              cell.style.paddingTop = "5px";
              cell.style.paddingLeft = "20px";

              cell = row.insertCell(colNum);
              cell.textContent = '+';
              cell.className = 'dialDigit';
              cell.style.paddingTop = "5px";
              cell.style.paddingLeft = "20px";
              break;
            }
            cell = row.insertCell(colNum);
            cell.className = 'dialDigit';
            cell.textContent = ((colNum + 1) + (rowNum * 3)).toString();
            cell.style.paddingTop = "5px";
            cell.style.paddingLeft = "20px";
          }
        }
        var res = this.$el.append(dial);
    },
    inputBoxClickHandler:function(){
    	var tables = document.getElementsByTagName("table");
    	for(var i=0; i < tables.length; i++){
    		if(tables[i].id == 'dial'){
		    	if(tables[i].style.visibility === 'visible'){
		    		tables[i].style.visibility = 'hidden';
		    	}
	    	}
    	}
    	var dial = this.$el.find('table');
        var vis = dial[0].style.visibility === 'hidden' || dial[0].style.visibility === '' ? 'visible' : 'hidden';
        if (vis === "visible"){
        	dial[0].style.position = 'absolute';
        }
        dial[0].style.visibility = vis;
    },
    dialDigitClickHandler:function(e){
    	var phoneNo = this.$el.find('#phoneNo')[0];
    	var phone = null;
    	
    	if(e.currentTarget.innerText == 'Del'){
    		phone = phoneNo.value.slice(0,-1);
    	}else{
            phone = phoneNo.value + e.currentTarget.innerText;
    	}
        phoneNo.value = phone;
        phoneNo.focus();
    },
    inputFocusOutClickHandler: function(e){
    	if(("phoneNo" != document.activeElement.id) && (document.activeElement.className != "dialDigit")){
        	var dial = this.$el.find('table')[0];
            dial.style.visibility = "hidden";
    	}
    },
    render_value: function () {
    	this._super();
        this.createTable();
    }
});

core.form_widget_registry.add('phone', PhoneWidget);
});