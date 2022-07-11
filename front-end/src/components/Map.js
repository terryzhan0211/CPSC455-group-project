import React, { useEffect, useState } from 'react';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';
import './Map.css';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getCurrPosts } from '../features/cities';

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
		radius: 100,
	};
	const RED = 'rgb(242, 98, 87)';
	const GREEN = 'rgb(0,255,0)';
	const ORANGE = 'rgb(255, 165, 0)';
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
					<HeatmapLayer data={heatmapLocation} options={HEATMAP_OPTIONS} />
					{citys.map((marker, index) => {
						const marker_options = {
							icon: {
								path: window.google.maps.SymbolPath.CIRCLE,
								scale: 25,
								fillColor: GREEN,
								fillOpacity: 0.8,
								strokeWeight: 25,
								strokeOpacity: 0.4,
								strokeColor: GREEN,
							},
						};

						if (marker.weight === mostPosts) {
							marker_options.icon.fillColor = RED;
							marker_options.icon.strokeColor = ORANGE;
							marker_options.icon.scale = 25;
							marker_options.icon.strokeWeight = 20;
							marker_options.icon.fillOpacity = 1;
							marker_options.icon.strokeOpacity = 0.7;
							marker_options.zIndex = 3;
						} else {
							marker_options.icon.fillColor = GREEN;
							marker_options.icon.strokeColor = GREEN;
							marker_options.icon.scale = 15;
							marker_options.icon.strokeWeight = 30;
							marker_options.icon.strokeOpacity = 0.4;
							marker_options.zIndex = 1;
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
