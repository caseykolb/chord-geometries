export function normalizeNotes(notes, octaveMod) {
	if (notes.length < 2 || octaveMod === null)
		return notes

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


// for triadic set class and tetrachordal
export function normalizeNotesVariant(notes, octaveMod) {
	if (notes.length < 2 || octaveMod === null)
		return notes

	let tempNotes = [];
	for (var note of notes) {
		if (note !== octaveMod)
			tempNotes.push(note % octaveMod);
		else
			tempNotes.push(octaveMod)
	}

	tempNotes.sort((a, b) => a - b);
	var lowestPC = tempNotes[0];

	// zero base
	for (var i = 0; i < tempNotes.length; i++)
		tempNotes[i] = tempNotes[i] - lowestPC;

	var inversion = tempNotes.slice();
	var inversions = tempNotes.length;
	var bestSpan = octaveMod;

	// cycle through inversions to find best span
	for (var i = 0; i < inversions; i++) {
		lowestPC = inversion[0];

		// zero base
		for (var j = 0; j < inversion.length; j++) {
			//if (inversion[j] - lowestPC < 0)
			//	inversion[j] = octaveMod - lowestPC + inversion[j];
			//else
				inversion[j] = inversion[j] - lowestPC;
		}

		// x2 - x1
		let firstInterval = inversion[1] - inversion[0];
		//let currentSpan = inversion[inversion.length - 1] - inversion[0];
		//let validNormalForm = true;

		// ensure x_2 - x_1 <= x_n - x_(n-1) for all n
		/*for (var n = 1; n < inversion.length - 1; n++) {
			if (inversion[n + 1] - inversion[n] < firstInterval) {
				validNormalForm = false;
			}
		}*/

		if (firstInterval < bestSpan) {
			bestSpan = firstInterval;
			tempNotes = inversion.slice();
		}

		// shift elements - new inversion
		inversion.push(inversion[0]);
		inversion.shift();
	}

	return tempNotes;
}
