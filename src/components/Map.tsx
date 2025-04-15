import React, { useRef, useEffect } from 'react';
import { Location } from '../models/Location';

interface MapProps {
  locations: Location[];
  mapCenter: Location;
}

const Map: React.FC<MapProps> = ({ mapCenter, locations }) => {
  const mapEle = useRef<HTMLDivElement>(null);
  const map = useRef<google.maps.Map>(null);

  useEffect(() => {
    if (!mapEle.current) {
      return;
    }

    map.current = new google.maps.Map(mapEle.current, {
      center: {
        lat: mapCenter.lat,
        lng: mapCenter.lng,
      },
      zoom: 16,
    });

    addMarkers();

    google.maps.event.addListenerOnce(map.current, 'idle', () => {
      if (mapEle.current) {
        mapEle.current.classList.add('show-map');
      }
    });

    function addMarkers() {
      locations.forEach((markerData) => {
        const infoWindow = new google.maps.InfoWindow({
          content: `<h5>${markerData.name}</h5>`,
        });

        const position = new google.maps.LatLng(markerData.lat, markerData.lng);
        const markerView = new google.maps.marker.AdvancedMarkerElement({
          map: map.current!,
          position,
          title: markerData.name,
        });

        markerView.addListener('gmp-click', () => {
          infoWindow.open(map.current!, markerView);
        });
      });
    }
  }, [mapCenter, locations]);

  return <div ref={mapEle} className="map-canvas"></div>;
};

export default Map;
