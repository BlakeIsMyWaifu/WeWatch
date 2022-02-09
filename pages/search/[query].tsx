import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/material'
import App from 'components/App'
import Media from 'components/Media'
import ParserError from 'components/ParserError'
import useMediaList from 'hooks/useMediaList'
import useSearchHistory from 'hooks/useSearchHistory'
import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React, { useCallback, useEffect, useState } from 'react'
import getData, { GetData } from 'utils/getData'
import { MediaResult, MovieResult, TVResult, removePeople } from 'utils/mediaTypes'
import parameterToString from 'utils/parameterToString'
import parseMediaData from 'utils/parseMediaData'

interface SearchParserProps {
	searchResult: GetData<MediaResult>;
	query: string;
}

const SearchParser: React.FC<SearchParserProps> = ({ searchResult, query }) => {
	return (
		<App>
			{
				searchResult.success ?
					<Search searchData={searchResult.data} query={query} /> :
					<ParserError error={searchResult.data} />
			}
		</App>
	)
}

interface SearchProps {
	searchData: MediaResult;
	query: string;
}

const Search: React.FC<SearchProps> = ({ searchData, query }) => {

	const cookies = useMediaList()
	const { add } = useSearchHistory()
	const [mediaData, setMediaData] = useState<(MovieResult | TVResult)[]>(removePeople(searchData))
	const [currentPage, setCurrentPage] = useState<number>(1)
	const [loadingMore, setLoadingMore] = useState<boolean>(false)

	const fetchMoreMedia = useCallback(async (): Promise<void> => {
		setLoadingMore(true)
		const { success, data } = await fetch(`/api/search?q=${query}&p=${currentPage + 1}`).then(a => a.json())
		if (success) {
			setCurrentPage(currentPage + 1)
			setMediaData([...mediaData, ...removePeople(data)])
		}
		setLoadingMore(false)
	}, [currentPage, mediaData, query])

	useEffect(() => {
		add(query)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center'
		}}>
			<Box sx={{
				display: 'flex',
				gap: '8px',
				flexWrap: 'wrap'
			}}>
				{
					mediaData.map((result, i) => {
						return <Media key={i} mediaData={parseMediaData(result)} cookies={cookies} />
					})
				}
			</Box>
			<LoadingButton
				variant='contained'
				loadingIndicator='Loading...'
				loading={loadingMore}
				onClick={fetchMoreMedia}
				sx={{
					maxWidth: 300,
					margin: 5
				}}
			>Load More</LoadingButton>
		</Box>
	)
}

export const getServerSideProps: GetServerSideProps = async (context: GetServerSidePropsContext) => {

	const { query } = context.query

	const queryString = parameterToString(query)

	const parameters = new URLSearchParams()
	parameters.set('language', 'en')
	parameters.set('query', queryString)
	parameters.set('page', '1')
	parameters.set('include_adult', 'true')

	const data = await getData<MediaResult>('search/multi', parameters)

	return {
		props: {
			searchResult: data,
			query: queryString
		}
	}
}

export default SearchParser