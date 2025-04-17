import React, { useEffect, useRef } from 'react';
import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonViewDidEnter,
} from '@ionic/react';
import { Location } from '../models/Location';
import { connect } from '../data/connect';
import { loadLocations } from '../data/locations/locations.actions';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// Fix for marker icons in Vercel
import 'leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css';
import 'leaflet-defaulticon-compatibility';
import './MapView.scss';

interface StateProps {
  locations: Location[];
}

interface DispatchProps {
  loadLocations: typeof loadLocations;
}

const MapView: React.FC<StateProps & DispatchProps> = ({
  locations,
  loadLocations,
}) => {
  const mapCanvas = useRef<HTMLDivElement>(null);
  const map = useRef<L.Map | null>(null);
  const markers = useRef<L.Marker[]>([]);

  // Add useEffect to load locations when component mounts
  useEffect(() => {
    loadLocations();
  }, []);

  const initMap = () => {
    if (!locations?.length || !mapCanvas.current || map.current) return;

    map.current = L.map(mapCanvas.current, {
      zoomControl: true,
      attributionControl: true,
    });

    // Get the center location (first item marked as center, or first item if none marked)
    const centerLocation = locations.find((loc) => loc.center) || locations[0];
    map.current.setView([centerLocation.lat, centerLocation.lng], 16);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(map.current);

    // Add markers for all locations
    locations.forEach((location: Location) => {
      const marker = L.marker([location.lat, location.lng])
        .addTo(map.current!)
        .bindPopup(`${location.name}`);
      markers.current.push(marker);
    });

    // Show map
    mapCanvas.current.classList.add('show-map');
  };

  const resizeMap = () => {
    if (map.current) {
      map.current.invalidateSize();
    }
  };

  // Initialize map
  useEffect(() => {
    initMap();
    return () => {
      if (map.current) {
        markers.current.forEach((marker) => marker.remove());
        map.current.remove();
        map.current = null;
      }
    };
  }, [locations]);

  // Handle resize after content is visible
  useEffect(() => {
    const timer = setTimeout(() => {
      resizeMap();
    }, 300);

    return () => clearTimeout(timer);
  }, []);

  useIonViewDidEnter(() => {
    resizeMap();
  });

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Map</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div ref={mapCanvas} className="map-canvas"></div>
      </IonContent>
    </IonPage>
  );
};

export default connect<{}, StateProps, DispatchProps>({
  mapStateToProps: (state) => ({
    locations: state.locations.locations,
  }),
  mapDispatchToProps: {
    loadLocations,
  },
  component: MapView,
});
