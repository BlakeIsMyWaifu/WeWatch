import { GetDataError } from 'utils/getData'

interface ParserErrorProps {
	error: GetDataError;
}

const ParserError: React.FC<ParserErrorProps> = ({ error }) => {
	return (
		<p>Error Status ({error.status}): {error.message}</p>
	)
}

export default ParserError