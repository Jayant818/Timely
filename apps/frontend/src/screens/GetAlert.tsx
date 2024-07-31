import { useEffect, useRef, useState } from "react";
// import useSocket from "../hooks/useSocket";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

const GetAlert = () => {
	// const socket = useSocket();
	const [location, setLocation] = useState<{
		lat: number;
		lng: number;
	}>({
		lat: 0,
		lng: 0,
	});
	const [destination, setDestination] = useState<{
		lat: number;
		lng: number;
	}>({
		lat: 0,
		lng: 0,
	});
	const [userDestination, setUserDestination] = useState("");
	const getLoc = useLocation();
	const audioRef = useRef(null);
	const [speed, setSpeed] = useState(0);
	const [timeLeft, setTimeLeft] = useState("∞");
	const [remDistance, setRemainingDistance] = useState(0);
	const [timeLimit, setTimeLimit] = useState("5");

	// Calculate distance using Haversine formula
	const calculateDistance = (
		lat1: number,
		lng1: number,
		lat2: number,
		lng2: number
	) => {
		const R = 6371; // Radius of the Earth in km
		const dLat = (lat2 - lat1) * (Math.PI / 180);
		const dLng = (lng2 - lng1) * (Math.PI / 180);
		const a =
			Math.sin(dLat / 2) * Math.sin(dLat / 2) +
			Math.cos(lat1 * (Math.PI / 180)) *
				Math.cos(lat2 * (Math.PI / 180)) *
				Math.sin(dLng / 2) *
				Math.sin(dLng / 2);
		const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
		return R * c; // Distance in km
	};

	useEffect(() => {
		const queryParams = new URLSearchParams(getLoc.search);
		const param1 = queryParams.get("location");
		const param2 = queryParams.get("time");
		if (param1 && param2) {
			setUserDestination(param1);
			setTimeLimit(param2);
		}
	}, [getLoc.search]);

	useEffect(() => {
		function getLocation() {
			if (navigator.geolocation) {
				navigator.geolocation.getCurrentPosition((position) => {
					setLocation({
						lat: Number(position.coords.latitude),
						lng: Number(position.coords.longitude),
					});
				});
			}
		}

		getLocation();

		async function fetchLocation() {
			if (!userDestination) return;
			try {
				const response = await fetch(
					`https://nominatim.openstreetmap.org/search?q=${userDestination}&format=json`
				);

				if (!response.ok) {
					throw new Error("Network response was not ok");
				}

				const data = await response.json();
				// if (data.results.length > 0) {
				const lat = parseFloat(data[0].lat);
				const lng = parseFloat(data[0].lon);
				console.log(lat, lng);
				setDestination({ lat, lng });
				return { lat, lng };
				// } else {
				// console.error("No results found for the specified location");
				// }
			} catch (error) {
				return {};
				// console.error("Error fetching coordinates:", error);
			}
		}
		fetchLocation();
		const interval = setInterval(async () => {
			const prevLocation = location;
			await getLocation();
			// console.log("newLocation", newLocation);
			// if (!newLocation) {
			// 	setSpeed(0);
			// }

			const dist = calculateDistance(
				prevLocation.lat,
				prevLocation.lng,
				location.lat,
				location.lng
			);
			console.log("Distance is", dist);
			if (dist === 0) {
				setSpeed(0);
			} else {
				const newSpeed = dist / 0.00278;
				setSpeed(newSpeed);
			}
			// fetchLocation();

			console.log(userDestination);
			console.log("Updated");
		}, 10000);

		return () => clearInterval(interval);
	}, [userDestination]);

	useEffect(() => {
		if (location.lat !== 0 && destination.lat !== 0) {
			// call the function
			const dist = calculateDistance(
				location.lat,
				location.lng,
				destination.lat,
				destination.lng
			);
			setRemainingDistance(dist);
			console.log("Distance", dist);

			if (speed) {
				setTimeLeft((dist / speed).toString());
			}
			if (!speed && dist < 2) {
				if (audioRef.current) {
					// @ts-ignore
					audioRef.current.play();
				}
			} else {
				const time = dist / speed;
				if (time * 60 < Number(timeLimit)) {
					if (audioRef.current) {
						// @ts-ignore
						audioRef.current.play();
					}
				}
			}
		}
	}, [location, destination]);

	useEffect(() => {}, []);

	if (location.lat == 0 || destination.lat == 0) {
		return <div className="h-screen"> Connecting...</div>;
	}
	// const position = [51.505, -0.09];
	return (
		<div className="h-screen">
			<Navbar />
			<audio ref={audioRef} src="/mixkit-retro-game-emergency-alarm-1000.wav" />
			<div className="flex justify-between px-10 pt-6 pb-4">
				<div className="flex gap-10">
					<div>
						<h3 className="text-2xl">Destination</h3>
						<div>{userDestination}</div>
					</div>
					{remDistance && (
						<div>
							<h3 className="text-2xl">Distance Rem.</h3>
							<div className="text-center text-lg">
								{Math.floor(remDistance)
									? Math.floor(remDistance)
									: remDistance}
								km
							</div>
						</div>
					)}
				</div>
				<div className="flex gap-10">
					<div>
						<h3 className="text-2xl">Time Left</h3>
						<div className="text-center text-lg">{timeLeft} hr</div>
					</div>
					<div>
						<h3 className="text-2xl">Speed</h3>
						<div className="text-center text-lg">{speed} km/hr</div>
					</div>
				</div>
			</div>
			<div id="map">
				{/* <MapContainer
					style={{ width: "100%", height: "100%", position: "relative" }}
					center={{ lat: 51.505, lng: -0.09 }}
					zoom={13}
					scrollWheelZoom={false}
				>
					<TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
					<Marker position={{ lat: 51.505, lng: -0.09 }}>
						<Popup>Jayant Lives Here, come over for a cup of coffee :)</Popup>
					</Marker>
				</MapContainer> */}
				{/* {JSON.stringify({ lat: location.lat, lng: location.lng })}
				{JSON.stringify({ lat: destination.lat, lng: destination.lng })} */}
				<MapContainer
					style={{ width: "100%", height: "100%", position: "relative" }}
					// center={{ lat: 28.4440182, lng: 77.0261667 }}
					center={{ lat: location.lat, lng: location.lng }}
					zoom={13}
					scrollWheelZoom={false}
				>
					<TileLayer
						attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					/>
					{/* <Marker position={{ lat: 28.4440182, lng: 77.0261667 }}> */}
					<Marker position={{ lat: location.lat, lng: location.lng }}>
						<Popup>Your Location</Popup>
					</Marker>
					<Marker position={{ lat: destination.lat, lng: destination.lng }}>
						<Popup>Destination</Popup>
					</Marker>
				</MapContainer>
			</div>
		</div>
	);
};

export default GetAlert;
