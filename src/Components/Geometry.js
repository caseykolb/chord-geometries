import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';
import React3 from 'react-three-renderer';
import TrackballControls from 'three-trackballcontrols'

export default class Geometry extends Component {
	constructor(props) {
    super(props);
    this.fog = new THREE.Fog(0x001525, 10, 40);

    this.state = { 
    	cameraPosition: new THREE.Vector3(0, 0, 5)
    }
  }

  componentDidMount() {
  	// setup trackball controls
    const controls = new TrackballControls(this.refs.camera,
      ReactDOM.findDOMNode(this.refs.react3));

    controls.rotateSpeed = 2;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.2;
    controls.minDistance = 2;
    controls.maxDistance = 20;


    controls.addEventListener('change', () => {
      this.setState({
        cameraPosition: this.refs.camera.position,
      });
    });

    this.controls = controls;
  }

  _onAnimate = () => {
  	this.controls.update();
  }

  render() {
    const width = window.innerWidth; // canvas width
    const height = window.innerHeight; // canvas height

    return (
        <React3
      		ref="react3"
  	      mainCamera="camera"
  	      width={width}
  	      height={height}
  	      pixelRatio={window.devicePixelRatio}
  	      onAnimate={this._onAnimate}
          clearColor={this.fog.color}
  	       >
        <scene>
          <perspectiveCamera
          	ref="camera"
          	name="camera"
            fov={100}
            aspect={width / height}
            near={0.2}
            far={1000}
            position={this.state.cameraPosition}/>
          	<mesh>
  	          <boxGeometry
  	            width={1}
  	            height={1}
  	            depth={1} />
            <meshBasicMaterial color={0x00ff00} />
          </mesh>
        </scene>
      </React3>);
	}
}
