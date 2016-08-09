import React, { Component } from 'react';
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
	if (props.midi !== null) {
		var ports = []
		props.midi.inputs.forEach((port, index) => {
			ports.push(
				<MenuItem
					key={index} 
					onTouchTap={props.toggleMidi.bind(this, port)}
					leftIcon={<ActionHDMI color={port.connection == 'open' ? lightGreen500 : red300}/>}
				>
					{port.name}
				</MenuItem>)
		})
	}

	return (<div>
		<RaisedButton
			onTouchTap={props.toggle}
	      	backgroundColor="#a4c639"
	      	icon={<ActionSettings color={fullWhite} />}
	    />
		<Drawer
			docked={false}
		  	width={300}
		  	open={props.open}
		  	onRequestChange={props.toggle}
		>
			<h2 className={css(styles.title)}>MIDI Inputs</h2>
			{ports 
				? (<Menu autoWidth={true}>
						{ports}
					</Menu>)
				: <h4>Unfortunately, this browser or device does not support MIDI. <br/>Please try opening the app in Chrome or Opera.</h4> 
			}
		</Drawer>
	</div>)
}

export default Settings;

/* Aphrodite Styles */
const styles = StyleSheet.create({
    title: {
    	'text-align': 'center'
    }
});