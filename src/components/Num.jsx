export const Num = ({ id, div1Staffs, div2Staffs, maxNum }) => {
  // 区分内のスタッフの人数を取得
  // idの値に応じて場合分け
  let staffNum;
  if (id === "div1") {
    staffNum = div1Staffs.length;
  } else if (id === "div2") {
    staffNum = div2Staffs.length;
  }

  return (
    <div>
      <span>{staffNum}</span>/<span>{maxNum}</span>
    </div>
  );
};
