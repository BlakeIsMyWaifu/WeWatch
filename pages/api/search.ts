import { NextApiRequest, NextApiResponse } from 'next'
import getData, { GetDataError } from 'utils/getData'
import { MediaResult } from 'utils/mediaTypes'
import parameterToString from 'utils/parameterToString'

const search = async (req: NextApiRequest, res: NextApiResponse): Promise<void> => {

	const { q: query, p: page } = req.query

	const queryString = parameterToString(query)
	const pageString = parameterToString(page, '1')

	if (queryString === '') {
		const error: GetDataError = {
			status: 404,
			message: 'No search query given'
		}
		res.json(error)
	}

	const parameters = new URLSearchParams()
	parameters.set('language', 'en')
	parameters.set('query', queryString)
	parameters.set('page', pageString)
	parameters.set('include_adult', 'true')

	const data = await getData<MediaResult>('search/multi', parameters)

	res.json(data)
}

export default search