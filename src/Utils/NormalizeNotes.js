export function normalizeNotes(notes, octaveMod) {
	let tempNotes = [];
	for (var note of notes) 
		tempNotes.push(note % octaveMod);

	tempNotes.sort((a, b) => a - b);
	var lowestPC = tempNotes[0];

	// zero base
	for (var i = 0; i < tempNotes.length; i++)
		tempNotes[i] = tempNotes[i] - lowestPC;

	var inversion = tempNotes.slice();
	var bestSpan = tempNotes[tempNotes.length - 1];
	var inversions = tempNotes.length - 1;

	// cycle through inversions to find best span
	for (var i = 0; i < inversions; i++) {
		// shift elements
		inversion.push(inversion[0]);
		inversion.shift();

		lowestPC = inversion[0];

		// zero base
		for (var j = 0; j < inversion.length; j++) {
			if (inversion[j] - lowestPC < 0)
				inversion[j] = octaveMod - lowestPC + inversion[j];
			else
				inversion[j] = inversion[j] - lowestPC;
		}
		let currentSpan = inversion[inversion.length - 1];

		if (currentSpan < bestSpan) {
			bestSpan = currentSpan;
			tempNotes = inversion.slice();
		}
	}

	return tempNotes;
}