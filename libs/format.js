let Config = {
  indentStr: '  ',
  lineBreak: '\n',
  normalTypes: ['string', 'number', 'boolean']
};
const _isObject = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
const _isArray = (obj) => {
  return Object.prototype.toString.call(obj) === '[object Array]'
}
/**
 * 解析左大括号
 * @returns {string}
 * @private
 */
const _getRenderLeftBrackets = () => {
  return `{`;
}
/**
 * 获取渲染的右大括号
 * @returns {string}
 * @private
 */
const _getRenderRightBrackets = () => {
  return `}`;
}
/**
 * 获取渲染的左中括号
 * @returns {string}
 * @private
 */
const _getRenderLeftSquareBrackets = () => {
  return `[`;
}
/**
 * 获取渲染的右中括号
 * @returns {string}
 * @private
 */
const _getRenderRighSquareBrackets = () => {
  return `]`;
}

/**
 * 获取渲染的对象key
 * @param key
 * @returns {string}
 * @private
 */
function _getRenderKey(key) {
  return `${key}`;
}

/**
 * 获取渲染的对象value
 * @param val
 * @returns {string}
 * @private
 */
const _getRenderValue = (val) => {
  if (typeof val === 'string') {
    val = _html2Escape(val);
    val = `"${val}"`
  } else {
    val = `${val}`;
  }
  return val;
}
/**
 * 富文本转义
 * @param val 待转义字符串
 * @returns {*}
 * @private
 */
const _html2Escape = (val) => {
  return val.replace(/[<>&"]/g, function (c) {
    return {'<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;'}[c];
  });
}
/**
 * 是否为基本类型数组
 * @param arr 数组
 * @returns {boolean}
 * @private
 */
const _isBaseTypeArr = (arr) => {
  let baseType = true;
  for (const item of arr) {
    if (typeof item === 'object') {
      baseType = false;
      break;
    }
  }
  return baseType;
}
/**
 * 是否为对象数组
 * @param arr 数组
 * @returns {boolean}
 * @private
 */
const _isObjectArr = (arr) => {
  let isObjectType = true;
  for (const item of arr) {
    if (Config.normalTypes.includes(typeof item) || item instanceof Array || !item instanceof Object) {
      isObjectType = false;
      break;
    }
  }
  return isObjectType;
}

/**
 * 格式化数组
 * @param arr 数组
 * @param currentStr 已经拼接的字符串
 * @param indent 缩进
 * @returns {string|*|string}
 * @private
 */
const _formatArr = (arr, currentStr, indent) => {
  if (!arr.length) {
    return currentStr += _getRenderLeftSquareBrackets() + _getRenderRighSquareBrackets();
  }
  currentStr += `${_getRenderLeftSquareBrackets()}`;
  // 判断数组是否为基本类型数组
  if (_isBaseTypeArr(arr)) {
    for (let i = 0; i < arr.length; i++) {
      currentStr += `${Config.lineBreak}${indent + Config.indentStr}` + _getRenderValue(arr[i]) + `${i !== arr.length - 1 ? ',' : ''}`;
    }
  } else if (_isObjectArr(arr)) {// 判断是否都为对象的数组
    for (let i = 0; i < arr.length; i++) {
      currentStr += `${i === 0 ? '' : ','}${Config.lineBreak}${indent}${Config.indentStr}`
      currentStr = _format(arr[i], currentStr, indent + Config.indentStr);
    }
  } else {
    // 大杂烩
    for (let i = 0; i < arr.length; i++) {
      currentStr += `${Config.lineBreak}${indent + Config.indentStr}`;
      if (Config.normalTypes.includes(typeof arr[i])) {
        currentStr += _getRenderValue(arr[i]);
      } else if (_isArray(arr[i])) { // 还是个数组
        currentStr = _formatArr(arr[i], currentStr, indent + Config.indentStr);
      } else {
        currentStr = _format(arr[i], currentStr, indent + Config.indentStr);
      }
      currentStr += `${i !== arr.length - 1 ? ',' : ''}`
    }
  }
  currentStr += `${Config.lineBreak}${indent}${_getRenderRighSquareBrackets()}`;
  return currentStr;
}
/**
 * 格式化对象
 * @param jsonObj js对象
 * @param currentStr 当前已经拼接的字符串
 * @param indent 缩进
 * @returns {string|*|string}
 * @private
 */
const _format = (jsonObj, currentStr, indent) => {
  let keys = [];
  try {
    keys = Reflect.ownKeys(jsonObj);
  } catch (e) {
    // jsonObj === null
    return currentStr += jsonObj;
  }
  if (!keys.length) {
    return currentStr += _getRenderLeftBrackets() + _getRenderRightBrackets();
  }
  currentStr += `${_getRenderLeftBrackets()}`;
  for (let i = 0; i < keys.length; i++) {
    // 普通类型
    currentStr += `${i === 0 ? '' : ','}${Config.lineBreak}${Config.indentStr}${indent}${_getRenderKey(keys[i])}: `;
    if (Config.normalTypes.includes(typeof jsonObj[keys[i]])) {
      currentStr += `${_getRenderValue(jsonObj[keys[i]])}`
    } else if (_isArray(jsonObj[keys[i]])) { // 数组
      currentStr = _formatArr(jsonObj[keys[i]], currentStr, indent + Config.indentStr);
    } else {
      currentStr = _format(jsonObj[keys[i]], currentStr, indent + Config.indentStr);
    }
  }
  currentStr += `${Config.lineBreak}${indent}${_getRenderRightBrackets()}`;
  return currentStr;
}
/**
 * 格式化json字符串
 * @param jsonStr json字符串
 * @param options {object}
 *{
 *                 indentStr: '  ', // 缩进 默认两个空格
 *                 lineBreak:'\n' //  换行符 默认\n
 * }
 * @returns {string} 格式化结果
 */
const format = (jsonStr, options = {}) => {
  Config = Object.assign(Config, options)
  let result = '';
  try {
    const json = typeof jsonStr === 'string' ? JSON.parse(jsonStr) : jsonStr;
    debugger
    if (_isObject(json)) {
      result = _format(json, result, '');
    } else {
      result = _formatArr(json, result, '');
    }
  } catch (e) {
    console.log(e);
    result = e.message;
  }
  return result;
}

module.exports = format;
