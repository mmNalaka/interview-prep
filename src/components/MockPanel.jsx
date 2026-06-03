/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
import { useState, useRef, useEffect } from "react";
import CodeBlock from "./CodeBlock";
import { btnStyle } from "../utils/styles";

export default function MockPanel({ track, onEnd }) {
	const [qs] = useState(() =>
		[...track.questions]
			.sort(() => Math.random() - 0.5)
			.slice(0, Math.min(5, track.questions.length)),
	);
	const [idx, setIdx] = useState(0);
	const [answer, setAnswer] = useState("");
	const [revealed, setRevealed] = useState(false);
	const [secs, setSecs] = useState(120);
	const [done, setDone] = useState(false);
	const ref = useRef(null);
	const { accent } = track;

	useEffect(() => {
		// eslint-disable-next-line react-hooks/set-state-in-effect
		setSecs(120);
		setAnswer("");
		setRevealed(false);
		clearInterval(ref.current);
		ref.current = setInterval(
			() =>
				setSecs((s) => {
					if (s <= 1) {
						clearInterval(ref.current);
						setRevealed(true);
						return 0;
					}
					return s - 1;
				}),
			1000,
		);
		return () => clearInterval(ref.current);
	}, [idx]);

	if (done)
		return (
			<div
				style={{
					flex: 1,
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					justifyContent: "center",
					gap: 14,
					padding: 28,
				}}
			>
				<div style={{ fontSize: 40 }}>✓</div>
				<div
					style={{
						fontFamily: "monospace",
						fontSize: 12,
						color: accent,
						letterSpacing: "0.1em",
					}}
				>
					SESSION COMPLETE
				</div>
				<div style={{ color: "rgba(255,255,255,0.3)", fontSize: 12 }}>
					{qs.length} questions answered
				</div>
				<button onClick={onEnd} style={btnStyle(accent, true)}>
					Back to Study Mode
				</button>
			</div>
		);

	const item = qs[idx];
	const mm = Math.floor(secs / 60),
		ss2 = String(secs % 60).padStart(2, "0");
	return (
		<div
			style={{
				flex: 1,
				display: "flex",
				flexDirection: "column",
				padding: 16,
				overflowY: "auto",
				gap: 12,
			}}
		>
			<div
				style={{
					height: 2,
					background: "rgba(255,255,255,0.07)",
					borderRadius: 2,
					flexShrink: 0,
				}}
			>
				<div
					style={{
						height: "100%",
						background: accent,
						width: `${(idx / qs.length) * 100}%`,
						transition: "width 0.4s",
						borderRadius: 2,
					}}
				/>
			</div>
			<div
				style={{
					background: "rgba(255,255,255,0.03)",
					border: "1px solid rgba(255,255,255,0.08)",
					borderRadius: 8,
					padding: "14px 16px",
				}}
			>
				<div
					style={{
						fontFamily: "monospace",
						fontSize: 9,
						color: "rgba(255,255,255,0.3)",
						marginBottom: 8,
						letterSpacing: "0.1em",
					}}
				>
					QUESTION {idx + 1} of {qs.length}
				</div>
				<div
					style={{
						fontSize: 15,
						fontWeight: 600,
						color: "rgba(255,255,255,0.9)",
						lineHeight: 1.4,
					}}
				>
					{item.q}
				</div>
			</div>
			<textarea
				value={answer}
				onChange={(e) => setAnswer(e.target.value)}
				placeholder="Type your answer…"
				style={{
					width: "100%",
					minHeight: 110,
					background: "rgba(0,0,0,0.3)",
					border: "1px solid rgba(255,255,255,0.08)",
					borderRadius: 8,
					padding: 12,
					fontFamily: "inherit",
					fontSize: 13,
					color: "rgba(255,255,255,0.85)",
					resize: "vertical",
					outline: "none",
					lineHeight: 1.6,
					boxSizing: "border-box",
				}}
			/>
			<div style={{ display: "flex", gap: 8, alignItems: "center" }}>
				{!revealed ? (
					<button
						onClick={() => {
							clearInterval(ref.current);
							setRevealed(true);
						}}
						style={btnStyle(accent, true)}
					>
						Reveal Answer
					</button>
				) : (
					<button
						onClick={() => {
							if (idx + 1 >= qs.length) setDone(true);
							else setIdx((i) => i + 1);
						}}
						style={btnStyle(accent, true)}
					>
						{idx + 1 >= qs.length ? "Finish" : "Next →"}
					</button>
				)}
				<button onClick={onEnd} style={btnStyle(accent, false)}>
					End
				</button>
				<div
					style={{
						marginLeft: "auto",
						fontFamily: "monospace",
						fontSize: 16,
						fontWeight: 700,
						color: secs <= 30 ? "#ff6b6b" : "rgba(255,255,255,0.25)",
					}}
				>
					{mm}:{ss2}
				</div>
			</div>
			{revealed && (
				<div
					style={{
						background: "rgba(255,255,255,0.03)",
						border: "1px solid rgba(255,255,255,0.08)",
						borderRadius: 8,
						padding: 14,
					}}
				>
					<div
						style={{
							fontFamily: "monospace",
							fontSize: 9,
							color: "#fb923c",
							letterSpacing: "0.1em",
							marginBottom: 8,
						}}
					>
						MODEL ANSWER
					</div>
					<div
						style={{
							fontSize: 12.5,
							color: "rgba(255,255,255,0.6)",
							lineHeight: 1.75,
						}}
					>
						{item.a}
					</div>
					{item.code && (
						<CodeBlock
							code={item.code}
							lang={item.lang || "js"}
							accent={accent}
						/>
					)}
					{item.tip && (
						<div
							style={{
								marginTop: 10,
								padding: "9px 11px",
								background: `${accent}08`,
								border: `1px solid ${accent}22`,
								borderRadius: 6,
							}}
						>
							<div
								style={{
									fontFamily: "monospace",
									fontSize: 9,
									color: accent,
									marginBottom: 3,
								}}
							>
								💡 KEY POINT
							</div>
							<div
								style={{
									fontSize: 11.5,
									color: "rgba(255,255,255,0.4)",
									lineHeight: 1.6,
								}}
							>
								{item.tip}
							</div>
						</div>
					)}
				</div>
			)}
		</div>
	);
}
