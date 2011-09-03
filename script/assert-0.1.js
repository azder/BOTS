var window = window;

(function(ASSERT, GLOBAL) {

	// use strict javascript
	"use strict";

	// aquire the module, create if needed
	ASSERT = GLOBAL.ASSERT = ASSERT || GLOBAL.ASSERT || {};

	var _is = function(object) {

		if(null === object) {
			return 'Null';
		}

		if('undefined' === typeof object) {
			return 'Undefined';
		}

		if(window === object) {
			return 'Window';
		}
		return Object.prototype.toString.call(object).slice(8, -1);
	};
	// _is

	var _fix = function(error, name, message) {

		error.prototype = Error.prototype;
		error.name = name;
		error.message = (message) ? message : name;
		return error;

	};
	// _fix

	var _assertError = function(message) {
		var e = new Error( message ? 'AssertError: ' + message : 'AssertError');
		e.name = 'AssertError';
		return e;
	};
	// _assertError

	// custom AssertError constructor
	function AssertError(message) {

		// constructor safeguard
		if(!this instanceof AssertError) {
			return new AssertError(message);
		}

		this.prototype = new Error();
		this.name = "AssertError";
		this.message = (message) ? message : "AssertError";

	}// AssertError

	// custom ParamError constructor
	function ParamError(message) {

		// constructor safeguard
		if(!this instanceof ParamError) {
			return new ParamError(message);
		}

		this.prototype = Error.prototype;
		this.name = "ParamError";
		this.message = (message) ? message : "ParamError";

	}// ParamError

	/**
	 * Checks if a var is not null and not undefined
	 * @param object - the object to test
	 * @param message - the message to display if object is null or undefined
	 * @return - the object parameter that was passed in
	 * @throws AssertError - containing the message if the object is null or undefined
	 */
	ASSERT.exists = function(object, message) {

		// compares with conversion null and undefined
		if(null == object) {
			throw _assertError("The object doesn't exist." + ( message ? ' ' + message : ''));
			// throw new AssertError("The object doesn't exist. " + (message || ''));
			// throw _fix(new Error(), 'AssertError', "The object doesn't exist. " + (message || ''));
			// throw new Error("AssertError: The object doesn't exist. " + (message || ''));
		}

		return object;

	};
	// exists

	/**
	 * Checks if a var is an instance of Array
	 * @param array - the array to test
	 * @param message - the message to display if array is not an instance of Array
	 * @return - the array parameter that was passed in
	 * @throws AssertError - containing the message if the array is not an instance of Array
	 */
	ASSERT.array = function(array, message) {
		if('Array' === _is(array)) {
			// return the parameter checked
			return array;
		}
		throw new AssertError("The array is not an instance of Array. " + (message || ''));

	};
	// array

	ASSERT.fn = function(fn, message) {
		if('Function' === _is(fn)) {
			// return the parameter checked
			return fn;
		}

		throw new AssertError("The fn is not an instance of Function. " + (message || ''));

	};
	// fn

	ASSERT.type = function(object, type, message) {

		if('String' !== _is(type)) {
			throw new ParamError('The parameter type should be a string denoting the object constructor. The type was ' + _is(type));
		}

		if(_is(object) === type) {
			throw new AssertError('Expected an object of type ' + type + '.' + (message || ''));
		}

		// return the parameter checked
		return object;

	};
	// type

	ASSERT.equals = function(expected, actual, message) {

		if(expected === actual) {
			// return the parameter checked
			return actual;
		}
		throw new AssertError("Expected value '" + expected + "', instead it was '" + actual + "'");

	};
	// equals

	ASSERT.lte = function(expected, actual, message) {
		if('Number' !== _is(expected)) {
			throw new ParamError('The type of parameter expected should be a Number. Instead, was ' + _is(expected));
		}
		if('Number' !== _is(actual)) {
			throw new ParamError('The type of parameter actual should be a Number. Instead, was ' + _is(actual));
		}

		if(actual <= expected) {
			// return the parameter checked
			return actual;
		}

		throw new AssertError("Expected the value '" + actual + "' to be less than or equal to '" + expected + ". " + (message || ''));
	};
	// lte

	ASSERT.is = _is;
	ASSERT.AssertError = AssertError;
	ASSERT.ParamError = ParamError;

	// return the module to outer scope
	return ASSERT;

}).call(null, undefined, window);
