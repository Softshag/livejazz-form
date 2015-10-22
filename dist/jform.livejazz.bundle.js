
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(["jquery","jform"], factory);
  } else if (typeof exports === 'object') {
    module.exports = factory(require('jquery'), require('jform'));
  } else {
    root.livejazz = factory(root.jQuery, root.jform);
  }
}(this, function($, jform) {

/*!
 * Select2 4.0.0
 * https://select2.github.io
 *
 * Released under the MIT license
 * https://github.com/select2/select2/blob/master/LICENSE.md
 */'use strict';(function(factory){if(typeof define === 'function' && define.amd){ // AMD. Register as an anonymous module.
define(['jquery'],factory);}else if(typeof exports === 'object'){ // Node/CommonJS
factory(require('jquery'));}else { // Browser globals
factory(jQuery);}})(function(jQuery){ // This is needed so we can catch the AMD loader configuration and use it
// The inner file should be wrapped (by `banner.start.js`) in a function that
// returns the AMD loader references.
var S2=(function(){ // Restore the Select2 AMD loader so it can be used
// Needed mostly in the language files, where the loader is not inserted
if(jQuery && jQuery.fn && jQuery.fn.select2 && jQuery.fn.select2.amd){var S2=jQuery.fn.select2.amd;}var S2;(function(){if(!S2 || !S2.requirejs){if(!S2){S2 = {};}else {require = S2;} /**
 * @license almond 0.2.9 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */ //Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */ /*global setTimeout: false */var requirejs,require,define;(function(undef){var main,req,makeMap,handlers,defined={},waiting={},config={},defining={},hasOwn=Object.prototype.hasOwnProperty,aps=[].slice,jsSuffixRegExp=/\.js$/;function hasProp(obj,prop){return hasOwn.call(obj,prop);} /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */function normalize(name,baseName){var nameParts,nameSegment,mapValue,foundMap,lastIndex,foundI,foundStarMap,starI,i,j,part,baseParts=baseName && baseName.split("/"),map=config.map,starMap=map && map['*'] || {}; //Adjust any relative paths.
if(name && name.charAt(0) === "."){ //If have a base name, try to normalize against it,
//otherwise, assume it is a top-level require that will
//be relative to baseUrl in the end.
if(baseName){ //Convert baseName to array, and lop off the last part,
//so that . matches that "directory" and not name of the baseName's
//module. For instance, baseName of "one/two/three", maps to
//"one/two/three.js", but we want the directory, "one/two" for
//this normalization.
baseParts = baseParts.slice(0,baseParts.length - 1);name = name.split('/');lastIndex = name.length - 1; // Node .js allowance:
if(config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])){name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp,'');}name = baseParts.concat(name); //start trimDots
for(i = 0;i < name.length;i += 1) {part = name[i];if(part === "."){name.splice(i,1);i -= 1;}else if(part === ".."){if(i === 1 && (name[2] === '..' || name[0] === '..')){ //End of the line. Keep at least one non-dot
//path segment at the front so it can be mapped
//correctly to disk. Otherwise, there is likely
//no path mapping for a path starting with '..'.
//This can still fail, but catches the most reasonable
//uses of ..
break;}else if(i > 0){name.splice(i - 1,2);i -= 2;}}} //end trimDots
name = name.join("/");}else if(name.indexOf('./') === 0){ // No baseName, so this is ID is resolved relative
// to baseUrl, pull off the leading dot.
name = name.substring(2);}} //Apply map config if available.
if((baseParts || starMap) && map){nameParts = name.split('/');for(i = nameParts.length;i > 0;i -= 1) {nameSegment = nameParts.slice(0,i).join("/");if(baseParts){ //Find the longest baseName segment match in the config.
//So, do joins on the biggest to smallest lengths of baseParts.
for(j = baseParts.length;j > 0;j -= 1) {mapValue = map[baseParts.slice(0,j).join('/')]; //baseName segment has  config, find if it has one for
//this name.
if(mapValue){mapValue = mapValue[nameSegment];if(mapValue){ //Match, update name to the new value.
foundMap = mapValue;foundI = i;break;}}}}if(foundMap){break;} //Check for a star map match, but just hold on to it,
//if there is a shorter segment match later in a matching
//config, then favor over this star map.
if(!foundStarMap && starMap && starMap[nameSegment]){foundStarMap = starMap[nameSegment];starI = i;}}if(!foundMap && foundStarMap){foundMap = foundStarMap;foundI = starI;}if(foundMap){nameParts.splice(0,foundI,foundMap);name = nameParts.join('/');}}return name;}function makeRequire(relName,forceSync){return function(){ //A version of a require function that passes a moduleName
//value for items that may need to
//look up paths relative to the moduleName
return req.apply(undef,aps.call(arguments,0).concat([relName,forceSync]));};}function makeNormalize(relName){return function(name){return normalize(name,relName);};}function makeLoad(depName){return function(value){defined[depName] = value;};}function callDep(name){if(hasProp(waiting,name)){var args=waiting[name];delete waiting[name];defining[name] = true;main.apply(undef,args);}if(!hasProp(defined,name) && !hasProp(defining,name)){throw new Error('No ' + name);}return defined[name];} //Turns a plugin!resource to [plugin, resource]
//with the plugin being undefined if the name
//did not have a plugin prefix.
function splitPrefix(name){var prefix,index=name?name.indexOf('!'):-1;if(index > -1){prefix = name.substring(0,index);name = name.substring(index + 1,name.length);}return [prefix,name];} /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */makeMap = function(name,relName){var plugin,parts=splitPrefix(name),prefix=parts[0];name = parts[1];if(prefix){prefix = normalize(prefix,relName);plugin = callDep(prefix);} //Normalize according
if(prefix){if(plugin && plugin.normalize){name = plugin.normalize(name,makeNormalize(relName));}else {name = normalize(name,relName);}}else {name = normalize(name,relName);parts = splitPrefix(name);prefix = parts[0];name = parts[1];if(prefix){plugin = callDep(prefix);}} //Using ridiculous property names for space reasons
return {f:prefix?prefix + '!' + name:name, //fullName
n:name,pr:prefix,p:plugin};};function makeConfig(name){return function(){return config && config.config && config.config[name] || {};};}handlers = {require:function require(name){return makeRequire(name);},exports:function exports(name){var e=defined[name];if(typeof e !== 'undefined'){return e;}else {return defined[name] = {};}},module:function module(name){return {id:name,uri:'',exports:defined[name],config:makeConfig(name)};}};main = function(name,deps,callback,relName){var cjsModule,depName,ret,map,i,args=[],callbackType=typeof callback,usingExports; //Use name if no relName
relName = relName || name; //Call the callback to define the module, if necessary.
if(callbackType === 'undefined' || callbackType === 'function'){ //Pull out the defined dependencies and pass the ordered
//values to the callback.
//Default to [require, exports, module] if no deps
deps = !deps.length && callback.length?['require','exports','module']:deps;for(i = 0;i < deps.length;i += 1) {map = makeMap(deps[i],relName);depName = map.f; //Fast path CommonJS standard dependencies.
if(depName === "require"){args[i] = handlers.require(name);}else if(depName === "exports"){ //CommonJS module spec 1.1
args[i] = handlers.exports(name);usingExports = true;}else if(depName === "module"){ //CommonJS module spec 1.1
cjsModule = args[i] = handlers.module(name);}else if(hasProp(defined,depName) || hasProp(waiting,depName) || hasProp(defining,depName)){args[i] = callDep(depName);}else if(map.p){map.p.load(map.n,makeRequire(relName,true),makeLoad(depName),{});args[i] = defined[depName];}else {throw new Error(name + ' missing ' + depName);}}ret = callback?callback.apply(defined[name],args):undefined;if(name){ //If setting exports via "module" is in play,
//favor that over return value and exports. After that,
//favor a non-undefined return value over exports use.
if(cjsModule && cjsModule.exports !== undef && cjsModule.exports !== defined[name]){defined[name] = cjsModule.exports;}else if(ret !== undef || !usingExports){ //Use the return value from the function.
defined[name] = ret;}}}else if(name){ //May just be an object definition for the module. Only
//worry about defining if have a module name.
defined[name] = callback;}};requirejs = require = req = function(deps,callback,relName,forceSync,alt){if(typeof deps === "string"){if(handlers[deps]){ //callback in this case is really relName
return handlers[deps](callback);} //Just return the module wanted. In this scenario, the
//deps arg is the module name, and second arg (if passed)
//is just the relName.
//Normalize module name, if it contains . or ..
return callDep(makeMap(deps,callback).f);}else if(!deps.splice){ //deps is a config object, not an array.
config = deps;if(config.deps){req(config.deps,config.callback);}if(!callback){return;}if(callback.splice){ //callback is an array, which means it is a dependency list.
//Adjust args if there are dependencies
deps = callback;callback = relName;relName = null;}else {deps = undef;}} //Support require(['a'])
callback = callback || function(){}; //If relName is a function, it is an errback handler,
//so remove it.
if(typeof relName === 'function'){relName = forceSync;forceSync = alt;} //Simulate async callback;
if(forceSync){main(undef,deps,callback,relName);}else { //Using a non-zero value because of concern for what old browsers
//do, and latest browsers "upgrade" to 4 if lower value is used:
//http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
//If want a value immediately, use require('id') instead -- something
//that works in almond on the global level, but not guaranteed and
//unlikely to work in other AMD implementations.
setTimeout(function(){main(undef,deps,callback,relName);},4);}return req;}; /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */req.config = function(cfg){return req(cfg);}; /**
     * Expose module registry for debugging and tooling
     */requirejs._defined = defined;define = function(name,deps,callback){ //This module may not have dependencies
if(!deps.splice){ //deps is not an array, so probably means
//an object literal or factory function for
//the value. Adjust args.
callback = deps;deps = [];}if(!hasProp(defined,name) && !hasProp(waiting,name)){waiting[name] = [name,deps,callback];}};define.amd = {jQuery:true};})();S2.requirejs = requirejs;S2.require = require;S2.define = define;}})();S2.define("almond",function(){}); /* global jQuery:false, $:false */S2.define('jquery',[],function(){var _$=jQuery || $;if(_$ == null && console && console.error){console.error('Select2: An instance of jQuery or a jQuery-compatible library was not ' + 'found. Make sure that you are including jQuery before Select2 on your ' + 'web page.');}return _$;});S2.define('select2/utils',['jquery'],function($){var Utils={};Utils.Extend = function(ChildClass,SuperClass){var __hasProp=({}).hasOwnProperty;function BaseConstructor(){this.constructor = ChildClass;}for(var key in SuperClass) {if(__hasProp.call(SuperClass,key)){ChildClass[key] = SuperClass[key];}}BaseConstructor.prototype = SuperClass.prototype;ChildClass.prototype = new BaseConstructor();ChildClass.__super__ = SuperClass.prototype;return ChildClass;};function getMethods(theClass){var proto=theClass.prototype;var methods=[];for(var methodName in proto) {var m=proto[methodName];if(typeof m !== 'function'){continue;}if(methodName === 'constructor'){continue;}methods.push(methodName);}return methods;}Utils.Decorate = function(SuperClass,DecoratorClass){var decoratedMethods=getMethods(DecoratorClass);var superMethods=getMethods(SuperClass);function DecoratedClass(){var unshift=Array.prototype.unshift;var argCount=DecoratorClass.prototype.constructor.length;var calledConstructor=SuperClass.prototype.constructor;if(argCount > 0){unshift.call(arguments,SuperClass.prototype.constructor);calledConstructor = DecoratorClass.prototype.constructor;}calledConstructor.apply(this,arguments);}DecoratorClass.displayName = SuperClass.displayName;function ctr(){this.constructor = DecoratedClass;}DecoratedClass.prototype = new ctr();for(var m=0;m < superMethods.length;m++) {var superMethod=superMethods[m];DecoratedClass.prototype[superMethod] = SuperClass.prototype[superMethod];}var calledMethod=function calledMethod(methodName){ // Stub out the original method if it's not decorating an actual method
var originalMethod=function originalMethod(){};if(methodName in DecoratedClass.prototype){originalMethod = DecoratedClass.prototype[methodName];}var decoratedMethod=DecoratorClass.prototype[methodName];return function(){var unshift=Array.prototype.unshift;unshift.call(arguments,originalMethod);return decoratedMethod.apply(this,arguments);};};for(var d=0;d < decoratedMethods.length;d++) {var decoratedMethod=decoratedMethods[d];DecoratedClass.prototype[decoratedMethod] = calledMethod(decoratedMethod);}return DecoratedClass;};var Observable=function Observable(){this.listeners = {};};Observable.prototype.on = function(event,callback){this.listeners = this.listeners || {};if(event in this.listeners){this.listeners[event].push(callback);}else {this.listeners[event] = [callback];}};Observable.prototype.trigger = function(event){var slice=Array.prototype.slice;this.listeners = this.listeners || {};if(event in this.listeners){this.invoke(this.listeners[event],slice.call(arguments,1));}if('*' in this.listeners){this.invoke(this.listeners['*'],arguments);}};Observable.prototype.invoke = function(listeners,params){for(var i=0,len=listeners.length;i < len;i++) {listeners[i].apply(this,params);}};Utils.Observable = Observable;Utils.generateChars = function(length){var chars='';for(var i=0;i < length;i++) {var randomChar=Math.floor(Math.random() * 36);chars += randomChar.toString(36);}return chars;};Utils.bind = function(func,context){return function(){func.apply(context,arguments);};};Utils._convertData = function(data){for(var originalKey in data) {var keys=originalKey.split('-');var dataLevel=data;if(keys.length === 1){continue;}for(var k=0;k < keys.length;k++) {var key=keys[k]; // Lowercase the first letter
// By default, dash-separated becomes camelCase
key = key.substring(0,1).toLowerCase() + key.substring(1);if(!(key in dataLevel)){dataLevel[key] = {};}if(k == keys.length - 1){dataLevel[key] = data[originalKey];}dataLevel = dataLevel[key];}delete data[originalKey];}return data;};Utils.hasScroll = function(index,el){ // Adapted from the function created by @ShadowScripter
// and adapted by @BillBarry on the Stack Exchange Code Review website.
// The original code can be found at
// http://codereview.stackexchange.com/q/13338
// and was designed to be used with the Sizzle selector engine.
var $el=$(el);var overflowX=el.style.overflowX;var overflowY=el.style.overflowY; //Check both x and y declarations
if(overflowX === overflowY && (overflowY === 'hidden' || overflowY === 'visible')){return false;}if(overflowX === 'scroll' || overflowY === 'scroll'){return true;}return $el.innerHeight() < el.scrollHeight || $el.innerWidth() < el.scrollWidth;};Utils.escapeMarkup = function(markup){var replaceMap={'\\':'&#92;','&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;','/':'&#47;'}; // Do not try to escape the markup if it's not a string
if(typeof markup !== 'string'){return markup;}return String(markup).replace(/[&<>"'\/\\]/g,function(match){return replaceMap[match];});}; // Append an array of jQuery nodes to a given element.
Utils.appendMany = function($element,$nodes){ // jQuery 1.7.x does not support $.fn.append() with an array
// Fall back to a jQuery object collection using $.fn.add()
if($.fn.jquery.substr(0,3) === '1.7'){var $jqNodes=$();$.map($nodes,function(node){$jqNodes = $jqNodes.add(node);});$nodes = $jqNodes;}$element.append($nodes);};return Utils;});S2.define('select2/results',['jquery','./utils'],function($,Utils){function Results($element,options,dataAdapter){this.$element = $element;this.data = dataAdapter;this.options = options;Results.__super__.constructor.call(this);}Utils.Extend(Results,Utils.Observable);Results.prototype.render = function(){var $results=$('<ul class="select2-results__options" role="tree"></ul>');if(this.options.get('multiple')){$results.attr('aria-multiselectable','true');}this.$results = $results;return $results;};Results.prototype.clear = function(){this.$results.empty();};Results.prototype.displayMessage = function(params){var escapeMarkup=this.options.get('escapeMarkup');this.clear();this.hideLoading();var $message=$('<li role="treeitem" class="select2-results__option"></li>');var message=this.options.get('translations').get(params.message);$message.append(escapeMarkup(message(params.args)));this.$results.append($message);};Results.prototype.append = function(data){this.hideLoading();var $options=[];if(data.results == null || data.results.length === 0){if(this.$results.children().length === 0){this.trigger('results:message',{message:'noResults'});}return;}data.results = this.sort(data.results);for(var d=0;d < data.results.length;d++) {var item=data.results[d];var $option=this.option(item);$options.push($option);}this.$results.append($options);};Results.prototype.position = function($results,$dropdown){var $resultsContainer=$dropdown.find('.select2-results');$resultsContainer.append($results);};Results.prototype.sort = function(data){var sorter=this.options.get('sorter');return sorter(data);};Results.prototype.setClasses = function(){var self=this;this.data.current(function(selected){var selectedIds=$.map(selected,function(s){return s.id.toString();});var $options=self.$results.find('.select2-results__option[aria-selected]');$options.each(function(){var $option=$(this);var item=$.data(this,'data'); // id needs to be converted to a string when comparing
var id='' + item.id;if(item.element != null && item.element.selected || item.element == null && $.inArray(id,selectedIds) > -1){$option.attr('aria-selected','true');}else {$option.attr('aria-selected','false');}});var $selected=$options.filter('[aria-selected=true]'); // Check if there are any selected options
if($selected.length > 0){ // If there are selected options, highlight the first
$selected.first().trigger('mouseenter');}else { // If there are no selected options, highlight the first option
// in the dropdown
$options.first().trigger('mouseenter');}});};Results.prototype.showLoading = function(params){this.hideLoading();var loadingMore=this.options.get('translations').get('searching');var loading={disabled:true,loading:true,text:loadingMore(params)};var $loading=this.option(loading);$loading.className += ' loading-results';this.$results.prepend($loading);};Results.prototype.hideLoading = function(){this.$results.find('.loading-results').remove();};Results.prototype.option = function(data){var option=document.createElement('li');option.className = 'select2-results__option';var attrs={'role':'treeitem','aria-selected':'false'};if(data.disabled){delete attrs['aria-selected'];attrs['aria-disabled'] = 'true';}if(data.id == null){delete attrs['aria-selected'];}if(data._resultId != null){option.id = data._resultId;}if(data.title){option.title = data.title;}if(data.children){attrs.role = 'group';attrs['aria-label'] = data.text;delete attrs['aria-selected'];}for(var attr in attrs) {var val=attrs[attr];option.setAttribute(attr,val);}if(data.children){var $option=$(option);var label=document.createElement('strong');label.className = 'select2-results__group';var $label=$(label);this.template(data,label);var $children=[];for(var c=0;c < data.children.length;c++) {var child=data.children[c];var $child=this.option(child);$children.push($child);}var $childrenContainer=$('<ul></ul>',{'class':'select2-results__options select2-results__options--nested'});$childrenContainer.append($children);$option.append(label);$option.append($childrenContainer);}else {this.template(data,option);}$.data(option,'data',data);return option;};Results.prototype.bind = function(container,$container){var self=this;var id=container.id + '-results';this.$results.attr('id',id);container.on('results:all',function(params){self.clear();self.append(params.data);if(container.isOpen()){self.setClasses();}});container.on('results:append',function(params){self.append(params.data);if(container.isOpen()){self.setClasses();}});container.on('query',function(params){self.showLoading(params);});container.on('select',function(){if(!container.isOpen()){return;}self.setClasses();});container.on('unselect',function(){if(!container.isOpen()){return;}self.setClasses();});container.on('open',function(){ // When the dropdown is open, aria-expended="true"
self.$results.attr('aria-expanded','true');self.$results.attr('aria-hidden','false');self.setClasses();self.ensureHighlightVisible();});container.on('close',function(){ // When the dropdown is closed, aria-expended="false"
self.$results.attr('aria-expanded','false');self.$results.attr('aria-hidden','true');self.$results.removeAttr('aria-activedescendant');});container.on('results:toggle',function(){var $highlighted=self.getHighlightedResults();if($highlighted.length === 0){return;}$highlighted.trigger('mouseup');});container.on('results:select',function(){var $highlighted=self.getHighlightedResults();if($highlighted.length === 0){return;}var data=$highlighted.data('data');if($highlighted.attr('aria-selected') == 'true'){self.trigger('close');}else {self.trigger('select',{data:data});}});container.on('results:previous',function(){var $highlighted=self.getHighlightedResults();var $options=self.$results.find('[aria-selected]');var currentIndex=$options.index($highlighted); // If we are already at te top, don't move further
if(currentIndex === 0){return;}var nextIndex=currentIndex - 1; // If none are highlighted, highlight the first
if($highlighted.length === 0){nextIndex = 0;}var $next=$options.eq(nextIndex);$next.trigger('mouseenter');var currentOffset=self.$results.offset().top;var nextTop=$next.offset().top;var nextOffset=self.$results.scrollTop() + (nextTop - currentOffset);if(nextIndex === 0){self.$results.scrollTop(0);}else if(nextTop - currentOffset < 0){self.$results.scrollTop(nextOffset);}});container.on('results:next',function(){var $highlighted=self.getHighlightedResults();var $options=self.$results.find('[aria-selected]');var currentIndex=$options.index($highlighted);var nextIndex=currentIndex + 1; // If we are at the last option, stay there
if(nextIndex >= $options.length){return;}var $next=$options.eq(nextIndex);$next.trigger('mouseenter');var currentOffset=self.$results.offset().top + self.$results.outerHeight(false);var nextBottom=$next.offset().top + $next.outerHeight(false);var nextOffset=self.$results.scrollTop() + nextBottom - currentOffset;if(nextIndex === 0){self.$results.scrollTop(0);}else if(nextBottom > currentOffset){self.$results.scrollTop(nextOffset);}});container.on('results:focus',function(params){params.element.addClass('select2-results__option--highlighted');});container.on('results:message',function(params){self.displayMessage(params);});if($.fn.mousewheel){this.$results.on('mousewheel',function(e){var top=self.$results.scrollTop();var bottom=self.$results.get(0).scrollHeight - self.$results.scrollTop() + e.deltaY;var isAtTop=e.deltaY > 0 && top - e.deltaY <= 0;var isAtBottom=e.deltaY < 0 && bottom <= self.$results.height();if(isAtTop){self.$results.scrollTop(0);e.preventDefault();e.stopPropagation();}else if(isAtBottom){self.$results.scrollTop(self.$results.get(0).scrollHeight - self.$results.height());e.preventDefault();e.stopPropagation();}});}this.$results.on('mouseup','.select2-results__option[aria-selected]',function(evt){var $this=$(this);var data=$this.data('data');if($this.attr('aria-selected') === 'true'){if(self.options.get('multiple')){self.trigger('unselect',{originalEvent:evt,data:data});}else {self.trigger('close');}return;}self.trigger('select',{originalEvent:evt,data:data});});this.$results.on('mouseenter','.select2-results__option[aria-selected]',function(evt){var data=$(this).data('data');self.getHighlightedResults().removeClass('select2-results__option--highlighted');self.trigger('results:focus',{data:data,element:$(this)});});};Results.prototype.getHighlightedResults = function(){var $highlighted=this.$results.find('.select2-results__option--highlighted');return $highlighted;};Results.prototype.destroy = function(){this.$results.remove();};Results.prototype.ensureHighlightVisible = function(){var $highlighted=this.getHighlightedResults();if($highlighted.length === 0){return;}var $options=this.$results.find('[aria-selected]');var currentIndex=$options.index($highlighted);var currentOffset=this.$results.offset().top;var nextTop=$highlighted.offset().top;var nextOffset=this.$results.scrollTop() + (nextTop - currentOffset);var offsetDelta=nextTop - currentOffset;nextOffset -= $highlighted.outerHeight(false) * 2;if(currentIndex <= 2){this.$results.scrollTop(0);}else if(offsetDelta > this.$results.outerHeight() || offsetDelta < 0){this.$results.scrollTop(nextOffset);}};Results.prototype.template = function(result,container){var template=this.options.get('templateResult');var escapeMarkup=this.options.get('escapeMarkup');var content=template(result);if(content == null){container.style.display = 'none';}else if(typeof content === 'string'){container.innerHTML = escapeMarkup(content);}else {$(container).append(content);}};return Results;});S2.define('select2/keys',[],function(){var KEYS={BACKSPACE:8,TAB:9,ENTER:13,SHIFT:16,CTRL:17,ALT:18,ESC:27,SPACE:32,PAGE_UP:33,PAGE_DOWN:34,END:35,HOME:36,LEFT:37,UP:38,RIGHT:39,DOWN:40,DELETE:46};return KEYS;});S2.define('select2/selection/base',['jquery','../utils','../keys'],function($,Utils,KEYS){function BaseSelection($element,options){this.$element = $element;this.options = options;BaseSelection.__super__.constructor.call(this);}Utils.Extend(BaseSelection,Utils.Observable);BaseSelection.prototype.render = function(){var $selection=$('<span class="select2-selection" role="combobox" ' + 'aria-autocomplete="list" aria-haspopup="true" aria-expanded="false">' + '</span>');this._tabindex = 0;if(this.$element.data('old-tabindex') != null){this._tabindex = this.$element.data('old-tabindex');}else if(this.$element.attr('tabindex') != null){this._tabindex = this.$element.attr('tabindex');}$selection.attr('title',this.$element.attr('title'));$selection.attr('tabindex',this._tabindex);this.$selection = $selection;return $selection;};BaseSelection.prototype.bind = function(container,$container){var self=this;var id=container.id + '-container';var resultsId=container.id + '-results';this.container = container;this.$selection.on('focus',function(evt){self.trigger('focus',evt);});this.$selection.on('blur',function(evt){self.trigger('blur',evt);});this.$selection.on('keydown',function(evt){self.trigger('keypress',evt);if(evt.which === KEYS.SPACE){evt.preventDefault();}});container.on('results:focus',function(params){self.$selection.attr('aria-activedescendant',params.data._resultId);});container.on('selection:update',function(params){self.update(params.data);});container.on('open',function(){ // When the dropdown is open, aria-expanded="true"
self.$selection.attr('aria-expanded','true');self.$selection.attr('aria-owns',resultsId);self._attachCloseHandler(container);});container.on('close',function(){ // When the dropdown is closed, aria-expanded="false"
self.$selection.attr('aria-expanded','false');self.$selection.removeAttr('aria-activedescendant');self.$selection.removeAttr('aria-owns');self.$selection.focus();self._detachCloseHandler(container);});container.on('enable',function(){self.$selection.attr('tabindex',self._tabindex);});container.on('disable',function(){self.$selection.attr('tabindex','-1');});};BaseSelection.prototype._attachCloseHandler = function(container){var self=this;$(document.body).on('mousedown.select2.' + container.id,function(e){var $target=$(e.target);var $select=$target.closest('.select2');var $all=$('.select2.select2-container--open');$all.each(function(){var $this=$(this);if(this == $select[0]){return;}var $element=$this.data('element');$element.select2('close');});});};BaseSelection.prototype._detachCloseHandler = function(container){$(document.body).off('mousedown.select2.' + container.id);};BaseSelection.prototype.position = function($selection,$container){var $selectionContainer=$container.find('.selection');$selectionContainer.append($selection);};BaseSelection.prototype.destroy = function(){this._detachCloseHandler(this.container);};BaseSelection.prototype.update = function(data){throw new Error('The `update` method must be defined in child classes.');};return BaseSelection;});S2.define('select2/selection/single',['jquery','./base','../utils','../keys'],function($,BaseSelection,Utils,KEYS){function SingleSelection(){SingleSelection.__super__.constructor.apply(this,arguments);}Utils.Extend(SingleSelection,BaseSelection);SingleSelection.prototype.render = function(){var $selection=SingleSelection.__super__.render.call(this);$selection.addClass('select2-selection--single');$selection.html('<span class="select2-selection__rendered"></span>' + '<span class="select2-selection__arrow" role="presentation">' + '<b role="presentation"></b>' + '</span>');return $selection;};SingleSelection.prototype.bind = function(container,$container){var self=this;SingleSelection.__super__.bind.apply(this,arguments);var id=container.id + '-container';this.$selection.find('.select2-selection__rendered').attr('id',id);this.$selection.attr('aria-labelledby',id);this.$selection.on('mousedown',function(evt){ // Only respond to left clicks
if(evt.which !== 1){return;}self.trigger('toggle',{originalEvent:evt});});this.$selection.on('focus',function(evt){ // User focuses on the container
});this.$selection.on('blur',function(evt){ // User exits the container
});container.on('selection:update',function(params){self.update(params.data);});};SingleSelection.prototype.clear = function(){this.$selection.find('.select2-selection__rendered').empty();};SingleSelection.prototype.display = function(data){var template=this.options.get('templateSelection');var escapeMarkup=this.options.get('escapeMarkup');return escapeMarkup(template(data));};SingleSelection.prototype.selectionContainer = function(){return $('<span></span>');};SingleSelection.prototype.update = function(data){if(data.length === 0){this.clear();return;}var selection=data[0];var formatted=this.display(selection);var $rendered=this.$selection.find('.select2-selection__rendered');$rendered.empty().append(formatted);$rendered.prop('title',selection.title || selection.text);};return SingleSelection;});S2.define('select2/selection/multiple',['jquery','./base','../utils'],function($,BaseSelection,Utils){function MultipleSelection($element,options){MultipleSelection.__super__.constructor.apply(this,arguments);}Utils.Extend(MultipleSelection,BaseSelection);MultipleSelection.prototype.render = function(){var $selection=MultipleSelection.__super__.render.call(this);$selection.addClass('select2-selection--multiple');$selection.html('<ul class="select2-selection__rendered"></ul>');return $selection;};MultipleSelection.prototype.bind = function(container,$container){var self=this;MultipleSelection.__super__.bind.apply(this,arguments);this.$selection.on('click',function(evt){self.trigger('toggle',{originalEvent:evt});});this.$selection.on('click','.select2-selection__choice__remove',function(evt){var $remove=$(this);var $selection=$remove.parent();var data=$selection.data('data');self.trigger('unselect',{originalEvent:evt,data:data});});};MultipleSelection.prototype.clear = function(){this.$selection.find('.select2-selection__rendered').empty();};MultipleSelection.prototype.display = function(data){var template=this.options.get('templateSelection');var escapeMarkup=this.options.get('escapeMarkup');return escapeMarkup(template(data));};MultipleSelection.prototype.selectionContainer = function(){var $container=$('<li class="select2-selection__choice">' + '<span class="select2-selection__choice__remove" role="presentation">' + '&times;' + '</span>' + '</li>');return $container;};MultipleSelection.prototype.update = function(data){this.clear();if(data.length === 0){return;}var $selections=[];for(var d=0;d < data.length;d++) {var selection=data[d];var formatted=this.display(selection);var $selection=this.selectionContainer();$selection.append(formatted);$selection.prop('title',selection.title || selection.text);$selection.data('data',selection);$selections.push($selection);}var $rendered=this.$selection.find('.select2-selection__rendered');Utils.appendMany($rendered,$selections);};return MultipleSelection;});S2.define('select2/selection/placeholder',['../utils'],function(Utils){function Placeholder(decorated,$element,options){this.placeholder = this.normalizePlaceholder(options.get('placeholder'));decorated.call(this,$element,options);}Placeholder.prototype.normalizePlaceholder = function(_,placeholder){if(typeof placeholder === 'string'){placeholder = {id:'',text:placeholder};}return placeholder;};Placeholder.prototype.createPlaceholder = function(decorated,placeholder){var $placeholder=this.selectionContainer();$placeholder.html(this.display(placeholder));$placeholder.addClass('select2-selection__placeholder').removeClass('select2-selection__choice');return $placeholder;};Placeholder.prototype.update = function(decorated,data){var singlePlaceholder=data.length == 1 && data[0].id != this.placeholder.id;var multipleSelections=data.length > 1;if(multipleSelections || singlePlaceholder){return decorated.call(this,data);}this.clear();var $placeholder=this.createPlaceholder(this.placeholder);this.$selection.find('.select2-selection__rendered').append($placeholder);};return Placeholder;});S2.define('select2/selection/allowClear',['jquery','../keys'],function($,KEYS){function AllowClear(){}AllowClear.prototype.bind = function(decorated,container,$container){var self=this;decorated.call(this,container,$container);if(this.placeholder == null){if(this.options.get('debug') && window.console && console.error){console.error('Select2: The `allowClear` option should be used in combination ' + 'with the `placeholder` option.');}}this.$selection.on('mousedown','.select2-selection__clear',function(evt){self._handleClear(evt);});container.on('keypress',function(evt){self._handleKeyboardClear(evt,container);});};AllowClear.prototype._handleClear = function(_,evt){ // Ignore the event if it is disabled
if(this.options.get('disabled')){return;}var $clear=this.$selection.find('.select2-selection__clear'); // Ignore the event if nothing has been selected
if($clear.length === 0){return;}evt.stopPropagation();var data=$clear.data('data');for(var d=0;d < data.length;d++) {var unselectData={data:data[d]}; // Trigger the `unselect` event, so people can prevent it from being
// cleared.
this.trigger('unselect',unselectData); // If the event was prevented, don't clear it out.
if(unselectData.prevented){return;}}this.$element.val(this.placeholder.id).trigger('change');this.trigger('toggle');};AllowClear.prototype._handleKeyboardClear = function(_,evt,container){if(container.isOpen()){return;}if(evt.which == KEYS.DELETE || evt.which == KEYS.BACKSPACE){this._handleClear(evt);}};AllowClear.prototype.update = function(decorated,data){decorated.call(this,data);if(this.$selection.find('.select2-selection__placeholder').length > 0 || data.length === 0){return;}var $remove=$('<span class="select2-selection__clear">' + '&times;' + '</span>');$remove.data('data',data);this.$selection.find('.select2-selection__rendered').prepend($remove);};return AllowClear;});S2.define('select2/selection/search',['jquery','../utils','../keys'],function($,Utils,KEYS){function Search(decorated,$element,options){decorated.call(this,$element,options);}Search.prototype.render = function(decorated){var $search=$('<li class="select2-search select2-search--inline">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="off"' + ' spellcheck="false" role="textbox" />' + '</li>');this.$searchContainer = $search;this.$search = $search.find('input');var $rendered=decorated.call(this);return $rendered;};Search.prototype.bind = function(decorated,container,$container){var self=this;decorated.call(this,container,$container);container.on('open',function(){self.$search.attr('tabindex',0);self.$search.focus();});container.on('close',function(){self.$search.attr('tabindex',-1);self.$search.val('');self.$search.focus();});container.on('enable',function(){self.$search.prop('disabled',false);});container.on('disable',function(){self.$search.prop('disabled',true);});this.$selection.on('focusin','.select2-search--inline',function(evt){self.trigger('focus',evt);});this.$selection.on('focusout','.select2-search--inline',function(evt){self.trigger('blur',evt);});this.$selection.on('keydown','.select2-search--inline',function(evt){evt.stopPropagation();self.trigger('keypress',evt);self._keyUpPrevented = evt.isDefaultPrevented();var key=evt.which;if(key === KEYS.BACKSPACE && self.$search.val() === ''){var $previousChoice=self.$searchContainer.prev('.select2-selection__choice');if($previousChoice.length > 0){var item=$previousChoice.data('data');self.searchRemoveChoice(item);evt.preventDefault();}}}); // Workaround for browsers which do not support the `input` event
// This will prevent double-triggering of events for browsers which support
// both the `keyup` and `input` events.
this.$selection.on('input','.select2-search--inline',function(evt){ // Unbind the duplicated `keyup` event
self.$selection.off('keyup.search');});this.$selection.on('keyup.search input','.select2-search--inline',function(evt){self.handleSearch(evt);});};Search.prototype.createPlaceholder = function(decorated,placeholder){this.$search.attr('placeholder',placeholder.text);};Search.prototype.update = function(decorated,data){this.$search.attr('placeholder','');decorated.call(this,data);this.$selection.find('.select2-selection__rendered').append(this.$searchContainer);this.resizeSearch();};Search.prototype.handleSearch = function(){this.resizeSearch();if(!this._keyUpPrevented){var input=this.$search.val();this.trigger('query',{term:input});}this._keyUpPrevented = false;};Search.prototype.searchRemoveChoice = function(decorated,item){this.trigger('unselect',{data:item});this.trigger('open');this.$search.val(item.text + ' ');};Search.prototype.resizeSearch = function(){this.$search.css('width','25px');var width='';if(this.$search.attr('placeholder') !== ''){width = this.$selection.find('.select2-selection__rendered').innerWidth();}else {var minimumWidth=this.$search.val().length + 1;width = minimumWidth * 0.75 + 'em';}this.$search.css('width',width);};return Search;});S2.define('select2/selection/eventRelay',['jquery'],function($){function EventRelay(){}EventRelay.prototype.bind = function(decorated,container,$container){var self=this;var relayEvents=['open','opening','close','closing','select','selecting','unselect','unselecting'];var preventableEvents=['opening','closing','selecting','unselecting'];decorated.call(this,container,$container);container.on('*',function(name,params){ // Ignore events that should not be relayed
if($.inArray(name,relayEvents) === -1){return;} // The parameters should always be an object
params = params || {}; // Generate the jQuery event for the Select2 event
var evt=$.Event('select2:' + name,{params:params});self.$element.trigger(evt); // Only handle preventable events if it was one
if($.inArray(name,preventableEvents) === -1){return;}params.prevented = evt.isDefaultPrevented();});};return EventRelay;});S2.define('select2/translation',['jquery','require'],function($,require){function Translation(dict){this.dict = dict || {};}Translation.prototype.all = function(){return this.dict;};Translation.prototype.get = function(key){return this.dict[key];};Translation.prototype.extend = function(translation){this.dict = $.extend({},translation.all(),this.dict);}; // Static functions
Translation._cache = {};Translation.loadPath = function(path){if(!(path in Translation._cache)){var translations=require(path);Translation._cache[path] = translations;}return new Translation(Translation._cache[path]);};return Translation;});S2.define('select2/diacritics',[],function(){var diacritics={'Ⓐ':'A','Ａ':'A','À':'A','Á':'A','Â':'A','Ầ':'A','Ấ':'A','Ẫ':'A','Ẩ':'A','Ã':'A','Ā':'A','Ă':'A','Ằ':'A','Ắ':'A','Ẵ':'A','Ẳ':'A','Ȧ':'A','Ǡ':'A','Ä':'A','Ǟ':'A','Ả':'A','Å':'A','Ǻ':'A','Ǎ':'A','Ȁ':'A','Ȃ':'A','Ạ':'A','Ậ':'A','Ặ':'A','Ḁ':'A','Ą':'A','Ⱥ':'A','Ɐ':'A','Ꜳ':'AA','Æ':'AE','Ǽ':'AE','Ǣ':'AE','Ꜵ':'AO','Ꜷ':'AU','Ꜹ':'AV','Ꜻ':'AV','Ꜽ':'AY','Ⓑ':'B','Ｂ':'B','Ḃ':'B','Ḅ':'B','Ḇ':'B','Ƀ':'B','Ƃ':'B','Ɓ':'B','Ⓒ':'C','Ｃ':'C','Ć':'C','Ĉ':'C','Ċ':'C','Č':'C','Ç':'C','Ḉ':'C','Ƈ':'C','Ȼ':'C','Ꜿ':'C','Ⓓ':'D','Ｄ':'D','Ḋ':'D','Ď':'D','Ḍ':'D','Ḑ':'D','Ḓ':'D','Ḏ':'D','Đ':'D','Ƌ':'D','Ɗ':'D','Ɖ':'D','Ꝺ':'D','Ǳ':'DZ','Ǆ':'DZ','ǲ':'Dz','ǅ':'Dz','Ⓔ':'E','Ｅ':'E','È':'E','É':'E','Ê':'E','Ề':'E','Ế':'E','Ễ':'E','Ể':'E','Ẽ':'E','Ē':'E','Ḕ':'E','Ḗ':'E','Ĕ':'E','Ė':'E','Ë':'E','Ẻ':'E','Ě':'E','Ȅ':'E','Ȇ':'E','Ẹ':'E','Ệ':'E','Ȩ':'E','Ḝ':'E','Ę':'E','Ḙ':'E','Ḛ':'E','Ɛ':'E','Ǝ':'E','Ⓕ':'F','Ｆ':'F','Ḟ':'F','Ƒ':'F','Ꝼ':'F','Ⓖ':'G','Ｇ':'G','Ǵ':'G','Ĝ':'G','Ḡ':'G','Ğ':'G','Ġ':'G','Ǧ':'G','Ģ':'G','Ǥ':'G','Ɠ':'G','Ꞡ':'G','Ᵹ':'G','Ꝿ':'G','Ⓗ':'H','Ｈ':'H','Ĥ':'H','Ḣ':'H','Ḧ':'H','Ȟ':'H','Ḥ':'H','Ḩ':'H','Ḫ':'H','Ħ':'H','Ⱨ':'H','Ⱶ':'H','Ɥ':'H','Ⓘ':'I','Ｉ':'I','Ì':'I','Í':'I','Î':'I','Ĩ':'I','Ī':'I','Ĭ':'I','İ':'I','Ï':'I','Ḯ':'I','Ỉ':'I','Ǐ':'I','Ȉ':'I','Ȋ':'I','Ị':'I','Į':'I','Ḭ':'I','Ɨ':'I','Ⓙ':'J','Ｊ':'J','Ĵ':'J','Ɉ':'J','Ⓚ':'K','Ｋ':'K','Ḱ':'K','Ǩ':'K','Ḳ':'K','Ķ':'K','Ḵ':'K','Ƙ':'K','Ⱪ':'K','Ꝁ':'K','Ꝃ':'K','Ꝅ':'K','Ꞣ':'K','Ⓛ':'L','Ｌ':'L','Ŀ':'L','Ĺ':'L','Ľ':'L','Ḷ':'L','Ḹ':'L','Ļ':'L','Ḽ':'L','Ḻ':'L','Ł':'L','Ƚ':'L','Ɫ':'L','Ⱡ':'L','Ꝉ':'L','Ꝇ':'L','Ꞁ':'L','Ǉ':'LJ','ǈ':'Lj','Ⓜ':'M','Ｍ':'M','Ḿ':'M','Ṁ':'M','Ṃ':'M','Ɱ':'M','Ɯ':'M','Ⓝ':'N','Ｎ':'N','Ǹ':'N','Ń':'N','Ñ':'N','Ṅ':'N','Ň':'N','Ṇ':'N','Ņ':'N','Ṋ':'N','Ṉ':'N','Ƞ':'N','Ɲ':'N','Ꞑ':'N','Ꞥ':'N','Ǌ':'NJ','ǋ':'Nj','Ⓞ':'O','Ｏ':'O','Ò':'O','Ó':'O','Ô':'O','Ồ':'O','Ố':'O','Ỗ':'O','Ổ':'O','Õ':'O','Ṍ':'O','Ȭ':'O','Ṏ':'O','Ō':'O','Ṑ':'O','Ṓ':'O','Ŏ':'O','Ȯ':'O','Ȱ':'O','Ö':'O','Ȫ':'O','Ỏ':'O','Ő':'O','Ǒ':'O','Ȍ':'O','Ȏ':'O','Ơ':'O','Ờ':'O','Ớ':'O','Ỡ':'O','Ở':'O','Ợ':'O','Ọ':'O','Ộ':'O','Ǫ':'O','Ǭ':'O','Ø':'O','Ǿ':'O','Ɔ':'O','Ɵ':'O','Ꝋ':'O','Ꝍ':'O','Ƣ':'OI','Ꝏ':'OO','Ȣ':'OU','Ⓟ':'P','Ｐ':'P','Ṕ':'P','Ṗ':'P','Ƥ':'P','Ᵽ':'P','Ꝑ':'P','Ꝓ':'P','Ꝕ':'P','Ⓠ':'Q','Ｑ':'Q','Ꝗ':'Q','Ꝙ':'Q','Ɋ':'Q','Ⓡ':'R','Ｒ':'R','Ŕ':'R','Ṙ':'R','Ř':'R','Ȑ':'R','Ȓ':'R','Ṛ':'R','Ṝ':'R','Ŗ':'R','Ṟ':'R','Ɍ':'R','Ɽ':'R','Ꝛ':'R','Ꞧ':'R','Ꞃ':'R','Ⓢ':'S','Ｓ':'S','ẞ':'S','Ś':'S','Ṥ':'S','Ŝ':'S','Ṡ':'S','Š':'S','Ṧ':'S','Ṣ':'S','Ṩ':'S','Ș':'S','Ş':'S','Ȿ':'S','Ꞩ':'S','Ꞅ':'S','Ⓣ':'T','Ｔ':'T','Ṫ':'T','Ť':'T','Ṭ':'T','Ț':'T','Ţ':'T','Ṱ':'T','Ṯ':'T','Ŧ':'T','Ƭ':'T','Ʈ':'T','Ⱦ':'T','Ꞇ':'T','Ꜩ':'TZ','Ⓤ':'U','Ｕ':'U','Ù':'U','Ú':'U','Û':'U','Ũ':'U','Ṹ':'U','Ū':'U','Ṻ':'U','Ŭ':'U','Ü':'U','Ǜ':'U','Ǘ':'U','Ǖ':'U','Ǚ':'U','Ủ':'U','Ů':'U','Ű':'U','Ǔ':'U','Ȕ':'U','Ȗ':'U','Ư':'U','Ừ':'U','Ứ':'U','Ữ':'U','Ử':'U','Ự':'U','Ụ':'U','Ṳ':'U','Ų':'U','Ṷ':'U','Ṵ':'U','Ʉ':'U','Ⓥ':'V','Ｖ':'V','Ṽ':'V','Ṿ':'V','Ʋ':'V','Ꝟ':'V','Ʌ':'V','Ꝡ':'VY','Ⓦ':'W','Ｗ':'W','Ẁ':'W','Ẃ':'W','Ŵ':'W','Ẇ':'W','Ẅ':'W','Ẉ':'W','Ⱳ':'W','Ⓧ':'X','Ｘ':'X','Ẋ':'X','Ẍ':'X','Ⓨ':'Y','Ｙ':'Y','Ỳ':'Y','Ý':'Y','Ŷ':'Y','Ỹ':'Y','Ȳ':'Y','Ẏ':'Y','Ÿ':'Y','Ỷ':'Y','Ỵ':'Y','Ƴ':'Y','Ɏ':'Y','Ỿ':'Y','Ⓩ':'Z','Ｚ':'Z','Ź':'Z','Ẑ':'Z','Ż':'Z','Ž':'Z','Ẓ':'Z','Ẕ':'Z','Ƶ':'Z','Ȥ':'Z','Ɀ':'Z','Ⱬ':'Z','Ꝣ':'Z','ⓐ':'a','ａ':'a','ẚ':'a','à':'a','á':'a','â':'a','ầ':'a','ấ':'a','ẫ':'a','ẩ':'a','ã':'a','ā':'a','ă':'a','ằ':'a','ắ':'a','ẵ':'a','ẳ':'a','ȧ':'a','ǡ':'a','ä':'a','ǟ':'a','ả':'a','å':'a','ǻ':'a','ǎ':'a','ȁ':'a','ȃ':'a','ạ':'a','ậ':'a','ặ':'a','ḁ':'a','ą':'a','ⱥ':'a','ɐ':'a','ꜳ':'aa','æ':'ae','ǽ':'ae','ǣ':'ae','ꜵ':'ao','ꜷ':'au','ꜹ':'av','ꜻ':'av','ꜽ':'ay','ⓑ':'b','ｂ':'b','ḃ':'b','ḅ':'b','ḇ':'b','ƀ':'b','ƃ':'b','ɓ':'b','ⓒ':'c','ｃ':'c','ć':'c','ĉ':'c','ċ':'c','č':'c','ç':'c','ḉ':'c','ƈ':'c','ȼ':'c','ꜿ':'c','ↄ':'c','ⓓ':'d','ｄ':'d','ḋ':'d','ď':'d','ḍ':'d','ḑ':'d','ḓ':'d','ḏ':'d','đ':'d','ƌ':'d','ɖ':'d','ɗ':'d','ꝺ':'d','ǳ':'dz','ǆ':'dz','ⓔ':'e','ｅ':'e','è':'e','é':'e','ê':'e','ề':'e','ế':'e','ễ':'e','ể':'e','ẽ':'e','ē':'e','ḕ':'e','ḗ':'e','ĕ':'e','ė':'e','ë':'e','ẻ':'e','ě':'e','ȅ':'e','ȇ':'e','ẹ':'e','ệ':'e','ȩ':'e','ḝ':'e','ę':'e','ḙ':'e','ḛ':'e','ɇ':'e','ɛ':'e','ǝ':'e','ⓕ':'f','ｆ':'f','ḟ':'f','ƒ':'f','ꝼ':'f','ⓖ':'g','ｇ':'g','ǵ':'g','ĝ':'g','ḡ':'g','ğ':'g','ġ':'g','ǧ':'g','ģ':'g','ǥ':'g','ɠ':'g','ꞡ':'g','ᵹ':'g','ꝿ':'g','ⓗ':'h','ｈ':'h','ĥ':'h','ḣ':'h','ḧ':'h','ȟ':'h','ḥ':'h','ḩ':'h','ḫ':'h','ẖ':'h','ħ':'h','ⱨ':'h','ⱶ':'h','ɥ':'h','ƕ':'hv','ⓘ':'i','ｉ':'i','ì':'i','í':'i','î':'i','ĩ':'i','ī':'i','ĭ':'i','ï':'i','ḯ':'i','ỉ':'i','ǐ':'i','ȉ':'i','ȋ':'i','ị':'i','į':'i','ḭ':'i','ɨ':'i','ı':'i','ⓙ':'j','ｊ':'j','ĵ':'j','ǰ':'j','ɉ':'j','ⓚ':'k','ｋ':'k','ḱ':'k','ǩ':'k','ḳ':'k','ķ':'k','ḵ':'k','ƙ':'k','ⱪ':'k','ꝁ':'k','ꝃ':'k','ꝅ':'k','ꞣ':'k','ⓛ':'l','ｌ':'l','ŀ':'l','ĺ':'l','ľ':'l','ḷ':'l','ḹ':'l','ļ':'l','ḽ':'l','ḻ':'l','ſ':'l','ł':'l','ƚ':'l','ɫ':'l','ⱡ':'l','ꝉ':'l','ꞁ':'l','ꝇ':'l','ǉ':'lj','ⓜ':'m','ｍ':'m','ḿ':'m','ṁ':'m','ṃ':'m','ɱ':'m','ɯ':'m','ⓝ':'n','ｎ':'n','ǹ':'n','ń':'n','ñ':'n','ṅ':'n','ň':'n','ṇ':'n','ņ':'n','ṋ':'n','ṉ':'n','ƞ':'n','ɲ':'n','ŉ':'n','ꞑ':'n','ꞥ':'n','ǌ':'nj','ⓞ':'o','ｏ':'o','ò':'o','ó':'o','ô':'o','ồ':'o','ố':'o','ỗ':'o','ổ':'o','õ':'o','ṍ':'o','ȭ':'o','ṏ':'o','ō':'o','ṑ':'o','ṓ':'o','ŏ':'o','ȯ':'o','ȱ':'o','ö':'o','ȫ':'o','ỏ':'o','ő':'o','ǒ':'o','ȍ':'o','ȏ':'o','ơ':'o','ờ':'o','ớ':'o','ỡ':'o','ở':'o','ợ':'o','ọ':'o','ộ':'o','ǫ':'o','ǭ':'o','ø':'o','ǿ':'o','ɔ':'o','ꝋ':'o','ꝍ':'o','ɵ':'o','ƣ':'oi','ȣ':'ou','ꝏ':'oo','ⓟ':'p','ｐ':'p','ṕ':'p','ṗ':'p','ƥ':'p','ᵽ':'p','ꝑ':'p','ꝓ':'p','ꝕ':'p','ⓠ':'q','ｑ':'q','ɋ':'q','ꝗ':'q','ꝙ':'q','ⓡ':'r','ｒ':'r','ŕ':'r','ṙ':'r','ř':'r','ȑ':'r','ȓ':'r','ṛ':'r','ṝ':'r','ŗ':'r','ṟ':'r','ɍ':'r','ɽ':'r','ꝛ':'r','ꞧ':'r','ꞃ':'r','ⓢ':'s','ｓ':'s','ß':'s','ś':'s','ṥ':'s','ŝ':'s','ṡ':'s','š':'s','ṧ':'s','ṣ':'s','ṩ':'s','ș':'s','ş':'s','ȿ':'s','ꞩ':'s','ꞅ':'s','ẛ':'s','ⓣ':'t','ｔ':'t','ṫ':'t','ẗ':'t','ť':'t','ṭ':'t','ț':'t','ţ':'t','ṱ':'t','ṯ':'t','ŧ':'t','ƭ':'t','ʈ':'t','ⱦ':'t','ꞇ':'t','ꜩ':'tz','ⓤ':'u','ｕ':'u','ù':'u','ú':'u','û':'u','ũ':'u','ṹ':'u','ū':'u','ṻ':'u','ŭ':'u','ü':'u','ǜ':'u','ǘ':'u','ǖ':'u','ǚ':'u','ủ':'u','ů':'u','ű':'u','ǔ':'u','ȕ':'u','ȗ':'u','ư':'u','ừ':'u','ứ':'u','ữ':'u','ử':'u','ự':'u','ụ':'u','ṳ':'u','ų':'u','ṷ':'u','ṵ':'u','ʉ':'u','ⓥ':'v','ｖ':'v','ṽ':'v','ṿ':'v','ʋ':'v','ꝟ':'v','ʌ':'v','ꝡ':'vy','ⓦ':'w','ｗ':'w','ẁ':'w','ẃ':'w','ŵ':'w','ẇ':'w','ẅ':'w','ẘ':'w','ẉ':'w','ⱳ':'w','ⓧ':'x','ｘ':'x','ẋ':'x','ẍ':'x','ⓨ':'y','ｙ':'y','ỳ':'y','ý':'y','ŷ':'y','ỹ':'y','ȳ':'y','ẏ':'y','ÿ':'y','ỷ':'y','ẙ':'y','ỵ':'y','ƴ':'y','ɏ':'y','ỿ':'y','ⓩ':'z','ｚ':'z','ź':'z','ẑ':'z','ż':'z','ž':'z','ẓ':'z','ẕ':'z','ƶ':'z','ȥ':'z','ɀ':'z','ⱬ':'z','ꝣ':'z','Ά':'Α','Έ':'Ε','Ή':'Η','Ί':'Ι','Ϊ':'Ι','Ό':'Ο','Ύ':'Υ','Ϋ':'Υ','Ώ':'Ω','ά':'α','έ':'ε','ή':'η','ί':'ι','ϊ':'ι','ΐ':'ι','ό':'ο','ύ':'υ','ϋ':'υ','ΰ':'υ','ω':'ω','ς':'σ'};return diacritics;});S2.define('select2/data/base',['../utils'],function(Utils){function BaseAdapter($element,options){BaseAdapter.__super__.constructor.call(this);}Utils.Extend(BaseAdapter,Utils.Observable);BaseAdapter.prototype.current = function(callback){throw new Error('The `current` method must be defined in child classes.');};BaseAdapter.prototype.query = function(params,callback){throw new Error('The `query` method must be defined in child classes.');};BaseAdapter.prototype.bind = function(container,$container){ // Can be implemented in subclasses
};BaseAdapter.prototype.destroy = function(){ // Can be implemented in subclasses
};BaseAdapter.prototype.generateResultId = function(container,data){var id=container.id + '-result-';id += Utils.generateChars(4);if(data.id != null){id += '-' + data.id.toString();}else {id += '-' + Utils.generateChars(4);}return id;};return BaseAdapter;});S2.define('select2/data/select',['./base','../utils','jquery'],function(BaseAdapter,Utils,$){function SelectAdapter($element,options){this.$element = $element;this.options = options;SelectAdapter.__super__.constructor.call(this);}Utils.Extend(SelectAdapter,BaseAdapter);SelectAdapter.prototype.current = function(callback){var data=[];var self=this;this.$element.find(':selected').each(function(){var $option=$(this);var option=self.item($option);data.push(option);});callback(data);};SelectAdapter.prototype.select = function(data){var self=this;data.selected = true; // If data.element is a DOM node, use it instead
if($(data.element).is('option')){data.element.selected = true;this.$element.trigger('change');return;}if(this.$element.prop('multiple')){this.current(function(currentData){var val=[];data = [data];data.push.apply(data,currentData);for(var d=0;d < data.length;d++) {var id=data[d].id;if($.inArray(id,val) === -1){val.push(id);}}self.$element.val(val);self.$element.trigger('change');});}else {var val=data.id;this.$element.val(val);this.$element.trigger('change');}};SelectAdapter.prototype.unselect = function(data){var self=this;if(!this.$element.prop('multiple')){return;}data.selected = false;if($(data.element).is('option')){data.element.selected = false;this.$element.trigger('change');return;}this.current(function(currentData){var val=[];for(var d=0;d < currentData.length;d++) {var id=currentData[d].id;if(id !== data.id && $.inArray(id,val) === -1){val.push(id);}}self.$element.val(val);self.$element.trigger('change');});};SelectAdapter.prototype.bind = function(container,$container){var self=this;this.container = container;container.on('select',function(params){self.select(params.data);});container.on('unselect',function(params){self.unselect(params.data);});};SelectAdapter.prototype.destroy = function(){ // Remove anything added to child elements
this.$element.find('*').each(function(){ // Remove any custom data set by Select2
$.removeData(this,'data');});};SelectAdapter.prototype.query = function(params,callback){var data=[];var self=this;var $options=this.$element.children();$options.each(function(){var $option=$(this);if(!$option.is('option') && !$option.is('optgroup')){return;}var option=self.item($option);var matches=self.matches(params,option);if(matches !== null){data.push(matches);}});callback({results:data});};SelectAdapter.prototype.addOptions = function($options){Utils.appendMany(this.$element,$options);};SelectAdapter.prototype.option = function(data){var option;if(data.children){option = document.createElement('optgroup');option.label = data.text;}else {option = document.createElement('option');if(option.textContent !== undefined){option.textContent = data.text;}else {option.innerText = data.text;}}if(data.id){option.value = data.id;}if(data.disabled){option.disabled = true;}if(data.selected){option.selected = true;}if(data.title){option.title = data.title;}var $option=$(option);var normalizedData=this._normalizeItem(data);normalizedData.element = option; // Override the option's data with the combined data
$.data(option,'data',normalizedData);return $option;};SelectAdapter.prototype.item = function($option){var data={};data = $.data($option[0],'data');if(data != null){return data;}if($option.is('option')){data = {id:$option.val(),text:$option.text(),disabled:$option.prop('disabled'),selected:$option.prop('selected'),title:$option.prop('title')};}else if($option.is('optgroup')){data = {text:$option.prop('label'),children:[],title:$option.prop('title')};var $children=$option.children('option');var children=[];for(var c=0;c < $children.length;c++) {var $child=$($children[c]);var child=this.item($child);children.push(child);}data.children = children;}data = this._normalizeItem(data);data.element = $option[0];$.data($option[0],'data',data);return data;};SelectAdapter.prototype._normalizeItem = function(item){if(!$.isPlainObject(item)){item = {id:item,text:item};}item = $.extend({},{text:''},item);var defaults={selected:false,disabled:false};if(item.id != null){item.id = item.id.toString();}if(item.text != null){item.text = item.text.toString();}if(item._resultId == null && item.id && this.container != null){item._resultId = this.generateResultId(this.container,item);}return $.extend({},defaults,item);};SelectAdapter.prototype.matches = function(params,data){var matcher=this.options.get('matcher');return matcher(params,data);};return SelectAdapter;});S2.define('select2/data/array',['./select','../utils','jquery'],function(SelectAdapter,Utils,$){function ArrayAdapter($element,options){var data=options.get('data') || [];ArrayAdapter.__super__.constructor.call(this,$element,options);this.addOptions(this.convertToOptions(data));}Utils.Extend(ArrayAdapter,SelectAdapter);ArrayAdapter.prototype.select = function(data){var $option=this.$element.find('option').filter(function(i,elm){return elm.value == data.id.toString();});if($option.length === 0){$option = this.option(data);this.addOptions($option);}ArrayAdapter.__super__.select.call(this,data);};ArrayAdapter.prototype.convertToOptions = function(data){var self=this;var $existing=this.$element.find('option');var existingIds=$existing.map(function(){return self.item($(this)).id;}).get();var $options=[]; // Filter out all items except for the one passed in the argument
function onlyItem(item){return function(){return $(this).val() == item.id;};}for(var d=0;d < data.length;d++) {var item=this._normalizeItem(data[d]); // Skip items which were pre-loaded, only merge the data
if($.inArray(item.id,existingIds) >= 0){var $existingOption=$existing.filter(onlyItem(item));var existingData=this.item($existingOption);var newData=$.extend(true,{},existingData,item);var $newOption=this.option(existingData);$existingOption.replaceWith($newOption);continue;}var $option=this.option(item);if(item.children){var $children=this.convertToOptions(item.children);Utils.appendMany($option,$children);}$options.push($option);}return $options;};return ArrayAdapter;});S2.define('select2/data/ajax',['./array','../utils','jquery'],function(ArrayAdapter,Utils,$){function AjaxAdapter($element,options){this.ajaxOptions = this._applyDefaults(options.get('ajax'));if(this.ajaxOptions.processResults != null){this.processResults = this.ajaxOptions.processResults;}ArrayAdapter.__super__.constructor.call(this,$element,options);}Utils.Extend(AjaxAdapter,ArrayAdapter);AjaxAdapter.prototype._applyDefaults = function(options){var defaults={data:function data(params){return {q:params.term};},transport:function transport(params,success,failure){var $request=$.ajax(params);$request.then(success);$request.fail(failure);return $request;}};return $.extend({},defaults,options,true);};AjaxAdapter.prototype.processResults = function(results){return results;};AjaxAdapter.prototype.query = function(params,callback){var matches=[];var self=this;if(this._request != null){ // JSONP requests cannot always be aborted
if($.isFunction(this._request.abort)){this._request.abort();}this._request = null;}var options=$.extend({type:'GET'},this.ajaxOptions);if(typeof options.url === 'function'){options.url = options.url(params);}if(typeof options.data === 'function'){options.data = options.data(params);}function request(){var $request=options.transport(options,function(data){var results=self.processResults(data,params);if(self.options.get('debug') && window.console && console.error){ // Check to make sure that the response included a `results` key.
if(!results || !results.results || !$.isArray(results.results)){console.error('Select2: The AJAX results did not return an array in the ' + '`results` key of the response.');}}callback(results);},function(){ // TODO: Handle AJAX errors
});self._request = $request;}if(this.ajaxOptions.delay && params.term !== ''){if(this._queryTimeout){window.clearTimeout(this._queryTimeout);}this._queryTimeout = window.setTimeout(request,this.ajaxOptions.delay);}else {request();}};return AjaxAdapter;});S2.define('select2/data/tags',['jquery'],function($){function Tags(decorated,$element,options){var tags=options.get('tags');var createTag=options.get('createTag');if(createTag !== undefined){this.createTag = createTag;}decorated.call(this,$element,options);if($.isArray(tags)){for(var t=0;t < tags.length;t++) {var tag=tags[t];var item=this._normalizeItem(tag);var $option=this.option(item);this.$element.append($option);}}}Tags.prototype.query = function(decorated,params,callback){var self=this;this._removeOldTags();if(params.term == null || params.page != null){decorated.call(this,params,callback);return;}function wrapper(obj,child){var data=obj.results;for(var i=0;i < data.length;i++) {var option=data[i];var checkChildren=option.children != null && !wrapper({results:option.children},true);var checkText=option.text === params.term;if(checkText || checkChildren){if(child){return false;}obj.data = data;callback(obj);return;}}if(child){return true;}var tag=self.createTag(params);if(tag != null){var $option=self.option(tag);$option.attr('data-select2-tag',true);self.addOptions([$option]);self.insertTag(data,tag);}obj.results = data;callback(obj);}decorated.call(this,params,wrapper);};Tags.prototype.createTag = function(decorated,params){var term=$.trim(params.term);if(term === ''){return null;}return {id:term,text:term};};Tags.prototype.insertTag = function(_,data,tag){data.unshift(tag);};Tags.prototype._removeOldTags = function(_){var tag=this._lastTag;var $options=this.$element.find('option[data-select2-tag]');$options.each(function(){if(this.selected){return;}$(this).remove();});};return Tags;});S2.define('select2/data/tokenizer',['jquery'],function($){function Tokenizer(decorated,$element,options){var tokenizer=options.get('tokenizer');if(tokenizer !== undefined){this.tokenizer = tokenizer;}decorated.call(this,$element,options);}Tokenizer.prototype.bind = function(decorated,container,$container){decorated.call(this,container,$container);this.$search = container.dropdown.$search || container.selection.$search || $container.find('.select2-search__field');};Tokenizer.prototype.query = function(decorated,params,callback){var self=this;function select(data){self.select(data);}params.term = params.term || '';var tokenData=this.tokenizer(params,this.options,select);if(tokenData.term !== params.term){ // Replace the search term if we have the search box
if(this.$search.length){this.$search.val(tokenData.term);this.$search.focus();}params.term = tokenData.term;}decorated.call(this,params,callback);};Tokenizer.prototype.tokenizer = function(_,params,options,callback){var separators=options.get('tokenSeparators') || [];var term=params.term;var i=0;var createTag=this.createTag || function(params){return {id:params.term,text:params.term};};while(i < term.length) {var termChar=term[i];if($.inArray(termChar,separators) === -1){i++;continue;}var part=term.substr(0,i);var partParams=$.extend({},params,{term:part});var data=createTag(partParams);callback(data); // Reset the term to not include the tokenized portion
term = term.substr(i + 1) || '';i = 0;}return {term:term};};return Tokenizer;});S2.define('select2/data/minimumInputLength',[],function(){function MinimumInputLength(decorated,$e,options){this.minimumInputLength = options.get('minimumInputLength');decorated.call(this,$e,options);}MinimumInputLength.prototype.query = function(decorated,params,callback){params.term = params.term || '';if(params.term.length < this.minimumInputLength){this.trigger('results:message',{message:'inputTooShort',args:{minimum:this.minimumInputLength,input:params.term,params:params}});return;}decorated.call(this,params,callback);};return MinimumInputLength;});S2.define('select2/data/maximumInputLength',[],function(){function MaximumInputLength(decorated,$e,options){this.maximumInputLength = options.get('maximumInputLength');decorated.call(this,$e,options);}MaximumInputLength.prototype.query = function(decorated,params,callback){params.term = params.term || '';if(this.maximumInputLength > 0 && params.term.length > this.maximumInputLength){this.trigger('results:message',{message:'inputTooLong',args:{maximum:this.maximumInputLength,input:params.term,params:params}});return;}decorated.call(this,params,callback);};return MaximumInputLength;});S2.define('select2/data/maximumSelectionLength',[],function(){function MaximumSelectionLength(decorated,$e,options){this.maximumSelectionLength = options.get('maximumSelectionLength');decorated.call(this,$e,options);}MaximumSelectionLength.prototype.query = function(decorated,params,callback){var self=this;this.current(function(currentData){var count=currentData != null?currentData.length:0;if(self.maximumSelectionLength > 0 && count >= self.maximumSelectionLength){self.trigger('results:message',{message:'maximumSelected',args:{maximum:self.maximumSelectionLength}});return;}decorated.call(self,params,callback);});};return MaximumSelectionLength;});S2.define('select2/dropdown',['jquery','./utils'],function($,Utils){function Dropdown($element,options){this.$element = $element;this.options = options;Dropdown.__super__.constructor.call(this);}Utils.Extend(Dropdown,Utils.Observable);Dropdown.prototype.render = function(){var $dropdown=$('<span class="select2-dropdown">' + '<span class="select2-results"></span>' + '</span>');$dropdown.attr('dir',this.options.get('dir'));this.$dropdown = $dropdown;return $dropdown;};Dropdown.prototype.position = function($dropdown,$container){ // Should be implmented in subclasses
};Dropdown.prototype.destroy = function(){ // Remove the dropdown from the DOM
this.$dropdown.remove();};return Dropdown;});S2.define('select2/dropdown/search',['jquery','../utils'],function($,Utils){function Search(){}Search.prototype.render = function(decorated){var $rendered=decorated.call(this);var $search=$('<span class="select2-search select2-search--dropdown">' + '<input class="select2-search__field" type="search" tabindex="-1"' + ' autocomplete="off" autocorrect="off" autocapitalize="off"' + ' spellcheck="false" role="textbox" />' + '</span>');this.$searchContainer = $search;this.$search = $search.find('input');$rendered.prepend($search);return $rendered;};Search.prototype.bind = function(decorated,container,$container){var self=this;decorated.call(this,container,$container);this.$search.on('keydown',function(evt){self.trigger('keypress',evt);self._keyUpPrevented = evt.isDefaultPrevented();}); // Workaround for browsers which do not support the `input` event
// This will prevent double-triggering of events for browsers which support
// both the `keyup` and `input` events.
this.$search.on('input',function(evt){ // Unbind the duplicated `keyup` event
$(this).off('keyup');});this.$search.on('keyup input',function(evt){self.handleSearch(evt);});container.on('open',function(){self.$search.attr('tabindex',0);self.$search.focus();window.setTimeout(function(){self.$search.focus();},0);});container.on('close',function(){self.$search.attr('tabindex',-1);self.$search.val('');});container.on('results:all',function(params){if(params.query.term == null || params.query.term === ''){var showSearch=self.showSearch(params);if(showSearch){self.$searchContainer.removeClass('select2-search--hide');}else {self.$searchContainer.addClass('select2-search--hide');}}});};Search.prototype.handleSearch = function(evt){if(!this._keyUpPrevented){var input=this.$search.val();this.trigger('query',{term:input});}this._keyUpPrevented = false;};Search.prototype.showSearch = function(_,params){return true;};return Search;});S2.define('select2/dropdown/hidePlaceholder',[],function(){function HidePlaceholder(decorated,$element,options,dataAdapter){this.placeholder = this.normalizePlaceholder(options.get('placeholder'));decorated.call(this,$element,options,dataAdapter);}HidePlaceholder.prototype.append = function(decorated,data){data.results = this.removePlaceholder(data.results);decorated.call(this,data);};HidePlaceholder.prototype.normalizePlaceholder = function(_,placeholder){if(typeof placeholder === 'string'){placeholder = {id:'',text:placeholder};}return placeholder;};HidePlaceholder.prototype.removePlaceholder = function(_,data){var modifiedData=data.slice(0);for(var d=data.length - 1;d >= 0;d--) {var item=data[d];if(this.placeholder.id === item.id){modifiedData.splice(d,1);}}return modifiedData;};return HidePlaceholder;});S2.define('select2/dropdown/infiniteScroll',['jquery'],function($){function InfiniteScroll(decorated,$element,options,dataAdapter){this.lastParams = {};decorated.call(this,$element,options,dataAdapter);this.$loadingMore = this.createLoadingMore();this.loading = false;}InfiniteScroll.prototype.append = function(decorated,data){this.$loadingMore.remove();this.loading = false;decorated.call(this,data);if(this.showLoadingMore(data)){this.$results.append(this.$loadingMore);}};InfiniteScroll.prototype.bind = function(decorated,container,$container){var self=this;decorated.call(this,container,$container);container.on('query',function(params){self.lastParams = params;self.loading = true;});container.on('query:append',function(params){self.lastParams = params;self.loading = true;});this.$results.on('scroll',function(){var isLoadMoreVisible=$.contains(document.documentElement,self.$loadingMore[0]);if(self.loading || !isLoadMoreVisible){return;}var currentOffset=self.$results.offset().top + self.$results.outerHeight(false);var loadingMoreOffset=self.$loadingMore.offset().top + self.$loadingMore.outerHeight(false);if(currentOffset + 50 >= loadingMoreOffset){self.loadMore();}});};InfiniteScroll.prototype.loadMore = function(){this.loading = true;var params=$.extend({},{page:1},this.lastParams);params.page++;this.trigger('query:append',params);};InfiniteScroll.prototype.showLoadingMore = function(_,data){return data.pagination && data.pagination.more;};InfiniteScroll.prototype.createLoadingMore = function(){var $option=$('<li class="option load-more" role="treeitem"></li>');var message=this.options.get('translations').get('loadingMore');$option.html(message(this.lastParams));return $option;};return InfiniteScroll;});S2.define('select2/dropdown/attachBody',['jquery','../utils'],function($,Utils){function AttachBody(decorated,$element,options){this.$dropdownParent = options.get('dropdownParent') || document.body;decorated.call(this,$element,options);}AttachBody.prototype.bind = function(decorated,container,$container){var self=this;var setupResultsEvents=false;decorated.call(this,container,$container);container.on('open',function(){self._showDropdown();self._attachPositioningHandler(container);if(!setupResultsEvents){setupResultsEvents = true;container.on('results:all',function(){self._positionDropdown();self._resizeDropdown();});container.on('results:append',function(){self._positionDropdown();self._resizeDropdown();});}});container.on('close',function(){self._hideDropdown();self._detachPositioningHandler(container);});this.$dropdownContainer.on('mousedown',function(evt){evt.stopPropagation();});};AttachBody.prototype.position = function(decorated,$dropdown,$container){ // Clone all of the container classes
$dropdown.attr('class',$container.attr('class'));$dropdown.removeClass('select2');$dropdown.addClass('select2-container--open');$dropdown.css({position:'absolute',top:-999999});this.$container = $container;};AttachBody.prototype.render = function(decorated){var $container=$('<span></span>');var $dropdown=decorated.call(this);$container.append($dropdown);this.$dropdownContainer = $container;return $container;};AttachBody.prototype._hideDropdown = function(decorated){this.$dropdownContainer.detach();};AttachBody.prototype._attachPositioningHandler = function(container){var self=this;var scrollEvent='scroll.select2.' + container.id;var resizeEvent='resize.select2.' + container.id;var orientationEvent='orientationchange.select2.' + container.id;var $watchers=this.$container.parents().filter(Utils.hasScroll);$watchers.each(function(){$(this).data('select2-scroll-position',{x:$(this).scrollLeft(),y:$(this).scrollTop()});});$watchers.on(scrollEvent,function(ev){var position=$(this).data('select2-scroll-position');$(this).scrollTop(position.y);});$(window).on(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent,function(e){self._positionDropdown();self._resizeDropdown();});};AttachBody.prototype._detachPositioningHandler = function(container){var scrollEvent='scroll.select2.' + container.id;var resizeEvent='resize.select2.' + container.id;var orientationEvent='orientationchange.select2.' + container.id;var $watchers=this.$container.parents().filter(Utils.hasScroll);$watchers.off(scrollEvent);$(window).off(scrollEvent + ' ' + resizeEvent + ' ' + orientationEvent);};AttachBody.prototype._positionDropdown = function(){var $window=$(window);var isCurrentlyAbove=this.$dropdown.hasClass('select2-dropdown--above');var isCurrentlyBelow=this.$dropdown.hasClass('select2-dropdown--below');var newDirection=null;var position=this.$container.position();var offset=this.$container.offset();offset.bottom = offset.top + this.$container.outerHeight(false);var container={height:this.$container.outerHeight(false)};container.top = offset.top;container.bottom = offset.top + container.height;var dropdown={height:this.$dropdown.outerHeight(false)};var viewport={top:$window.scrollTop(),bottom:$window.scrollTop() + $window.height()};var enoughRoomAbove=viewport.top < offset.top - dropdown.height;var enoughRoomBelow=viewport.bottom > offset.bottom + dropdown.height;var css={left:offset.left,top:container.bottom};if(!isCurrentlyAbove && !isCurrentlyBelow){newDirection = 'below';}if(!enoughRoomBelow && enoughRoomAbove && !isCurrentlyAbove){newDirection = 'above';}else if(!enoughRoomAbove && enoughRoomBelow && isCurrentlyAbove){newDirection = 'below';}if(newDirection == 'above' || isCurrentlyAbove && newDirection !== 'below'){css.top = container.top - dropdown.height;}if(newDirection != null){this.$dropdown.removeClass('select2-dropdown--below select2-dropdown--above').addClass('select2-dropdown--' + newDirection);this.$container.removeClass('select2-container--below select2-container--above').addClass('select2-container--' + newDirection);}this.$dropdownContainer.css(css);};AttachBody.prototype._resizeDropdown = function(){this.$dropdownContainer.width();var css={width:this.$container.outerWidth(false) + 'px'};if(this.options.get('dropdownAutoWidth')){css.minWidth = css.width;css.width = 'auto';}this.$dropdown.css(css);};AttachBody.prototype._showDropdown = function(decorated){this.$dropdownContainer.appendTo(this.$dropdownParent);this._positionDropdown();this._resizeDropdown();};return AttachBody;});S2.define('select2/dropdown/minimumResultsForSearch',[],function(){function countResults(data){var count=0;for(var d=0;d < data.length;d++) {var item=data[d];if(item.children){count += countResults(item.children);}else {count++;}}return count;}function MinimumResultsForSearch(decorated,$element,options,dataAdapter){this.minimumResultsForSearch = options.get('minimumResultsForSearch');if(this.minimumResultsForSearch < 0){this.minimumResultsForSearch = Infinity;}decorated.call(this,$element,options,dataAdapter);}MinimumResultsForSearch.prototype.showSearch = function(decorated,params){if(countResults(params.data.results) < this.minimumResultsForSearch){return false;}return decorated.call(this,params);};return MinimumResultsForSearch;});S2.define('select2/dropdown/selectOnClose',[],function(){function SelectOnClose(){}SelectOnClose.prototype.bind = function(decorated,container,$container){var self=this;decorated.call(this,container,$container);container.on('close',function(){self._handleSelectOnClose();});};SelectOnClose.prototype._handleSelectOnClose = function(){var $highlightedResults=this.getHighlightedResults();if($highlightedResults.length < 1){return;}this.trigger('select',{data:$highlightedResults.data('data')});};return SelectOnClose;});S2.define('select2/dropdown/closeOnSelect',[],function(){function CloseOnSelect(){}CloseOnSelect.prototype.bind = function(decorated,container,$container){var self=this;decorated.call(this,container,$container);container.on('select',function(evt){self._selectTriggered(evt);});container.on('unselect',function(evt){self._selectTriggered(evt);});};CloseOnSelect.prototype._selectTriggered = function(_,evt){var originalEvent=evt.originalEvent; // Don't close if the control key is being held
if(originalEvent && originalEvent.ctrlKey){return;}this.trigger('close');};return CloseOnSelect;});S2.define('select2/i18n/en',[],function(){ // English
return {errorLoading:function errorLoading(){return 'The results could not be loaded.';},inputTooLong:function inputTooLong(args){var overChars=args.input.length - args.maximum;var message='Please delete ' + overChars + ' character';if(overChars != 1){message += 's';}return message;},inputTooShort:function inputTooShort(args){var remainingChars=args.minimum - args.input.length;var message='Please enter ' + remainingChars + ' or more characters';return message;},loadingMore:function loadingMore(){return 'Loading more results…';},maximumSelected:function maximumSelected(args){var message='You can only select ' + args.maximum + ' item';if(args.maximum != 1){message += 's';}return message;},noResults:function noResults(){return 'No results found';},searching:function searching(){return 'Searching…';}};});S2.define('select2/defaults',['jquery','require','./results','./selection/single','./selection/multiple','./selection/placeholder','./selection/allowClear','./selection/search','./selection/eventRelay','./utils','./translation','./diacritics','./data/select','./data/array','./data/ajax','./data/tags','./data/tokenizer','./data/minimumInputLength','./data/maximumInputLength','./data/maximumSelectionLength','./dropdown','./dropdown/search','./dropdown/hidePlaceholder','./dropdown/infiniteScroll','./dropdown/attachBody','./dropdown/minimumResultsForSearch','./dropdown/selectOnClose','./dropdown/closeOnSelect','./i18n/en'],function($,require,ResultsList,SingleSelection,MultipleSelection,Placeholder,AllowClear,SelectionSearch,EventRelay,Utils,Translation,DIACRITICS,SelectData,ArrayData,AjaxData,Tags,Tokenizer,MinimumInputLength,MaximumInputLength,MaximumSelectionLength,Dropdown,DropdownSearch,HidePlaceholder,InfiniteScroll,AttachBody,MinimumResultsForSearch,SelectOnClose,CloseOnSelect,EnglishTranslation){function Defaults(){this.reset();}Defaults.prototype.apply = function(options){options = $.extend({},this.defaults,options);if(options.dataAdapter == null){if(options.ajax != null){options.dataAdapter = AjaxData;}else if(options.data != null){options.dataAdapter = ArrayData;}else {options.dataAdapter = SelectData;}if(options.minimumInputLength > 0){options.dataAdapter = Utils.Decorate(options.dataAdapter,MinimumInputLength);}if(options.maximumInputLength > 0){options.dataAdapter = Utils.Decorate(options.dataAdapter,MaximumInputLength);}if(options.maximumSelectionLength > 0){options.dataAdapter = Utils.Decorate(options.dataAdapter,MaximumSelectionLength);}if(options.tags){options.dataAdapter = Utils.Decorate(options.dataAdapter,Tags);}if(options.tokenSeparators != null || options.tokenizer != null){options.dataAdapter = Utils.Decorate(options.dataAdapter,Tokenizer);}if(options.query != null){var Query=require(options.amdBase + 'compat/query');options.dataAdapter = Utils.Decorate(options.dataAdapter,Query);}if(options.initSelection != null){var InitSelection=require(options.amdBase + 'compat/initSelection');options.dataAdapter = Utils.Decorate(options.dataAdapter,InitSelection);}}if(options.resultsAdapter == null){options.resultsAdapter = ResultsList;if(options.ajax != null){options.resultsAdapter = Utils.Decorate(options.resultsAdapter,InfiniteScroll);}if(options.placeholder != null){options.resultsAdapter = Utils.Decorate(options.resultsAdapter,HidePlaceholder);}if(options.selectOnClose){options.resultsAdapter = Utils.Decorate(options.resultsAdapter,SelectOnClose);}}if(options.dropdownAdapter == null){if(options.multiple){options.dropdownAdapter = Dropdown;}else {var SearchableDropdown=Utils.Decorate(Dropdown,DropdownSearch);options.dropdownAdapter = SearchableDropdown;}if(options.minimumResultsForSearch !== 0){options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter,MinimumResultsForSearch);}if(options.closeOnSelect){options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter,CloseOnSelect);}if(options.dropdownCssClass != null || options.dropdownCss != null || options.adaptDropdownCssClass != null){var DropdownCSS=require(options.amdBase + 'compat/dropdownCss');options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter,DropdownCSS);}options.dropdownAdapter = Utils.Decorate(options.dropdownAdapter,AttachBody);}if(options.selectionAdapter == null){if(options.multiple){options.selectionAdapter = MultipleSelection;}else {options.selectionAdapter = SingleSelection;} // Add the placeholder mixin if a placeholder was specified
if(options.placeholder != null){options.selectionAdapter = Utils.Decorate(options.selectionAdapter,Placeholder);}if(options.allowClear){options.selectionAdapter = Utils.Decorate(options.selectionAdapter,AllowClear);}if(options.multiple){options.selectionAdapter = Utils.Decorate(options.selectionAdapter,SelectionSearch);}if(options.containerCssClass != null || options.containerCss != null || options.adaptContainerCssClass != null){var ContainerCSS=require(options.amdBase + 'compat/containerCss');options.selectionAdapter = Utils.Decorate(options.selectionAdapter,ContainerCSS);}options.selectionAdapter = Utils.Decorate(options.selectionAdapter,EventRelay);}if(typeof options.language === 'string'){ // Check if the language is specified with a region
if(options.language.indexOf('-') > 0){ // Extract the region information if it is included
var languageParts=options.language.split('-');var baseLanguage=languageParts[0];options.language = [options.language,baseLanguage];}else {options.language = [options.language];}}if($.isArray(options.language)){var languages=new Translation();options.language.push('en');var languageNames=options.language;for(var l=0;l < languageNames.length;l++) {var name=languageNames[l];var language={};try{ // Try to load it with the original name
language = Translation.loadPath(name);}catch(e) {try{ // If we couldn't load it, check if it wasn't the full path
name = this.defaults.amdLanguageBase + name;language = Translation.loadPath(name);}catch(ex) { // The translation could not be loaded at all. Sometimes this is
// because of a configuration problem, other times this can be
// because of how Select2 helps load all possible translation files.
if(options.debug && window.console && console.warn){console.warn('Select2: The language file for "' + name + '" could not be ' + 'automatically loaded. A fallback will be used instead.');}continue;}}languages.extend(language);}options.translations = languages;}else {var baseTranslation=Translation.loadPath(this.defaults.amdLanguageBase + 'en');var customTranslation=new Translation(options.language);customTranslation.extend(baseTranslation);options.translations = customTranslation;}return options;};Defaults.prototype.reset = function(){function stripDiacritics(text){ // Used 'uni range + named function' from http://jsperf.com/diacritics/18
function match(a){return DIACRITICS[a] || a;}return text.replace(/[^\u0000-\u007E]/g,match);}function matcher(_x,_x2){var _again=true;_function: while(_again) {var params=_x,data=_x2;match = c = child = matches = original = term = undefined;_again = false; // Always return the object if there is nothing to compare
if($.trim(params.term) === ''){return data;} // Do a recursive check for options with children
if(data.children && data.children.length > 0){ // Clone the data object if there are children
// This is required as we modify the object to remove any non-matches
var match=$.extend(true,{},data); // Check each child of the option
for(var c=data.children.length - 1;c >= 0;c--) {var child=data.children[c];var matches=matcher(params,child); // If there wasn't a match, remove the object in the array
if(matches == null){match.children.splice(c,1);}} // If any children matched, return the new object
if(match.children.length > 0){return match;} // If there were no matching children, check just the plain object
_x = params;_x2 = match;_again = true;continue _function;}var original=stripDiacritics(data.text).toUpperCase();var term=stripDiacritics(params.term).toUpperCase(); // Check if the text contains the term
if(original.indexOf(term) > -1){return data;} // If it doesn't contain the term, don't return anything
return null;}}this.defaults = {amdBase:'./',amdLanguageBase:'./i18n/',closeOnSelect:true,debug:false,dropdownAutoWidth:false,escapeMarkup:Utils.escapeMarkup,language:EnglishTranslation,matcher:matcher,minimumInputLength:0,maximumInputLength:0,maximumSelectionLength:0,minimumResultsForSearch:0,selectOnClose:false,sorter:function sorter(data){return data;},templateResult:function templateResult(result){return result.text;},templateSelection:function templateSelection(selection){return selection.text;},theme:'default',width:'resolve'};};Defaults.prototype.set = function(key,value){var camelKey=$.camelCase(key);var data={};data[camelKey] = value;var convertedData=Utils._convertData(data);$.extend(this.defaults,convertedData);};var defaults=new Defaults();return defaults;});S2.define('select2/options',['require','jquery','./defaults','./utils'],function(require,$,Defaults,Utils){function Options(options,$element){this.options = options;if($element != null){this.fromElement($element);}this.options = Defaults.apply(this.options);if($element && $element.is('input')){var InputCompat=require(this.get('amdBase') + 'compat/inputData');this.options.dataAdapter = Utils.Decorate(this.options.dataAdapter,InputCompat);}}Options.prototype.fromElement = function($e){var excludedData=['select2'];if(this.options.multiple == null){this.options.multiple = $e.prop('multiple');}if(this.options.disabled == null){this.options.disabled = $e.prop('disabled');}if(this.options.language == null){if($e.prop('lang')){this.options.language = $e.prop('lang').toLowerCase();}else if($e.closest('[lang]').prop('lang')){this.options.language = $e.closest('[lang]').prop('lang');}}if(this.options.dir == null){if($e.prop('dir')){this.options.dir = $e.prop('dir');}else if($e.closest('[dir]').prop('dir')){this.options.dir = $e.closest('[dir]').prop('dir');}else {this.options.dir = 'ltr';}}$e.prop('disabled',this.options.disabled);$e.prop('multiple',this.options.multiple);if($e.data('select2Tags')){if(this.options.debug && window.console && console.warn){console.warn('Select2: The `data-select2-tags` attribute has been changed to ' + 'use the `data-data` and `data-tags="true"` attributes and will be ' + 'removed in future versions of Select2.');}$e.data('data',$e.data('select2Tags'));$e.data('tags',true);}if($e.data('ajaxUrl')){if(this.options.debug && window.console && console.warn){console.warn('Select2: The `data-ajax-url` attribute has been changed to ' + '`data-ajax--url` and support for the old attribute will be removed' + ' in future versions of Select2.');}$e.attr('ajax--url',$e.data('ajaxUrl'));$e.data('ajax--url',$e.data('ajaxUrl'));}var dataset={}; // Prefer the element's `dataset` attribute if it exists
// jQuery 1.x does not correctly handle data attributes with multiple dashes
if($.fn.jquery && $.fn.jquery.substr(0,2) == '1.' && $e[0].dataset){dataset = $.extend(true,{},$e[0].dataset,$e.data());}else {dataset = $e.data();}var data=$.extend(true,{},dataset);data = Utils._convertData(data);for(var key in data) {if($.inArray(key,excludedData) > -1){continue;}if($.isPlainObject(this.options[key])){$.extend(this.options[key],data[key]);}else {this.options[key] = data[key];}}return this;};Options.prototype.get = function(key){return this.options[key];};Options.prototype.set = function(key,val){this.options[key] = val;};return Options;});S2.define('select2/core',['jquery','./options','./utils','./keys'],function($,Options,Utils,KEYS){var Select2=function Select2($element,options){if($element.data('select2') != null){$element.data('select2').destroy();}this.$element = $element;this.id = this._generateId($element);options = options || {};this.options = new Options(options,$element);Select2.__super__.constructor.call(this); // Set up the tabindex
var tabindex=$element.attr('tabindex') || 0;$element.data('old-tabindex',tabindex);$element.attr('tabindex','-1'); // Set up containers and adapters
var DataAdapter=this.options.get('dataAdapter');this.dataAdapter = new DataAdapter($element,this.options);var $container=this.render();this._placeContainer($container);var SelectionAdapter=this.options.get('selectionAdapter');this.selection = new SelectionAdapter($element,this.options);this.$selection = this.selection.render();this.selection.position(this.$selection,$container);var DropdownAdapter=this.options.get('dropdownAdapter');this.dropdown = new DropdownAdapter($element,this.options);this.$dropdown = this.dropdown.render();this.dropdown.position(this.$dropdown,$container);var ResultsAdapter=this.options.get('resultsAdapter');this.results = new ResultsAdapter($element,this.options,this.dataAdapter);this.$results = this.results.render();this.results.position(this.$results,this.$dropdown); // Bind events
var self=this; // Bind the container to all of the adapters
this._bindAdapters(); // Register any DOM event handlers
this._registerDomEvents(); // Register any internal event handlers
this._registerDataEvents();this._registerSelectionEvents();this._registerDropdownEvents();this._registerResultsEvents();this._registerEvents(); // Set the initial state
this.dataAdapter.current(function(initialData){self.trigger('selection:update',{data:initialData});}); // Hide the original select
$element.addClass('select2-hidden-accessible');$element.attr('aria-hidden','true'); // Synchronize any monitored attributes
this._syncAttributes();$element.data('select2',this);};Utils.Extend(Select2,Utils.Observable);Select2.prototype._generateId = function($element){var id='';if($element.attr('id') != null){id = $element.attr('id');}else if($element.attr('name') != null){id = $element.attr('name') + '-' + Utils.generateChars(2);}else {id = Utils.generateChars(4);}id = 'select2-' + id;return id;};Select2.prototype._placeContainer = function($container){$container.insertAfter(this.$element);var width=this._resolveWidth(this.$element,this.options.get('width'));if(width != null){$container.css('width',width);}};Select2.prototype._resolveWidth = function($element,method){var WIDTH=/^width:(([-+]?([0-9]*\.)?[0-9]+)(px|em|ex|%|in|cm|mm|pt|pc))/i;if(method == 'resolve'){var styleWidth=this._resolveWidth($element,'style');if(styleWidth != null){return styleWidth;}return this._resolveWidth($element,'element');}if(method == 'element'){var elementWidth=$element.outerWidth(false);if(elementWidth <= 0){return 'auto';}return elementWidth + 'px';}if(method == 'style'){var style=$element.attr('style');if(typeof style !== 'string'){return null;}var attrs=style.split(';');for(var i=0,l=attrs.length;i < l;i = i + 1) {var attr=attrs[i].replace(/\s/g,'');var matches=attr.match(WIDTH);if(matches !== null && matches.length >= 1){return matches[1];}}return null;}return method;};Select2.prototype._bindAdapters = function(){this.dataAdapter.bind(this,this.$container);this.selection.bind(this,this.$container);this.dropdown.bind(this,this.$container);this.results.bind(this,this.$container);};Select2.prototype._registerDomEvents = function(){var self=this;this.$element.on('change.select2',function(){self.dataAdapter.current(function(data){self.trigger('selection:update',{data:data});});});this._sync = Utils.bind(this._syncAttributes,this);if(this.$element[0].attachEvent){this.$element[0].attachEvent('onpropertychange',this._sync);}var observer=window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;if(observer != null){this._observer = new observer(function(mutations){$.each(mutations,self._sync);});this._observer.observe(this.$element[0],{attributes:true,subtree:false});}else if(this.$element[0].addEventListener){this.$element[0].addEventListener('DOMAttrModified',self._sync,false);}};Select2.prototype._registerDataEvents = function(){var self=this;this.dataAdapter.on('*',function(name,params){self.trigger(name,params);});};Select2.prototype._registerSelectionEvents = function(){var self=this;var nonRelayEvents=['toggle'];this.selection.on('toggle',function(){self.toggleDropdown();});this.selection.on('*',function(name,params){if($.inArray(name,nonRelayEvents) !== -1){return;}self.trigger(name,params);});};Select2.prototype._registerDropdownEvents = function(){var self=this;this.dropdown.on('*',function(name,params){self.trigger(name,params);});};Select2.prototype._registerResultsEvents = function(){var self=this;this.results.on('*',function(name,params){self.trigger(name,params);});};Select2.prototype._registerEvents = function(){var self=this;this.on('open',function(){self.$container.addClass('select2-container--open');});this.on('close',function(){self.$container.removeClass('select2-container--open');});this.on('enable',function(){self.$container.removeClass('select2-container--disabled');});this.on('disable',function(){self.$container.addClass('select2-container--disabled');});this.on('focus',function(){self.$container.addClass('select2-container--focus');});this.on('blur',function(){self.$container.removeClass('select2-container--focus');});this.on('query',function(params){if(!self.isOpen()){self.trigger('open');}this.dataAdapter.query(params,function(data){self.trigger('results:all',{data:data,query:params});});});this.on('query:append',function(params){this.dataAdapter.query(params,function(data){self.trigger('results:append',{data:data,query:params});});});this.on('keypress',function(evt){var key=evt.which;if(self.isOpen()){if(key === KEYS.ENTER){self.trigger('results:select');evt.preventDefault();}else if(key === KEYS.SPACE && evt.ctrlKey){self.trigger('results:toggle');evt.preventDefault();}else if(key === KEYS.UP){self.trigger('results:previous');evt.preventDefault();}else if(key === KEYS.DOWN){self.trigger('results:next');evt.preventDefault();}else if(key === KEYS.ESC || key === KEYS.TAB){self.close();evt.preventDefault();}}else {if(key === KEYS.ENTER || key === KEYS.SPACE || (key === KEYS.DOWN || key === KEYS.UP) && evt.altKey){self.open();evt.preventDefault();}}});};Select2.prototype._syncAttributes = function(){this.options.set('disabled',this.$element.prop('disabled'));if(this.options.get('disabled')){if(this.isOpen()){this.close();}this.trigger('disable');}else {this.trigger('enable');}}; /**
   * Override the trigger method to automatically trigger pre-events when
   * there are events that can be prevented.
   */Select2.prototype.trigger = function(name,args){var actualTrigger=Select2.__super__.trigger;var preTriggerMap={'open':'opening','close':'closing','select':'selecting','unselect':'unselecting'};if(name in preTriggerMap){var preTriggerName=preTriggerMap[name];var preTriggerArgs={prevented:false,name:name,args:args};actualTrigger.call(this,preTriggerName,preTriggerArgs);if(preTriggerArgs.prevented){args.prevented = true;return;}}actualTrigger.call(this,name,args);};Select2.prototype.toggleDropdown = function(){if(this.options.get('disabled')){return;}if(this.isOpen()){this.close();}else {this.open();}};Select2.prototype.open = function(){if(this.isOpen()){return;}this.trigger('query',{});this.trigger('open');};Select2.prototype.close = function(){if(!this.isOpen()){return;}this.trigger('close');};Select2.prototype.isOpen = function(){return this.$container.hasClass('select2-container--open');};Select2.prototype.enable = function(args){if(this.options.get('debug') && window.console && console.warn){console.warn('Select2: The `select2("enable")` method has been deprecated and will' + ' be removed in later Select2 versions. Use $element.prop("disabled")' + ' instead.');}if(args == null || args.length === 0){args = [true];}var disabled=!args[0];this.$element.prop('disabled',disabled);};Select2.prototype.data = function(){if(this.options.get('debug') && arguments.length > 0 && window.console && console.warn){console.warn('Select2: Data can no longer be set using `select2("data")`. You ' + 'should consider setting the value instead using `$element.val()`.');}var data=[];this.dataAdapter.current(function(currentData){data = currentData;});return data;};Select2.prototype.val = function(args){if(this.options.get('debug') && window.console && console.warn){console.warn('Select2: The `select2("val")` method has been deprecated and will be' + ' removed in later Select2 versions. Use $element.val() instead.');}if(args == null || args.length === 0){return this.$element.val();}var newVal=args[0];if($.isArray(newVal)){newVal = $.map(newVal,function(obj){return obj.toString();});}this.$element.val(newVal).trigger('change');};Select2.prototype.destroy = function(){this.$container.remove();if(this.$element[0].detachEvent){this.$element[0].detachEvent('onpropertychange',this._sync);}if(this._observer != null){this._observer.disconnect();this._observer = null;}else if(this.$element[0].removeEventListener){this.$element[0].removeEventListener('DOMAttrModified',this._sync,false);}this._sync = null;this.$element.off('.select2');this.$element.attr('tabindex',this.$element.data('old-tabindex'));this.$element.removeClass('select2-hidden-accessible');this.$element.attr('aria-hidden','false');this.$element.removeData('select2');this.dataAdapter.destroy();this.selection.destroy();this.dropdown.destroy();this.results.destroy();this.dataAdapter = null;this.selection = null;this.dropdown = null;this.results = null;};Select2.prototype.render = function(){var $container=$('<span class="select2 select2-container">' + '<span class="selection"></span>' + '<span class="dropdown-wrapper" aria-hidden="true"></span>' + '</span>');$container.attr('dir',this.options.get('dir'));this.$container = $container;this.$container.addClass('select2-container--' + this.options.get('theme'));$container.data('element',this.$element);return $container;};return Select2;});S2.define('jquery.select2',['jquery','require','./select2/core','./select2/defaults'],function($,require,Select2,Defaults){ // Force jQuery.mousewheel to be loaded if it hasn't already
require('jquery.mousewheel');if($.fn.select2 == null){ // All methods that should return the element
var thisMethods=['open','close','destroy'];$.fn.select2 = function(options){options = options || {};if(typeof options === 'object'){this.each(function(){var instanceOptions=$.extend({},options,true);var instance=new Select2($(this),instanceOptions);});return this;}else if(typeof options === 'string'){var instance=this.data('select2');if(instance == null && window.console && console.error){console.error('The select2(\'' + options + '\') method was called on an ' + 'element that is not using Select2.');}var args=Array.prototype.slice.call(arguments,1);var ret=instance[options](args); // Check if we should be returning `this`
if($.inArray(options,thisMethods) > -1){return this;}return ret;}else {throw new Error('Invalid arguments for Select2: ' + options);}};}if($.fn.select2.defaults == null){$.fn.select2.defaults = Defaults;}return Select2;});S2.define('jquery.mousewheel',['jquery'],function($){ // Used to shim jQuery.mousewheel for non-full builds.
return $;}); // Return the AMD loader configuration so it can be used outside of this file
return {define:S2.define,require:S2.require};})(); // Autoload the jQuery bindings
// We know that all of the modules exist above this, so we're safe
var select2=S2.require('jquery.select2'); // Hold the AMD module references on the jQuery function that was just loaded
// This allows Select2 to use the internal loader outside of this file, such
// as in the language files.
jQuery.fn.select2.amd = S2; // Return the Select2 instance for anyone who is importing it.
return select2;});
/*!
 * Cropper v0.11.1
 * https://github.com/fengyuanchen/cropper
 *
 * Copyright (c) 2014-2015 Fengyuan Chen and contributors
 * Released under the MIT license
 *
 * Date: 2015-08-22T04:55:04.780Z
 */

