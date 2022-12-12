import { useState, useEffect, useRef } from "react";
import * as staffData from "../apis/staff";

export const useStaff = () => {
  // State
  // 全職員のデータを扱うState
  // 扱うデータは配列
  // 基本的にいじらない。更新の時のみStateを更新
  // 初期値は空
  const [allStaffs, setAllStaffs] = useState([]);

  // ALLのstaffのデータを扱State
  // 扱うデータは配列
  // 初期値は空
  const [initStaffs, setInitStaffs] = useState([]);

  // 各区分のstaffのデータを扱うState
  // 扱うデータは配列
  // 初期値は空
  const [div1Staffs, setDiv1Staffs] = useState([]);
  const [div2Staffs, setDiv2Staffs] = useState([]);

  // リストの表示名の状態を扱うState
  // 扱う方は真偽地
  // 初期値はtrue（trueでは名前、falseでは役職を表示）
  const [display, setDisplay] = useState(true);

  // モーダルのエラーメッセージを扱うState
  // 扱う方は文字列
  // 初期値は空
  const [errorMessage, setErrorMessage] = useState("");

  // 副作用
  // 依存配列は空なので初回レンダリングのみ実行
  // APIリクエストを送るURLを定義
  const dataUrl = "http://localhost:3100/staff";
  useEffect(() => {
    // jsonserverにリクエストを送り、レスポンスを得る関数を実行
    staffData.apiGetAllstaffData(dataUrl).then((staffs) => {
      // initDivisionの値に応じて異なる配列にデータを格納
      // init
      const allStaff = staffs.filter((staff) => {
        return staff.initDivision === "all";
      });
      // State更新
      setInitStaffs(allStaff);

      // div1
      const div1Staff = staffs.filter((staff) => {
        return staff.initDivision === "div1";
      });
      // State更新
      setDiv1Staffs(div1Staff);

      // div2
      const div2Staff = staffs.filter((staff) => {
        return staff.initDivision === "div2";
      });
      // State更新
      setDiv2Staffs(div2Staff);

      // all
      // State更新
      setAllStaffs(staffs);
    });
  }, []);

  // useRef
  // 参照したい要素のref属性にrefオブジェクトを指定することで、refオブジェクトのcurrenrプロパティにその要素が格納される。
  const modal = useRef(null);

  // api関係の関数を用いた関数（staff.jsの関数を用いた関数）
  // 更新
  const updateStaffData = (id, sampleStaff) => {
    // staff.jsの関数を実施
    staffData.apiUpdateStaffData(dataUrl, id, sampleStaff);
  };

  return {
    allStaffs,
    setAllStaffs,
    initStaffs,
    setInitStaffs,
    div1Staffs,
    setDiv1Staffs,
    div2Staffs,
    setDiv2Staffs,
    display,
    setDisplay,
    errorMessage,
    setErrorMessage,
    modal,
    updateStaffData,
  };
};
