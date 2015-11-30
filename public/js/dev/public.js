/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ({

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/**
	 *
	 * public.js.
	 *
	 * @project     localhost_insta360
	 * @datetime    17:47 - 15/9/4
	 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
	 * @copyright   Thonatos.Yang <https://www.thonatos.com>
	 *
	 */

	// console.log('public.init');

	// var SVGLoader = require('../utils/SVGLoader');

	// loader = new SVGLoader( document.getElementById( 'loader' ), { speedIn : 300, easingIn : mina.easeinout } );

	// loader.show();

	// setTimeout(function () {
	//     loader.hide();

	//     $('.nav-header').css({
	//         'opacity':'1'
	//     });

	//     $('.level-one').addClass('animated fadeInDown');
	//     $('.level-two').addClass('animated fadeInDown');

	// },3000);




	$(document).ready(function () {
	    
	    function initPublic() {
	        __webpack_require__(304)();
	    }

	    initPublic();
	});


/***/ },

/***/ 304:
/***/ function(module, exports) {

	module.exports = function () {

	    $('a.disabled').each(function () {
	        $(this).click(function (ev) {
	            ev.preventDefault();
	        });
	    });
	};

/***/ }

/******/ });