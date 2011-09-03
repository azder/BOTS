// defined if a browser
var window = window;
// defined if CommonJS
var exports = exports;
// defined if included multiple times
var ASSERTS = ASSERTS;

(function(ASSERT, GLOBAL) {

	// use strict javascript
	"use strict";

	// aquire the module, create if needed
	ASSERT = GLOBAL.ASSERT = ASSERT || GLOBAL.ASSERT || {};

	// define module private functions and other objects
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

	var _assertError = function(error, message, extra) {
		error.message = message + ( extra ? '. ( ' + extra + ' )' : '.');
		error.name = 'AssertError';
		return error;
	};
	// _assertError

	var _paramError = function(error, message, extra) {
		error.message = message + ( extra ? '. ( ' + extra + ' )' : '.');
		error.name = 'ParamError';
		return error;
	};
	// define the module public functions and other objects

	/**
	 * Checks if a var is not null and not undefined
	 * @param object - the object to test
	 * @param message - the message to display if object is null or undefined
	 * @return - the object parameter that was passed in
	 * @throws AssertError - containing the message if the object is null or undefined
	 */
	ASSERT.exists = function(object, message) {

		// compares with conversion null and undefined
		if(null != object) {
			// return the parameter checked
			return object;
		}

		throw _assertError(new Error(), "The object doesn't exist", message);

	};
	// ASSERT.exists

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

		throw _assertError(new Error(), "The array is not an instance of Array", message);

	};
	// ASSERT.array

	ASSERT.fn = function(fn, message) {
		if('Function' === _is(fn)) {
			// return the parameter checked
			return fn;
		}

		throw _assertError(new Error(), "The fn is not an instance of Function." + ( message ? ' ' + message : ''));

	};
	// ASSERT.fn

	ASSERT.type = function(object, type, message) {

		if('String' !== _is(type)) {
			throw _paramError(new Error(), 'The parameter type should be a string denoting the object constructor. The type was ' + _is(type), message);
		}

		if(_is(object) === type) {
			throw _assertError(new Error(), 'Expected an object of type ' + type, message);
		}

		// return the parameter checked
		return object;

	};
	// ASSERT.type

	ASSERT.equals = function(expected, actual, message) {

		if(expected === actual) {
			// return the parameter checked
			return actual;
		}
		throw _assertError(new Error(), "Expected value '" + expected + "', instead it was '" + actual + "'", message);

	};
	// ASSERT.equals

	ASSERT.lte = function(expected, actual, message) {

		if('Number' !== _is(expected)) {
			throw _paramError(new Error(), 'The type of param expected @ ASSERT.lte should be a Number. Instead, was ' + _is(expected), message);
		}

		if('Number' !== _is(actual)) {
			throw _paramError(new Error(), 'The type of param actual @ ASSERT.lte should be a Number. Instead, was ' + _is(actual), message);
		}

		if(actual <= expected) {
			// return the parameter checked
			return actual;
		}

		throw _assertError(new Error(), "Expected the value '" + actual + "' to be less than or equal to '" + expected + "'", message);

	};
	// ASSERT.lte

	ASSERT.gt = function(expected, actual, message) {

		if('Number' !== _is(expected)) {
			throw _paramError(new Error(), 'The type of param expected @ ASSERT.lte should be a Number. Instead, was ' + _is(expected), message);
		}

		if('Number' !== _is(actual)) {
			throw _paramError(new Error(), 'The type of param actual @ ASSERT.lte should be a Number. Instead, was ' + _is(actual), message);
		}

		if(actual > expected) {
			// return the parameter checked
			return actual;
		}

		throw _assertError(new Error(), "Expected the value '" + actual + "' to be greater than '" + expected + "'", message);

	};
	// ASSERT.gt

	ASSERT.is = _is;

	// return the module to outer scope
	return ASSERT;

})(ASSERTS, window || exports);
