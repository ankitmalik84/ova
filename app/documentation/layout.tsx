// app/documentation/layout.tsx

import React from "react";

interface DocumentationProps {
  children: React.ReactNode;
}

const Documentation: React.FC<DocumentationProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default Documentation;
