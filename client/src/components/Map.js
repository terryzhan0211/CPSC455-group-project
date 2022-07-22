import React, { useEffect, useState } from 'react';
import { GoogleMap, HeatmapLayer, Marker, InfoBox } from '@react-google-maps/api';
import './Map.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrPosts } from '../features/cities';
import RED_MARKER from '../img/marker-03.png';
import LIGHT_MARKER from '../img/marker-02.png';
import GREEN_MARKER from '../img/marker-01.png';
import { motion } from 'framer-motion';
import { animationOne, animationTwo, transition } from '../animations';

import { getCitiesAsync } from '../features/citiesThunks';

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
	const [isRenderInfoBox, setIsRenderInfoBox] = useState();
	const [showInfoBox, setShowInfoBox] = useState(false);
	const [infoBoxPosition, setInfoBoxPosition] = useState(center);
	const [infoBoxContent, setInfoBoxContent] = useState('hello');
	useEffect(() => {
		dispatch(getCitiesAsync());
	}, [dispatch]);
	const INFOBOX_OPTIONS = {
		closeBoxURL: '',
		enableEventPropagation: true,
		zIndex: 10,
		pixelOffset: new window.google.maps.Size(-50, -150),
	};
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
	// const heatmapLocation = [];
	// for (var i = 0; i < citys.length; i++) {
	// 	const currLoc = {
	// 		cityId: citys[i].cityName,
	// 		location: new window.google.maps.LatLng(citys[i].location.lat, citys[i].location.lng),
	// 		weight: 1,
	// 		radius: 500,
	// 	};
	// 	heatmapLocation.push(currLoc);
	// }

	function handleOnClick(cityName) {
		dispatch(getCurrPosts(cityName));
		navigate('/postList', { replace: true });
		// navigate(`/postList/${cityId}`, { replace: true });
	}

	function toggleInfoBox(cityName, cityLoc) {
		setInfoBoxContent(cityName);
		setInfoBoxPosition(cityLoc);
		setTimeout(function () {
			setShowInfoBox(true);
		}, 500);
	}

	function toggleOffInfoBox() {
		setTimeout(function () {
			setShowInfoBox(false);
		}, 500);
	}
	useEffect(() => {
		setIsRenderMap(() => {
			var mostPosts = 1;
			for (var city of citys) {
				mostPosts = Math.max(mostPosts, city.weight);
			}
			return (
				<div>
					{citys?.map((marker, index) => {
						const marker_options = {
							icon: {},
						};

						if (marker.weight === mostPosts) {
							marker_options.zIndex = 5;
							marker_options.icon.scaledSize = new window.google.maps.Size(150, 150);
							marker_options.icon.url = RED_MARKER;
							marker_options.icon.anchor = new window.google.maps.Point(75, 75);
						} else {
							marker_options.zIndex = 1;
							marker_options.icon.scaledSize = new window.google.maps.Size(80, 80);
							marker_options.icon.url = GREEN_MARKER;
							marker_options.icon.anchor = new window.google.maps.Point(40, 40);
						}

						return (
							<Marker
								key={marker.cityName}
								position={marker.location}
								optimized={false}
								onMouseUp={() => handleOnClick(marker.cityName)}
								options={marker_options}
								onMouseOver={() => toggleInfoBox(marker.cityName, marker.location)}
								onMouseOut={() => toggleOffInfoBox()}
							/>
						);
					})}
				</div>
			);
		});
	}, [citys]);

	useEffect(() => {
		setIsRenderInfoBox(() => {
			return (
				<div>
					{showInfoBox && (
						<InfoBox options={INFOBOX_OPTIONS} position={infoBoxPosition}>
							<div className="infobox-container">
								<div className="infobox-content">{infoBoxContent}</div>
							</div>
						</InfoBox>
					)}
				</div>
			);
		});
	}, [showInfoBox, infoBoxContent]);

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
					{isRenderInfoBox}
					{isRenderMap}
				</GoogleMap>
			</div>
		</motion.div>
	);
}

export default Map;
