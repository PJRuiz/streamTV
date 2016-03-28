

import JavaScriptCore

@objc protocol ResourceLoaderExport : JSExport {
  static func create() -> ResourceLoaderExport
  func loadBundleResource(name: String) -> String
  func urlForResource(name: String) -> String
}

@objc class ResourceLoader: NSObject, ResourceLoaderExport {
  
  static func create() -> ResourceLoaderExport {
    return ResourceLoader()
  }
  
  func loadBundleResource(name: String) -> String {
    let path = NSBundle.mainBundle().pathForResource(name, ofType: nil)
    do {
      return try String(contentsOfFile: path!,
        encoding: NSUTF8StringEncoding)
    } catch {
      print("There was a problem")
      return ""
    }
  }
  
  func urlForResource(name: String) -> String {
    return NSBundle.mainBundle().URLForResource(name, withExtension: nil)!.absoluteString
  }
}
