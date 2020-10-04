/** @format */

import React from 'react';
import { Map, Marker, Popup, TileLayer, withLeaflet } from 'react-leaflet';
import { renderToStaticMarkup } from 'react-dom/server';
import { divIcon } from 'leaflet';
import Header from './Header';
import nextId from 'react-id-generator';
import PrintControlDefault from 'react-leaflet-easyprint';
const PrintControl = withLeaflet(PrintControlDefault);

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
			showMenu: false,
		};
		this.handleClick = this.handleClick.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleChange = this.handleChange.bind(this);
		this.findMe = this.findMe.bind(this);
		// this.menuToggle = this.menuToggle.bind(this);
	}

	// menuToggle() {
	// 	this.setState({ showMenu: !this.state.showMenu });
	// }

	findMe() {
		navigator.geolocation.getCurrentPosition((position) => {
			console.log(position);
			this.setState({
				lat: position.coords.latitude,
				lng: position.coords.longitude,
			});
		});
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
		// const iconMarkup = renderToStaticMarkup(

		// 	// <i id="bar" className="fa fa-glass-martini fa-2x" />
		// 	// <i id="home" className="fa fa-home fa-2x" />
		// 	<i id="hearts" className="fa fa-grin-hearts fa-2x" />
		// );
		// const customMarkerIcon = divIcon({
		// 	html: renderToStaticMarkup(
		// 		<i id="heart" className="fa fa-heart fa-2x" />
		// 	),
		// });

		return (
			<div id="app-container">
				<Header />

				<button id="findMe" onClick={this.findMe}>
					Find me!
				</button>

				{/* <div className={this.state.showMenu ? 'showMenu' : 'hideMenu'}>
					<p>icon options!</p>
				</div>
				<button type="button" onClick={this.menuToggle}>*</button> */}

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
							<Marker
								key={`marker-${obj.id}`}
								position={obj.position}
								// icon={customMarkerIcon}
							>
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

//view all popups?
//icons
