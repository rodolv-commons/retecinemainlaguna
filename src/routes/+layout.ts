import { addTranslations, setLocale, setRoute } from '$lib/i18n';

/** @type {import('@sveltejs/kit').Load} */
export const load = async ({ data }) => {
	const { i18n, translations, films, directors, screenings, venues, festivalEvents } = data;
	const { locale, route } = i18n;

	addTranslations(translations);

	await setRoute(route);
	await setLocale(locale);

	return { i18n, films, directors, screenings, venues, festivalEvents };
};
