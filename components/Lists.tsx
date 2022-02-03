import DoneIcon from '@mui/icons-material/Done'
import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, TextField } from '@mui/material'
import { UseMediaList } from 'hooks/useMediaList'
import React, { useState } from 'react'
import { MediaData } from 'utils/parseMediaData'

interface ListsProps {
	data: MediaData;
	cookies: UseMediaList;
}

const Lists: React.FC<ListsProps> = ({ data, cookies }) => {

	const { lists, addMedia, removeMedia, addList } = cookies

	const [newListValue, setNewListValue] = useState<string>('')

	return (
		<List sx={{
			width: '100%',
			maxWidth: 200,
			maxHeight: 450,
			overflowY: 'scroll',
			bg: 'background.paper'
		}}>
			{
				Object.keys(lists).map(list => {
					const isOnList = !!lists[list][data.id]
					return <ListItem
						key={list}
						disablePadding
					>
						<ListItemButton
							onClick={() => {
								isOnList ? removeMedia(data.id, list) : addMedia(data, list)
							}}
						>
							<ListItemIcon sx={{
								minWidth: 4,
								width: 8
							}}>
								{isOnList && <DoneIcon />}
							</ListItemIcon>
							<ListItemText
								inset
								primary={list}
								sx={{
									paddingLeft: 4
								}}
							/>
						</ListItemButton>
					</ListItem>
				})
			}
			<Divider />
			<ListItem>
				<TextField
					label='New List'
					variant='standard'
					onChange={event => setNewListValue(event.target.value)}
					onKeyPress={event => {
						if (event.key !== 'Enter' || newListValue.length === 0) return
						addList(newListValue)
						addMedia(data, newListValue)
						setNewListValue('');
						(event.target as HTMLInputElement).value = ''
					}}
				/>
			</ListItem>
		</List>
	)
}

export default Lists