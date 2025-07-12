import * as Dialog from "@radix-ui/react-dialog";

import PropTypes from "prop-types";

const Modal = ({ title, children, className }) => {
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="modal-overlay" />
      <Dialog.Content className={`modal-content ${className}`}>
        <h3 style={{ fontWeight: "500", marginTop: 0 }}>{title}</h3>
        <div>{children}</div>
        {/* <Dialog.Close className="modal-close">Close</Dialog.Close> */}
      </Dialog.Content>
    </Dialog.Portal>
  );
};

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired, // ✅ Fixes the missing prop validation
};
export default Modal;
