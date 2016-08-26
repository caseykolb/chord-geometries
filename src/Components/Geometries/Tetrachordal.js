import React, { Component } from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';
import NoteNode from './NoteNode'
import NoteMapping from '../../Utils/NoteMapping';
import { buildTetrachords } from '../../Utils/NodeBuilder'
import arraysEqual from '../../Utils/ArraysEqual'

const Tetrachordal = React.createClass({
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

		let nodes = buildTetrachords(this.props.octaveMod, this.props.setClasses, this.props.activePCs);

		let mod = this.props.octaveMod / 3;
		let spacing = 16;
		let full = mod * spacing;
		let half = mod / 2 * spacing;

		// draw bounding box for triangular prism
		/*let vertices = [

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

Tetrachordal.propTypes = {
	active: React.PropTypes.bool.isRequired,
	octaveMod: React.PropTypes.number.isRequired,
	activePCs: React.PropTypes.array.isRequired,
	setClasses: React.PropTypes.arrayOf(React.PropTypes.array).isRequired
}

export default Tetrachordal;