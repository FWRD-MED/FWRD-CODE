/* ============================================================
   FWRD charts — a dependency-free radar chart for the five
   CRM domains, drawn on a <canvas>.
   ============================================================ */
window.FWRD = window.FWRD || {};

/* values: { sa: 0-100|null, comm: ..., dm: ..., rm: ..., em: ... } */
FWRD.drawRadar = function (canvas, values) {
  const dpr = window.devicePixelRatio || 1;
  const cssW = 340, cssH = 300;
  canvas.width = cssW * dpr;
  canvas.height = cssH * dpr;
  canvas.style.width = cssW + "px";
  canvas.style.height = cssH + "px";

  const ctx = canvas.getContext("2d");
  ctx.scale(dpr, dpr);

  const cx = cssW / 2, cy = cssH / 2 + 6;
  const R = 96;
  const n = FWRD.DOMAINS.length;
  const shortNames = { sa: "Situational\nawareness", comm: "Communication", dm: "Decision-\nmaking", rm: "Resource\nmgmt", em: "Error\nmgmt" };

  function point(i, r) {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / n;
    return [cx + r * Math.cos(ang), cy + r * Math.sin(ang)];
  }

  // Grid rings at 25/50/75/100
  ctx.lineWidth = 1;
  [0.25, 0.5, 0.75, 1].forEach(function (f) {
    ctx.beginPath();
    for (let i = 0; i <= n; i++) {
      const p = point(i % n, R * f);
      i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
    }
    ctx.strokeStyle = f === 1 ? "#c6d4dd" : "#e2eaf0";
    ctx.stroke();
  });

  // Spokes
  for (let i = 0; i < n; i++) {
    const p = point(i, R);
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.lineTo(p[0], p[1]);
    ctx.strokeStyle = "#e2eaf0";
    ctx.stroke();
  }

  // Data polygon (treat null as 0 but mark it)
  const hasAny = FWRD.DOMAINS.some(function (d) { return values[d.key] != null; });
  if (hasAny) {
    ctx.beginPath();
    FWRD.DOMAINS.forEach(function (d, i) {
      const v = values[d.key] == null ? 0 : values[d.key];
      const p = point(i, (R * v) / 100);
      i === 0 ? ctx.moveTo(p[0], p[1]) : ctx.lineTo(p[0], p[1]);
    });
    ctx.closePath();
    ctx.fillStyle = "rgba(14, 111, 106, 0.18)";
    ctx.fill();
    ctx.strokeStyle = "#0e6f6a";
    ctx.lineWidth = 2;
    ctx.stroke();

    // Vertex dots
    FWRD.DOMAINS.forEach(function (d, i) {
      const v = values[d.key] == null ? 0 : values[d.key];
      const p = point(i, (R * v) / 100);
      ctx.beginPath();
      ctx.arc(p[0], p[1], 3.5, 0, 2 * Math.PI);
      ctx.fillStyle = values[d.key] == null ? "#b9c8d3" : "#0e6f6a";
      ctx.fill();
    });
  } else {
    ctx.fillStyle = "#8aa0b1";
    ctx.font = "13px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("Complete a scenario to see your profile", cx, cy + 4);
  }

  // Axis labels
  ctx.fillStyle = "#43596e";
  ctx.font = "600 11px Inter, sans-serif";
  ctx.textAlign = "center";
  FWRD.DOMAINS.forEach(function (d, i) {
    const p = point(i, R + 26);
    const lines = shortNames[d.key].split("\n");
    const v = values[d.key];
    lines.forEach(function (line, li) {
      ctx.fillText(line, p[0], p[1] - (lines.length - 1) * 6 + li * 12);
    });
    if (v != null) {
      ctx.fillStyle = "#0e6f6a";
      ctx.fillText(v + "%", p[0], p[1] + lines.length * 12 - (lines.length - 1) * 6);
      ctx.fillStyle = "#43596e";
    }
  });
};
