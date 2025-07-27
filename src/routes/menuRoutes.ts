// src/lib/menuRoutes.ts

export const menuRoutes = {
	about: {
		association: '/about/association',
		mission: '/about/mission',
		team: '/about/team',
		contacts: '/about/contacts'
	},
	activities: {
		screenings: '/activities/screenings',
		workshops: '/activities/workshops',
		collaborations: '/activities/collaborations',
		archive: '/activities/archive'
	},
	festival: {
		overview: '/festival',
		program: '/festival/program',
		participate: '/festival/participate',
		archive: '/festival/archive',
		guests: '/festival/guests',
		partners: '/festival/partners'
	},
	news: {
		articles: '/news/articles',
		press: '/news/press',
		media: '/news/media'
	},
	support: {
		member: '/support/member',
		donations: '/support/donations',
		volunteering: '/support/volunteering'
	},
	newsletter: {
		subscribe: '/newsletter/subscribe',
		archive: '/newsletter/archive'
	}
} as const;

export type MenuRoutes = typeof menuRoutes;
export type SectionKey = keyof MenuRoutes;
export type EntryKey<K extends SectionKey> = keyof MenuRoutes[K];
