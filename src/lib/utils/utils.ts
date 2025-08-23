export function getCountryName(codes: string, locale: string): string {
	// `locale` could come from your i18n store, e.g. 'en' or 'it'
	const dn = new Intl.DisplayNames([locale], { type: 'region' });

	let res: string = '';

	if (codes) {
		const countryCodes = codes.split(',').map((code) => code.trim());
		res = countryCodes
			.map((code) => {
				try {
					return dn.of(code);
				} catch (e) {
					console.error(`Invalid country code: ${code}`, e);
					return '';
				}
			})
			.filter((name) => name)
			.join(', ');
	}

	return res;
}

export function shuffle<T>(array: T[]): T[] {
	let currentIndex = array.length;
	let randomIndex: number;

	while (currentIndex > 0) {
		randomIndex = Math.floor(Math.random() * currentIndex);
		currentIndex--;

		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

export function shuffled<T>(array: readonly T[]): T[] {
	return shuffle([...array]);
}
