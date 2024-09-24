// app/documentation/layout.tsx

import React from "react";

interface PrivacyProps {
  children: React.ReactNode;
}

const PrivacyPolicy: React.FC<PrivacyProps> = ({ children }) => {
  return <div>{children}</div>;
};

export default PrivacyPolicy;
