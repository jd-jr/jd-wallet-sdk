export default {
  parseJSON (str) {
    let json = null;
    try {
      json = JSON.parse(str);
    } catch (e) {
      console.error(e.message);
    }
    return json;
  },

  stringifyJSON (json) {
    let str = null;
    try {
      str = JSON.stringify(json);
    } catch (e) {
      console.error(e.message);
    }
    return str;
  }
};
