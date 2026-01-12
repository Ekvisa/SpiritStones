import React, { useEffect, useState } from "react";

import "./Modal.css";

import { OrderModalProps } from "../../types";

function Modal({ order, onClose }: OrderModalProps) {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div className="cover" onClick={onClose}>
      <div className="popup" onClick={(e) => e.stopPropagation()}>
        <p>💫 Камни — это память земли 🪐</p>
      </div>
    </div>
  );
}

export default Modal;
