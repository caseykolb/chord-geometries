import React, { Component } from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';
import NoteNode from './NoteNode'
import NoteMapping from '../../Utils/NoteMapping';
import { buildTriadicChordTypes } from '../../Utils/NodeBuilder'
import arraysEqual from '../../Utils/ArraysEqual'

export default class TriadicChordTypes extends Component {
  	constructor() {
    	super();

    	this.state = {
    		nodes: []
    	}
    }

    componentWillMount() {
    	let nodes = [];
    	if (this.props.active)
    		nodes = buildTriadicChordTypes(this.props.octaveMod, this.props.setClasses, this.props.activePCs);

    	this.setState({ nodes: nodes })
    }

	shouldComponentUpdate(nextProps) {
		return nextProps.active != this.props.active;
	}
	
  	render() {
  		if (!this.props.active) {
			return	<group/>
  		}
		
  		return  <group>
					{this.state.nodes.map((node, index) => {
				      	return  <NoteNode 
				      				key={index} 
				      				position={node.position} 
				      				label={node.label} 
				      				mapLabel={true} 
				      				color={node.color}
				      				cameraPosition={this.props.cameraPosition}
				      			/>
				    })}
       			</group>
    }
}

TriadicChordTypes.propTypes = {
	active: React.PropTypes.bool.isRequired,
	octaveMod: React.PropTypes.number.isRequired,
	cameraPosition: React.PropTypes.instanceOf(THREE.Vector3)
}

export default TriadicChordTypes;