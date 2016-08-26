import React from 'react';
import NoteStack from './NoteStack'
import Arrow from 'material-ui/svg-icons/action/trending-flat';
import { StyleSheet, css } from 'aphrodite';

var NoteTrace = (props) => {
	if (props.trace.length === 1 && props.trace[0].length === 0)
		return <div />
	else {
	  return  <div className={css(styles.trace, styles.fade, styles.fade)}>
	      {props.trace.map((stack, index) => {
	      	if (stack.length === 0)
	      		return <div key={index} />
	      	else {
	        	return 	<div key={index} onClick={props.onClick.bind(stack)} className={css(styles.stack)}>
		  					<NoteStack notes={stack} />
		  				</div>
	  			}
	      })}
	    </div>
  }
}

NoteTrace.propTypes = {
	trace: React.PropTypes.arrayOf(React.PropTypes.array).isRequired,
	onClick: React.PropTypes.func.isRequired
}

export default NoteTrace;


/* Aphrodite Styles */
const styles = StyleSheet.create({
  trace: {
  	position: 'fixed',
    left: 0,
    bottom: 120,
  },
  stack: {
  	float: 'left',
  	':hover': {
      background: 'rgba(255,255,255,0.3)',
      cursor: 'pointer'
    }
  },
  arrow: {
  }
});