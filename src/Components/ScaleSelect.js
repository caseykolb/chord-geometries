import React from 'react';
import { Row, Col } from 'react-bootstrap'
import RaisedButton from 'material-ui/RaisedButton';
import scales from '../Utils/Scales'
import arraysEqual from '../Utils/ArraysEqual'
import palette from '../Styles/Palette'
import { StyleSheet, css } from 'aphrodite';

var ScaleSelect = (props) => {

    const activeStyle = { 
        borderBottom: '3px solid ' + palette.primary,
        WebkitTransition: 'all 0.1s ease-in-out',
        MozTransition: 'all 0.1s ease-in-out',
        OTransition: 'all 0.1s ease-in-out',
        transition: 'all 0.1s ease-in-out'
    }

    const scale = props.activePCs.sort((a, b) => a - b);

  	return 	<div>
                <Row>
                    <Col sm={12} md={3}>
          				<RaisedButton
                            fullWidth={true} 
                            label="Chromatic" 
                            onClick={props.toggleScale.bind(this, scales.chromatic)}
                            style={arraysEqual(scales.chromatic, scale) ? activeStyle : {}}
                        />
                    </Col>
                    <Col sm={12} md={3}>
          				<RaisedButton 
                            fullWidth={true}
                            label="Diatonic" 
                            onClick={props.toggleScale.bind(this, scales.diatonic)} 
                            style={arraysEqual(scales.diatonic, scale) ? activeStyle : {}}
                        />
                    </Col>
                    <Col sm={12} md={3}>
          				<RaisedButton 
                            fullWidth={true}
                            label="Acoustic" 
                            onClick={props.toggleScale.bind(this, scales.acoustic)} 
                            style={arraysEqual(scales.acoustic, scale) ? activeStyle : {}}
                        />
                    </Col>
                    <Col sm={12} md={3}>
          				<RaisedButton 
                            fullWidth={true}
                            label="Octatonic" 
                            onClick={props.toggleScale.bind(this, scales.octatonic)} 
                            style={arraysEqual(scales.octatonic, scale) ? activeStyle : {}}
                        />
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col sm={12} md={3}>
          				<RaisedButton 
                            fullWidth={true} 
                            label="Whole Tone" 
                            onClick={props.toggleScale.bind(this, scales.wholetone)}
                            style={arraysEqual(scales.wholetone, scale) ? activeStyle : {}} 
                        />
                    </Col>
                    <Col sm={12} md={3}>
          				<RaisedButton 
                            fullWidth={true} 
                            label="Harmonic Minor" 
                            onClick={props.toggleScale.bind(this, scales.harmonic_minor)}
                            style={arraysEqual(scales.harmonic_minor, scale) ? activeStyle : {}} 
                        />
                    </Col>
                    <Col sm={12} md={3}>
          				<RaisedButton 
                            fullWidth={true} 
                            label="Harmonic Major" 
                            onClick={props.toggleScale.bind(this, scales.harmonic_major)}
                            style={arraysEqual(scales.harmonic_major, scale) ? activeStyle : {}} 
                        />
                    </Col>
                    <Col sm={12} md={3}>
          				<RaisedButton 
                            fullWidth={true} 
                            label="Hexatonic" 
                            onClick={props.toggleScale.bind(this, scales.hexatonic)} 
                            style={arraysEqual(scales.hexatonic, scale) ? activeStyle : {}}
                        />
                    </Col>
                </Row>
  			</div>
}

ScaleSelect.propTypes = {
	activePCs: React.PropTypes.array.isRequired,
    toggleScale: React.PropTypes.func.isRequired
}

export default ScaleSelect;
