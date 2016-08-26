import React from 'react';
import { Grid, Row, Col } from 'react-bootstrap'
import Dialog from 'material-ui/Dialog';
import { Tab, Tabs } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import palette from '../Styles/Palette'
import { StyleSheet, css } from 'aphrodite';

var SelectGeometry = (props) => {
	const actions = [
      <RaisedButton
        label="Close"
        backgroundColor={palette.primary}
        keyboardFocused={true}
        onTouchTap={props.open}
        labelStyle={{color: 'white'}}
      />,
    ];

	return (<div className={css(styles.toggleButton)}>
	        	<IconButton
	        		tooltip='Geometries (G)'
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
	        			view_list
	        		</FontIcon>
			    </IconButton>
				<Dialog
					title='Select A Geometry'
					actions={actions}
					open={props.isOpen} 
					onRequestClose={props.open}
					autoScrollBodyContent={true}
					contentStyle={{ width: '60%', maxWidth: 'none' }}
				>
				<Grid fluid>
					<Row className={css(styles.geometries)}>
						<Col sm={4} md={4}>
							<div 
								className={css(props.activeGeometry == 'Linear' ? styles.active : {}, styles.geometryBox)} 
								onClick={props.toggleGeometry.bind(this, 'Linear')}
							>
				        		<h3>Linear</h3>
						    </div>
						</Col>
						<Col sm={4} md={4}>
							<div 
								className={css(props.activeGeometry == 'Circular' ? styles.active : {}, styles.geometryBox)} 
								onClick={props.toggleGeometry.bind(this, 'Circular')}
							>
				        		<h3>Circular</h3>
						    </div>
						</Col>
						<Col sm={4} md={4}>
							<div 
								className={css(props.activeGeometry == 'Helical' ? styles.active : {}, styles.geometryBox)} 
								onClick={props.toggleGeometry.bind(this, 'Helical')}
							>
				        		<h3>Helical</h3>
						    </div>
						</Col>
					</Row>
					<hr/>
					<Row>
						<Col sm={4} md={4}>
							<div 
								className={css(props.activeGeometry == 'Dyadic' ? styles.active : {}, styles.geometryBox)} 
								onClick={props.toggleGeometry.bind(this, 'Dyadic')}
							>
				        		<h3>Dyadic</h3>
						    </div>
						</Col>
						<Col sm={4} md={4}>
							<div 
								className={css(props.activeGeometry == 'DyadicSetClass' ? styles.active : {}, styles.geometryBox)} 
								onClick={props.toggleGeometry.bind(this, 'DyadicSetClass')}
							>
				        		<h3>Dyadic Set Class</h3>
						    </div>
						</Col>
					</Row>
					<hr/>
					<Row>
						<Col sm={4} md={4}>
							<div 
								className={css(props.activeGeometry == 'Triadic' ? styles.active : {}, styles.geometryBox)} 
								onClick={props.toggleGeometry.bind(this, 'Triadic')}
							>
				        		<h3>Triadic</h3>
						    </div>
						</Col>
						<Col sm={4} md={4}>
							<div 
								className={css(props.activeGeometry == 'TriadicChordTypes' ? styles.active : {}, styles.geometryBox)} 
								onClick={props.toggleGeometry.bind(this, 'TriadicChordTypes')}
							>
				        		<h3>Triadic Chord Types</h3>
						    </div>
						</Col>
						<Col sm={4} md={4}>
							<div 
								className={css(props.activeGeometry == 'TriadicSetClass' ? styles.active : {}, styles.geometryBox)} 
								onClick={props.toggleGeometry.bind(this, 'TriadicSetClass')}
							>
				        		<h3>Triadic Set Class</h3>
						    </div>
						</Col>
					</Row>
		    	</Grid>
			</Dialog>
		</div>)
}

SelectGeometry.propTypes = {
	open: React.PropTypes.func.isRequired,
	isOpen: React.PropTypes.bool.isRequired,
	activeGeometry: React.PropTypes.string.isRequired,
	toggleGeometry: React.PropTypes.func.isRequired,
}

export default SelectGeometry;

/* Aphrodite Styles */
const styles = StyleSheet.create({
	toggleButton: {
    	position: 'fixed',
		left: 120,
		zIndex: 10
	},
	geometries: {
		marginTop: '20px'
	},
	geometryBox: {
		display: 'flex',
		'justify-content': 'center',
		'align-items': 'center',
		background: 'rgba(0, 0, 0, 0.5)',
		height: '120px',
		'-webkit-transition': 'all 0.1s ease-in-out',
        '-moz-transition': 'all 0.1s ease-in-out',
	  	'-o-transition': 'all 0.1s ease-in-out',
	  	transition: 'all 0.1s ease-in-out',
		':hover': {
			cursor: 'pointer',
			background: 'rgba(0, 0, 0, 0.9)',
			'-webkit-transition': 'all 0.1s ease-in-out',
            '-moz-transition': 'all 0.1s ease-in-out',
		  	'-o-transition': 'all 0.1s ease-in-out',
		  	transition: 'all 0.1s ease-in-out'
		}
	},
	active: {
        borderBottom: '3px solid ' + palette.primary,
        WebkitTransition: 'all 0.1s ease-in-out',
        MozTransition: 'all 0.1s ease-in-out',
        OTransition: 'all 0.1s ease-in-out',
        transition: 'all 0.1s ease-in-out'
    },
});