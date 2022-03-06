import { useCallback, useMemo } from 'react'

import useCookie, { cookieOptions } from './useCookie'

const useSearchHistory = () => {
	const [listValue, updateCookie] = useCookie<string[]>('search', [], cookieOptions)

	const list = useMemo(() => {
		return listValue ?? []
	}, [listValue])

	const add = useCallback((data: string): void => {
		const updatedList = new Set(list)
		updatedList.add(data)

		updateCookie(Array.from(updatedList))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const remove = useCallback((data: string): void => {
		const updatedList = new Set(list)
		updatedList.delete(data)

		updateCookie(Array.from(updatedList))
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const clear = useCallback((): void => {
		updateCookie([])
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	return {
		list,
		add,
		remove,
		clear
	}
}

export default useSearchHistory