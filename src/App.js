/** @format */

// import Mapper from './Map';
// import LocateControl from './Locate';
import React, { useRef } from 'react';
import { Map, Marker, Popup, TileLayer, withLeaflet } from 'react-leaflet';

import L from 'leaflet';

import Header from './Header';
import nextId from 'react-id-generator';
import PrintControlDefault from 'react-leaflet-easyprint';
const PrintControl = withLeaflet(PrintControlDefault);

// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faCoffee } from '@fortawesome/free-solid-svg-icons';

//import icon from leaflet, create new icon instances--give user option to use different icons

// const bar = new L.Icon({
// 	iconUrl: 'wineIcon.png',
// 	iconSize: [20, 20],
// 	className: 'myDivIcon',
// });

class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			lat: 40.72683,
			lng: -73.943512,
			description: [],
			title: '',
			imageUrl: '',
			location: [],
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleClick(event) {
		let coords = event.latlng;
		let obj = {};
		let latt = coords.lat;
		let long = coords.lng;
		obj.lat = latt;
		obj.lng = long;
		obj.position = [latt, long];
		obj.id = nextId();
		let description = this.state.description;
		description.push(obj);
		this.setState({ ...description, lat: coords.lat, lng: coords.lng });
	}

	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value,
		});
	}

	handleSubmit(event) {
		event.preventDefault();
		let obj = this.state.description.filter((obj) => {
			return obj.lat === this.state.lat && obj.lng === this.state.lng;
		});
		let titleText = this.state.title;
		let image = this.state.imageUrl;
		obj[0].title = titleText;
		obj[0].imageUrl = image;
		let description = this.state.description;
		this.setState({ description });
	}

	render() {
		return (
			<div id="app-container">
				<Header />

				{/* list of icons */}

				{/* <Mapper
					handleSubmit={this.handleSubmit}
					handleChange={this.handleChange}
					handleClick={this.handleClick}
					lat={this.state.lat}
					lng={this.state.lng}
					title={this.state.title}
					imageUrl={this.state.imageUrl}
					description={this.state.description}
					location={this.state.location}
				/> */}
				<Map
					center={[this.state.lat, this.state.lng]}
					zoom={13}
					onClick={this.handleClick}
				>
					<TileLayer
						url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
						attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
					/>

					{this.state.description.length > 0 &&
						this.state.description.map((obj) => (
							<Marker key={`marker-${obj.id}`} position={obj.position}>
								<Popup>
									{obj.title ? (
										<div>
											<p>{obj.title}</p>
											<img src={obj.imageUrl} alt="" />
										</div>
									) : (
										<form onSubmit={this.handleSubmit}>
											<input
												name="title"
												type="text"
												placeholder="title"
												onChange={this.handleChange}
											/>
											<input
												name="imageUrl"
												type="text"
												placeholder="imageUrl"
												onChange={this.handleChange}
											/>
											<button type="submit">Submit</button>
										</form>
									)}

									<button
										type="button"
										onClick={() => {
											console.log(obj.id);
											const filtered = this.state.description.filter(
												(object) => {
													return object.id !== obj.id;
												}
											);
											this.setState({ description: filtered });
										}}
									>
										Delete
									</button>
								</Popup>
							</Marker>
						))}

					<PrintControl
						position="topleft"
						sizeModes={['Current', 'A4Portrait', 'A4Landscape']}
						hideControlContainer={false}
						title="Export as PNG"
						exportOnly
					/>
				</Map>
			</div>
		);
	}
}

export default App;

//geolocation?
//access camera for pics?
//view all popups?
//icons
//last thing is to send the whole app to electron to host :)
