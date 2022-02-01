import { Button, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { useState } from 'react'
import { clearEmptyLists } from 'utils/cookies'
import { MovieResult, TVResult } from 'utils/getSearchData'
import parseMediaData from 'utils/parseMediaData'

import Lists from './Lists'

interface MediaProps {
	data: MovieResult | TVResult;
}

const Media: React.FC<MediaProps> = ({ data }) => {

	const parsedData = parseMediaData(data)

	const [openList, setOpenList] = useState<boolean>(false)

	return (
		<Card sx={{
			width: 200,
			height: 450,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between'
		}}>
			{
				openList ?
					<Lists data={parsedData} /> :
					<CardActionArea>
						<CardMedia
							component='img'
							image={`https://image.tmdb.org/t/p/w500${parsedData.backdrop}`}
							alt={`${parsedData.title} Backdrop`}
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant='body1'
								align='center'
								component='div'
							>
								{parsedData.title}
							</Typography>
							<Typography
								variant='body2'
								align='center'
								color='text.secondary'
							>
								{data.media_type.toUpperCase()}
							</Typography>
						</CardContent>
					</CardActionArea>
			}
			<CardActions>
				<Button
					size='small'
					color='primary'
					fullWidth
					onClick={() => {
						if (openList) {
							clearEmptyLists()
						}
						setOpenList(!openList)
					}}
				>
					{openList ? 'Close lists' : 'Add to list'}
				</Button>
			</CardActions>
		</Card>
	)
}

export default Media