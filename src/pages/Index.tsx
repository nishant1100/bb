import React, { useState } from "react";
import ValentineQuestion from "../components/ValentineQuestion";
import LovePage from "../components/LovePage";

const Index: React.FC = () => {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className="relative">
      {!accepted ? (
        <ValentineQuestion onYes={() => setAccepted(true)} />
      ) : (
        <div style={{ animation: "fade-in 1s ease-out" }}>
          <LovePage />
        </div>
      )}
    </div>
  );
};

export default Index;
