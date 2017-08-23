/**
 * Convert Array to Object
 *
 * @param  {Array}  a Array to convert
 * @return {Object}   Converted array
 */
const arrayToObject = a => a.reduce((o, v) => Object.assign({}, o, v), {})

export default arrayToObject
