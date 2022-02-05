export interface MovieResult {
	poster_path?: string | null;
	adult?: boolean;
	overview?: string;
	release_data?: string;
	original_title?: string;
	genre_ids?: number[];
	id?: number;
	media_type: 'movie';
	original_language?: string;
	title?: string;
	backdrop_path?: string;
	popularity?: number;
	vote_count?: number;
	video?: boolean;
	vote_average?: number;
}

export interface TVResult {
	poster_path?: string | null;
	popularity?: number;
	id?: number;
	overview?: string;
	backdrop_path?: string | null;
	vote_average?: number;
	media_type: 'tv';
	first_air_date?: string;
	origin_country?: string[];
	genre_ids?: number[];
	original_language?: string;
	vote_count?: number;
	name?: string;
	original_name?: string;
}

export interface PersonResult {
	profile_path?: string | null;
	adult?: boolean;
	id?: number;
	media_type: 'person';
	known_for?: (MovieResult | TVResult)[];
	name?: string;
	popularity?: number;
}