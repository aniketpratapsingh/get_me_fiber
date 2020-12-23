import React, { Component, createRef } from 'react'

export default class HomePage extends React.Component{
    constructor(){
      super()
      this.state = {user_name: '', coordinates_list:'', browser_latitude:'', browser_longitude:''};
      this.handleChange = this.handleChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      // this.getLocation = this.getLocation.bind(this);
      this.poly = null
      // this.getLocation = this.getLocation()
    }

    handleChange(event) {
      this.setState({user_name: event.target.value});
    }
    
    getLocation= () =>{
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition((position) => {
          // console.log(position)
          this.setState({ browser_latitude: position.coords.latitude, browser_longitude: position.coords.longitude }, this.fun)
          // console.log(this.state)
        });
      } else {
        console.log("Geolocation is not supported by this browser.")
      }
    }
    // showPosition(position) {
    //   console.log(position)
    //   this.setState({ browser_latitude: position.coords.latitude, browser_longitude: position.coords.longitude })
    //   console.log(this.state)
    // }

    handleSubmit(event) {
      // alert('A name was submitted: ' + this.state.user_name);
      console.log(this.state.coordinates_list)
      const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ "name" : this.state.user_name, "coordinates": this.state.coordinates_list })
    };
    fetch('http://localhost:5000/isp', requestOptions)
    .then(response => response.json())
    .then(data => console.log(data));
      event.preventDefault();
    }
    googleMapRef = React.createRef()
    
    componentDidMount() {
      // position= this.getLocation()
      // this.setState({ browser_latitude: position.coords.latitude, browser_longitude: position.coords.longitude }, )
      const googleScript = document.createElement('script')
      googleScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCVYVeAQYj9TSTCknm3dAUOWHwXf_T5cek&libraries=places`
      window.document.body.appendChild(googleScript)
      googleScript.addEventListener('load', this.getLocation)
    }

    
    fun = () =>{
        this.googleMap = this.createGoogleMap()
        this.marker = this.createMarker()
    }
    createGoogleMap = () =>{
      console.log(this.state)
      new window.google.maps.Map(this.googleMapRef.current, {
        zoom: 30,
        center: {
          lat: this.state.browser_latitude, 
          lng: this.state.browser_longitude,
        },
        disableDefaultUI: true,
      })
    }
    createMarker = () =>{
      
        var triangleCoords = [
            new window.google.maps.LatLng(this.state.browser_latitude + 0.0002, this.state.browser_longitude + 0.0002),
            new window.google.maps.LatLng(this.state.browser_latitude - 0.0002, this.state.browser_longitude + 0.0002),
            new window.google.maps.LatLng(this.state.browser_latitude - 0.0002, this.state.browser_longitude - 0.0002)
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
          var myLatLng = new window.google.maps.LatLng(this.state.browser_latitude, this.state.browser_longitude);
          var mapOptions = {
            zoom: 18,
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
        var coordinates=[]
        var current_coordinates=null
        for (var i = 0; i < len; i++){
          // htmlStr +=  this.poly.getPath().getAt(i) + ", ";
          // console.log(Number(this.poly.getPath().getAt(i).toUrlValue(5).split(",")[0]))
          current_coordinates=this.poly.getPath().getAt(i).toUrlValue(5).split(",")
          coordinates.push({
            "lat": Number(current_coordinates[0]),
            "lng": Number(current_coordinates[0])
        })}
        this.setState({coordinates_list : coordinates})
        console.log(coordinates)

      }
    render() {
      return (
        <div>
        <div
          id="google-map"
          ref={this.googleMapRef}
          style={{ width: 'auto', height: '500px' }}
        />
        <form onSubmit={this.handleSubmit}>
          <label>
            Name:
            <input type="text" value={this.state.user_name} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        </div>
      )
    }
}