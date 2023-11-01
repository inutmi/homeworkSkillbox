function filter(array, prop, value) {
  console.log(array.filter(obj => obj[prop] === value));
  return array.filter(obj => obj[prop] === value);
}
export default filter;