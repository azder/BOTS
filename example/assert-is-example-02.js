/**
 * The source code here is provided  "AS IS" to anyone under the LGPLv3 licence.
 * (GNU LESSER GENERAL PUBLIC LICENSE, version 3, 29 June 2007)
 * http://www.gnu.org/licenses/lgpl-3.0.txt
 *
 * @author azder ( Goran Peoski ), mail: azhder (at) gmail (dot) com
 */

// Standard globals definitions that make JSLint happy
var GLOBAL = this;
var CONTEXT = {
	// defined if a browser
	window : this.window,
	// defined if CommonJS
	exports : this.exports,
	// can use console to output info
	console : this.console,
	// ASSERT framework
	ASSERT : this.ASSERT,
	// jQuery framework
	jQuery : this.jQuery,
	// the dollar
	'$' : this.jQuery.noConflict()

};

//
(function(window, jQuery, ASSERT, console) {

	// on load
	jQuery(function($) {

		try {

			var is = ASSERT.is;

			function forEach(object, fn) {
				if(null == object) {
					return object;
				}
				for(var name in object) {
					if(Object.hasOwnProperty.call(object, name)) {
						if(false === fn.call(object, object[name], name)) {
							return object;
						}
					} // if
				}// for
				return object;
			}

			function toString(object) {
				return Object.prototype.toString.call(object);
				//.slice(8, -1);
			}

			// function is(object) {
			// if(null === object) {
			// return 'Null';
			// }
			// if('undefined' === typeof object) {
			// return 'Undefined';
			// }
			// if(window === object) {
			// return 'Window';
			// }
			// return Object.prototype.toString.call(object).slice(8, -1);
			// }

			var objects = {
				'0' : 0,
				'new Number' : new Number,
				'NaN' : NaN,
				'Infinity' : Infinity,
				'null' : null,
				'undefined' : undefined,
				'""' : "",
				'new String' : new String,
				'{}' : {},
				'new Object' : new Object,
				'[]' : [],
				'new Array' : new Array,
				'/./' : /./,
				'new RegExp' : new RegExp,
				'function(){}' : function() {
				},
				'new Function' : new Function,
				'new Date' : new Date,
				'new Error' : new Error,
				'arguments' : arguments,
				'window' : window,
				'document' : document,
				'alert' : alert,
				'jQuery' : jQuery,
				'jQuery()' : jQuery(),
				'ASSERT' : ASSERT
			};

			var $is = $('tbody#is');
			forEach(objects, function(object, name) {
				var $tr = $('<tr class="' + is(object) + '"></tr>').appendTo($is);
				$tr.append('<td>' + name + '</td>');
				$tr.append('<td>' + is(object) + '</td>');
				$tr.append('<td>' + toString(object) + '</td>');
				$tr.append('<td>' + typeof object + '</td>');
				$tr.append('<td>' + (null != object ? object.prototype : 'N/A') + '</td>');
				$tr.append('<td>' + (null != object && null != object.prototype ? object.prototype.constructor : 'N/A') + '</td>');
			});
			// forEach
		} catch(e) {

			console.log('error in script', e.name, e.message, e.fileName, e.lineNumber);

		} // try-catch
	});
	// jQuery
})(GLOBAL, CONTEXT.jQuery, CONTEXT.ASSERT, CONTEXT.console);
