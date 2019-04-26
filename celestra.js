/**
 * @name Celestra
 * @version 2.7.0
 * @see https://github.com/Serrin/Celestra/
 * @license MIT https://opensource.org/licenses/MIT
 */
(function(window, document){
"use strict";

/* Celestra FP */

/*-----------------+------+-----------------------------------
  Function         |   #  |  Inner calls
-------------------+------+-----------------------------------
  CTRL-F           |   N  |  __toArray__()
  importScripts()  |   2  |  importScript(), importScript()
  importStyles()   |   2  |  importStyle(),  importStyle()
  domFadeToggle()  |   2  |  domFadeIn(), domFadeOut()
  arrayMerge()     |   1  |  arrayMerge()
  extend()         |   1  |  extend()
  deepAssign()     |   1  |  deepAssign()
  getJson()        |   1  |  getAjax()
  getText()        |   1  |  getAjax()
  isEqual()        |   2  |  getType()
-------------------+------+---------------------------------*/

/* polyfills */

if (!Array.from) {
  Array.from = function (o, fn) {
    var a = Array.prototype.slice.call(o);
    if (fn) { return a.map(fn); }
    return a;
  };
}

if (!Array.of) {
  Array.of = function () { return Array.prototype.slice.call(arguments); };
}

if (!Object.create) {
  Object.create = function (o) {
    function F(){}
    F.prototype = o;
    return new F();
  };
}

if (!Object.assign) {
  Object.assign = function () {
    var t = arguments[0] || {};
    for (var i = 0, l = arguments.length; i < l; i++) {
      var s = arguments[i];
      for (var a in s) { if (s.hasOwnProperty(a)) { t[a] = s[a]; } }
    }
    return t;
  };
}

if (!Array.prototype.find) {
  Array.prototype.find = function (fn) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (fn(this[i],i,this)) { return this[i]; }
    }
    return undefined;
  };
}

if (!Array.prototype.findIndex) {
  Array.prototype.findIndex = function (fn) {
    for (var i = 0, l = this.length; i < l; i++) {
      if (fn(this[i],i,this)) { return i; }
    }
    return -1;
  };
}

if (!Array.prototype.fill) {
  Array.prototype.fill = function (value, start, end) {
    if (arguments.length === 2) {
      end = this.length;
    } else if (arguments.length < 2 ) {
      start = 0;
      end = this.length;
    }
    if (start < 0) { start = this.length + start; }
    if (end < 0) { end = this.length + end; }
    for (var i = start; i < end; i++) { this[i] = value; }
    return this;
  }
}

if (!Array.prototype.includes) {
  Array.prototype.includes = function (v, f) {
    if (!f) { var f = 0; }
    return (this.indexOf(v, f) > -1);
  };
}

if (!String.prototype.includes) {
  String.prototype.includes = function (v, f) {
    if (!f) { var f = 0; }
    return (this.indexOf(v, f) > -1);
  };
}

if (!String.prototype.trimStart) {
  String.prototype.trimStart = function () { return this.replace(/^\s+/,""); };
}
if (!String.prototype.trimLeft) {
  String.prototype.trimLeft = function () { return this.replace(/^\s+/,""); };
}

if (!String.prototype.trimEnd) {
  String.prototype.trimEnd = function () { return this.replace(/\s+$/,""); };
}
if (!String.prototype.trimRight) {
  String.prototype.trimRight = function () { return this.replace(/\s+$/,""); };
}

if (!String.prototype.startsWith) {
	String.prototype.startsWith = function(searchString, position) {
    if (position === undefined) { position = 0; }
		return this.indexOf(searchString) === position;
	};
}

if (!String.prototype.endsWith) {
	String.prototype.endsWith = function(searchString, length) {
    if (length === undefined) { length = this.length; }
    var subs = this.substring(0, length);
		return subs.indexOf(searchString) === (subs.length - searchString.length);
	};
}

if (!String.prototype.padStart) {
  String.prototype.padStart = function (len, str) {
    len = Math.floor(Number(len));
    if (len <= this.length || len === NaN ) {
      return String(this);
    } else {
      str = String(typeof str !== "undefined" ? str: " ");
      if (str.length === 0) { return String(this); }
      var res = "", n = Math.floor( (len - this.length) / str.length)+1;
      for (var i = 0; i < n; i++) { res += str; }
      return res.slice(0, len - this.length) + String(this);
    };
  };
}

if (!String.prototype.padEnd) {
  String.prototype.padEnd = function (len, str) {
    len =  Math.floor(Number(len));
    if (len <= this.length || len === NaN ) {
      return String(this);
    } else {
      str = String(typeof str !== "undefined" ? str: " ");
      if (str.length === 0) { return String(this); }
      var res = "", n = Math.floor( (len - this.length) / str.length)+1;
      for (var i = 0; i < n; i++) { res += str; }
      return String(this) + res.slice(0, len - this.length);
    };
  };
}

if (!String.prototype.repeat) {
  String.prototype.repeat = function (c) {
    "use strict";
    if (this == null) {
      throw new TypeError("can\"t convert " + this + " to object");
    }
    var str = "" + this;
    c = +c;
    if (c != c) { c = 0; }
    if (c < 0) { throw new RangeError("repeat count must be non-negative"); }
    if (c == Infinity) {
      throw new RangeError("repeat count must be less than infinity");
    }
    c = Math.floor(c);
    if (str.length == 0 || c == 0) { return ""; }
    if (str.length * c >= 1 << 28) {
      throw new RangeError("repeat count must not overflow maximum string size");
    }
    var maxCount = str.length * c;
    c = Math.floor(Math.log(c) / Math.log(2));
    while (c) { str += str; c--; }
    str += str.substring(0, maxCount - str.length);
    return str;
  }
}

[Element.prototype, CharacterData.prototype, DocumentType.prototype].forEach(function (p) {
  if (!p.after) {
    p.after = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.parentNode.insertBefore(
          (e instanceof Node ? e : document.createTextNode(String(e))),
          t.nextSibling
        );
      });
    };
  }
  if (!p.before) {
    p.before = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.parentNode.insertBefore(
          (e instanceof Node ? e : document.createTextNode(String(e))), t
        );
      });
    };
  }
  if (!p.remove) {
    p.remove = function () { this.parentNode.removeChild(this); };
  }
  if (!p.replaceWith) {
    p.replaceWith = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.parentNode.replaceChild(
          (e instanceof Node ? e : document.createTextNode(String(e))), t
        );
      });
    };
  }
  if (!p.append) {
    p.append = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.appendChild(
          e instanceof Node ? e : document.createTextNode(String(e))
        );
      });
    };
  }
  if (!p.prepend) {
    p.prepend = function () {
      var t = this;
      Array.prototype.forEach.call(arguments, function (e) {
        t.insertBefore(
          (e instanceof Node ? e : document.createTextNode(String(e))),
          t.firstChild
        );
      });
    };
  }
});

