class EventHandler {
  constructor(presenter, dataController) {
    this._presenter = presenter;
    this._dataController = dataController;
    this.handleEvent = this.handleEvent.bind(this);
  }
  
  handleEvent(event) {
    var element = event.target;
    var template = element.getAttribute("template"),
    presentation = element.getAttribute("presentation"),
    data = element.getAttribute("data"),
    action = element.getAttribute("action");
    
    var retrievedData = this._dataController.retrieveData(data, action);
    
    if(presentation) {
      this._presenter.present(template, retrievedData, presentation, this, element);
    }
  }
}