class Presenter {
  
  constructor(resourceLoader) {
    this._resourceLoader = resourceLoader;
  }
  
  present(template, data, presentation, eventHandler, sender) {
    if (presentation === 'dismiss') {
      navigationDocument.dismissModal();
      return;
    }
    
    var enhancedData = this._enchancedDataForTemplate(data, template);
    var doc = this._resourceLoader.getDocument(template, enhancedData);
    
    if(eventHandler) {
      doc.addEventListener("select", eventHandler.handleEvent);
    }
    
    switch (presentation) {
      case 'modal':
        navigationDocument.presentModal(doc);
        break;
      case 'push':
        navigationDocument.pushDocument(doc);
        break;
    }
    
  }
  
  
  
  
  
  _enchancedDataForTemplate(data, template) {
    var enhancedData = Object.assign({}, data);
    
    enhancedData.sharedImages = this._sharedImageResources();
    enhancedData = this._resourceLoader.recursivelyConvertFieldsToURLs(enhancedData, "image");
    
    if(template === 'video.tvml') {
      enhancedData["images"] = this._convertURLValuesInObject(data["images"]);
    }
    
    return enhancedData;
  }
  
  _sharedImageResources() {
    var sharedImageNames = {
    heads: "heads.png",
    face: "face.png",
    rock: "rock.png",
    background: "tv_background.png"
    };
    
    return this._convertURLValuesInObject(sharedImageNames);
  }
  
  _convertURLValuesInObject(object) {
    return this._resourceLoader.convertNamesToURLs(object);
  }
  
}