import React, { useState } from 'react';
import { useQuartzStore } from '@/store/useQuartzStore';
import { themes, gradientPresets, platformPresets } from '@/lib/themes';
import ActionButton from '@/components/ui/action-button';
import html2canvas from 'html2canvas';
import { Download, Hash, Monitor, Sun, Type, Columns, PanelRight } from 'lucide-react';

interface TopbarProps {
  cardRef: React.RefObject<HTMLDivElement>;
  onToggleDrawer: () => void;
}

const languages = ['javascript', 'typescript', 'python', 'rust', 'go', 'html', 'css', 'java', 'c', 'cpp'];

const Topbar: React.FC<TopbarProps> = ({ cardRef, onToggleDrawer }) => {
  const store = useQuartzStore();
  const [pngPending, setPngPending] = useState(false);
  const [jpgPending, setJpgPending] = useState(false);

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

  return (
    <div className="sticky top-0 z-50 w-full border-b border-border" style={{ backgroundColor: 'rgba(14,14,14,0.8)', backdropFilter: 'blur(12px)' }}>
      <div className="flex items-center gap-3 px-4 py-2.5 overflow-x-auto no-scrollbar">
        {/* Logo */}
        <div className="flex items-center gap-1.5 shrink-0 mr-2">
          <span className="text-xl hover:animate-pulse cursor-default" style={{ color: '#f0c040' }}>◈</span>
          <span className="font-semibold text-sm tracking-wide" style={{ color: '#f0c040' }}>quartz</span>
        </div>

        <div className="w-px h-6 bg-border shrink-0" />

        {/* Theme */}
        <select
          value={store.themeIndex}
          onChange={(e) => store.setThemeIndex(Number(e.target.value))}
          className="bg-secondary text-secondary-foreground text-xs rounded px-2 py-1.5 outline-none border border-border cursor-pointer shrink-0"
        >
          {themes.map((t, i) => (
            <option key={i} value={i}>{t.name}</option>
          ))}
        </select>

        {/* Language */}
        <select
          value={store.language}
          onChange={(e) => store.setLanguage(e.target.value)}
          className="bg-secondary text-secondary-foreground text-xs rounded px-2 py-1.5 outline-none border border-border cursor-pointer shrink-0"
        >
          {languages.map((l) => (
            <option key={l} value={l}>{l}</option>
          ))}
        </select>

        <div className="w-px h-6 bg-border shrink-0" />

        {/* Sliders */}
        <label className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Type className="w-3 h-3" />
          <input type="range" min={10} max={24} value={store.fontSize}
            onChange={(e) => store.setFontSize(Number(e.target.value))}
            className="w-16 accent-primary" />
        </label>

        <label className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Columns className="w-3 h-3" />
          <input type="range" min={12} max={80} value={store.padding}
            onChange={(e) => store.setPadding(Number(e.target.value))}
            className="w-16 accent-primary" />
        </label>

        <label className="flex items-center gap-1.5 text-xs text-muted-foreground shrink-0">
          <Sun className="w-3 h-3" />
          <input type="range" min={0} max={24} value={store.borderRadius}
            onChange={(e) => store.setBorderRadius(Number(e.target.value))}
            className="w-16 accent-primary" />
        </label>

        <div className="w-px h-6 bg-border shrink-0" />

        {/* Toggles */}
        <button onClick={store.toggleLineNumbers}
          className={`text-xs px-2 py-1 rounded border shrink-0 transition-colors ${store.showLineNumbers ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-secondary-foreground border-border'}`}>
          <Hash className="w-3.5 h-3.5" />
        </button>
        <button onClick={store.toggleWindowChrome}
          className={`text-xs px-2 py-1 rounded border shrink-0 transition-colors ${store.showWindowChrome ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-secondary-foreground border-border'}`}>
          <Monitor className="w-3.5 h-3.5" />
        </button>
        <button onClick={store.toggleShadow}
          className={`text-xs px-2 py-1 rounded border shrink-0 transition-colors ${store.showShadow ? 'bg-primary text-primary-foreground border-primary' : 'bg-secondary text-secondary-foreground border-border'}`}>
          <Sun className="w-3.5 h-3.5" />
        </button>

        <div className="w-px h-6 bg-border shrink-0" />

        {/* BG Swatches */}
        <div className="flex gap-1 shrink-0">
          {gradientPresets.map((g, i) => (
            <button key={i} onClick={() => store.setBackgroundStyle(g)}
              className="w-5 h-5 rounded-full border border-border hover:scale-110 transition-transform"
              style={{ background: g }} />
          ))}
        </div>

        <div className="w-px h-6 bg-border shrink-0" />

        {/* Platform */}
        <select
          value={store.platformIndex}
          onChange={(e) => store.setPlatformIndex(Number(e.target.value))}
          className="bg-secondary text-secondary-foreground text-xs rounded px-2 py-1.5 outline-none border border-border cursor-pointer shrink-0"
        >
          {platformPresets.map((p, i) => (
            <option key={i} value={i}>{p.name}</option>
          ))}
        </select>

        <div className="w-px h-6 bg-border shrink-0" />

        {/* Edit Code drawer */}
        <button onClick={onToggleDrawer}
          className="text-xs px-2 py-1 rounded border bg-secondary text-secondary-foreground border-border shrink-0 hover:bg-accent transition-colors">
          <PanelRight className="w-3.5 h-3.5" />
        </button>

        {/* Export */}
        <ActionButton isPending={pngPending} onClick={() => doExport('png')} variant="default" size="sm" className="shrink-0">
          <Download className="w-3.5 h-3.5" /> PNG
        </ActionButton>
        <ActionButton isPending={jpgPending} onClick={() => doExport('jpg')} variant="outline" size="sm" className="shrink-0">
          <Download className="w-3.5 h-3.5" /> JPG
        </ActionButton>
      </div>

      {/* Platform info badge */}
      <div className="flex justify-center pb-1.5">
        <span className="text-[10px] text-muted-foreground">
          {platform.width} × {platform.height}px · {platform.name}
        </span>
      </div>
    </div>
  );
};

export default Topbar;
