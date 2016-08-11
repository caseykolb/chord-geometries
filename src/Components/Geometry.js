import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';
import React3 from 'react-three-renderer';
import TrackballControls from 'three-trackballcontrols'

// Geometry Components
import Linear from './Geometries/Linear'
import Circular from './Geometries/Circular'
import Helical from './Geometries/Helical'

export default class Geometry extends Component {
	constructor(props) {
    super(props);
    this.fog = new THREE.Fog(0x001525, 10, 40);

    const cameraPositions = {
      linear: new THREE.Vector3(-12, 2, 15),
      circular: new THREE.Vector3(0, 0, 50)
    }

    this.state = { 
    	cameraPosition: cameraPositions.circular,
      activeGeometry: null
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
    controls.minDistance = 8;
    controls.maxDistance = 80;


    controls.addEventListener('change', (e) => {
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

    const lightPosition = new THREE.Vector3(0, 10, 0)

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
            fov={45}
            aspect={width / height}
            near={0.2}
            far={1000}
            position={this.state.cameraPosition}
          >
            <pointLight
                color={0xffffff}
                intensity={0.8}
                position={lightPosition}
              />
            <ambientLight
              color={0x4f4f4f}
            />

          </perspectiveCamera>
        	<Linear 
            notes={this.props.notes}
            color={"white"}
          />
        </scene>
      </React3>);
	}
}

Geometry.propTypes = {
  notes: React.PropTypes.array.isRequired,
  octave: React.PropTypes.number.isRequired,
}
