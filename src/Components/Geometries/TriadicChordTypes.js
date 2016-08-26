import React, { Component } from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';
import NoteNode from './NoteNode'
import NoteMapping from '../../Utils/NoteMapping';
import { buildTriadicChordTypes } from '../../Utils/NodeBuilder'
import arraysEqual from '../../Utils/ArraysEqual'

const TriadicChordTypes = React.createClass({
	shouldComponentUpdate(nextProps) {
		return nextProps.active != this.props.active;
	},
	
  	render() {
  		if (!this.props.active)
			return	<group/>

		let nodes = buildTriadicChordTypes(this.props.octaveMod, this.props.setClasses, this.props.activePCs);

		let mod = this.props.octaveMod / 3;
		let spacing = 16;
		let full = mod * spacing;
		let half = mod / 2 * spacing;

		// draw bounding box for triangular prism
		/*let vertices = [
			NoteMapping.triadic([0, 0, 0], this.props.octaveMod)[0],
			NoteMapping.triadic([4, 4, 4], this.props.octaveMod)[0],
			NoteMapping.triadic([8, 8, 8], this.props.octaveMod)[0],
			new THREE.Vector3(0, 0, 96),
			new THREE.Vector3(-32, -32, 64),
			NoteMapping.triadic([0, 0, 0], this.props.octaveMod)[0],
			NoteMapping.triadic([4.001, 4.001, 4.001], this.props.octaveMod)[0],
			NoteMapping.triadic([7.999, 7.999, 7.999], this.props.octaveMod)[0],
			NoteMapping.triadic([4.001, 4.001, 4.001], this.props.octaveMod)[0],
			NoteMapping.triadic([8.001, 8.001, 8.001], this.props.octaveMod)[0],
			NoteMapping.triadic([11.999, 11.999, 11.999], this.props.octaveMod)[0],
			NoteMapping.triadic([3.999, 3.999, 3.999], this.props.octaveMod)[0],
		]*/

  		return  <group>
  				{/*<line>
			        <geometry vertices={vertices} />
			        <lineBasicMaterial color={"white"} linewidth={2}/>
			    </line>*/}
				{nodes.map((node, index) => {
			      	return <NoteNode key={index} position={node.position} color={node.color}/>
			    })}

       		</group>
       	}
})

TriadicChordTypes.propTypes = {
	active: React.PropTypes.bool.isRequired,
	octaveMod: React.PropTypes.number.isRequired
}

export default TriadicChordTypes;