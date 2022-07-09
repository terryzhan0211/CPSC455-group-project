import React, { useEffect, useState } from 'react';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';
import './Map.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrPosts } from '../features/cities';
import markerIcon from '../img/gifmarker.gif';

// import GoogleMapStyle from '../assets/MapStyle.json';

function Map() {
	const style = require('../assets/MapStyle.json');
	const navigate = useNavigate();
	const citys = useSelector((state) => state.cities.cities);

	const dispatch = useDispatch();
	const [center, setCenter] = useState({
		lat: 44.1164,
		lng: -101.2996,
	});
	const [isRenderMap, setIsRenderMap] = useState();
	const containerStyle = {
		width: '100vw',
		height: '100vh',
	};
	const MAP_OPTIONS = {
		minZoom: 4,
		maxZoom: 18,
		styles: style,
		disableDefaultUI: true,
	};

	const HEATMAP_OPTIONS = {
		maxIntensity: 5,
		radius: 50,
	};
	const RED = 'rgb(242, 98, 87)';
	const GREEN = 'rgb(194, 249, 112)';
	const MARKER_OPTIONS = {
		icon: {
			path: window.google.maps.SymbolPath.CIRCLE,
			scale: 10,
			fillColor: GREEN,
			fillOpacity: 0.6,
			strokeWeight: 10,
			strokeOpacity: 0.2,
			strokeColor: GREEN,
		},
	};

	const heatmapLocation = [];
	for (var i = 0; i < citys.length; i++) {
		const currLoc = {
			cityId: citys[i].cityName,
			location: new window.google.maps.LatLng(citys[i].location.lat, citys[i].location.lng),
			weight: 1,
			radius: 500,
		};
		heatmapLocation.push(currLoc);
	}

	function handleOnClick(cityName) {
		console.log(cityName);
		dispatch(getCurrPosts(cityName));
		navigate('/posts', { replace: true, state: cityName });
	}

	useEffect(() => {
		let mostPosts = 1;
		for (var city of citys) {
			mostPosts = Math.max(mostPosts, city.posts.length);
		}
		console.log(mostPosts);
		setIsRenderMap(() => {
			return (
				<div>
					<HeatmapLayer data={heatmapLocation} options={HEATMAP_OPTIONS} />
					{citys.map((marker, index) => {
						if (marker.posts.length === mostPosts) {
							MARKER_OPTIONS.icon.fillColor = RED;
							MARKER_OPTIONS.icon.strokeColor = RED;
							MARKER_OPTIONS.icon.strokeWeight = 10;
						} else {
							MARKER_OPTIONS.icon.fillColor = GREEN;
							MARKER_OPTIONS.icon.strokeColor = GREEN;
							MARKER_OPTIONS.icon.strokeWeight = 5;
						}

						return (
							<Marker
								key={marker.cityName}
								position={marker.location}
								title="Click to zoom"
								onClick={() => handleOnClick(marker.cityName)}
								options={MARKER_OPTIONS}
							/>
						);
					})}
				</div>
			);
		});
		console.log(mostPosts);
	}, [citys]);
	return (
		<div className="map-container">
			<GoogleMap
				options={MAP_OPTIONS}
				mapContainerStyle={containerStyle}
				center={center}
				zoom={5}
			>
				{isRenderMap}
			</GoogleMap>
		</div>
	);
}

export default Map;
