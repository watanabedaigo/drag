import { Button } from "./Button";
import { Num } from "./Num";
import { Droppable, Draggable } from "react-beautiful-dnd";
import classes from "./ToDoList.module.scss";

export const ToDoList = ({
  id,
  list,
  initStaffs,
  setInitStaffs,
  div1Staffs,
  setDiv1Staffs,
  div2Staffs,
  setDiv2Staffs,
  display,
  setDisplay,
}) => {
  // タイトルを格納するオブジェクト定義
  const listTitle = {
    all: "ALL",
    div1: "区分1（positionがdiv1のみ配置可能）",
    div2: "区分2（positionがdiv2のみ配置可能）",
  };

  // オブジェクトの並び替えを行う関数定義
  const sortByKey = (array) => {
    array.sort(function (a, b) {
      if (a.id > b.id) {
        return 1;
      } else {
        return -1;
      }
    });
  };

  // 該当区分からitemを削除し、allに追加する関数を定義
  const changeItem = (targetList, id, item) => {
    // 該当区分からitemを削除
    const newList = targetList.filter((targetItem) => {
      return targetItem.id !== item.id;
    });

    // State更新
    // idの値に応じて条件分岐
    if (id === "div1") {
      setDiv1Staffs(newList);
    } else if (id === "div2") {
      setDiv2Staffs([...newList]);
    }

    // allにitemを追加
    const newInitStaffs = [...initStaffs, item];

    // idプロパティで並び替え
    sortByKey(newInitStaffs);

    // State更新
    setInitStaffs(newInitStaffs);
  };

  // 削除ボタンクリック時のイベント登録
  const handleClickDelete = (id, idx, item) => {
    // idの値に応じて条件分岐
    if (id === "div1") {
      changeItem(div1Staffs, id, item);
    } else if (id === "div2") {
      changeItem(div2Staffs, id, item);
    }
  };

  // idの値に応じてmaxNumの値を条件分岐
  let maxNum;
  if (id === "div1") {
    maxNum = 3;
  } else if (id === "div2") {
    maxNum = 2;
  }

  // itemのスタイル
  const getItemStyle = (draggableStyle) => ({
    display: "flex",
    alignItems: "center",
    marginBottom: "0.5rem",
    background: "gray",
    color: "#fff",
    paddingLeft: "20px",

    ...draggableStyle,
  });

  // listのスタイル
  const getListStyle = (isDraggingOver) => ({
    padding: "1rem",
    margin: "1rem",
    background: "white",
    minWidth: "150px",
    border: isDraggingOver ? "solid 5px lightgray" : "solid 5px white",
    borderRadius: "0.5rem",
    textAlign: "left",
  });

  // 削除ボタンのスタイル
  const buttonStyle = () => ({
    background: "",
    marginLeft: "10px",
  });

  // wrapperのクラス指定
  let wrapper;
  if (id === "all") {
    wrapper = classes.allWrapper;
  } else if (id === "div1") {
    wrapper = classes.div1Wrapper;
  } else if (id === "div2") {
    wrapper = classes.div2Wrapper;
  }

  return (
    <div>
      <Droppable droppableId={id}>
        {(provided, snapshot) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            style={getListStyle(snapshot.isDraggingOver)}
            className={wrapper}
          >
            <div class={classes.ttlWrapper}>
              <h2>{listTitle[id]}</h2>
              {id === "all" ? (
                <Button
                  text="表示切り替え"
                  display={display}
                  setDisplay={setDisplay}
                />
              ) : (
                <Num
                  id={id}
                  div1Staffs={div1Staffs}
                  div2Staffs={div2Staffs}
                  maxNum={maxNum}
                />
              )}
            </div>
            {list.map((item, index) => (
              <Draggable
                key={item.id}
                draggableId={"id" + item.id + "-" + item.position}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={getItemStyle(provided.draggableProps.style)}
                    className={
                      item.position === "div1"
                        ? `${classes.div1} ${classes.div}`
                        : `${classes.div2} ${classes.div}`
                    }
                  >
                    {/* 三項演算子を用いて表示を表示切り替え */}
                    <p>
                      {display === true
                        ? item.name
                        : "position : " + item.position}
                    </p>
                    {/* 三項演算子を用いて、Listが受け取ったid(props)がallでない時のみ削除ボタンを表示 */}
                    {id !== "all" ? (
                      <button
                        style={buttonStyle()}
                        onClick={() => handleClickDelete(id, index, item)}
                      >
                        削除
                      </button>
                    ) : (
                      ""
                    )}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};
