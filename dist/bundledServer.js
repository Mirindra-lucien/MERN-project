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

eval("const config = {\n  env: \"development\" || 0,\n  port: process.env.PORT || 3000,\n  mongoURI: process.env.MONGODB_URI || process.env.MONGODB_HOST || \"mongodb://\" + (process.env.IP || \"127.0.0.1\") + \":\" + (process.env.MONGODB_PORT || \"27017\") + \"/mimoza\"\n};\nmodule.exports = config;\n\n//# sourceURL=webpack://mysite/./config/config.js?");

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
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Account = __webpack_require__(/*! ../models/account */ \"./server/models/account.js\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst CWDIR = process.cwd();\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\nexports.create = async (req, res) => {\n  try {\n    const user = new Account(req.body);\n    await user.save();\n    return res.status(200).json({\n      message: \"Signed up\",\n      error: \"\"\n    });\n  } catch (err) {\n    res.status(400).json({\n      error: \"Cannot signed up\",\n      message: \"\"\n    });\n  }\n};\nexports.list = async (req, res) => {\n  try {\n    let accounts = await Account.find().select('name username email birthday school city photo createdat');\n    res.json(accounts);\n  } catch (error) {\n    res.status(400).json({\n      error: \"error\"\n    });\n  }\n  ;\n};\nexports.accountById = async (req, res, next, id) => {\n  try {\n    const user = await Account.findById(id);\n    if (!user) {\n      return res.status(400).json({\n        error: \"Account not found\"\n      });\n    }\n    req.account = user;\n    next();\n  } catch (error) {\n    return res.status(400).json({\n      error: \"Cannot retreive account\"\n    });\n  }\n};\nexports[\"delete\"] = async (req, res) => {\n  const account = new Account(req.account);\n  try {\n    const accountDel = await account.deleteOne();\n    accountDel.password = undefined;\n    accountDel.encoder = undefined;\n    res.status(200).json(accountDel);\n  } catch (error) {\n    return res.status(400).json({\n      error: \"cannot delete account\"\n    });\n  }\n};\nexports.update = async (req, res) => {\n  try {\n    let user = req.account;\n    let usern = req.body;\n    for (let name in usern) {\n      user[name] = usern[name];\n    }\n    const newUser = new Account(user);\n    await newUser.save();\n    res.status(200).json(newUser);\n  } catch (error) {\n    return res.status(200).json({\n      error: \"retry again\"\n    });\n  }\n};\nexports.show = (req, res) => {\n  const account = req.account;\n  account.password = undefined;\n  account.encoder = undefined;\n  res.json(account);\n};\nexports.verify = (req, res) => {\n  const email = req.body.email;\n  const code = Math.floor(Math.random() * 900000) + 100000;\n  var transporter = nodemailer.createTransport({\n    service: 'gmail',\n    auth: {\n      user: 'mimoza.association@gmail.com',\n      pass: 'lnkwymzdnhonkrhs'\n    }\n  });\n  var mailOptions = {\n    from: 'mimoza.association@gmail.com',\n    to: email + \"\",\n    subject: 'Fanamarinana fanokafana kaonty',\n    text: \"Ny teny miafina hanamarinana ny kaonty email anao dia : \" + code\n  };\n  transporter.sendMail(mailOptions, function (error, info) {\n    if (error) {\n      res.status(400).json({\n        error: \"verify your email\"\n      });\n    } else {\n      res.status(200).json({\n        verificationCode: code,\n        email: email\n      });\n    }\n  });\n};\nexports.file = (req, res) => {\n  console.log(req.files, req.body);\n  const {\n    photo\n  } = req.files;\n  photo.mv(path.join(CWDIR, \"/public/image\"), err => {\n    if (err) return res.status(400).json({\n      message: \"there is an error\"\n    });\n    res.status(200).json({\n      message: \"ok\"\n    });\n  });\n};\n\n//# sourceURL=webpack://mysite/./server/controllers/accountController.js?");

/***/ }),

/***/ "./server/expressConfig.js":
/*!*********************************!*\
  !*** ./server/expressConfig.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst bundler = __webpack_require__(/*! ./clientBundler */ \"./server/clientBundler.js\");\nconst app = express();\nconst template = (__webpack_require__(/*! ../template */ \"./template.js\")[\"default\"]);\nconst accountRouter = __webpack_require__(/*! ./routers/accountRouter */ \"./server/routers/accountRouter.js\");\nbundler.compile(app);\napp.use('/dist', express.static(path.join(__dirname, \"../dist\")));\napp.use('/client', (req, res) => {\n  res.status(200).send(template());\n});\napp.use(cors());\napp.use(bodyParser.urlencoded({\n  extended: true\n}));\napp.use(bodyParser.json());\napp.use(accountRouter);\nmodule.exports = app;\n\n//# sourceURL=webpack://mysite/./server/expressConfig.js?");

