// import React, { useState } from "react";
import { ReactNode, useState } from "react";

import "./FAQItem.css";

type FAQItemProps = {
  question: string;
  children: ReactNode;
};

function FAQItem({ question, children }: FAQItemProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="faq-item">
      <h3 className="question" onClick={() => setOpen(!open)}>
        {question}
      </h3>

      <div className={`answer ${open ? "" : "hidden"}`}>{children}</div>
    </div>
  );
}

export default FAQItem;
