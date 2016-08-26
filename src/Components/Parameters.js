import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import Dialog from 'material-ui/Dialog';
import { Tab, Tabs } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import Chip from 'material-ui/Chip';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TriadicSetClasses from '../Utils/TriadicSetClasses'
import TetrachordalSetClasses from '../Utils/TetrachordalSetClasses'
import palette from '../Styles/Palette'
import { StyleSheet, css } from 'aphrodite';

var Parameters = (props) => {
	const actions = [
      <RaisedButton
        label="Save / Cache"
        backgroundColor={palette.primary}
        keyboardFocused={true}
        onTouchTap={props.open}
        labelStyle={{color: 'white'}}
      />,
    ];

	return (<div className={css(styles.toggleButton)}>
	        	<IconButton
	        		tooltip='Parameters (P)'
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
	        			settings_input_component
	        		</FontIcon>
			    </IconButton>
				<Dialog
					title='Parameters'
					actions={actions}
					open={props.isOpen} 
					onRequestClose={props.open}
					autoScrollBodyContent={true}
					contentStyle={{ width: '60%', maxWidth: 'none' }}
				>
				<Grid fluid>
					<Row>
						<Col sm={12} md={12}>
						<h3>Active Set Classes</h3>
						<div className={css(styles.chipWrapper)}>
							{props.setClasses.map((setClass, index) => {
								return <Chip
									        key={index}
									        style={{margin: 12}}
									        onRequestDelete={() => props.removeSetClass(index)}
									    >
									        {setClass.toString().replace(/,/g, ' ')}
									    </Chip>
							})}
						</div>
						</Col>
					</Row>
					<Row>
						<Col sm={12} md={6}>
							<SelectField
								floatingLabelText='Select a preset'
								value={props.setClasses} 
								onChange={props.toggleSetClassPreset}
								fullWidth={true}
							>
								<MenuItem value={TriadicSetClasses.cube_dance} primaryText="Cube Dance" />
						        <MenuItem value={TriadicSetClasses.hexatonic_cycles} primaryText="Hexatonic Cycles" />
						        <MenuItem value={TriadicSetClasses.tertian_trichords} primaryText="Tertian Trichords" />
						        <MenuItem value={TriadicSetClasses.intermediate_sets} primaryText="Intermediate Sets" />
						        <MenuItem value={TriadicSetClasses.scale_fragments} primaryText="Scale Fragments" />
						        <MenuItem value={TriadicSetClasses.I_symmetrical_trichords} primaryText="I-Symmetrical Trichords" />
						        <MenuItem value={TriadicSetClasses.all_trichords} primaryText="All Trichords (CPU Intensive)" />
						        <MenuItem value={TriadicSetClasses.multisets_only} primaryText="Multisets Only" />
						        <MenuItem value={TriadicSetClasses.trichords_and_multisets} primaryText="Trichords and Multisets (CPU Intensive)" />
						        <MenuItem value={TriadicSetClasses.diatonic_triads} primaryText="Diatonic Triads" />
						        <MenuItem value={TriadicSetClasses.acoustic_triads} primaryText="Acoustic Triads" />
						        <MenuItem value={TriadicSetClasses.octatonic_triads} primaryText="Octatonic Triads" />
						        <MenuItem value={TriadicSetClasses.whole_tone_quasi_triads} primaryText="Whole Tone Quasi-Triads" />
						        <MenuItem value={TriadicSetClasses.harmonic_minor_triads} primaryText="Harmonic Minor Triads" />
						        <MenuItem value={TriadicSetClasses.diatonic_consonances} primaryText="Diatonic Consonances" />
							</SelectField>
						</Col>
					</Row>
		    	</Grid>
			</Dialog>
		</div>)
}

Parameters.propTypes = {
	open: React.PropTypes.func.isRequired,
	isOpen: React.PropTypes.bool.isRequired,
	activeGeometry: React.PropTypes.string.isRequired
}

export default Parameters;

/* Aphrodite Styles */
const styles = StyleSheet.create({
	toggleButton: {
    	position: 'fixed',
		left: 60,
		zIndex: 10
	},
	chipWrapper: {
		display: 'flex',
        flexWrap: 'wrap',
	},
	chip: {
		margin: 4,
		'-webkit-transition': 'all 0.1s ease-in-out',
        '-moz-transition': 'all 0.1s ease-in-out',
	  	'-o-transition': 'all 0.1s ease-in-out',
	  	transition: 'all 0.1s ease-in-out'
	}
});