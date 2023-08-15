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

eval("const Account = __webpack_require__(/*! ../models/account */ \"./server/models/account.js\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst CWDIR = process.cwd();\nconst nodemailer = __webpack_require__(/*! nodemailer */ \"nodemailer\");\nexports.create = async (req, res) => {\n  try {\n    const user = new Account(req.body);\n    await user.save();\n    return res.status(200).json({\n      message: \"Signed up\",\n      error: \"\"\n    });\n  } catch (err) {\n    res.status(400).json({\n      error: \"Cannot signed up\",\n      message: \"\"\n    });\n  }\n};\nexports.list = async (req, res) => {\n  try {\n    let accounts = await Account.find().select('name username email birthday school city photo createdat');\n    res.json(accounts);\n  } catch (error) {\n    res.status(400).json({\n      error: \"error\"\n    });\n  }\n  ;\n};\nexports.accountById = async (req, res, next, id) => {\n  try {\n    const user = await Account.findById(id);\n    if (!user) {\n      return res.status(400).json({\n        error: \"Account not found\"\n      });\n    }\n    req.account = user;\n    next();\n  } catch (error) {\n    return res.status(400).json({\n      error: \"Cannot retreive account\"\n    });\n  }\n};\nexports[\"delete\"] = async (req, res) => {\n  const account = new Account(req.account);\n  try {\n    const accountDel = await account.deleteOne();\n    accountDel.password = undefined;\n    accountDel.encoder = undefined;\n    res.status(200).json(accountDel);\n  } catch (error) {\n    return res.status(400).json({\n      error: \"cannot delete account\"\n    });\n  }\n};\nfunction uploadfile(file, res) {\n  let filename = \"\" + Date.now() + Math.floor(Math.random() * 9000 + 1000);\n  filename += path.extname(file.name);\n  let filepath = path.join(CWDIR, \"public/images\", filename);\n  file.mv(filepath, err => {\n    if (err) return res.status(400).json({\n      message: err\n    });\n  });\n  return filepath;\n}\nexports.update = async (req, res) => {\n  try {\n    let user = req.account;\n    let usern = req.body;\n    for (let name in usern) {\n      user[name] = usern[name];\n    }\n    if (req.files.profile) {\n      const profile = uploadfile(req.files.profile, res);\n      user.photo.profile = profile;\n    }\n    if (req.files.coverProfile) {\n      const cprof = uploadfile(req.files.coverProfile, res);\n      user.photo.coverProfile = cprof;\n    }\n    user.updatedat = Date.now();\n    const newUser = new Account(user);\n    await newUser.save();\n    res.status(200).json(newUser);\n  } catch (error) {\n    return res.status(200).json({\n      error: \"retry again\"\n    });\n  }\n};\nexports.show = (req, res) => {\n  const account = req.account;\n  account.password = undefined;\n  account.encoder = undefined;\n  res.json(account);\n};\nexports.verify = (req, res) => {\n  const email = req.body.email;\n  const code = Math.floor(Math.random() * 900000) + 100000;\n  var transporter = nodemailer.createTransport({\n    service: 'gmail',\n    auth: {\n      user: 'mimoza.association@gmail.com',\n      pass: 'lnkwymzdnhonkrhs'\n    }\n  });\n  var mailOptions = {\n    from: 'mimoza.association@gmail.com',\n    to: email + \"\",\n    subject: 'Fanamarinana fanokafana kaonty',\n    text: \"Ny teny miafina hanamarinana ny kaonty email anao dia : \" + code\n  };\n  transporter.sendMail(mailOptions, function (error, info) {\n    if (error) {\n      res.status(400).json({\n        error: \"verify your email\"\n      });\n    } else {\n      res.status(200).json({\n        verificationCode: code,\n        email: email\n      });\n    }\n  });\n};\nexports.toAdmin = async (req, res) => {\n  const user = req.account;\n  user.type = \"admin\";\n  let account = new Account(user);\n  await account.save();\n  res.status(200).json({\n    message: \"change user to admin\"\n  });\n};\n\n//# sourceURL=webpack://mysite/./server/controllers/accountController.js?");

/***/ }),

