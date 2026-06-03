/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
/** biome-ignore-all lint/suspicious/noArrayIndexKey: <explanation> */
import { useState } from "react";
import MockPanel from "./MockPanel";
import QCard from "./QCard";
import { btnStyle } from "../utils/styles";

export default function TrackView({ track, onBack }) {
	const [cat, setCat] = useState("all");
	const [mode, setMode] = useState("study");
	const { accent, questions, cats } = track;
	const filtered =
		cat === "all" ? questions : questions.filter((q) => q.cat === cat);

	if (mode === "mock")
		return (
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					height: "100dvh",
					background: "#060810",
				}}
			>
				<div
					style={{
						padding: "12px 16px",
						borderBottom: "1px solid rgba(255,255,255,0.06)",
						display: "flex",
						alignItems: "center",
						gap: 10,
						flexShrink: 0,
						background: "rgba(0,0,0,0.4)",
					}}
				>
					<button
						onClick={() => setMode("study")}
						style={{
							background: "none",
							border: "none",
							color: "rgba(255,255,255,0.4)",
							cursor: "pointer",
							fontSize: 20,
							padding: 0,
							lineHeight: 1,
						}}
					>
						←
					</button>
					<span
						style={{
							flex: 1,
							fontFamily: "monospace",
							fontSize: 11,
							color: accent,
							letterSpacing: "0.1em",
						}}
					>
						● MOCK INTERVIEW — {track.label}
					</span>
				</div>
				<MockPanel track={track} onEnd={() => setMode("study")} />
			</div>
		);

	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				height: "100dvh",
				background: "#060810",
			}}
		>
			<div
				style={{
					padding: "12px 16px",
					borderBottom: "1px solid rgba(255,255,255,0.06)",
					display: "flex",
					alignItems: "center",
					gap: 10,
					flexShrink: 0,
					background: "rgba(0,0,0,0.4)",
					backdropFilter: "blur(10px)",
				}}
			>
				<button
					onClick={onBack}
					style={{
						background: "none",
						border: "none",
						color: "rgba(255,255,255,0.4)",
						cursor: "pointer",
						fontSize: 20,
						padding: 0,
						lineHeight: 1,
					}}
				>
					←
				</button>
				<span style={{ color: accent, fontSize: 16 }}>{track.icon}</span>
				<span
					style={{
						flex: 1,
						fontWeight: 700,
						fontSize: 15,
						color: "rgba(255,255,255,0.9)",
					}}
				>
					{track.label}
				</span>
				<button onClick={() => setMode("mock")} style={btnStyle(accent, true)}>
					▶ Mock
				</button>
			</div>
			<div style={{ padding: "10px 16px 0", flexShrink: 0 }}>
				<div
					style={{
						display: "flex",
						gap: 6,
						overflowX: "auto",
						paddingBottom: 10,
						scrollbarWidth: "none",
					}}
				>
					{cats.map((c) => {
						const count =
							c.id === "all"
								? questions.length
								: questions.filter((q) => q.cat === c.id).length;
						const active = cat === c.id;
						return (
							<button
								key={c.id}
								onClick={() => setCat(c.id)}
								style={{
									flexShrink: 0,
									padding: "5px 10px",
									borderRadius: 20,
									cursor: "pointer",
									fontSize: 11,
									fontFamily: "monospace",
									whiteSpace: "nowrap",
									transition: "all 0.15s",
									border: `1px solid ${active ? accent : "rgba(255,255,255,0.1)"}`,
									background: active ? `${accent}18` : "transparent",
									color: active ? accent : "rgba(255,255,255,0.4)",
								}}
							>
								{c.label} <span style={{ opacity: 0.6 }}>{count}</span>
							</button>
						);
					})}
				</div>
			</div>
			<div style={{ flex: 1, overflowY: "auto", padding: "4px 16px 24px" }}>
				<div
					style={{
						fontFamily: "monospace",
						fontSize: 9,
						color: "rgba(255,255,255,0.2)",
						letterSpacing: "0.1em",
						padding: "8px 0 10px",
					}}
				>
					{filtered.length} QUESTIONS
				</div>
				{filtered.map((item, i) => (
					<QCard key={cat + i} item={item} idx={i} accent={accent} />
				))}
			</div>
		</div>
	);
}
