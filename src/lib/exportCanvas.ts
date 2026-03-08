import { tokenizeLine, getTokenColor } from './highlighter';
import type { Theme } from './themes';

interface ExportConfig {
  code: string;
  language: string;
  theme: Theme;
  filename: string;
  fontFamily: string;
  fontSize: number;
  lineHeight: number;
  padding: number;
  borderRadius: number;
  cardBg: string;
  showLineNumbers: boolean;
  showWindowChrome: boolean;
  shadow: boolean;
  showWatermark: boolean;
  scale: number;
}

export async function drawExportCanvas(config: ExportConfig): Promise<HTMLCanvasElement> {
  const {
    code, language, theme, filename, fontFamily,
    fontSize, lineHeight, padding,
    cardBg, showLineNumbers, showWindowChrome,
    showWatermark, scale = 2,
  } = config;

  await document.fonts.ready;

  const lines = code.split('\n');
  const tokenizedLines = lines.map(line => {
    const tokens = tokenizeLine(line, language);
    return tokens.map(t => ({
      text: t.text,
      color: getTokenColor(t.type, theme),
    }));
  });

  const SCALE = scale;
  const FONT = `${fontSize}px "${fontFamily}", "JetBrains Mono", monospace`;
  const LINE_H = Math.round(fontSize * lineHeight);
  const GUTTER_W = showLineNumbers ? 44 : 0;
  const H_PAD = padding;
  const V_PAD = 14;
  const CHROME_H = showWindowChrome ? 36 : 0;

  // Measure widest line
  const measCanvas = document.createElement('canvas');
  const measCtx = measCanvas.getContext('2d')!;
  measCtx.font = FONT;

  let maxLineWidth = 0;
  for (const line of tokenizedLines) {
    const lineText = line.map(t => t.text).join('');
    const w = measCtx.measureText(lineText).width;
    if (w > maxLineWidth) maxLineWidth = w;
  }

  // Card dimensions (rounded up to avoid sub-pixel cropping)
  const codeW = Math.ceil(maxLineWidth + GUTTER_W + H_PAD * 2 + 48);
  const codeH = Math.ceil(tokenizedLines.length * LINE_H + V_PAD * 2 + CHROME_H + (showWatermark ? 24 : 0));
  const FRAME_P = padding;
  const EDGE_BLEED = 2; // safety margin so rounded edges/shadows are never clipped
  const totalW = codeW + FRAME_P * 2 + EDGE_BLEED * 2;
  const totalH = codeH + FRAME_P * 2 + EDGE_BLEED * 2;

  // Create canvas with integer backing size
  const canvas = document.createElement('canvas');
  const canvasWidth = Math.ceil(totalW * SCALE);
  const canvasHeight = Math.ceil(totalH * SCALE);
  canvas.width = canvasWidth;
  canvas.height = canvasHeight;
  const ctx = canvas.getContext('2d')!;
  ctx.scale(canvasWidth / totalW, canvasHeight / totalH);

  const outerX = EDGE_BLEED;
  const outerY = EDGE_BLEED;
  const outerW = totalW - EDGE_BLEED * 2;
  const outerH = totalH - EDGE_BLEED * 2;

  // Draw outer background (card frame) and clip to rounded rect
  ctx.save();
  roundRect(ctx, outerX, outerY, outerW, outerH, config.borderRadius);
  applyBackground(ctx, cardBg, outerW, outerH);
  ctx.restore();

  // Clip all subsequent drawing to the outer rounded rect
  ctx.save();
  roundRect(ctx, outerX, outerY, outerW, outerH, config.borderRadius);
  ctx.clip();

  // Window shadow
  if (config.shadow) {
    ctx.save();
    ctx.shadowColor = 'rgba(0,0,0,0.55)';
    ctx.shadowBlur = 48 * SCALE;
    ctx.shadowOffsetY = 16;
    roundRect(ctx, winX, winY, codeW, codeH, winRadius);
    ctx.fillStyle = theme.bg;
    ctx.fill();
    ctx.restore();
  }

  // Window background
  ctx.save();
  roundRect(ctx, winX, winY, codeW, codeH, winRadius);
  ctx.fillStyle = theme.bg;
  ctx.fill();
  ctx.restore();

  // Window chrome
  if (showWindowChrome) {
    ctx.save();
    roundRect(ctx, winX, winY, codeW, CHROME_H, [winRadius, winRadius, 0, 0]);
    ctx.fillStyle = adjustBrightness(theme.bg, -10);
    ctx.fill();
    ctx.restore();

    // Bottom border
    ctx.beginPath();
    ctx.moveTo(winX, winY + CHROME_H);
    ctx.lineTo(winX + codeW, winY + CHROME_H);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();

    // Traffic lights
    const dotY = winY + CHROME_H / 2;
    const dotX = winX + 14;
    const dots = ['#ff5f57', '#febc2e', '#28c840'];
    dots.forEach((color, i) => {
      ctx.beginPath();
      ctx.arc(dotX + i * 20, dotY, 6, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    });

    // Filename
    ctx.font = `500 12px "${fontFamily}", "JetBrains Mono", monospace`;
    ctx.fillStyle = 'rgba(255,255,255,0.38)';
    ctx.textBaseline = 'middle';
    ctx.fillText(filename, winX + 76, dotY);
  }

  // Code area
  const codeStartX = winX + H_PAD + GUTTER_W;
  const codeStartY = winY + CHROME_H + V_PAD;

  ctx.font = FONT;
  ctx.textBaseline = 'top';

  tokenizedLines.forEach((tokens, lineIndex) => {
    const y = codeStartY + lineIndex * LINE_H;

    // Line number
    if (showLineNumbers) {
      ctx.save();
      ctx.font = FONT;
      ctx.fillStyle = 'rgba(255,255,255,0.20)';
      ctx.textAlign = 'right';
      ctx.fillText(String(lineIndex + 1), winX + H_PAD + GUTTER_W - 12, y);
      ctx.restore();
    }

    // Tokens
    ctx.textAlign = 'left';
    let x = codeStartX;
    for (const token of tokens) {
      ctx.font = FONT;
      ctx.fillStyle = token.color || theme.text;
      ctx.fillText(token.text, x, y);
      x += ctx.measureText(token.text).width;
    }
  });

  // Gutter divider (draw once after all lines)
  if (showLineNumbers) {
    ctx.beginPath();
    ctx.moveTo(winX + H_PAD + GUTTER_W - 4, winY + CHROME_H);
    ctx.lineTo(winX + H_PAD + GUTTER_W - 4, winY + codeH);
    ctx.strokeStyle = 'rgba(255,255,255,0.06)';
    ctx.lineWidth = 1;
    ctx.stroke();
  }

  // Watermark
  if (showWatermark) {
    ctx.font = `11px "${fontFamily}", "JetBrains Mono", monospace`;
    ctx.fillStyle = 'rgba(255,255,255,0.3)';
    ctx.textAlign = 'right';
    ctx.textBaseline = 'bottom';
    ctx.fillText('Made with ◈ Quartz', winX + codeW - 12, winY + codeH - 6);
  }

  // Restore the outer clip
  ctx.restore();

  return canvas;
}

function roundRect(
  ctx: CanvasRenderingContext2D,
  x: number, y: number,
  w: number, h: number,
  r: number | [number, number, number, number]
) {
  const [tl, tr, br, bl] = Array.isArray(r) ? r : [r, r, r, r];
  ctx.beginPath();
  ctx.moveTo(x + tl, y);
  ctx.lineTo(x + w - tr, y);
  ctx.quadraticCurveTo(x + w, y, x + w, y + tr);
  ctx.lineTo(x + w, y + h - br);
  ctx.quadraticCurveTo(x + w, y + h, x + w - br, y + h);
  ctx.lineTo(x + bl, y + h);
  ctx.quadraticCurveTo(x, y + h, x, y + h - bl);
  ctx.lineTo(x, y + tl);
  ctx.quadraticCurveTo(x, y, x + tl, y);
  ctx.closePath();
}

function applyBackground(
  ctx: CanvasRenderingContext2D,
  bg: string,
  w: number,
  h: number
) {
  if (bg === 'transparent') {
    // Don't fill anything for transparent
    return;
  }

  if (bg.startsWith('linear-gradient')) {
    const match = bg.match(/linear-gradient\([^,]+,\s*(#[a-f0-9]+|\w+)[^,]*,\s*(#[a-f0-9]+|\w+)/i);
    if (match) {
      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, match[1]);
      grad.addColorStop(1, match[2]);
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = '#1a0533';
    }
  } else {
    ctx.fillStyle = bg;
  }
  ctx.fill();
}

function adjustBrightness(hex: string, amount: number): string {
  const clean = hex.replace('#', '');
  const num = parseInt(clean, 16);
  if (isNaN(num)) return hex;
  const r = Math.max(0, Math.min(255, (num >> 16) + amount));
  const g = Math.max(0, Math.min(255, ((num >> 8) & 0x00ff) + amount));
  const b = Math.max(0, Math.min(255, (num & 0x0000ff) + amount));
  return `rgb(${r},${g},${b})`;
}
