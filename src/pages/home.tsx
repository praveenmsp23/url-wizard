import React, { useEffect, useState } from "react";

interface QueryParams {
  key: string;
  value: string;
}

const HomePage: React.FC = () => {
  const [url, setUrl] = useState<URL>();

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setUrl(new URL(tabs[0].url ?? ""));
    });
  }, []);

  if (!url) return;

  const params: QueryParams[] = [];
  for (let entry of url.searchParams.entries()) {
    params.push({ key: entry[0], value: entry[1] });
  }

  return (
    <div>
      <header className="p-2 border-b">
        <h1 className="text-lg font-semibold">URL Wizard</h1>
      </header>
      <main className="p-2 space-y-2">
        <textarea
          rows={3}
          className="w-full"
          placeholder="Website url goes here..."
          defaultValue={url.href}
          onChange={(e) => setUrl(new URL(e.target.value))}
        />
        <div>
          <h1 className="font-semibold text-sm mb-1 underline underline-offset-2">
            Detailed Info
          </h1>
          <div className="flex items-center gap-2 mb-1">
            <label>Hostname:</label>
            <h1>{url.host}</h1>
          </div>
          <div className="flex items-center gap-2 mb-1">
            <label>Path:</label>
            <h1>{url.pathname}</h1>
          </div>
          {params.length > 0 && (
            <div>
              <h1 className="font-semibold text-sm mt-2 mb-1 underline underline-offset-2">
                Query params
              </h1>
              {params.map((p, i) => (
                <div
                  key={`query-param-${i}`}
                  className="flex gap-2 overflow-scroll"
                >
                  <label>{p.key}:</label>
                  <h1 className="whitespace-normal">{p.value}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
