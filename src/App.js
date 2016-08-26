// React
import React, { Component } from 'react';
import update from 'react-addons-update';
import hotkey from 'react-hotkey';

// React Components
import Geometry from './Components/Geometry'
import Piano from './Components/Piano'
import NoteTrace from './Components/NoteTrace'
import MasterSettings from './Components/MasterSettings'
import Parameters from './Components/Parameters'
import SelectGeometry from './Components/SelectGeometry'
import Info from './Components/Info'


// Utility Modules
import Midi from './Utils/Midi'
import Dat from 'dat-gui'
import TriadicSetClasses from './Utils/TriadicSetClasses'
import TetrachordalSetClasses from './Utils/TetrachordalSetClasses'
import Scales from './Utils/Scales'

// Themes and CSS
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { StyleSheet, css } from 'aphrodite';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      midiAccess: null,
      settings: false,
      parameters: false,
      selectGeometry: false,
      info: false,
      noteTrace: [[]], // stack of noteStacks
      renderStack: [], // note stack to render
      octaveMod: 12,
     	commandHeld: false,
     	animationSpeed: 2000, // in milliseconds
     	width: window.innerWidth,
     	height: window.innerHeight,
     	midiBase: 24,
     	octaves: window.innerWidth < 800 ? 2 : 5,
     	autoLength: 4,
     	activeGeometry: 'Triadic',
     	activePCs: Scales.chromatic,
     	setClasses: TriadicSetClasses.cube_dance,
     	voiceleading: {
	     	singleStepVL: true,
	     	twoVoiceParallel: false,
	     	twoVoiceContrary: false,
	     	threeVoiceParallel: false,
	     	threeVoiceContrary: false
     	}
    }

    this.handleMidiEvent = this.handleMidiEvent.bind(this);
    this.handlePianoEvent = this.handlePianoEvent.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.togglePitchClass = this.togglePitchClass.bind(this);
    this.toggleScale = this.toggleScale.bind(this);
    this.toggleSetClass = this.toggleSetClass.bind(this);
    this.toggleParameters = this.toggleParameters.bind(this);
    this.toggleSelectGeometry = this.toggleSelectGeometry.bind(this);
    this.toggleGeometry = this.toggleGeometry.bind(this);
    this.toggleInfo = this.toggleInfo.bind(this);
    this.removeSetClass = this.removeSetClass.bind(this);
    this.toggleSetClassPreset = this.toggleSetClassPreset.bind(this);

    this.hotkeyHandler = this.handleHotkey.bind(this);
    hotkey.activate('keydown');
    hotkey.activate('keyup');
    hotkey.activate('keypress');
  }

  componentDidMount() {
  	window.addEventListener('resize', this.handleResize.bind(this));
  	hotkey.addHandler(this.hotkeyHandler);
  	this.setupMIDI();
  	this.setupGUI();
  }

  componentWillUnmout() {
  	hotkey.removeHandler(this.hotkeyHandler);
    window.removeEventListener('resize', this.handleResize);
  }

  handleHotkey(e) {

  	// if 'Opt-1' is pressed, activeGeometry = Linear
  	if (e.which === 49 && e.type === 'keypress') {
  		console.log(this.state.commandHeld)
  		this.setState({ activeGeometry: 'Linear'})
  	}

  	// if 'Opt-2' is pressed, activeGeometry = Circular
  	if (e.which === 50 && e.type === 'keypress')
  		this.setState({ activeGeometry: 'Circular'})

  	// if 'Opt-3' is pressed, activeGeometry = Helical
  	if (e.which === 51 && e.type === 'keypress')
  		this.setState({ activeGeometry: 'Helical'})

  	// if 'Opt-4' is pressed, activeGeometry = DyadicSetClass
  	if (e.which === 52 && e.type === 'keypress')
  		this.setState({ activeGeometry: 'Dyadic'})

  	// if 'Opt-5' is pressed, activeGeometry = DyadicSetClass
  	if (e.which === 53 && e.type === 'keypress')
  		this.setState({ activeGeometry: 'DyadicSetClass'})

  	// if 'Opt-6' is pressed, activeGeometry = Triadic
  	if (e.which === 54 && e.type === 'keypress')
  		this.setState({ activeGeometry: 'Triadic'})

  	// if 'Opt-7' is pressed, activeGeometry = TriadicChordTypes
  	if (e.which === 55 && e.type === 'keypress')
  		this.setState({ activeGeometry: 'TriadicChordTypes'})

  	// if 'Opt-8' is pressed, activeGeometry = TriadicSetClass
  	if (e.which === 55 && e.type === 'keypress')
  		this.setState({ activeGeometry: 'TriadicSetClass'})

  	// if 'Opt-9' is pressed, activeGeometry = Tetrachordal
  	if (e.which === 55 && e.type === 'keypress')
  		this.setState({ activeGeometry: 'Tetrachordal'})

    // if spacebar is pressed, update renderStack
    if (e.which === 32 && e.type === 'keypress')
      this.shiftNoteTrace();

    // if command is down, allow unisons
    if (e.which === 91)
      this.setState({ commandHeld: e.type === 'keydown' ? true : false })

    // if 's' is pressed, toggle settings
    if (e.which === 115 && e.type === 'keypress')
      this.setState({ 
      	settings: !this.state.settings,
      	parameters: false,
      	selectGeometry: false,
      	info: false
      })

    // if 'p' is pressed, toggle parameters
    if (e.which === 112 && e.type === 'keypress')
      this.setState({ 
      	parameters: !this.state.parameters,
      	settings: false,
      	selectGeometry: false,
      	info: false
      })

   	// if 'g' is pressed, toggle selectGeometry
    if (e.which === 103 && e.type === 'keypress')
      this.setState({ 
      	selectGeometry: !this.state.selectGeometry,
      	settings: false,
      	parameters: false,
      	info: false
      })

    // if 'i' is pressed, togle info
    if (e.which === 105 && e.type === 'keypress') 
      this.setState({ 
      	info: !this.state.info,
      	settings: false,
      	parameters: false,
      	selectGeometry: false
      })
  }

  handleResize() {
  	var octaves = this.state.octaves;
  	if (window.innerWidth < 800)
  		octaves = 2;
  	else if (window.innerWidth > 1100)
  		octaves = 5;
  	else if (window.innerWidth > 1600)
  		octaves = 7;

  	this.setState({ 
  		width: window.innerWidth, 
  		height: window.innerHeight,
  		octaves: octaves
  	})
  }

  setupGUI() {
  	/*
  	var gui = this.gui = new Dat.GUI({width: 300});

  	var geometry = gui.addFolder('Geometry');

  	const geometries = ['Linear', 'Circular', 'Helical', 'Dyadic', 
  											'DyadicSetClass', 'Triadic', 'TriadicSetClass', 'Tetrachordal'];
  	let activeGeometry = geometry.add(this.state, 'activeGeometry', geometries).name('Active Geometry');
		activeGeometry.onChange((value) => { this.setState({ activeGeometry: value }) });

  	var piano = gui.addFolder('Piano');
  	let octaves = piano.add(this.state, 'octaves').min(2).max(7).step(1).name('Octaves').listen();
		octaves.onChange((value) => { this.setState({ octaves: value }) });

		let midiBase = piano.add(this.state, 'midiBase').min(0).max(36).step(12).name('MIDI Base').listen();
		midiBase.onChange((value) => { this.setState({ midiBase: value }) });

		let autoLength = piano.add(this.state, 'autoLength').min(1).max(12).step(1).name('AutoLength').listen();
		autoLength.onChange((value) => { this.setState({ autoLength: value }) });*/
  }

  setupMIDI() {
  	Midi.getInputs((midiAccess) => {
      this.setState({ midiAccess: midiAccess });

      midiAccess.onstatechange = () => { 
        this.setState({ midiAccess: midiAccess })
      };

      Midi.openAllPorts(midiAccess, this.handleMidiEvent.bind(this));
    });
  }

  handleMidiEvent(e) {
    let statusCode = e.data[0];
    let note = e.data[1];
    let noteTrace = this.state.noteTrace;

    // note on
    if (statusCode >= 144 && statusCode <= 159) {
    	noteTrace[0].push(note);
      this.setState({ noteTrace: noteTrace })
    }

    // note off
    if (statusCode >= 128 && statusCode <= 143) {
    	if (this.state.noteTrace[0].length !== 0)
      	this.shiftNoteTrace();
    }
  }

  handlePianoEvent(key, increment) {
  	let noteTrace = this.state.noteTrace;

    if (increment) {
    	noteTrace[0].push(key.note)
      this.setState({ noteTrace: noteTrace }, () => {
      	if (this.state.noteTrace[0].length >= this.state.autoLength)
      		this.shiftNoteTrace();
      })
    }
    else {
      let index = noteTrace[0].indexOf(key.note)
      
      if (index > -1) {
      	noteTrace[0].splice(index, 1);
      	this.setState({ noteTrace: noteTrace })     
      }
    }
  }

  shiftNoteTrace() {
  	let noteTrace = this.state.noteTrace;
  	if (noteTrace.length === 4)
  		noteTrace.pop();
  	noteTrace.unshift([]);
  	this.setState({ noteTrace: noteTrace }, () => {
  		this.setState({ renderStack: this.state.noteTrace[1] })
  	})
  }

  updateRenderStack() {
  	this.setState({ renderStack: this.state.noteTrace[0]})
  }

  toggleSettings() {
    this.setState({ settings: !this.state.settings })
  }

  togglePitchClass(pitchClass) {
  	let index = this.state.activePCs.indexOf(pitchClass)
  	if (index === -1)
  		this.setState({ activePCs: update(this.state.activePCs, {$push: [pitchClass]}) })
  	else
  		this.setState({ activePCs: update(this.state.activePCs, {$splice: [[index, 1]]}) })
  }

  toggleScale(scale) {
  	this.setState({ activePCs: scale })
  }

  toggleSetClass(e, setClass) {
  	console.log(setClass)
  }

  toggleParameters() {
    this.setState({ parameters: !this.state.parameters })
  }

  toggleSelectGeometry() {
    this.setState({ selectGeometry: !this.state.selectGeometry })
  }

  toggleGeometry(geometry) {
  	this.setState({ 
  		activeGeometry: geometry,
  		selectGeometry: false 
  	})
  }

  toggleInfo() {
    this.setState({ info: !this.state.info })
  }

  toggleSetClassPreset(e, index, preset) {
  	console.log(preset)
  	this.setState({ setClasses: preset })
  }

  removeSetClass(index) {
  	this.setState({ setClasses: update(this.state.setClasses, {$splice: [[index, 1]]}) })
  }

  addSetClass(setClass) {

  }

  render() {
    return (
    	<div className={css(styles.fullscreen)}>
    		<MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    			<div>
	          <MasterSettings 
	            open={this.toggleSettings} 
	            isOpen={this.state.settings}
	            activePCs={this.state.activePCs}
	            togglePitchClass={this.togglePitchClass}
	            toggleScale={this.toggleScale}
	            toggleSetClass={this.toggleSetClass}
	            midi={this.state.midiAccess}
	            toggleMidi={Midi.togglePort}
	            midiEventHandler={this.handleMidiEvent}
	          />
	          <Parameters
	          	open={this.toggleParameters}
	          	isOpen={this.state.parameters} 
	          	activeGeometry={this.state.activeGeometry}
	          	setClasses={this.state.setClasses}
	          	removeSetClass={this.removeSetClass}
	          	toggleSetClassPreset={this.toggleSetClassPreset}
	          />
	          <SelectGeometry
	          	open={this.toggleSelectGeometry}
	          	isOpen={this.state.selectGeometry}
	          	activeGeometry={this.state.activeGeometry}
	          	toggleGeometry={this.toggleGeometry}
	          />
	          <Info
	          	open={this.toggleInfo}
	          	isOpen={this.state.info} 
	          />
		       </div>
	      </MuiThemeProvider>
        <Geometry 
	        	notes={this.state.renderStack} 
	        	octaveMod={this.state.octaveMod}
	        	animationSpeed={this.state.animationSpeed}
	        	width={this.state.width}
	        	height={this.state.height}
	        	activeGeometry={this.state.activeGeometry}
	        	activePCs={this.state.activePCs}
	        	setClasses={this.state.setClasses}
	        	voiceleading={this.state.voiceleading}
	        />
	        {/*<NoteTrace 
	        	trace={this.state.noteTrace} 
	        	onClick={this.shiftNoteTrace.bind(this)}
	        />*/}
	        <Piano
	          octaves={this.state.octaves}
	          midiBase={this.state.midiBase}
	          height={130}
	          accentColor="#B4CDCD"
	          notes={this.state.noteTrace[0]}
	          onClick={this.handlePianoEvent}
	          addUnison={this.state.commandHeld}
	        />
      </div>
    );
  }
}

/* Aphrodite Styles */
const styles = StyleSheet.create({
    fullscreen: {
    	margin: 0,
      padding: 0,
    	height: '100%',
    	overflow: 'hidden'
    },
		modelSettings: {
    	position: 'fixed',
    	left: 48,
			zIndex: 10
		}
});