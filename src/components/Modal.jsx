import { Button } from "./Button";
import classes from "./Modal.module.scss";

export const Modal = ({ errorMessage, setErrorMessage, modal }) => {
  return (
    <div className={classes.modal} ref={modal}>
      <div className={classes.modalInner}>
        <p className={classes.modaltxt}>{errorMessage}</p>
        <Button text="閉じる" setErrorMessage={setErrorMessage} modal={modal} />
      </div>
    </div>
  );
};
