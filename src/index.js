import React from "react";
import ReactDOM from "react-dom";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import TimeBox from "./components/TimeBox/timeBox";

mapboxgl.accessToken =
  "pk.eyJ1IjoicHJhdHRpaXl5a2siLCJhIjoiY2thYXBlMm1hMG1mZDJ3cDdrODEyZm10diJ9.0rw0hkoQjICtoYAebNAnjg";

class Application extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      longitude: 72.8686296,
      latitude: 19.2098064,
      zoom: 10,
    };
  }

  componentDidMount() {
    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: "mapbox://styles/mapbox/streets-v11",
      center: [this.state.longitude, this.state.latitude],
      zoom: this.state.zoom,
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    map.addControl(new mapboxgl.NavigationControl());

    map.on("move", () => {
      this.setState({
        longitude: map.getCenter().lng.toFixed(4),
        latitude: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2),
      });
    });
  }

  render() {
    const { longitude, latitude } = this.state;
    return (
      <React.Fragment>
        <TimeBox longitude={longitude} latitude={latitude}></TimeBox>
        <div ref={(el) => (this.mapContainer = el)} className="mapContainer" />
      </React.Fragment>
    );
  }
}

ReactDOM.render(<Application />, document.getElementById("app"));
