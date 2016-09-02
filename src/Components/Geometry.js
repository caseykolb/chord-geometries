import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import THREE from 'three';
import React3 from 'react-three-renderer';
import TrackballControls from 'three-trackballcontrols';
import THREEResponsive from 'three-window-resize';

// Geometry Components
import Linear from './Geometries/Linear';
import Circular from './Geometries/Circular';
import Helical from './Geometries/Helical';
import Dyadic from './Geometries/Dyadic';
import DyadicSetClass from './Geometries/DyadicSetClass';
import Triadic from './Geometries/Triadic';
import TriadicChordTypes from './Geometries/TriadicChordTypes';
import Tetrachordal from './Geometries/Tetrachordal';
import NoteNode from './Geometries/NoteNode';

// Logic
import NoteMapping from '../Utils/NoteMapping';

// Utils
import arraysEqual from '../Utils/ArraysEqual'

export default class Geometry extends Component {
	constructor(props) {
    super(props);

    const cameraPositions = this.cameraPositions = {
      linear: new THREE.Vector3(-12, 2, 15),
      circular: new THREE.Vector3(0, 0, 50),
      helical: new THREE.Vector3(-52, 6.4, 47),
      dyadic: new THREE.Vector3(0.1, 8.2, 100),
      dyadicSetClass: new THREE.Vector3(0.1, 8.2, 100),
      triadic: new THREE.Vector3(31.6, 156, -120),
      triadicChordTypes: new THREE.Vector3(25, 108, -54),
      triadicSetClass: new THREE.Vector3(25, 108, -54),
      tetrachordal: new THREE.Vector3(25, 108, -54),
    }

    this.state = { 
    	cameraPosition: cameraPositions.linear,
      prevNotes: []
    }

    const fog = this.fog = new THREE.Fog(0x001525, 10, 40);
    const lightPosition = this.lightPosition = new THREE.Vector3(0, 10, 0);
    this.onAnimate = this.onAnimate.bind(this);
  }

  componentWillMount() {
    this.updateCameraPosition(this.props.activeGeometry)
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
    controls.maxDistance = 200;

    controls.addEventListener('change', (e) => {
      this.setState({ cameraPosition: this.refs.camera.position });
    });

    this.controls = controls;
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.activeGeometry !== this.props.activeGeometry) {
      this.updateCameraPosition(nextProps.activeGeometry)
    }

