let win = window;
//事件 id
let uuid = 1;

export default (callback) => {
  const funcName = `globalCallback${this.uuid++}`;
  win[funcName] = (...args) => {
    if (callback) {
      callback(...args);
    }
    setTimeout(() => {
      delete win[funcName];
    }, 100);
  };
  return funcName;
};