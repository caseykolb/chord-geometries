const TriadicSetClasses = {
	cube_dance: 
	[
		[0, 4, 7],
		[0, 3, 7],
		[0, 4, 8]
	],

	hexatonic_cycles: 
	[
		[0, 3, 7],
		[0, 4, 7]
	],

	tertian_trichords: 
	[
		[0, 3, 6],
		[0, 3, 7],
		[0, 4, 7],
		[0, 4, 8]
	],

	intermediate_sets: 
	[
		[0, 1, 4], 
		[0, 3, 4], 
		[0, 1, 5], 
		[0, 4, 5], 
		[0, 1, 6],
		[0, 5, 6],
		[0, 2, 5], 
		[0, 3, 5], 
		[0, 2, 6], 
		[0, 4, 6], 
		[0, 5, 10]
	],

	scale_fragments: 
	[
		[0, 1, 2], 
		[0, 1, 3], 
		[0, 2, 3], 
		[0, 2, 4]
	],

	I_symmetrical_trichords: 
	[
		[0, 1, 2], 
		[0, 2, 4], 
		[0, 3, 6], 
		[0, 4, 8],
		[0, 2, 7],
		[0, 0, 6]
	],


	all_trichords: 
	[
		[0, 1, 2], 
		[0, 1, 3], 
		[0, 2, 3], 
		[0, 1, 4],
		[0, 3, 4],
		[0, 1, 5], 
		[0, 4, 5], 
		[0, 1, 6], 
		[0, 5, 6],
		[0, 2, 4],
		[0, 2, 5], 
		[0, 3, 5], 
		[0, 2, 6], 
		[0, 4, 6],
		[0, 2, 7],
		[0, 5, 7], 
		[0, 3, 6], 
		[0, 3, 7], 
		[0, 4, 7],
		[0, 4, 8]
	],

	multisets_only: 
	[
		[0, 0, 1], 
		[0, 0, 2], 
		[0, 0, 3], 
		[0, 0, 4],
		[0, 0, 5],
		[0, 0, 6], 
		[0, 5, 5], 
		[0, 4, 4],
		[0, 3, 3], 
		[0, 2, 2], 
		[0, 1, 1], 
		[0, 0, 0]  
	],

	trichords_and_multisets: 
	[
		[0, 1, 2], 
		[0, 1, 3], 
		[0, 2, 3], 
		[0, 1, 4], 
		[0, 3, 4],
		[0, 1, 5],
		[0, 4, 5],
		[0, 1, 6], 
		[0, 5, 6], 
		[0, 2, 4], 
		[0, 2, 5], 
		[0, 3, 5], 
		[0, 2, 6], 
		[0, 4, 6], 
		[0, 2, 7], 
		[0, 5, 7], 
		[0, 3, 6], 
		[0, 3, 7], 
		[0, 4, 7], 
		[0, 4, 8], 
		[0, 0, 1], 
		[0, 0, 2], 
		[0, 0, 3], 
		[0, 0, 4], 
		[0, 0, 5], 
		[0, 0, 6], 
		[0, 5, 5], 
		[0, 4, 4], 
		[0, 3, 3], 
		[0, 2, 2], 
		[0, 1, 1],
		[0, 0, 0]
	],

	diatonic_triads: 
	[
		[0, 3, 6], 
		[0, 3, 7], 
		[0, 4, 7], 
		[0, 4, 8]
	],

	acoustic_triads: 
	[
		[0, 3, 6], 
		[0, 3, 7], 
		[0, 4, 7], 
		[0, 4, 8]
	],

	octatonic_triads: 
	[
		[0, 3, 6], 
		[0, 3, 7], 
		[0, 4, 7], 
		[0, 4, 8]
	],

	whole_tone_quasi_triads: 
	[
		[0, 2, 6], 
		[0, 4, 6], 
		[0, 4, 8]
	],

	harmonic_minor_triads: 
	[
		[0, 3, 6], 
		[0, 3, 7], 
		[0, 4, 7], 
		[0, 4, 8]
	],

	diatonic_consonances: 
	[
		[0, 3, 7], 
		[0, 4, 7], 
		[0, 0, 3], 
		[0, 0, 4],
		[0, 0, 5], 
		[0, 3, 3],
		[0, 4, 4], 
		[0, 5, 5]
	]
}

module.exports = TriadicSetClasses;