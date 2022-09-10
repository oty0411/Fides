import * as React from 'react';
import * as UserTypes from '../types/userTypes';

export const useProfile = (props) => {
  const [profile, setProfile] = useState<DocumentData | null>(null)

  return { profile }
}
/**
 * ユーザ検索結果表示コンポーネント
 * @param {*} props 
 * @returns 
 */
export default function profile(props) {

	// 女優画像URL
	const imageUrls = createImageUrls();
	let imageNumber = -1;

	return (
		<>
			<p>{props.message}</p>
			<ul>
			  {props.searchResult.map(item => (
					//<li key={item.User.Id}>{item.Profile.ActressName}</li>
					<li key={item.User.Id}>
						{item.Profile.ActressName}<br></br>
						<div style={{ display: "flex" }}>
							<div>
								<img src={imageUrls[++imageNumber % 10]}></img>
							</div>
							<div>
								<ul>
								<li>身長:{ item.Profile.Height }</li>
								<li>体重:{item.Profile.Weight}</li>
								<li>バストサイズ:{UserTypes.BreastSizeTypeString[String(item.Profile.BreastSize)]}</li>
								<li>ウェストサイズ:{item.Profile.WaistSize}</li>
								<li>ヒップサイズ:{ item.Profile.HipSize }</li>
								<li>服サイズ:{ UserTypes.ClothesSizeTypeString[String(item.Profile.ClothesSize)]}</li>
								<li>靴サイズ:{ item.Profile.ShoesSize }</li>
								</ul>
							</div>
						</div>
					</li>
				))}
      </ul>
		</>
	);
	
	function createImageUrls() {
		// 画像引用URL:https://routine-artist.net/beautiful-av-stars/
		let array = new Array();
		// 0
		array.push("https://routine-artist.net/wp-content/uploads/2021/01/hukada_eimi.jpg");
		// 1
		array.push("https://routine-artist.net/wp-content/uploads/2021/01/yositaka_nene.jpg");
		// 2
		array.push("https://routine-artist.net/wp-content/uploads/2021/01/kaede_karen.jpg");
		// 3
		array.push("https://routine-artist.net/wp-content/uploads/2021/01/itikawa_masami.jpg");
		// 4
		array.push("https://routine-artist.net/wp-content/uploads/2021/01/mitani_akari.jpg");
		// 5
		array.push("https://routine-artist.net/wp-content/uploads/2021/01/nanami_thina.jpg");
		// 6
		array.push("https://routine-artist.net/wp-content/uploads/2021/01/yamagishi_aika.jpg");
		// 7
		array.push("https://routine-artist.net/wp-content/uploads/2021/01/akari_tumugi.jpg");
		// 8
		array.push("https://routine-artist.net/wp-content/uploads/2021/01/asuka_kirara.jpg");
		// 9
		array.push("https://routine-artist.net/wp-content/uploads/2021/01/mino_suzume.jpg");

		return array;
	}
}

