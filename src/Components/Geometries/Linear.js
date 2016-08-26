import React from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';
import NoteNode from './NoteNode'

var Linear = (props) => {
	if (!props.active)
		return	<group/>

  const length = 100;
  const a = new THREE.Vector3(-length / 2, 0, 0);
  const b = new THREE.Vector3(length / 2, 0, 0);
  const vertices = [a, b];

  return    <group>
			  	<line>
			        <geometry vertices={vertices} />
			        <lineBasicMaterial color={"white"} linewidth={2}/>
			    </line>
       		</group>
}

Linear.propTypes = {
	active: React.PropTypes.bool.isRequired,
	octaveMod: React.PropTypes.number.isRequired
}

export default Linear;