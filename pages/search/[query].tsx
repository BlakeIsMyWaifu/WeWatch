import Box from '@mui/material/Box'
import App from 'components/App'
import Media from 'components/Media'
import ParserError from 'components/ParserError'
import useMediaList from 'hooks/useMediaList'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import getData, { GetData } from 'utils/getData'
import { MediaResult, MovieResult, TVResult, removePeople } from 'utils/mediaTypes'
import parseMediaData from 'utils/parseMediaData'

interface SearchParserProps {
	searchResult: GetData<MediaResult>;
}

const SearchParser: React.FC<SearchParserProps> = ({ searchResult }) => {
	return (
		<App>
			{
				searchResult.success ?
					<Search searchData={searchResult.data} /> :
					<ParserError error={searchResult.data} />
			}
		</App>
	)
}

interface SearchProps {
	searchData: MediaResult;
}

const Search: React.FC<SearchProps> = ({ searchData }) => {

	const cookies = useMediaList()
	const [data, setData] = useState<(MovieResult | TVResult)[]>(removePeople(searchData))

	useEffect(() => {
		if (searchData.page === 1) {
			setData(removePeople(searchData))
		}
	}, [searchData])

	return (
		<Box sx={{
			display: 'flex',
			gap: '8px',
			flexWrap: 'wrap'
		}}>
			{
				data.map((result, i) => {
					return <Media key={i} mediaData={parseMediaData(result)} cookies={cookies} />
				})
			}
		</Box>
	)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

	const { query } = context.query

	const queryString = typeof query === 'object' ? query[0] : query ?? ''

	const parameters = new URLSearchParams()
	parameters.set('language', 'en')
	parameters.set('query', queryString)
	parameters.set('page', '1')
	parameters.set('include_adult', 'true')

	const data = await getData<MediaResult>('search/multi', parameters)

	return {
		props: {
			searchResult: data
		}
	}
}

export default SearchParser