if (!Element.prototype.toggleAttribute) {
  Element.prototype.toggleAttribute = function (name, force) {
    var forcePassed = (arguments.length === 2);
    var forceOn = !!force;
    var forceOff = (forcePassed && !force);
    if (this.getAttribute(name) !== null) {
      if (forceOn) { return true; }
      this.removeAttribute(name);
      return false;
    } else {
      if (forceOff) { return false; }
      this.setAttribute(name, "");
      return true;
    }
  };
}

if (!Element.prototype.matches) {
  Element.prototype.matches =
    Element.prototype.msMatchesSelector ||
    Element.prototype.webkitMatchesSelector ||
    Element.prototype.matchesSelector ||
    Element.prototype.mozMatchesSelector ||
    Element.prototype.oMatchesSelector ||
    function (s) {
      var matches = (this.document || this.ownerDocument).querySelectorAll(s),
        i = matches.length;
      while (--i >= 0 && matches.item(i) !== this) {}
      return i > -1;
    };
}

if (!Element.prototype.closest) {
  Element.prototype.closest = function (s) {
    var el = this;
    if (!document.documentElement.contains(el)) { return null; }
    do {
      if (el.matches(s)) { return el; }
      el = el.parentElement || el.parentNode;
    } while (el !== null && el.nodeType === 1);
    return null;
  };
}

if (!Element.prototype.getAttributeNames) {
  Element.prototype.getAttributeNames = function () {
    var attributes = this.attributes;
    var length = attributes.length;
    var result = new Array(length);
    for (var i = 0; i < length; i++) { result[i] = attributes[i].name; }
    return result;
  };
}

if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
    thisArg = thisArg || window;
    for (var i = 0; i < this.length; i++) {
      callback.call(thisArg, this[i], i, this);
    }
  };
}

if (!Array.prototype.flat) {
  Array.prototype.flat = function (depth) {
    if (depth === undefined) {
      depth = 1;
    } else {
      depth = Math.floor(Number(depth));
      if (isNaN(depth) || depth < 1) { return this; }
    }
    function deepFlat (a, cd) {
      a.forEach(function(e) {
        if (Array.isArray(e)) {
          if (cd < depth) { deepFlat(e, cd+1); } else { res.push(e); }
        } else {
          res.push(e);
        }
      });
    }
    var res = [];
    deepFlat(this, 0);
    return res;
  };
}

if (!Array.prototype.flatMap) {
  Array.prototype.flatMap = function (fn) {
    var res = [];
    this.map(fn).forEach(function (e) {
      if (Array.isArray(e)) { res = res.concat(e); } else { res.push(e); }
    });
    return res;
  };
}

if (!Object.fromEntries) {
  Object.fromEntries = function (entries) {
    var res = {};
    if (Array.isArray(entries)) {
      entries.forEach(function (e) { res[e[0]] = e[1]; });
    } else if (Object.prototype.toString.call(entries) === "[object Map]") {
      entries.forEach(function (value, key) { res[key] = value; });
    } else {
      throw "TypeError: Celestra Object.fromEntries() polyfill supports only Array and Map parameters in the modern browsers. In IE11 only the Array parameter is supported.";
    }
    return res;
  };
}

if (!Object.entries) {
  Object.entries = function (o) {
    return Object.keys(o).map(function (e) { return [e, o[e]]; });
  };
}

if (!Object.values) {
  Object.values = function (o) {
    return Object.keys(o).map(function (e) { return o[e]; });
  };
}

if (!Object.is) {
  Object.is = function(x, y) {
    if (x === y) {
      return x !== 0 || 1 / x === 1 / y;
    } else {
      return x !== x && y !== y;
    }
  };
}

if (!Object.getOwnPropertyDescriptors) {
  Object.getOwnPropertyDescriptors = function (obj) {
    var res = {};
    var n = Object.getOwnPropertyNames(obj);
    for (var i = 0, l = n.length; i < l; i++) {
      res[n[i]] = Object.getOwnPropertyDescriptor(obj, n[i]);
    }
    return res;
  };
}

if (!Array.prototype.copyWithin) {
  Array.prototype.copyWithin = function(target, start) {
    if (this == null) { throw new TypeError("this is null or not defined"); }
    var O = Object(this);
    var len = O.length >>> 0;
    var relativeTarget = target >> 0;
    var to = relativeTarget < 0 ?
      Math.max(len + relativeTarget, 0) : Math.min(relativeTarget, len);
    var relativeStart = start >> 0;
    var fr = relativeStart < 0 ?
      Math.max(len + relativeStart, 0) : Math.min(relativeStart, len);
    var end = arguments[2];
    var relativeEnd = end === undefined ? len : end >> 0;
    var final = relativeEnd < 0 ?
      Math.max(len + relativeEnd, 0) : Math.min(relativeEnd, len);
    var count = Math.min(final - fr, len - to);
    var direction = 1;
    if (fr < to && to < (fr + count)) {
      direction = -1;
      fr += count - 1;
      to += count - 1;
    }
    while (count > 0) {
      if (fr in O) { O[to] = O[fr]; } else { delete O[to]; }
      fr += direction;
      to += direction;
      count--;
    }
    return O;
  };
}

if (Array.prototype.keys
  && Array.prototype.entries
  && !Array.prototype.values) {
  Array.prototype.values = Array.prototype[Symbol.iterator];
}

