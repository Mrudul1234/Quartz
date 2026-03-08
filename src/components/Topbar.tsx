import React, { useState } from 'react';
import { useQuartzStore } from '@/store/useQuartzStore';
import { themes, gradientPresets, platformPresets } from '@/lib/themes';
import ActionButton from '@/components/ui/action-button';
import html2canvas from 'html2canvas';
import { Download, Settings, Copy, ClipboardCheck } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';

interface TopbarProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

const languages = ['javascript', 'typescript', 'python', 'rust', 'go', 'html', 'css', 'java', 'c', 'cpp'];

const Topbar: React.FC<TopbarProps> = ({ cardRef }) => {
  const store = useQuartzStore();
  const [pngPending, setPngPending] = useState(false);
  const [jpgPending, setJpgPending] = useState(false);
  const [copyPending, setCopyPending] = useState(false);
  const [copied, setCopied] = useState(false);

  const platform = platformPresets[store.platformIndex];

  async function doExport(format: 'png' | 'jpg') {
    const setter = format === 'png' ? setPngPending : setJpgPending;
    setter(true);
    try {
      await document.fonts.ready;
      const el = cardRef.current;
      if (!el) return;
      const prev = el.style.overflow;
      el.style.overflow = 'visible';
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });
      el.style.overflow = prev;
      const mime = format === 'png' ? 'image/png' : 'image/jpeg';
      const quality = format === 'png' ? 1.0 : 0.95;
      const url = canvas.toDataURL(mime, quality);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quartz-${themes[store.themeIndex].name.toLowerCase().replace(/\s+/g, '-')}.${format}`;
      a.click();
    } finally {
      setter(false);
    }
  }

  async function copyToClipboard() {
    setCopyPending(true);
    try {
      await document.fonts.ready;
      const el = cardRef.current;
      if (!el) return;
      const prev = el.style.overflow;
      el.style.overflow = 'visible';
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        logging: false,
      });
      el.style.overflow = prev;
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }
      }, 'image/png');
    } finally {
      setCopyPending(false);
    }
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2.5 border-b overflow-x-auto no-scrollbar" style={{ borderColor: '#2e2e4a' }}>
      {/* Theme */}
      <select
        value={store.themeIndex}
        onChange={(e) => store.setThemeIndex(Number(e.target.value))}
        className="text-xs rounded px-2 py-1.5 outline-none border cursor-pointer shrink-0"
        style={{ background: '#1a1a2e', color: '#e2e2f0', borderColor: '#2e2e4a' }}
      >
        {themes.map((t, i) => (
          <option key={i} value={i}>{t.name}</option>
        ))}
      </select>

      {/* Language */}
      <select
        value={store.language}
        onChange={(e) => store.setLanguage(e.target.value)}
        className="text-xs rounded px-2 py-1.5 outline-none border cursor-pointer shrink-0"
        style={{ background: '#1a1a2e', color: '#e2e2f0', borderColor: '#2e2e4a' }}
      >
        <option value="auto">Auto</option>
        {languages.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>

      {/* BG color swatch */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="w-7 h-7 rounded-md border shrink-0 hover:scale-110 transition-transform"
            style={{ background: store.backgroundStyle, borderColor: '#2e2e4a' }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" style={{ background: '#13131f', borderColor: '#2e2e4a' }}>
          <div className="grid grid-cols-4 gap-2">
            {gradientPresets.map((g, i) => (
              <button
                key={i}
                onClick={() => store.setBackgroundStyle(g)}
                className="w-8 h-8 rounded-md border hover:scale-110 transition-transform"
                style={{ background: g, borderColor: store.backgroundStyle === g ? '#7c3aed' : '#2e2e4a' }}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="w-px h-6 shrink-0" style={{ background: '#2e2e4a' }} />

      {/* Platform */}
      <select
        value={store.platformIndex}
        onChange={(e) => store.setPlatformIndex(Number(e.target.value))}
        className="text-xs rounded px-2 py-1.5 outline-none border cursor-pointer shrink-0"
        style={{ background: '#1a1a2e', color: '#e2e2f0', borderColor: '#2e2e4a' }}
      >
        {platformPresets.map((p, i) => (
          <option key={i} value={i}>{p.name}</option>
        ))}
      </select>

      {/* Settings popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="p-1.5 rounded-md border shrink-0 hover:bg-[#2e2e4a] transition-colors"
            style={{ borderColor: '#2e2e4a', color: '#a78bfa' }}
          >
            <Settings className="w-4 h-4" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-64 p-4 space-y-4" style={{ background: '#13131f', borderColor: '#2e2e4a' }}>
          <div className="space-y-3">
            <label className="flex items-center justify-between text-xs" style={{ color: '#e2e2f0' }}>
              <span>Font Size ({store.fontSize}px)</span>
              <input type="range" min={10} max={24} value={store.fontSize}
                onChange={(e) => store.setFontSize(Number(e.target.value))}
                className="w-24 accent-violet-500" />
            </label>
            <label className="flex items-center justify-between text-xs" style={{ color: '#e2e2f0' }}>
              <span>Padding ({store.padding}px)</span>
              <input type="range" min={12} max={80} value={store.padding}
                onChange={(e) => store.setPadding(Number(e.target.value))}
                className="w-24 accent-violet-500" />
            </label>
            <label className="flex items-center justify-between text-xs" style={{ color: '#e2e2f0' }}>
              <span>Radius ({store.borderRadius}px)</span>
              <input type="range" min={0} max={24} value={store.borderRadius}
                onChange={(e) => store.setBorderRadius(Number(e.target.value))}
                className="w-24 accent-violet-500" />
            </label>
            <label className="flex items-center justify-between text-xs" style={{ color: '#e2e2f0' }}>
              <span>Line Height ({store.lineHeight.toFixed(2)})</span>
              <input type="range" min={120} max={220} value={Math.round(store.lineHeight * 100)}
                onChange={(e) => store.setLineHeight(Number(e.target.value) / 100)}
                className="w-24 accent-violet-500" />
            </label>
          </div>
          <div className="border-t pt-3 space-y-2" style={{ borderColor: '#2e2e4a' }}>
            <label className="flex items-center justify-between text-xs cursor-pointer" style={{ color: '#e2e2f0' }}>
              <span>Line Numbers</span>
              <input type="checkbox" checked={store.showLineNumbers} onChange={store.toggleLineNumbers}
                className="accent-violet-500" />
            </label>
            <label className="flex items-center justify-between text-xs cursor-pointer" style={{ color: '#e2e2f0' }}>
              <span>Window Chrome</span>
              <input type="checkbox" checked={store.showWindowChrome} onChange={store.toggleWindowChrome}
                className="accent-violet-500" />
            </label>
            <label className="flex items-center justify-between text-xs cursor-pointer" style={{ color: '#e2e2f0' }}>
              <span>Drop Shadow</span>
              <input type="checkbox" checked={store.showShadow} onChange={store.toggleShadow}
                className="accent-violet-500" />
            </label>
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex-1" />

      {/* Copy */}
      <ActionButton isPending={copyPending} onClick={copyToClipboard} variant="ghost" size="sm" className="shrink-0 text-violet-300 hover:text-violet-100">
        {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </ActionButton>

      {/* Export */}
      <ActionButton isPending={pngPending} onClick={() => doExport('png')} variant="default" size="sm" className="shrink-0">
        <Download className="w-3.5 h-3.5" /> PNG
      </ActionButton>
      <ActionButton isPending={jpgPending} onClick={() => doExport('jpg')} variant="outline" size="sm" className="shrink-0">
        JPG
      </ActionButton>
    </div>
  );
};

export default Topbar;