'use strict';

(function (factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as anonymous module.
    define(['jquery'], factory);
  } else if (typeof exports === 'object') {
    // Node / CommonJS
    factory(require('jquery'));
  } else {
    // Browser globals.
    factory(jQuery);
  }
})(function ($) {

  'use strict';

  // Globals
  var $window = $(window);
  var $document = $(document);
  var location = window.location;

  // Constants
  var NAMESPACE = 'cropper';
  var PREVIEW = 'preview.' + NAMESPACE;

  // Classes
  var CLASS_MODAL = 'cropper-modal';
  var CLASS_HIDE = 'cropper-hide';
  var CLASS_HIDDEN = 'cropper-hidden';
  var CLASS_INVISIBLE = 'cropper-invisible';
  var CLASS_MOVE = 'cropper-move';
  var CLASS_CROP = 'cropper-crop';
  var CLASS_DISABLED = 'cropper-disabled';
  var CLASS_BG = 'cropper-bg';

  // Events
  var EVENT_MOUSE_DOWN = 'mousedown touchstart pointerdown MSPointerDown';
  var EVENT_MOUSE_MOVE = 'mousemove touchmove pointermove MSPointerMove';
  var EVENT_MOUSE_UP = 'mouseup touchend touchcancel pointerup pointercancel MSPointerUp MSPointerCancel';
  var EVENT_WHEEL = 'wheel mousewheel DOMMouseScroll';
  var EVENT_DBLCLICK = 'dblclick';
  var EVENT_LOAD = 'load.' + NAMESPACE;
  var EVENT_ERROR = 'error.' + NAMESPACE;
  var EVENT_RESIZE = 'resize.' + NAMESPACE; // Bind to window with namespace
  var EVENT_BUILD = 'build.' + NAMESPACE;
  var EVENT_BUILT = 'built.' + NAMESPACE;
  var EVENT_CROP_START = 'cropstart.' + NAMESPACE;
  var EVENT_CROP_MOVE = 'cropmove.' + NAMESPACE;
  var EVENT_CROP_END = 'cropend.' + NAMESPACE;
  var EVENT_CROP = 'crop.' + NAMESPACE;
  var EVENT_ZOOM = 'zoom.' + NAMESPACE;

  // RegExps
  var REGEXP_ACTIONS = /^(e|w|s|n|se|sw|ne|nw|all|crop|move|zoom)$/;

  // Actions
  var ACTION_EAST = 'e';
  var ACTION_WEST = 'w';
  var ACTION_SOUTH = 's';
  var ACTION_NORTH = 'n';
  var ACTION_SOUTH_EAST = 'se';
  var ACTION_SOUTH_WEST = 'sw';
  var ACTION_NORTH_EAST = 'ne';
  var ACTION_NORTH_WEST = 'nw';
  var ACTION_ALL = 'all';
  var ACTION_CROP = 'crop';
  var ACTION_MOVE = 'move';
  var ACTION_ZOOM = 'zoom';
  var ACTION_NONE = 'none';

  // Supports
  var SUPPORT_CANVAS = $.isFunction($('<canvas>')[0].getContext);

  // Maths
  var sqrt = Math.sqrt;
  var min = Math.min;
  var max = Math.max;
  var abs = Math.abs;
  var sin = Math.sin;
  var cos = Math.cos;
  var num = parseFloat;

  // Prototype
  var prototype = {};

  function isNumber(n) {
    return typeof n === 'number' && !isNaN(n);
  }

  function isUndefined(n) {
    return typeof n === 'undefined';
  }

  function toArray(obj, offset) {
    var args = [];

    // This is necessary for IE8
    if (isNumber(offset)) {
      args.push(offset);
    }

    return args.slice.apply(obj, args);
  }

  // Custom proxy to avoid jQuery's guid
  function proxy(fn, context) {
    var args = toArray(arguments, 2);

    return function () {
      return fn.apply(context, args.concat(toArray(arguments)));
    };
  }

  function isCrossOriginURL(url) {
    var parts = url.match(/^(https?:)\/\/([^\:\/\?#]+):?(\d*)/i);

    return parts && (parts[1] !== location.protocol || parts[2] !== location.hostname || parts[3] !== location.port);
  }

  function addTimestamp(url) {
    var timestamp = 'timestamp=' + new Date().getTime();

    return url + (url.indexOf('?') === -1 ? '?' : '&') + timestamp;
  }

  function getImageData(image) {
    var naturalWidth = image.naturalWidth;
    var naturalHeight = image.naturalHeight;
    var newImage;

    // IE8
    if (!naturalWidth) {
      newImage = new Image();
      newImage.src = image.src;
      naturalWidth = newImage.width;
      naturalHeight = newImage.height;
    }

    return {
      naturalWidth: naturalWidth,
      naturalHeight: naturalHeight,
      aspectRatio: naturalWidth / naturalHeight
    };
  }

  function getTransform(options) {
    var transforms = [];
    var rotate = options.rotate;
    var scaleX = options.scaleX;
    var scaleY = options.scaleY;

    if (isNumber(rotate)) {
      transforms.push('rotate(' + rotate + 'deg)');
    }

    if (isNumber(scaleX) && isNumber(scaleY)) {
      transforms.push('scale(' + scaleX + ',' + scaleY + ')');
    }

    return transforms.length ? transforms.join(' ') : 'none';
  }

  function getRotatedSizes(data, reverse) {
    var deg = abs(data.degree) % 180;
    var arc = (deg > 90 ? 180 - deg : deg) * Math.PI / 180;
    var sinArc = sin(arc);
    var cosArc = cos(arc);
    var width = data.width;
    var height = data.height;
    var aspectRatio = data.aspectRatio;
    var newWidth;
    var newHeight;

    if (!reverse) {
      newWidth = width * cosArc + height * sinArc;
      newHeight = width * sinArc + height * cosArc;
    } else {
      newWidth = width / (cosArc + sinArc / aspectRatio);
      newHeight = newWidth / aspectRatio;
    }

    return {
      width: newWidth,
      height: newHeight
    };
  }

  function getSourceCanvas(image, data) {
    var canvas = $('<canvas>')[0];
    var context = canvas.getContext('2d');
    var x = 0;
    var y = 0;
    var width = data.naturalWidth;
    var height = data.naturalHeight;
    var rotate = data.rotate;
    var scaleX = data.scaleX;
    var scaleY = data.scaleY;
    var scalable = isNumber(scaleX) && isNumber(scaleY) && (scaleX !== 1 || scaleY !== 1);
    var rotatable = isNumber(rotate) && rotate !== 0;
    var advanced = rotatable || scalable;
    var canvasWidth = width;
    var canvasHeight = height;
    var translateX;
    var translateY;
    var rotated;

    if (scalable) {
      translateX = width / 2;
      translateY = height / 2;
    }

    if (rotatable) {
      rotated = getRotatedSizes({
        width: width,
        height: height,
        degree: rotate
      });

      canvasWidth = rotated.width;
      canvasHeight = rotated.height;
      translateX = rotated.width / 2;
      translateY = rotated.height / 2;
    }

    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    if (advanced) {
      x = -width / 2;
      y = -height / 2;

      context.save();
      context.translate(translateX, translateY);
    }

    if (rotatable) {
      context.rotate(rotate * Math.PI / 180);
    }

    // Should call `scale` after rotated
    if (scalable) {
      context.scale(scaleX, scaleY);
    }

    context.drawImage(image, x, y, width, height);

    if (advanced) {
      context.restore();
    }

    return canvas;
  }

  function Cropper(element, options) {
    this.$element = $(element);
    this.options = $.extend({}, Cropper.DEFAULTS, $.isPlainObject(options) && options);
    this.ready = false;
    this.built = false;
    this.complete = false;
    this.rotated = false;
    this.cropped = false;
    this.disabled = false;
    this.replaced = false;
    this.isImg = false;
    this.originalUrl = '';
    this.canvas = null;
    this.cropBox = null;
    this.init();
  }

  $.extend(prototype, {
    init: function init() {
      var $this = this.$element;
      var url;

      if ($this.is('img')) {
        this.isImg = true;

        // Should use `$.fn.attr` here. e.g.: "img/picture.jpg"
        this.originalUrl = url = $this.attr('src');

        // Stop when it's a blank image
        if (!url) {
          return;
        }

        // Should use `$.fn.prop` here. e.g.: "http://example.com/img/picture.jpg"
        url = $this.prop('src');
      } else if ($this.is('canvas') && SUPPORT_CANVAS) {
        url = $this[0].toDataURL();
      }

      this.load(url);
    },

    // A shortcut for triggering custom events
    trigger: function trigger(type, data) {
      var e = $.Event(type, data);

      this.$element.trigger(e);

      return e.isDefaultPrevented();
    },

    load: function load(url) {
      var options = this.options;
      var $this = this.$element;
      var crossOrigin = '';
      var bustCacheUrl;
      var $clone;

      if (!url) {
        return;
      }

      this.url = url;

      // Trigger build event first
      $this.one(EVENT_BUILD, options.build);

      if (this.trigger(EVENT_BUILD)) {
        return;
      }

      if (options.checkImageOrigin && isCrossOriginURL(url)) {
        crossOrigin = ' crossOrigin="anonymous"';

        // Bust cache (#148), only when there was not a "crossOrigin" property
        if (!$this.prop('crossOrigin')) {
          bustCacheUrl = addTimestamp(url);
        }
      }

      this.$clone = $clone = $('<img' + crossOrigin + ' src="' + (bustCacheUrl || url) + '">');

      if (this.isImg) {
        if ($this[0].complete) {
          this.start();
        } else {
          $this.one(EVENT_LOAD, $.proxy(this.start, this));
        }
      } else {
        $clone.one(EVENT_LOAD, $.proxy(this.start, this)).one(EVENT_ERROR, $.proxy(this.stop, this)).addClass(CLASS_HIDE).insertAfter($this);
      }
    },

    start: function start() {
      this.image = getImageData(this.isImg ? this.$element[0] : this.$clone[0]);
      this.ready = true;
      this.build();
    },

    stop: function stop() {
      this.$clone.remove();
      this.$clone = null;
    }
  });

  $.extend(prototype, {
    build: function build() {
      var options = this.options;
      var $this = this.$element;
      var $clone = this.$clone;
      var $cropper;
      var $cropBox;
      var $face;

      if (!this.ready) {
        return;
      }

      // Unbuild first when replace
      if (this.built) {
        this.unbuild();
      }

      // Create cropper elements
      this.$container = $this.parent();
      this.$cropper = $cropper = $(Cropper.TEMPLATE);
      this.$canvas = $cropper.find('.cropper-canvas').append($clone);
      this.$dragBox = $cropper.find('.cropper-drag-box');
      this.$cropBox = $cropBox = $cropper.find('.cropper-crop-box');
      this.$viewBox = $cropper.find('.cropper-view-box');
      this.$face = $face = $cropBox.find('.cropper-face');

      // Hide the original image
      $this.addClass(CLASS_HIDDEN).after($cropper);

      // Show the clone image if is hidden
      if (!this.isImg) {
        $clone.removeClass(CLASS_HIDE);
      }

      this.initPreview();
      this.bind();

      // Format aspect ratio (0 -> NaN)
      options.aspectRatio = num(options.aspectRatio) || NaN;

      if (options.autoCrop) {
        this.cropped = true;

        if (options.modal) {
          this.$dragBox.addClass(CLASS_MODAL);
        }
      } else {
        $cropBox.addClass(CLASS_HIDDEN);
      }

      if (!options.guides) {
        $cropBox.find('.cropper-dashed').addClass(CLASS_HIDDEN);
      }

      if (!options.center) {
        $cropBox.find('.cropper-center').addClass(CLASS_HIDDEN);
      }

      if (options.cropBoxMovable) {
        $face.addClass(CLASS_MOVE).data('action', ACTION_ALL);
      }

      if (!options.highlight) {
        $face.addClass(CLASS_INVISIBLE);
      }

      if (options.background) {
        $cropper.addClass(CLASS_BG);
      }

      if (!options.cropBoxResizable) {
        $cropBox.find('.cropper-line, .cropper-point').addClass(CLASS_HIDDEN);
      }

      this.setDragMode(options.dragCrop ? ACTION_CROP : options.movable ? ACTION_MOVE : ACTION_NONE);

      this.render();
      this.built = true;
      this.setData(options.data);
      $this.one(EVENT_BUILT, options.built);

      // Trigger the built event asynchronously to keep `data('cropper')` is defined
      setTimeout($.proxy(function () {
        this.trigger(EVENT_BUILT);
        this.complete = true;
      }, this), 0);
    },

    unbuild: function unbuild() {
      if (!this.built) {
        return;
      }

      this.built = false;
      this.initialImage = null;

      // Clear `initialCanvas` is necessary when replace
      this.initialCanvas = null;
      this.initialCropBox = null;
      this.container = null;
      this.canvas = null;

      // Clear `cropBox` is necessary when replace
      this.cropBox = null;
      this.unbind();

      this.resetPreview();
      this.$preview = null;

      this.$viewBox = null;
      this.$cropBox = null;
      this.$dragBox = null;
      this.$canvas = null;
      this.$container = null;

      this.$cropper.remove();
      this.$cropper = null;
    }
  });

  $.extend(prototype, {
    render: function render() {
      this.initContainer();
      this.initCanvas();
      this.initCropBox();

      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    },

    initContainer: function initContainer() {
      var options = this.options;
      var $this = this.$element;
      var $container = this.$container;
      var $cropper = this.$cropper;

      $cropper.addClass(CLASS_HIDDEN);
      $this.removeClass(CLASS_HIDDEN);

      $cropper.css(this.container = {
        width: max($container.width(), num(options.minContainerWidth) || 200),
        height: max($container.height(), num(options.minContainerHeight) || 100)
      });

      $this.addClass(CLASS_HIDDEN);
      $cropper.removeClass(CLASS_HIDDEN);
    },

    // Canvas (image wrapper)
    initCanvas: function initCanvas() {
      var container = this.container;
      var containerWidth = container.width;
      var containerHeight = container.height;
      var image = this.image;
      var aspectRatio = image.aspectRatio;
      var canvas = {
        aspectRatio: aspectRatio,
        width: containerWidth,
        height: containerHeight
      };

      if (containerHeight * aspectRatio > containerWidth) {
        canvas.height = containerWidth / aspectRatio;
      } else {
        canvas.width = containerHeight * aspectRatio;
      }

      canvas.oldLeft = canvas.left = (containerWidth - canvas.width) / 2;
      canvas.oldTop = canvas.top = (containerHeight - canvas.height) / 2;

      this.canvas = canvas;
      this.limitCanvas(true, true);
      this.initialImage = $.extend({}, image);
      this.initialCanvas = $.extend({}, canvas);
    },

    limitCanvas: function limitCanvas(size, position) {
      var options = this.options;
      var strict = options.strict;
      var container = this.container;
      var containerWidth = container.width;
      var containerHeight = container.height;
      var canvas = this.canvas;
      var aspectRatio = canvas.aspectRatio;
      var cropBox = this.cropBox;
      var cropped = this.cropped && cropBox;
      var initialCanvas = this.initialCanvas || canvas;
      var initialCanvasWidth = initialCanvas.width;
      var initialCanvasHeight = initialCanvas.height;
      var minCanvasWidth;
      var minCanvasHeight;

      if (size) {
        minCanvasWidth = num(options.minCanvasWidth) || 0;
        minCanvasHeight = num(options.minCanvasHeight) || 0;

        if (minCanvasWidth) {
          if (strict) {
            minCanvasWidth = max(cropped ? cropBox.width : initialCanvasWidth, minCanvasWidth);
          }

          minCanvasHeight = minCanvasWidth / aspectRatio;
        } else if (minCanvasHeight) {
          if (strict) {
            minCanvasHeight = max(cropped ? cropBox.height : initialCanvasHeight, minCanvasHeight);
          }

          minCanvasWidth = minCanvasHeight * aspectRatio;
        } else if (strict) {
          if (cropped) {
            minCanvasWidth = cropBox.width;
            minCanvasHeight = cropBox.height;

            if (minCanvasHeight * aspectRatio > minCanvasWidth) {
              minCanvasWidth = minCanvasHeight * aspectRatio;
            } else {
              minCanvasHeight = minCanvasWidth / aspectRatio;
            }
          } else {
            minCanvasWidth = initialCanvasWidth;
            minCanvasHeight = initialCanvasHeight;
          }
        }

        $.extend(canvas, {
          minWidth: minCanvasWidth,
          minHeight: minCanvasHeight,
          maxWidth: Infinity,
          maxHeight: Infinity
        });
      }

      if (position) {
        if (strict) {
          if (cropped) {
            canvas.minLeft = min(cropBox.left, cropBox.left + cropBox.width - canvas.width);
            canvas.minTop = min(cropBox.top, cropBox.top + cropBox.height - canvas.height);
            canvas.maxLeft = cropBox.left;
            canvas.maxTop = cropBox.top;
          } else {
            canvas.minLeft = min(0, containerWidth - canvas.width);
            canvas.minTop = min(0, containerHeight - canvas.height);
            canvas.maxLeft = max(0, containerWidth - canvas.width);
            canvas.maxTop = max(0, containerHeight - canvas.height);
          }
        } else {
          canvas.minLeft = -canvas.width;
          canvas.minTop = -canvas.height;
          canvas.maxLeft = containerWidth;
          canvas.maxTop = containerHeight;
        }
      }
    },

    renderCanvas: function renderCanvas(changed) {
      var options = this.options;
      var canvas = this.canvas;
      var image = this.image;
      var aspectRatio;
      var rotated;

      if (this.rotated) {
        this.rotated = false;

        // Computes rotated sizes with image sizes
        rotated = getRotatedSizes({
          width: image.width,
          height: image.height,
          degree: image.rotate
        });

        aspectRatio = rotated.width / rotated.height;

        if (aspectRatio !== canvas.aspectRatio) {
          canvas.left -= (rotated.width - canvas.width) / 2;
          canvas.top -= (rotated.height - canvas.height) / 2;
          canvas.width = rotated.width;
          canvas.height = rotated.height;
          canvas.aspectRatio = aspectRatio;
          this.limitCanvas(true, false);
        }
      }

      if (canvas.width > canvas.maxWidth || canvas.width < canvas.minWidth) {
        canvas.left = canvas.oldLeft;
      }

      if (canvas.height > canvas.maxHeight || canvas.height < canvas.minHeight) {
        canvas.top = canvas.oldTop;
      }

      canvas.width = min(max(canvas.width, canvas.minWidth), canvas.maxWidth);
      canvas.height = min(max(canvas.height, canvas.minHeight), canvas.maxHeight);

      this.limitCanvas(false, true);

      canvas.oldLeft = canvas.left = min(max(canvas.left, canvas.minLeft), canvas.maxLeft);
      canvas.oldTop = canvas.top = min(max(canvas.top, canvas.minTop), canvas.maxTop);

      this.$canvas.css({
        width: canvas.width,
        height: canvas.height,
        left: canvas.left,
        top: canvas.top
      });

      this.renderImage();

      if (this.cropped && options.strict) {
        this.limitCropBox(true, true);
      }

      if (changed) {
        this.output();
      }
    },

    renderImage: function renderImage(changed) {
      var canvas = this.canvas;
      var image = this.image;
      var reversed;

      if (image.rotate) {
        reversed = getRotatedSizes({
          width: canvas.width,
          height: canvas.height,
          degree: image.rotate,
          aspectRatio: image.aspectRatio
        }, true);
      }

      $.extend(image, reversed ? {
        width: reversed.width,
        height: reversed.height,
        left: (canvas.width - reversed.width) / 2,
        top: (canvas.height - reversed.height) / 2
      } : {
        width: canvas.width,
        height: canvas.height,
        left: 0,
        top: 0
      });

      this.$clone.css({
        width: image.width,
        height: image.height,
        marginLeft: image.left,
        marginTop: image.top,
        transform: getTransform(image)
      });

      if (changed) {
        this.output();
      }
    },

    initCropBox: function initCropBox() {
      var options = this.options;
      var canvas = this.canvas;
      var aspectRatio = options.aspectRatio;
      var autoCropArea = num(options.autoCropArea) || 0.8;
      var cropBox = {
        width: canvas.width,
        height: canvas.height
      };

      if (aspectRatio) {
        if (canvas.height * aspectRatio > canvas.width) {
          cropBox.height = cropBox.width / aspectRatio;
        } else {
          cropBox.width = cropBox.height * aspectRatio;
        }
      }

      this.cropBox = cropBox;
      this.limitCropBox(true, true);

      // Initialize auto crop area
      cropBox.width = min(max(cropBox.width, cropBox.minWidth), cropBox.maxWidth);
      cropBox.height = min(max(cropBox.height, cropBox.minHeight), cropBox.maxHeight);

      // The width of auto crop area must large than "minWidth", and the height too. (#164)
      cropBox.width = max(cropBox.minWidth, cropBox.width * autoCropArea);
      cropBox.height = max(cropBox.minHeight, cropBox.height * autoCropArea);
      cropBox.oldLeft = cropBox.left = canvas.left + (canvas.width - cropBox.width) / 2;
      cropBox.oldTop = cropBox.top = canvas.top + (canvas.height - cropBox.height) / 2;

      this.initialCropBox = $.extend({}, cropBox);
    },

    limitCropBox: function limitCropBox(size, position) {
      var options = this.options;
      var strict = options.strict;
      var container = this.container;
      var containerWidth = container.width;
      var containerHeight = container.height;
      var canvas = this.canvas;
      var cropBox = this.cropBox;
      var aspectRatio = options.aspectRatio;
      var minCropBoxWidth;
      var minCropBoxHeight;

      if (size) {
        minCropBoxWidth = num(options.minCropBoxWidth) || 0;
        minCropBoxHeight = num(options.minCropBoxHeight) || 0;

        // The min/maxCropBoxWidth/Height must less than container width/height
        cropBox.minWidth = min(containerWidth, minCropBoxWidth);
        cropBox.minHeight = min(containerHeight, minCropBoxHeight);
        cropBox.maxWidth = min(containerWidth, strict ? canvas.width : containerWidth);
        cropBox.maxHeight = min(containerHeight, strict ? canvas.height : containerHeight);

        if (aspectRatio) {

          // Compare crop box size with container first
          if (cropBox.maxHeight * aspectRatio > cropBox.maxWidth) {
            cropBox.minHeight = cropBox.minWidth / aspectRatio;
            cropBox.maxHeight = cropBox.maxWidth / aspectRatio;
          } else {
            cropBox.minWidth = cropBox.minHeight * aspectRatio;
            cropBox.maxWidth = cropBox.maxHeight * aspectRatio;
          }
        }

        // The "minWidth" must be less than "maxWidth", and the "minHeight" too.
        cropBox.minWidth = min(cropBox.maxWidth, cropBox.minWidth);
        cropBox.minHeight = min(cropBox.maxHeight, cropBox.minHeight);
      }

      if (position) {
        if (strict) {
          cropBox.minLeft = max(0, canvas.left);
          cropBox.minTop = max(0, canvas.top);
          cropBox.maxLeft = min(containerWidth, canvas.left + canvas.width) - cropBox.width;
          cropBox.maxTop = min(containerHeight, canvas.top + canvas.height) - cropBox.height;
        } else {
          cropBox.minLeft = 0;
          cropBox.minTop = 0;
          cropBox.maxLeft = containerWidth - cropBox.width;
          cropBox.maxTop = containerHeight - cropBox.height;
        }
      }
    },

    renderCropBox: function renderCropBox() {
      var options = this.options;
      var container = this.container;
      var containerWidth = container.width;
      var containerHeight = container.height;
      var cropBox = this.cropBox;

      if (cropBox.width > cropBox.maxWidth || cropBox.width < cropBox.minWidth) {
        cropBox.left = cropBox.oldLeft;
      }

      if (cropBox.height > cropBox.maxHeight || cropBox.height < cropBox.minHeight) {
        cropBox.top = cropBox.oldTop;
      }

      cropBox.width = min(max(cropBox.width, cropBox.minWidth), cropBox.maxWidth);
      cropBox.height = min(max(cropBox.height, cropBox.minHeight), cropBox.maxHeight);

      this.limitCropBox(false, true);

      cropBox.oldLeft = cropBox.left = min(max(cropBox.left, cropBox.minLeft), cropBox.maxLeft);
      cropBox.oldTop = cropBox.top = min(max(cropBox.top, cropBox.minTop), cropBox.maxTop);

      if (options.movable && options.cropBoxMovable) {

        // Turn to move the canvas when the crop box is equal to the container
        this.$face.data('action', cropBox.width === containerWidth && cropBox.height === containerHeight ? ACTION_MOVE : ACTION_ALL);
      }

      this.$cropBox.css({
        width: cropBox.width,
        height: cropBox.height,
        left: cropBox.left,
        top: cropBox.top
      });

      if (this.cropped && options.strict) {
        this.limitCanvas(true, true);
      }

      if (!this.disabled) {
        this.output();
      }
    },

    output: function output() {
      this.preview();

      if (this.complete) {
        this.trigger(EVENT_CROP, this.getData());
      } else if (!this.built) {

        // Only trigger one crop event before complete
        this.$element.one(EVENT_BUILT, $.proxy(function () {
          this.trigger(EVENT_CROP, this.getData());
        }, this));
      }
    }
  });

  $.extend(prototype, {
    initPreview: function initPreview() {
      var url = this.url;

      this.$preview = $(this.options.preview);
      this.$viewBox.html('<img src="' + url + '">');
      this.$preview.each(function () {
        var $this = $(this);

        // Save the original size for recover
        $this.data(PREVIEW, {
          width: $this.width(),
          height: $this.height(),
          original: $this.html()
        });

        /**
         * Override img element styles
         * Add `display:block` to avoid margin top issue
         * (Occur only when margin-top <= -height)
         */
        $this.html('<img src="' + url + '" style="display:block;width:100%;' + 'min-width:0!important;min-height:0!important;' + 'max-width:none!important;max-height:none!important;' + 'image-orientation:0deg!important">');
      });
    },

    resetPreview: function resetPreview() {
      this.$preview.each(function () {
        var $this = $(this);

        $this.html($this.data(PREVIEW).original).removeData(PREVIEW);
      });
    },

    preview: function preview() {
      var image = this.image;
      var canvas = this.canvas;
      var cropBox = this.cropBox;
      var width = image.width;
      var height = image.height;
      var left = cropBox.left - canvas.left - image.left;
      var top = cropBox.top - canvas.top - image.top;

      if (!this.cropped || this.disabled) {
        return;
      }

      this.$viewBox.find('img').css({
        width: width,
        height: height,
        marginLeft: -left,
        marginTop: -top,
        transform: getTransform(image)
      });

      this.$preview.each(function () {
        var $this = $(this);
        var data = $this.data(PREVIEW);
        var ratio = data.width / cropBox.width;
        var newWidth = data.width;
        var newHeight = cropBox.height * ratio;

        if (newHeight > data.height) {
          ratio = data.height / cropBox.height;
          newWidth = cropBox.width * ratio;
          newHeight = data.height;
        }

        $this.width(newWidth).height(newHeight).find('img').css({
          width: width * ratio,
          height: height * ratio,
          marginLeft: -left * ratio,
          marginTop: -top * ratio,
          transform: getTransform(image)
        });
      });
    }
  });

  $.extend(prototype, {
    bind: function bind() {
      var options = this.options;
      var $this = this.$element;
      var $cropper = this.$cropper;

      if ($.isFunction(options.cropstart)) {
        $this.on(EVENT_CROP_START, options.cropstart);
      }

      if ($.isFunction(options.cropmove)) {
        $this.on(EVENT_CROP_MOVE, options.cropmove);
      }

      if ($.isFunction(options.cropend)) {
        $this.on(EVENT_CROP_END, options.cropend);
      }

      if ($.isFunction(options.crop)) {
        $this.on(EVENT_CROP, options.crop);
      }

      if ($.isFunction(options.zoom)) {
        $this.on(EVENT_ZOOM, options.zoom);
      }

      $cropper.on(EVENT_MOUSE_DOWN, $.proxy(this.cropStart, this));

      if (options.zoomable && options.mouseWheelZoom) {
        $cropper.on(EVENT_WHEEL, $.proxy(this.wheel, this));
      }

      if (options.doubleClickToggle) {
        $cropper.on(EVENT_DBLCLICK, $.proxy(this.dblclick, this));
      }

      $document.on(EVENT_MOUSE_MOVE, this._cropMove = proxy(this.cropMove, this)).on(EVENT_MOUSE_UP, this._cropEnd = proxy(this.cropEnd, this));

      if (options.responsive) {
        $window.on(EVENT_RESIZE, this._resize = proxy(this.resize, this));
      }
    },

    unbind: function unbind() {
      var options = this.options;
      var $this = this.$element;
      var $cropper = this.$cropper;

      if ($.isFunction(options.cropstart)) {
        $this.off(EVENT_CROP_START, options.cropstart);
      }

      if ($.isFunction(options.cropmove)) {
        $this.off(EVENT_CROP_MOVE, options.cropmove);
      }

      if ($.isFunction(options.cropend)) {
        $this.off(EVENT_CROP_END, options.cropend);
      }

      if ($.isFunction(options.crop)) {
        $this.off(EVENT_CROP, options.crop);
      }

      if ($.isFunction(options.zoom)) {
        $this.off(EVENT_ZOOM, options.zoom);
      }

      $cropper.off(EVENT_MOUSE_DOWN, this.cropStart);

      if (options.zoomable && options.mouseWheelZoom) {
        $cropper.off(EVENT_WHEEL, this.wheel);
      }

      if (options.doubleClickToggle) {
        $cropper.off(EVENT_DBLCLICK, this.dblclick);
      }

      $document.off(EVENT_MOUSE_MOVE, this._cropMove).off(EVENT_MOUSE_UP, this._cropEnd);

      if (options.responsive) {
        $window.off(EVENT_RESIZE, this._resize);
      }
    }
  });

  $.extend(prototype, {
    resize: function resize() {
      var $container = this.$container;
      var container = this.container;
      var canvasData;
      var cropBoxData;
      var ratio;

      // Check `container` is necessary for IE8
      if (this.disabled || !container) {
        return;
      }

      ratio = $container.width() / container.width;

      // Resize when width changed or height changed
      if (ratio !== 1 || $container.height() !== container.height) {
        canvasData = this.getCanvasData();
        cropBoxData = this.getCropBoxData();

        this.render();
        this.setCanvasData($.each(canvasData, function (i, n) {
          canvasData[i] = n * ratio;
        }));
        this.setCropBoxData($.each(cropBoxData, function (i, n) {
          cropBoxData[i] = n * ratio;
        }));
      }
    },

    dblclick: function dblclick() {
      if (this.disabled) {
        return;
      }

      if (this.$dragBox.hasClass(CLASS_CROP)) {
        this.setDragMode(ACTION_MOVE);
      } else {
        this.setDragMode(ACTION_CROP);
      }
    },

    wheel: function wheel(event) {
      var originalEvent = event.originalEvent;
      var e = originalEvent;
      var ratio = num(this.options.wheelZoomRatio) || 0.1;
      var delta = 1;

      if (this.disabled) {
        return;
      }

      event.preventDefault();

      if (e.deltaY) {
        delta = e.deltaY > 0 ? 1 : -1;
      } else if (e.wheelDelta) {
        delta = -e.wheelDelta / 120;
      } else if (e.detail) {
        delta = e.detail > 0 ? 1 : -1;
      }

      this.zoom(-delta * ratio, originalEvent);
    },

    cropStart: function cropStart(event) {
      var options = this.options;
      var originalEvent = event.originalEvent;
      var touches = originalEvent && originalEvent.touches;
      var e = event;
      var touchesLength;
      var action;

      if (this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.touchDragZoom && touchesLength === 2) {
            e = touches[1];
            this.startX2 = e.pageX;
            this.startY2 = e.pageY;
            action = ACTION_ZOOM;
          } else {
            return;
          }
        }

        e = touches[0];
      }

      action = action || $(e.target).data('action');

      if (REGEXP_ACTIONS.test(action)) {
        if (this.trigger(EVENT_CROP_START, {
          originalEvent: originalEvent,
          action: action
        })) {
          return;
        }

        event.preventDefault();

        this.action = action;
        this.cropping = false;

        // IE8  has `event.pageX/Y`, but not `event.originalEvent.pageX/Y`
        // IE10 has `event.originalEvent.pageX/Y`, but not `event.pageX/Y`
        this.startX = e.pageX || originalEvent && originalEvent.pageX;
        this.startY = e.pageY || originalEvent && originalEvent.pageY;

        if (action === ACTION_CROP) {
          this.cropping = true;
          this.$dragBox.addClass(CLASS_MODAL);
        }
      }
    },

    cropMove: function cropMove(event) {
      var options = this.options;
      var originalEvent = event.originalEvent;
      var touches = originalEvent && originalEvent.touches;
      var e = event;
      var action = this.action;
      var touchesLength;

      if (this.disabled) {
        return;
      }

      if (touches) {
        touchesLength = touches.length;

        if (touchesLength > 1) {
          if (options.zoomable && options.touchDragZoom && touchesLength === 2) {
            e = touches[1];
            this.endX2 = e.pageX;
            this.endY2 = e.pageY;
          } else {
            return;
          }
        }

        e = touches[0];
      }

      if (action) {
        if (this.trigger(EVENT_CROP_MOVE, {
          originalEvent: originalEvent,
          action: action
        })) {
          return;
        }

        event.preventDefault();

        this.endX = e.pageX || originalEvent && originalEvent.pageX;
        this.endY = e.pageY || originalEvent && originalEvent.pageY;

        this.change(e.shiftKey, action === ACTION_ZOOM ? originalEvent : null);
      }
    },

    cropEnd: function cropEnd(event) {
      var originalEvent = event.originalEvent;
      var action = this.action;

      if (this.disabled) {
        return;
      }

      if (action) {
        event.preventDefault();

        if (this.cropping) {
          this.cropping = false;
          this.$dragBox.toggleClass(CLASS_MODAL, this.cropped && this.options.modal);
        }

        this.action = '';

        this.trigger(EVENT_CROP_END, {
          originalEvent: originalEvent,
          action: action
        });
      }
    }
  });

  $.extend(prototype, {
    change: function change(shiftKey, originalEvent) {
      var options = this.options;
      var aspectRatio = options.aspectRatio;
      var action = this.action;
      var container = this.container;
      var canvas = this.canvas;
      var cropBox = this.cropBox;
      var width = cropBox.width;
      var height = cropBox.height;
      var left = cropBox.left;
      var top = cropBox.top;
      var right = left + width;
      var bottom = top + height;
      var minLeft = 0;
      var minTop = 0;
      var maxWidth = container.width;
      var maxHeight = container.height;
      var renderable = true;
      var offset;
      var range;

      // Locking aspect ratio in "free mode" by holding shift key (#259)
      if (!aspectRatio && shiftKey) {
        aspectRatio = width && height ? width / height : 1;
      }

      if (options.strict) {
        minLeft = cropBox.minLeft;
        minTop = cropBox.minTop;
        maxWidth = minLeft + min(container.width, canvas.width);
        maxHeight = minTop + min(container.height, canvas.height);
      }

      range = {
        x: this.endX - this.startX,
        y: this.endY - this.startY
      };

      if (aspectRatio) {
        range.X = range.y * aspectRatio;
        range.Y = range.x / aspectRatio;
      }

      switch (action) {
        // Move crop box
        case ACTION_ALL:
          left += range.x;
          top += range.y;
          break;

        // Resize crop box
        case ACTION_EAST:
          if (range.x >= 0 && (right >= maxWidth || aspectRatio && (top <= minTop || bottom >= maxHeight))) {

            renderable = false;
            break;
          }

          width += range.x;

          if (aspectRatio) {
            height = width / aspectRatio;
            top -= range.Y / 2;
          }

          if (width < 0) {
            action = ACTION_WEST;
            width = 0;
          }

          break;

        case ACTION_NORTH:
          if (range.y <= 0 && (top <= minTop || aspectRatio && (left <= minLeft || right >= maxWidth))) {

            renderable = false;
            break;
          }

          height -= range.y;
          top += range.y;

          if (aspectRatio) {
            width = height * aspectRatio;
            left += range.X / 2;
          }

          if (height < 0) {
            action = ACTION_SOUTH;
            height = 0;
          }

          break;

        case ACTION_WEST:
          if (range.x <= 0 && (left <= minLeft || aspectRatio && (top <= minTop || bottom >= maxHeight))) {

            renderable = false;
            break;
          }

          width -= range.x;
          left += range.x;

          if (aspectRatio) {
            height = width / aspectRatio;
            top += range.Y / 2;
          }

          if (width < 0) {
            action = ACTION_EAST;
            width = 0;
          }

          break;

        case ACTION_SOUTH:
          if (range.y >= 0 && (bottom >= maxHeight || aspectRatio && (left <= minLeft || right >= maxWidth))) {

            renderable = false;
            break;
          }

          height += range.y;

          if (aspectRatio) {
            width = height * aspectRatio;
            left -= range.X / 2;
          }

          if (height < 0) {
            action = ACTION_NORTH;
            height = 0;
          }

          break;

        case ACTION_NORTH_EAST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || right >= maxWidth)) {
              renderable = false;
              break;
            }

            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
          } else {
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width += range.x;
            }

            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_WEST;
            height = 0;
            width = 0;
          } else if (width < 0) {
            action = ACTION_NORTH_WEST;
            width = 0;
          } else if (height < 0) {
            action = ACTION_SOUTH_EAST;
            height = 0;
          }

          break;

        case ACTION_NORTH_WEST:
          if (aspectRatio) {
            if (range.y <= 0 && (top <= minTop || left <= minLeft)) {
              renderable = false;
              break;
            }

            height -= range.y;
            top += range.y;
            width = height * aspectRatio;
            left += range.X;
          } else {
            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y <= 0 && top <= minTop) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }

            if (range.y <= 0) {
              if (top > minTop) {
                height -= range.y;
                top += range.y;
              }
            } else {
              height -= range.y;
              top += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_SOUTH_EAST;
            height = 0;
            width = 0;
          } else if (width < 0) {
            action = ACTION_NORTH_EAST;
            width = 0;
          } else if (height < 0) {
            action = ACTION_SOUTH_WEST;
            height = 0;
          }

          break;

        case ACTION_SOUTH_WEST:
          if (aspectRatio) {
            if (range.x <= 0 && (left <= minLeft || bottom >= maxHeight)) {
              renderable = false;
              break;
            }

            width -= range.x;
            left += range.x;
            height = width / aspectRatio;
          } else {
            if (range.x <= 0) {
              if (left > minLeft) {
                width -= range.x;
                left += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width -= range.x;
              left += range.x;
            }

            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_NORTH_EAST;
            height = 0;
            width = 0;
          } else if (width < 0) {
            action = ACTION_SOUTH_EAST;
            width = 0;
          } else if (height < 0) {
            action = ACTION_NORTH_WEST;
            height = 0;
          }

          break;

        case ACTION_SOUTH_EAST:
          if (aspectRatio) {
            if (range.x >= 0 && (right >= maxWidth || bottom >= maxHeight)) {
              renderable = false;
              break;
            }

            width += range.x;
            height = width / aspectRatio;
          } else {
            if (range.x >= 0) {
              if (right < maxWidth) {
                width += range.x;
              } else if (range.y >= 0 && bottom >= maxHeight) {
                renderable = false;
              }
            } else {
              width += range.x;
            }

            if (range.y >= 0) {
              if (bottom < maxHeight) {
                height += range.y;
              }
            } else {
              height += range.y;
            }
          }

          if (width < 0 && height < 0) {
            action = ACTION_NORTH_WEST;
            height = 0;
            width = 0;
          } else if (width < 0) {
            action = ACTION_SOUTH_WEST;
            width = 0;
          } else if (height < 0) {
            action = ACTION_NORTH_EAST;
            height = 0;
          }

          break;

        // Move canvas
        case ACTION_MOVE:
          canvas.left += range.x;
          canvas.top += range.y;
          this.renderCanvas(true);
          renderable = false;
          break;

        // Zoom canvas
        case ACTION_ZOOM:
          this.zoom((function (x1, y1, x2, y2) {
            var z1 = sqrt(x1 * x1 + y1 * y1);
            var z2 = sqrt(x2 * x2 + y2 * y2);

            return (z2 - z1) / z1;
          })(abs(this.startX - this.startX2), abs(this.startY - this.startY2), abs(this.endX - this.endX2), abs(this.endY - this.endY2)), originalEvent);
          this.startX2 = this.endX2;
          this.startY2 = this.endY2;
          renderable = false;
          break;

        // Create crop box
        case ACTION_CROP:
          if (range.x && range.y) {
            offset = this.$cropper.offset();
            left = this.startX - offset.left;
            top = this.startY - offset.top;
            width = cropBox.minWidth;
            height = cropBox.minHeight;

            if (range.x > 0) {
              if (range.y > 0) {
                action = ACTION_SOUTH_EAST;
              } else {
                action = ACTION_NORTH_EAST;
                top -= height;
              }
            } else {
              if (range.y > 0) {
                action = ACTION_SOUTH_WEST;
                left -= width;
              } else {
                action = ACTION_NORTH_WEST;
                left -= width;
                top -= height;
              }
            }

            // Show the crop box if is hidden
            if (!this.cropped) {
              this.cropped = true;
              this.$cropBox.removeClass(CLASS_HIDDEN);
            }
          }

          break;

        // No default
      }

      if (renderable) {
        cropBox.width = width;
        cropBox.height = height;
        cropBox.left = left;
        cropBox.top = top;
        this.action = action;

        this.renderCropBox();
      }

      // Override
      this.startX = this.endX;
      this.startY = this.endY;
    }
  });

  $.extend(prototype, {

    // Show the crop box manually
    crop: function crop() {
      if (!this.built || this.disabled) {
        return;
      }

      if (!this.cropped) {
        this.cropped = true;
        this.limitCropBox(true, true);

        if (this.options.modal) {
          this.$dragBox.addClass(CLASS_MODAL);
        }

        this.$cropBox.removeClass(CLASS_HIDDEN);
      }

      this.setCropBoxData(this.initialCropBox);
    },

    // Reset the image and crop box to their initial states
    reset: function reset() {
      if (!this.built || this.disabled) {
        return;
      }

      this.image = $.extend({}, this.initialImage);
      this.canvas = $.extend({}, this.initialCanvas);

      // Required for strict mode
      this.cropBox = $.extend({}, this.initialCropBox);

      this.renderCanvas();

      if (this.cropped) {
        this.renderCropBox();
      }
    },

    // Clear the crop box
    clear: function clear() {
      if (!this.cropped || this.disabled) {
        return;
      }

      $.extend(this.cropBox, {
        left: 0,
        top: 0,
        width: 0,
        height: 0
      });

      this.cropped = false;
      this.renderCropBox();

      this.limitCanvas();

      // Render canvas after crop box rendered
      this.renderCanvas();

      this.$dragBox.removeClass(CLASS_MODAL);
      this.$cropBox.addClass(CLASS_HIDDEN);
    },

    /**
     * Replace the image's src and rebuild the cropper
     *
     * @param {String} url
     */
    replace: function replace(url) {
      if (!this.disabled && url) {
        if (this.isImg) {
          this.$element.attr('src', url);
        }

        // Clear previous data
        this.options.data = null;
        this.load(url);
      }
    },

    // Enable (unfreeze) the cropper
    enable: function enable() {
      if (this.built) {
        this.disabled = false;
        this.$cropper.removeClass(CLASS_DISABLED);
      }
    },

    // Disable (freeze) the cropper
    disable: function disable() {
      if (this.built) {
        this.disabled = true;
        this.$cropper.addClass(CLASS_DISABLED);
      }
    },

    // Destroy the cropper and remove the instance from the image
    destroy: function destroy() {
      var $this = this.$element;

      if (this.ready) {
        if (this.isImg) {
          $this.attr('src', this.originalUrl);
        }

        this.unbuild();
        $this.removeClass(CLASS_HIDDEN);
      } else {
        if (this.isImg) {
          $this.off(EVENT_LOAD, this.start);
        } else if (this.$clone) {
          this.$clone.remove();
        }
      }

      $this.removeData(NAMESPACE);
    },

    /**
     * Move the canvas
     *
     * @param {Number} offsetX
     * @param {Number} offsetY (optional)
     */
    move: function move(offsetX, offsetY) {
      var canvas = this.canvas;

      // If "offsetY" is not present, its default value is "offsetX"
      if (isUndefined(offsetY)) {
        offsetY = offsetX;
      }

      offsetX = num(offsetX);
      offsetY = num(offsetY);

      if (this.built && !this.disabled && this.options.movable) {
        canvas.left += isNumber(offsetX) ? offsetX : 0;
        canvas.top += isNumber(offsetY) ? offsetY : 0;
        this.renderCanvas(true);
      }
    },

    /**
     * Zoom the canvas
     *
     * @param {Number} ratio
     * @param {Event} _originalEvent (private)
     */
    zoom: function zoom(ratio, _originalEvent) {
      var canvas = this.canvas;
      var width;
      var height;

      ratio = num(ratio);

      if (ratio && this.built && !this.disabled && this.options.zoomable) {
        if (this.trigger(EVENT_ZOOM, {
          originalEvent: _originalEvent,
          ratio: ratio
        })) {
          return;
        }

        if (ratio < 0) {
          ratio = 1 / (1 - ratio);
        } else {
          ratio = 1 + ratio;
        }

        width = canvas.width * ratio;
        height = canvas.height * ratio;
        canvas.left -= (width - canvas.width) / 2;
        canvas.top -= (height - canvas.height) / 2;
        canvas.width = width;
        canvas.height = height;
        this.renderCanvas(true);
        this.setDragMode(ACTION_MOVE);
      }
    },

    /**
     * Rotate the canvas
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#rotate()
     *
     * @param {Number} degree
     */
    rotate: function rotate(degree) {
      var image = this.image;
      var rotate = image.rotate || 0;

      degree = num(degree) || 0;

      if (this.built && !this.disabled && this.options.rotatable) {
        image.rotate = (rotate + degree) % 360;
        this.rotated = true;
        this.renderCanvas(true);
      }
    },

    /**
     * Scale the image
     * https://developer.mozilla.org/en-US/docs/Web/CSS/transform-function#scale()
     *
     * @param {Number} scaleX
     * @param {Number} scaleY (optional)
     */
    scale: function scale(scaleX, scaleY) {
      var image = this.image;

      // If "scaleY" is not present, its default value is "scaleX"
      if (isUndefined(scaleY)) {
        scaleY = scaleX;
      }

      scaleX = num(scaleX);
      scaleY = num(scaleY);

      if (this.built && !this.disabled && this.options.scalable) {
        image.scaleX = isNumber(scaleX) ? scaleX : 1;
        image.scaleY = isNumber(scaleY) ? scaleY : 1;
        this.renderImage(true);
      }
    },

    /**
     * Get the cropped area position and size data (base on the original image)
     *
     * @param {Boolean} rounded (optional)
     * @return {Object} data
     */
    getData: function getData(rounded) {
      var options = this.options;
      var image = this.image;
      var canvas = this.canvas;
      var cropBox = this.cropBox;
      var ratio;
      var data;

      if (this.built && this.cropped) {
        data = {
          x: cropBox.left - canvas.left,
          y: cropBox.top - canvas.top,
          width: cropBox.width,
          height: cropBox.height
        };

        ratio = image.width / image.naturalWidth;

        $.each(data, function (i, n) {
          n = n / ratio;
          data[i] = rounded ? Math.round(n) : n;
        });
      } else {
        data = {
          x: 0,
          y: 0,
          width: 0,
          height: 0
        };
      }

      if (options.rotatable) {
        data.rotate = image.rotate || 0;
      }

      if (options.scalable) {
        data.scaleX = image.scaleX || 1;
        data.scaleY = image.scaleY || 1;
      }

      return data;
    },

    /**
     * Set the cropped area position and size with new data
     *
     * @param {Object} data
     */
    setData: function setData(data) {
      var image = this.image;
      var canvas = this.canvas;
      var cropBoxData = {};
      var ratio;

      if ($.isFunction(data)) {
        data = data.call(this.$element);
      }

      if (this.built && !this.disabled && $.isPlainObject(data)) {
        if (isNumber(data.rotate) && data.rotate !== image.rotate && this.options.rotatable) {

          image.rotate = data.rotate;
          this.rotated = true;
          this.renderCanvas(true);
        }

        ratio = image.width / image.naturalWidth;

        if (isNumber(data.x)) {
          cropBoxData.left = data.x * ratio + canvas.left;
        }

        if (isNumber(data.y)) {
          cropBoxData.top = data.y * ratio + canvas.top;
        }

        if (isNumber(data.width)) {
          cropBoxData.width = data.width * ratio;
        }

        if (isNumber(data.height)) {
          cropBoxData.height = data.height * ratio;
        }

        this.setCropBoxData(cropBoxData);
      }
    },

    /**
     * Get the container size data
     *
     * @return {Object} data
     */
    getContainerData: function getContainerData() {
      return this.built ? this.container : {};
    },

    /**
     * Get the image position and size data
     *
     * @return {Object} data
     */
    getImageData: function getImageData() {
      return this.ready ? this.image : {};
    },

    /**
     * Get the canvas position and size data
     *
     * @return {Object} data
     */
    getCanvasData: function getCanvasData() {
      var canvas = this.canvas;
      var data;

      if (this.built) {
        data = {
          left: canvas.left,
          top: canvas.top,
          width: canvas.width,
          height: canvas.height
        };
      }

      return data || {};
    },

    /**
     * Set the canvas position and size with new data
     *
     * @param {Object} data
     */
    setCanvasData: function setCanvasData(data) {
      var canvas = this.canvas;
      var aspectRatio = canvas.aspectRatio;

      if ($.isFunction(data)) {
        data = data.call(this.$element);
      }

      if (this.built && !this.disabled && $.isPlainObject(data)) {
        if (isNumber(data.left)) {
          canvas.left = data.left;
        }

        if (isNumber(data.top)) {
          canvas.top = data.top;
        }

        if (isNumber(data.width)) {
          canvas.width = data.width;
          canvas.height = data.width / aspectRatio;
        } else if (isNumber(data.height)) {
          canvas.height = data.height;
          canvas.width = data.height * aspectRatio;
        }

        this.renderCanvas(true);
      }
    },

    /**
     * Get the crop box position and size data
     *
     * @return {Object} data
     */
    getCropBoxData: function getCropBoxData() {
      var cropBox = this.cropBox;
      var data;

      if (this.built && this.cropped) {
        data = {
          left: cropBox.left,
          top: cropBox.top,
          width: cropBox.width,
          height: cropBox.height
        };
      }

      return data || {};
    },

    /**
     * Set the crop box position and size with new data
     *
     * @param {Object} data
     */
    setCropBoxData: function setCropBoxData(data) {
      var cropBox = this.cropBox;
      var aspectRatio = this.options.aspectRatio;
      var widthChanged;
      var heightChanged;

      if ($.isFunction(data)) {
        data = data.call(this.$element);
      }

      if (this.built && this.cropped && !this.disabled && $.isPlainObject(data)) {

        if (isNumber(data.left)) {
          cropBox.left = data.left;
        }

        if (isNumber(data.top)) {
          cropBox.top = data.top;
        }

        if (isNumber(data.width) && data.width !== cropBox.width) {
          widthChanged = true;
          cropBox.width = data.width;
        }

        if (isNumber(data.height) && data.height !== cropBox.height) {
          heightChanged = true;
          cropBox.height = data.height;
        }

        if (aspectRatio) {
          if (widthChanged) {
            cropBox.height = cropBox.width / aspectRatio;
          } else if (heightChanged) {
            cropBox.width = cropBox.height * aspectRatio;
          }
        }

        this.renderCropBox();
      }
    },

    /**
     * Get a canvas drawn the cropped image
     *
     * @param {Object} options (optional)
     * @return {HTMLCanvasElement} canvas
     */
    getCroppedCanvas: function getCroppedCanvas(options) {
      var originalWidth;
      var originalHeight;
      var canvasWidth;
      var canvasHeight;
      var scaledWidth;
      var scaledHeight;
      var scaledRatio;
      var aspectRatio;
      var canvas;
      var context;
      var data;

      if (!this.built || !this.cropped || !SUPPORT_CANVAS) {
        return;
      }

      if (!$.isPlainObject(options)) {
        options = {};
      }

      data = this.getData();
      originalWidth = data.width;
      originalHeight = data.height;
      aspectRatio = originalWidth / originalHeight;

      if ($.isPlainObject(options)) {
        scaledWidth = options.width;
        scaledHeight = options.height;

        if (scaledWidth) {
          scaledHeight = scaledWidth / aspectRatio;
          scaledRatio = scaledWidth / originalWidth;
        } else if (scaledHeight) {
          scaledWidth = scaledHeight * aspectRatio;
          scaledRatio = scaledHeight / originalHeight;
        }
      }

      canvasWidth = scaledWidth || originalWidth;
      canvasHeight = scaledHeight || originalHeight;

      canvas = $('<canvas>')[0];
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      context = canvas.getContext('2d');

      if (options.fillColor) {
        context.fillStyle = options.fillColor;
        context.fillRect(0, 0, canvasWidth, canvasHeight);
      }

      // https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D.drawImage
      context.drawImage.apply(context, (function () {
        var source = getSourceCanvas(this.$clone[0], this.image);
        var sourceWidth = source.width;
        var sourceHeight = source.height;
        var args = [source];

        // Source canvas
        var srcX = data.x;
        var srcY = data.y;
        var srcWidth;
        var srcHeight;

        // Destination canvas
        var dstX;
        var dstY;
        var dstWidth;
        var dstHeight;

        if (srcX <= -originalWidth || srcX > sourceWidth) {
          srcX = srcWidth = dstX = dstWidth = 0;
        } else if (srcX <= 0) {
          dstX = -srcX;
          srcX = 0;
          srcWidth = dstWidth = min(sourceWidth, originalWidth + srcX);
        } else if (srcX <= sourceWidth) {
          dstX = 0;
          srcWidth = dstWidth = min(originalWidth, sourceWidth - srcX);
        }

        if (srcWidth <= 0 || srcY <= -originalHeight || srcY > sourceHeight) {
          srcY = srcHeight = dstY = dstHeight = 0;
        } else if (srcY <= 0) {
          dstY = -srcY;
          srcY = 0;
          srcHeight = dstHeight = min(sourceHeight, originalHeight + srcY);
        } else if (srcY <= sourceHeight) {
          dstY = 0;
          srcHeight = dstHeight = min(originalHeight, sourceHeight - srcY);
        }

        args.push(srcX, srcY, srcWidth, srcHeight);

        // Scale destination sizes
        if (scaledRatio) {
          dstX *= scaledRatio;
          dstY *= scaledRatio;
          dstWidth *= scaledRatio;
          dstHeight *= scaledRatio;
        }

        // Avoid "IndexSizeError" in IE and Firefox
        if (dstWidth > 0 && dstHeight > 0) {
          args.push(dstX, dstY, dstWidth, dstHeight);
        }

        return args;
      }).call(this));

      return canvas;
    },

    /**
     * Change the aspect ratio of the crop box
     *
     * @param {Number} aspectRatio
     */
    setAspectRatio: function setAspectRatio(aspectRatio) {
      var options = this.options;

      if (!this.disabled && !isUndefined(aspectRatio)) {

        // 0 -> NaN
        options.aspectRatio = num(aspectRatio) || NaN;

        if (this.built) {
          this.initCropBox();

          if (this.cropped) {
            this.renderCropBox();
          }
        }
      }
    },

    /**
     * Change the drag mode
     *
     * @param {String} mode (optional)
     */
    setDragMode: function setDragMode(mode) {
      var options = this.options;
      var croppable;
      var movable;

      if (this.ready && !this.disabled) {
        croppable = options.dragCrop && mode === ACTION_CROP;
        movable = options.movable && mode === ACTION_MOVE;
        mode = croppable || movable ? mode : ACTION_NONE;

        this.$dragBox.data('action', mode).toggleClass(CLASS_CROP, croppable).toggleClass(CLASS_MOVE, movable);

        if (!options.cropBoxMovable) {

          // Sync drag mode to crop box when it is not movable(#300)
          this.$face.data('action', mode).toggleClass(CLASS_CROP, croppable).toggleClass(CLASS_MOVE, movable);
        }
      }
    }
  });

  $.extend(Cropper.prototype, prototype);

  Cropper.DEFAULTS = {

    // Define the aspect ratio of the crop box
    aspectRatio: NaN,

    // An object with the previous cropping result data
    data: null,

    // A jQuery selector for adding extra containers to preview
    preview: '',

    // Strict mode, the image cannot zoom out less than the container
    strict: true,

    // Rebuild when resize the window
    responsive: true,

    // Check if the target image is cross origin
    checkImageOrigin: true,

    // Show the black modal
    modal: true,

    // Show the dashed lines for guiding
    guides: true,

    // Show the center indicator for guiding
    center: true,

    // Show the white modal to highlight the crop box
    highlight: true,

    // Show the grid background
    background: true,

    // Enable to crop the image automatically when initialize
    autoCrop: true,

    // Define the percentage of automatic cropping area when initializes
    autoCropArea: 0.8,

    // Enable to create new crop box by dragging over the image
    dragCrop: true,

    // Enable to move the image
    movable: true,

    // Enable to rotate the image
    rotatable: true,

    // Enable to scale the image
    scalable: true,

    // Enable to zoom the image
    zoomable: true,

    // Enable to zoom the image by wheeling mouse
    mouseWheelZoom: true,

    // Define zoom ratio when zoom the image by wheeling mouse
    wheelZoomRatio: 0.1,

    // Enable to zoom the image by dragging touch
    touchDragZoom: true,

    // Enable to move the crop box
    cropBoxMovable: true,

    // Enable to resize the crop box
    cropBoxResizable: true,

    // Toggle drag mode between "crop" and "move" when double click on the cropper
    doubleClickToggle: true,

    // Size limitation
    minCanvasWidth: 0,
    minCanvasHeight: 0,
    minCropBoxWidth: 0,
    minCropBoxHeight: 0,
    minContainerWidth: 200,
    minContainerHeight: 100,

    // Shortcuts of events
    build: null,
    built: null,
    cropstart: null,
    cropmove: null,
    cropend: null,
    crop: null,
    zoom: null
  };

  Cropper.setDefaults = function (options) {
    $.extend(Cropper.DEFAULTS, options);
  };

  Cropper.TEMPLATE = '<div class="cropper-container">' + '<div class="cropper-canvas"></div>' + '<div class="cropper-drag-box"></div>' + '<div class="cropper-crop-box">' + '<span class="cropper-view-box"></span>' + '<span class="cropper-dashed dashed-h"></span>' + '<span class="cropper-dashed dashed-v"></span>' + '<span class="cropper-center"></span>' + '<span class="cropper-face"></span>' + '<span class="cropper-line line-e" data-action="e"></span>' + '<span class="cropper-line line-n" data-action="n"></span>' + '<span class="cropper-line line-w" data-action="w"></span>' + '<span class="cropper-line line-s" data-action="s"></span>' + '<span class="cropper-point point-e" data-action="e"></span>' + '<span class="cropper-point point-n" data-action="n"></span>' + '<span class="cropper-point point-w" data-action="w"></span>' + '<span class="cropper-point point-s" data-action="s"></span>' + '<span class="cropper-point point-ne" data-action="ne"></span>' + '<span class="cropper-point point-nw" data-action="nw"></span>' + '<span class="cropper-point point-sw" data-action="sw"></span>' + '<span class="cropper-point point-se" data-action="se"></span>' + '</div>' + '</div>';

  // Save the other cropper
  Cropper.other = $.fn.cropper;

  // Register as jQuery plugin
  $.fn.cropper = function (options) {
    var args = toArray(arguments, 1);
    var result;

    this.each(function () {
      var $this = $(this);
      var data = $this.data(NAMESPACE);
      var fn;

      if (!data) {
        if (/destroy/.test(options)) {
          return;
        }

        $this.data(NAMESPACE, data = new Cropper(this, options));
      }

      if (typeof options === 'string' && $.isFunction(fn = data[options])) {
        result = fn.apply(data, args);
      }
    });

    return isUndefined(result) ? this : result;
  };

  $.fn.cropper.Constructor = Cropper;
  $.fn.cropper.setDefaults = Cropper.setDefaults;

  // No conflict
  $.fn.cropper.noConflict = function () {
    $.fn.cropper = Cropper.other;
    return this;
  };
});
/*!
 * Datepicker v0.1.0
 * https://github.com/fengyuanchen/datepicker
 *
 * Copyright 2014 Fengyuan Chen
 * Released under the MIT license
 */

