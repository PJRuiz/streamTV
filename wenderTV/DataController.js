class DataController {
  constructor(resourceLoader) {
    this._resourceLoader = resourceLoader;
  }
  
  retrieveData(data, action) {
    if (data) {
      try {
        var decodedData = JSON.parse(data);
        return decodedData;
      } catch(error) {
        // Wasn't sent a JSON string. Try to load the file instead.
        return this._loadDataFromFile(data);
      }
    }
    return null;
  }
  
  _loadDataFromFile(fileName) {
    return this._resourceLoader.getJSON(fileName);
  }
  
}
