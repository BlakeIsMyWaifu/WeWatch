import { Button, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { useState } from 'react'
import { clearEmptyLists } from 'utils/cookies'
import { MediaData } from 'utils/parseMediaData'

import Lists from './Lists'

interface MediaProps {
	mediaData: MediaData;
	forceRerender?: [boolean, React.Dispatch<React.SetStateAction<boolean>>];
}

const Media: React.FC<MediaProps> = ({ mediaData, forceRerender }) => {

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
					<Lists data={mediaData} /> :
					<CardActionArea>
						<CardMedia
							component='img'
							image={`https://image.tmdb.org/t/p/w500${mediaData.backdrop}`}
							alt={`${mediaData.title} Backdrop`}
						/>
						<CardContent>
							<Typography
								gutterBottom
								variant='body1'
								align='center'
								component='div'
							>
								{mediaData.title}
							</Typography>
							<Typography
								variant='body2'
								align='center'
								color='text.secondary'
							>
								{mediaData.type.toUpperCase()}
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
						if (forceRerender) {
							forceRerender[1](!forceRerender[0])
						}
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