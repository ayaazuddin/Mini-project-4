import React from "react";

function AIOptions({ handleAIAction }) {
  return (
    <div>
      <button onClick={() => handleAIAction("summarize")}>Summarize</button>
      <button onClick={() => handleAIAction("organize")}>Organize</button>
    </div>
  );
}

export default AIOptions;
