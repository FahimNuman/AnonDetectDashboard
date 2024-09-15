// components/ContentDisplay.js
import React from "react";
import DOMPurify from "dompurify";

const ContentDisplay = ({ content }) => {
  // Sanitize the HTML content
  const sanitizedContent = DOMPurify.sanitize(content);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: sanitizedContent }}
      className="content-display"
    />
  );
};

export default ContentDisplay;
