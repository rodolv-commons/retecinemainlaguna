import i18n from 'sveltekit-i18n';
import lang from './lang.json';
import { dev } from '$app/environment';

export const defaultLocale = 'it';

/** @type {import('sveltekit-i18n').Config} */
const config = {
	log: {
		level: dev ? 'warn' : 'error'
	},
	translations: {
		en: { lang },
		cs: { lang }
	},
	loaders: [
		{
			locale: 'en',
			key: 'header',
			loader: async () => (await import('./en/header.json')).default
		},
		{
			locale: 'it',
			key: 'header',
			loader: async () => (await import('./it/header.json')).default
		},
		{
			locale: 'en',
			key: 'program',
			loader: async () => (await import('./en/program.json')).default
		},
		{
			locale: 'it',
			key: 'program',
			loader: async () => (await import('./it/program.json')).default
		},
		{
			locale: 'en',
			key: 'film',
			loader: async () => (await import('./en/film.json')).default
		},
		{
			locale: 'it',
			key: 'film',
			loader: async () => (await import('./it/film.json')).default
		},
		{
			locale: 'en',
			key: 'overview',
			loader: async () => (await import('./en/overview.json')).default
		},
		{
			locale: 'it',
			key: 'overview',
			loader: async () => (await import('./it/overview.json')).default
		}
	]
};

export const {
	t,
	loading,
	locales,
	locale,
	translations,
	loadTranslations,
	addTranslations,
	setLocale,
	setRoute
} = new i18n(config);

loading.subscribe(($loading) => $loading && console.log('Loading translations...'));
