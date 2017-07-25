import React, { Component } from 'react';
import * as data from '../data.json';

export default class Map extends Component {
  componentDidMount() {
    const mapData = data.map;
    let map = new window.google.maps.Map(this.mapEle, {
      center: mapData.find((d) => d.center),
      zoom: 16
    });

    mapData.forEach((markerData) => {
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
      <ion-page>
        <ion-header>
          <ion-navbar>
            <ion-button menuToggle>
              <ion-icon name="menu"></ion-icon>
            </ion-button>
            <ion-title>Map</ion-title>
          </ion-navbar>
        </ion-header>

        <ion-content class="map-page">
          <div ref={(div) => this.mapEle = div} style={{height: '100%', width: '100%'}} id="map_canvas"></div>
        </ion-content>
      </ion-page>
    );
  }
}