/*! https://mths.be/fromcodepoint v0.2.1 by @mathias */
if (!String.fromCodePoint) {
  (function() {
    var defineProperty = (function() {
      try {
        var object = {};
        var $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var stringFromCharCode = String.fromCharCode;
    var floor = Math.floor;
    var fromCodePoint = function (_) {
      var MAX_SIZE = 0x4000, codeUnits = [], highSurrogate;
      var lowSurrogate, index = -1, length = arguments.length;
      if (!length) { return ""; }
      var result = "";
      while (++index < length) {
        var codePoint = Number(arguments[index]);
        if (!isFinite(codePoint) || codePoint < 0 ||
            codePoint > 0x10FFFF || floor(codePoint) != codePoint
        ) { throw RangeError("Invalid code point: " + codePoint); }
        if (codePoint <= 0xFFFF) {
          codeUnits.push(codePoint);
        } else {
          codePoint -= 0x10000;
          highSurrogate = (codePoint >> 10) + 0xD800;
          lowSurrogate = (codePoint % 0x400) + 0xDC00;
          codeUnits.push(highSurrogate, lowSurrogate);
        }
        if (index + 1 == length || codeUnits.length > MAX_SIZE) {
          result += stringFromCharCode.apply(null, codeUnits);
          codeUnits.length = 0;
        }
      }
      return result;
    };
    if (defineProperty) {
      defineProperty(String, "fromCodePoint", {
        "value": fromCodePoint, "configurable": true, "writable": true
      });
    } else {
      String.fromCodePoint = fromCodePoint;
    }
  }());
}

/*! https://mths.be/codepointat v0.2.0 by @mathias */
if (!String.prototype.codePointAt) {
  (function() {
    "use strict";
    var defineProperty = (function() {
      try {
        var object = {}, $defineProperty = Object.defineProperty;
        var result = $defineProperty(object, object, object) && $defineProperty;
      } catch(error) {}
      return result;
    }());
    var codePointAt = function(position) {
      if (this == null) { throw TypeError(); }
      var string = String(this);
      var size = string.length;
      var index = position ? Number(position) : 0;
      if (index != index) { index = 0; }
      if (index < 0 || index >= size) { return undefined; }
      var first = string.charCodeAt(index);
      var second;
      if (first >= 0xD800 && first <= 0xDBFF && size > index + 1) {
        second = string.charCodeAt(index + 1);
        if (second >= 0xDC00 && second <= 0xDFFF) {
          return (first - 0xD800) * 0x400 + second - 0xDC00 + 0x10000;
        }
      }
      return first;
    };
    if (defineProperty) {
      defineProperty(String.prototype, "codePointAt", {
        "value": codePointAt, "configurable": true, "writable": true
      });
    } else {
      String.prototype.codePointAt = codePointAt;
    }
  }());
}

if (!("screenLeft" in window)) { window.screenLeft = window.screenX; }
if (!("screenTop" in window)) { window.screenTop = window.screenY; }

/* https://github.com/tc39/proposal-global */
(function (global) {
  if (!global.globalThis) {
    if (Object.defineProperty) {
      Object.defineProperty(global, "globalThis", {
        configurable: true, enumerable: false, value: global, writable: true
      });
    } else {
      global.globalThis = global;
    }
  }
})(typeof this === "object" ? this : Function("return this")());

/* Number ES6 */

if (Number.MIN_SAFE_INTEGER === undefined) {
  Number.MIN_SAFE_INTEGER = -9007199254740991;
}

if (Number.MAX_SAFE_INTEGER === undefined) {
  Number.MAX_SAFE_INTEGER = 9007199254740991;
}

if (Number.EPSILON === undefined) { Number.EPSILON = Math.pow(2, -52); }

if (!Number.isNaN) { Number.isNaN = function (v) { return v !== v; }; }

if (!window.isNaN) {
  window.isNaN = function isNaN (v) { return Number.isNaN(Number(v)); };
}

if (!Number.isInteger) {
  Number.isInteger = function (v) {
    return typeof v === "number"
      && isFinite(v)
      && v > -9007199254740992
      && v < 9007199254740992
      && Math.floor(v) === v;
  };
}

if (!Number.isFinite) {
  Number.isFinite = function (v) {
    return typeof v === "number" && isFinite(v);
  };
}

if (!Number.isSafeInteger) {
  Number.isSafeInteger = function (v) {
    return Number.isInteger(v) && Math.abs(v) <= Number.MAX_SAFE_INTEGER;
  };
}

if (!Number.parseInt) { Number.parseInt = window.parseInt; }
if (!Number.parseFloat) { Number.parseFloat = window.parseFloat; }

/* Math ES6 */

Math.acosh = Math.acosh || function (x) {
  return Math.log(x + Math.sqrt(x * x - 1));
};

Math.asinh = Math.asinh || function (x) {
  if (x === -Infinity) {
    return x;
  } else {
    return Math.log(x + Math.sqrt(x * x + 1));
  }
};

Math.atanh = Math.atanh || function (x) { return Math.log((1+x)/(1-x)) / 2; };

if (!Math.cbrt) {
  Math.cbrt = function (x) {
    var y = Math.pow(Math.abs(x), 1/3);
    return x < 0 ? -y : y;
  };
}

if (!Math.clz32) Math.clz32 = (function(log, LN2){
  return function(x) {
    if (x == null || x === 0) { return 32; }
    return 31 - log(x >>> 0) / LN2 | 0;
  };
})(Math.log, Math.LN2);

Math.cosh = Math.cosh || function (x) {
  var y = Math.exp(x);
  return (y + 1 / y) / 2;
};

Math.expm1 = Math.expm1 || function (x) { return Math.exp(x) - 1; };

Math.fround = Math.fround || (function (array) {
  return function (x) { return array[0] = x, array[0]; };
})(new Float32Array(1));

Math.hypot = Math.hypot || function (x, y) {
  var max = 0;
  var s = 0;
  for (var i = 0; i < arguments.length; i += 1) {
    var arg = Math.abs(Number(arguments[i]));
    if (arg > max) {
      s *= (max / arg) * (max / arg);
      max = arg;
    }
    s += arg === 0 && max === 0 ? 0 : (arg / max) * (arg / max);
  }
  return max === 1 / 0 ? 1 / 0 : max * Math.sqrt(s);
};

Math.imul = Math.imul || function (a, b) {
  var aHi = (a >>> 16) & 0xffff, aLo = a & 0xffff;
  var bHi = (b >>> 16) & 0xffff, bLo = b & 0xffff;
  return ((aLo * bLo) + (((aHi * bLo + aLo * bHi) << 16) >>> 0) | 0);
};

Math.log1p = Math.log1p || function (x) { return Math.log(1 + x); };

Math.log10 = Math.log10 || function (x) { return Math.log(x) * Math.LOG10E; };

Math.log2 = Math.log2 || function (x) { return Math.log(x) * Math.LOG2E; };

if (!Math.sign) {
  Math.sign = function (x) { return ((x > 0) - (x < 0)) || +x; };
}

Math.sinh = Math.sinh || function (x) {
  var y = Math.exp(x);
  return (y - 1 / y) / 2;
}

Math.tanh = Math.tanh || function (x) {
  var a = Math.exp(+x), b = Math.exp(-x);
  return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (a + b);
}

if (!Math.trunc) {
	Math.trunc = function (v) {
		v = +v;
		return (v - v % 1) || (!isFinite(v) || v === 0 ? v : v < 0 ? -0 : 0);
	};
}

/* core api */

function qsa (s, c) { return Array.from((c || document).querySelectorAll(s)); }

function qs (s, c) { return (c || document).querySelector(s); }

function domReady (fn) {
  if (document.readyState!=="loading") {
    fn();
  } else {
    document.addEventListener("DOMContentLoaded", function (event) { fn(); });
  }
}

function random (i, a) {
  if (i === undefined) { var i = 100; }
  if (a === undefined) { var a = i; i = 0; }
  return Math.floor(Math.random() * (a - i + 1)) + i;
}

function randomString (pl, sc) {
  if (arguments.length === 1) {
    sc = false;
  } else if (arguments.length === 0) {
    sc = false;
    pl = 100;
  }
  var chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (sc) { chars += ",?,.:-_*$ß¤Łł÷×¸¨˝´˙`˛°˘^ˇ~§'+!%/=()[]#<>&@{}\"\\/| éáűőúöüóíÉÁŰŐÚÖÜÓÍß"; }
  var s = "", l = chars.length;
  for (var i = 0; i < pl; i++) { s += chars[Math.floor(Math.random()*l)]; }
  return s;
}

function b64Encode (str) {
  return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g,
    function toSolidBytes(match, p1) { return String.fromCharCode("0x" + p1); }
  ));
}

function b64Decode (str) {
  return decodeURIComponent(atob(str).split("").map(function(c) {
    return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(""));
}

function javaHash (s, hx) {
  if (s !== undefined) { s = "" + s; } else { return 0; }
  var h = 0, l = s.length, c = "";
  if (l == 0) { return h; }
  for (var i = 0; i < l; i++) {
    c = s.charCodeAt(i);
    h = ((h<<5)-h)+c;
    h = h & h;
  }
  if (hx) { return h.toString(16); }
  return h;
}

function inherit (c, p) {
  c.prototype = Object.create(p.prototype);
  c.prototype.constructor = c;
  return c;
}

function importScript (u, s) {
  var scr = document.createElement("script");
  scr.type = "text\/javascript";
  scr.src = u;
  scr.onerror = function (e) {
    throw new URIError(
      "Loading failed for the script with source " + e.target.src
    );
  };
  if (s) { scr.onreadystatechange = s; scr.onload = s; }
  (document.head || document.getElementsByTagName("head")[0]).appendChild(scr);
}

function importScripts (s) {
  if (Array.isArray(s)) {
    s.forEach(function (e) { celestra.importScript(e.url, e.success); });
  } else {
    Array.prototype.forEach.call(
      arguments, function (e) { celestra.importScript(e); }
    );
  }
}

function importStyle (h, s) {
  var stl = document.createElement("link");
  stl.rel = "stylesheet";
  stl.type = "text\/css";
  stl.href = h;
  stl.onerror = function (e) {
    throw new URIError(
      "Loading failed for the style with source " + e.target.href
    );
  };
  if (s) { stl.onreadystatechange = s; stl.onload = s; }
  (document.head || document.getElementsByTagName("head")[0]).appendChild(stl);
}

function importStyles (s) {
  if (Array.isArray(s)) {
      s.forEach(function (e) { celestra.importStyle(e.href, e.success); });
  } else {
    Array.prototype.forEach.call(
      arguments, function (e) { celestra.importStyle(e); }
    );
  }
}

function getUrlVar (n) {
  var r = {}, w = window.location.search.substring(1).split("&");
  for (var i = 0, l = w.length; i < l; i++) {
    var e = w[i].split("=");
    r[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
  }
  if (JSON.stringify(r) === "{\"\":\"undefined\"}") { r = {}; }
  if (n) { return r[n] ? r[n] : null; } else { return r; }
}

function getUrlVarFromString (qstr, n) {
  var r = {}, w = qstr.substring(1).split("&");
  for (var i = 0, l = w.length; i < l; i++) {
    var e = w[i].split("=");
    r[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
  }
  if (JSON.stringify(r) === "{\"\":\"undefined\"}") { r = {}; }
  if (n) { return r[n] ? r[n] : null; } else { return r; }
}

function obj2string (o) {
  var s = "";
  for (var p in o) {
    if (o.hasOwnProperty(p)) {
      s += encodeURIComponent(p) + "=" + encodeURIComponent(o[p]) + "&";
    }
  }
  return s.substring(0, s.length-1);
}

function getType (v, t) {
  var ot = (typeof v).toLowerCase();
  if (ot === "object") {
    ot = Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1")
      .toLowerCase();
  }
  if (arguments.length === 2) { return ot === t.toLowerCase(); }
  return ot;
}

function extend () {
  var so = {};
  if (typeof arguments[0] === "boolean") {
    var t = arguments[1], d = arguments[0], s = 2;
  } else {
    var t = arguments[0], d = false, s = 1;
  }
  for (var i = s, l = arguments.length; i < l; i++) {
    so = arguments[i];
    if (so !== null && so !== undefined) {
      for (var a in so) {
        if (so.hasOwnProperty(a)) {
          if (typeof so[a] === "object" && d) {
            t[a] = celestra.extend(true, {}, so[a]);
          } else {
            t[a] = so[a];
          }
        }
      }
    }
  }
  return t;
}

function deepAssign () {
  var s = {}, t = arguments[0];
  for (var i = 1, l = arguments.length; i < l; i++) {
    s = arguments[i];
    if (s !== null && s !== undefined) {
      for (var a in s) {
        if (s.hasOwnProperty(a)) {
          if (typeof s[a] === "object") {
            t[a] = celestra.deepAssign({}, s[a]);
          } else {
            t[a] = s[a];
          }
        }
      }
    }
  }
  return t;
}

function getFullscreen () {
  return (
    document.fullscreenElement ||
    document.mozFullScreenElement ||
    document.webkitFullscreenElement ||
    document.msFullscreenElement ||
    undefined
  );
}

function setFullscreenOn (s) {
  if (typeof s === "string") { var e = document.querySelector(s); }
  else if (typeof s === "object") { var e = s; }
  if (e.requestFullscreen) { e.requestFullscreen(); }
  else if (e.mozRequestFullScreen) { e.mozRequestFullScreen(); }
  else if (e.webkitRequestFullscreen) { e.webkitRequestFullscreen(); }
  else if (e.msRequestFullscreen) { e.msRequestFullscreen(); }
}

function setFullscreenOff () {
  if (document.exitFullscreen) { document.exitFullscreen(); }
  else if (document.mozCancelFullScreen) { document.mozCancelFullScreen(); }
  else if (document.webkitExitFullscreen) { document.webkitExitFullscreen(); }
  else if (document.msExitFullscreen) { document.msExitFullscreen(); }
}

function getLocation (s, e) {
  if (!e) { var e = function () {}; }
  function getE (error) { e("ERROR(" + error.code + "): " + error.message); }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(s, getE);
  } else {
    getE("Geolocation is not supported in this browser.");
  }
}

function getDoNotTrack () {
  return (
    navigator.doNotTrack === true // FF
    || navigator.doNotTrack === 1
    || navigator.doNotTrack === "1"
    || window.doNotTrack === true // IE11, EDGE, Safari 7.1.3+
    || window.doNotTrack === 1
    || window.doNotTrack === "1"
    || navigator.msDoNotTrack === true // IE9-10
    || navigator.msDoNotTrack === 1
    || navigator.msDoNotTrack === "1"
  );
}

function form2array (f) {
  var fld, a = [];
  if (typeof f === "object" && f.nodeName.toLowerCase() === "form") {
    for (var i=0, len=f.elements.length; i<len; i++) {
      fld = f.elements[i];
      if (fld.name
        && !fld.disabled && fld.type !== "file"
        && fld.type !== "reset"
        && fld.type !== "submit"
        && fld.type !== "button") {
        if (fld.type === "select-multiple") {
          for (var j=0, l=f.elements[i].options.length; j<l; j++) {
            if(fld.options[j].selected) {
              a.push({
                "name": encodeURIComponent(fld.name),
                "value": encodeURIComponent(fld.options[j].value)
              });
            }
          }
        } else if ((fld.type !== "checkbox" && fld.type !== "radio")
          || fld.checked) {
          a.push({
            "name": encodeURIComponent(fld.name),
            "value": encodeURIComponent(fld.value)
          });
        }
      }
    }
  }
  return a;
}

function form2string (f) {
  var fld, a = [];
  if (typeof f === "object" && f.nodeName.toLowerCase() === "form") {
    for (var i=0, len=f.elements.length; i<len; i++) {
      fld = f.elements[i];
      if (fld.name
        && !fld.disabled
        && fld.type !== "file"
        && fld.type !== "reset"
        && fld.type !== "submit"
        && fld.type !== "button") {
        if (fld.type === "select-multiple") {
          for (var j=0, l=f.elements[i].options.length; j<l; j++) {
            if(fld.options[j].selected) {
              a.push(encodeURIComponent(fld.name)
              + "=" + encodeURIComponent(fld.options[j].value));
            }
          }
        } else if ((fld.type !== "checkbox" && fld.type !== "radio")
          || fld.checked) {
          a.push(encodeURIComponent(fld.name)
            + "=" + encodeURIComponent(fld.value));
        }
      }
    }
  }
  return a.join("&").replace(/%20/g, "+");
}

function strRemoveTags (s) {
  return String(s).replace(/<[^>]*>/g, " ").replace(/\s{2,}/g, " ").trim();
}

function strReverse (s) { return Array.from(String(s)).reverse().join(""); }

function createFile (fln, c, dt) {
  var l = arguments.length;
  if (l > 1) {
    if (l === 2) { dt = "text/plain"; }
    var b = new Blob([c], {type: dt});
    if (window.navigator.msSaveOrOpenBlob) {
      window.navigator.msSaveBlob(b, fln);
    } else {
      var e = window.document.createElement("a");
      e.href = window.URL.createObjectURL(b);
      e.download = fln;
      document.body.appendChild(e);
      e.click();
      document.body.removeChild(e);
      window.URL.revokeObjectURL(e.href);
    }
  } else {
    throw "Celestra createFile error: too few parameters.";
  }
}

function forIn (o, fn) {
  for (var p in o) { if (o.hasOwnProperty(p)) { fn(o[p], p, o); } }
  return o;
}

function mapIn (o, fn) {
  var r = {};
  for (var p in o) { if (o.hasOwnProperty(p)) { r[p] = fn(o[p], p, o); } }
  return r;
}

function toFunction (fn) { return Function.prototype.call.bind(fn); }

var bind = Function.prototype.call.bind(Function.prototype.bind);

var hasOwn = Function.prototype.call.bind(Object.prototype.hasOwnProperty);

function constant (v) { return function () { return v; }; }
function identity (v) { return v; }
function noop () {}
function T () { return true; }
function F () { return false; }

/* DOM */

function domCreate (t, ps, iH) {
  if (arguments.length === 1 && typeof t === "object") {
    var obj = t;
    t = obj.elementType;
    ps = {};
    for (var p in obj) { if (p !== "elementType") { ps[p] = obj[p]; } }
  }
  var el = document.createElement(t);
  if (ps) {
    for (var p in ps) {
      if (p !== "style" || typeof ps[p] === "string") {
        el[p] = ps[p];
      } else {
        for (var s in ps[p]) { el.style[s] = ps[p][s]; }
      }
    }
  }
  if (iH) { el.innerHTML = iH; }
  return el;
}

function domToElement(s) {
  var e = document.createElement("div");
  e.innerHTML = s;
  return e.firstElementChild;
}

function domGetCSS (e, p) {
  return (window.getComputedStyle
    ? getComputedStyle(e, null)
    : e.currentStyle)[p];
}

function domSetCSS (e, n, v) {
  if (typeof n === "string") {
    e.style[n] = v;
  } else if (typeof n === "object") {
    for (var p in n) { e.style[p] = n[p]; }
  }
}

function domFadeIn (e, dur, d) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 0);
  s.display = (d || "");
  (function fade () {
    (s.opacity = parseFloat(s.opacity)+step) > 1
      ? s.opacity = 1
      : setTimeout(fade, 25);
  })();
}

function domFadeOut (e, dur) {
  var s = e.style, step = 25/(dur || 500);
  s.opacity = (s.opacity || 1);
  (function fade () {
    (s.opacity -= step) < 0 ? s.display = "none" : setTimeout(fade, 25);
  })();
}

function domFadeToggle (e, dur, d) {
  if ((window.getComputedStyle
    ? getComputedStyle(e, null)
    : e.currentStyle).display === "none") {
    celestra.domFadeIn(e, dur, (d || ""));
  } else {
    celestra.domFadeOut(e, dur);
  }
}

function domHide (e) { e.style.display = "none"; }

function domShow (e, d) { e.style.display = (d || ""); }

function domToggle (e, d) {
  if ((window.getComputedStyle
    ? getComputedStyle(e, null)
    : e.currentStyle).display === "none") {
    e.style.display = (d || "");
  } else {
    e.style.display = "none";
  }
}

function domOn (el, et, fn) { return el.addEventListener(et, fn); }

function domOff (el, et, fn) { return el.removeEventListener(et, fn); }

function domTrigger (el, et) { return el[et](); }

function domSiblings (el) {
  return Array.prototype.filter.call(el.parentNode.children, function (e) {
    return (e !== el);
  });
}

/* AJAX */

function getJson (url, success) { celestra.getAjax(url, "json", success); }

function getText (url, success) { celestra.getAjax(url, "text", success); }

function getAjax (url, format, success, error, user, password) {
  var xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");
  if (typeof user === "string" && typeof password === "string") {
    xhr.open("GET", url, true, user, password);
  } else {
    xhr.open("GET", url, true);
  }
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      switch (format.toLowerCase()) {
        case "text": success(this.responseText); break;
        case "json": success(JSON.parse(this.responseText)); break;
        case "xml": success(this.responseXML); break;
        default: success(this.responseText);
      }
    }
  };
  if (error) { xhr.onerror = error; }
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.send();
}

