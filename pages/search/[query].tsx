import Box from '@mui/material/Box'
import App from 'components/App'
import Media from 'components/Media'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useEffect, useState } from 'react'
import getSearchData, { MovieResult, SearchData, SearchError, SearchResult, TVResult } from 'utils/getSearchData'

interface SearchParserProps {
	searchResult: SearchResult;
}

const SearchParser: React.FC<SearchParserProps> = ({ searchResult }) => {
	return (
		<App>
			{searchResult.success ? <Search searchData={searchResult.data} /> : <SearchErrora searchError={searchResult.data} />}
		</App>
	)
}

interface SearchProps {
	searchData: SearchData;
}

const Search: React.FC<SearchProps> = ({ searchData }) => {

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
					return <Media key={i} data={result} />
				})
			}
		</Box>
	)
}

interface SearchErrorProps {
	searchError: SearchError;
}

const SearchErrora: React.FC<SearchErrorProps> = ({ searchError }) => {
	return (
		<p>Error Status ({searchError.status}): {searchError.message}</p>
	)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

	const { query } = context.query

	const data = await getSearchData(query as string, 1)

	console.log(data)

	return {
		props: {
			searchResult: data
		}
	}
}

export default SearchParser