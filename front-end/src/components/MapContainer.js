import React, { useState, useEffect, useRef } from 'react';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import MapboxVector from 'ol/layer/MapboxVector';
import VectorSource from 'ol/source/Vector';
import Heatmap from 'ol/layer/Heatmap';
import { OSM } from 'ol/source';
import { transform, fromLonLat } from 'ol/proj';
import { toStringXY } from 'ol/coordinate';
import { Point } from 'ol/geom';
import { useGeographic } from 'ol/proj';
import Geolocation from 'ol/Geolocation';
import { useNavigate } from 'react-router-dom';

import './Map.css';
import { Feature } from 'ol';

function MapContainer(props) {
	// set intial state
	const [map, setMap] = useState();
	const [featuresLayer, setFeaturesLayer] = useState();
	const [selectedCoord, setSelectedCoord] = useState();
	const navigate = useNavigate();

	// pull refs
	const mapElement = useRef();

	// create state ref that can be accessed in OpenLayers onclick callback function
	//  https://stackoverflow.com/a/60643670
	const mapRef = useRef();
	mapRef.current = map;
	useGeographic();
	// initialize map on first render - logic formerly put into componentDidMount
	useEffect(() => {
		// create and add vector source layer

		const view = new View({
			center: fromLonLat([35.000029612372934, 0.0003340713551267527]),
			zoom: 4.5,
		});
		const geolocation = new Geolocation({
			trackingOptions: {
				enableHighAccuracy: true,
			},
			projection: view.getProjection(),
		});

		// const accuracyFeature = new Feature();
		// geolocation.on('change:accuracyGeometry', function () {
		// 	accuracyFeature.setGeometry(geolocation.getAccuracyGeometry());
		// });
		// const initalFeaturesLayer = new VectorLayer({
		// 	source: new VectorSource({
		// 		features: [accuracyFeature],
		// 	}),
		// });
		const initialMap = new Map({
			target: mapElement.current,
			controls: [],
			layers: [
				new MapboxVector({
					styleUrl: 'mapbox://styles/gxx117/cl42bpw6k000x16o0649ytc55',
					accessToken:
						'pk.eyJ1IjoiZ3h4MTE3IiwiYSI6ImNsNDN1dGQ5cDAxM2Mzb2xlaGpyaDZlM3kifQ.AfY5b0P9YO-z-DdtCJZOrQ',
				}),
				// initalFeaturesLayer,
			],
			view: view,
		});
		initialMap.on('click', function (e) {
			const clickedCoord = mapRef.current.getCoordinateFromPixel(e.pixel);

			// transform coord to EPSG 4326 standard Lat Long
			const transormedCoord = transform(clickedCoord, 'EPSG:3857', 'EPSG:4326');

			// set React state
			setSelectedCoord(transormedCoord);

			console.log(transormedCoord);
			navigate('/posts', { replace: true }, [navigate]);
		});
		// set map onclick handler
		// initialMap.on('click', handleMapClick);

		// save map and vector layer references to state
		setMap(initialMap);
		// setFeaturesLayer(initalFeaturesLayer);
	}, []);

	// update map if features prop changes - logic formerly put into componentDidUpdate
	// useEffect(() => {
	// 	if (props.features.length) {
	// 		// may be null on first render

	// 		// set features to map
	// 		featuresLayer.setSource(
	// 			new VectorSource({
	// 				features: props.features, // make sure features is an array
	// 			})
	// 		);

	// 		// fit map to feature extent (with 100px of padding)
	// 		map.getView().fit(featuresLayer.getSource().getExtent(), {
	// 			padding: [100, 100, 100, 100],
	// 		});
	// 	}
	// }, [props.features]);

	// render component
	return <div ref={mapElement} className="map-container"></div>;
}

export default MapContainer;
