import React from 'react';
import THREE from 'three';
import TinyColor from 'tinycolor2';
import React3 from 'react-three-renderer';

const NoteNode = (props) => {
	if (props.label !== null && props.label !== undefined) {
		if (!props.mapLabel) {
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

	  	else if (props.mapLabel) {
	  		var canvas = document.createElement('canvas');
			canvas.width  = 512;
			canvas.height = 512;
	        var context = canvas.getContext('2d');
	        context.beginPath();
			context.rect(0, 0, 512, 512);
			context.fillStyle = props.color;
			context.fill();
	        context.font = "80px Arial";
	        context.lineWidth = 2;
	        context.fillStyle = "#FFFFFF";
	        context.fillText(props.label, 90, 256);

	        var dataURL = canvas.toDataURL();
	        var labelPos = new THREE.Vector3(props.position.x, props.position.y + 1, 0)
	  	}
  	}

	return 	<group>
				{	props.label !== undefined && props.label !== null && !props.mapLabel ? 
					<sprite position={labelPos} scale={new THREE.Vector3(4, 4, 1)}>
						<spriteMaterial>
							<texture url={dataURL}/>
						</spriteMaterial>
					</sprite>
					: <group/>
				}
				<mesh 
					position={props.position}
					lookAt={props.cameraPosition}
				>
					<sphereGeometry 
						radius={props.size !== undefined ? props.size : 1} 
						widthSegments={32} 
						heightSegments={32} 
					/>
					{ 	props.label !== undefined && props.label !== null && props.mapLabel
						?	<meshPhongMaterial color={props.color} >
		        				<texture url={dataURL} />
		        			</meshPhongMaterial>
	        			:	<meshPhongMaterial color={props.color} />
	        		}
      			</mesh>
      		</group>
}

NoteNode.propTypes = {
	position: React.PropTypes.instanceOf(THREE.Vector3).isRequired,
	label: React.PropTypes.string,
	size: React.PropTypes.number,
	color: React.PropTypes.string.isRequired,
	cameraPosition: React.PropTypes.instanceOf(THREE.Vector3)
}

export default NoteNode;