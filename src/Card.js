import React, { Component } from 'react';
import { DragSource } from 'react-dnd';

const cardSource = {
    beginDrag(props) {
        return props;
    }
};
const ItemTypes = {
    CARD: 'card'
};
const collect = (connect, monitor) => {
    return {
        connectDragSource: connect.dragSource()
    };
};

class Card extends Component {
    render() {
        const { connectDragSource } = this.props;

        if (this.props.type === 'engine') return connectDragSource(<div>🚂</div>);
        else return connectDragSource(<div>🚃</div>);
    }
}

export default DragSource(ItemTypes.CARD, cardSource, collect)(Card);