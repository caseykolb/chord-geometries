import React, { Component } from 'react';
import update from 'react-addons-update';
import PIXI from 'pixi.js';
import TinyColor from 'tinycolor2';
import hotkey from 'react-hotkey';
import { StyleSheet, css } from 'aphrodite';

export default class Piano extends Component {
	constructor(props, context) {
    super(props, context);

    this.state = {
      keys: [],
      addUnison: false
    }

    hotkey.activate('keydown');
    hotkey.activate('keyup');
    this.hotkeyHandler = this.handleHotkey.bind(this);

    const res = this.res = 2; // renderer resolution
    const height = this.h = props.height / this.res; // renderer height adjusted for resolution boost
    const octaveConfig = this.octaveConfig = [false, true, false, true, false, false, true, false, true, false, true, false]
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    hotkey.addHandler(this.hotkeyHandler);

    const width = window.innerWidth / this.res;

    // turn off pixi console log
    PIXI.utils._saidHello = true;
    this.renderer = PIXI.autoDetectRenderer(width, this.h, {transparent: true, resolution: this.res});
    this.refs.pianoCanvas.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();
    this.stage.interactive = true;
    this.animate();

    this.generatePiano(this.props.noteStack);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    hotkey.removeHandler(this.hotkeyHandler);
  }

  componentWillUpdate() {
    this.renderPiano();
  }

  componentWillReceiveProps(nextProps) {
  	this.generatePiano(nextProps.noteStack)
  }

  handleHotkey(e) {
    // if option-key is down, add unisons
    if (e.which === 18)
        this.setState({ addUnison: e.type === 'keydown' ? true : false })
  }

  handleResize() {
    this.renderer.view.style.width = window.innerWidth + 'px';
    this.renderPiano();
  }

  generatePiano(noteStack) {
    var keys = new Array(128); // number of possible midi notes
    let numVisibleKeys = this.props.octaves * 12;
    let lowerBound = this.props.midiBase;
    let upperBound = this.props.midiBase + numVisibleKeys;

    // build array of keys both visible and invisible
    for (var i = 0; i < keys.length; i++) {
    	// count occurrences of key in current note stack
    	let count = 0;
			for(var note of noteStack)
			    if(note === i) count++;

      keys[i] = {
        note: i,
        isBlack: this.octaveConfig[i % 12],
        isVisible: (i >= lowerBound && i <= upperBound),
        unisons: count - 1, // -1 is inactive, 0 is a single note, 1 and more are unisons
      }
    }
    this.setState({ keys: keys }, () => { this.renderPiano() })
  }

  renderPiano() {
    for (var i = this.stage.children.length - 1; i >= 0; i--) 
      this.stage.removeChild(this.stage.children[i])

    // draw white keys first
    for (var key of this.state.keys)
      if (!key.isBlack && key.isVisible) this.renderKey(key);

    // draw black keys to preserve depth
    for (var key of this.state.keys)
      if (key.isBlack && key.isVisible) this.renderKey(key);
  }

  renderKey(key) {
  	const width = window.innerWidth / 2;
    const numWhiteKeys = (this.props.octaves * 7);
    // black key should be half width of white key
    const keyWidth = key.isBlack ? (width / numWhiteKeys / 2) : (width / numWhiteKeys);
    const keyHeight = key.isBlack ? (this.h / 2) : this.h;
    let xPos = this.findKeyPosition(key)

    if (key.unisons === -1)
      var keyColor = key.isBlack ? 0x000000 : 0xF8F8F8;
    else 
      var keyColor = parseInt(TinyColor(this.props.accentColor).darken(key.unisons * 10).toHex(), 16);

    var keyGraphic = new PIXI.Graphics();
    keyGraphic.interactive = true;
    keyGraphic.beginFill(keyColor)
      .lineStyle(2 / this.res, 0xDDDDDD, 1)
      .drawRect(xPos, 0, keyWidth, keyHeight)
      .on('mousedown', this.toggleKey.bind(this, key))
      .on('touchstart', this.toggleKey.bind(this, key));

    this.stage.addChild(keyGraphic);

    if (key.note % 12 === 0) {
      var text = new PIXI.Text('C' + (key.note / 12), 
        { 
        	fontSize: '6px', 
          fill: key.unisons > -1 ? 0xFFFFFF : 0xD3D3D3, 
          align: 'center' 
        });
      text.x = xPos + keyWidth / 10;
      text.y = this.h - 10;
      text.resolution = 4;
      this.stage.addChild(text)
    }
  }

  findKeyPosition(key) {
  	const width = window.innerWidth / 2;
    const numWhiteKeys = (this.props.octaves * 7);
    const keyWidth = key.isBlack ? (width / numWhiteKeys / 2) : (width / numWhiteKeys);
    const keyHeight = key.isBlack ? (this.h / 2) : this.h;
    let keyIndex = key.note - this.props.midiBase;

    // funky algorithm to adjust white and black key indices to position properly
    var diff = 0;
    if (!key.isBlack) {
      for (var i = 0; i < keyIndex; i++) 
        if (this.octaveConfig[i % 12]) diff++;
      keyIndex -= diff;
    }
    else {
      for (var i = 0; i < keyIndex; i++)
        if (!this.octaveConfig[i % 12]) diff++;
      keyIndex = diff - 1;
    }
    
    return key.isBlack ? (keyIndex / numWhiteKeys * width) + (keyWidth * 1.5) 
                       : (keyIndex / numWhiteKeys * width);
  }

  toggleKey(key, e) {
    e.stopPropagation();
    var keys = this.state.keys;

    if (key.unisons === -1)
      this.props.onClick(key, true)
    else if (this.state.addUnison) {
      if (key.unisons < 4)
        this.props.onClick(key, true)
    }
    else
      this.props.onClick(key, false)

    
  }

  animate() {
    this.renderer.render(this.stage);
    this.frame = requestAnimationFrame(this.animate);
  }

  render() {
  	return <div className={css(styles.piano)} ref="pianoCanvas"></div>
  }
}

Piano.propTypes = {
	octaves: React.PropTypes.number.isRequired,
  midiBase: React.PropTypes.number.isRequired,
  height: React.PropTypes.number.isRequired,
  accentColor: React.PropTypes.string.isRequired,
  noteStack: React.PropTypes.array.isRequired,
  onClick: React.PropTypes.func.isRequired,
}

/* Aphrodite Styles */
const styles = StyleSheet.create({
    piano: {
      'position': 'fixed',
      'bottom': -5,
      'right': 0,
      'padding': 'none',
      'margin': 'none'
    }
});
