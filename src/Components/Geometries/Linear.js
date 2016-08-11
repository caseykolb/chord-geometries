import React from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';
import NoteNode from './NoteNode'
import { LinearNoteMapping } from '../../Utils/NoteMapping'

var Linear = (props) => {
  const length = 100;
  const a = new THREE.Vector3(-length / 2, 0, 0);
  const b = new THREE.Vector3(length / 2, 0, 0);
  const vertices = [a, b];
  const positions = LinearNoteMapping(props.notes, vertices)

  return  <group>
			  		<line>
			        <geometry vertices={vertices} />
			        <meshLambertMaterial color={props.color} />
			      </line>
			      {positions.map((position, index) => {
			      	return <NoteNode key={index} position={position} color={"#00ff00"}/>
			      })}
       		</group>
}

Linear.propTypes = {
	notes: React.PropTypes.array.isRequired,
	color: React.PropTypes.string.isRequired
}

export default Linear;