/***/ "./server/controllers/docController.js":
/*!*********************************************!*\
  !*** ./server/controllers/docController.js ***!
  \*********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Doc = __webpack_require__(/*! ../models/document */ \"./server/models/document.js\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nconst CWDIR = process.cwd();\nexports.upload = async (req, res) => {\n  let doc = new Doc(req.body);\n  const file = req.files.document;\n  let filename = \"\" + Date.now() + Math.floor(Math.random() * 9000 + 1000);\n  filename += path.extname(file.name);\n  let filepath = path.join(CWDIR, \"public/documents\", filename);\n  file.mv(filepath, err => {\n    if (err) return res.status(400).json({\n      error: \"file not uploaded\"\n    });\n  });\n  doc.filepath = filepath;\n  await doc.save();\n  res.status(200).json({\n    message: \"file uploaded\"\n  });\n};\nexports.download = (req, res) => {\n  const doc = req.doc;\n  res.download(doc.filepath, path.basename(doc.filepath));\n};\nexports[\"delete\"] = async (req, res) => {\n  let doc = new Doc(req.doc);\n  try {\n    const docDel = await doc.deleteOne();\n    fs.unlink(docDel.filepath, err => {\n      if (err) return res.status(400).json({\n        error: \"not deleted\"\n      });\n    });\n    res.status(200).json(docDel);\n  } catch (error) {\n    return res.status(400).json({\n      error: \"not deleted\"\n    });\n  }\n};\nexports.docById = async (req, res, next, id) => {\n  try {\n    const doc = await Doc.findById(id);\n    req.doc = doc;\n    next();\n  } catch (error) {\n    return res.status(400).json({\n      error: \"document not found\"\n    });\n  }\n};\nexports.list = async (req, res) => {\n  try {\n    const docs = await Doc.find();\n    res.status(200).json(docs);\n  } catch (error) {\n    return res.status(400).json({\n      error: \"documents can't found\"\n    });\n  }\n};\n\n//# sourceURL=webpack://mysite/./server/controllers/docController.js?");

/***/ }),

/***/ "./server/controllers/espaController.js":
/*!**********************************************!*\
  !*** ./server/controllers/espaController.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Espa = __webpack_require__(/*! ../models/espa */ \"./server/models/espa.js\");\nexports.create = async (req, res) => {\n  let espa = new Espa(req.body);\n  try {\n    await espa.save();\n    res.json({\n      message: \"Espa has inserted\"\n    });\n  } catch (error) {\n    return res.status(400).json({\n      error: \"Can't save the document\"\n    });\n  }\n};\nexports.show = (req, res) => {\n  const espa = req.espa;\n  res.status(200).json(espa);\n};\nexports.list = async (req, res) => {\n  try {\n    let espas = await Espa.find();\n    res.status(200).json(espas);\n  } catch (error) {\n    return res.status(400).json({\n      error: \"Can't list all documents\"\n    });\n  }\n};\nexports[\"delete\"] = async (req, res) => {\n  const espa = new Espa(req.espa);\n  try {\n    const espaDel = await espa.deleteOne();\n    res.status(200).json(espaDel);\n  } catch (err) {\n    return res.status(400).json({\n      error: \"Document can't deleted try again\"\n    });\n  }\n};\nexports.update = async (req, res) => {\n  let espa = req.espa;\n  const newEspa = req.body;\n  for (key in newEspa) {\n    espa[key] = newEspa[key];\n  }\n  espa.updatedat = Date.now();\n  const doc = new Espa(espa);\n  try {\n    const savedEspa = await doc.save();\n    res.status(200).json(savedEspa);\n  } catch (er) {\n    return res.status(400).json({\n      error: \"Can't upadate document\"\n    });\n  }\n};\nexports.espaById = async (req, res, next, id) => {\n  try {\n    const espa = await Espa.findById(id);\n    req.espa = espa;\n    next();\n  } catch (error) {\n    res.status(400).json({\n      error: \"Espa is not found\"\n    });\n  }\n};\n\n//# sourceURL=webpack://mysite/./server/controllers/espaController.js?");

/***/ }),

