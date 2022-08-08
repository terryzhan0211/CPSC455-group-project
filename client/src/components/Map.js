import React, { useEffect, useState } from 'react';
import { GoogleMap, Marker, InfoBox } from '@react-google-maps/api';
import './Map.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import RED_MARKER from '../img/marker-03.png';
import LIGHT_MARKER from '../img/marker-02.png';
import GREEN_MARKER from '../img/marker-01.png';
import { motion } from 'framer-motion';
import { animationTwo, transition } from '../animations';
import { getCitiesAsync } from '../features/citiesThunks';

// import GoogleMapStyle from '../assets/MapStyle.json';

function Map() {
	const style = require('../assets/MapStyle.json');
	const navigate = useNavigate();
	const cities = useSelector((state) => state.cities.cities);

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

	function handleOnClick(cityId, cityName) {
		navigate(`/postList/${cityId}`, { replace: true, state: { cityName } });
	}

	function toggleInfoBox(cityName, cityLoc) {
		setInfoBoxContent(cityName);
		setInfoBoxPosition(cityLoc);
		setShowInfoBox(true);
	}

	function toggleOffInfoBox() {
		setShowInfoBox(false);
	}
	useEffect(() => {
		setIsRenderMap(() => {
			return (
				<div>
					{cities?.map((marker, index) => {
						if (marker.weight > 0) {
							const marker_options = {
								icon: {},
							};
							if (index === 0) {
								marker_options.zIndex = 5;
								marker_options.icon.scaledSize = new window.google.maps.Size(
									150,
									150
								);
								marker_options.icon.url = RED_MARKER;
								marker_options.icon.anchor = new window.google.maps.Point(75, 75);
							} else if (index > 0 && index < 4) {
								marker_options.zIndex = 3;
								marker_options.icon.scaledSize = new window.google.maps.Size(
									110,
									110
								);
								marker_options.icon.url = LIGHT_MARKER;
								marker_options.icon.anchor = new window.google.maps.Point(55, 55);
							} else {
								marker_options.zIndex = 1;
								marker_options.icon.scaledSize = new window.google.maps.Size(
									80,
									80
								);
								marker_options.icon.url = GREEN_MARKER;
								marker_options.icon.anchor = new window.google.maps.Point(40, 40);
							}
							return (
								<Marker
									key={marker.cityName}
									position={marker.location}
									optimized={false}
									onMouseUp={() => handleOnClick(marker._id, marker.cityName)}
									options={marker_options}
									onMouseOver={() =>
										toggleInfoBox(marker.cityName, marker.location)
									}
									onMouseOut={() => toggleOffInfoBox()}
								/>
							);
						}
					})}
				</div>
			);
		});
	}, [cities]);

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
