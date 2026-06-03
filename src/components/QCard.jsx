/** biome-ignore-all lint/a11y/useKeyWithClickEvents: <explanation> */
/** biome-ignore-all lint/a11y/noStaticElementInteractions: <explanation> */
import { useState } from "react";
import CodeBlock from "./CodeBlock";

const DC = { hard: "#ff6b6b", medium: "#fb923c", easy: "#34d399" };

export default function QCard({ item, idx, accent }) {
	const [open, setOpen] = useState(false);
	const dc = DC[item.diff];
	return (
		<div
			style={{
				border: `1px solid ${open ? accent : "rgba(255,255,255,0.07)"}`,
				borderRadius: 8,
				marginBottom: 10,
				overflow: "hidden",
				transition: "border-color 0.2s",
			}}
		>
			<div
				onClick={() => setOpen((o) => !o)}
				style={{
					display: "flex",
					alignItems: "flex-start",
					padding: "13px 14px",
					cursor: "pointer",
					gap: 10,
					background: "rgba(255,255,255,0.03)",
				}}
			>
				<span
					style={{
						fontFamily: "monospace",
						fontSize: 10,
						color: "rgba(255,255,255,0.2)",
						minWidth: 26,
						paddingTop: 3,
						flexShrink: 0,
					}}
				>
					Q{String(idx + 1).padStart(2, "0")}
				</span>
				<span
					style={{
						flex: 1,
						fontSize: 13,
						fontWeight: 500,
						color: "rgba(255,255,255,0.88)",
						lineHeight: 1.4,
					}}
				>
					{item.q}
				</span>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						alignItems: "flex-end",
						gap: 5,
						flexShrink: 0,
					}}
				>
					<span
						style={{
							fontFamily: "monospace",
							fontSize: 9,
							padding: "2px 6px",
							borderRadius: 3,
							border: `1px solid ${dc}44`,
							color: dc,
							background: dc + "11",
						}}
					>
						{item.diff}
					</span>
					<span
						style={{
							color: "rgba(255,255,255,0.2)",
							fontSize: 12,
							transform: open ? "rotate(90deg)" : "none",
							transition: "transform 0.2s",
						}}
					>
						›
					</span>
				</div>
			</div>
			{open && (
				<div style={{ padding: "0 14px 14px", background: "rgba(0,0,0,0.3)" }}>
					<div style={{ paddingTop: 12 }}>
						<div
							style={{
								fontFamily: "monospace",
								fontSize: 9,
								color: accent,
								textTransform: "uppercase",
								letterSpacing: "0.1em",
								marginBottom: 7,
							}}
						>
							Answer
						</div>
						<div
							style={{
								fontSize: 12.5,
								color: "rgba(255,255,255,0.65)",
								lineHeight: 1.78,
							}}
						>
							{item.a}
						</div>
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
								marginTop: 12,
								padding: "10px 12px",
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
									marginBottom: 4,
								}}
							>
								💡 TIP
							</div>
							<div
								style={{
									fontSize: 12,
									color: "rgba(255,255,255,0.45)",
									lineHeight: 1.65,
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
