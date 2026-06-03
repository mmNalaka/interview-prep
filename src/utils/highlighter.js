export function highlight(code, lang) {
  const esc = s => s.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  let c = esc(code);
  // strings
  c = c.replace(/(&#39;|&quot;|`)(.*?)\1/g, '<span style="color:#ffd080">$1$2$1</span>');
  // comments
  c = c.replace(/(\/\/[^\n]*|\/\*[\s\S]*?\*\/|#[^\n]*)/g, '<span style="color:#606a7a;font-style:italic">$1</span>');
  // keywords
  const kw = lang === "go"
    ? /\b(func|go|chan|select|defer|var|const|type|struct|interface|return|if|else|for|range|package|import|make|new|nil|true|false|error|string|int|bool|map|slice)\b/g
    : /\b(const|let|var|function|return|if|else|for|of|in|async|await|new|class|import|export|default|from|true|false|null|undefined|try|catch|throw|typeof|instanceof)\b/g;
  c = c.replace(kw, '<span style="color:#7ca9ff">$1</span>');
  // function calls
  c = c.replace(/(\w+)(?=\()/g, '<span style="color:#6ee0a0">$1</span>');
  // numbers
  c = c.replace(/\b(\d+(_\d+)*)\b/g, '<span style="color:#bd93f9">$1</span>');
  // types / caps
  c = c.replace(/\b([A-Z][A-Za-z0-9]*)\b/g, '<span style="color:#ffb86c">$1</span>');
  return c;
}