/***/ "./server/controllers/mimozaController.js":
/*!************************************************!*\
  !*** ./server/controllers/mimozaController.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Mimoza = __webpack_require__(/*! ../models/mimoza */ \"./server/models/mimoza.js\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst CWDIR = process.cwd();\nconst fs = __webpack_require__(/*! fs */ \"fs\");\nexports.create = async (req, res) => {\n  var mimoza = new Mimoza(req.body);\n  let filename = \"\" + Date.now() + Math.floor(Math.random() * 9000 + 1000);\n  let filepath = \"\";\n  if (req.files.image) {\n    filename += path.extname(req.files.image.name);\n    filepath = path.join(CWDIR, \"public/mimoza\", filename);\n    req.files.image.mv(filepath, err => {\n      if (err) return res.status(400).json({\n        error: \"image can't saved\"\n      });\n    });\n  }\n  try {\n    mimoza.image = filepath;\n    await mimoza.save();\n    res.status(200).json({\n      message: \"ok\"\n    });\n  } catch (err) {\n    return res.status(400).json({\n      error: \"not ok\"\n    });\n  }\n};\nexports.show = (req, res) => {\n  const mimoza = req.mimoza;\n  res.json(mimoza);\n};\nexports.list = async (req, res) => {\n  try {\n    const mimozas = await Mimoza.find();\n    res.json(mimozas);\n  } catch (err) {\n    return res.status(400).json({\n      error: \"Can't list all mimoza document\"\n    });\n  }\n};\nexports.update = async (req, res) => {\n  let mimoza = req.mimoza;\n  let newMim = req.body;\n  let oldpath = mimoza.image + \"\";\n  let filename = \"\" + Date.now() + Math.floor(Math.random() * 9000 + 1000);\n  let filepath = \"\";\n  if (req.files.image) {\n    filename += path.extname(req.files.image.name);\n    filepath = path.join(CWDIR, \"public/mimoza\", filename);\n    req.files.image.mv(filepath, err => {\n      if (err) return res.status(400).json({\n        error: \"image can't saved\"\n      });\n      fs.unlink(oldpath, err => {\n        if (err) res.status(400).json({\n          error: \"tsy mety\"\n        });\n      });\n    });\n    mimoza.image = filepath;\n  }\n  for (let key in newMim) {\n    mimoza[key] = newMim[key];\n  }\n  mimoza.updatedat = Date.now();\n  mimoza = new Mimoza(mimoza);\n  try {\n    newMim = await mimoza.save();\n    res.json(newMim);\n  } catch (er) {\n    return res.status(400).json({\n      error: \"Can't update the document\"\n    });\n  }\n};\nexports[\"delete\"] = async (req, res) => {\n  const mimoza = new Mimoza(req.mimoza);\n  try {\n    const mimozaDel = await mimoza.deleteOne();\n    fs.unlink(mimozaDel.image, err => {\n      if (err) return res.status(400).json({\n        error: \"file not deleted\"\n      });\n    });\n    res.json(mimozaDel);\n  } catch (err) {\n    return res.status(400).json({\n      error: \"Can't delete document\"\n    });\n  }\n};\nexports.mimozaById = async (req, res, next, id) => {\n  try {\n    const mimoza = await Mimoza.findById(id);\n    req.mimoza = mimoza;\n    next();\n  } catch (e) {\n    return res.status(400).json({\n      error: \"Can't find mimoza document\"\n    });\n  }\n};\n\n//# sourceURL=webpack://mysite/./server/controllers/mimozaController.js?");

/***/ }),

