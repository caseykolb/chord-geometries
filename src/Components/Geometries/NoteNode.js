import React from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';

var NoteNode = (props) => {
  return 	<mesh position={props.position}>
  					<sphereGeometry radius={1} widthSegments={32} heightSegments={32}/>
          	<meshPhongMaterial color={props.color} />
        	</mesh>
}

NoteNode.propTypes = {
	position: React.PropTypes.instanceOf(THREE.Vector3).isRequired,
	color: React.PropTypes.string.isRequired
}

export default NoteNode;