function postAjax (url, data, format, success, error, user, password) {
  var xhr = window.XMLHttpRequest
    ? new XMLHttpRequest()
    : new ActiveXObject("Microsoft.XMLHTTP");
  if (typeof user === "string" && typeof password === "string") {
    xhr.open("POST", url, true, user, password);
  } else {
    xhr.open("POST", url, true);
  }
  xhr.onreadystatechange = function() {
    if (this.readyState === 4 && this.status === 200) {
      switch (format.toLowerCase()) {
        case "text": success(this.responseText); break;
        case "json": success(JSON.parse(this.responseText)); break;
        case "xml": success(this.responseXML); break;
        default: success(this.responseText);
      }
    }
  };
  if (error) { xhr.onerror = error; }
  xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.send(encodeURIComponent(data));
}

function getCors (url, format, success, error, user, password) {
  var xhr = new XMLHttpRequest();
  if (!("withCredentials" in xhr)) xhr = new XDomainRequest();
  if (typeof user === "string" && typeof password === "string") {
    xhr.open("GET", url, true, user, password);
  } else {
    xhr.open("GET", url, true);
  }
  xhr.onload = function(request) {
    switch (format.toLowerCase()) {
      case "text": success(request.target.responseText
        || request.currentTarget.response); break;
      case "json": success(JSON.parse(request.target.responseText
        || request.currentTarget.response)); break;
      case "xml": success(request.target.responseXML
        || request.currentTarget.responseXML); break;
      default: success(request.target.responseText
        || request.currentTarget.response);
    }
  };
  if (error) { xhr.onerror = error; }
  xhr.send();
}

