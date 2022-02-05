import { CssBaseline } from '@mui/material'
import { Box } from '@mui/material'
import React from 'react'
import GlobalCssOverride from 'utils/theme'

import SideDrawer from './SideDrawer'

const App: React.FC = ({ children }) => {
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column'
		}}>
			<CssBaseline />
			<GlobalCssOverride />
			<SideDrawer >
				<Box sx={{
					margin: '8px'
				}}>
					{children}
				</Box>
			</SideDrawer>
		</Box>
	)
}

export default App