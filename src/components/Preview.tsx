import { type RefObject } from "react";

interface PreviewProps {
  iframeRef: RefObject<HTMLIFrameElement | null>;
  autoRun: boolean;
}

export default function Preview({ iframeRef, autoRun }: PreviewProps) {
  return (
    <div
      style={{
        width: 600,
        borderLeft: "1px solid #e5e7eb",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          padding: 8,
          borderBottom: "1px solid #eef2f7",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <div style={{ fontSize: 13, color: "#374151" }}>Preview</div>
        <div style={{ fontSize: 12, color: "#6b7280" }}>
          Auto-run: {autoRun ? "on" : "off"}
        </div>
      </div>
      <div style={{ flex: 1 }}>
        <iframe
          ref={iframeRef}
          title="preview"
          style={{ width: "100%", height: "100%", border: 0 }}
          sandbox="allow-scripts allow-same-origin"
        ></iframe>
      </div>
    </div>
  );
}
