export const Button = ({
  text,
  staff,
  initStaffs,
  setInitStaffs,
  setDiv1Staffs,
  div1Staffs,
  setDiv2Staffs,
  div2Staffs,
  setDiv1StaffsNum,
  setDiv2StaffsNum,
  display,
  setDisplay,
  setErrorMessage,
  modal,
}) => {
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

  // クリック時のイベント登録
  // textの値に応じて処理を表示切り替え
  const handleClick = (e) => {
    // 表示切り替えボタン
    if (text === "表示切り替え") {
      // State更新、真偽値を逆にする
      setDisplay(!display);
    }

    // 削除ボタン
    if (text === "削除") {
      // 移動させるデータを取得
      const targetStaff = staff;

      // initStaffsに取得したidのデータを追加
      const newInitStaffs = [...initStaffs, targetStaff];

      // idプロパティで並び替え
      sortByKey(newInitStaffs);

      // State更新
      setInitStaffs(newInitStaffs);

      // 移動前の区分のデータを扱うStateから移動させるデータを削除
      // 区分に応じて実行するState関数を表示切り替え。ボタンの親要素を遡り、division1かdivision2かで場合分け
      // クリックされたボタンを取得
      const targetButton = e.currentTarget;

      // 区分1、2内でそれぞれnull or nullでないようになる変数を定義
      const targetBUttonDivision1 = targetButton.closest("#division1");
      const targetBUttonDivision2 = targetButton.closest("#division2");

      // 場合分け
      if (targetBUttonDivision1 !== null) {
        const newDiv1Staffs = div1Staffs.filter((div1Staff) => {
          return div1Staff.id !== targetStaff.id;
        });

        // idプロパティで並び替え
        sortByKey(newDiv1Staffs);

        // 移動後の区分のデータを扱うState更新
        setDiv1Staffs([...newDiv1Staffs]);

        // 移動後の区分の人数うデータを扱うState更新
        setDiv1StaffsNum((prev) => prev - 1);
      } else if (targetBUttonDivision2 !== null) {
        const newDiv2Staffs = div2Staffs.filter((div2Staff) => {
          return div2Staff.id !== targetStaff.id;
        });

        // idプロパティで並び替え
        sortByKey(newDiv2Staffs);

        // 移動後の区分のデータを扱うState更新
        setDiv2Staffs([...newDiv2Staffs]);

        // 移動後の区分の人数うデータを扱うState更新
        setDiv2StaffsNum((prev) => prev - 1);
      }
    }

    if (text === "閉じる") {
      // エラーメッセージを扱うState更新
      setErrorMessage("");

      // モーダルからisactiveクラスを削除
      const targetModal = modal.current;
      const targetModalInner = targetModal.querySelector("div");
      // 配列の最後のインデックス番号は「配列の個数 - 1」
      const targetModalNum = targetModal.classList.length - 1;
      const targetModalInnerNum = targetModalInner.classList.length - 1;
      // 配列の最後のインデックス番号の値を削除（classList配列から最後のクラスを取り除く）
      targetModal.classList.remove(targetModal.classList[targetModalNum]);
      targetModalInner.classList.remove(
        targetModalInner.classList[targetModalInnerNum]
      );
    }
  };

  return <button onClick={handleClick}>{text}</button>;
};
