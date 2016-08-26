import THREE from 'three';
import NoteMapping from './NoteMapping';
import arraysEqual from '../Utils/ArraysEqual'
import { normalizeNotes } from '../Utils/NormalizeNotes'

export function buildDyads(octaveMod, activePCs) {
	let nodes = [];
	const spacing = 6;
	const xOffset = octaveMod / 2;

	for (var x = 0; x <= octaveMod; x++) {
		var maxY = (x < octaveMod / 2) ? x : octaveMod - x;

		for (var y = 0; y <= maxY; y++) {
			if (x === octaveMod)
				var label = '[' + (0).toString() + ' ' + (0).toString() + ']';
			else if (y === maxY && x >= octaveMod / 2)
				var label = '[' + x.toString() + ' ' + y.toString() + ']';
			else
				var label = x.toString() + ' ' + y.toString();

			var coords = rotateCoordinates((x - xOffset) * spacing, y * spacing, 0, -45);
			var color = NoteMapping.color([x, y], octaveMod);

			if (PCsVisible([x % octaveMod, y % octaveMod], activePCs)) {
				nodes.push({ label: label, color: color, position: coords });

				// add mirror to positive y nodes
				if (y > 0) {
					let mirrorCoords = rotateCoordinates((x - xOffset) * spacing, -y * spacing, 0, -45);
					var mirrorColor = NoteMapping.color([x, octaveMod - y], octaveMod);
					var mirrorLabel = x.toString() + ' ' + (octaveMod - y).toString();
					nodes.push({ label: mirrorLabel, color: mirrorColor, position: mirrorCoords });
				}
			}
		}
	}
	return nodes;
}

export function buildDyadicSetClass(octaveMod) {
	let nodes = [];

	const mod = octaveMod / 2;
	const spacing = 6;
	const yOffset = 20;

	for (var y = 0; y <= mod; y++) {
		var coords = new THREE.Vector3(0, -y * spacing + yOffset, 0);
		var color = NoteMapping.color([0, y], octaveMod);
		var label = (0).toString() + ' ' + y.toString();
		nodes.push({ label: label, color: color, position: coords });
	}
	return nodes;
}

export function buildTriads(octaveMod, setClasses, activePCs) {
	let nodes = [];

	for (var x = 0; x <= octaveMod; x++) {
		for (var y = 0; y <= octaveMod; y++) {
			for (var z = 0; z <= octaveMod; z++) {
				let positions = NoteMapping.triadic([x, y, z], octaveMod)
				let color = NoteMapping.color([x, y, z], octaveMod);
				let notes = normalizeNotes([x, y, z], octaveMod)

				if (setClassVisible(notes, setClasses) && PCsVisible([x, y, z], activePCs)) {
					for (var position of positions)
						nodes.push({ position: position, color: color, notes: [x, y, z] })
				}
			}
		}
	}
	return nodes;
}

export function buildTriadicChordTypes(octaveMod, setClasses, activePCs) {
	let nodes = [];
	let x = 0;

	for (var y = 0; y <= octaveMod; y++) {
		for (var z = 0; z <= octaveMod; z++) {
			let position = NoteMapping.triadicChordTypes([x, y, z], octaveMod)
			let color = NoteMapping.color([x, y, z], octaveMod);
			nodes.push({ position: position[0], color: color })
		}
	}

	return nodes;
}

export function buildTetrachords(octaveMod, setClasses, activePCs) {
	let nodes = [];
	let x = 0;

	for (var y = 0; y <= octaveMod; y++) {
		for (var z = 0; z <= octaveMod; z++) {
			for (var w = 0; w <= octaveMod; w++) {
				let positions = NoteMapping.tetrachordal([x, y, z, w], octaveMod)
				let color = NoteMapping.color([x, y, z, w], octaveMod);
				let notes = normalizeNotes([x, y, z, w], octaveMod)

				if (setClassVisible(notes, setClasses) && PCsVisible([x, y, z, w], activePCs)) {
					for (var position of positions)
						nodes.push({ position: position, color: color })
				}
			}
		}
	}

	return nodes;
}

export function buildVoiceLeading(nodes, voiceleading, octaveMod) {
	if (nodes === null) 
		return []

	let voiceleadingVerts = [];

	// check all nodes against all other nodes
	for (var i = 0; i < nodes.length; i++) {
		let fromNode = nodes[i];

		for (var j = i + 1; j < nodes.length; j++) {
			var toNode = nodes[j];

			let fromNotes = fromNode.notes.sort((a, b) => a - b);
			let toNotes = toNode.notes.sort((a, b) => a - b);

			if (singleStepVL(fromNotes, toNotes, octaveMod))
				voiceleadingVerts.push([fromNode.position, toNode.position])
		}	
	}

	return voiceleadingVerts;
}

/********************
*
*	Helper Functions
*
********************/

function setClassVisible(notes, setClasses) {
	for (var setClass of setClasses) {
		if (arraysEqual(notes, setClass))
			return true
	}
	return false;
}

function PCsVisible(notes, activePCs) {
	for (var note of notes) {
		if (!activePCs.includes(note))
			return false;
	}
	return true
}

function rotateCoordinates(x, y, z, angle) {
	if (x === null || y === null || angle === null)
		return

	var rad = (Math.PI * angle) / 180;
    var rotX = x * Math.cos(rad) - y * Math.sin(rad);
    var rotY = y * Math.cos(rad) + x * Math.sin(rad);
    return new THREE.Vector3(rotX, rotY, z);
}


function singleStepVL(fromNotes, toNotes, octaveMod) {
	if (fromNotes === null || toNotes === null)
		return false
	if (fromNotes.length !== toNotes.length)
		return false;

	// check distance across all inversions of second chord
	let dist = 0;
	let inversion = toNotes;
	for (var i = 0; i < fromNotes.length; i++) {
		for (var j = 0; j < fromNotes.length; j++) {
			if (Math.abs(fromNotes[j] - inversion[j]) >  octaveMod / 2)
				dist += octaveMod - Math.abs(fromNotes[j] - inversion[j]);
			else
				dist += Math.abs(fromNotes[j] - inversion[j]);
		}

		if (dist === 1)
			return true

		// invert chord
		inversion.push(inversion[0]);
		inversion.shift();
		dist = 0;
	}

	return false;
}

function voiceleadingLine(fromNotes, toNotes) {
	
}
