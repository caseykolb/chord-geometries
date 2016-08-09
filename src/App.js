import React, { Component } from 'react';
import Geometry from './Components/Geometry'
import Piano from './Components/Piano'
import Controls from './Components/Controls'
import Settings from './Components/Settings'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StyleSheet, css } from 'aphrodite';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      midi: null,
      settings: false,
    }
  }

  componentWillMount() {
    this.configureMidi()
  }

  configureMidi() {
    if(navigator.requestMIDIAccess !== undefined) {
      navigator.requestMIDIAccess({sysex:true}).then(
      (midiAccess) => { 
        this.setState({ midi: midiAccess });

        midiAccess.onstatechange = (e) => {
          this.setState({ midi: midiAccess })
        };

        midiAccess.inputs.forEach((port) => {
            this.toggleMidiPort(port)
        })
      },
      (error) => { console.log('Oops: ' + error.statusCode) });
    }
  }

  toggleMidiPort(port) {
    if (port == null || port.type != 'input')
      return

    if (port.connection === 'closed') {
      port.open();
      port.onmidimessage = this.handleMidiEvent;
    }
    else
      port.close();
  }

  handleMidiEvent(e) {
    console.log(e)
  }

  toggleSettings() {
    this.setState({ settings: !this.state.settings })
  }

  render() {
    return (
    	<div className={css(styles.fullscreen)}>
        <Controls />
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <Settings 
            toggle={this.toggleSettings.bind(this)} 
            open={this.state.settings} 
            midi={this.state.midi}
            toggleMidi={this.toggleMidiPort.bind(this)}
          />
        </MuiThemeProvider>
        <Piano 
          octaves={4}
          midiBase={36}
          accentColor="#add8e6"
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
    }
});