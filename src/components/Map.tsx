import React, { Component } from 'react';
import { Location } from '../store/locations/types';

type Props = {
  locations: Location[]
  mapCenter: Location
}

export default class Map extends Component<Props> {
  componentDidMount() {
    let map = new window.google.maps.Map(this.mapEle, {
      center: this.props.mapCenter,
      zoom: 16
    });
    this.props.locations.locations.forEach((markerData) => {
      let infoWindow = new window.google.maps.InfoWindow({
        content: `<h5>${markerData.name}</h5>`
      });

      let marker = new window.google.maps.Marker({
        position: markerData,
        map: map,
        title: markerData.name
      });

      marker.addListener('click', () => {
        infoWindow.open(map, marker);
      });
    });

    window.google.maps.event.addListenerOnce(map, 'idle', () => {
      this.mapEle.classList.add('show-map');
    });
  }
  render() {
    return (
      <div ref={(div) => this.mapEle = div} style={{height: '100%', width: '100%'}} id="map_canvas"></div>
    );
  }
}
