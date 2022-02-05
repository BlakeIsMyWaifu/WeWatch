export type GetData<T> = {
	success: true;
	data: T;
} | {
	success: false;
	data: GetDataError;
}

export interface GetDataError {
	status: number;
	message: string;
}

const getData = async <T>(endpoint: string, parameters?: URLSearchParams): Promise<GetData<T>> => {

	let url = `https://api.themoviedb.org/3/${endpoint}?api_key=${process.env.API}`

	if (parameters) {
		url += `&${parameters}`
	}

	const result = await fetch(url)

	if (result.status !== 200) {
		return {
			success: false,
			data: {
				status: result.status,
				message: result.statusText
			}
		}
	}

	const data: T = await result.json()

	return {
		success: true,
		data
	}
}

export default getData