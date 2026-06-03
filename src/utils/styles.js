export function btnStyle(accent, primary) {
  return {
    fontFamily: "monospace", fontSize: 11, padding: "8px 14px", borderRadius: 6, cursor: "pointer",
    border: primary ? "none" : "1px solid rgba(255,255,255,0.1)",
    background: primary ? accent : "rgba(255,255,255,0.05)",
    color: primary ? "#000" : "rgba(255,255,255,0.7)",
    fontWeight: primary ? 700 : 400,
  };
}
