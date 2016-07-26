import React, { Component } from 'react';
import Geometry from './Components/Geometry'
import { StyleSheet, css } from 'aphrodite';

export default class App extends Component {
  render() {
    return (
    	<div>
      	<Geometry />
      </div>
    );
  }
}

const styles = StyleSheet.create({
    red: {
        backgroundColor: 'red'
    },

    blue: {
        backgroundColor: 'blue'
    },

    hover: {
        ':hover': {
            backgroundColor: 'red'
        }
    },

    small: {
        '@media (max-width: 600px)': {
            backgroundColor: 'red',
        }
    }
});