/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./config/config.js":
/*!**************************!*\
  !*** ./config/config.js ***!
  \**************************/
/***/ ((module) => {

eval("const config = {\n  env: \"development\" || 0,\n  port: process.env.PORT || 3000,\n  mongoURI: process.env.MONGO_URI || process.env.MONGO_HOST || \"mongodb://\" + (process.env.IP || \"127.0.0.1\") + \":\" + (process.env.MONGO_PORT || \"27017\") + \"/mimoza\"\n};\nmodule.exports = config;\n\n//# sourceURL=webpack://mysite/./config/config.js?");

/***/ }),

/***/ "./server/clientBundler.js":
/*!*********************************!*\
  !*** ./server/clientBundler.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("var webpack = __webpack_require__(/*! webpack */ \"webpack\");\nvar webpackDevMiddleware = __webpack_require__(/*! webpack-dev-middleware */ \"webpack-dev-middleware\");\nvar webpackHotMiddleware = __webpack_require__(/*! webpack-hot-middleware */ \"webpack-hot-middleware\");\nvar config = __webpack_require__(/*! ../webpack.config */ \"./webpack.config.js\");\nconst compile = app => {\n  const compiler = webpack(config);\n  const devMiddleware = webpackDevMiddleware(compiler, {\n    publicPath: config.output.publicPath\n  });\n  const hotMiddleware = webpackHotMiddleware(compiler);\n  app.use(devMiddleware);\n  app.use(hotMiddleware);\n};\nmodule.exports = {\n  compile\n};\n\n//# sourceURL=webpack://mysite/./server/clientBundler.js?");

/***/ }),

/***/ "./server/controllers/accountController.js":
/*!*************************************************!*\
  !*** ./server/controllers/accountController.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, exports) => {

eval("exports.create = (req, res) => {\n  res.send(\"hello from account controller\");\n};\n\n//# sourceURL=webpack://mysite/./server/controllers/accountController.js?");

/***/ }),

/***/ "./server/expressConfig.js":
/*!*********************************!*\
  !*** ./server/expressConfig.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst bundler = __webpack_require__(/*! ./clientBundler */ \"./server/clientBundler.js\");\nconst app = express();\nconst template = (__webpack_require__(/*! ../template */ \"./template.js\")[\"default\"]);\nconst accountRouter = __webpack_require__(/*! ./routers/accountRouter */ \"./server/routers/accountRouter.js\");\nbundler.compile(app);\napp.use('/dist', express.static(path.join(__dirname, \"../dist\")));\napp.use('/client', (req, res) => {\n  res.status(200).send(template());\n});\napp.use(cors());\napp.use(bodyParser.urlencoded({\n  extended: false\n}));\napp.use(bodyParser.json());\napp.use(accountRouter);\nmodule.exports = app;\n\n//# sourceURL=webpack://mysite/./server/expressConfig.js?");

/***/ }),

/***/ "./server/routers/accountRouter.js":
/*!*****************************************!*\
  !*** ./server/routers/accountRouter.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst controller = __webpack_require__(/*! ../controllers/accountController */ \"./server/controllers/accountController.js\");\nconst router = express.Router();\nrouter.param(\"id\", (req, res, next) => {});\nrouter.route(\"/account/create\").get(controller.create);\nmodule.exports = router;\n\n//# sourceURL=webpack://mysite/./server/routers/accountRouter.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const path = __webpack_require__(/*! path */ \"path\");\nconst http = __webpack_require__(/*! http */ \"http\");\nconst template = (__webpack_require__(/*! ./../template */ \"./template.js\")[\"default\"]);\nconst app = __webpack_require__(/*! ./expressConfig */ \"./server/expressConfig.js\");\nconst config = __webpack_require__(/*! ../config/config */ \"./config/config.js\");\nconst server = http.createServer(app);\nserver.listen(config.port);\nconsole.log(`server run on ${config.port}`);\n\n//# sourceURL=webpack://mysite/./server/server.js?");

/***/ }),

/***/ "./template.js":
/*!*********************!*\
  !*** ./template.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (() => {\n  return `\n    <!DOCTYPE html>\n    <html lang=\"en\">\n    <head>\n        <meta charset=\"UTF-8\">\n        <meta http-equiv=\"X-UA-Compatible\" content=\"IE=edge\">\n        <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n        <title>Document</title>\n    </head>\n    <body>\n        <div id=\"app\">hh</div>\n        <script src=\"../dist/bundle.js\"></script>\n    </body>\n    </html>\n    `;\n});\n\n//# sourceURL=webpack://mysite/./template.js?");

/***/ }),

/***/ "./webpack.config.js":
/*!***************************!*\
  !*** ./webpack.config.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const path = __webpack_require__(/*! path */ \"path\");\nconst webpack = __webpack_require__(/*! webpack */ \"webpack\");\nconst CWDIR = process.cwd();\nconst config = {\n  entry: ['react-hot-loader/patch', 'webpack-hot-middleware/client?reload=true', path.join(CWDIR, '/client/index.js')],\n  output: {\n    path: path.join(CWDIR, '/dist'),\n    filename: 'bundle.js',\n    publicPath: '/dist/'\n  },\n  mode: \"development\",\n  resolve: {\n    alias: {\n      'react-dom': '@hot-loader/react-dom'\n    },\n    extensions: [\".js\", \".jsx\"]\n  },\n  module: {\n    rules: [{\n      test: /\\.(js|jsx)$/,\n      exclude: /node_modules/,\n      use: [{\n        loader: 'babel-loader',\n        options: {\n          presets: ['@babel/preset-env', '@babel/preset-react'],\n          plugins: ['@babel/plugin-transform-spread']\n        }\n      }, {\n        loader: 'react-hot-loader/webpack',\n        options: {\n          plugins: ['react-hot-loader/babel']\n        }\n      }]\n    }]\n  },\n  plugins: [new webpack.NoEmitOnErrorsPlugin(), new webpack.HotModuleReplacementPlugin()]\n};\nmodule.exports = config;\n\n//# sourceURL=webpack://mysite/./webpack.config.js?");

/***/ }),

/***/ "body-parser":
/*!******************************!*\
  !*** external "body-parser" ***!
  \******************************/
/***/ ((module) => {

"use strict";
module.exports = require("body-parser");

/***/ }),

/***/ "cors":
/*!***********************!*\
  !*** external "cors" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("cors");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack");

/***/ }),

/***/ "webpack-dev-middleware":
/*!*****************************************!*\
  !*** external "webpack-dev-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack-dev-middleware");

/***/ }),

/***/ "webpack-hot-middleware":
/*!*****************************************!*\
  !*** external "webpack-hot-middleware" ***!
  \*****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("webpack-hot-middleware");

/***/ }),

/***/ "http":
/*!***********************!*\
  !*** external "http" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("http");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("path");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./server/server.js");
/******/ 	module.exports = __webpack_exports__;
/******/ 	
/******/ })()
;