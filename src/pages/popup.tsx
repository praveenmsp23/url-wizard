import React, { useEffect, useState } from "react";

const Popup: React.FC = () => {
  const [url, setUrl] = useState<string>("");

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setUrl(tabs[0].url || "");
    });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-lg font-bold">URL Wizard</h1>
      <p className="mt-2 text-sm">{url}</p>
    </div>
  );
};

export default Popup;
