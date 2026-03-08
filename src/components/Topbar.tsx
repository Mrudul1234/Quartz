import React, { useState } from 'react';
import { useQuartzStore } from '@/store/useQuartzStore';
import { themes, gradientPresets, platformPresets, codeFonts, cardWidthPresets } from '@/lib/themes';
import { captureElement } from '@/lib/exportUtils';
import ActionButton from '@/components/ui/action-button';
import { Download, Copy, ClipboardCheck, Settings, ExternalLink } from 'lucide-react';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from 'sonner';

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
  const [themeSearch, setThemeSearch] = useState('');

  const platform = platformPresets[store.platformIndex];

  async function doExport(format: 'png' | 'jpg') {
    const setter = format === 'png' ? setPngPending : setJpgPending;
    setter(true);
    try {
      const el = cardRef.current;
      if (!el) return;
      const canvas = await captureElement(el);
      const mime = format === 'png' ? 'image/png' : 'image/jpeg';
      const quality = format === 'png' ? 1.0 : 0.95;
      const url = canvas.toDataURL(mime, quality);
      const a = document.createElement('a');
      a.href = url;
      a.download = `quartz-export.${format}`;
      a.click();
    } finally {
      setter(false);
    }
  }

  async function copyToClipboard() {
    setCopyPending(true);
    try {
      const el = cardRef.current;
      if (!el) return;
      const canvas = await captureElement(el);
      canvas.toBlob(async (blob) => {
        if (!blob) return;
        try {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob }),
          ]);
          setCopied(true);
          toast.success('Copied ✓');
          setTimeout(() => setCopied(false), 2000);
        } catch {
          toast.error('Copy failed — use PNG export');
        }
      }, 'image/png');
    } finally {
      setCopyPending(false);
    }
  }

  function openTweet() {
    const url = `https://twitter.com/intent/tweet?text=Check+out+my+code+snippet+%E2%80%94+made+with+%E2%97%88+Quartz&url=https://quartz.sh`;
    window.open(url, '_blank');
  }

  const selectStyle = {
    background: '#1a1a2e',
    color: '#e2e2f0',
    borderColor: '#2e2e4a',
  };

  const filteredThemes = themes.filter(t =>
    t.name.toLowerCase().includes(themeSearch.toLowerCase())
  );

  return (
    <div
      className="flex items-center gap-2 px-3 py-2.5 border-b overflow-x-auto no-scrollbar font-toolbar"
      style={{ borderColor: '#2e2e4a' }}
    >
      {/* Theme dropdown with search */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="text-xs rounded px-2 py-1.5 border cursor-pointer shrink-0 hover:bg-[rgba(124,58,237,0.15)] transition-colors"
            style={selectStyle}
          >
            {themes[store.themeIndex]?.name ?? 'theme'}
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-52 p-0 max-h-72 overflow-hidden" style={{ background: '#13131f', borderColor: '#2e2e4a' }}>
          <input
            type="text"
            placeholder="Search themes…"
            value={themeSearch}
            onChange={e => setThemeSearch(e.target.value)}
            className="w-full bg-transparent border-b px-3 py-2 text-sm font-toolbar text-violet-200 outline-none placeholder:text-[#55556b]"
            style={{ borderColor: '#2e2e4a' }}
            autoFocus
          />
          <div className="overflow-y-auto max-h-56">
            {filteredThemes.map((t) => {
              const idx = themes.indexOf(t);
              return (
                <button
                  key={t.name}
                  onClick={() => store.setThemeIndex(idx)}
                  className="w-full text-left px-3 py-1.5 text-xs hover:bg-[rgba(124,58,237,0.15)] transition-colors flex items-center gap-2"
                  style={{
                    color: '#e2e2f0',
                    background: idx === store.themeIndex ? 'rgba(124,58,237,0.25)' : 'transparent',
                  }}
                >
                  <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: t.bg, border: '1px solid #2e2e4a' }} />
                  {t.name}
                </button>
              );
            })}
          </div>
        </PopoverContent>
      </Popover>

      {/* Language */}
      <select
        value={store.language}
        onChange={(e) => store.setLanguage(e.target.value)}
        className="text-xs rounded px-2 py-1.5 outline-none border cursor-pointer shrink-0"
        style={selectStyle}
      >
        <option value="auto">auto</option>
        {languages.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>


      <div className="w-px h-5 shrink-0" style={{ background: '#2e2e4a' }} />

      {/* Inline sliders */}
      <label className="flex items-center gap-1 text-[10px] shrink-0" style={{ color: '#a78bfa' }}>
        T
        <input type="range" min={10} max={20} value={store.fontSize}
          onChange={(e) => store.setFontSize(Number(e.target.value))}
          className="w-14 accent-violet-500" />
      </label>
      <label className="flex items-center gap-1 text-[10px] shrink-0" style={{ color: '#a78bfa' }}>
        ▣
        <input type="range" min={12} max={64} value={store.padding}
          onChange={(e) => store.setPadding(Number(e.target.value))}
          className="w-14 accent-violet-500" />
      </label>
      <label className="flex items-center gap-1 text-[10px] shrink-0" style={{ color: '#a78bfa' }}>
        <span style={{ fontSize: '11px', lineHeight: 1 }}>R</span>
        <input type="range" min={0} max={20} value={store.borderRadius}
          onChange={(e) => store.setBorderRadius(Number(e.target.value))}
          className="w-14 accent-violet-500" />
      </label>

      <div className="w-px h-5 shrink-0" style={{ background: '#2e2e4a' }} />

      {/* Toggles */}
      <button
        onClick={store.toggleLineNumbers}
        className="text-[10px] px-1.5 py-1 rounded border shrink-0 transition-colors"
        style={{
          borderColor: store.showLineNumbers ? '#7c3aed' : '#2e2e4a',
          background: store.showLineNumbers ? 'rgba(124,58,237,0.25)' : 'transparent',
          color: '#e2e2f0',
        }}
      >#</button>
      <button
        onClick={store.toggleWindowChrome}
        className="text-[10px] px-1.5 py-1 rounded border shrink-0 transition-colors"
        style={{
          borderColor: store.showWindowChrome ? '#7c3aed' : '#2e2e4a',
          background: store.showWindowChrome ? 'rgba(124,58,237,0.25)' : 'transparent',
          color: '#e2e2f0',
        }}
      >⬜</button>
      <button
        onClick={store.toggleShadow}
        className="text-[10px] px-1.5 py-1 rounded border shrink-0 transition-colors"
        style={{
          borderColor: store.showShadow ? '#7c3aed' : '#2e2e4a',
          background: store.showShadow ? 'rgba(124,58,237,0.25)' : 'transparent',
          color: '#e2e2f0',
        }}
      >◼</button>

      {/* Card width */}
      <select
        value={store.cardWidthIndex}
        onChange={(e) => store.setCardWidthIndex(Number(e.target.value))}
        className="text-xs rounded px-2 py-1.5 outline-none border cursor-pointer shrink-0"
        style={selectStyle}
      >
        {cardWidthPresets.map((w, i) => (
          <option key={i} value={i}>{w.name}</option>
        ))}
      </select>

      <div className="w-px h-5 shrink-0" style={{ background: '#2e2e4a' }} />

      {/* BG color swatch */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="w-6 h-6 rounded-md border shrink-0 hover:scale-110 transition-transform"
            style={{ background: store.backgroundStyle, borderColor: '#2e2e4a' }}
          />
        </PopoverTrigger>
        <PopoverContent className="w-auto p-3" style={{ background: '#13131f', borderColor: '#2e2e4a' }}>
          <div className="grid grid-cols-4 gap-2">
            {gradientPresets.map((g, i) => (
              <button
                key={i}
                onClick={() => store.setBackgroundStyle(g)}
                className="w-7 h-7 rounded-md border hover:scale-110 transition-transform"
                style={{
                  background: g === 'transparent' ? 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 8px 8px' : g,
                  borderColor: store.backgroundStyle === g ? '#7c3aed' : '#2e2e4a',
                }}
              />
            ))}
          </div>
        </PopoverContent>
      </Popover>

      {/* Platform */}
      <select
        value={store.platformIndex}
        onChange={(e) => store.setPlatformIndex(Number(e.target.value))}
        className="text-xs rounded px-2 py-1.5 outline-none border cursor-pointer shrink-0"
        style={selectStyle}
      >
        {platformPresets.map((p, i) => (
          <option key={i} value={i}>{p.name}</option>
        ))}
      </select>

      {/* Settings popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="p-1.5 rounded-md border shrink-0 hover:bg-[rgba(124,58,237,0.15)] transition-colors"
            style={{ borderColor: '#2e2e4a', color: '#a78bfa' }}
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="w-56 p-4 space-y-3" style={{ background: '#13131f', borderColor: '#2e2e4a' }}>
          <h4 className="text-xs font-settings-heading" style={{ color: '#c4b5fd' }}>settings</h4>
          <label className="flex items-center justify-between text-xs cursor-pointer" style={{ color: '#e2e2f0' }}>
            <span>watermark</span>
            <input type="checkbox" checked={store.showWatermark} onChange={store.toggleWatermark}
              className="accent-violet-500" />
          </label>
          <label className="flex items-center justify-between text-xs" style={{ color: '#e2e2f0' }}>
            <span>line height ({store.lineHeight.toFixed(1)})</span>
            <input type="range" min={120} max={220} value={Math.round(store.lineHeight * 100)}
              onChange={(e) => store.setLineHeight(Number(e.target.value) / 100)}
              className="w-20 accent-violet-500" />
          </label>
          <div className="border-t pt-2 space-y-1" style={{ borderColor: '#2e2e4a' }}>
            <h4 className="text-[10px] font-settings-heading mb-1" style={{ color: '#6b6b8a' }}>keyboard shortcuts</h4>
            {[
              ['Ctrl+V', 'Paste code'],
              ['Ctrl+S', 'Export PNG'],
              ['?', 'Show help'],
              ['Esc', 'Close panels'],
            ].map(([key, desc]) => (
              <div key={key} className="flex justify-between text-[10px]" style={{ color: '#8b8ba0' }}>
                <kbd className="font-toolbar-btn" style={{ color: '#c4b5fd' }}>{key}</kbd>
                <span>{desc}</span>
              </div>
            ))}
          </div>
        </PopoverContent>
      </Popover>

      <div className="flex-1" />

      {/* Copy */}
      <ActionButton isPending={copyPending} onClick={copyToClipboard} variant="ghost" size="sm" className="shrink-0 text-violet-300 hover:text-violet-100 font-toolbar-btn">
        {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
      </ActionButton>

      {/* Tweet */}
      <button
        onClick={openTweet}
        className="text-xs px-2 py-1 rounded border shrink-0 hover:bg-[rgba(124,58,237,0.15)] transition-colors font-toolbar-btn"
        style={{ borderColor: '#2e2e4a', color: '#a78bfa' }}
      >
        <ExternalLink className="w-3 h-3 inline mr-1" />tweet
      </button>

      {/* Export */}
      <ActionButton isPending={pngPending} onClick={() => doExport('png')} variant="default" size="sm" className="shrink-0 font-toolbar-btn">
        <Download className="w-3.5 h-3.5" /> PNG
      </ActionButton>
      <ActionButton isPending={jpgPending} onClick={() => doExport('jpg')} variant="outline" size="sm" className="shrink-0 font-toolbar-btn">
        JPG
      </ActionButton>
    </div>
  );
};

export default Topbar;
