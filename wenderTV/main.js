App.onLaunch = function(options) {
  evaluateScripts(options.initialJSDependencies, function(success){
                  if (success) {
                  var resourceLoader = new ResourceLoaderJS(NativeResourceLoader.create());
                  var presenter = new Presenter(resourceLoader);
                  var dataController = new DataController(resourceLoader);
                  var eventHandler = new EventHandler(presenter, dataController);
                  
                  var videoData = dataController.retrieveData("identity.json", null);
                  presenter.present("video.tvml", videoData, "push", eventHandler);
                  } else {
                  var alert = createAlert("Evaluate Scripts Error", "There was an error attempting to evaluate the external JavaScript files.");
                  navigationDocument.presentModal(alert);
                  
                  throw ("Playback Example: unable to evaluate scripts.");
                  }
                  });
};

var createAlert = function(title, description) {
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
};