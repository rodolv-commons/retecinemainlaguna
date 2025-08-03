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

export interface Event {
	description: string; // Rich text (Markdown/HTML)
	endDate: string; // ISO date
	location?: string;
	screenings?: Screening[];
	startDate: string; // ISO date
	title: string;
}

export interface Screening {
	film_id: string; // ID of the film being screened
	datetime: string; // ISO datetime
	venue_id: string;
}
