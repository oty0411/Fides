import { useRef } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form'
import * as UserTypes from '../../types/userTypes';
import * as Api from '../../utils/api'
import Link from 'next/link'

export default function App() {
	
	const handleClickEvent = () => {
		//console.log(data);
    const apiContext/*ApiContext*/ = {
      apiRootUrl: process.env.SELF_API_URL || 'http://localhost:3000/api',
		}
		const conditon = createSearchCondition();
		Api.SearchActors(apiContext, conditon)
			.then(result => {
				console.log(result);
			})
	}

	// create search condition
	const createSearchCondition = () => {
		let condition = Array();
		condition.push({
			id: UserTypes.ActorDataItemId.Type,
			type: UserTypes.ActorSearchType.FullMatch,
			value: UserTypes.UserType.Actor,
			option: {},
		});
		condition.push({
			id: UserTypes.ActorDataItemId.Id,
			type: UserTypes.ActorSearchType.Range,
			value: 0,
			option: {
				lower: 1,
				upper: 4,
			},
		});
		console.log(condition);
		return condition;
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