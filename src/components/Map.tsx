import React, { Component } from 'react';
import { Location } from '../store/locations/types';

type Props = {
  locations: Location[]
  mapCenter: Location
}

export default class Map extends Component<Props> {
  mapEle: React.RefObject<HTMLDivElement>;
  map?: google.maps.Map;

  constructor(props: Props) {
    super(props);
    this.mapEle = React.createRef();
  }

  componentDidMount() {
    this.map = new google.maps.Map(this.mapEle.current, {
      center: {
        lat: this.props.mapCenter.lat,
        lng: this.props.mapCenter.lng
      },
      zoom: 16
    });

    this.addMarkers();

    google.maps.event.addListenerOnce(this.map, 'idle', () => {
      if (this.mapEle.current) {
        this.mapEle.current.classList.add('show-map');
      }
    });
  }

  componentDidUpdate(prevProps: Props) {
    if (prevProps.locations.length === 0) {
      this.addMarkers();
    }
  }

  addMarkers() {
    this.props.locations.forEach((markerData) => {
      let infoWindow = new google.maps.InfoWindow({
        content: `<h5>${markerData.name}</h5>`
      });

      let marker = new google.maps.Marker({
        position: new google.maps.LatLng(markerData.lat, markerData.lng),
        map: this.map,
        title: markerData.name
      });

      marker.addListener('click', () => {
        infoWindow.open(this.map, marker);
      });
    });
  }

  render() {
    return (
      <div ref={this.mapEle} style={{height: '100%', width: '100%'}} id="map_canvas"></div>
    );
  }
}
