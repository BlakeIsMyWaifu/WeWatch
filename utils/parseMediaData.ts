import { MovieResult, TVResult } from './mediaTypes'

export interface MediaData {
	title: string;
	backdrop: string;
	id: number;
	type: 'movie' | 'tv';
}

const parseMediaData = (data: MovieResult | TVResult): MediaData => {
	const isMovie = data.media_type === 'movie'

	const parsedData: MediaData = {
		title: (isMovie ? data.title : data.name) ?? '',
		backdrop: data.poster_path ?? '',
		id: data.id ?? -1,
		type: data.media_type
	}

	return parsedData
}

export default parseMediaData