"use strict";

(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD. Register as anonymous module.
        define(["jquery"], factory);
    } else {
        // Browser globals.
        factory(jQuery);
    }
})(function ($) {

    "use strict";

    var $window = $(window),
        $document = $(document),
        Datepicker = function Datepicker(element, options) {
        this.$element = $(element);
        this.defaults = $.extend({}, Datepicker.defaults, this.$element.data(), $.isPlainObject(options) ? options : {});
        this.init();
    };

    Datepicker.prototype = {
        constructor: Datepicker,

        init: function init() {
            var trigger = this.defaults.trigger;

            this.$trigger = trigger ? $(trigger) : this.$element;
            this.$picker = $(this.defaults.template);
            this.$years = this.$picker.find("[data-type='years picker']");
            this.$months = this.$picker.find("[data-type='months picker']");
            this.$days = this.$picker.find("[data-type='days picker']");
            this.$picker.appendTo("body");
            this.place();
            this.hide();

            this.format = Datepicker.fn.parseFormat(this.defaults.dateFormat);
            this.fillWeek();
            this.enable();
        },

        enable: function enable() {
            if (this.enabled) {
                return;
            }

            if (this.$element.is("input")) {
                this.$element.on("keyup", $.proxy(this.update, this));

                if (!this.defaults.trigger) {
                    this.$element.on("focus", $.proxy(this.show, this));
                }
            }

            this.$trigger.on("click", $.proxy(this.show, this));

            this.$picker.on({
                click: $.proxy(this.click, this),
                mousedown: $.proxy(this.mousedown, this)
            });

            this.update();
            this.enabled = true;
        },

        disable: function disable() {
            if (!this.enabled) {
                return;
            }

            if (this.$element.is("input")) {
                this.$element.off("keyup", this.update);

                if (!this.defaults.trigger) {
                    this.$element.off("focus", this.show);
                }
            }

            this.$trigger.off("click", this.show);

            this.$picker.off({
                click: this.click,
                mousedown: this.mousedown
            });

            this.hide();
            this.enabled = false;
        },

        showView: function showView(type) {
            var format = this.format;

            if (format.year || format.month || format.day) {
                switch (type) {

                    case 2:
                    case "years":
                        this.$months.hide();
                        this.$days.hide();

                        if (format.year) {
                            this.fillYears();
                            this.$years.show();
                        } else {
                            this.showView(0);
                        }

                        break;

                    case 1:
                    case "months":
                        this.$years.hide();
                        this.$days.hide();

                        if (format.month) {
                            this.fillMonths();
                            this.$months.show();
                        } else {
                            this.showView(2);
                        }

                        break;

                    // case 0:
                    // case "days":
                    default:
                        this.$years.hide();
                        this.$months.hide();

                        if (format.day) {
                            this.fillDays();
                            this.$days.show();
                        } else {
                            this.showView(1);
                        }
                }
            }
        },

        hideView: function hideView() {
            if (this.defaults.autoClose) {
                this.hide();
            }
        },

        place: function place() {
            var offset = this.$trigger.offset(),
                height = this.$trigger.outerHeight();

            this.$picker.css({
                top: offset.top + height,
                left: offset.left
            });
        },

        show: function show() {
            if (!this.enabled) {
                return;
            }

            this.$picker.show();
            $window.on("resize", $.proxy(this.place, this));
            $document.on("mousedown", $.proxy(this.hide, this));

            this.place();
            this.showView(this.defaults.viewStart);
        },

        hide: function hide() {
            this.$picker.hide();
            $window.off("resize", this.place);
            $document.off("mousedown", this.hide);
        },

        mousedown: function mousedown(e) {
            e.stopPropagation();
            e.preventDefault();
        },

        update: function update() {
            var viewDate = this.$element.is("input") ? this.$element.prop("value") : this.$element.text();

            this.date = Datepicker.fn.parseDate(viewDate, this.format);
            this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), this.date.getDate(), 0, 0, 0, 0);
            this.fillAll();
        },

        output: function output() {
            var $element = this.$element,
                date = Datepicker.fn.formatDate(this.date, this.format);

            if ($element.is("input")) {
                $element.prop("value", date).trigger("change");
            } else {
                $element.text(date);
            }
        },

        template: function template(options) {
            var defaults = {
                text: "",
                type: "",
                selected: false,
                disabled: false
            };

            $.extend(defaults, options);

            return ['<' + this.defaults.itemTag + ' ', defaults.selected ? 'class="' + this.defaults.selectedClass + '"' : defaults.disabled ? 'class="' + this.defaults.disabledClass + '"' : '', defaults.type ? ' data-type="' + defaults.type + '"' : '', '>', defaults.text, '</' + this.defaults.itemTag + '>'].join("");
        },

        fillAll: function fillAll() {
            this.fillYears();
            this.fillMonths();
            this.fillDays();
        },

        fillYears: function fillYears() {
            var title = "",
                items = [],
                suffix = this.defaults.yearSuffix || "",
                year = this.date.getFullYear(),
                viewYear = this.viewDate.getFullYear(),
                isCurrent,
                i;

            title = viewYear - 5 + suffix + " - " + (viewYear + 6) + suffix;

            for (i = -5; i < 7; i++) {
                isCurrent = viewYear + i === year;
                items.push(this.template({
                    text: viewYear + i,
                    type: isCurrent ? "year selected" : "year",
                    selected: isCurrent,
                    disabled: i === -5 || i === 6
                }));
            }

            this.$picker.find("[data-type='years current']").html(title);
            this.$picker.find("[data-type='years']").empty().html(items.join(""));
        },

        fillMonths: function fillMonths() {
            var title = "",
                items = [],
                options = this.defaults.monthsShort,
                year = this.date.getFullYear(),
                month = this.date.getMonth(),
                viewYear = this.viewDate.getFullYear(),
                isCurrent,
                i;

            title = viewYear.toString() + this.defaults.yearSuffix || "";

            for (i = 0; i < 12; i++) {
                isCurrent = viewYear === year && i === month;

                items.push(this.template({
                    text: options[i],
                    type: isCurrent ? "month selected" : "month",
                    selected: isCurrent
                }));
            }

            this.$picker.find("[data-type='year current']").html(title);
            this.$picker.find("[data-type='months']").empty().html(items.join(""));
        },

        fillWeek: function fillWeek() {
            var items = [],
                options = this.defaults.daysMin,
                weekStart = parseInt(this.defaults.weekStart, 10) % 7,
                i;

            options = $.merge(options.slice(weekStart), options.slice(0, weekStart));

            for (i = 0; i < 7; i++) {
                items.push(this.template({
                    text: options[i]
                }));
            }

            this.$picker.find("[data-type='week']").empty().html(items.join(""));
        },

        fillDays: function fillDays() {
            var title = "",
                items = [],
                prevItems = [],
                currentItems = [],
                nextItems = [],
                options = this.defaults.monthsShort,
                suffix = this.defaults.yearSuffix || "",
                year = this.date.getFullYear(),
                month = this.date.getMonth(),
                day = this.date.getDate(),
                viewYear = this.viewDate.getFullYear(),
                viewMonth = this.viewDate.getMonth(),
                weekStart = parseInt(this.defaults.weekStart, 10) % 7,
                isCurrent,
                isDisabled,
                length,
                date,
                i,
                n;

            // Title of current month
            title = this.defaults.showMonthAfterYear ? viewYear + suffix + " " + options[viewMonth] : options[viewMonth] + " " + viewYear + suffix;

            // Days of prev month
            length = viewMonth === 0 ? Datepicker.fn.getDaysInMonth(viewYear - 1, 11) : Datepicker.fn.getDaysInMonth(viewYear, viewMonth - 1);

            for (i = 1; i <= length; i++) {
                prevItems.push(this.template({
                    text: i,
                    type: "day prev",
                    disabled: true
                }));
            }

            date = new Date(viewYear, viewMonth, 1, 0, 0, 0, 0); // The first day of current month
            n = (7 + (date.getDay() - weekStart)) % 7;
            n = n > 0 ? n : 7;
            prevItems = prevItems.slice(length - n);

            // Days of prev month next
            length = viewMonth === 11 ? Datepicker.fn.getDaysInMonth(viewYear + 1, 0) : Datepicker.fn.getDaysInMonth(viewYear, viewMonth + 1);

            for (i = 1; i <= length; i++) {
                nextItems.push(this.template({
                    text: i,
                    type: "day next",
                    disabled: true
                }));
            }

            length = Datepicker.fn.getDaysInMonth(viewYear, viewMonth);
            date = new Date(viewYear, viewMonth, length, 0, 0, 0, 0); // The last day of current month
            n = (7 - (date.getDay() + 1 - weekStart)) % 7;
            n = n >= 7 * 6 - (prevItems.length + length) ? n : n + 7; // 7 * 6 : 7 columns & 6 rows, 42 items
            nextItems = nextItems.slice(0, n);

            // Days of current month
            for (i = 1; i <= length; i++) {
                isCurrent = viewYear === year && viewMonth === month && i === day;
                isDisabled = this.defaults.isDisabled(new Date(viewYear, viewMonth, i));

                currentItems.push(this.template({
                    text: i,
                    type: isDisabled ? "day disabled" : isCurrent ? "day selected" : "day",
                    selected: isCurrent,
                    disabled: isDisabled
                }));
            }

            // Merge all the days
            $.merge(items, prevItems);
            $.merge(items, currentItems);
            $.merge(items, nextItems);

            this.$picker.find("[data-type='month current']").html(title);
            this.$picker.find("[data-type='days']").empty().html(items.join(""));
        },

        click: function click(e) {
            var $target = $(e.target),
                yearRegex = /^\d{2,4}$/,
                isYear = false,
                viewYear,
                viewMonth,
                viewDay,
                year,
                type;

            e.stopPropagation();
            e.preventDefault();

            if ($target.length === 0) {
                return;
            }

            viewYear = this.viewDate.getFullYear();
            viewMonth = this.viewDate.getMonth();
            viewDay = this.viewDate.getDate();
            type = $target.data().type;

            switch (type) {
                case "years prev":
                case "years next":
                    viewYear = type === "years prev" ? viewYear - 10 : viewYear + 10;
                    year = $target.text();
                    isYear = yearRegex.test(year);

                    if (isYear) {
                        viewYear = parseInt(year, 10);
                        this.date = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    }

                    this.viewDate = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    this.fillYears();

                    if (isYear) {
                        this.showView(1);
                        this.output();
                    }

                    break;

                case "year prev":
                case "year next":
                    viewYear = type === "year prev" ? viewYear - 1 : viewYear + 1;
                    this.viewDate = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    this.fillMonths();
                    break;

                case "year current":

                    if (this.format.year) {
                        this.showView(2);
                    }

                    break;

                case "year selected":

                    if (this.format.month) {
                        this.showView(1);
                    } else {
                        this.hideView();
                    }

                    break;

                case "year":
                    viewYear = parseInt($target.text(), 10);
                    this.date = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    this.viewDate = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);

                    if (this.format.month) {
                        this.showView(1);
                    } else {
                        this.hideView();
                    }

                    this.output();
                    break;

                case "month prev":
                case "month next":
                    viewMonth = type === "month prev" ? viewMonth - 1 : type === "month next" ? viewMonth + 1 : viewMonth;
                    this.viewDate = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    this.fillDays();
                    break;

                case "month current":

                    if (this.format.month) {
                        this.showView(1);
                    }

                    break;

                case "month selected":

                    if (this.format.day) {
                        this.showView(0);
                    } else {
                        this.hideView();
                    }

                    break;

                case "month":
                    viewMonth = $target.parent().children().index($target);
                    this.date = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);
                    this.viewDate = new Date(viewYear, viewMonth, Math.min(viewDay, 28), 0, 0, 0, 0);

                    if (this.format.day) {
                        this.showView(0);
                    } else {
                        this.hideView();
                    }

                    this.output();
                    break;

                case "day prev":
                case "day next":
                case "day":
                    viewMonth = type === "day prev" ? viewMonth - 1 : type === "day next" ? viewMonth + 1 : viewMonth;
                    viewDay = parseInt($target.text(), 10);
                    this.date = new Date(viewYear, viewMonth, viewDay, 0, 0, 0, 0);
                    this.viewDate = new Date(viewYear, viewMonth, viewDay, 0, 0, 0, 0);
                    this.fillDays();

                    if (type === "day") {
                        this.hideView();
                    }

                    this.output();
                    break;

                case "day selected":
                    this.hideView();
                    this.output();
                    break;

                case "day disabled":
                    this.hideView();
                    break;

                // No default
            }
        }
    };

    // Common methods
    Datepicker.fn = {
        isLeapYear: function isLeapYear(year) {
            return year % 4 === 0 && year % 100 !== 0 || year % 400 === 0;
        },

        getDaysInMonth: function getDaysInMonth(year, month) {
            return [31, this.isLeapYear(year) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month];
        },

        parseFormat: function parseFormat(format) {
            var separator = format.match(/[.\/\-\s].*?/) || "/",
                parts = format.split(/\W+/),
                length,
                i;

            if (!parts || parts.length === 0) {
                throw new Error("Invalid date format.");
            }

            format = {
                separator: separator[0],
                parts: parts
            };

            for (i = 0, length = parts.length; i < length; i++) {
                switch (parts[i]) {
                    case "dd":
                    case "d":
                        format.day = true;
                        break;

                    case "mm":
                    case "m":
                        format.month = true;
                        break;

                    case "yyyy":
                    case "yy":
                        format.year = true;
                        break;

                    // No default
                }
            }

            return format;
        },

        parseDate: function parseDate(date, format) {
            var parts, length, year, day, month, val, i;

            parts = typeof date === "string" && date.length > 0 ? date.split(format.separator) : [];
            length = format.parts.length;

            date = new Date();
            year = date.getFullYear();
            day = date.getDate();
            month = date.getMonth();

            if (parts.length === length) {
                for (i = 0; i < length; i++) {
                    val = parseInt(parts[i], 10) || 1;

                    switch (format.parts[i]) {
                        case "dd":
                        case "d":
                            day = val;
                            break;

                        case "mm":
                        case "m":
                            month = val - 1;
                            break;

                        case "yy":
                            year = 2000 + val;
                            break;

                        case "yyyy":
                            year = val;
                            break;

                        // No default
                    }
                }
            }

            return new Date(year, month, day, 0, 0, 0, 0);
        },

        formatDate: function formatDate(date, format) {
            var val = {
                d: date.getDate(),
                m: date.getMonth() + 1,
                yy: date.getFullYear().toString().substring(2),
                yyyy: date.getFullYear()
            },
                parts = [],
                length = format.parts.length,
                i;

            val.dd = (val.d < 10 ? "0" : "") + val.d;
            val.mm = (val.m < 10 ? "0" : "") + val.m;

            for (i = 0; i < length; i++) {
                parts.push(val[format.parts[i]]);
            }

            return parts.join(format.separator);
        }
    };

    Datepicker.defaults = {
        autoClose: false,
        dateFormat: "mm/dd/yyyy",
        days: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
        daysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        daysMin: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"],
        disabledClass: "disabled",

        isDisabled: function isDisabled() /* date */{
            return false;
        },

        itemTag: "li",
        months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
        monthsShort: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
        selectedClass: "selected",
        showMonthAfterYear: false,
        template: ['<div class="datepicker-container" data-type="datepicker">', '<div class="datepicker-arrow"></div>', '<div class="datepicker-content">', '<div class="content-years" data-type="years picker">', '<ul class="datepicker-title">', '<li class="datepicker-prev" data-type="years prev">&lsaquo;</li>', '<li class="col-5" data-type="years current"></li>', '<li class="datepicker-next" data-type="years next">&rsaquo;</li>', '</ul>', '<ul class="datepicker-years" data-type="years"></ul>', '</div>', '<div class="content-months" data-type="months picker">', '<ul class="datepicker-title">', '<li class="datepicker-prev" data-type="year prev">&lsaquo;</li>', '<li class="col-5" data-type="year current"></li>', '<li class="datepicker-next" data-type="year next">&rsaquo;</li>', '</ul>', '<ul class="datepicker-months" data-type="months"></ul>', '</div>', '<div class="content-days" data-type="days picker">', '<ul class="datepicker-title">', '<li class="datepicker-prev" data-type="month prev">&lsaquo;</li>', '<li class="col-5" data-type="month current"></li>', '<li class="datepicker-next" data-type="month next">&rsaquo;</li>', '</ul>', '<ul class="datepicker-week" data-type="week"></ul>', '<ul class="datepicker-days" data-type="days"></ul>', '</div>', '</div>', '</div>'].join(""),
        trigger: undefined,
        viewStart: 0, // 0 for "days", 1 for "months", 2 for "years"
        weekStart: 0, // 0 for Sunday, 1 for Monday, 2 for Tuesday, 3 for Wednesday, 4 for Thursday, 5 for Friday, 6 for Saturday
        yearSuffix: ""
    };

    Datepicker.setDefaults = function (options) {
        $.extend(Datepicker.defaults, options);
    };

    // Register as jQuery plugin
    $.fn.datepicker = function (options) {
        return this.each(function () {
            var $this = $(this),
                data = $this.data("datepicker");

            if (!data) {
                data = new Datepicker(this, options);
                $this.data("datepicker", data);
            }

            if (typeof options === "string" && $.isFunction(data[options])) {
                data[options]();
            }
        });
    };

    $.fn.datepicker.constructor = Datepicker;
    $.fn.datepicker.setDefaults = Datepicker.setDefaults;

    $(function () {
        $("[datepicker]").datepicker();
    });
});
'use strict';

