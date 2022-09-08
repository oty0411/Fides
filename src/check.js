import React, { useState, useEffect } from "react"

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

  const handleChange = e => {
//checkedItemsのstateをセット
    setCheckedItems({
      ...checkedItems,
      [e.target.id]: e.target.checked
    })
    console.log('checkedItems:', checkedItems)
  }

  const dataSendBtn = e => {
//既定のイベントをキャンセルさせる
    e.preventDefault()
//送信ボタンを押したタイミングで、checkedItemsオブジェクトのvalueがtrueのkeyのみを配列にしてconsoleに表示させる
    const dataPushArray = Object.entries(checkedItems).reduce((pre,[key, value])=>{
      value && pre.push(key)
      return pre
    },[])
    console.log("dataPushArray:", dataPushArray)
  }

  return (
    <>
      <h2>本番</h2>
      <form>
        {checkLists.map((item, index) => {
          index = index + 1
          return (
            <label htmlFor={`_${index}`} key={`key_${index}`}>
              <CheckBox
                id={`id_${index}`}
                value={item}
                onChange={handleChange}
                checked={checkedItems[item.id]}
              />
              {item}
            </label>
          )
        })}
          </form>
          <h2>ゴムなし</h2>
           <form>
        {checkLists.map((item, index) => {
          index = index + 1
          return (
            <label htmlFor={`id_${index}`} key={`key_${index}`}>
              <CheckBox
                id={`id_${index}`}
                value={item}
                onChange={handleChange}
                checked={checkedItems[item.id]}
              />
              {item}
            </label>
          )
        })}
          </form>
             <h2>中出し</h2>
           <form>
        {checkLists.map((item, index) => {
          index = index + 1
          return (
            <label htmlFor={`id_${index}`} key={`key_${index}`}>
              <CheckBox
                id={`id_${index}`}
                value={item}
                onChange={handleChange}
                checked={checkedItems[item.id]}
              />
              {item}
            </label>
          )
        })}
          </form>
             <h2>フェラチオ</h2>
           <form>
        {checkLists.map((item, index) => {
          index = index + 1
          return (
            <label htmlFor={`id_${index}`} key={`key_${index}`}>
              <CheckBox
                id={`id_${index}`}
                value={item}
                onChange={handleChange}
                checked={checkedItems[item.id]}
              />
              {item}
            </label>
          )
        })}
          </form>
             <h2>イラマチオ</h2>
           <form>
        {checkLists.map((item, index) => {
          index = index + 1
          return (
            <label htmlFor={`id_${index}`} key={`key_${index}`}>
              <CheckBox
                id={`id_${index}`}
                value={item}
                onChange={handleChange}
                checked={checkedItems[item.id]}
              />
              {item}
            </label>
          )
        })}
          </form>
        
          {/* checkedがない場合には送信ボタンを表示させない */}
        {!isBtnHide && <button onClick={dataSendBtn}>送信</button>}
    </>
  )
}


export default CheckBox
