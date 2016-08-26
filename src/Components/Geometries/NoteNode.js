import React from 'react';
import THREE from 'three';
import TinyColor from 'tinycolor2';
import React3 from 'react-three-renderer';

var NoteNode = (props) => {
	if (props.label !== null) {
		var canvas = document.createElement('canvas');
		canvas.width  = 256;
		canvas.height = 256;
        var context = canvas.getContext('2d');
        context.font = "80px Arial";
        context.lineWidth = 2;
        context.fillStyle = TinyColor(props.color).lighten(20).toString();
        context.fillText(props.label, 50, 80);
        var dataURL = canvas.toDataURL();
        var labelPos = new THREE.Vector3(props.position.x, props.position.y + 1, 0)
	}

  	return 	<group>
  				{props.label !== undefined ? 
  					<sprite position={labelPos} scale={new THREE.Vector3(4, 4, 1)}>
  						<spriteMaterial>
  							<texture url={dataURL}/>
  						</spriteMaterial>
  					</sprite>
  					: <group/>
  				}
  				<mesh position={props.position}>
  					<sphereGeometry radius={props.size !== undefined ? props.size : 1} widthSegments={32} heightSegments={32} />
          			<meshPhongMaterial color={props.color} />
        		</mesh>
        	</group>
}

NoteNode.propTypes = {
	position: React.PropTypes.instanceOf(THREE.Vector3).isRequired,
	label: React.PropTypes.string,
	size: React.PropTypes.number,
	color: React.PropTypes.string.isRequired
}

export default NoteNode;