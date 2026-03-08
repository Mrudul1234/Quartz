import html2canvas from 'html2canvas';

export function buildExportClone(original: HTMLElement): HTMLElement {
  const clone = original.cloneNode(true) as HTMLElement;

  clone.style.position = 'fixed';
  clone.style.top = '-99999px';
  clone.style.left = '-99999px';
  clone.style.width = original.offsetWidth + 'px';
  clone.style.height = original.offsetHeight + 'px';
  clone.style.overflow = 'visible';
  clone.style.transform = 'none';

  // Flatten every span
  clone.querySelectorAll('span').forEach((span) => {
    span.style.display = 'inline';
    span.style.position = 'static';
    span.style.transform = 'none';
    span.style.whiteSpace = 'pre';
    span.style.verticalAlign = 'baseline';
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
  await new Promise(r => setTimeout(r, 80));

  const canvas = await html2canvas(clone, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
    foreignObjectRendering: false,
  });

  document.body.removeChild(clone);
  return canvas;
}
