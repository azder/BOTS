// JSLint is complaining if theese are not defined
var QUnit = QUnit;
var describe = describe;
var before = before;
var after = after;
var it = it;
var assert = assert;
var ok = ok;
var given = given;
var equal = equal;

var ASSERT = ASSERT;

QUnit.specify.extendAssertions({

	isInstanceOf : function(actual, expected, message) {
		ok( actual instanceof expected, message);
	},
	willThrow: function(actual,expected,message){
		
		try{
			actual();
			ok(!true,"expected '"+expected.name+"' thrown");
		}catch(e){
			ok( e instanceof Error, message);
			equal(e.name,expected.name,message);
			equal(e.message,expected.message,message);
		}
		
	}
});

QUnit.specify("ASSERT Module Test 02", function() {

	var _thrown = function(fn) {
		try {
			fn.call();
		} catch(e) {
			return e;
		}
	};
	// _thrown

	//
	describe("ASSERT errors should be created", function() {

		var message;
		var assertError;
		var paramError;

		before(function() {
			message = 'error message';
			assertError = _thrown(function() {
				ASSERT.gt(1, 0, message);
			});
			paramError = _thrown(function() {
				ASSERT.type(1, 2, message);
			});
		});
		//
		after(function() {
			message = null;
			assertError = null;
			paramError = null;
		});
		it('as an instance of Error', function() {

			assert(assertError).isInstanceOf(Error, 'assertError');
			assert(paramError).isInstanceOf(Error, 'paramError');

		});
		//
		it('with right name property', function() {

			assert(paramError.name).isEqualTo('ParamError');
			assert(assertError.name).isEqualTo('AssertError');

		});
		//
	});
	//
	describe('ASSERT.is(object) should return the object type', function() {

		var is;

		//
		before(function() {
			is = ASSERT.is;
		});
		//
		after(function() {
			is = null;
		});
		//

		given(
		//
		['Null', null], ['Undefined', undefined],
		//
		['Function',
		function() {
		}, new Function, Function],

		//
		['Number', 0, 1.1, new Number, Infinity, NaN],
		//
		['Array', [], new Array],
		//
		['Object', {}, new Object, ASSERT],
		//
		['String','',"",new String()]
		//
		).it('returns that string', function(type) {
			var length = arguments.length;
			if(1 >= length) {
				return;
			}
			for(var i = 1; i < length; i++) {
				assert(is(arguments[i])).isSameAs(type);
			}
		});
	});
	//
	describe('ASSERT.exists(object) should check the value', function() {

		var exists;
		var errorName;
		var errorMessage;

		before(function() {
			exists = ASSERT.exists;
			errorName = 'AssertError';
			errorMessage = "The object doesn't exist.";
		});
		//
		after(function() {
			exists = null;
			errorName = null;
			errorMessage = null;
		});
		//
		it('null and throw an AsssertError for it', function() {
			assert(function() {
				exists(null);
			}).willThrow({name:errorName,message:errorMessage},'exists(null)');
		});
		//
		it('undefined and throw an AsssertError for it', function() {
			assert(function() {
				exists(undefined);
			}).willThrow({name:errorName,message:errorMessage},'exists(undefined)');
		});
		//
		describe('and', function() {
			given(0, 'a', [[]], /./, {}).it('should be returned as is', function(object) {
				assert(exists(object)).isEqualTo(object);
				assert(exists(object)).isSameAs(object);
			});
		});
	});
	/*
	 var a = ASSERT;

	 QUnit.log = function(result, message) {
	 //$tbody.append('<tr><td>' + result + '</td><td>' + message + '</td></tr>');
	 };

	 QUnit.done = function(failures, total) {
	 //$tfoot.append('<tr><td>' + failures + '</td><td>' + total + '</td></tr>');

	 $('#qunit-tests > li > ol').show();
	 };
	*/
});
