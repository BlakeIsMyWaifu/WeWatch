import { Menu as MenuIcon, Search as SearchIcon } from '@mui/icons-material'
import { IconButton, InputBase, Toolbar, Typography } from '@mui/material'
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar'
import { alpha, styled } from '@mui/material/styles'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

interface AppBarProps extends MuiAppBarProps {
	open?: boolean
	drawerWidth?: number;
}

const AppBar = styled(MuiAppBar, { shouldForwardProp: prop => prop !== 'open' && prop !== 'drawerWidth' })<AppBarProps>(({ theme, open, drawerWidth }) => ({
	zIndex: theme.zIndex.drawer + 1,
	transition: theme.transitions.create(['width', 'margin'], {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	...(open && {
		marginLeft: drawerWidth,
		width: `calc(100% - ${drawerWidth}px)`,
		transition: theme.transitions.create(['width', 'margin'], {
			easing: theme.transitions.easing.sharp,
			duration: theme.transitions.duration.enteringScreen
		})
	})
}))

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

interface HeaderProps {
	open: boolean;
	setOpen: React.Dispatch<React.SetStateAction<boolean>>;
	drawerWidth: number;
}

const Header: React.FC<HeaderProps> = ({ open, setOpen, drawerWidth }) => {

	const router = useRouter()

	const [searchValue, setSearchValue] = useState<string>('')

	return (
		<AppBar
			position='fixed'
			open={open}
			drawerWidth={drawerWidth}
		>
			<Toolbar>
				<IconButton
					color='inherit'
					aria-label='open drawer'
					onClick={() => setOpen(true)}
					edge='start'
					sx={{
						marginRight: '36px',
						...(open && { display: 'none' })
					}}
				>
					<MenuIcon />
				</IconButton>
				<Typography
					variant='h6'
					noWrap
					component='div'
					sx={{
						flexGrow: 1,
						display: { xs: 'none', sm: 'block' }
					}}
				>
					WeWatch
				</Typography>
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
	)
}

export default Header
