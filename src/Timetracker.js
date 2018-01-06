import React, { Component } from 'react';

export default class TimePicker extends Component {
	constructor(props) {
		super(props);
		this.state = {
			hours: props.hours || 0,
			minHours: props.minHours || 0,
			minutes: props.minutes || 0,
			minMinutes: props.minMinutes || 0,
			minuteStep: props.minuteStep || 1,
			showClock: false,
			hours: '00',
			minutes: '00'
		};
	}

	setClock() {
		return (
			<div className="timePicker">
				<div className="hours">
					<div className="options" key="hourTitle">Hrs.</div>
					{this.setOptions(this.state.minHours, 24, 1, 'hours')}
				</div>
				<div className="minutes">
					<div className="options" key="minTitle">Min.</div>
					{this.setOptions(this.state.minMinutes, 60, this.state.minuteStep, 'minutes')}
				</div>
			</div>
		);
	}

	setOptions(min, max, step, block) {
		const holder = [];
		for (let i = min; i < max; i += step)
			holder.push(
				<div className="options" onClick={this.handleClick.bind(this, block)} key={i}>
					{this.formatTime(i)}
				</div>
			);
		return holder;
	}

	handleClick(block, obj) {
		document.querySelectorAll(`.${block} .options`).forEach(ele => {
			ele.className = 'options';
		});
		obj.target.className = 'options active';
		this.setState({ [block]: obj.target.textContent });
		if (block === 'minutes') this.handleShow(false);
	}

	handleShow(isShow) {
		//since setstate is asynchronus, send data to parent as a callback function
		this.setState({ showClock: isShow }, () => {
			if (!isShow) this.props.onChange({ hours: this.state.hours, minutes: this.state.minutes });
		});
	}

	handleChange(obj) {
		document.querySelectorAll(`.options`).forEach(ele => {
			ele.className = 'options';
		});

		const value = obj.target.value.split(':');

		let hours = parseInt(value[0], 10);
		hours = hours > 23 || hours <= 0 || isNaN(hours) ? '00' : hours;

		let minutes = parseInt(value[1], 10);
		minutes = minutes > 59 || minutes <= 0 || isNaN(minutes) ? '00' : minutes;

		this.setState({
			hours,
			minutes
		});
	}

	formatTime(val) {
		return val < 10 ? '0' + val : val;
	}

	render() {
		return (
			<div className="timePickerHolder">
				<input
					onFocus={this.handleShow.bind(this, true)}
					onChange={this.handleChange.bind(this)}
					value={`${this.state.hours}:${this.state.minutes}`}
				/>
				
				{this.state.showClock && 
					<a onClick={this.handleShow.bind(this, false)} className="handle">✔</a>
				}
				{this.state.showClock && 
					this.setClock()
				}
			</div>
		);
	}
}