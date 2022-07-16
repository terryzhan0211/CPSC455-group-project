import React, { useEffect, useState } from 'react';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';
import './Map.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrPosts } from '../features/cities';
import LIGHT_MARKER from '../img/light-marker.png';
import GREEN_MARKER from '../img/green-marker.png';
import { motion } from 'framer-motion';
import { animationTwo, transition } from '../animations';

import { getCitiesAsync } from '../features/thunks';

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
	useEffect(() => {
		dispatch(getCitiesAsync());
	}, [dispatch]);
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
		maxIntensity: 10,
		radius: 90,
	};
	const RED = 'rgb(255, 92, 119)';
	const GREEN = 'rgb(0,255,0)';
	const ORANGE = 'rgb(255, 190, 120)';
	const YELLOW = 'rgb(255, 244, 120)';
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
		dispatch(getCurrPosts(cityName));
		navigate('/posts', { replace: true, state: cityName });
	}

	useEffect(() => {
		setIsRenderMap(() => {
			var mostPosts = 1;
			for (var city of citys) {
				mostPosts = Math.max(mostPosts, city.weight);
			}
			return (
				<div>
					{/* <HeatmapLayer data={heatmapLocation} options={HEATMAP_OPTIONS} /> */}
					{citys.map((marker, index) => {
						const marker_options = {
							icon: {
								url: LIGHT_MARKER,
								anchor: new window.google.maps.Point(100, 100),
							},
						};

						if (marker.weight === mostPosts) {
							marker_options.zIndex = 3;
							marker_options.icon.url = LIGHT_MARKER;
						} else {
							marker_options.zIndex = 1;
							marker_options.icon.url = GREEN_MARKER;
						}

						return (
							<Marker
								key={marker.cityName}
								position={marker.location}
								optimized={false}
								onClick={() => handleOnClick(marker.cityName)}
								options={marker_options}
							/>
						);
					})}
				</div>
			);
		});
	}, [citys]);
	return (
		<motion.div
			initial="out"
			animate="in"
			exit="out"
			variants={animationTwo}
			transition={transition}
		>
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
		</motion.div>
	);
}

export default Map;
