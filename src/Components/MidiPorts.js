import React from 'react'
import { Row, Col } from 'react-bootstrap'
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import ActionHDMI from 'material-ui/svg-icons/action/settings-input-hdmi';	
import { lightGreen500, red300 } from 'material-ui/styles/colors';
import { StyleSheet, css } from 'aphrodite';

var MidiPorts = (props) => {
	var ports = [];

	// enumerate midi ports
	if (props.midi !== null) {
		props.midi.inputs.forEach((port, index) => {
			ports.push(
				<Col key={index} md={6} sm={12}>
					<MenuItem
						onTouchTap={props.toggleMidi.bind(this, port, props.toggleMidi)}
						leftIcon={<ActionHDMI color={port.connection == 'open' ? lightGreen500 : red300}/>}
					>
						{port.name}
					</MenuItem>
				</Col>
				) 
		})
	}

  	return  <div>
  				<Row>
					{ports 
						? (<Menu autoWidth={true}>{ports}</Menu>)
						: <p>Unfortunately, this browser or device does not support MIDI. <br/>Please try opening the app in Chrome or Opera.</p> 
					}
				</Row>
			</div>
}

MidiPorts.propTypes = {
	midi: React.PropTypes.instanceOf(MIDIAccess),
	toggleMidi: React.PropTypes.func.isRequired,
}

export default MidiPorts;

/* Aphrodite Styles */
const styles = StyleSheet.create({
	
});

