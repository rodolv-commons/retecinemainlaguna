export interface Film {
	cast: string[]; // e.g., "Tom Hanks", "Robin Wright"
	director_id: string; // e.g., "d01 => Robert Zemeckis"
	duration: number;
	editing: string; // e.g., "Richard Francis-Bruce"
	genres: Genre[];
	id: string; // Unique identifier for the film
	format: string; // e.g., "2D", "3D", "IMAX"
	image: string;
	languages: string[];
	music: string; // e.g., "Alan Silvestri"
	originalTitle: string;
	originalVersion: boolean; // true if the film is in its original language/version
	producers: string[]; // e.g., "Wendy Finerman", "Steve Tisch"
	production: string; // e.g., "Paramount Pictures", "Walt Disney Pictures"
	screenings?: Screening[];
	screenplay: string[]; // e.g., Chris Columbus, Steven Spielberg
	// section: string; // e.g., "Concorso", "Fuori Concorso"
	sound: string; // e.g., "Randy Thom"
	synopsis: string;
	title: string;
	tone: string; // e.g., color, black-and-white
	year: number;
}

export interface Director {
	name: string; // e.g., "Robert Zemeckis"
	id: string; // Unique identifier for the director
	image?: string; // Optional image URL for the director
	biography?: string; // Optional short biography of the director
	birthDate?: string; // Optional birth date in ISO format
	filmography?: string[]; // Optional list of films directed by this director
}

export interface Genre {
	name: string;
}

export interface Venue {
	address: string;
	city: string;
	id: string; // Unique identifier for the venue
	mapLink?: string;
	name: string;
	screenings?: Screening[];
}

export interface Screening {
	film_id: string; // ID of the film being screened
	datetime: string; // ISO datetime
	venue_id: string;
}

export interface FestivalEvent {
	title: string; // e.g., "Masterclass with John Doe"
	description: string; // Rich text (Markdown/HTML)
	category: string; // 'masterclass' | 'industry-day'; // Type of festival event
	speaker?: string[]; // Name of the speaker
	speakerBio?: string; // Optional short biography of the speaker
	venue_id: string; // Venue where the masterclass will be held
	startDate: string; // ISO date
	endDate?: string; // ISO date
}

export interface Event {
	title: string; // e.g., "Opening Ceremony"
	description: string; // Rich text (Markdown/HTML)
	speaker?: string[]; // Name of the speaker
	speakerBio?: string; // Optional short biography of the speaker
	venue_id: string; // Venue where the event will be held
	startDate: string; // ISO date
	endDate?: string; // ISO date
}
