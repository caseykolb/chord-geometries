import THREE from 'three';
import TinyColor from 'tinycolor2';
import { normalizeNotes, normalizeNotesVariant } from '../Utils/NormalizeNotes'

var NoteMapping = {
	color(notes, octaveMod) {
		if (notes.length === 1)
			return TinyColor({ h: 0, s: 0.51, l: .43 }).toHexString();

		let tempNotes = notes.slice();
		tempNotes.sort((a, b) => a - b);

		// computer perfectly even chord
		let perfectlyEven = [];
		for (var i = 0; i < notes.length; i++)
			perfectlyEven.push(i * octaveMod / notes.length)

		// put both chords in zero-sum plane
		let perfectlyEvenSum = perfectlyEven.reduce((a, b) => a + b, 0);
		let tempNotesSum = tempNotes.reduce((a, b) => a + b, 0);

		for (var i = 0; i < perfectlyEven.length; i++) {
			tempNotes[i] = tempNotes[i] - (tempNotesSum / tempNotes.length);
			perfectlyEven[i] = perfectlyEven[i] - (perfectlyEvenSum / perfectlyEven.length);
		}

		// compute distance to perfectly even chord
		let dist = 0;
		for (var i = 0; i < tempNotes.length; i++) {
			let dist1 = (tempNotes[i] - perfectlyEven[i]) % octaveMod;
			let dist2 = (perfectlyEven[i] - tempNotes[i]) % octaveMod;
			dist += Math.min(dist1, dist2)
		}

		let maxDist = octaveMod - (octaveMod / notes.length);
		let ratio = Math.abs(dist) / maxDist;
		let hue = 230 * ratio;
		return TinyColor({ h: hue, s: 0.51, l: .43 }).toHexString();
	},

	// Return an array of position vectors according to notes given
	linear(notes, vertices) {
		if (notes === null || vertices === null) 
			return [];

		const length = 100;
		const xOffset = length / 2;

		var positions = [];
		for (var note of notes) {
			let x = (note / 128) * length - xOffset;
			positions.push(new THREE.Vector3(x, 0, 0));
		}
		return positions;
	},


	circular(notes, octaveMod) {
		if (notes === null || octaveMod === null) 
			return [];

		const radius = 16;

		var positions = [];
		for (var note of notes) {
			let angle = (((note % octaveMod) / octaveMod) * (-Math.PI * 2)) + (Math.PI / 2);
			let x = radius * Math.cos(angle);
			let y = radius * Math.sin(angle);
			positions.push(new THREE.Vector3(x, y, 0));
		}
		return positions;
	},


	helical(notes, octaveMod) {
		if (notes === null || radius === null || octaveMod === null) 
			return [];

		const radius = 16;
		const zStart = -100;
		const zDelta = 0.1;
		const perCycle = octaveMod * 12;

		var positions = [];
		for (var note of notes) {
			let angle = (((note % octaveMod) / octaveMod) * (-Math.PI * 2));
			let x = radius * Math.cos(angle);
			let y = radius * Math.sin(angle);
			let z = (note / octaveMod) * (zDelta * perCycle) + zStart;
			positions.push(new THREE.Vector3(x, y, z));
		}
		return positions;
	},

	dyadic(notes, octaveMod) {
		if (notes === null || spacing === null || octaveMod === null) 
			return [];

		if (notes.length !== 2)
			return [];

		var xOffset = octaveMod / 2;
		var mod = octaveMod / 2;
		const spacing = 6;

		var x = notes[0] % octaveMod;
		if (notes[1] % octaveMod > mod)
			var y = notes[1] % octaveMod - octaveMod;
		else
			var y = notes[1] % octaveMod;


		if (!this.inDyadicBounds(x, y, octaveMod)) {
			if (x > mod) {
				x = notes[1] % octaveMod;
				y = notes[0] % octaveMod - octaveMod;
			}
			else {
				x = notes[1] % octaveMod;
				y = notes[0] % octaveMod;
			}
		}

		var newX = (x - xOffset) * spacing;
		var newY = y * spacing;

		// rotate -45 deg
		let angle = -45;
		let rad = (Math.PI * angle) / 180;
	    let rotX = newX * Math.cos(rad) - newY * Math.sin(rad);
	    let rotY = newY * Math.cos(rad) + newX * Math.sin(rad);  

	    let positions = [];
	    positions.push(new THREE.Vector3(rotX, rotY, 0));

	    if (notes[0] % 12 + notes[1] % 12 === octaveMod 
	    	|| notes[0] % 12 + notes[1] % 12 === octaveMod) {
	    	var mirrorX = -y * spacing;
	    	var mirrorY = (x - xOffset) * -spacing;
	    	let mirrorRotX = mirrorX * Math.cos(rad) - mirrorY * Math.sin(rad);
	    	let mirrorRotY = mirrorY * Math.cos(rad) + mirrorX * Math.sin(rad);
	    	positions.push(new THREE.Vector3(mirrorRotX, mirrorRotY, 0));
	    }
		return positions;
	},

	inDyadicBounds(x, y, octaveMod) {
		if (x === null || y === null)
			return null

		let mod = octaveMod / 2;
		if (y > x || y < -x)	
			return false
		if (x > mod && y > octaveMod - x) 
			return false
		if (x > mod && y < x - octaveMod) 
			return false
		return true
	},

	dyadicSetClass(notes, octaveMod) {
		if (notes === null || octaveMod === null) 
			return [];

		if (notes.length !== 2)
			return [];

		const yOffset = 20;
		const spacing = 6;
		const mod = octaveMod / 2;


		let y = Math.abs((notes[1] % octaveMod) - (notes[0] % octaveMod));
		if (y > mod)
			y = octaveMod - y;
		return [new THREE.Vector3(0, -y * spacing + yOffset, 0)];
	},

	triadic(notes, octaveMod) {
		if (notes === null || octaveMod === null) 
			return [];
		if (notes.length !== 3)
			return [];

		return this.notesToCoords(notes, octaveMod);
	},

	triadicChordTypes(notes, octaveMod) {
		if (notes === null || octaveMod === null) 
			return [];
		if (notes.length !== 3)
			return [];

		const spacing = 8;

		let tempNotes = normalizeNotesVariant(notes, octaveMod);
		let xDot = [-0.8164965809277261, 0.4082482904638631, 0.4082482904638631];
		let yDot = [0, -0.7071067811865476, 0.7071067811865476];
		let x = dotProduct(tempNotes, xDot);
		let y = dotProduct(tempNotes, yDot);
		return [new THREE.Vector3(x * spacing, y * spacing, 0)];

		//let tempNotes = normalizeNotesVariant(notes, octaveMod);
		//return this.notesToCoordsVariant(tempNotes, octaveMod);
	},

	tetrachordal(notes, octaveMod) {
		if (notes === null || octaveMod === null) 
			return [];
		if (notes.length !== 4)
			return [];
		let tempNotes = normalizeNotesVariant(notes, octaveMod);
		return this.notesToCoordsVariant(tempNotes, octaveMod);
	},

	notesToCoords(notes, octaveMod) {
		const spacing = 8;

		let tempNotes = [];
		for (var note of notes)
			tempNotes.push(note % octaveMod);

		tempNotes.sort((a, b) => a - b);

		var sum = tempNotes.reduce((a, b) => a + b, 0);
		
		let lastIndex = tempNotes.length - 1;
		while (sum > octaveMod) {
			tempNotes[lastIndex] = tempNotes[lastIndex] - octaveMod;
			tempNotes.sort((a, b) => a - b);
			sum = tempNotes.reduce((a, b) => a + b, 0);
		}

		let x = tempNotes[0] * spacing;
		let y = tempNotes[1] * spacing;
		let z = tempNotes[2] * spacing;
		let position = new THREE.Vector3(x, y, z);

		// return mirror as well if x equals 0
		if (sum === octaveMod) {
			let mirrorX = (tempNotes[2] - octaveMod) * spacing;
			let mirrorY = position.x;
			let mirrorZ = position.y;
			let mirrorPosition = new THREE.Vector3(mirrorX, mirrorY, mirrorZ);
			return [position, mirrorPosition];
		}
		else if (sum === 0) {
			let mirrorX = position.y;
			let mirrorY = position.z;
			let mirrorZ = (tempNotes[0] + octaveMod) * spacing;
			let mirrorPosition = new THREE.Vector3(mirrorX, mirrorY, mirrorZ);
			return [position, mirrorPosition];
		}
		else
			return [position];	
	},

	notesToCoordsVariant(notes, octaveMod) {
		const spacing = 8;

		let tempNotes = notes.slice();

		tempNotes.sort((a, b) => a - b);

		var sum = tempNotes.reduce((a, b) => a + b, 0);
		
		let lastIndex = tempNotes.length - 1;
		while (sum > octaveMod) {
			tempNotes[lastIndex] = tempNotes[lastIndex] - octaveMod;
			tempNotes.sort((a, b) => a - b);
			sum = tempNotes.reduce((a, b) => a + b, 0);
		}

		let x = tempNotes[0] * spacing;
		let y = tempNotes[1] * spacing;
		let z = tempNotes[2] * spacing;
		let position = new THREE.Vector3(x, y, z);

		// return mirror as well if x equals 0
		if (sum === octaveMod) {
			let mirrorX = (tempNotes[2] - octaveMod) * spacing;
			let mirrorY = position.x;
			let mirrorZ = position.y;
			let mirrorPosition = new THREE.Vector3(mirrorX, mirrorY, mirrorZ);
			return [position, mirrorPosition];
		}
		else if (sum === 0) {
			let mirrorX = position.y;
			let mirrorY = position.z;
			let mirrorZ = (tempNotes[0] + octaveMod) * spacing;
			let mirrorPosition = new THREE.Vector3(mirrorX, mirrorY, mirrorZ);
			return [position, mirrorPosition];
		}
		else
			return [position];	
	}
}

function dotProduct(a1, a2) {
	if (a1.length !== a2.length)
		return null

	let dot = 0;
	for (var i = 0; i < a1.length; i++)
		dot += a1[i] * a2[i];

	return dot;
}

module.exports = NoteMapping;