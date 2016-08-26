import React from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';
import NoteNode from './NoteNode'

var Circular = (props) => {
	if (!props.active)
		return	<group/>

	const radius = 16;
	const segments = 128;

	let circleGeometry = new THREE.CircleGeometry(radius, segments);
  	circleGeometry.vertices.shift(); // remove center vertex

	return <group>
				<line>
				    <circleGeometry vertices={circleGeometry.vertices}/>
				    <lineBasicMaterial color={props.color} linewidth={2}/>
				</line>   
			</group>
}

Circular.propTypes = {
	active: React.PropTypes.bool.isRequired,
	octaveMod: React.PropTypes.number.isRequired
}

export default Circular;