import React from 'react';
import ToggleButton from './ToggleButton'
import RaisedButton from 'material-ui/RaisedButton';
import scales from '../Utils/Scales'
import { StyleSheet, css } from 'aphrodite';

var PitchClassSelect = (props) => {
  	return 	<div>
  				<ToggleButton label='0' 
  					active={props.activePCs.includes(0)} onClick={props.togglePC} />
  				<ToggleButton label='1' 
  					active={props.activePCs.includes(1)} onClick={props.togglePC} />
  				<ToggleButton label='2' 
  					active={props.activePCs.includes(2)} onClick={props.togglePC} />
  				<ToggleButton label='3' 
  					active={props.activePCs.includes(3)} onClick={props.togglePC} />
  				<ToggleButton label='4' 
  					active={props.activePCs.includes(4)} onClick={props.togglePC} />
  				<ToggleButton label='5'
  					active={props.activePCs.includes(5)} onClick={props.togglePC} />
  				<ToggleButton label='6' 
  					active={props.activePCs.includes(6)} onClick={props.togglePC} />
  				<ToggleButton label='7' 
  					active={props.activePCs.includes(7)} onClick={props.togglePC} />
  				<ToggleButton label='8'
  					active={props.activePCs.includes(8)} onClick={props.togglePC} />
  				<ToggleButton label='9'
  					active={props.activePCs.includes(9)} onClick={props.togglePC} />
  				<ToggleButton label='10' 
  					active={props.activePCs.includes(10)} onClick={props.togglePC} />
  				<ToggleButton label='11'
  					active={props.activePCs.includes(11)} onClick={props.togglePC} />
  			</div>
}

PitchClassSelect.propTypes = {
	activePCs: React.PropTypes.array.isRequired,
}

export default PitchClassSelect;


/* Aphrodite Styles */
const styles = StyleSheet.create({

});	
