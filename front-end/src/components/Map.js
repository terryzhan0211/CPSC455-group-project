import React, { useState } from 'react';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';
import './Map.css';
import { useNavigate } from 'react-router-dom';
// import GoogleMapStyle from '../assets/MapStyle.json';
function Map() {
	const navigate = useNavigate();
	const style = require('../assets/MapStyle.json');
	const [center, setCenter] = useState({
		lat: 49.2827,
		lng: -123.1207,
	});
	const [cities, setCities] = useState([]);

	const containerStyle = {
		width: '100vw',
		height: '100vh',
	};

	function handleOnClick() {
		navigate('/posts', { replace: true });
	}

	const onLoad = (heatmapLayer) => {
		console.log('HeatmapLayer onLoad heatmapLayer: ', heatmapLayer);
	};
	return (

		<div className="map-container" onClick={handleOnClick}>

			<GoogleMap
				options={{ styles: style, disableDefaultUI: true }}
				mapContainerStyle={containerStyle}
				center={center}
				zoom={13}
			>
				<HeatmapLayer
					onLoad={onLoad}
					data={[
						{
							location: new window.google.maps.LatLng(49.2827, -123.1207),
							weight: 1,
							radius: 200,
						},
					]}
				/>
				<Marker onLoad={onLoad} position={center} />
			</GoogleMap>
		</div>
	);
}

export default Map;
