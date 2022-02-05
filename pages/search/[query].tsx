import Box from '@mui/material/Box'
import App from 'components/App'
import Media from 'components/Media'
import useMediaList from 'hooks/useMediaList'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import getData, { GetData, GetDataError } from 'utils/getData'
import { MovieResult, PersonResult, TVResult } from 'utils/mediaTypes'
import parseMediaData from 'utils/parseMediaData'

interface SearchParserProps {
	searchResult: GetData<SearchData>;
}

const SearchParser: React.FC<SearchParserProps> = ({ searchResult }) => {
	return (
		<App>
			{searchResult.success ? <Search searchData={searchResult.data} /> : <SearchError searchError={searchResult.data} />}
		</App>
	)
}

interface SearchProps {
	searchData: SearchData;
}

const Search: React.FC<SearchProps> = ({ searchData }) => {

	const cookies = useMediaList()
	const [data, setData] = useState<(MovieResult | TVResult)[]>(searchData.results.filter(value => value.media_type !== 'person') as (MovieResult | TVResult)[])

	useEffect(() => {
		if (searchData.page === 1) {
			setData(searchData.results.filter(value => value.media_type !== 'person') as (MovieResult | TVResult)[])
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

interface SearchErrorProps {
	searchError: GetDataError;
}

const SearchError: React.FC<SearchErrorProps> = ({ searchError }) => {
	return (
		<p>Error Status ({searchError.status}): {searchError.message}</p>
	)
}

export interface SearchData {
	page: number;
	results: (MovieResult | TVResult | PersonResult)[];
	total_results: number;
	total_pages: number;
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

	const { query } = context.query

	const queryString = typeof query === 'object' ? query[0] : query ?? ''

	const parameters = new URLSearchParams()
	parameters.set('language', 'en')
	parameters.set('query', queryString)
	parameters.set('page', '1')
	parameters.set('include_adult', 'true')

	const data = await getData<SearchData>('search/multi', parameters)

	return {
		props: {
			searchResult: data
		}
	}
}

export default SearchParser