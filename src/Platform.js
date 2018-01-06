import React, { Component } from 'react';
import { DropTarget } from 'react-dnd';
import Timetracker from './Timetracker'

const ItemTypes = {
	CARD: 'card'
};

const collect = (connect, monitor) => {
	return {
		connectDropTarget: connect.dropTarget(),
		isOver: monitor.isOver(),
	};
};

const holderTarget = {
	drop(props,monitor) {
		const dropBox = props.trainNumber;
		const draggedItem = monitor.getItem();
		props.maintainence(dropBox, draggedItem);
	}
};

class Yard extends Component {

	setTrain() {
		const { train, trainNumber } = this.props;
		let trainArray = [];
		if(train.engine){
			trainArray.push(<span key="theEngine" className="theEngine">🚂</span>);
		}

		if(train.engine && train.carrier && train.carrier > 0){
			for(let i=0; i < train.carrier; i++){
				trainArray.push(<a key={`theLink${i}`}>⚏</a>)
				trainArray.push(<span key={`theCarrier${i}`}>🚃</span>);
			}
		}

		if (trainArray.length !== 0)
			trainArray.push(this.setTimeBlock());

		return trainArray;
	}

	setTimeBlock() {
		const { trainNumber } = this.props;
		return(
			<div key={trainNumber} className="timeManager">
				<span>Arrival</span>
				<Timetracker onChange={this.handleInput.bind(this, 'arrival', trainNumber)}/>
				<span>Departure</span>
				<Timetracker onChange={this.handleInput.bind(this, 'departure', trainNumber)}/>
			</div>
		);	
	}

	handleInput(mode, trainNumber, time) {
		this.props.handleTime({
			mode,
			trainNumber,
			time
		});
	}

	render() {
		const { connectDropTarget, isOver, trainNumber, train } = this.props;
		return connectDropTarget(
			<div key={trainNumber} className={`trainInProgress${isOver?' isOver':''}`}>
				{this.setTrain()}
			</div>
		);
	}
}

export default DropTarget(ItemTypes.CARD, holderTarget, collect)(Yard);
