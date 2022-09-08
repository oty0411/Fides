import * as Api from '../../utils/api'
import Link from 'next/link'
import getConfig from "next/config"

export default function App() {
	
	const handleClickEvent = () => {
		//console.log(data);
    const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();
    const apiContext = {
      apiRootUrl: publicRuntimeConfig.NEXT_PUBLIC_SELF_API_URL,
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