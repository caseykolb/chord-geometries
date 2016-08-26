import React from 'react';
import THREE from 'three';
import React3 from 'react-three-renderer';
import NoteNode from './NoteNode'

var Helical = (props) => {
	if (!props.active)
		return	<group/>

	const radius = 16;
    let zPos = -100;
    let zDelta = 0.1;
    
    // divide cycles so that octaves align
    let cycles = 128 / props.octaveMod;
    let perCycle = props.octaveMod * 12; // define an arbitrary smaller granule for vertices
    let geometry = new THREE.Geometry();

    // build spiral vertices
    for (var i = 0; i < cycles * perCycle; i++) {
        // normalize perCycle to 0 from 2PI
        var x = radius * Math.cos(Math.PI * 2  * (i / perCycle));
        var y = radius * -Math.sin(Math.PI * 2 * (i / perCycle));
        var z = zPos += zDelta;
        geometry.vertices.push(new THREE.Vector3(x, y, z))
    }

  	return  <group>
  				<line>
				    <geometry vertices={geometry.vertices}/>
				    <lineBasicMaterial color={props.color} linewidth={2}/>
				</line>
  			</group>
}

Helical.propTypes = {
	active: React.PropTypes.bool.isRequired,
	octaveMod: React.PropTypes.number.isRequired,
}

export default Helical;