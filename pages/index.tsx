import { Grid, Stack, Typography } from '@mui/material'
import App from 'components/App'
import Media from 'components/Media'
import React, { useEffect, useState } from 'react'
import { MediaListCookie, getLists } from 'utils/cookies'

const Home: React.FC = () => {

	const [lists, setLists] = useState<MediaListCookie>({})
	const [rerender, setRerender] = useState<boolean>(true)

	useEffect(() => {
		setLists(getLists())
	}, [rerender])

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
											forceRerender={[rerender, setRerender]}
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
