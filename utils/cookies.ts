import Cookies from 'js-cookie'

import { MediaData } from './parseMediaData'

interface MediaCookie extends MediaData {
	list: string;
}

export type MediaListCookie = Record<string, Record<string, MediaCookie>>

export const getLists = (): MediaListCookie => JSON.parse(Cookies.get('list') ?? '{}')

const setList = (data: MediaListCookie): void => void Cookies.set('list', JSON.stringify(data), { sameSite: 'strict' })

export const addMedia = (data: MediaData, list: string): void => {
	const currentLists = getLists()

	if (currentLists[list][data.id]) return

	const updatedLists: MediaListCookie = {
		...currentLists,
		[list]: {
			...currentLists[list],
			[data.id]: {
				...data,
				list
			}
		}
	}

	setList(updatedLists)
}

export const removeMedia = (id: number, list: string): void => {
	const currentLists = getLists()

	if (!currentLists[list][id]) return

	delete currentLists[list][id]

	setList(currentLists)
}

export const addList = (list: string): void => {
	const currentLists = getLists()

	const updatedLists: MediaListCookie = {
		...currentLists,
		[list]: {}
	}

	setList(updatedLists)
}

export const clearEmptyLists = (): void => {
	const currentLists = getLists()

	const filteredList = Object.entries(currentLists).filter(([_key, value]) => Object.keys(value).length)

	const updatedLists: MediaListCookie = Object.assign({}, ...filteredList.map(([key, value]) => ({ [key]: value })))

	setList(updatedLists)
}