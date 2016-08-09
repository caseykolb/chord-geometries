import React, { Component } from 'react';
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

    this.res = 2; // renderer resolution
    this.w = window.innerWidth / this.res; // renderer width adjusted for resolution boost
    this.h = 150 / this.res; // renderer height adjusted for resolution boost
    this.numKeys = this.props.octaves * 12; // total number of visible piano keys
    this.octaveConfig = [false, true, false, true, false, false, true, false, true, false, true, false]
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    window.addEventListener('resize', this.handleResize.bind(this));
    hotkey.addHandler(this.hotkeyHandler);

    // turn off pixi console log
    PIXI.utils._saidHello = true;
    this.renderer = PIXI.autoDetectRenderer(this.w, this.h, {transparent: true, resolution: this.res});
    this.refs.pianoCanvas.appendChild(this.renderer.view);
    this.stage = new PIXI.Container();
    this.stage.interactive = true;
    this.animate();

    this.generatePiano();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
    hotkey.addHandler(this.hotkeyHandler);
  }

  shouldComponentUpdate() {
    this.renderPiano();
    return true;
  }

  handleHotkey(e) {
    // if command-key is down, add unisons
    if (e.which === 91)
        this.setState({ addUnison: e.type === 'keydown' ? true : false })
  }

  handleResize() {
    this.w = window.innerWidth / this.res;
    this.renderer.view.style.width = window.innerWidth + 'px';
    this.renderPiano();
  }

  generatePiano() {
    var keys = [];
    let numKeys = this.props.octaves * 12;
    for (var i = 0; i < numKeys; i++) {
      var key = {
        note: this.props.midiBase + i,
        isBlack: this.octaveConfig[i % 12],
        unisons: -1, // -1 is inactive, 0 is a single note, 1 and more are unisons
      }
      keys.push(key)
    }
    this.setState({ keys: keys }, () => { this.renderPiano() })
  }

  renderPiano() {
    this.renderer.clear();

    // draw white keys first
    for (var key of this.state.keys)
      if (!key.isBlack) this.renderKey(key);

    // draw black keys to preserve depth
    for (var key of this.state.keys)
      if (key.isBlack) this.renderKey(key);
  }

  renderKey(key) {
    const numWhiteKeys = (this.props.octaves * 7);
    // black key should be half width of white key
    const keyWidth = key.isBlack ? (this.w / numWhiteKeys / 2) : (this.w / numWhiteKeys);
    const keyHeight = key.isBlack ? (this.h / 2) : this.h;
    var keyIndex = key.note - this.props.midiBase;

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
    const xPos = key.isBlack ? (keyIndex / numWhiteKeys * this.w) + (keyWidth * 1.5) 
                             : (keyIndex / numWhiteKeys * this.w);

    switch (key.unisons) {
      case -1:
        var keyColor = key.isBlack ? 0x000000 : 0xF8F8F8;
        break;
      case 0:
        var keyColor = parseInt(TinyColor(this.props.accentColor).toHex(), 16);
        break;
      case 1:
        var keyColor = parseInt(TinyColor(this.props.accentColor).darken(10).toHex(), 16)
        break;
      case 2:
        var keyColor = parseInt(TinyColor(this.props.accentColor).darken(20).toHex(), 16)
        break;
      case 3:
        var keyColor = parseInt(TinyColor(this.props.accentColor).darken(30).toHex(), 16)
        break;
      case 4:
        var keyColor = parseInt(TinyColor(this.props.accentColor).darken(40).toHex(), 16)
        break;
      default:
        var keyColor = key.isBlack ? 0x000000 : 0xF8F8F8;
    }

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
        { fontSize: '6px', 
          fill: key.unisons > -1 ? 0xFFFFFF : 0xD3D3D3, 
          align: 'center' 
        });
      text.x = xPos + keyWidth / 10;
      text.y = this.h - 10;
      text.resolution = 8;
      this.stage.addChild(text)
      
    }
    
  }

  toggleKey(key) {
    var keys = this.state.keys;

    if (key.unisons === -1)
      keys[key.note - this.props.midiBase].unisons++;
    else if (this.state.addUnison) {
      if (key.unisons < 4)
        keys[key.note - this.props.midiBase].unisons++;
    }
    else
      keys[key.note - this.props.midiBase].unisons--;

    this.setState({ keys: keys })
  }

  animate() {
    this.renderer.render(this.stage);
    this.frame = requestAnimationFrame(this.animate);
  }

  render() {
  	return <div className={css(styles.piano)} ref="pianoCanvas"></div>
  }
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
