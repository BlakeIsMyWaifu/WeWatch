import Box from '@mui/material/Box'
import React from 'react'
import GlobalCssOverride from 'utils/theme'

import Header from './Header'

const App: React.FC = ({ children }) => {
	return (
		<Box sx={{
			display: 'flex',
			flexDirection: 'column'
		}}>
			<GlobalCssOverride />
			<Header />
			<Box sx={{
				margin: '8px'
			}}>
				{children}
			</Box>
		</Box>
	)
}

export default App