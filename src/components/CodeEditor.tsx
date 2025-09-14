import Editor, { type OnMount } from "@monaco-editor/react";

interface CodeEditorProps {
  language: string;
  value: string;
  onChange: (val: string) => void;
  onMount: OnMount;
}

export default function CodeEditor({
  language,
  value,
  onChange,
  onMount,
}: CodeEditorProps) {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      onMount={onMount}
      onChange={(val) => onChange(val ?? "")}
      theme={
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
          ? "vs-dark"
          : "light"
      }
      options={{
        automaticLayout: true,
        fontSize: 14,
        minimap: { enabled: false },
      }}
    />
  );
}