jform.editors.extend('select2', {
  tagName: 'select',
  initialize: function initialize(options) {
    this.options = options;
    this.$instance = null;
  },
  onBeforeRender: function onBeforeRender() {
    if (this.$instance) {
      this.$instance.destroy();
      this.$instance = void 0;
    }
  },
  onRender: function onRender() {
    $(this.el).select2(this.options);
    this.$instance = $(this.el).data('select2');
  },
  setValue: function setValue(value) {
    $(this.el).select2('data', value);
  },
  getValue: function getValue() {
    return $(this.el).select2('data');
  },

  clear: function clear() {
    $(this.el).select2('data', '');
  },

  onDestroy: function onDestroy() {
    if (this.$instance) {
      this.$instance.destroy();
    }
  }

});
'use strict';

jform.editors.extend('date-time', {
  events: {
    'change': function change(e) {
      console.log('on change');
    }
  },
  tagName: 'input',
  initialize: function initialize() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    this.options = $.extend({}, this.constructor.defaults, options);
    this.$instance = null;
  },
  onBeforeRender: function onBeforeRender() {
    this._destroy();
  },
  onRender: function onRender() {
    $(this.el).datepicker(this.options);
    this.$instance = $(this.el).data('datepicker');
    this.setValue(new Date());
  },
  setValue: function setValue(value) {
    if (!(value instanceof Date)) {
      throw new Error('datepicker invalid value format');
    }

    this.$instance.date = value;
    this.$instance.viewDate = new Date(value.getFullYear(), value.getMonth(), value.getDate(), 0, 0, 0, 0);

    $(this.el).prop('value', this._formatDate(value));

    this.$instance.fillAll();
  },
  getValue: function getValue() {
    return this.$instance.viewDate;
  },

  clear: function clear() {
    this.setValue(new Date());
    this.setDefault();
  },

  onDestroy: function onDestroy() {
    this._destroy();
  },

  _destroy: function _destroy() {
    if (this.$instance) {
      this.$instance.disable();
      this.$instance = void 0;
      $(this.el).data('datepicker', null);
    }
  },
  _formatDate: function _formatDate(date) {
    var fn = $.fn.datepicker.constructor.fn;
    return fn.formatDate(date, this.$instance.format);
  }

}, { defaults: { autoClose: true } });
'use strict';

