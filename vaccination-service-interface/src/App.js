import React from "react";
import * as vaccinationCenter from "./data/centres-vaccination.json";
import Request from "./componentsWS/Appointment"
import {BrowserRouter as Router, Route} from "react-router-dom"

import {
  GoogleMap,
  useLoadScript,
  Marker,
  InfoWindow,
} from "@react-google-maps/api";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { formatRelative } from "date-fns";

import "@reach/combobox/styles.css";
import mapStyles from "./mapStyles";

const libraries = ["places"];
const mapContainerStyle = {
  height: "100vh",
  width: "100vw",
};
const options = {
  styles: mapStyles,
  disableDefaultUI: true,
  zoomControl: true,
};
const center = {
  lat: 48.866667,
  lng: 2.333333,
};


export default function App() {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY ,
    libraries,
  });
  const [markers, setMarkers] = React.useState([]);
  const [selected, setSelected] = React.useState(null);

  const mapRef = React.useRef();
  const onMapLoad = React.useCallback((map) => {
    mapRef.current = map;
  }, []);

  const panTo = React.useCallback(({ lat, lng }) => {
    mapRef.current.panTo({ lat, lng });
    mapRef.current.setZoom(12);
  }, []);

  if (loadError) return "Error";
  if (!isLoaded) return "Loading...";

  return (
    <Router>
    <Route path='/' exact render={(props) => (
    <>
    <div>
      <h1>
        I want my dose{" "}
        <span role="img" aria-label="tent">
          💉
        </span>
      </h1>
      <a className='btn-req' href='/request'>You need some help? We call you!</a>

      <Locate panTo={panTo} />
      <Search panTo={panTo} />

      <GoogleMap
        id="map"
        mapContainerStyle={mapContainerStyle}
        zoom={13.5}
        center={center}
        options={options}
        // onClick={onMapClick}
        onLoad={onMapLoad}
      >
        {vaccinationCenter.features.map(center => (
        <Marker
          key={center.properties.gid}
          position={{
            lat: center.properties.c_lat_coor1,
            lng: center.properties.c_long_coor1,
          }}
          onClick={() => {
            setSelected(center);
          }}
          icon={{
            url: `/vaccine.svg`,
            origin: new window.google.maps.Point(0, 0),
            anchor: new window.google.maps.Point(15, 15),
            scaledSize: new window.google.maps.Size(30, 30),
          }}
        />
      ))}

        {selected ? (
          <InfoWindow
            position={{ 
              lat: selected.properties.c_lat_coor1, 
              lng: selected.properties.c_long_coor1 }}
            onCloseClick={() => {
              setSelected(null);
            }}
          >
            <div>
              <h2>{selected.properties.c_nom}</h2>
              <p>Lundi :{selected.properties.c_rdv_lundi}</p>
              <p>Mardi : {selected.properties.c_rdv_mardi}</p>
              <p>Mercredi : {selected.properties.c_rdv_mercredi}</p>
              <p>Jeudi : {selected.properties.c_rdv_jeudi}</p>
              <p>Vendredi : {selected.properties.c_rdv_vendredi}</p>
              <p>Samedi : {selected.properties.c_rdv_samedi}</p>
              <p> Dimanche : {selected.properties.c_rdv_dimanche}</p>
              <p> TEL  : {selected.properties.c_rdv_tel}</p>
              <p style={{fontWeight: 'bold'}}> Pour prendre rendez-vous, cliquer ci-dessous:</p>
              <button>
                <a href ={selected.properties.c_rdv_site_web} style={{ textAlign: 'center'}}>Prendre RDV</a>
              </button> 
            </div>
          </InfoWindow>
        ) : null}
      </GoogleMap>
    </div>
    </>
    )}/>
    <Route path='/request' component={Request} />
    </Router>
  );
}

function Locate({ panTo }) {
  return (
    <button
      className="locate"
      onClick={() => {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            panTo({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          () => null
        );
      }}
    >
      <img src="/compass.svg" alt="compass" />
    </button>
  );
}

function Search({ panTo }) {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: { lat: () => 43.6000, lng: () => -1.433333 },
      radius: 100 * 1000,
    },
  });

  // https://developers.google.com/maps/documentation/javascript/reference/places-autocomplete-service#AutocompletionRequest

  const handleInput = (e) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      panTo({ lat, lng });
    } catch (error) {
      console.log("😱 Error: ", error);
    }
  };

  return (
    <div className="search">
      <Combobox onSelect={handleSelect}>
        <ComboboxInput
          value={value}
          onChange={handleInput}
          disabled={!ready}
          placeholder="Search your location"
        />
        <ComboboxPopover>
          <ComboboxList>
            {status === "OK" &&
              data.map(({ id, description }) => (
                <ComboboxOption key={id} value={description} />
              ))}
          </ComboboxList>
        </ComboboxPopover>
      </Combobox>
    </div>
  );

}
