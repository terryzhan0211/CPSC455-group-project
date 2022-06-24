import React, { useEffect, useState } from 'react';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';
import './Map.css';
import { useNavigate } from 'react-router-dom';
// import { useSelector } from 'react-redux';
// import GoogleMapStyle from '../assets/MapStyle.json';
function Map() {
	const navigate = useNavigate();
	// const locations = useSelector((state) => state.cities.cities);
	//{city: "name",
	// posts.length: 0}
	const style = require('../assets/MapStyle.json');
	const [center, setCenter] = useState({
		lat: 49.2827,
		lng: -123.1207,
	});
	const newLocations = [
		{
			location: new window.google.maps.LatLng(49.2827, -123.1207),
			weight: 1,
			radius: 200,
		},
		{
			location: new window.google.maps.LatLng(49.2827, -123.1302),
			weight: 1,
			radius: 200,
		},
	];
	const [cities, setCities] = useState(newLocations);
	const [isRenderMap, setIsRenderMap] = useState();
	const containerStyle = {
		width: '100vw',
		height: '100vh',
	};

	function handleOnClick(cityName) {
		navigate('/posts', { replace: true });
		// navigate('/posts', { replace: true, state: cityName });
	}

	const onLoad = (heatmapLayer) => {
		console.log('HeatmapLayer onLoad heatmapLayer: ', heatmapLayer);
	};
	useEffect(() => {
		setIsRenderMap(() => {
			return (
				<div>
					<HeatmapLayer data={newLocations} />
					<Marker position={center} onClick={()=>{handleOnClick()}}/>
				</div>
			);
		});
	}, []);
	return (
		<div className="map-container">
			<GoogleMap
				options={{ styles: style, disableDefaultUI: true }}
				mapContainerStyle={containerStyle}
				center={center}
				zoom={13}
			>
				{isRenderMap}
			</GoogleMap>
		</div>
	);
}

export default Map;