var imageTemplate = '<div>\n  <div class="crop-preview"></div>\n  <div class="upload-btn-wrap">\n    <span class="btn btn-default btn-sm">Upload</span>\n    <input type="file" class="upload-btn" />\n  </div>\n  <button class="gallery-btn btn btn-sm btn-default">Pick</button>\n  <button class="crop-btn btn btn-sm btn-default pull-right">Crop</button>\n</div>';

var galleryModal = '<div class="modal fade">\n  <div class="modal-dialog modal-lg">\n    <div class="modal-content">\n      <div class="modal-header">\n        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>\n        <h4 class="modal-title">Modal title</h4>\n      </div>\n      <div class="modal-body gallery">\n\n      </div>\n      <div class="modal-footer">\n        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>\n        <button type="button" class="btn btn-primary">Save changes</button>\n      </div>\n    </div><!-- /.modal-content -->\n  </div><!-- /.modal-dialog -->\n</div><!-- /.modal -->';

jform.editors.extend('image-crop', {
  template: imageTemplate,
  ui: {
    uploadButton: '.upload-btn',
    cropPreview: '.crop-preview'
  },
  events: {
    'click .gallery-btn': 'onGallery',
    'click .crop-btn': 'onCrop'
  },
  initialize: function initialize() {},

  onBeforeRender: function onBeforeRender() {
    if (this.uploadButton) {
      this.uploadButton.destroy();
      this.stopListening(this.uploadButton);
    }

    if (this.gallery) {
      this.gallery.remove();
      this.gallery.destroy();
    }
  },

  onRender: function onRender() {
    this.uploadButton = new Assets.UploadButton({
      el: this.ui.uploadButton,
      url: '/files',
      mimeType: 'image/*',
      autoUpload: true
    });

    this.listenTo(this.uploadButton, 'change', function () {
      this.clear();
    });

    this.listenTo(this.uploadButton, 'upload', function (data) {
      var model = this.gallery.collection.create(data, { add: false });
      this.onAssetSelected(model);
      this.triggerChange();
    });

    this.listenTo(this.uploadButton, 'error', function (error) {
      var err = new jform.editors.ValidationError(this.name, null, error.message);
      this.trigger('invalid', err);
    });

    this.uploadButton.render();

    var fragment = document.createRange().createContextualFragment(galleryModal);
    this.el.appendChild(fragment);

    this.ui.modal = this.el.querySelector('.modal');

    var content = this.el.querySelector('.modal-body');

    this.gallery = new Assets.GalleryView({
      el: content,
      url: '/files',
      uploadButton: false
    });

    this.gallery.render();
  },

  onAssetSelected: function onAssetSelected(model) {
    var _this = this;

    var img = new Image();
    this.ui.cropPreview.innerHTML = "";
    $(img).addClass('content');
    img.onload = function () {
      _this.ui.cropPreview.appendChild(img);
    };
    img.src = model.get('url');
  },

  onCrop: function onCrop(e) {
    e.preventDefault();
    var el = this.el.querySelector('.crop-btn');

    var image = this.ui.cropPreview.querySelector('img');

    if (image == null) {
      return;
    }

    if ($(el).hasClass('active')) {
      $(image).cropper('destroy');
      $(el).removeClass('active');
      return;
    }

    $(el).addClass('active');

    $(image).cropper({
      aspectRatio: 3 / 2,
      autoCropArea: 1,
      strict: true,
      guides: false,
      highlight: false,
      dragCrop: false,
      cropBoxMovable: false,
      cropBoxResizable: false
    });
  },

  onGallery: function onGallery(e) {
    var _this2 = this;

    e.preventDefault();

    this.gallery.selected = null;
    this.gallery.collection.fetch();
    var modal = $(this.el).find('.modal');
    modal.modal();
    modal.one('hide.bs.modal ', function () {
      if (_this2.gallery.selected == null) return;

      _this2.onAssetSelected.call(_this2, _this2.gallery.selected);
    });
  },

  clear: function clear() {
    this.ui.cropPreview.innerHTML = '';
  },

  onDestroy: function onDestroy() {
    if (this.gallery) {
      this.gallery.destroy();
    }
    if (this.uploadButton) {
      this.uploadButton.destroy();
    }
  }

});
'use strict';

