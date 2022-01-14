import { Location } from '../models/Location';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import  Overlay from 'ol/Overlay';
import { useEffect, useRef, createRef } from 'react';
import OverlayPositioning from 'ol/OverlayPositioning';
import "ol/ol.css";
interface MapProps {
  locations: Location[]
  mapCenter: Location
}
//     function addMarkers() {
//       locations.forEach((markerData) => {
//         let infoWindow = new google.maps.InfoWindow({
//           content: `<h5>${markerData.name}</h5>`
//         });
//
//         let marker = new google.maps.Marker({
//           position: new google.maps.LatLng(markerData.lat, markerData.lng),
//           map: map.current!,
//           title: markerData.name
//         });
//
//         marker.addListener('click', () => {
//           infoWindow.open(map.current!, marker);
//         });
//       });
//     }


export function MapWrapper({ mapCenter, locations }: MapProps) {
  const mapContainerRef: React.RefObject<HTMLDivElement> = createRef();
  const markerRef: React.RefObject<HTMLImageElement> = createRef();
  const markerOverlay = useRef<Overlay>()
  const mapInst = useRef<Map>();

  useEffect(() => {
    const tileLayer = new TileLayer({
      source: new OSM(),
    });

    // create map
    mapInst.current = new Map({
      target: mapContainerRef.current as HTMLDivElement,
      layers: [tileLayer],
      view: new View({
        center: fromLonLat([mapCenter.lng, mapCenter.lat]),
        zoom: 17,
      }),
      controls: [],
    });

    markerOverlay.current = new Overlay({
      positioning: OverlayPositioning.CENTER_CENTER,
      element: (markerRef.current as HTMLImageElement),
      stopEvent: false,
    });
    mapInst.current.addOverlay(markerOverlay.current);
  }, []);

  useEffect(() => {
    markerOverlay.current?.setPosition(fromLonLat([mapCenter.lng, mapCenter.lat]))
  }, [mapCenter]);

  return (
    <>
      <div ref={mapContainerRef} style={{ width: '100%', height: '100%' }} />
      <img
        ref={markerRef}
        src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABYAAAAWCAYAAADEtGw7AAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAABYgAAAWIBXyfQUwAAABl0RVh0U29mdHdhcmUAd3d3Lmlua3NjYXBlLm9yZ5vuPBoAAAK6SURBVDiNtdXPa9NwGMfxd9KsWxhJHWx1C1h/DIa7OCaiiDt68CB4KELn8KB3ETz5D0TUQ4+exB12WEF6GHgZjIEBKaiXiTBBh1hph50wm2izLW0eD34zdhE7oQ98IAk8r3zzDTxfTUTQNE0DkqRU+gBDJQXo/KkY6ABtlUjddwABRETkIKgrIK0yAPSrGLOzsyMAi4uLWwrcVdkB9lQ66sWCAg0FZYBR4JTjONOVSqVYq9W8VqvVEFWtVqtRq9W8SqVSdBxnGjilejLKMJKvS6lVZYAxYMJ13RvNZvOTHKhW1JFW1Dn4SJrN5ifXdW8AE6o3o6wU6rMt9dYJz/MexXEciYjU/D25s/xFzj59L8aDN2I8eCNnn76XO8tfpObviYhIHMeR53mPFD6qrHSy2gHAcl33/Nzc3GNN04z5te9ce/4Rrxqw+TMiFogFNn9GvK7/4tnaFkcH+5geHdRzudyFdDr9enV19Zva/1gDbMByHCe7vr7+3Lbt8fm179x+8Zlu6tnVk9yaGsb3/Y3Jycnr9Xq9AQTJj+svl8s3bdserwcR91aqXaEA91aq1IMI27bHy+XyTbUDxj6cy+XOATysbPJjp9M1/GOnw8PKJgDK2IdTgDE0NHQa4NXXoGs0qaRHGQaQ0gGtUChkTdMcCdsx7xrhoeF3jZCwHWOa5kihUMgCmv7Prv8sHZBSqdQIw3DLNHTOZM1DI2eyJqahE4bhVqlUagCiowbK9vb2B4BLx6xDw0mPMtpAR1cXu9Vq9S3A/YtjHBlIdY0eGUhx/+IYAMrYBdr7cD6fX/B9f8Ox+iheznUNFy/ncKw+fN/fyOfzCwmczF4tCAIsy/o4MzNzbXp0UD+e6edlNWCnLX9d6ZMrJ7g1NYyItIvF4t2lpaUN4Bd/RmhvhhD0cGz2ZND37GjSenWY/ga+vttOWmiJZgAAAABJRU5ErkJggg=="
        alt=""
      />
    </>
  );
}
export default MapWrapper;
