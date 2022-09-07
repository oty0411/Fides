import * as Api from '../../utils/api'
import Link from 'next/link'

export default function App() {
	
	const handleClickEvent = () => {
		//console.log(data);
    const apiContext/*ApiContext*/ = {
      apiRootUrl: process.env.SELF_API_URL || 'http://localhost:3000/api',
    }
		Api.GetActorsList(apiContext)
			.then(result => {
				console.log(result);
			})
	}

	return (
		<>
			<Link href="/">
        <a>戻る</a>
      </Link>
			<br />
			<button onClick={handleClickEvent}>一覧取得</button>
		</>
	)
}