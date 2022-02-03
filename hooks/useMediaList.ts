import { CookieAttributes } from 'js-cookie'
import { useMemo } from 'react'
import { MediaData } from 'utils/parseMediaData'

import useCookie from './useCookie'

interface MediaCookie extends MediaData {
	list: string;
}

export type MediaListCookie = Record<string, Record<string, MediaCookie>>

export interface UseMediaList {
	lists: MediaListCookie;
	addMedia: (data: MediaData, listName: string) => void;
	removeMedia: (id: number, listName: string) => void;
	addList: (list: string) => void;
	clearEmptyLists: () => void;
}

const useMediaList = (): UseMediaList => {
	const cookieOptions: CookieAttributes = { sameSite: 'strict' }

	const [listValue, updateList] = useCookie<MediaListCookie>('list', {}, cookieOptions)

	const lists = useMemo(() => {
		return listValue ?? {}
	}, [listValue])

	const addMedia = (data: MediaData, listName: string): void => {
		if (lists[listName]?.[data.id]) return

		const updatedLists: MediaListCookie = {
			...lists,
			[listName]: {
				...lists[listName],
				[data.id]: {
					...data,
					list: listName
				}
			}
		}

		updateList(updatedLists)
	}

	const removeMedia = (id: number, listName: string): void => {
		if (!lists[listName]?.[id]) return

		const updatedLists: MediaListCookie = { ...lists }
		delete updatedLists[listName][id]

		updateList(updatedLists)
	}

	const addList = (list: string): void => {
		const updatedLists: MediaListCookie = {
			...lists,
			[list]: {}
		}

		updateList(updatedLists)
	}

	const clearEmptyLists = (): void => {
		const filteredList = Object.entries(lists).filter(([_key, value]) => Object.keys(value).length)
		const updatedLists: MediaListCookie = Object.assign({}, ...filteredList.map(([key, value]) => ({ [key]: value })))
		console.log({ listValue, lists, filteredList, updatedLists })

		// updateList(updatedLists)
	}

	return {
		lists,
		addMedia,
		removeMedia,
		addList,
		clearEmptyLists
	}
}

export default useMediaList