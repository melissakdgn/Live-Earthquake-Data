import { Component, OnInit } from '@angular/core';
import {Feature, Map, Overlay} from "ol";
import View from "ol/View";
import {fromLonLat} from 'ol/proj';
import {NewsRss} from "../news-rss";
import {Point} from "ol/geom";
import TileLayer from "ol/layer/Tile";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import {Icon, Style} from "ol/style";
import {TileJSON} from "ol/source";

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  NewRssData?: NewsRss;

  constructor() {}

  ngOnInit(): void {
    this.SetData();
    this.initilizeMap();
  }

  SetData() {
    // @ts-ignore
    this.NewRssData = JSON.parse(localStorage.getItem('RssData'));
  }

  initilizeMap() {

   const places: number[] = [];
   const content = document.getElementById('popup-content');
   const closer = document.getElementById('popup-closer');
   const popupContainer = document.getElementById('popup');

    // @ts-ignore
    for(let o of this.NewRssData?.rss?.channel?.[0]?.item) {
      // @ts-ignore
      places.push([parseFloat(o["geo:lat"].toString() ?? '0'), parseFloat(o["geo:long"].toString() ?? '0')]);
    }

    const vectorSource = new VectorSource();

    const vectorLayer = new VectorLayer({
      source: vectorSource
    });

    const rasterLayer = new TileLayer({
      source: new TileJSON({
        url: 'https://a.tiles.mapbox.com/v3/aj.1x1-degrees.json?secure=1',
        crossOrigin: ''
      })
    });

    const map = new Map({
      target: 'map',
      layers: [rasterLayer, vectorLayer],
      view: new View({
        projection: 'EPSG:4326',
        center: fromLonLat([0, 0]),
        zoom: 4
      })
    });

    for(let i = 0; i < places.length; i++) {
      const iconFeature = new Feature({
        // @ts-ignore
        geometry: new Point([places[i][1], places[i][0]],'EPSG:4326'),
        name: 'marker'
      });

      iconFeature.setStyle(new Style({
        image: new Icon({
          src: '../assets/photo.png',
          scale: 0.1
        })
      }));

      vectorSource.addFeature(iconFeature);
    }

    const popup = new Overlay({
      // @ts-ignore
      element: popupContainer,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      },
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -20]
    });

    // @ts-ignore
    map.addOverlay(popup);

    // @ts-ignore
    closer.onclick = function () {
      popup.setPosition(undefined);
      return false;
    };

    map.on("click", function (evt) {
      let clickedFeature = map.forEachFeatureAtPixel(evt.pixel, function (clickedFeature) {
        return clickedFeature;
      });

      if(clickedFeature){

        let tempPoint = clickedFeature.getGeometry();

        //@ts-ignore
        content.innerHTML = '<h2>' + '(' + tempPoint.getCoordinates() + ')' + '</h2>';

        // @ts-ignore
        popup.setPosition(tempPoint.getCoordinates());

      } else {

        popup.setPosition(undefined);
      }
    });
  }
}

