import React from 'react';
import Drawer from 'material-ui/Drawer';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';
import ActionSettings from 'material-ui/svg-icons/action/settings';
import ActionHDMI from 'material-ui/svg-icons/action/settings-input-hdmi';
import { fullWhite, lightGreen500, red300 } from 'material-ui/styles/colors';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { StyleSheet, css } from 'aphrodite';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

var Settings = (props) => {

	// enumerate midi ports
	if (props.midi !== null) {
		var ports = []
		props.midi.inputs.forEach((port, index) => {
			ports.push(
				<MenuItem
					key={index} 
					onTouchTap={props.toggleMidi.bind(this, port, props.midiEventHandler)}
					leftIcon={<ActionHDMI color={port.connection == 'open' ? lightGreen500 : red300}/>}
				>
					{port.name}
				</MenuItem>)
		})
	}

	return (<div>
		<RaisedButton
			onTouchTap={props.open}
	    backgroundColor="#a4c639"
	    icon={<ActionSettings color={fullWhite} />}
	    />
		<Drawer
			docked={false}
		  width={300}
		  open={props.isOpen}
		  onRequestChange={props.open}
		>
			<h2 className={css(styles.title)}>MIDI Inputs</h2>
			{ports 
				? (<Menu autoWidth={true}>{ports}</Menu>)
				: <h4>Unfortunately, this browser or device does not support MIDI. <br/>Please try opening the app in Chrome or Opera.</h4> 
			}
		</Drawer>
	</div>)
}

Settings.propTypes = {
	open: React.PropTypes.func.isRequired,
	isOpen: React.PropTypes.bool.isRequired,
	midi: React.PropTypes.instanceOf(MIDIAccess),
	toggleMidi: React.PropTypes.func.isRequired,
	midiEventHandler: React.PropTypes.func.isRequired
}

export default Settings;

/* Aphrodite Styles */
const styles = StyleSheet.create({
    title: {
    	'text-align': 'center'
    }
});