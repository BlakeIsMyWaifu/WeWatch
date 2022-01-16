import Header from 'components/Header'
import type { NextPage } from 'next'
import GlobalCssOverride from 'utils/theme'

const Home: NextPage = () => {
	return (
		<>
			<GlobalCssOverride />
			<Header />
		</>
	)
}

export default Home
