import { useEffect, useRef, useState, useCallback } from "react";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";

type Files = {
  [path: string]: { language: string; content: string };
};

const DEFAULT_FILES: Files = {
  "index.html": {
    language: "html",
    content: "<!doctype html><html><head></head><body>Hello IDE</body></html>",
  },
  "style.css": { language: "css", content: "body { font-family: sans-serif; }" },
  "script.js": {
    language: "javascript",
    content: "console.log('Hello from script.js')",
  },
};

export default function App() {
  const [files, setFiles] = useState<Files>(DEFAULT_FILES);
  const [active, setActive] = useState<string>("index.html");
  const [autoRun, setAutoRun] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(Date.now());
  const [runTrigger, setRunTrigger] = useState(0);
  const iframeRef = useRef<HTMLIFrameElement | null>(null); 

  // Build srcDoc
  const buildSrcDoc = useCallback(() => {
    const html = files["index.html"]?.content ?? "";
    const css = files["style.css"]?.content ?? "";
    const js = files["script.js"]?.content ?? "";
    return `${html}<style>${css}</style><script>${js}</script>`;
  }, [files]);

  // Run effect
  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = buildSrcDoc();
    }
  }, [runTrigger, buildSrcDoc]);

  // Editor change
  const updateActiveContent = (newContent: string) => {
    setFiles((prev) => ({ ...prev, [active]: { ...prev[active], content: newContent } }));
    if (autoRun) {
      setRunTrigger((x) => x + 1);
      setLastUpdated(Date.now());
    }
  };

  return (
    <div style={{ width: "100vw", height: "100vh", display: "flex", flexDirection: "column", paddingRight:"20px" }}>
      <Header
        autoRun={autoRun}
        setAutoRun={setAutoRun}
        onRun={() => setRunTrigger((x) => x + 1)}
        onNewFile={() => alert("TODO: add file modal")}
        onDownload={() => alert("TODO: download")}
        lastUpdated={lastUpdated}
      />

      <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
        <Sidebar files={files} active={active} setActive={setActive} onDelete={(name) => console.log("delete", name)} />

        <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 500 }}>
          <div style={{ flex: 1, display: "flex", minHeight: 0 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <CodeEditor
                language={files[active]?.language ?? "plaintext"}
                value={files[active]?.content ?? ""}
                onChange={updateActiveContent}
                onMount={() => {}}
              />
            </div>
            <Preview iframeRef={iframeRef} autoRun={autoRun} />
          </div>
        </main>
      </div>
    </div>
  );
}