jform.editors.extend('pegjs', {
  events: {
    'keyup': function keyup(e) {
      /*let err = this.validate();
      if (err !== null) {
        this.trigger('invalid', err);
      }*/
    },
    'change': 'triggerChange',
    'blur': function blur(e) {}
  },
  tagName: 'textarea',
  initialize: function initialize() {
    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

    if (!options.parser) {
      throw jform.createError('[pegjs] no parser specified');
    }
    this.options = options;
    this.parser = options.parser;
  },
  setValue: function setValue(value) {

    if (typeof value !== 'string') {

      if (typeof this.options.compile !== 'function') {
        throw jform.createError("[pegjs] no compiler");
      }

      value = this.options.compile(value);
    }
    $(this.el).val(value);

    var err = this.validate();
    if (err !== null) this.trigger('invalid', err);
  },
  getValue: function getValue() {
    return this._value;
  },

  clear: function clear() {
    $(this.el).val('');
  },
  validate: function validate() {
    var value = $(this.el).val();

    if (value === '') return null;

    try {
      value = this.parser.parse(value);
    } catch (e) {
      var msg = e.message.substr(0, e.message.length - 1) + " at column " + e.column;
      return new jform.editors.ValidationError(this.name, value, msg);
    }

    this._value = value;

    return null;
  }

});
/* global jform:true */
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Form = (function (_jform$Form) {
  _inherits(Form, _jform$Form);

  function Form() {
    _classCallCheck(this, Form);

    _jform$Form.apply(this, arguments);
  }

  Form.prototype.onChange = function onChange(editor) {
    this.validateEditor(editor.name).then(function () {
      var field = editor.el.parentNode;
      var messageField = field.querySelector('.form-message');
      if (messageField) {
        messageField.style.display = 'none';
      }
    })['catch'](function () {});
  };

  Form.prototype.onInvalid = function onInvalid(editor, error) {

    var field = editor.el.parentNode;
    var messageField = field.querySelector('.form-message');

    if (messageField == null) {
      messageField = document.createElement('div');
      messageField.classList.add('form-message');
      field.appendChild(messageField);
    }
    this.__resetMessageField(messageField);
    var msg = error.message || "";
    if (error.errors && error.errors.length) {
      msg = error.errors.map(function (m) {
        return m.message;
      }).join('<br/>');
    }

    $(messageField).html(msg);
    messageField.style.display = 'block';
  };

  Form.prototype.__resetMessageField = function __resetMessageField(elm) {
    $(elm).removeClass('error success').html('');
  };

  return Form;
})(jform.Form);

Form.create = function (elm) {
  var options = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  options.el = elm;
  return new Form(options);
};
return Form;

}));
