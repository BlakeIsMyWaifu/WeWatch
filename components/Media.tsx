import { Button, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material'
import Card from '@mui/material/Card'
import { MovieResult, TVResult } from 'utils/getSearchData'

interface MediaProps {
	data: MovieResult | TVResult;
}

const Media: React.FC<MediaProps> = ({ data }) => {

	const isMovie = data.media_type === 'movie'

	const parsedData = {
		title: isMovie ? data.title : data.name,
		backdrop: data.poster_path
	}

	return (
		<Card sx={{
			width: 200,
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'space-between'
		}}>
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
			<CardActions>
				<Button
					size='small'
					color='primary'
					fullWidth
				>
					Add to list
				</Button>
			</CardActions>
		</Card>
	)
}

export default Media