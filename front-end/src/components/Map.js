import React, { useState, useEffect } from 'react';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';
import './Map.css';
import { useNavigate } from 'react-router-dom';
// import GoogleMapStyle from '../assets/MapStyle.json';
function Map() {
	const navigate = useNavigate();
	const style = require('../assets/MapStyle.json');
	const [showHeatMap, setShowHeatMap] = useState(false);
	const [center, setCenter] = useState({
		lat: 48.3544,
		lng: -99.9981,
	});
	const [cities, setCities] = useState([]);
	const [locations, setLocations] = useState([{ lat: 49.2827, lng: -123.1207 }]);
	const containerStyle = {
		maxZoom: 7,
		minZoom: 4,
		width: '100vw',
		height: '100vh',
	};

	function handleOnClick() {
		navigate('/posts', { replace: true });
	}

	const onLoad = (heatmapLayer) => {
		console.log('HeatmapLayer onLoad heatmapLayer: ', heatmapLayer);
	};
	useEffect(() => {
		setShowHeatMap(true);
	}, []);

	return (
		<div className="map-container">
			<GoogleMap
				options={{ styles: style, disableDefaultUI: true }}
				mapContainerStyle={containerStyle}
				center={center}
				zoom={4}
			>
				{showHeatMap && (
					<HeatmapLayer
						data={[
							{
								location: new window.google.maps.LatLng(49.2827, -123.1207),
								weight: 10,
							},
						]}
						radius={20}
					/>
				)}
				{showHeatMap && <Marker position={locations[0]} onClick={handleOnClick} />}
			</GoogleMap>
		</div>
	);
}

export default Map;
