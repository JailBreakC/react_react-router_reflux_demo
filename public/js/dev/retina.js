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
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/**
	 *
	 * retina.js.
	 *
	 * @project     localhost_insta360.com
	 * @datetime    12:06 - 15/9/11
	 * @author      Thonatos.Yang <thonatos.yang@gmail.com>
	 * @copyright   Thonatos.Yang <https://www.thonatos.com>
	 *
	 */


	/**
	 * @fileOverview retina img adapter
	 * created at Wed Jul 16 2014 20:34:39 GMT+0800 (CST)
	 */


	(function() {

	    var Retina = {};

	    Retina.RETINA_RATIO = {
	        NORMAL: '1x',
	        RETINA_2X: '2x'
	    };
	    var DATA_ENUM = {
	        URL: 'data-retina-url',
	        IMG_TYPE: 'data-img-type',
	        DONE: 'data-retina-done'
	    };

	    var _filters = {}; // filter map
	    var _imgTypeConfigs = {}; // img type config map
	    var _platforms = {}; // platform map
	    var _currentPlatform;
	    var _devicePixelRatio = getDevicePixelRatio();

	    var processImg = function() {

	        var allImgs = document.getElementsByTagName('img');

	        for (var i = 0; i < allImgs.length; i++) {

	            if (allImgs[i].getAttribute(DATA_ENUM.DONE) == 'true') {
	                continue;
	            }

	            var url = allImgs[i].getAttribute(DATA_ENUM.URL);
	            if (url) {
	                var dataImgType = allImgs[i].getAttribute(DATA_ENUM.IMG_TYPE);

	                if (_imgTypeConfigs[dataImgType]) {

	                    var config = _imgTypeConfigs[dataImgType];

	                    var filterResult = getFilter(config);

	                    if (filterResult.filter) {
	                        var filter = filterResult.filter;
	                        var platform = filterResult.platform;

	                        var result = filter(url, config[platform].base, config[platform][_devicePixelRatio]);

	                        var defaultUrl;
	                        if (config[platform]['default']) {
	                            defaultUrl = filter(config[platform]['default'], config[platform].base, config[platform][_devicePixelRatio]);
	                        }

	                        setImg(allImgs[i], result, defaultUrl);
	                    }
	                }
	            }

	            allImgs[i].setAttribute(DATA_ENUM.DONE, true);

	        }

	    };

	    // search for platform filter
	    // if find currentPlatform filter, return
	    // if not, look up to currenPlatform's parent recursively till one filter been found
	    // if get to root, return undefind

	    function getFilter(config) {
	        var platform = _currentPlatform;

	        var filter;
	        if (config[platform]) {
	            filter = _filters[config[platform].filter];
	        }

	        while (typeof filter !== 'function') {
	            var parentPlatformKey = _platforms[platform].parent;

	            if (!parentPlatformKey) break;

	            platform = _platforms[parentPlatformKey].key;
	            if (config[platform]) {
	                filter = _filters[config[platform].filter];
	            }
	        }

	        var result = {
	            filter: filter,
	            platform: platform
	        };
	        return result;
	    }

	    function setImg(obj, url, defaultUrl) {
	        var img = new Image();
	        img.src = url;

	        if (img.complete) {
	            obj.setAttribute('src', url);
	            obj.style.display = '';
	        } else {
	            img.onload = function() {
	                obj.setAttribute('src', url);
	                obj.style.display = '';
	            };
	            img.onerror = function() {
	                setDefaultImg(obj, defaultUrl);
	            };
	        }
	    }

	    function setDefaultImg(obj, url) {
	        if (!url) return;

	        var img = new Image();
	        img.src = url;

	        if (img.complete) {
	            obj.setAttribute('src', url);
	            obj.style.display = '';
	        } else {
	            img.onload = function() {
	                obj.setAttribute('src', url);
	                obj.style.display = '';
	            };
	        }
	    }

	    // use media query to check for retina screen

	    function getDevicePixelRatio() {

	        var mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5),' +
	            '(min--moz-device-pixel-ratio: 1.5), ' +
	            '(-o-min-device-pixel-ratio: 3/2), ' +
	            '(min-device-pixel-ratio: 1.5), ' +
	            '(min-resolution: 1.5dppx), ' +
	            '(min-resolution: 192dpi)';

	        window.devicePixelRatio = window.devicePixelRatio ||
	            window.screen.deviceXDPI / window.screen.logicalXDPI;
	        if (window.devicePixelRatio >= 1.5) {
	            return Retina.RETINA_RATIO.RETINA_2X;
	        }

	        if (window.matchMedia && window.matchMedia(mediaQuery).matches) {
	            return Retina.RETINA_RATIO.RETINA_2X;
	        }

	        return Retina.RETINA_RATIO.NORMAL;
	    }

	    // autoComplete config
	    // params not been defined in `platform` object will
	    // inherit value from parent object

	    function autoCompleteConfig() {
	        for (var i in _imgTypeConfigs) {
	            var parentObj = _imgTypeConfigs[i];
	            for (var j in _platforms) {
	                var targetObj = parentObj[j];
	                if (targetObj) {
	                    for (var k in parentObj.public) {
	                        if (targetObj[k] === undefined) {
	                            targetObj[k] = parentObj.public[k];
	                        }
	                    }
	                }
	            }
	        }
	    }

	    Retina.setFilters = function(filters) {
	        _filters = filters;
	    };
	    Retina.setConfigs = function(currentPlatform, platforms, configs) {
	        _currentPlatform = currentPlatform;
	        _imgTypeConfigs = configs;
	        _platforms = platforms;

	        autoCompleteConfig();
	    };

	    // notify retina.js to update img tags
	    // invoke when new html is added
	    Retina.retinaUpdate = processImg;

	    // update retina src
	    Retina.modifyRetinaImg = function(target, src) {
	        target.setAttribute(DATA_ENUM.URL, src);
	        target.setAttribute(DATA_ENUM.DONE, false);
	    };


	    window.Retina = Retina;
	})();

	/**
	 * @fileOverview retina config
	 * @author Max
	 * created at 2014-11-12 17:28
	 */

	(function() {

	    var Retina = window.Retina;

	    POSTER_BASE = '';
	    HEAD_BASE = '';
	    PREVIEW_BASE = '';
	    IS_MOBILE_PLATFORM = '';

	    // define filters
	    Retina.setFilters({
	        'aliyun': function(url, base, ratio) {
	            var result = url + base.request + ratio.param;

	            return result;
	        },
	        'normal': function(url, base, ratio) {
	            var result;

	            var pieces = url.split('/');
	            pieces[pieces.length - 1] = ratio.param + '/' + pieces[pieces.length - 1];

	            result = pieces.join('/');

	            return result;
	        },
	        'svg-to-others': function(url, base, ratio) {
	            var result;

	            var pieces = url.split('/');
	            var file = pieces[pieces.length - 1];
	            var filePieces = file.split('.');
	            filePieces[filePieces.length - 1] = base.postfix;
	            file = filePieces.join('.');
	            pieces[pieces.length - 1] = ratio.param + '/' + file;

	            result = pieces.join('/');

	            return result;
	        },
	        'svg': function(url, base, ratio) {
	            return url;
	        }
	    });

	    // define config const
	    var CONFIG_TYPE = {
	        POSTER: 'poster',
	        USERHEAD: 'userhead',
	        POST_PREVIEW: 'post-preview',
	        SVG: 'svg',
	        NORMAL: 'normal'
	    };
	    // define configs
	    var configs = {};

	    configs[CONFIG_TYPE.POSTER] = {
	        public: {
	            filter: 'aliyun',
	            base: {
	                request: '@'
	            },
	            'default': POSTER_BASE + 'default'
	        }
	    };
	    configs[CONFIG_TYPE.POSTER].desktop = {
	        '1x': {
	            param: '300w_90Q_1x'
	        },
	        '2x': {
	            param: '300w_90Q_2x'
	        }
	    };
	    configs[CONFIG_TYPE.POSTER].mobile = {
	        '1x': {
	            param: '180w_90Q_1x'
	        },
	        '2x': {
	            param: '180w_90Q_2x'
	        }
	    };

	    configs[CONFIG_TYPE.USERHEAD] = {
	        public: {
	            filter: 'aliyun',
	            base: {
	                request: '@'
	            },
	            'default': HEAD_BASE + 'dhead1'
	        }
	    };
	    configs[CONFIG_TYPE.USERHEAD].desktop = {
	        '1x': {
	            param: '84w_90Q_1x'
	        },
	        '2x': {
	            param: '84w_90Q_2x'
	        }
	    };
	    configs[CONFIG_TYPE.USERHEAD].mobile = {
	        '1x': {
	            param: '84w_90Q_1x'
	        },
	        '2x': {
	            param: '84w_90Q_2x'
	        }
	    };

	    configs[CONFIG_TYPE.POST_PREVIEW] = {
	        public: {
	            filter: 'aliyun',
	            base: {
	                request: '@'
	            },
	            'default': PREVIEW_BASE + 'default'
	        }
	    };
	    configs[CONFIG_TYPE.POST_PREVIEW].desktop = {
	        '1x': {
	            param: '432w_90Q_1x'
	        },
	        '2x': {
	            param: '423w_90Q_2x'
	        }
	    };
	    configs[CONFIG_TYPE.POST_PREVIEW].mobile = {
	        '1x': {
	            param: '320w_90Q_1x'
	        },
	        '2x': {
	            param: '320w_90Q_2x'
	        }
	    };

	    configs[CONFIG_TYPE.SVG] = {
	        public: {
	            base: {
	                postfix: 'png'
	            }
	        }
	    };
	    configs[CONFIG_TYPE.SVG].desktop = {
	        filter: 'svg'
	    };
	    configs[CONFIG_TYPE.SVG].mobile = {
	        filter: 'svg'
	    };
	    configs[CONFIG_TYPE.SVG]['desktop-svg-not-supported'] = {
	        filter: 'svg-to-others',
	        '1x': {
	            param: '1x'
	        },
	        '2x': {
	            param: '1x'
	        }
	    };
	    configs[CONFIG_TYPE.SVG]['mobile-svg-not-supported'] = {
	        filter: 'svg-to-others',
	        '1x': {
	            param: '1x'
	        },
	        '2x': {
	            param: '1x'
	        }
	    };

	    configs[CONFIG_TYPE.NORMAL] = {};
	    configs[CONFIG_TYPE.NORMAL].desktop = {
	        filter: 'normal',
	        '1x': {
	            param: '1x'
	        },
	        '2x': {
	            param: '2x'
	        }
	    };
	    configs[CONFIG_TYPE.NORMAL].mobile = {
	        filter: 'normal',
	        '1x': {
	            param: '1x'
	        },
	        '2x': {
	            param: '2x'
	        }
	    };

	    // define platform
	    var platform = {
	        'desktop': {
	            key: 'desktop'
	        },
	        'mobile': {
	            key: 'mobile'
	        },
	        'desktop-svg-not-supported': {
	            key: 'desktop-svg-not-supported',
	            parent: 'desktop'
	        },
	        'mobile-svg-not-supported': {
	            key: 'mobile-svg-not-supported',
	            parent: 'mobile'
	        }
	    };

	    Retina.setConfigs(detectPlatform(), platform, configs);

	    Retina.retinaUpdate();


	    // platform detect

	    function detectPlatform() {
	        var result;

	        if (IS_MOBILE_PLATFORM) {
	            result = 'mobile';
	        } else {
	            if (navigator.userAgent.indexOf('MSIE 8.0') != -1) {
	                result = 'desktop-svg-not-supported';
	            } else {
	                result = 'desktop';
	            }
	        }

	        return result;
	    }
	})();


/***/ }
/******/ ]);