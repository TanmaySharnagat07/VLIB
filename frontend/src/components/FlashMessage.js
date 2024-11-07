import React from "react";
import { useFlashMessage } from "../context/FlashMessageContext"; // Adjust the path if necessary

const FlashMessage = () => {
  const { message, clearMessage } = useFlashMessage();

  return message ? (
    <div className="alert alert-info alert-dismissible fade show" role="alert">
      {message}
      <button
        type="button"
        className="btn-close"
        aria-label="Close"
        onClick={clearMessage}
      ></button>
    </div>
  ) : null;
};

export default FlashMessage;