/***/ "./server/controllers/presentationController.js":
/*!******************************************************!*\
  !*** ./server/controllers/presentationController.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, exports, __webpack_require__) => {

eval("const Presentation = __webpack_require__(/*! ../models/presentation */ \"./server/models/presentation.js\");\nexports.create = async (req, res) => {\n  const pres = new Presentation(req.body);\n  try {\n    await pres.save();\n    res.status(200).json({\n      message: \"document iserted\"\n    });\n  } catch (error) {\n    return res.status(400).json({\n      error: \"not saved\"\n    });\n  }\n};\nexports.show = (req, res) => {\n  const pres = req.pres;\n  res.json(pres);\n};\nexports.list = async (req, res) => {\n  try {\n    const press = await Presentation.find();\n    res.json(press);\n  } catch (error) {\n    return res.status(400).json({\n      error: \"Can't list all documents\"\n    });\n  }\n};\nexports.update = async (req, res) => {\n  const pres = req.pres;\n  const newPres = req.body;\n  pres.updatedat = Date.now();\n  for (let key in newPres) {\n    pres[key] = newPres[key];\n  }\n  const doc = new Presentation(pres);\n  try {\n    const newDoc = await doc.save();\n    res.json(newDoc);\n  } catch (error) {\n    return res.status(400).json({\n      error: \"Document has not updated\"\n    });\n  }\n};\nexports[\"delete\"] = async (req, res) => {\n  const pres = new Presentation(req.pres);\n  try {\n    const presDel = await pres.deleteOne();\n    res.status(200).json(presDel);\n  } catch (error) {\n    return res.status(400).json({\n      error: \"tsy mety fafana\"\n    });\n  }\n};\nexports.presById = async (req, res, next, id) => {\n  try {\n    const pres = await Presentation.findById(id);\n    req.pres = pres;\n    next();\n  } catch (error) {\n    return res.status(400).json({\n      error: \"Can't find document\"\n    });\n  }\n};\n\n//# sourceURL=webpack://mysite/./server/controllers/presentationController.js?");

/***/ }),

/***/ "./server/expressConfig.js":
/*!*********************************!*\
  !*** ./server/expressConfig.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst path = __webpack_require__(/*! path */ \"path\");\nconst cors = __webpack_require__(/*! cors */ \"cors\");\nconst bodyParser = __webpack_require__(/*! body-parser */ \"body-parser\");\nconst bundler = __webpack_require__(/*! ./clientBundler */ \"./server/clientBundler.js\");\nconst app = express();\nconst template = (__webpack_require__(/*! ../template */ \"./template.js\")[\"default\"]);\nconst accountRouter = __webpack_require__(/*! ./routers/accountRouter */ \"./server/routers/accountRouter.js\");\nconst docRouter = __webpack_require__(/*! ./routers/docRouter */ \"./server/routers/docRouter.js\");\nconst espaRouter = __webpack_require__(/*! ./routers/espaRouter */ \"./server/routers/espaRouter.js\");\nconst mimozaRouter = __webpack_require__(/*! ./routers/mimozaRouter */ \"./server/routers/mimozaRouter.js\");\nconst presRouter = __webpack_require__(/*! ./routers/presentationRouter */ \"./server/routers/presentationRouter.js\");\nbundler.compile(app);\napp.use('/dist', express.static(path.join(__dirname, \"../dist\")));\napp.use('/client', (req, res) => {\n  res.status(200).send(template());\n});\napp.use(cors());\napp.use(bodyParser.urlencoded({\n  extended: true\n}));\napp.use(bodyParser.json());\napp.use(accountRouter);\napp.use(docRouter);\napp.use(espaRouter);\napp.use(mimozaRouter);\napp.use(presRouter);\nmodule.exports = app;\n\n//# sourceURL=webpack://mysite/./server/expressConfig.js?");

/***/ }),

