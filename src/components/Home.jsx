/** biome-ignore-all lint/a11y/useButtonType: <explanation> */
export default function Home({ tracks, onSelect }) {
	const totalQ = tracks.reduce((s, t) => s + t.questions.length, 0);
	const totalHard = tracks.reduce(
		(s, t) => s + t.questions.filter((q) => q.diff === "hard").length,
		0,
	);
	return (
		<div
			style={{
				minHeight: "100dvh",
				background: "#060810",
				display: "flex",
				flexDirection: "column",
				fontFamily:
					"-apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif",
			}}
		>
			<div style={{ padding: "44px 20px 24px", textAlign: "center" }}>
				<div
					style={{
						fontFamily: "monospace",
						fontSize: 10,
						color: "rgba(255,255,255,0.2)",
						letterSpacing: "0.2em",
						marginBottom: 12,
					}}
				>
					SENIOR SWE
				</div>
				<h1
					style={{
						fontSize: 32,
						fontWeight: 800,
						color: "rgba(255,255,255,0.95)",
						letterSpacing: "-0.03em",
						lineHeight: 1.15,
						margin: "0 0 10px",
					}}
				>
					Interview
					<br />
					<span style={{ color: "rgba(255,255,255,0.2)" }}>Prep</span>
				</h1>
				<p style={{ fontSize: 13, color: "rgba(255,255,255,0.28)", margin: 0 }}>
					{tracks.length} tracks · {totalQ} questions · {totalHard} hard · mock
					interview mode
				</p>
			</div>
			<div
				style={{
					padding: "0 16px 16px",
					display: "flex",
					flexDirection: "column",
					gap: 10,
					flex: 1,
				}}
			>
				{tracks.map((track) => {
					const hardCount = track.questions.filter(
						(q) => q.diff === "hard",
					).length;
					const codeCount = track.questions.filter((q) => q.code).length;
					return (
						<button
							key={track.id}
							onClick={() => onSelect(track.id)}
							style={{
								display: "flex",
								alignItems: "center",
								gap: 14,
								padding: "16px",
								background: "rgba(255,255,255,0.025)",
								border: "1px solid rgba(255,255,255,0.07)",
								borderRadius: 12,
								cursor: "pointer",
								textAlign: "left",
								transition: "all 0.2s",
								borderLeft: `3px solid ${track.accent}`,
							}}
						>
							<div
								style={{
									fontSize: 22,
									width: 32,
									textAlign: "center",
									color: track.accent,
									flexShrink: 0,
								}}
							>
								{track.icon}
							</div>
							<div style={{ flex: 1, minWidth: 0 }}>
								<div
									style={{
										fontSize: 15,
										fontWeight: 700,
										color: "rgba(255,255,255,0.9)",
										marginBottom: 3,
									}}
								>
									{track.label}
								</div>
								<div
									style={{
										fontFamily: "monospace",
										fontSize: 10,
										color: "rgba(255,255,255,0.28)",
									}}
								>
									{track.questions.length} questions · {hardCount} hard ·{" "}
									{codeCount} with code
								</div>
							</div>
							<div
								style={{
									color: "rgba(255,255,255,0.18)",
									fontSize: 18,
									flexShrink: 0,
								}}
							>
								›
							</div>
						</button>
					);
				})}
			</div>
			<div
				style={{
					borderTop: "1px solid rgba(255,255,255,0.06)",
					padding: "16px 20px 28px",
					display: "flex",
					justifyContent: "space-around",
				}}
			>
				{[
					{ label: "TRACKS", val: String(tracks.length) },
					{ label: "QUESTIONS", val: String(totalQ) },
					{
						label: "WITH CODE",
						val: String(
							tracks.reduce(
								(s, t) => s + t.questions.filter((q) => q.code).length,
								0,
							),
						),
					},
				].map(({ label, val }) => (
					<div key={label} style={{ textAlign: "center" }}>
						<div
							style={{
								fontSize: 22,
								fontWeight: 800,
								color: "rgba(255,255,255,0.9)",
								fontFamily: "monospace",
							}}
						>
							{val}
						</div>
						<div
							style={{
								fontSize: 9,
								color: "rgba(255,255,255,0.22)",
								fontFamily: "monospace",
								letterSpacing: "0.1em",
								marginTop: 2,
							}}
						>
							{label}
						</div>
					</div>
				))}
			</div>
		</div>
	);
}
