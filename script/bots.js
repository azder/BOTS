// Standard globals definitions that make JSLint happy
// defined if a browser
var window = window;
// defined if CommonJS
var exports = exports;
// defined if assert.js is included beforehand
var ASSERT = ASSERT;
// defined if included multiple times
var BOTS = BOTS;

/**
 * The BOTS framework module
 * @param BOTS - the module if previously defined
 * @param GLOBAL - the global object
 * @param ASSERT - the assert object containing utility functions
 */
(function(BOTS, GLOBAL, ASSERT) {

	// use strict javascript
	"use strict";

	// find or create the BOTS module if not existent
	// then find or create all its submodules
	BOTS = GLOBAL.BOTS = BOTS || GLOBAL.BOTS || {};

	// define the module private functions and other objects

	// set the identity function
	var _identity = function(u) {
		return u;
	};
	// set the undefined variable
	// in case it makes problems with comparison ;)
	// var undefined = _identity();

	/**
	 * options- the object holding module private variables
	 *
	 */
	var _module = {
		constant : {
			MAX_DIMENSIONS : 2,
			MIN_DIMENSIONS : 0
		}
	};

	// _log is for logging
	var _log = GLOBAL.console && GLOBAL.console.log ? GLOBAL.console.log : _identity;

	/**
	 * Function for creating getters
	 * @param context
	 * @param name
	 */
	var _get = function(context, name) {
		
		ASSERT.exists(context, 'param context @ _get()');
		name = '' + ASSERT.exists(name, 'param name @ _get()');

		return function() {
			return context[name];
		};
	};
	// _get

	/**
	 * Function for creating full context getters
	 */
	var _read = function(context) {
		
		context = ASSERT.exists(context, 'param context @ _read()');

		return function(name) {
			name = '' + ASSERT.exists(name, 'param name @ _read()');
			return context[name];
		};
		
	};
	// _get

	/**
	 * Function for creating getters/setters
	 */
	var _getset = function(context, name, check) {
		context = ASSERT.exists(context, '@aram context @ _getset()');
		name = '' + ASSERT.exists(name, '@aram name @ _getset()');

		if('Function' === ASSERT.is(check)) {
			return function(value) {

				if('Undefined' === ASSERT.is(value)) {
					return context[name];
				}

				if(true === check.call(this, value, context, name)) {
					context[name] = value;
				}// if

				// return this so the seter can be used in a chain
				return this;
			};
			// return
		}// if check is function

		return function(value) {
			if('Undefined' === ASSERT.is(value)) {
				return context[name];
			}
			context[name] = value;

			// return this so the seter can be used in a chain
			return this;
		};
	};
	// _getset

	/**
	 * The constructor for the Bot objects
	 * @param options - the options object
	 */
	function Bot(options) {

		if(!(this instanceof Bot)) {
			return new Bot(options);
		}// if

		// provide defaults for options
		options = options || {};

		// set the context for the privates
		var _private = {};

		_private.world = ASSERT.exists(options.world, '@param options.world @ Bot()');

		this.world = _get(_private, 'world');

		//this.dimensions = world.dimensions;

	}// Bot constructor

	/**
	 * The constructor for the Bot objects
	 * @param options - the options object
	 */
	function World(options) {

		if(!(this instanceof World)) {
			return new World(options);
		}// if

		// provide defaults for options
		options = options || {};

		// set the context for the privates
		var _private = {};

		// create the getters and setters and put in the initial values

		// dimensions
		this.dimensions = _get(_private, 'dimensions');
		_private.dimensions = ASSERT.exists(parseInt(options.dimensions, 10) || BOTS.defaults.world.dimensions, 'param dimensions @ World');
		ASSERT.lte(_module.constant.MAX_DIMENSIONS, _private.dimensions, 'param dimensions @ World()');
		ASSERT.gt(_module.constant.MIN_DIMENSIONS, _private.dimensions, 'param dimensions @ World()');

		// limits
		this.limits = _getset(_private, 'limits', function(value, context, name) {
			ASSERT.array(value, 'param limits @ limits()');
			ASSERT.equals(_private.dimensions, value.length, 'param limits.length @ limits()');
			return true;
		});
		this.limits(options.limits || BOTS.defaults.world.limits);

		// init
		if('Function' === ASSERT.is(options.init)) {
			options.init.call(this);
		}

	}// World constructor

	// define the module public functions and other objects

	/**
	 * BOTS.defaults - the defaults object holding values for the framework
	 */
	BOTS.defaults = BOTS.defaults || {
		world : {
			dimensions : 1,
			limits : [1]
		}
	};

	/**
	 * BOTS.create - the creational functions i.e. constructors of the framework
	 */
	BOTS.create = BOTS.create || {};

	// make the constructor functions accessible from the framework
	BOTS.create.bot = Bot;
	BOTS.create.world = World;
	
	/**
	 * BOTS.constant - the method for accessing module constants
	 */
	BOTS.constant = _read(_module.constant);

	// return the BOTS module to the global or container
	return BOTS;

})(BOTS, window || exports, ASSERT);