function postCors (url, data, format, success, error, user, password) {
  var xhr = new XMLHttpRequest();
  if (!("withCredentials" in xhr)) xhr = new XDomainRequest();
  if (typeof user === "string" && typeof password === "string") {
    xhr.open("POST", url, true, user, password);
  } else {
    xhr.open("POST", url, true);
  }
  xhr.onload = function(request) {
    switch (format.toLowerCase()) {
      case "text": success(request.target.responseText
        || request.currentTarget.response); break;
      case "json": success(JSON.parse(request.target.responseText
        || request.currentTarget.response)); break;
      case "xml": success(request.target.responseXML
        || request.currentTarget.responseXML); break;
      default: success(request.target.responseText
        || request.currentTarget.response);
    }
  };
  if (error) { xhr.onerror = error; }
  xhr.send(encodeURIComponent(data));
}

/* type checking */

function isEqual (a, b) {
  return (celestra.getType(a, celestra.getType(b))
    && JSON.stringify(a) === JSON.stringify(b));
}

function isString (v) { return typeof v === "string"; }
function isChar (v) {
  if (typeof v === "string") { if (v.length === 1) { return true; } }
  return false;
}

function isNumber (v) { return typeof v === "number"; }
var isInteger = Number.isInteger;
function isFloat (v) { return typeof v === "number" && !!(v % 1); }
function isNumeric (v) {
  return ( (typeof v === "number" && v === v) ? true : (!isNaN(parseFloat(v))
    && isFinite(v)) );
}

