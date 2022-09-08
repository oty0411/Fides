import React, { useState, useEffect } from "react"
import { useForm } from 'react-hook-form';
import { Select,MenuItem } from "@material-ui/core";




//checkboxのvalueリスト
const checkLists = [
  "できる",
  "できない",
  "要相談",
]

//checkboxコンポーネント
const CheckBox = ({id, value, checked, onChange}) => {
  return (
    <input
      id={id}
      type="checkbox"
      name="inputNames"
      checked={checked}
      onChange={onChange}
      value={value}
    />
  )
}

const CheckBoxList = () => {

//checkedItemsは初期値を空のオブジェクトにする
  const [checkedItems, setCheckedItems] = useState({})
//ひとつでもcheckedになっている場合にのみ送信ボタンを表示させたいので、全体のStateを監視する
  const [isBtnHide, setIsBtnHide] = useState(true)
  const { register, handleSubmit, formState: { errors },} = useForm();
  useEffect(() => {
//checkedItemsが空では無い場合、送信ボタンを表示させる
    Object.keys(checkedItems).length && setIsBtnHide(false)
//すべてのcheckedItemの値がfalseの場合に送信ボタンを表示させる
    setTimeout(() => {
      if (
        Object.values(checkedItems).every(checkedItem => {
          return checkedItem === false
        })
      ) {
        setIsBtnHide(true)
      }
    },100);
  }, [checkedItems])

//   const handleChange = e => {
// //checkedItemsのstateをセット
//     setCheckedItems({
//       ...checkedItems,
//       [e.target.id]: e.target.checked
//     })
//     console.log('checkedItems:', checkedItems)
//   }

//   const dataSendBtn = e => {
// //既定のイベントをキャンセルさせる
//     e.preventDefault()
// //送信ボタンを押したタイミングで、checkedItemsオブジェクトのvalueがtrueのkeyのみを配列にしてconsoleに表示させる
//     const dataPushArray = Object.entries(checkedItems).reduce((pre,[key, value])=>{
//       value && pre.push(key)
//       return pre
//     },[])
//     console.log("dataPushArray:", dataPushArray)
//   }

const submit = (data) => {
    console.log(data);
  };
  


  return (
    <>
      
      <form onSubmit={handleSubmit(submit)}>
        <div>
          <label htmlFor="honban" style={{ marginRight: "30px" }}>
            本番
          </label>
          <Select　{...register("honban")} name="honban" id="honban">
            <MenuItem value={0}>できる</MenuItem>
            <MenuItem value={1}>できない</MenuItem>
          <MenuItem value={2}>要相談</MenuItem>
          </Select>  
       </div>

        <div>
          <label htmlFor="gomunashi" style={{ marginRight: "30px" }}>
            ゴムなし
          </label>
          <Select {...register("gomunashi")} name="gomunashi" id="gomunashi">
            <MenuItem value={0}>できる</MenuItem>
            <MenuItem value={1}>できない</MenuItem>
            <MenuItem value={2}>要相談</MenuItem>
          </Select>
        </div>

        <div>
          <label htmlFor="nakadashi" style={{ marginRight: "30px" }}>
            中出し
          </label>
          <Select {...register("nakadashi")} name="nakadashi" id="nakadashi">
            <MenuItem value={0}>できる</MenuItem>
            <MenuItem value={1}>できない</MenuItem>
            <MenuItem value={2}>要相談</MenuItem>
          </Select>
        </div>

        <div>
          <label htmlFor="ferachio" style={{ marginRight: "30px" }}>
            フェラチオ
          </label>
          <Select {...register("ferachio")} name="ferachio" id="ferachio">
            <MenuItem value={0}>できる</MenuItem>
            <MenuItem value={1}>できない</MenuItem>
            <MenuItem value={2}>要相談</MenuItem>
          </Select>
        </div>

        <div>
          <label htmlFor="imarachio" style={{ marginRight: "30px" }}>
            イマラチオ
          </label>
          <Select {...register("imarachio")} name="imarachio" id="imarachio">
            <MenuItem value={0}>できる</MenuItem>
            <MenuItem value={1}>できない</MenuItem>
            <MenuItem value={2}>要相談</MenuItem>
          </Select>
        </div>
        <button type="submit" variant="outlined">
          作成
      </button>
      </form>
</>
  )
}
  export default CheckBoxList