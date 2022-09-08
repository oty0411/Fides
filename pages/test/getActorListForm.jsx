import * as Api from '../../utils/api'
import Link from 'next/link'

export default function App() {
	
	const handleClickEvent = () => {
		//console.log(data);
    const apiContext/*ApiContext*/ = {
      apiRootUrl: process.env.NEXT_PUBLIC_SELF_API_URL,
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