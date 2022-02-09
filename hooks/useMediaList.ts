import { CookieAttributes } from 'js-cookie'
import { useCallback, useMemo } from 'react'
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

	const [listValue, updateCookie] = useCookie<MediaListCookie>('list', {}, cookieOptions)

	const lists = useMemo(() => {
		return listValue ?? {}
	}, [listValue])

	const addMedia = useCallback((data: MediaData, listName: string): void => {
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

		updateCookie(updatedLists)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lists])

	const removeMedia = useCallback((id: number, listName: string): void => {
		if (!lists[listName]?.[id]) return

		const updatedLists: MediaListCookie = { ...lists }
		delete updatedLists[listName][id]

		updateCookie(updatedLists)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lists])

	const addList = useCallback((list: string): void => {
		const updatedLists: MediaListCookie = {
			...lists,
			[list]: {}
		}

		updateCookie(updatedLists)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lists])

	const clearEmptyLists = useCallback((): void => {
		const filteredList = Object.entries(lists).filter(([_key, value]) => Object.keys(value).length)
		const updatedLists: MediaListCookie = Object.assign({}, ...filteredList.map(([key, value]) => ({ [key]: value })))

		updateCookie(updatedLists)
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [lists])

	return {
		lists,
		addMedia,
		removeMedia,
		addList,
		clearEmptyLists
	}
}

export default useMediaList