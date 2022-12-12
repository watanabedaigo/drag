import { useStaff } from "../hooks/useStaff";
import { Modal } from "./Modal";
import { ToDoListContainer } from "./ToDoListContainer";

function App() {
  const {
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
  } = useStaff();

  return (
    <>
      <ToDoListContainer
        initStaffs={initStaffs}
        setInitStaffs={setInitStaffs}
        div1Staffs={div1Staffs}
        setDiv1Staffs={setDiv1Staffs}
        div2Staffs={div2Staffs}
        setDiv2Staffs={setDiv2Staffs}
        setDisplay={setDisplay}
        display={display}
        setErrorMessage={setErrorMessage}
        modal={modal}
        allStaffs={allStaffs}
        updateStaffData={updateStaffData}
      />

      <div>
        <Modal
          errorMessage={errorMessage}
          setErrorMessage={setErrorMessage}
          modal={modal}
        />
      </div>
    </>
  );
}

export default App;
