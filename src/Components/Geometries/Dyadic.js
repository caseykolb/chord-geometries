import React, { Component } from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';
import NoteNode from './NoteNode'
import { buildDyads } from '../../Utils/NodeBuilder'
import arraysEqual from '../../Utils/ArraysEqual'

const Dyadic = React.createClass({
	shouldComponentUpdate(nextProps) {
		if (!arraysEqual(nextProps.activePCs, this.props.activePCs))
			return true;

		if (nextProps.active != this.props.active)
			return true;

		if (!arraysEqual(nextProps.setClasses, this.props.setClasses))
			return true;

		return false;
	},
	
  	render() {
  		if (!this.props.active)
			return	<group/>
		
		let nodes = buildDyads(this.props.octaveMod, this.props.activePCs);
  		
  		return  <group>
					{nodes.map((node, index) => {
				      	return <NoteNode key={index} position={node.position} color={node.color} label={node.label}/>
				    })}
       			</group>
       	}
})

Dyadic.propTypes = {
	active: React.PropTypes.bool.isRequired,
	octaveMod: React.PropTypes.number.isRequired,
	activePCs: React.PropTypes.array.isRequired,
	setClasses: React.PropTypes.arrayOf(React.PropTypes.array).isRequired
}

export default Dyadic;