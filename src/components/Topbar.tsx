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

  const filteredThemes = themes.filter(t =>
    t.name.toLowerCase().includes(themeSearch.toLowerCase())
  );

  return (
    <div className="toolbar">
      {/* Theme dropdown with search */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="toolbar-btn">
            {themes[store.themeIndex]?.name ?? 'theme'}
          </button>
        </PopoverTrigger>
        <PopoverContent className="dropdown-menu w-52 p-0 max-h-72 overflow-hidden">
          <input
            type="text"
            placeholder="Search themes…"
            value={themeSearch}
            onChange={e => setThemeSearch(e.target.value)}
            className="w-full bg-transparent border-b px-3 py-2 text-sm font-toolbar outline-none placeholder:text-[#55556b]"
            style={{ borderColor: 'rgba(167,139,250,0.14)', color: '#c4b5fd' }}
            autoFocus
          />
          <div className="overflow-y-auto max-h-56">
            {filteredThemes.map((t) => {
              const idx = themes.indexOf(t);
              return (
                <button
                  key={t.name}
                  onClick={() => store.setThemeIndex(idx)}
                  className={`dropdown-item w-full text-left flex items-center gap-2 ${idx === store.themeIndex ? 'active' : ''}`}
                  style={{ fontSize: '12px' }}
                >
                  <span className="w-3 h-3 rounded-sm shrink-0" style={{ background: t.bg, border: '1px solid rgba(167,139,250,0.14)' }} />
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
        className="toolbar-btn"
        style={{ paddingRight: '6px' }}
      >
        <option value="auto">auto</option>
        {languages.map((l) => (
          <option key={l} value={l}>{l}</option>
        ))}
      </select>


      <div className="toolbar-divider" />

      {/* Inline sliders */}
      <div className="slider-wrap">
        <span>T</span>
        <input type="range" min={10} max={20} value={store.fontSize}
          onChange={(e) => store.setFontSize(Number(e.target.value))}
          className="toolbar-slider" />
      </div>
      <div className="slider-wrap">
        <span>▣</span>
        <input type="range" min={12} max={64} value={store.padding}
          onChange={(e) => store.setPadding(Number(e.target.value))}
          className="toolbar-slider" />
      </div>
      <div className="slider-wrap">
        <span>R</span>
        <input type="range" min={0} max={20} value={store.borderRadius}
          onChange={(e) => store.setBorderRadius(Number(e.target.value))}
          className="toolbar-slider" />
      </div>

      <div className="toolbar-divider" />

      {/* Toggles */}
      <button
        onClick={store.toggleLineNumbers}
        className={`toolbar-btn ${store.showLineNumbers ? 'active' : ''}`}
        style={{ padding: '0 8px', fontSize: '11px' }}
      >#</button>
      <button
        onClick={store.toggleWindowChrome}
        className={`toolbar-btn ${store.showWindowChrome ? 'active' : ''}`}
        style={{ padding: '0 8px', fontSize: '11px' }}
      >⬜</button>
      <button
        onClick={store.toggleShadow}
        className={`toolbar-btn ${store.showShadow ? 'active' : ''}`}
        style={{ padding: '0 8px', fontSize: '11px' }}
      >◼</button>

      {/* Card width */}
      <select
        value={store.cardWidthIndex}
        onChange={(e) => store.setCardWidthIndex(Number(e.target.value))}
        className="toolbar-btn"
        style={{ paddingRight: '6px' }}
      >
        {cardWidthPresets.map((w, i) => (
          <option key={i} value={i}>{w.name}</option>
        ))}
      </select>

      <div className="toolbar-divider" />

      {/* BG color swatch */}
      <Popover>
        <PopoverTrigger asChild>
          <button
            className="w-7 h-7 rounded-md shrink-0 hover:scale-110 transition-transform"
            style={{
              background: store.backgroundStyle,
              border: '1px solid rgba(167,139,250,0.15)',
              boxShadow: '0 0 8px rgba(124,58,237,0.12)',
            }}
          />
        </PopoverTrigger>
        <PopoverContent className="dropdown-menu w-auto p-3">
          <div className="grid grid-cols-4 gap-2">
            {gradientPresets.map((g, i) => (
              <button
                key={i}
                onClick={() => store.setBackgroundStyle(g)}
                className="w-7 h-7 rounded-md hover:scale-110 transition-transform"
                style={{
                  background: g === 'transparent' ? 'repeating-conic-gradient(#808080 0% 25%, transparent 0% 50%) 50% / 8px 8px' : g,
                  border: store.backgroundStyle === g ? '2px solid #a78bfa' : '1px solid rgba(167,139,250,0.14)',
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
        className="toolbar-btn"
        style={{ paddingRight: '6px' }}
      >
        {platformPresets.map((p, i) => (
          <option key={i} value={i}>{p.name}</option>
        ))}
      </select>

      {/* Settings popover */}
      <Popover>
        <PopoverTrigger asChild>
          <button className="toolbar-btn" style={{ padding: '0 8px' }}>
            <Settings className="w-3.5 h-3.5" />
          </button>
        </PopoverTrigger>
        <PopoverContent className="dropdown-menu w-56 p-4 space-y-3">
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
              className="w-20 toolbar-slider" />
          </label>
          <div className="border-t pt-2 space-y-1" style={{ borderColor: 'rgba(167,139,250,0.14)' }}>
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

      {/* Spacer */}
      <div className="flex-1" />

      {/* Right side — export actions */}
      <div className="flex items-center gap-1.5 flex-shrink-0">
        {/* Copy */}
        <ActionButton isPending={copyPending} onClick={copyToClipboard} variant="ghost" size="sm"
          className="toolbar-btn">
          {copied ? <ClipboardCheck className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
          <span>Copy</span>
        </ActionButton>

        {/* Tweet */}
        <button onClick={openTweet} className="toolbar-btn">
          <ExternalLink className="w-3 h-3" />
          <span>Tweet</span>
        </button>

        {/* PNG */}
        <ActionButton isPending={pngPending} onClick={() => doExport('png')} variant="default" size="sm"
          className="toolbar-btn export-primary" data-export-png>
          <Download className="w-3.5 h-3.5" /> PNG
        </ActionButton>

        {/* JPG */}
        <ActionButton isPending={jpgPending} onClick={() => doExport('jpg')} variant="outline" size="sm"
          className="toolbar-btn export-primary">
          <Download className="w-3.5 h-3.5" /> JPG
        </ActionButton>
      </div>
    </div>
  );
};

export default Topbar;