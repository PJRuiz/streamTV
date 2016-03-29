

var resourceLoader;


App.onLaunch = function(options) {
  evaluateScripts(options.initialJSDependencies,
    function(success) {
      if (success) {
        resourceLoader = new ResourceLoaderJS(NativeResourceLoader.create());
        var initialDoc = loadInitialDocument(resourceLoader);
        initialDoc.addEventListener("select", _handleEvent);
        navigationDocument.pushDocument(initialDoc);
      } else {
        var alert = _createAlert("Evaluate Scripts Error", "Error attempting to evaluate the external JS files.");
        navigationDocument.presentModal(alert);

        throw("Playback Example: unable to evaluate scripts");
      }
    });
};


function loadInitialDocument(resourceLoader) {
  var data = resourceLoader.getJSON("identity.json");
  data["images"] = resourceLoader.convertNamesToURLs(data["images"]);
  data = resourceLoader.recursivelyConvertFieldsToURLs(data,"image");
  return resourceLoader.getDocument("video.tvml",data);
}

function _sharedImageResources(resourceLoader) {
  var sharedImageNames = {
    heads: "heads.png",
    face: "face.png",
    rock: "rock.png",
    background: "tv_background.png"
  };

  return resourceLoader.convertNamesToURLs(sharedImageNames);
}

function _createAlert(title, description) {  
  var alertString = `<?xml version="1.0" encoding="UTF-8" ?>
    <document>
      <alertTemplate>
        <title>${title}</title>
        <description>${description}</description>
      </alertTemplate>
    </document>`

  var parser = new DOMParser();
  var alertDoc = parser.parseFromString(alertString, "application/xml");
  return alertDoc
}

function _handleEvent(event) {
  var sender = event.target;
  var action = sender.getAttribute("action");

  switch(action) {
    case "showOverflow":
      var data = {
        text: sender.textContent,
        title: sender.getAttribute("title")
      };
      var expandedText = resourceLoader.getDocument("expandedDetailText.tvml", data);
      expandedText.addEventListener("select", _handleEvent);
      navigationDocument.presentModal(expandedText);
      break;

    case "dismiss":
      navigationDocument.dismissModal();
      break;
  }
}
