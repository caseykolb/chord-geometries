import React from 'react';
import { Grid, Row, Col, Image } from 'react-bootstrap'
import Dialog from 'material-ui/Dialog';
import { Tab, Tabs } from 'material-ui/Tabs';
import RaisedButton from 'material-ui/RaisedButton';
import IconButton from 'material-ui/IconButton';
import FontIcon from 'material-ui/FontIcon';
import Divider from 'material-ui/Divider';
import palette from '../Styles/Palette'
import { StyleSheet, css } from 'aphrodite';


var Info = (props) => {
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
	        		tooltip='Info (I)'
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
	        			info_outline
	        		</FontIcon>
			    </IconButton>
				<Dialog
					title='About Chord Geometries'
					open={props.isOpen} 
					actions={actions}
					onRequestClose={props.open}
					autoScrollBodyContent={true}
					contentStyle={{ width: '70%', maxWidth: 'none' }}
				>
				<Grid fluid>
					<Row className={css(styles.about)}>
						<Col md={8} sm={12}>
							<p>Chord Geometries is a companion app for Dmitri Tymoczko's book, <a target='_blank' href='http://dmitri.tymoczko.com/geometry-of-music.html'>A Geometry of Music</a>.</p>
							<br/>
							<h3>Basic Instructions</h3>
							<hr/>
							<p>
							1. Select a geometry.<br/>
							2. Use the virtual keyboard or a connected MIDI device to send notes to the model. Press spacebar to send notes from the virtual keyboard.<br/>
							3. Control the view of the model by clicking and dragging (or zooming with a trackpad).<br/>
							4. Use the 'Parameters' modal to control attributes specific to each geometry.
							</p>
							<br/>
							<h3>Additional Credits</h3>
							<hr/>
							<p>App developed by <a target='_blank' href='http://caseykolb.com'>Casey Kolb</a>.</p>
							<h6>
							View the <a target='_blank' href='https://github.com/caseykolb/chord-geometries'>github repository</a>.
							</h6>
						</Col>
						<Col md={4} sm={12}>
							<a 
								href='https://www.amazon.com/Geometry-Music-Counterpoint-Extended-Practice/dp/0195336674' 
								target='_blank'
							>
								<Image src='./assets/a-geometry-of-music-cover.jpg' 
									responsive
									rounded 
									className={css(styles.bookCover)}
								/>
							</a>
						</Col>
					</Row>
					<Row>
						
					</Row>
		    	</Grid>
			</Dialog>
		</div>)
}

Info.propTypes = {
	open: React.PropTypes.func.isRequired,
	isOpen: React.PropTypes.bool.isRequired
}

export default Info;

/* Aphrodite Styles */
const styles = StyleSheet.create({
	toggleButton: {
    	position: 'fixed',
		left: 180,
		zIndex: 10
	},
	about: {
		marginTop: '20px',
	},
});