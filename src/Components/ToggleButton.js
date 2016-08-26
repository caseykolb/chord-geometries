import React from 'react';
import { StyleSheet, css } from 'aphrodite';
import palette from '../Styles/Palette'
import TinyColor from 'tinycolor2';

var ToggleButton = (props) => {
	const className = css(
		props.active ? styles.active : styles.inactive,
		props.active ? styles.hoverActive : styles.hoverInactive,
		styles.button
	);

	const value = parseInt(props.label)

  	return 	<div className={className} onClick={props.onClick.bind(this, value)}>
  				<span className={css(styles.label)}>{props.label}</span>
  			</div>
}

ToggleButton.propTypes = {
	label: React.PropTypes.string.isRequired,
	active: React.PropTypes.bool.isRequired
}

export default ToggleButton;


/* Aphrodite Styles */
const styles = StyleSheet.create({
	button: {
		marginRight: '5px',
		display: 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		float: 'left',
		textAlign: 'center',
		color: 'white',
		width: '30px',
		height: '30px',
		cursor: 'pointer',
		borderRadius: '50%',
		'-webkit-transition': 'all 0.1s ease-in-out',
        '-moz-transition': 'all 0.1s ease-in-out',
	  	'-o-transition': 'all 0.1s ease-in-out',
	  	transition: 'all 0.1s ease-in-out',

		
	},
	hoverActive: {
		':hover': {
            background: TinyColor(palette.primary).brighten(10).toString(),
            '-webkit-transition': 'all 0.1s ease-in-out',
            '-moz-transition': 'all 0.1s ease-in-out',
		  	'-o-transition': 'all 0.1s ease-in-out',
		  	transition: 'all 0.1s ease-in-out'
        }
    },
    hoverInactive: {
		':hover': {
	        background: TinyColor(palette.secondary).brighten(10).toString(),
	        '-webkit-transition': 'all 0.1s ease-in-out',
	        '-moz-transition': 'all 0.1s ease-in-out',
		  	'-o-transition': 'all 0.1s ease-in-out',
		  	transition: 'all 0.1s ease-in-out'
    	}
    },  
	active: {
		background: palette.primary
	},
	inactive: {
		background: 'transparent'
	}
});