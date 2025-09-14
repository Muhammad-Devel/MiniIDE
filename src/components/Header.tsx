interface HeaderProps {
  autoRun: boolean;
  setAutoRun: (val: boolean) => void;
  onRun: () => void;
  onNewFile: () => void;
  onDownload: () => void;
  lastUpdated: number;
}

export default function Header({
  autoRun,
  setAutoRun,
  onRun,
  onNewFile,
  onDownload,
  lastUpdated,
}: HeaderProps) {
  return (
    <header
      style={{
        padding: 8,
        display: "flex",
        gap: 8,
        alignItems: "center",
        borderBottom: "1px solid #e5e7eb",
      }}
    >
      <strong>Mini IDE</strong>
      <div style={{ display: "flex", gap: 8, marginLeft: 12 }}>
        <button onClick={onRun}>Run (Ctrl/Cmd+S)</button>
        <label style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <input
            type="checkbox"
            checked={autoRun}
            onChange={(e) => setAutoRun(e.target.checked)}
          />{" "}
          Auto-run
        </label>
        <button onClick={onNewFile}>New file</button>
        <button onClick={onDownload}>Download .html</button>
      </div>
      <div style={{ marginLeft: "auto", color: "#6b7280" }}>
        Last run: {new Date(lastUpdated).toLocaleTimeString()}
      </div>
    </header>
  );
}
