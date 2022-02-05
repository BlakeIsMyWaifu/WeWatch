import { Box } from '@mui/material'
import App from 'components/App'
import Media from 'components/Media'
import ParserError from 'components/ParserError'
import useMediaList from 'hooks/useMediaList'
import { GetServerSideProps } from 'next/types'
import React from 'react'
import getData, { GetData } from 'utils/getData'
import { MediaResult, removePeople } from 'utils/mediaTypes'
import parseMediaData from 'utils/parseMediaData'

interface TrendingParserProps {
	trendingResult: GetData<MediaResult>;
}

const TrendingParser: React.FC<TrendingParserProps> = ({ trendingResult }) => {
	return (
		<App>
			{
				trendingResult?.success ?
					<Trending trendingData={trendingResult.data} /> :
					<ParserError error={trendingResult.data} />
			}
		</App>
	)
}

interface TrendingProps {
	trendingData: MediaResult;
}

const Trending: React.FC<TrendingProps> = ({ trendingData }) => {

	const cookies = useMediaList()

	return (
		<Box sx={{
			display: 'flex',
			gap: '8px',
			flexWrap: 'wrap'
		}}>
			{
				removePeople(trendingData).map((result, i) => {
					return <Media key={i} mediaData={parseMediaData(result)} cookies={cookies} />
				})
			}
		</Box>
	)
}

export const getServerSideProps: GetServerSideProps = async () => {

	const data = await getData<MediaResult>('trending/all/week')

	return {
		props: {
			trendingResult: data
		}
	}
}

export default TrendingParser