/***/ }),

/***/ "./server/models/account.js":
/*!**********************************!*\
  !*** ./server/models/account.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\nconst account = new mongoose.Schema({\n  _id: {\n    type: 'UUID',\n    default: () => crypto.randomUUID()\n  },\n  name: {\n    first: {\n      type: String,\n      required: true\n    },\n    last: String\n  },\n  username: {\n    type: String,\n    required: true,\n    unique: true,\n    trim: true\n  },\n  email: {\n    type: String,\n    unique: true,\n    required: true,\n    trim: true,\n    match: /.+\\@.+\\..+/\n  },\n  password: {\n    type: String\n  },\n  birthday: Date,\n  school: String,\n  city: String,\n  createdat: {\n    type: Date,\n    default: Date.now\n  },\n  updatedat: Date,\n  photo: {\n    profile: String,\n    coverProfile: String\n  },\n  type: {\n    type: String,\n    enum: [\"user\", \"admin\", \"sadmin\"]\n  },\n  encoder: String\n});\naccount.virtual(\"fullname\").get(function () {\n  return this.name.first + \" \" + this.name.last;\n}).set(function (v) {\n  this.name.first = v.substr(0, v.indexOf(\" \"));\n  this.name.last = v.substr(v.indexOf(\" \") + 1);\n});\naccount.virtual(\"pass\").get(function () {\n  return this.vpass;\n}).set(function (passw) {\n  this.vpass = passw;\n  this.encoder = this.makeEncoder();\n  this.password = this.hashPass(passw + \"\");\n});\naccount.methods.hashPass = function (pass) {\n  if (pass === \"\") return \"\";\n  try {\n    return crypto.createHmac('sha1', this.encoder).update(pass).digest('hex');\n  } catch (error) {\n    return \"\";\n  }\n};\naccount.methods.makeEncoder = function () {\n  return Math.floor(Math.random() * 1000000) + \"\";\n};\naccount.methods.autenthicate = function (passwordText) {\n  return this.hashPass(passwordText) === this.password;\n};\nmodule.exports = mongoose.model(\"Account\", account);\n\n//# sourceURL=webpack://mysite/./server/models/account.js?");

/***/ }),

/***/ "./server/routers/accountRouter.js":
/*!*****************************************!*\
  !*** ./server/routers/accountRouter.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst controller = __webpack_require__(/*! ../controllers/accountController */ \"./server/controllers/accountController.js\");\nconst fileupload = __webpack_require__(/*! express-fileupload */ \"express-fileupload\");\nconst router = express.Router();\nrouter.param(\"id\", controller.accountById);\nrouter.use(\"/account\", fileupload());\nrouter.route(\"/account\").post(controller.create).get(controller.list);\nrouter.route(\"/account/:id\").get(controller.show).delete(controller.delete).put(controller.update);\nrouter.route(\"/account/verify\").post(controller.verify);\nrouter.route(\"/file\").post(controller.file);\nmodule.exports = router;\n\n//# sourceURL=webpack://mysite/./server/routers/accountRouter.js?");

/***/ }),

/***/ "./server/server.js":
/*!**************************!*\
  !*** ./server/server.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __unused_webpack_exports, __webpack_require__) => {

eval("const path = __webpack_require__(/*! path */ \"path\");\nconst http = __webpack_require__(/*! http */ \"http\");\nconst mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst template = (__webpack_require__(/*! ./../template */ \"./template.js\")[\"default\"]);\nconst app = __webpack_require__(/*! ./expressConfig */ \"./server/expressConfig.js\");\nconst config = __webpack_require__(/*! ../config/config */ \"./config/config.js\");\nmongoose.Promise = global.Promise;\nmongoose.connect(config.mongoURI);\nmongoose.connection.on(\"error\", () => {\n  throw new Error(`cannot connect to ${config.mongoURI}`);\n});\nconst server = http.createServer(app);\nserver.listen(config.port);\nconsole.log(`server run on ${config.port}`);\n\n//# sourceURL=webpack://mysite/./server/server.js?");

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

/***/ "express-fileupload":
/*!*************************************!*\
  !*** external "express-fileupload" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = require("express-fileupload");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

"use strict";
module.exports = require("mongoose");

/***/ }),

/***/ "nodemailer":
/*!*****************************!*\
  !*** external "nodemailer" ***!
  \*****************************/
/***/ ((module) => {

"use strict";
module.exports = require("nodemailer");

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

/***/ "crypto":
/*!*************************!*\
  !*** external "crypto" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("crypto");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

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