import Foundation
import MapboxNavigationCore
import MapboxNavigationUIKit
import UIKit
import CoreLocation

@objc(TbtNavigation)
class TbtNavigation: NSObject {
  
  class CampNaviViewController: UIViewController {
    
    // Define the Mapbox Navigation entry point.
    let mapboxNavigationProvider = MapboxNavigationProvider(coreConfig: .init())
    lazy var mapboxNavigation = mapboxNavigationProvider.mapboxNavigation
    
    
    override func viewDidLoad() {
      super.viewDidLoad()
      
      // Setup mapboxNavigation and mapboxNavigationProvider here
      let origin = Waypoint(coordinate: CLLocationCoordinate2D(latitude: 38.9131752, longitude: -77.0324047), name: "Mapbox")
      let destination = Waypoint(coordinate: CLLocationCoordinate2D(latitude: 38.8977, longitude: -77.0365), name: "White House")
      // Request a route using RoutingProvider
      let options = NavigationRouteOptions(waypoints: [
     origin, destination
      ])
      
      let request = mapboxNavigation.routingProvider().calculateRoutes(options: options)
      Task {
        switch await request.result {
        case .failure(let error):
          print(error.localizedDescription)
        case .success(let navigationRoutes):
          // Pass the generated navigation routes to the NavigationViewController
          let navigationOptions = NavigationOptions(mapboxNavigation: mapboxNavigation,
                                                    voiceController: mapboxNavigationProvider.routeVoiceController,
                                                    eventsManager: mapboxNavigationProvider.eventsManager())
          
          let navigationViewController = NavigationViewController(navigationRoutes: navigationRoutes, navigationOptions: navigationOptions)
          navigationViewController.modalPresentationStyle = .fullScreen

          self.present(navigationViewController, animated: true, completion: nil)
        }
      }
    }
  }
}
