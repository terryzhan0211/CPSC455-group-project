import React, { useEffect, useState } from 'react';
import { GoogleMap, HeatmapLayer, Marker } from '@react-google-maps/api';
import './Map.css';
import { useNavigate } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import {getCurrPosts} from "../features/cities";

// import GoogleMapStyle from '../assets/MapStyle.json';

function Map() {
	const navigate = useNavigate();
	const citys = useSelector((state) => state.cities.cities);
	const style = require('../assets/MapStyle.json');
	const dispatch = useDispatch();
	const [center, setCenter] = useState({
		lat: 49.2827,
		lng: -123.1207,
	});
	// const newLocations = [
	// 	{
	// 		cityId:"1",
	// 		location: new window.google.maps.LatLng(49.2827, -123.1207),
	// 		weight: 1,
	// 		radius: 200,
	// 	},
	// 	{
	// 		cityId:"2",
	// 		location: new window.google.maps.LatLng(49.2827, -123.1302),
	// 		weight: 1,
	// 		radius: 200,
	// 	},
	// 	{
	// 		cityId:"3",
	// 		location: new window.google.maps.LatLng(43.8554579, -79.1168971),
	// 		weight: 1,
	// 		radius: 200,
	// 	},
	// ];
	// const centers = []
	// for (const city of citys){
	// 	centers.push(city.location)
	// }
	// const [cities, setCities] = useState(locations);
	const [isRenderMap, setIsRenderMap] = useState();
	const containerStyle = {
		width: '100vw',
		height: '100vh',
	};


	const heatmapLocation = [];
	for (var i = 0; i < citys.length; i++) {
		const currLoc = {
			cityId: citys[i].cityName,
			location: new window.google.maps.LatLng(citys[i].location.lat, citys[i].location.lng),
			weight: citys[i].weight,
			radius: 200,
		};
		heatmapLocation.push(currLoc);
	}

	function handleOnClick(cityName) {
		// navigate('/postdetail', { replace: true });
		console.log(cityName);
		dispatch(getCurrPosts(cityName));
		navigate('/posts', { replace: true, state: cityName });

	}



	const onLoad = (heatmapLayer) => {
		console.log('HeatmapLayer onLoad heatmapLayer: ', heatmapLayer);
	};
	useEffect(() => {
		setIsRenderMap(() => {
			return (
				<div >
					<HeatmapLayer data={heatmapLocation} />
					{/*<Marker position={centers[centers.length-1]} onClick={()=>{handleOnClick()}}/>*/}
					{citys.map((marker, index)=> {
						return (
							<Marker
							    key={marker.cityName}
								position={marker.location}
								title="Click to zoom"
								onClick={()=>handleOnClick(marker.cityName)}
							/>
						)
					})}
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