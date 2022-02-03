import { Grid, Stack, Typography } from '@mui/material'
import App from 'components/App'
import Media from 'components/Media'
import useMediaList, { MediaListCookie } from 'hooks/useMediaList'
import React, { useEffect, useState } from 'react'

const Home: React.FC = () => {

	const cookies = useMediaList()

	const [lists, setLists] = useState<MediaListCookie>({})

	useEffect(() => {
		setLists(cookies.lists)
	}, [cookies])

	return (
		<App>
			<Grid
				container
				spacing={12}
			>
				{
					Object.entries(lists).map(([listName, listData]) => {
						return <Grid
							key={listName}
							item
						>
							<Typography
								variant='h4'
								sx={{
									marginLeft: 3
								}}
							>
								{listName}
							</Typography>
							<Stack
								direction='row'
								spacing={2}
							>
								{
									Object.values(listData).map(mediaData => {
										return <Media
											key={mediaData.id}
											mediaData={mediaData}
											cookies={cookies}
										/>
									})
								}
							</Stack>
						</Grid>
					})
				}
			</Grid>
		</App>
	)
}

export default Home