function isBoolean (v) { return typeof v === "boolean"; }

function isObject (v) { return typeof v === "object"; }
function isEmptyObject(v) {
  if (typeof v === "object") {
    for (var n in v) { return false; }
    return true;
  }
  return false;
}

function isFunction (v) { return typeof v === "function"; }

var isArray = Array.isArray;
function isEmptyArray (v) {
  if (Array.isArray(v)) { if (v.length === 0) { return true; } }
  return false;
}
function isArraylike (v) {
  return v
    && typeof v === "object"
    && typeof v.length === "number"
    && v.length >= 0
    && v.length % 1 === 0;
}

function isNull (v) { return v === null; }
function isUndefined (v) { return v === undefined; }
function isNullOrUndefined (v) { return v === null || v === undefined; }
var isNil = isNullOrUndefined;

function isPrimitive (v) {
  return v === null || typeof v !== "object" && typeof v !== "function";
}

function isSymbol (v) { return typeof v === "symbol"; }
function isMap (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase() === "map";
}
function isSet (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase() === "set";
}
function isWeakMap (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase() === "weakmap";
}
function isWeakSet (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase() === "weakset";
}
function isIterator (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase().indexOf("iterator") !== -1;
}

function isDate (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase() === "date";
}

function isRegexp (v) {
  return Object.prototype.toString.call(v).replace(/^\[object (.+)\]$/, "$1")
    .toLowerCase() === "regexp";
}

function isElement (v) { return typeof v === "object" && v.nodeType === 1; }

function isIterable (v) { return (!!v[Symbol.iterator]); }

