import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import Dialog from 'material-ui/Dialog';
import { Tab, Tabs } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import ActionHDMI from 'material-ui/svg-icons/action/settings-input-hdmi';
import { fullWhite, red500 } from 'material-ui/styles/colors';
import palette from '../Styles/Palette'
import { StyleSheet, css } from 'aphrodite';

import PitchClassSelect from './PitchClassSelect'
import ScaleSelect from './ScaleSelect'
import MidiPorts from './MidiPorts'

var MasterSettings = (props) => {
	const actions = [
      <RaisedButton
        label="Save / Cache"
        backgroundColor={palette.primary}
        keyboardFocused={true}
        onTouchTap={props.open}
        labelStyle={{color: 'white'}}
      />,
    ];

	return (<div>
				<div className={css(styles.toggleButton)}>
		        	<IconButton 
		        		tooltip='Settings (S)'
		        		tooltipPosition='bottom-right'
		        		touch={true}
		        		onTouchTap={props.open} 
		        		iconStyle={{ fontSize: '36px'}}
		        		style={{ width: '72px', height: '72px' }}
		        	>
		        		<FontIcon 
		        			className="material-icons" 
		        			color='rgba(255,255,255,0.5)' 
		        			hoverColor='rgba(255,255,255,1)'
		        		>
		        			settings
		        		</FontIcon>
				    </IconButton>
			    </div>
				<Dialog
					title='Master Settings'
					actions={actions}
					open={props.isOpen} 
					onRequestClose={props.open}
					autoScrollBodyContent={true}
					contentStyle={{ width: '60%', maxWidth: 'none' }}
				>
				<Grid fluid>
					<Row>
						<h3>Active Pitch Classes <span style={{fontSize: '10px'}}>(toggle)</span></h3>
						<PitchClassSelect
							activePCs={props.activePCs}
							togglePC={props.togglePitchClass}
						/>
					</Row>
					<br/>
					<Row>
						<p>Shortcuts to Familiar Scales</p>
						<ScaleSelect
							activePCs={props.activePCs}
							toggleScale={props.toggleScale}
						/>
					</Row>
					<hr/>
					<Row>
						<h3>Connected MIDI Inputs <span style={{fontSize: '10px'}}>(toggle)</span></h3>
			    		<MidiPorts 
			    			midi={props.midi} 
			    			toggleMidi={props.toggleMidi} 
			    		/>
			    	</Row>
		    	</Grid>
			</Dialog>
		</div>)
}

MasterSettings.propTypes = {
	open: React.PropTypes.func.isRequired,
	isOpen: React.PropTypes.bool.isRequired,
	midi: React.PropTypes.instanceOf(MIDIAccess),
	toggleMidi: React.PropTypes.func.isRequired,
	midiEventHandler: React.PropTypes.func.isRequired
}

export default MasterSettings;

/* Aphrodite Styles */
const styles = StyleSheet.create({
	toggleButton: {
    	position: 'fixed',
		left: 0,
		zIndex: 10
	},
});