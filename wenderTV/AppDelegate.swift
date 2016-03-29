
import UIKit
import TVMLKit

@UIApplicationMain
class AppDelegate: UIResponder, UIApplicationDelegate {
  
  var window: UIWindow?
  var appController: TVApplicationController?
  
  func application(application: UIApplication, didFinishLaunchingWithOptions launchOptions: [NSObject: AnyObject]?) -> Bool {
    window = UIWindow(frame: UIScreen.mainScreen().bounds)
    
    let appControllerContext = TVApplicationControllerContext()
    appControllerContext.launchOptions = [
      "initialJSDependencies" : initialJSDependencies()
    ]
    
    let javascriptURL = NSBundle.mainBundle().URLForResource("main",
                                                             withExtension: "js")
    appControllerContext.javaScriptApplicationURL = javascriptURL!
    
    appController = TVApplicationController(
      context: appControllerContext, window: window,
      delegate: self)
    
    return true
  }
}

extension AppDelegate {
  private func initialJSDependencies() -> [String] {
    return [
      "mustache.min",
      "ResourceLoader",
      "DataController",
      "Presenter",
      "EventHandler"
      ].flatMap {
        let url = NSBundle.mainBundle().URLForResource($0, withExtension: "js")
        return url?.absoluteString
    }
  }
}


extension AppDelegate : TVApplicationControllerDelegate {
  func appController(appController: TVApplicationController,
                     evaluateAppJavaScriptInContext jsContext: JSContext) {
    
    jsContext.setObject(ResourceLoader.self,
                        forKeyedSubscript: "NativeResourceLoader")
  }
}