/* cookie */

function setCookie (name, value, hours, path, domain, secure, HttpOnly) {
  if (!hours) { var hours = 8760; } // 1 year
  var expire = new Date();
  expire.setTime(expire.getTime()+(Math.round(hours*60*60*1000)));
  document.cookie =
    encodeURIComponent(name)
    + "="
    + encodeURIComponent(value)
    + "; expires="+expire.toUTCString()
    + "; path=" + (path ? path : "/")
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
}

function getCookie (name) {
  if (document.cookie.length !== 0) {
    var r = {}, a = document.cookie.split(";");
    for(var i = 0, l = a.length; i < l; i++) {
      var e = a[i].trim().split("=");
      r[decodeURIComponent(e[0])] = decodeURIComponent(e[1]);
    }
    if (name) { return r[name] ? r[name] : null; } else { return r; }
  }
  return name ? null : {};
}

function hasCookie (name) {
  return (document.cookie.indexOf(encodeURIComponent(name)+"=") !== -1);
}

function removeCookie (name, path, domain, secure, HttpOnly) {
  var r = (document.cookie.indexOf(encodeURIComponent(name)+"=") !== -1);
  document.cookie =
    encodeURIComponent(name)
    + "=; expires=Thu, 01 Jan 1970 00:00:01 GMT"
    + "; path=" + (path ? path : "/")
    + (domain ? "; domain=" + domain : "")
    + (secure ? "; secure" : "")
    + (HttpOnly ? "; HttpOnly" : "")
    + ";";
  return r;
}

/* collections */

function forEach (a, fn) {
  var t = Object.prototype.toString.call(a)
    .replace(/^\[object (.+)\]$/, "$1").toLowerCase();
  if (Array.isArray(a) || t === "map" || t === "set") {
    a.forEach(fn);
    return a;
  } else {
    var a2 = Array.from(a);
    a2.forEach(fn);
    if (typeof a !== "string") { return a2; }
    return a2.join("");
  }
}

function map (a, fn) {
  var t = Object.prototype.toString.call(a)
    .replace(/^\[object (.+)\]$/, "$1").toLowerCase();
  if (Array.isArray(a)) { return a.map(fn); }
  else if (t === "string") { return Array.from(a).map(fn).join(""); }
  else if (t === "map") { return new Map(Array.from(a).map(fn)); }
  else if (t === "set") { return new Set(Array.from(a).map(fn)); }
  else { return Array.from(a).map(fn); }
}

function arrayUnion () {
  return Array.prototype.concat.apply(
    [], Array.from(arguments).map(function (e) { return Array.from(e); })
  ).filter(function(e, i, arr) { return arr.indexOf(e) === i; });
}

function arrayIntersection (a, b) {
  var a2 = Array.from(a), b2 = Array.from(b);
  return a2.filter(function (v) { return b2.includes(v); })
    .filter(function(e, i, arr) { return arr.indexOf(e) === i; });
}

function arrayDifference (a, b) {
  var a2 = Array.from(a), b2 = Array.from(b);
  return a2.filter(function (v) { return !(b2.includes(v)); })
    .filter(function(e, i, arr) { return arr.indexOf(e) === i; });
}

function arraySymmetricDifference (a, b) {
  var a2 = Array.from(a), b2 = Array.from(b);
  return a2.filter(function (v) { return !(b2.includes(v)); })
    .concat(b2.filter(function (v) { return !(a2.includes(v)); }))
    .filter(function(e, i, arr) { return arr.indexOf(e) === i; });
}

function setUnion () {
  return new Set(
    Array.prototype.concat.apply(
      [], Array.from(arguments).map(function (e) { return Array.from(e); })
    )
  );
}

function setIntersection (a, b) {
  return new Set(Array.from(a).filter(function (v) { return b.has(v); }));
}

function setDifference (a, b) {
  return new Set(Array.from(a).filter(function (v) { return !(b.has(v)); }));
}

function setSymmetricDifference (a, b) {
  return new Set(
    Array.from(a).filter(function (v) { return !(b.has(v)); }).concat(
      Array.from(b).filter(function (v) { return !(a.has(v)); })
    )
  );
}

function arrayKeys (a) {
  return Array.from(a).map(function (v, i) { return i; });
}
function arrayValues (a) { return Array.from(a); }
function arrayEntries (a) {
  return Array.from(a).map(function (v, i) { return [i, v]; });
}

function min (a) {
  var a2 = celestra.__toArray__(a);
  if (a2.length > 0) {
    var r = a2[0];
    a2.forEach(function (v, i, arr) { if (v < r) { r = v; } });
    return r;
  }
  return null;
}

function minIndex (a) {
  var a2 = celestra.__toArray__(a);
  if (a2.length > 0) {
    var r = 0;
    a2.forEach(function (v, i, arr) { if (v < arr[r]) { r = i; } });
    return r;
  }
  return null;
}

function max (a) {
  var a2 = celestra.__toArray__(a);
  if (a2.length > 0) {
    var r = a2[0];
    a2.forEach(function (v, i, arr) { if (v > r) { r = v; } });
    return r;
  }
  return null;
}

function maxIndex (a) {
  var a2 = celestra.__toArray__(a);
  if (a2.length > 0) {
    var r = 0;
    a2.forEach(function (v, i, arr) { if (v > arr[r]) { r = i; } });
    return r;
  }
  return null;
}

function range (start, end, step) {
  var
    i = Number(start),
    end2 = Number(end),
    step2 = (step !== undefined ? Number(step) : 1),
    res = [];
  while (i <= end2) { res.push(i); i += step2; }
  return res;
}

function toPairs (a, b) {
  var a2 = Array.from(a), b2 = Array.from(b);
  var l = (a2.length < b2.length ? a2.length : b2.length);
  var res = [];
  for (var i = 0; i < l ; i++) { res.push([ a2[i], b2[i] ]); }
  return res;
}

function uniqueArray (a) {
  return celestra.__toArray__(a).filter(
    function (e, i, arr) { return arr.indexOf(e) === i; }
  );
}

function uniquePush (a, v) {
  if (a.indexOf(v) === -1) { a.push(v); return true; }
  return false;
}

function arrayClear (a) { a.length = 0; return a; }

function arrayRemove (a, v, all) {
  var found = (a.indexOf(v) !== -1);
  if (!all) {
    var pos = a.indexOf(v);
    if (pos !== -1) { a.splice(pos, 1); }
  } else {
    var pos = -1;
    while ( (pos = a.indexOf(v)) !== -1 ) { a.splice(pos, 1); }
  }
  return found;
}

