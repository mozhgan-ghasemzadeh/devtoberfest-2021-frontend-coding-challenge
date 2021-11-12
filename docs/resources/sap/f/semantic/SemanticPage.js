/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/f/library","sap/f/DynamicPage","sap/f/DynamicPageTitle","sap/f/DynamicPageHeader","sap/m/OverflowToolbar","sap/m/ActionSheet","./SemanticTitle","./SemanticFooter","./SemanticShareMenu","./SemanticConfiguration","./SemanticPageRenderer"],function(t,e,i,o,n,a,r,s,l,g,c,p){"use strict";var u=e.DynamicPageTitleArea;var m=t.extend("sap.f.semantic.SemanticPage",{metadata:{library:"sap.f",properties:{headerExpanded:{type:"boolean",group:"Behavior",defaultValue:true},headerPinnable:{type:"boolean",group:"Behavior",defaultValue:true},preserveHeaderStateOnScroll:{type:"boolean",group:"Behavior",defaultValue:false},toggleHeaderOnTitleClick:{type:"boolean",group:"Behavior",defaultValue:true},showFooter:{type:"boolean",group:"Behavior",defaultValue:false},titlePrimaryArea:{type:"sap.f.DynamicPageTitleArea",group:"Appearance",defaultValue:u.Begin,deprecated:true},titleAreaShrinkRatio:{type:"sap.f.DynamicPageTitleShrinkRatio",group:"Appearance",defaultValue:"1:1.6:1.6"},fitContent:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"content",aggregations:{titleHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null,forwarding:{getter:"_getTitle",aggregation:"heading"}},titleExpandedHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null,forwarding:{getter:"_getTitle",aggregation:"expandedHeading"}},titleSnappedHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null,forwarding:{getter:"_getTitle",aggregation:"snappedHeading"}},titleBreadcrumbs:{type:"sap.m.IBreadcrumbs",multiple:false,defaultValue:null,forwarding:{getter:"_getTitle",aggregation:"breadcrumbs"}},titleSnappedOnMobile:{type:"sap.m.Title",multiple:false,forwarding:{getter:"_getTitle",aggregation:"snappedTitleOnMobile"}},titleSnappedContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getTitle",aggregation:"snappedContent"}},titleExpandedContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getTitle",aggregation:"expandedContent"}},titleContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getTitle",aggregation:"content"}},titleMainAction:{type:"sap.f.semantic.TitleMainAction",multiple:false},editAction:{type:"sap.f.semantic.EditAction",multiple:false},deleteAction:{type:"sap.f.semantic.DeleteAction",multiple:false},copyAction:{type:"sap.f.semantic.CopyAction",multiple:false},addAction:{type:"sap.f.semantic.AddAction",multiple:false},flagAction:{type:"sap.f.semantic.FlagAction",multiple:false},favoriteAction:{type:"sap.f.semantic.FavoriteAction",multiple:false},fullScreenAction:{type:"sap.f.semantic.FullScreenAction",multiple:false},exitFullScreenAction:{type:"sap.f.semantic.ExitFullScreenAction",multiple:false},closeAction:{type:"sap.f.semantic.CloseAction",multiple:false},titleCustomTextActions:{type:"sap.m.Button",multiple:true},titleCustomIconActions:{type:"sap.m.OverflowToolbarButton",multiple:true},headerContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getHeader",aggregation:"content"}},content:{type:"sap.ui.core.Control",multiple:false},footerMainAction:{type:"sap.f.semantic.FooterMainAction",multiple:false},messagesIndicator:{type:"sap.f.semantic.MessagesIndicator",multiple:false},draftIndicator:{type:"sap.m.DraftIndicator",multiple:false},positiveAction:{type:"sap.f.semantic.PositiveAction",multiple:false},negativeAction:{type:"sap.f.semantic.NegativeAction",multiple:false},footerCustomActions:{type:"sap.m.Button",multiple:true},discussInJamAction:{type:"sap.f.semantic.DiscussInJamAction",multiple:false},saveAsTileAction:{type:"sap.m.Button",multiple:false},shareInJamAction:{type:"sap.f.semantic.ShareInJamAction",multiple:false},sendMessageAction:{type:"sap.f.semantic.SendMessageAction",multiple:false},sendEmailAction:{type:"sap.f.semantic.SendEmailAction",multiple:false},printAction:{type:"sap.f.semantic.PrintAction",multiple:false},customShareActions:{type:"sap.m.Button",multiple:true},landmarkInfo:{type:"sap.f.DynamicPageAccessibleLandmarkInfo",multiple:false,forwarding:{getter:"_getPage",aggregation:"landmarkInfo"}},_dynamicPage:{type:"sap.f.DynamicPage",multiple:false,visibility:"hidden"}},dnd:{draggable:false,droppable:true},designtime:"sap/f/designtime/SemanticPage.designtime"}});m._EVENTS={SHARE_MENU_CONTENT_CHANGED:"_shareMenuContentChanged"};m._SAVE_AS_TILE_ACTION="saveAsTileAction";m.CONTENT_PADDING_CLASSES_TO_FORWARD={sapUiNoContentPadding:true,sapUiContentPadding:true,sapUiResponsiveContentPadding:true};m.ARIA_ROLE_DESCRIPTION="SEMANTIC_PAGE_ROLE_DESCRIPTION";m.prototype.init=function(){this._bSPBeingDestroyed=false;this._initDynamicPage();this._attachShareMenuButtonChange();this._fnActionSubstituteParentFunction=function(){return this}.bind(this)};m.prototype.exit=function(){this._bSPBeingDestroyed=true;this._cleanMemory()};m.prototype.setHeaderExpanded=function(t){this._getPage().setHeaderExpanded(t);return this};m.prototype.getHeaderExpanded=function(){return this._getPage().getHeaderExpanded()};m.prototype.setHeaderPinnable=function(t){var e=this._getPage(),i=e.getHeader();i.setPinnable(t);return this.setProperty("headerPinnable",i.getPinnable(),true)};m.prototype.setPreserveHeaderStateOnScroll=function(t){var e=this._getPage();e.setPreserveHeaderStateOnScroll(t);return this.setProperty("preserveHeaderStateOnScroll",e.getPreserveHeaderStateOnScroll(),true)};m.prototype.setToggleHeaderOnTitleClick=function(t){this._getPage().setToggleHeaderOnTitleClick(t);return this.setProperty("toggleHeaderOnTitleClick",t,true)};m.prototype.setShowFooter=function(t){this._getPage().setShowFooter(t);return this.setProperty("showFooter",t,true)};m.prototype.setTitlePrimaryArea=function(t){var e=this._getTitle();e.setPrimaryArea(t);return this.setProperty("titlePrimaryArea",e.getPrimaryArea(),true)};m.prototype.setTitleAreaShrinkRatio=function(t){var e=this._getTitle();e.setAreaShrinkRatio(t);return this.setProperty("titleAreaShrinkRatio",e.getAreaShrinkRatio(),true)};m.prototype.setFitContent=function(t){this._getPage().setFitContent(t);return this.setProperty("fitContent",t,true)};m.prototype.addStyleClass=function(e,i){var o=this.getAggregation("_dynamicPage");if(m.CONTENT_PADDING_CLASSES_TO_FORWARD[e]){o.addStyleClass(e,true)}return t.prototype.addStyleClass.call(this,e,i)};m.prototype.removeStyleClass=function(e,i){var o=this.getAggregation("_dynamicPage");if(m.CONTENT_PADDING_CLASSES_TO_FORWARD[e]){o.removeStyleClass(e,true)}return t.prototype.removeStyleClass.call(this,e,i)};m.prototype.setAggregation=function(e,i,o){var n=this.mAggregations[e],a,r;if(n===i){return this}i=this.validateAggregation(e,i,false);if(e===m._SAVE_AS_TILE_ACTION){a=m._SAVE_AS_TILE_ACTION}else{a=this.getMetadata().getManagedAggregation(e).type}if(c.isKnownSemanticType(a)){r=c.getPlacement(a);if(n){this._onRemoveAggregation(n,a);this._getSemanticContainer(r).removeContent(n,r)}if(i){i._getType=function(){return a};this._getSemanticContainer(r).addContent(i,r);this._onAddAggregation(i,a)}return t.prototype.setAggregation.call(this,e,i,true)}return t.prototype.setAggregation.call(this,e,i,o)};m.prototype.destroyAggregation=function(e,i){var o=this.getMetadata().getAggregations()[e],n,a,r;if(e===m._SAVE_AS_TILE_ACTION){r=m._SAVE_AS_TILE_ACTION}else{r=o&&o.type}if(r&&c.isKnownSemanticType(r)){n=t.prototype.getAggregation.call(this,e);if(n){a=c.getPlacement(r);this._onRemoveAggregation(n,r);!this._bSPBeingDestroyed&&this._getSemanticContainer(a).removeContent(n,a)}}return t.prototype.destroyAggregation.call(this,e,i)};["getContent","setContent","destroyContent"].forEach(function(t){var e=/^(set|destroy)/.test(t);m.prototype[t]=function(i){var o=this._getPage();var n=o[t].apply(o,arguments);return e?this:n}},this);["addTitleCustomTextAction","insertTitleCustomTextAction","indexOfTitleCustomTextAction","removeTitleCustomTextAction","removeAllTitleCustomTextActions","destroyTitleCustomTextActions","getTitleCustomTextActions"].forEach(function(t){var e=/^(add|insert|destroy)/.test(t);m.prototype[t]=function(){var i=this._getSemanticTitle(),o=t.replace(/TitleCustomTextAction?/,"CustomTextAction"),n;n=i[o].apply(i,arguments);return e?this:n}},this);["addTitleCustomIconAction","insertTitleCustomIconAction","indexOfTitleCustomIconAction","removeTitleCustomIconAction","removeAllTitleCustomIconActions","destroyTitleCustomIconActions","getTitleCustomIconActions"].forEach(function(t){var e=/^(add|insert|destroy)/.test(t);m.prototype[t]=function(){var i=this._getSemanticTitle(),o=t.replace(/TitleCustomIconAction?/,"CustomIconAction"),n;n=i[o].apply(i,arguments);return e?this:n}},this);["addFooterCustomAction","insertFooterCustomAction","indexOfFooterCustomAction","removeFooterCustomAction","removeAllFooterCustomActions","destroyFooterCustomActions","getFooterCustomActions"].forEach(function(t){var e=/^(add|insert|destroy)/.test(t);m.prototype[t]=function(){var i=this._getSemanticFooter(),o=t.replace(/FooterCustomAction?/,"CustomAction"),n;n=i[o].apply(i,arguments);return e?this:n}},this);["addCustomShareAction","insertCustomShareAction","indexOfCustomShareAction","removeCustomShareAction","removeAllCustomShareActions","destroyCustomShareActions","getCustomShareActions"].forEach(function(t){var e=/^(add|insert|destroy)/.test(t);m.prototype[t]=function(){var i=this._getShareMenu(),o=t.replace(/CustomShareAction?/,"CustomAction"),n;n=i[o].apply(i,arguments);return e?this:n}},this);m.prototype._onAddAggregation=function(t,e){if(e===m._SAVE_AS_TILE_ACTION){this._replaceParent(t)}};m.prototype._onRemoveAggregation=function(t,e){if(e===m._SAVE_AS_TILE_ACTION){this._restoreParent(t)}if(t._getType){delete t._getType}};m.prototype._replaceParent=function(t){if(t._fnOriginalGetParent){return}t._fnOriginalGetParent=t.getParent;t.getParent=this._fnActionSubstituteParentFunction};m.prototype._restoreParent=function(t){if(t&&t._fnOriginalGetParent){t.getParent=t._fnOriginalGetParent}};m.prototype._attachShareMenuButtonChange=function(){this.attachEvent(m._EVENTS.SHARE_MENU_CONTENT_CHANGED,this._onShareMenuContentChanged,this)};m.prototype._onShareMenuContentChanged=function(t){var e=t.getParameter("bEmpty"),i=this._getSemanticTitle(),o=this._getShareMenu(),n=o._getShareMenuButton();if(!n.getParent()){i.addContent(n,"shareIcon");return}n.setVisible(!e)};m.prototype._getPage=function(){if(!this.getAggregation("_dynamicPage")){this._initDynamicPage()}return this.getAggregation("_dynamicPage")};m.prototype._initDynamicPage=function(){var t=new i(this.getId()+"-page",{title:this._getTitle(),header:this._getHeader(),footer:this._getFooter()}),e=sap.ui.getCore().getLibraryResourceBundle("sap.f").getText(m.ARIA_ROLE_DESCRIPTION);t._setAriaRoleDescription(e);this.setAggregation("_dynamicPage",t,true)};m.prototype._getTitle=function(){if(!this._oDynamicPageTitle){this._oDynamicPageTitle=this._getSemanticTitle()._getContainer()}return this._oDynamicPageTitle};m.prototype._getHeader=function(){if(!this._oDynamicPageHeader){this._oDynamicPageHeader=new n(this.getId()+"-pageHeader")}return this._oDynamicPageHeader};m.prototype._getFooter=function(){if(!this._oDynamicPageFooter){this._oDynamicPageFooter=this._getSemanticFooter()._getContainer()}return this._oDynamicPageFooter};m.prototype._getSemanticTitle=function(){if(!this._oSemanticTitle){this._oSemanticTitle=new s(new o(this.getId()+"-pageTitle"),this)}return this._oSemanticTitle};m.prototype._getShareMenu=function(){if(!this._oShareMenu){this._oShareMenu=new g(this._getActionSheet(),this);this.addDependent(this._oShareMenu._oContainer)}return this._oShareMenu};m.prototype._getActionSheet=function(){if(!this._oActionSheet){this._oActionSheet=new r(this.getId()+"-shareMenu")}return this._oActionSheet};m.prototype._getSemanticFooter=function(){if(!this._oSemanticFooter){this._oSemanticFooter=new l(this._getOverflowToolbar(),this)}return this._oSemanticFooter};m.prototype._getOverflowToolbar=function(){if(!this._oOverflowToolbar){this._oOverflowToolbar=new a(this.getId()+"-pageFooter")}return this._oOverflowToolbar};m.prototype._getSemanticContainer=function(t){var e=c._Placement;if(t===e.titleText||t===e.titleIcon){return this._getSemanticTitle()}else if(t===e.footerLeft||t===e.footerRight){return this._getSemanticFooter()}else if(t===e.shareMenu){return this._getShareMenu()}return null};m.prototype._cleanMemory=function(){if(this._oShareMenu){this._oShareMenu.destroy();this._oShareMenu=null}if(this._oActionSheet){this._oActionSheet.destroy();this._oActionSheet=null}if(this._oSemanticTitle){this._oSemanticTitle.destroy();this._oSemanticTitle=null}if(this._oDynamicPageTitle){this._oDynamicPageTitle.destroy();this._oDynamicPageTitle=null}if(this._oDynamicPageHeader){this._oDynamicPageHeader.destroy();this._oDynamicPageHeader=null}if(this._oSemanticFooter){this._oSemanticFooter.destroy();this._oSemanticFooter=null}if(this._oDynamicPageFooter){this._oDynamicPageFooter.destroy();this._oDynamicPageFooter=null}if(this._oOverflowToolbar){this._oOverflowToolbar.destroy();this._oOverflowToolbar=null}};return m});