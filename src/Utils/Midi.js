var Midi = {

	// request all available MIDI ports from computer
	getInputs(callback) {
		if(navigator.requestMIDIAccess !== undefined) {
	    navigator.requestMIDIAccess({ sysex:true }).then(
	    	(midiAccess) => { callback(midiAccess) },
	    	(error) => { Error('There has been an error: ' + error.statusCode) }
	  )}
	},

	// open or close single port
	togglePort(port, eventHandler) {
    if (port == null || port.type != 'input')
      return
    if (port.connection === 'closed') {
      port.open();
      port.onmidimessage = (eventHandler !== null) ? eventHandler : null;
    }
    else
      port.close();
  },	

  // open all input ports
  openAllPorts(midiAccess, eventHandler) {
  	midiAccess.inputs.forEach((port) => {
      this.togglePort(port, eventHandler)
    })
  }
}

module.exports = Midi;