    // if no previous notes, or different number of incoming notes, reset previous stack
    if (this.state.prevNotes.length === 0 || this.state.prevNotes.length != nextProps.notes.length)
      this.setState({ prevNotes: nextProps.notes })
  }

  shouldComponentUpdate(nextProps, nextState) {
    return true;

    if (nextProps.activeGeometry !== this.props.activeGeometry)
      return true;

    if (arraysEqual(nextProps.activePCs, this.props.activePCs))
      return true;

    if (arraysEqual(nextProps.setClasses, this.props.setClasses))
      return true;
    
    return !arraysEqual(nextProps.notes, this.state.prevNotes);
  }

  updateCameraPosition(activeGeometry) {
    switch (activeGeometry) {
      case 'Linear':
        this.setState({ cameraPosition: this.cameraPositions.linear });
        break;
      case 'Circular':
        this.setState({ cameraPosition: this.cameraPositions.circular });
        break;
      case 'Helical':
        this.setState({ cameraPosition: this.cameraPositions.helical });
        break;
      case 'Dyadic':
        this.setState({ cameraPosition: this.cameraPositions.dyadic });
        break;
      case 'DyadicSetClass':
        this.setState({ cameraPosition: this.cameraPositions.dyadicSetClass });
        break;
      case 'Triadic':
        this.setState({ cameraPosition: this.cameraPositions.triadic });
        break;
      case 'TriadicChordTypes':
        this.setState({ cameraPosition: this.cameraPositions.triadicChordTypes });
        break;
      case 'TriadicSetClass':
        this.setState({ cameraPosition: this.cameraPositions.triadicSetClass });
        break;
      case 'Tetrachordal':
        this.setState({ cameraPosition: this.cameraPositions.tetrachordal });
        break;
      default:
        this.setState({ cameraPosition: this.cameraPositions.linear });
    }
  }

  onAnimate() {
  	this.controls.update();

    // check for note equivalence, if not, animate to new position
    if (!arraysEqual(this.props.notes, this.state.prevNotes)) {
      let notes = [];
      for (var i = 0; i < this.props.notes.length; i++) {
        let diff = this.props.notes[i] - this.state.prevNotes[i];
        let distToTravel = diff / 100;
        notes.push(this.state.prevNotes[i] + distToTravel)
      }
      this.setState({ prevNotes: notes })
    }
  }

  render() {
    let positions, label;

    switch (this.props.activeGeometry) {
      case 'Linear':
        positions = NoteMapping.linear(this.state.prevNotes, this.props.octaveMod);
        label = true;
        break;
      case 'Circular':
        positions = NoteMapping.circular(this.state.prevNotes, this.props.octaveMod);
        label = true;
        break;
      case 'Helical':
        positions = NoteMapping.helical(this.state.prevNotes, this.props.octaveMod);
        label = true;
        break;
      case 'Dyadic':
        positions = NoteMapping.dyadic(this.state.prevNotes, this.props.octaveMod);
        label = false;
        break;
      case 'DyadicSetClass':
        positions = NoteMapping.dyadicSetClass(this.state.prevNotes, this.props.octaveMod);
        label = false;
        break;
      case 'Triadic':
        positions = NoteMapping.triadic(this.state.prevNotes, this.props.octaveMod);
        label = false;
        break;
      case 'TriadicChordTypes':
        positions = NoteMapping.triadicChordTypes(this.state.prevNotes, this.props.octaveMod);
        label = false;
        if (positions.length === 2)
          positions = [positions[0]];
        break;
      case 'Tetrachordal':
        positions = NoteMapping.tetrachordal(this.state.prevNotes, this.props.octaveMod);
        label = false;
        if (positions.length === 2)
          positions = [positions[0]];
        break;
      default:
        positions = [];
        label = false;
    }

    const nodeColor = NoteMapping.color(this.state.prevNotes, this.props.octaveMod);


    return (
      <React3
      		ref="react3"
  	      mainCamera="camera"
  	      width={this.props.width}
  	      height={this.props.height}
          antialias={true}
  	      pixelRatio={window.devicePixelRatio}
  	      onAnimate={this.onAnimate}
          clearColor={this.fog.color}
  	  >
        <scene>
          <perspectiveCamera
          	ref="camera"
          	name="camera"
            fov={45}
            aspect={this.props.width / this.props.height}
            near={0.2}
            far={1000}
            position={this.state.cameraPosition}
          >
            <pointLight
                color={0xffffff}
                intensity={0.8}
                position={this.lightPosition}
              />
            <ambientLight
              color={0x4f4f4f}
            />
          </perspectiveCamera>
        	<Linear
            active={this.props.activeGeometry === 'Linear'}
            octaveMod={this.props.octaveMod}
          />
          <Circular
            active={this.props.activeGeometry === 'Circular'}
            octaveMod={this.props.octaveMod}
          />
          <Helical
            active={this.props.activeGeometry === 'Helical'}
            octaveMod={this.props.octaveMod}
          />
          <Dyadic
            active={this.props.activeGeometry === 'Dyadic'}
            octaveMod={this.props.octaveMod}
            activePCs={this.props.activePCs}
            setClasses={this.props.setClasses}
            cameraPosition={this.state.cameraPosition}
          />
          <DyadicSetClass
            active={this.props.activeGeometry === 'DyadicSetClass'}
            octaveMod={this.props.octaveMod}
            activePCs={this.props.activePCs}
            setClasses={this.props.setClasses}
            cameraPosition={this.state.cameraPosition}
          />
          <Triadic
            active={this.props.activeGeometry === 'Triadic'}
            octaveMod={this.props.octaveMod}
            activePCs={this.props.activePCs}
            setClasses={this.props.setClasses}
            voiceleading={this.props.voiceleading}
            cameraPosition={this.state.cameraPosition}
          />
          <TriadicChordTypes
            active={this.props.activeGeometry === 'TriadicChordTypes'}
            octaveMod={this.props.octaveMod}
            cameraPosition={this.state.cameraPosition}
          />
          <Tetrachordal
            active={this.props.activeGeometry === 'Tetrachordal'}
            octaveMod={this.props.octaveMod}
            activePCs={this.props.activePCs}
            setClasses={this.props.setClasses}
            cameraPosition={this.state.cameraPosition}
          />
          {positions.map((position, index) => {
              return <NoteNode 
                key={index} 
                position={position} 
                size={1.5}
                label={label ? Math.round(this.state.prevNotes[index]).toString() : null}
                mapLabel={true}
                cameraPosition={this.state.cameraPosition}
                color={nodeColor}
              />
          })}
        </scene>
      </React3>);
	}
}

Geometry.propTypes = {
  notes: React.PropTypes.array.isRequired,
  octaveMod: React.PropTypes.number.isRequired,
  animationSpeed: React.PropTypes.number.isRequired,
  width: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  voiceleading: React.PropTypes.object.isRequired
}
