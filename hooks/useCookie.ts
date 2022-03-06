import Cookies, { CookieAttributes } from 'js-cookie'
import { useCallback, useState } from 'react'

export const cookieOptions: CookieAttributes = { sameSite: 'strict', expires: 365 }

const useCookie = <T extends object>(name: string, defaultValue: T | null = null, options: CookieAttributes = {}): [T | null, (newValue: T) => void, () => void] => {

	const [value, setValue] = useState<T | null>(() => {
		const cookie = Cookies.get(name)
		if (cookie) return JSON.parse(cookie)
		Cookies.set(name, JSON.stringify(defaultValue ?? ''), options)
		return defaultValue
	})

	const updateCookie = useCallback((newValue: T) => {
		Cookies.set(name, JSON.stringify(newValue), options)
		setValue(newValue)
	}, [name, options])

	const deleteCookie = useCallback(() => {
		Cookies.remove(name)
		setValue(null)
	}, [name])

	return [value, updateCookie, deleteCookie]
}

export default useCookie