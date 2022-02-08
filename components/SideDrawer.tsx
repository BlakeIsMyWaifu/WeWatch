import {
	ChevronLeft as ChevronLeftIcon,
	ChevronRight as ChevronRightIcon,
	Home as HomeIcon,
	Search as SearchIcon,
	TrendingUp as TrendingUpIcon
} from '@mui/icons-material'
import {
	Box,
	Divider,
	IconButton,
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Drawer as MuiDrawer
} from '@mui/material'
import { CSSObject, Theme, styled, useTheme } from '@mui/material/styles'
import Link from 'next/link'
import React, { useState } from 'react'

import Header from './Header'

const drawerWidth = 240

const openedMixin = (theme: Theme): CSSObject => ({
	width: drawerWidth,
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.enteringScreen
	}),
	overflowX: 'hidden'
})

const closedMixin = (theme: Theme): CSSObject => ({
	transition: theme.transitions.create('width', {
		easing: theme.transitions.easing.sharp,
		duration: theme.transitions.duration.leavingScreen
	}),
	overflowX: 'hidden',
	width: `calc(${theme.spacing(7)} + 1px)`,
	[theme.breakpoints.up('sm')]: {
		width: `calc(${theme.spacing(9)} + 1px)`
	}
})

const DrawerHeader = styled('div')(({ theme }) => ({
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'flex-end',
	padding: theme.spacing(0, 1),
	...theme.mixins.toolbar
}))

const Drawer = styled(MuiDrawer, { shouldForwardProp: prop => prop !== 'open' })(
	({ theme, open }) => ({
		width: drawerWidth,
		flexShrink: 0,
		whiteSpace: 'nowrap',
		boxSizing: 'border-box',
		...(open && {
			...openedMixin(theme),
			'& .MuiDrawer-paper': openedMixin(theme)
		}),
		...(!open && {
			...closedMixin(theme),
			'& .MuiDrawer-paper': closedMixin(theme)
		})
	})
)

interface CustomListItemProps {
	name: string;
	icon: React.ReactNode;
	href?: string;
}

const CustomListItem: React.FC<CustomListItemProps> = ({ name, icon, href }) => {

	const link = (inners: React.ReactNode) => <Link href={href ?? ''}>
		{inners}
	</Link>

	return (
		<ListItem
			button
			key={name}
		>
			{
				link(<ListItemIcon>
					{icon}
				</ListItemIcon>)
			}
			{
				link(<ListItemText
					primary={name}
				/>)
			}
		</ListItem>
	)
}

const SideDrawer: React.FC = ({ children }) => {

	const theme = useTheme()
	const [open, setOpen] = useState(false)

	return (
		<Box sx={{
			display: 'flex'
		}}>
			<Header
				open={open}
				setOpen={setOpen}
				drawerWidth={drawerWidth}
			/>

			<Drawer
				variant='permanent'
				open={open}
			>
				<DrawerHeader>
					<IconButton
						onClick={() => setOpen(false)}
					>
						{theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</DrawerHeader>
				<Divider />
				<List>
					<CustomListItem name='Home' icon={<HomeIcon />} href={'/'} />
					<CustomListItem name='Search' icon={<SearchIcon />} href='/search' />
					<CustomListItem name='Trending' icon={<TrendingUpIcon />} href='/trending' />
				</List>
			</Drawer>
			<Box
				component='main'
				sx={{
					flexGrow: 1,
					p: 3
				}}
			>
				<DrawerHeader />
				{children}
			</Box>
		</Box>
	)
}

export default SideDrawer