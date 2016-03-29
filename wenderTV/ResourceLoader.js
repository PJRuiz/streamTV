


class ResourceLoaderJS {
  constructor(nativeResourceLoader) {
    this.nativeResourceLoader = nativeResourceLoader;
    this.domParser = new DOMParser();
  }
  
  getDocument(name, data) {
    data = data || {};
    var docString = this.nativeResourceLoader.loadBundleResource(name);
    var rendered = Mustache.render(docString, data);
    return this.domParser.parseFromString(rendered, "application/xml");
  }


  
  urlForResource(name) {
    return this.nativeResourceLoader.urlForResource(name);
  }

  recursivelyConvertFieldsToURLs(data, key) {
    var dataCopy = Object.assign({}, data);
    var urlForResource = this.urlForResource.bind(this);
    recursiveApplyOnKey(dataCopy, key, function(value) {
      if (typeof(value) === 'string') {
        console.log(value);
        return urlForResource(value);
      } else {
        return value;
      }
    });
    return dataCopy;
  }
  
  convertNamesToURLs(data) {
    var convertedData = {};
    for (var prop in data) {
      convertedData[prop] = this.urlForResource(data[prop]);
    }
    return convertedData;
  }

  getJSON(name) {
    var jsonString = this.nativeResourceLoader.loadBundleResource(name);
    var json = JSON.parse(jsonString);
    return json;
  }
  
}

function recursiveApplyOnKey(obj, key, callback) {
  if (obj.hasOwnProperty(key)) {
    obj[key] = callback(obj[key]);
  }
  for(var p in obj) {
    if(typeof(obj[p]) === "object") {
      recursiveApplyOnKey(obj[p], key, callback);
    }
  }

}