/***/ "./server/models/account.js":
/*!**********************************!*\
  !*** ./server/models/account.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\nconst account = new mongoose.Schema({\n  _id: {\n    type: 'UUID',\n    default: () => crypto.randomUUID()\n  },\n  name: {\n    first: {\n      type: String,\n      required: true\n    },\n    last: String\n  },\n  username: {\n    type: String,\n    required: true,\n    unique: true,\n    trim: true\n  },\n  email: {\n    type: String,\n    unique: true,\n    required: true,\n    trim: true,\n    match: /.+\\@.+\\..+/\n  },\n  password: {\n    type: String\n  },\n  birthday: Date,\n  school: String,\n  city: String,\n  createdat: {\n    type: Date,\n    default: Date.now\n  },\n  updatedat: Date,\n  photo: {\n    profile: String,\n    coverProfile: String\n  },\n  type: {\n    type: String,\n    enum: [\"user\", \"admin\", \"sadmin\"],\n    default: \"user\"\n  },\n  encoder: String\n});\naccount.virtual(\"fullname\").get(function () {\n  return this.name.first + \" \" + this.name.last;\n}).set(function (v) {\n  this.name.first = v.substr(0, v.indexOf(\" \"));\n  this.name.last = v.substr(v.indexOf(\" \") + 1);\n});\naccount.virtual(\"pass\").get(function () {\n  return this.vpass;\n}).set(function (passw) {\n  this.vpass = passw;\n  this.encoder = this.makeEncoder();\n  this.password = this.hashPass(passw + \"\");\n});\naccount.methods.hashPass = function (pass) {\n  if (pass === \"\") return \"\";\n  try {\n    return crypto.createHmac('sha1', this.encoder).update(pass).digest('hex');\n  } catch (error) {\n    return \"\";\n  }\n};\naccount.methods.makeEncoder = function () {\n  return Math.floor(Math.random() * 1000000) + \"\";\n};\naccount.methods.autenthicate = function (passwordText) {\n  return this.hashPass(passwordText) === this.password;\n};\nmodule.exports = mongoose.model(\"Account\", account);\n\n//# sourceURL=webpack://mysite/./server/models/account.js?");

/***/ }),

/***/ "./server/models/document.js":
/*!***********************************!*\
  !*** ./server/models/document.js ***!
  \***********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst doc = new mongoose.Schema({\n  filepath: String,\n  uploadat: {\n    type: Date,\n    default: Date.now\n  },\n  sokajy: {\n    group: String,\n    category: String,\n    year: Date\n  },\n  isdeleted: Boolean,\n  downloads: Number\n});\ndoc.virtual(\"group\").set(function (v) {\n  this.sokajy.group = v;\n}).get(function () {\n  return this.sokajy.group;\n});\ndoc.virtual(\"category\").set(function (v) {\n  this.sokajy.category = v;\n}).get(function () {\n  return this.sokajy.category;\n});\ndoc.virtual(\"year\").set(function (v) {\n  this.sokajy.year = v;\n}).get(function () {\n  return this.sokajy.year;\n});\nmodule.exports = mongoose.model(\"Doc\", doc);\n\n//# sourceURL=webpack://mysite/./server/models/document.js?");

/***/ }),

/***/ "./server/models/espa.js":
/*!*******************************!*\
  !*** ./server/models/espa.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst crypto = __webpack_require__(/*! crypto */ \"crypto\");\nconst espa = new mongoose.Schema({\n  _id: {\n    type: 'UUID',\n    default: crypto.randomUUID()\n  },\n  option: {\n    type: String,\n    required: true\n  },\n  filiere: {\n    type: String,\n    required: true\n  },\n  description: {\n    type: String\n  },\n  insertedat: {\n    type: Date,\n    default: Date.now\n  },\n  updatedat: Date,\n  _id_account: 'UUID'\n});\nmodule.exports = mongoose.model(\"Espa\", espa);\n\n//# sourceURL=webpack://mysite/./server/models/espa.js?");

/***/ }),

/***/ "./server/models/mimoza.js":
/*!*********************************!*\
  !*** ./server/models/mimoza.js ***!
  \*********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst mimoza = new mongoose.Schema({\n  legende: {\n    type: String,\n    required: true\n  },\n  content: {\n    type: String,\n    required: true\n  },\n  image: String,\n  addedat: {\n    type: Date,\n    default: Date.now\n  },\n  updatedat: Date,\n  _id_account: 'UUID'\n});\nmodule.exports = mongoose.model(\"Mimoza\", mimoza);\n\n//# sourceURL=webpack://mysite/./server/models/mimoza.js?");

/***/ }),

/***/ "./server/models/presentation.js":
/*!***************************************!*\
  !*** ./server/models/presentation.js ***!
  \***************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const mongoose = __webpack_require__(/*! mongoose */ \"mongoose\");\nconst presentation = new mongoose.Schema({\n  id_espa: 'UUID',\n  titre: {\n    type: String,\n    required: true\n  },\n  content: {\n    type: String,\n    required: true\n  },\n  insertedat: {\n    type: Date,\n    default: Date.now\n  },\n  updatedat: Date,\n  _id_account: 'UUID'\n});\nmodule.exports = mongoose.model(\"Presentation\", presentation);\n\n//# sourceURL=webpack://mysite/./server/models/presentation.js?");

