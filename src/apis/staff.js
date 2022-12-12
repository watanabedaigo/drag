import axios from "axios";

// データ取得の関数
export const apiGetAllstaffData = async (sampleDataUrl) => {
  const response = await axios.get(sampleDataUrl);
  return response.data;
};

// データ更新の関数
export const apiUpdateStaffData = async (sampleDataUrl, id, sampleStaff) => {
  // putでは第1引数に更新対象のデータ、第2引数に更新後の値を指定
  const response = await axios.put(`${sampleDataUrl}/${id}`, sampleStaff);
  return response.data;
};
