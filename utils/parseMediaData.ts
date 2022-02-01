import { MovieResult, TVResult } from './getSearchData'

export interface MediaData {
	title: string;
	backdrop: string;
	id: number;
}

const parseMediaData = (data: MovieResult | TVResult): MediaData => {
	const isMovie = data.media_type === 'movie'

	const parsedData: MediaData = {
		title: (isMovie ? data.title : data.name) ?? '',
		backdrop: data.poster_path ?? '',
		id: data.id ?? -1
	}

	return parsedData
}

export default parseMediaData