/***/ }),

/***/ "./server/routers/accountRouter.js":
/*!*****************************************!*\
  !*** ./server/routers/accountRouter.js ***!
  \*****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst controller = __webpack_require__(/*! ../controllers/accountController */ \"./server/controllers/accountController.js\");\nconst fileupload = __webpack_require__(/*! express-fileupload */ \"express-fileupload\");\nconst router = express.Router();\nrouter.param(\"id\", controller.accountById);\nrouter.use(\"/account\", fileupload());\nrouter.route(\"/account\").post(controller.create).get(controller.list);\nrouter.route(\"/account/:id\").get(controller.show).delete(controller.delete).put(controller.update);\nrouter.route(\"/account/verify\").post(controller.verify);\nrouter.route(\"/account/toadmin/:id\").put(controller.toAdmin);\nmodule.exports = router;\n\n//# sourceURL=webpack://mysite/./server/routers/accountRouter.js?");

/***/ }),

/***/ "./server/routers/docRouter.js":
/*!*************************************!*\
  !*** ./server/routers/docRouter.js ***!
  \*************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst fileupload = __webpack_require__(/*! express-fileupload */ \"express-fileupload\");\nconst controller = __webpack_require__(/*! ../controllers/docController */ \"./server/controllers/docController.js\");\nconst router = express.Router();\nrouter.use(\"/doc\", fileupload());\nrouter.route(\"/doc\").post(controller.upload).get(controller.list);\nrouter.param(\"id\", controller.docById);\nrouter.route(\"/doc/:id\").get(controller.download).delete(controller.delete);\nmodule.exports = router;\n\n//# sourceURL=webpack://mysite/./server/routers/docRouter.js?");

/***/ }),

/***/ "./server/routers/espaRouter.js":
/*!**************************************!*\
  !*** ./server/routers/espaRouter.js ***!
  \**************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst controller = __webpack_require__(/*! ../controllers/espaController */ \"./server/controllers/espaController.js\");\nconst router = express.Router();\nrouter.param(\"id\", controller.espaById);\nrouter.route(\"/espa\").post(controller.create).get(controller.list);\nrouter.route(\"/espa/:id\").get(controller.show).delete(controller.delete).put(controller.update);\nmodule.exports = router;\n\n//# sourceURL=webpack://mysite/./server/routers/espaRouter.js?");

/***/ }),

/***/ "./server/routers/mimozaRouter.js":
/*!****************************************!*\
  !*** ./server/routers/mimozaRouter.js ***!
  \****************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst controller = __webpack_require__(/*! ../controllers/mimozaController */ \"./server/controllers/mimozaController.js\");\nconst fileupload = __webpack_require__(/*! express-fileupload */ \"express-fileupload\");\nconst router = express.Router();\nrouter.param(\"id\", controller.mimozaById);\nrouter.use(\"/mimoza\", fileupload());\nrouter.route(\"/mimoza\").post(controller.create).get(controller.list);\nrouter.route(\"/mimoza/:id\").get(controller.show).delete(controller.delete).put(controller.update);\nmodule.exports = router;\n\n//# sourceURL=webpack://mysite/./server/routers/mimozaRouter.js?");

/***/ }),

/***/ "./server/routers/presentationRouter.js":
/*!**********************************************!*\
  !*** ./server/routers/presentationRouter.js ***!
  \**********************************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

eval("const express = __webpack_require__(/*! express */ \"express\");\nconst controller = __webpack_require__(/*! ../controllers/presentationController */ \"./server/controllers/presentationController.js\");\nconst router = express.Router();\nrouter.param(\"id\", controller.presById);\nrouter.route(\"/presentation\").post(controller.create).get(controller.list);\nrouter.route(\"/presentation/:id\").get(controller.show).delete(controller.delete).put(controller.update);\nmodule.exports = router;\n\n//# sourceURL=webpack://mysite/./server/routers/presentationRouter.js?");

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