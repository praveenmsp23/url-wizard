import React, { useEffect, useState } from "react"

const HomePage: React.FC = () => {
  const [url, setUrl] = useState<string>()
  const [urlInfo, setUrlInfo] = useState<URL>()
  const [copied, setCopied] = useState<boolean>(false)
  const [params, setParams] = useState<Map<string, string>>(new Map())

  const handleCopy = () => {
    if (url) {
      navigator.clipboard.writeText(url)
      setCopied(true)

      setTimeout(() => {
        setCopied(false)
      }, 3000)
    }
  }

  useEffect(() => {
    if (url) {
      try {
        setUrlInfo(new URL(url))
      } catch (error) {}
    } else {
      setUrlInfo(undefined)
    }
  }, [url])

  useEffect(() => {
    if (urlInfo) {
      let p = new Map()
      for (let entry of urlInfo.searchParams.entries()) {
        p.set(entry[0], entry[1])
        setParams(p)
      }
    }
  }, [urlInfo])

  useEffect(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      setUrl(tabs[0].url)
    })
  }, [])

  return (
    <main className="space-y-2 p-2">
      <textarea
        rows={3}
        className="w-full"
        placeholder="Your website url goes here..."
        value={url}
        onChange={(e) => setUrl(e.target.value)}
      />
      <div className="flex gap-2">
        <button
          disabled={!url}
          onClick={() => {
            if (url) setUrl(encodeURIComponent(url))
          }}
        >
          Encode
        </button>
        <button
          disabled={!url}
          onClick={() => {
            if (url) setUrl(decodeURIComponent(url))
          }}
        >
          Decode
        </button>
        <button disabled={!url} onClick={handleCopy}>
          {copied ? "Copied" : "Copy"}
        </button>
        <button disabled>Attack</button>
      </div>
      {urlInfo && (
        <div>
          <h1 className="mb-1 text-sm font-semibold underline underline-offset-2">Detailed Info</h1>
          <div className="mb-1 flex items-center gap-2">
            <label>Hostname:</label>
            <h1>{urlInfo.host}</h1>
          </div>
          <div className="no-scrollbar mb-1 flex items-start gap-2 overflow-auto">
            <label>Path:</label>
            <h1>{urlInfo.pathname}</h1>
          </div>
          {params.size > 0 && (
            <div>
              <h1 className="mb-1 mt-2 text-sm font-semibold underline underline-offset-2">
                Query params
              </h1>
              {Array.from(params.entries()).map(([key, value], i) => (
                <div key={`query-param-${i}`} className="no-scrollbar flex gap-2 overflow-auto">
                  <label>{key}:</label>
                  <h1>{value}</h1>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </main>
  )
}

export default HomePage
