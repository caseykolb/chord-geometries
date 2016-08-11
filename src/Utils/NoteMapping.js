import THREE from 'three';

// Return an array of position vectors according to notes given
export function LinearNoteMapping(notes, vertices) {
	if (notes === null || vertices === null) 
		return [];

	let length = Math.abs(vertices[1].x - vertices[0].x)

	var positions = [];
	for (var note of notes) {
		let x = (note / 128) * length - (vertices[1].x);
		positions.push(new THREE.Vector3(x, 0, 0));
	}

	return positions;
}


export function CircularNoteMapping(notes) {
	if (notes === null) 
		return []
}


export function HelicalNoteMapping(notes) {
	if (notes === null) 
		return []
}