function item (a, i) {
  var a2 = celestra.__toArray__(a);
  return a2[(i < 0 ? a2.length + i : i)];
}

function arrayMerge () {
  if (typeof arguments[0] === "boolean") {
    var t = arguments[1], d = arguments[0], s = 2;
  } else {
    var t = arguments[0], d = false, s = 1;
  }
  for(var i = s, il = arguments.length; i < il; i++) {
    if (Array.isArray(arguments[i])) {
      for(var j = 0, a = arguments[i], jl = a.length; j < jl; j++) {
        if (Array.isArray(a[j]) && d) {
          celestra.arrayMerge(true, t, a[j]);
        } else {
          t.push(a[j]);
        }
      }
    } else {
      t.push(arguments[i]);
    }
  }
  return t;
}

/* object header */

var celestra = {};

celestra.version = "Celestra v2.7.0";

celestra.noConflict = function noConflict () {
  window._ = celestra.__prevUnderscore__;
  return celestra;
};

/* Only for inner use. If needed can be replaced with the "Array.from();". */
celestra.__toArray__ = function __toArray__ (a) {
  return (Array.isArray(a) ? a : Array.from(a));
};

/* object content */

/* core api */
celestra.qsa = qsa;
celestra.qs = qs;
celestra.domReady = domReady;
celestra.random = random;
celestra.randomString = randomString;
celestra.b64Encode = b64Encode;
celestra.b64Decode = b64Decode;
celestra.javaHash = javaHash;
celestra.inherit = inherit;
celestra.importScript = importScript;
celestra.importScripts = importScripts;
celestra.importStyle = importStyle;
celestra.importStyles = importStyles;
celestra.getUrlVar = getUrlVar;
celestra.getUrlVarFromString = getUrlVarFromString;
celestra.obj2string = obj2string;
celestra.getType = getType;
celestra.extend = extend;
celestra.deepAssign = deepAssign;
celestra.getFullscreen = getFullscreen;
celestra.setFullscreenOn = setFullscreenOn;
celestra.setFullscreenOff = setFullscreenOff;
celestra.getLocation = getLocation;
celestra.getDoNotTrack = getDoNotTrack;
celestra.form2array = form2array;
celestra.form2string = form2string;
celestra.strRemoveTags = strRemoveTags;
celestra.strReverse = strReverse;
celestra.createFile = createFile;
celestra.forIn = forIn;
celestra.mapIn = mapIn;
celestra.toFunction = toFunction;
celestra.bind = bind;
celestra.hasOwn = hasOwn;
celestra.constant = constant;
celestra.identity = identity;
celestra.noop = noop;
celestra.T = T;
celestra.F = F;
/* DOM */
celestra.domCreate = domCreate;
celestra.domToElement = domToElement;
celestra.domGetCSS = domGetCSS;
celestra.domSetCSS = domSetCSS;
celestra.domFadeIn = domFadeIn;
celestra.domFadeOut = domFadeOut;
celestra.domFadeToggle = domFadeToggle;
celestra.domHide = domHide;
celestra.domShow = domShow;
celestra.domToggle = domToggle;
celestra.domOn = domOn;
celestra.domOff = domOff;
celestra.domTrigger = domTrigger;
celestra.domSiblings = domSiblings;
/* AJAX */
celestra.getJson = getJson;
celestra.getText = getText;
celestra.getAjax = getAjax;
celestra.postAjax = postAjax;
celestra.getCors = getCors;
celestra.postCors = postCors;
/* type checking */
celestra.isEqual = isEqual;
celestra.isString = isString;
celestra.isChar = isChar;
celestra.isNumber = isNumber;
celestra.isInteger = isInteger;
celestra.isFloat = isFloat;
celestra.isNumeric = isNumeric;
celestra.isBoolean = isBoolean;
celestra.isObject = isObject;
celestra.isEmptyObject = isEmptyObject;
celestra.isFunction = isFunction;
celestra.isArray = isArray;
celestra.isEmptyArray = isEmptyArray;
celestra.isArraylike = isArraylike;
celestra.isNull = isNull;
celestra.isUndefined = isUndefined;
celestra.isNullOrUndefined = isNullOrUndefined;
celestra.isNil = isNil;
celestra.isPrimitive = isPrimitive;
celestra.isSymbol = isSymbol;
celestra.isMap = isMap;
celestra.isSet = isSet;
celestra.isWeakMap = isWeakMap;
celestra.isWeakSet = isWeakSet;
celestra.isIterator = isIterator;
celestra.isDate = isDate;
celestra.isRegexp = isRegexp;
celestra.isElement = isElement;
celestra.isIterable = isIterable;
/* cookie */
celestra.setCookie = setCookie;
celestra.getCookie = getCookie;
celestra.hasCookie = hasCookie;
celestra.removeCookie = removeCookie;
/* collections */
celestra.forEach = forEach;
celestra.map = map;
celestra.arrayUnion = arrayUnion;
celestra.arrayIntersection = arrayIntersection;
celestra.arrayDifference = arrayDifference;
celestra.arraySymmetricDifference = arraySymmetricDifference;
celestra.setUnion = setUnion;
celestra.setIntersection = setIntersection;
celestra.setDifference = setDifference;
celestra.setSymmetricDifference = setSymmetricDifference;
celestra.arrayKeys = arrayKeys;
celestra.arrayValues = arrayValues;
celestra.arrayEntries = arrayEntries;
celestra.min = min;
celestra.minIndex = minIndex;
celestra.max = max;
celestra.maxIndex = maxIndex;
celestra.range = range;
celestra.toPairs = toPairs;
celestra.uniqueArray = uniqueArray;
celestra.uniquePush = uniquePush;
celestra.arrayClear = arrayClear;
celestra.arrayRemove = arrayRemove;
celestra.item = item;
celestra.arrayMerge = arrayMerge;

/* AMD loader */
if (typeof define === "function" && define.amd) {
  define(function () { return { celestra: celestra }; });
}

/* CommonJS loader */
if (typeof module !== "undefined" && typeof module.exports !== "undefined") {
  module.exports = celestra;
}

/* global scope */
if (typeof window !== "undefined") {
  window.celestra = celestra;
  celestra.__prevUnderscore__ = window._;
  window._ = celestra;
}

}(window, document));
