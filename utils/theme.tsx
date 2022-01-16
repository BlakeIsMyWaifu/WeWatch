import { ThemeProvider } from '@emotion/react'
import { CssBaseline, createTheme } from '@mui/material'

const theme = createTheme({
	palette: {
		primary: {
			main: '#3f51b5'
		},
		secondary: {
			main: '#f50057'
		}
	},
	components: {
		MuiCssBaseline: {
			styleOverrides: {
				body: {
					margin: 0
				}
			}
		}
	}
})

const GlobalCssOverride = () => {
	return (
		<ThemeProvider theme={theme}>
			<CssBaseline />
		</ThemeProvider>
	)
}

export default GlobalCssOverride