import { ClearAll as ClearAllIcon, Clear as ClearIcon } from '@mui/icons-material'
import { Container, Divider, IconButton, List, ListItem, ListItemText, ListSubheader, TextField, Typography } from '@mui/material'
import App from 'components/App'
import useSearchHistory from 'hooks/useSearchHistory'
import { useRouter } from 'next/router'
import React, { useState } from 'react'

const Search: React.FC = () => {

	const router = useRouter()
	const { list, remove, clear } = useSearchHistory()

	const [searchValue, setSearchValue] = useState<string>('')

	return (
		<App>
			<Container>
				<TextField
					label='Search'
					variant='standard'
					fullWidth
					value={searchValue}
					onChange={event => setSearchValue(event.target.value)}
					onKeyPress={event => {
						if (event.key !== 'Enter' || searchValue.length === 0) return
						router.push(`/search/${searchValue}`)
						setSearchValue('')
					}}
					sx={{
						marginY: 6
					}}
				/>
				<List>
					<ListSubheader>Search History</ListSubheader>
					{
						list.map(value => {
							return <ListItem
								key={value}
								secondaryAction={
									<IconButton onClick={() => remove(value)}>
										<ClearIcon />
									</IconButton>
								}
							>
								<ListItemText
									primary={value}
								/>
							</ListItem>
						})
					}
					{
						list.length ? <>
							<Divider />
							<ListItem>
								<ListItemText
									primary='Clear All'
								/>
								<IconButton onClick={() => clear()}>
									<ClearAllIcon />
								</IconButton>
							</ListItem>
						</> : <Typography sx={{
							fontStyle: 'italic'
						}}>None</Typography>
					}
				</List>
			</Container>
		</App>
	)
}

export default Search