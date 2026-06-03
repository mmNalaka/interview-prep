/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
/** biome-ignore-all lint/security/noDangerouslySetInnerHtml: <explanation> */
import { useState } from "react";
import { highlight } from "../utils/highlighter";

function normalizeCode(codeRaw) {
	let code = Array.isArray(codeRaw) ? codeRaw.join("\n") : String(codeRaw ?? "");
	if (!code.includes("\n") && code.includes("\\n")) {
		code = code.replace(/\\n/g, "\n");
	}
	return code;
}

export default function CodeBlock({ code: codeRaw, lang = "js", accent }) {
	const code = normalizeCode(codeRaw);
	const [open, setOpen] = useState(false);
	const [copied, setCopied] = useState(false);
	const lines = code.trim().split("\n");
	const preview = lines.slice(0, 3).join("\n");
	const isLong = lines.length > 3;

	function copy() {
		navigator.clipboard.writeText(code.trim()).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 1500);
		});
	}

	return (
		<div
			style={{
				marginTop: 12,
				borderRadius: 8,
				overflow: "hidden",
				border: "1px solid rgba(255,255,255,0.09)",
				background: "#080c14",
			}}
		>
			<div
				style={{
					display: "flex",
					alignItems: "center",
					padding: "6px 10px",
					borderBottom: "1px solid rgba(255,255,255,0.06)",
					background: "rgba(255,255,255,0.03)",
				}}
			>
				<span
					style={{
						fontFamily: "monospace",
						fontSize: 9,
						color: accent,
						letterSpacing: "0.1em",
						flex: 1,
					}}
				>
					{lang.toUpperCase()}
				</span>
				<button
					onClick={copy}
					style={{
						background: "none",
						border: "none",
						cursor: "pointer",
						fontFamily: "monospace",
						fontSize: 9,
						color: copied ? accent : "rgba(255,255,255,0.3)",
						padding: "2px 6px",
						borderRadius: 4,
					}}
				>
					{copied ? "✓ copied" : "copy"}
				</button>
				{isLong && (
					<button
						onClick={() => setOpen((o) => !o)}
						style={{
							background: "none",
							border: "none",
							cursor: "pointer",
							fontFamily: "monospace",
							fontSize: 9,
							color: "rgba(255,255,255,0.3)",
							padding: "2px 6px",
							borderRadius: 4,
							marginLeft: 4,
						}}
					>
						{open ? "▲ collapse" : "▼ expand"}
					</button>
				)}
			</div>
			<pre
				style={{
					margin: 0,
					padding: "12px 14px",
					overflowX: "auto",
					fontFamily: "'Courier New', monospace",
					fontSize: 12,
					lineHeight: 1.65,
					color: "#c0cce0",
					whiteSpace: "pre-wrap",
					wordBreak: "break-word",
				}}
			>
				<code
					style={{
						display: "block",
						whiteSpace: "inherit",
						fontFamily: "inherit",
						fontSize: "inherit",
						lineHeight: "inherit",
						color: "inherit",
						background: "none",
						textAlign: "left",
						padding: 0,
						borderRadius: 0,
					}}
					dangerouslySetInnerHTML={{
						__html: highlight(
							open || !isLong ? code.trim() : `${preview}\n...`,
							lang,
						),
					}}
				/>
			</pre>
		</div>
	);
}
