import html2canvas from 'html2canvas';

export async function captureElement(original: HTMLElement): Promise<HTMLCanvasElement> {
  await document.fonts.ready;

  // Save original inline styles
  const origTransform = original.style.transform;
  const origTransition = original.style.transition;

  // Reset transform/transition for clean capture
  original.style.transform = 'none';
  original.style.transition = 'none';

  // Remove textarea overlays temporarily
  const textareas = original.querySelectorAll('textarea');
  textareas.forEach((ta) => (ta as HTMLElement).style.display = 'none');

  // Wait for reflow
  await new Promise(r => requestAnimationFrame(r));
  await new Promise(r => requestAnimationFrame(r));
  await new Promise(r => setTimeout(r, 100));

  const canvas = await html2canvas(original, {
    scale: 2,
    useCORS: true,
    allowTaint: true,
    backgroundColor: null,
    logging: false,
    foreignObjectRendering: false,
    width: original.scrollWidth,
    height: original.scrollHeight,
    windowWidth: original.scrollWidth + 200,
    windowHeight: original.scrollHeight + 200,
  });

  // Restore
  textareas.forEach((ta) => (ta as HTMLElement).style.display = '');
  original.style.transform = origTransform;
  original.style.transition = origTransition;

  return canvas;
}
