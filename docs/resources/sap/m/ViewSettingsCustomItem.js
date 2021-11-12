/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ViewSettingsItem","./library"],function(t,o){"use strict";var e=t.extend("sap.m.ViewSettingsCustomItem",{metadata:{library:"sap.m",properties:{filterCount:{type:"int",group:"Behavior",defaultValue:0}},aggregations:{customControl:{type:"sap.ui.core.Control",multiple:false}}}});e.prototype.init=function(){this.attachEvent("modelContextChange",function(){this._control&&this._control.setModel(this.getModel())}.bind(this))};e.prototype.exit=function(){if(this._control&&!this._control.getParent()){this._control.destroy();delete this._control}};e.prototype.setCustomControl=function(t){this._control=t;return this};e.prototype.getCustomControl=function(){return this._control};e.prototype.setFilterCount=function(t){this.setProperty("filterCount",t,true);return this};e.prototype.setSelected=function(t){this.setProperty("selected",t,true);return this};e.prototype.clone=function(o,e,r){var n=t.prototype.clone.apply(this,arguments);n._control=this._control.clone();return n};return e});