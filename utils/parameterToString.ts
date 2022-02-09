const parameterToString = (parameter: string | string[] | undefined, defaultValue = ''): string => {
	return typeof parameter === 'object' ? parameter[0] : parameter ?? defaultValue
}

export default parameterToString