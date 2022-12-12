import { ToDoList } from "./ToDoList";
import { DragDropContext } from "react-beautiful-dnd";
import classesModal from "./Modal.module.scss";

export const ToDoListContainer = ({
  initStaffs,
  setInitStaffs,
  div1Staffs,
  setDiv1Staffs,
  div2Staffs,
  setDiv2Staffs,
  display,
  setDisplay,
  setErrorMessage,
  modal,
  allStaffs,
  updateStaffData,
}) => {
  // 各リスト名を格納するオブジェクト定義
  // このオブジェクトのプロパティの数分だけリストが生成される
  const listName = {
    all: "ALL",
    div1: "区分1",
    div2: "区分2",
  };

  // ドラッグ&ドロップした要素を入れ替える
  const reorder = (list, startIndex, endIndex) => {
    // コピーされた新しい Array インスタンスを生成
    const result = Array.from(list);

    // resultのstartIndexを先頭に要素を1つ削除。その削除したものが返り値となり、removedに格納される
    const [removed] = result.splice(startIndex, 1);

    // resultのendIndexを先頭に0個削除（＝削除しない）、removedを追加
    result.splice(endIndex, 0, removed);

    return result;
  };

  // ドラッグ&ドロップにより配列の中身を変える
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    // sourceClone配列から1つ削除
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    // 上記で削除したものを移動先の配列に追加
    destClone.splice(droppableDestination.index, 0, removed);

    // オブジェクト定義
    const result = {};

    // resultのdroppableSource.droppableIdプロパティにsourceCloneを代入、以下同様
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
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

  // 項目取得の関数定義
  // listName[id]の値に応じて条件分岐
  const getList = (id) => {
    if (listName[id] === "ALL") {
      return initStaffs;
    } else if (listName[id] === "区分1") {
      return div1Staffs;
    } else if (listName[id] === "区分2") {
      return div2Staffs;
    }
  };

  // State更新の関数定義
  // listName[id]の値に応じて条件分岐
  const setItemInList = (id, list) => {
    sortByKey(list);
    if (listName[id] === "ALL") {
      setInitStaffs(list);
    } else if (listName[id] === "区分1") {
      setDiv1Staffs(list);
    } else if (listName[id] === "区分2") {
      setDiv2Staffs(list);
    }
  };

  // ドロップ後の処理を定義
  const onDragEnd = (result) => {
    // 共通の処理を関数で定義
    // jsonデータ更新
    const updateItem = () => {
      // draggableIdをもとに移動の対象となるjsonデータを取得
      // 移動の対象となるデータのidを取得
      const targetId = Number(
        result.draggableId.substr(0, result.draggableId.indexOf("-")).substr(2)
      );
      // 移動の対象となるデータを取得
      const targetStaff = allStaffs.find((staff) => {
        return staff.id === targetId;
      });

      // initDivisionプロパティの値を移動後の区分の値に更新
      const taregtDivison = result.destination.droppableId;
      // initDivisionプロパティの値を上書き
      targetStaff.initDivision = taregtDivison;

      // json自体の値を更新
      updateStaffData(targetId, targetStaff);
    };

    // 共通の処理を関数で定義
    // データ移動
    const moveItem = (result) => {
      const { source, destination } = result;
      if (!result.destination) {
        return;
      }
      if (source.droppableId === destination.droppableId) {
        const update = reorder(
          getList(source.droppableId),
          source.index,
          destination.index
        );
        setItemInList(source.droppableId, update);
      } else {
        const result = move(
          getList(source.droppableId),
          getList(destination.droppableId),
          source,
          destination
        );
        setItemInList(source.droppableId, result[source.droppableId]);
        setItemInList(destination.droppableId, result[destination.droppableId]);
      }

      updateItem();
    };

    // 共通の処理を関数で定義
    // エラーモーダル表示
    const openModal = (errorMessage) => {
      // エラーメッセージを扱うState更新
      setErrorMessage(errorMessage + "を配置してください。");

      // モーダルにisactiveクラスを付与
      const targetModal = modal.current;
      const targetModalInner = targetModal.querySelector("div");
      targetModal.classList.add(classesModal.modalIsActive);
      targetModalInner.classList.add(classesModal.modalInnerIsActive);
    };

    // result.draggableIdの-以降の文字列を取得（positionに該当する部分を取得）
    const position = result.draggableId.substr(
      result.draggableId.indexOf("-") + 1
    );

    // result.destination.droppableIdの値に応じて実行する関数を表示切り替える
    if (result.destination.droppableId === "all") {
      // 全てのpositionのデータが移動可能
      // データ移動
      moveItem(result);
    } else if (result.destination.droppableId === "div1") {
      // positionがdiv1のデータのみ移動可能
      if (position === "div1") {
        // データ移動
        moveItem(result);
      } else {
        // エラーモーダル表示
        openModal("「div1」");
      }
    } else if (result.destination.droppableId === "div2") {
      // 全てのpositionのデータが移動可能
      // データ移動
      if (position === "div2") {
        // データ移動
        moveItem(result);
      } else {
        // エラーモーダル表示
        openModal("「div2」");
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="To-do-list-container">
        {Object.keys(listName).map((key) => (
          <ToDoList
            key={key}
            id={key}
            list={getList(key)}
            initStaffs={initStaffs}
            setInitStaffs={setInitStaffs}
            div1Staffs={div1Staffs}
            setDiv1Staffs={setDiv1Staffs}
            div2Staffs={div2Staffs}
            setDiv2Staffs={setDiv2Staffs}
            setDisplay={setDisplay}
            display={display}
          />
        ))}
      </div>
    </DragDropContext>
  );
};
