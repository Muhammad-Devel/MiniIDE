interface SidebarProps {
  files: { [path: string]: { language: string; content: string } };
  active: string;
  setActive: (name: string) => void;
  onDelete: (name: string) => void;
}

export default function Sidebar({
  files,
  active,
  setActive,
  onDelete,
}: SidebarProps) {
  return (
    <aside
      style={{
        width: 200,
        borderRight: "1px solid #e5e7eb",
        padding: 8,
        overflow: "auto",
      }}
    >
      <div style={{ fontSize: 12, marginBottom: 8, color: "#374151" }}>
        Files
      </div>
      <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
        {Object.keys(files).map((name) => (
          <li
            key={name}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: 6,
            }}
          >
            <button
              onClick={() => setActive(name)}
              style={{
                flex: 1,
                textAlign: "left",
                background: name === active ? "#f3f4f6" : "transparent",
                border: "none",
                padding: "6px 8px",
                cursor: "pointer",
              }}
            >
              {name}
            </button>
            <button
              title="Delete"
              onClick={() => onDelete(name)}
              style={{ marginLeft: 6 }}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
    </aside>
  );
}
