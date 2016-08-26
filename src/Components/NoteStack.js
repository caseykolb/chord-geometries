import React from 'react';
import Arrow from 'material-ui/svg-icons/action/trending-flat';
import { StyleSheet, css } from 'aphrodite';

var NoteStack = (props) => {
	const noteNames = ['C', 'Db', 'D', 'Eb', 'E', 'F', 'F#', 'G', 'Ab', 'A', 'Bb', 'B'];

  if (props.notes.length === 0) {
    return <ul className={css(styles.notes)}>
        <li className={css(styles.note)}>?</li>
      </ul>
  }
  else {
    return <ul className={css(styles.notes)}>
        {props.notes.map( (note, index) => {
          return <li className={css(styles.note)} key={index}>
            <Arrow className={css(styles.arrow)}/>
          	{(props.notes.length !== 0) 
                ? noteNames[note % 12] + Math.floor(note / 12).toString()
                : '?'
            }
          </li>
        })}
      </ul>
  }
}

NoteStack.propTypes = {
	notes: React.PropTypes.array.isRequired
}

export default NoteStack;


/* Aphrodite Styles */
const styles = StyleSheet.create({
  notes: {
    padding: 0,
    margin: 0,
    float: 'left'
  },
  note: {
    listStyleType: 'none',
    color: 'white'
  },
  arrow: {
    '-ms-transform': 'rotate(180deg)', /* IE 9 */
    '-webkit-transform': 'rotate(180deg)', /* Chrome, Safari, Opera */
    'transform': 'rotate(180deg)',
    paddingTop: 2
  }
});