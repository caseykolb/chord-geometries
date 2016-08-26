import React, { Component } from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';
import NoteNode from './NoteNode'
import NoteMapping from '../../Utils/NoteMapping';
import { buildTriads, buildVoiceLeading } from '../../Utils/NodeBuilder'
import arraysEqual from '../../Utils/ArraysEqual'

const Triadic = React.createClass({
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

		let nodes = buildTriads(this.props.octaveMod, this.props.setClasses, this.props.activePCs);
		let voiceLeadingLines = buildVoiceLeading(nodes, this.props.voiceleading, this.props.octaveMod);

		// draw bounding box for triangular prism
		let vertices = [
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
		]

  		return  <group>
  				<line>
			        <geometry vertices={vertices} />
			        <lineBasicMaterial color={"white"} linewidth={2}/>
			    </line>
				{nodes.map((node, index) => {
			      	return <NoteNode key={index} position={node.position} color={node.color}/>
			    })}
			    {voiceLeadingLines.map((verts, index) => {
			    	return  <line key={index}>
			        			<geometry vertices={verts} />
			        			<lineBasicMaterial color={"white"} linewidth={0.2}/>
			    			</line>
			    })}

       		</group>
       	}
})

Triadic.propTypes = {
	active: React.PropTypes.bool.isRequired,
	octaveMod: React.PropTypes.number.isRequired,
	activePCs: React.PropTypes.array.isRequired,
	setClasses: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
	voiceleading: React.PropTypes.object.isRequired
}

export default Triadic;