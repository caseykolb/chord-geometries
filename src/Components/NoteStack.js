import React from 'react';
import { StyleSheet, css } from 'aphrodite';

var NoteStack = (props) => {
	const noteNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  return <ul className={css(styles.notes)}>
      {props.notes.map( (note, index) => {
	        return <li className={css(styles.note)} key={index}>
	        	{noteNames[note % 12] + Math.round(note / 12).toString()}
	        </li>
      })}
    </ul>
}

NoteStack.propTypes = {
	notes: React.PropTypes.arrayOf(React.PropTypes.number).isRequired
}

export default NoteStack;


/* Aphrodite Styles */
const styles = StyleSheet.create({
  notes: {
  	position: 'fixed',
    left: 0,
    bottom: 150,
  	padding: 0,
  	margin: 0
  },
  note: {
    listStyleType: 'none',
  }
});