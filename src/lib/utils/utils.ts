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
