import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputBase from '@mui/material/InputBase'
import { alpha, styled } from '@mui/material/styles'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useState } from 'react'

const Search = styled('div')(({ theme }) => ({
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25)
	},
	marginLeft: 0,
	width: '100%',
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(1),
		width: 'auto'
	}
}))

const SearchIconWrapper = styled('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center'
}))

const StyledInputBase = styled(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 0),
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%',
		[theme.breakpoints.up('sm')]: {
			width: '12ch',
			'&:focus': {
				width: '40ch'
			}
		}
	}
}))

const Header = () => {

	const router = useRouter()

	const [searchValue, setSearchValue] = useState<string>('')

	return (
		<Box sx={{
			flexGrow: 1
		}}>
			<AppBar
				position='static'
			>
				<Toolbar>
					<IconButton
						size='large'
						edge='start'
						color='inherit'
						aria-label='open drawer'
						sx={{ mr: 2 }}
					>
						<MenuIcon />
					</IconButton>
					<Link
						href='/'
						passHref
					>
						<Typography
							variant='h6'
							noWrap
							component='div'
							sx={{
								flexGrow: 1,
								display: { xs: 'none', sm: 'block' },
								cursor: 'pointer'
							}}
						>
							WeWatch
						</Typography>
					</Link>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder='Search…'
							inputProps={{ 'aria-label': 'search' }}
							value={searchValue}
							onChange={event => setSearchValue(event.target.value)}
							onKeyPress={event => {
								if (event.key !== 'Enter' || searchValue.length === 0) return
								router.push(`/search/${searchValue}`)
								setSearchValue('')
							}}
						/>
					</Search>
				</Toolbar>
			</AppBar>
		</Box>
	)
}

export default Header