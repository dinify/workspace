import React from "react";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";
import SyntaxHighlighter from "react-syntax-highlighter/prism";
import { prism } from "react-syntax-highlighter/styles/prism";

const exampleMap = `import React from 'react';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);

function GoogleMaps({...props}){
  return (
    <RegularMap
      googleMapURL="https://maps.googleapis.com/maps/api/js?key=YOUR_KEY_HERE"
      loadingElement={<div style={{ height: '100%' }} />}
      containerElement={<div style={{ height: '280px' }} />}
      mapElement={<div style={{ height: '100%' }} />}
    />
  );
}

export default GoogleMaps;`;

const RegularMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: 40.748817, lng: -73.985428 }}
      defaultOptions={{
        scrollwheel: false
      }}
    >
      <Marker position={{ lat: 40.748817, lng: -73.985428 }} />
    </GoogleMap>
  ))
);

function GoogleMaps() {
  return (
    <div>
      <h1>React Google Maps v9.4.5</h1>
      <p>
        For maps we've used some components from a react library{" "}
        <a href="https://github.com/tomchentw/react-google-maps">
          react-google-maps
        </a>
        .
      </p>
      <p>
        Please refer to{" "}
        <a href="https://github.com/tomchentw/react-google-maps">
          react-google-maps
        </a>{" "}
        documentation for more information.
      </p>
      <h2>Google API Key</h2>
      <p>For this component to work, you will need a google maps API key.</p>
      <p>Follow these steps to get an API key:</p>
      <ol>
        <li>
          Go to the{" "}
          <a
            href="https://console.developers.google.com/flows/enableapi?apiid=maps_backend,geocoding_backend,directions_backend,distance_matrix_backend,elevation_backend,places_backend&amp;reusekey=true"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google API Console
          </a>
          .
        </li>
        <li>Create or select a project.</li>
        <li>Click Continue to enable the API and any related services.</li>
        <li>On the Credentials page, get an API key.</li>
        <li>
          Note: If you have an existing unrestricted API key, or a key with
          browser restrictions, you may use that key.
        </li>
        <li>
          From the dialog displaying the API key, select Restrict key to set a
          browser restriction on the API key.
        </li>
        <li>
          In the Key restriction section, select HTTP referrers (web sites),
          then follow the on-screen instructions to set referrers.
        </li>
        <li>
          (Optional) Enable billing. See{" "}
          <a
            href="https://developers.google.com/maps/documentation/javascript/usage"
            target="_blank"
            rel="noopener noreferrer"
          >
            Usage Limits
          </a>{" "}
          for more information.
        </li>
      </ol>
      <p>
        After these steps navigate in your project to{" "}
        <code>views/Maps/GoogleMaps.jsx</code> and{" "}
        <code>views/Maps/FullScreenMap.jsx</code> and replace the{" "}
        <code>YOUR_KEY_HERE</code> with the given API KEY.
      </p>
      <h2>Example</h2>
      <RegularMap
        googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyBd3PjUqq81lIOfBPYXrQGWwK5T4ystZjA"
        loadingElement={<div style={{ height: "100%" }} />}
        containerElement={<div style={{ height: "280px" }} />}
        mapElement={<div style={{ height: "100%" }} />}
      />
      <SyntaxHighlighter language="jsx" style={prism}>
        {exampleMap}
      </SyntaxHighlighter>
    </div>
  );
}

export default GoogleMaps;
