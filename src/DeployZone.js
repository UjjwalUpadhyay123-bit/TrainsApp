import React, { Component } from 'react';
import Platform from './Platform';
import { convertToMinutes } from './Utility';

export default class Holder extends Component {
	constructor(props) {
		super(props);
		this.state = {
			platformStatus: [
				{
					engine: false,
					carrier: 0,
					arrival: {},
					departure: {}
				}
			]
		};
	}

	addTrain() {
		this.setState(prevState => {
			const platformStatus = [...prevState.platformStatus];
			platformStatus.push({ engine: false, carrier: 0, arrival: {}, departure: {} });
			return { platformStatus };
		});
	}

	makeTrains() {
		const trains = [];
		for (let train = 0; train < this.state.platformStatus.length; train++) {
			trains.push(
				<Platform
					key={train}
					trainNumber={train}
					maintainence={this.modifyTrain.bind(this)}
					handleTime={this.handleTime.bind(this)}
					train={this.state.platformStatus[train]}
				/>
			);
		}
		return trains;
	}

	modifyTrain(train, part) {
		const { type } = part;
		this.setState(prevState => {
			const platformStatus = [...prevState.platformStatus];
			if (type === 'carrier') {
				if (!platformStatus[train].engine) alert('No engine added');
				else platformStatus[train].carrier++;
			} else if (type === 'engine') {
				if (platformStatus[train].engine) alert('Engine already added');
				platformStatus[train].engine = true;
			}
			return { platformStatus };
		});
	}

	handleTime(data) {
		this.setState(prevState => {
			const platformStatus = [...prevState.platformStatus];
			platformStatus[data.trainNumber][data.mode] = data.time;
			return { platformStatus };
		});
	}

	numericalSort(a, b) {
		return a - b;
	}

	calculateTracks() {
		const arrivalTimes = this.state.platformStatus.map(train => convertToMinutes(train.arrival));
		const departureTimes = this.state.platformStatus.map(train => convertToMinutes(train.departure));

		if (!this.validateInput(arrivalTimes, departureTimes)) {
			alert('All departures should be greater than Arrivals');
			return false;
		}

		arrivalTimes.sort(this.numericalSort);
		departureTimes.sort(this.numericalSort);

		let next = 1;
		let prev = 0;
		let totalTracks = 1;
		let tracksReq = 1;

		while (next < arrivalTimes.length && prev < arrivalTimes.length) {
			if (arrivalTimes[next] < departureTimes[prev]) {
				tracksReq++;
				next++;
				if (tracksReq > totalTracks) totalTracks = tracksReq;
			} else {
				tracksReq--;
				prev++;
			}
		}
		alert(`Total ${totalTracks} tracks are needed.`);
		return totalTracks;
	}

	validateInput(arrivals, departures) {
		let allWell = true;

		arrivals.forEach((arrival, index) => {
			if (arrival >= departures[index] || isNaN(arrival) || isNaN(departures[index])) {
				allWell = false;
				return false;
			}
		});
		return allWell;
	}

	render() {
		return (
			<div>
				{this.makeTrains()}
				<div className="actionBtns">
					<button onClick={this.addTrain.bind(this)}>Add more train</button>
					<button onClick={this.calculateTracks.bind(this)}>Calculate Tracks</button>
				</div>
			</div>
		);
	}
}