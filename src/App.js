// React
import React, { Component } from 'react';
import update from 'react-addons-update';

// Components
import Geometry from './Components/Geometry'
import Piano from './Components/Piano'
import NoteStack from './Components/NoteStack'
import Controls from './Components/Controls'
import Settings from './Components/Settings'

// Utilities
import Midi from './Utils/Midi'

// Themes and CSS
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { StyleSheet, css } from 'aphrodite';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      midiAccess: null,
      settings: false,
      noteStack: [],
      keys: new Array(128),
      commandHeld: false
    }
  }

  componentWillMount() {
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

    // note on
    if (statusCode >= 144 && statusCode <= 159)
      this.setState({ noteStack: this.state.noteStack.concat([note]) })

    // note off
    if (statusCode >= 128 && statusCode <= 143) {
      let index = this.state.noteStack.indexOf(note)
      if (index > -1)
        this.setState({ 
          noteStack: update(this.state.noteStack, { $splice: [[index, 1]] }) 
        })
    }
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
            open={this.toggleSettings.bind(this)} 
            isOpen={this.state.settings} 
            midi={this.state.midiAccess}
            toggleMidi={Midi.togglePort}
            midiEventHandler={this.handleMidiEvent.bind(this)}
          />
        </MuiThemeProvider>
        <NoteStack notes={this.state.noteStack} />
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