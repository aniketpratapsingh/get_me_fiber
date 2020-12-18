import React, { Component, createRef } from 'react'



export default class HomePage extends React.Component{
    constructor(){
      super()
      this.poly = null
    }
    googleMapRef = React.createRef()

    componentDidMount() {
      const googleScript = document.createElement('script')
      googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCVYVeAQYj9TSTCknm3dAUOWHwXf_T5cek&libraries=places`
      window.document.body.appendChild(googleScript)

      googleScript.addEventListener('load', this.fun)
    }
  
    fun = () =>{
      this.googleMap = this.createGoogleMap()
        this.marker = this.createMarker()
    }
    createGoogleMap = () =>
      new window.google.maps.Map(this.googleMapRef.current, {
        zoom: 16,
        center: {
          lat: 43.642567,
          lng: -79.387054,
        },
        disableDefaultUI: true,
      })
  
    createMarker = () =>{
        var triangleCoords = [
            new window.google.maps.LatLng(26.2, 84.4),
            new window.google.maps.LatLng(26.20348, 84.36306),
            new window.google.maps.LatLng(26.20626, 84.38226)
          ];
          // Styling & Controls
          var myPolygon = new window.google.maps.Polygon({
            paths: triangleCoords,
            draggable: true, // turn off if it gets annoying
            editable: true,
            strokeColor: '#FF3F3F',
            strokeOpacity: 0.8,
            strokeWeight: 2,
            fillColor: '#FF3F3F',
            fillOpacity: 0.35
          });
          var myLatLng = new window.google.maps.LatLng(26.2, 84.4);
          var mapOptions = {
            zoom: 12,
            center: myLatLng,
            mapTypeId: window.google.maps.MapTypeId.RoadMap
          };
          var map = new window.google.maps.Map(document.getElementById('google-map'),mapOptions);
          myPolygon.setMap(map);

          this.poly = myPolygon

          window.google.maps.event.addListener(myPolygon.getPath(), "insert_at", this.getPolygonCoords);
          //google.maps.event.addListener(myPolygon.getPath(), "remove_at", getPolygonCoords);
          window.google.maps.event.addListener(myPolygon.getPath(), "set_at", this.getPolygonCoords);
          
    //   new window.google.maps.Marker({
    //     position: { lat: 43.642567, lng: -79.387054 },
    //     map: this.googleMap,
    //   })
          
    }
    getPolygonCoords = () => {
        // console.log(window.myPolygon)
        var len = this.poly.getPath().getLength();
        var htmlStr = "";
        for (var i = 0; i < len; i++)
          htmlStr += "(" + this.poly.getPath().getAt(i).toUrlValue(5) + "), ";
        console.log(htmlStr)
      }
    render() {
      return (
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: 'auto', height: '500px' }}
        />
      )
    }
}