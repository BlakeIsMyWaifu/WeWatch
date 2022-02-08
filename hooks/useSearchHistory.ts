import { CookieAttributes } from 'js-cookie'
import { useMemo } from 'react'

import useCookie from './useCookie'

const useSearchHistory = () => {
	const cookieOptions: CookieAttributes = { sameSite: 'strict' }

	const [listValue, updateList] = useCookie<string[]>('search', [], cookieOptions)

	const list = useMemo(() => {
		return listValue ?? []
	}, [listValue])

	const add = (data: string): void => {
		const updatedList = new Set(list)
		updatedList.add(data)

		updateList(Array.from(updatedList))
	}

	const remove = (data: string): void => {
		const updatedList = new Set(list)
		updatedList.delete(data)

		updateList(Array.from(updatedList))
	}

	const clear = (): void => {
		updateList([])
	}

	return {
		list,
		add,
		remove,
		clear
	}
}

export default useSearchHistory