import html2canvas from 'html2canvas';

export function buildExportClone(original: HTMLElement): HTMLElement {
  const clone = original.cloneNode(true) as HTMLElement;

  // Copy computed styles for the card frame (ensures border, box-shadow, background render)
  const computed = window.getComputedStyle(original);
  clone.style.position = 'fixed';
  clone.style.top = '-99999px';
  clone.style.left = '-99999px';
  clone.style.width = original.scrollWidth + 'px';
  clone.style.height = original.scrollHeight + 'px';
  clone.style.overflow = 'visible';
  clone.style.transform = 'none';
  clone.style.maxWidth = 'none';
  clone.style.maxHeight = 'none';
  // Inline computed border/shadow/background so html2canvas sees them
  clone.style.border = computed.border;
  clone.style.boxShadow = computed.boxShadow;
  if (!clone.style.background || clone.style.background === 'none') {
    clone.style.background = computed.background;
  }

  // Flatten every span
  clone.querySelectorAll('span').forEach((span) => {
    span.style.display = 'inline';
    span.style.position = 'static';
    span.style.transform = 'none';
    span.style.whiteSpace = 'pre';
    span.style.verticalAlign = 'baseline';
    span.style.overflow = 'visible';
  });

  // Fix pre/code blocks
  clone.querySelectorAll('pre, code').forEach((el) => {
    const e = el as HTMLElement;
    e.style.overflow = 'visible';
    e.style.whiteSpace = 'pre';
    e.style.wordBreak = 'normal';
    e.style.wordWrap = 'normal';
    e.style.transform = 'none';
    e.style.position = 'static';
    e.style.maxWidth = 'none';
    e.style.width = 'auto';
  });

  // Fix card containers
  clone.querySelectorAll('.card-frame, .vscode-win, .vscode-body').forEach((el) => {
    const e = el as HTMLElement;
    e.style.overflow = 'visible';
    e.style.maxWidth = 'none';
    e.style.width = 'auto';
  });

  // Remove textarea overlays from clone
  clone.querySelectorAll('textarea').forEach((ta) => ta.remove());

  return clone;
}

export async function captureElement(original: HTMLElement): Promise<HTMLCanvasElement> {
  await document.fonts.ready;

  const clone = buildExportClone(original);
  document.body.appendChild(clone);

  await new Promise(r => requestAnimationFrame(r));
  await new Promise(r => requestAnimationFrame(r));
  await new Promise(r => setTimeout(r, 120));

  const canvas = await html2canvas(clone, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
    foreignObjectRendering: false,
    width: clone.scrollWidth,
    height: clone.scrollHeight,
    x: 0,
    y: 0,
    windowWidth: clone.scrollWidth,
    windowHeight: clone.scrollHeight,
  });

  document.body.removeChild(clone);
  return canvas;
}
