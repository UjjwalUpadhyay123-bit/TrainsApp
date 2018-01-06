import React from 'react';
import Card from './Card';
import DeployZone from './DeployZone';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class App extends React.Component {
    render() {
        return (
            <div id="theTrain">
                <div id="parts">
                    <div>
                        <Card type="engine" />
                        <Card type="carrier" />
                    </div>
                </div>
                <div id="deployZone">
                    <DeployZone />
                </div>
            </div>
        );
    }
}
export default DragDropContext(HTML5Backend)(App);