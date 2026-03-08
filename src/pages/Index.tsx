import React, { useRef, useEffect, useState, useCallback } from 'react';
import Topbar from '@/components/Topbar';
import CodeCard from '@/components/CodeCard';
import { useQuartzStore } from '@/store/useQuartzStore';
import { platformPresets, extMap, cardWidthPresets } from '@/lib/themes';
import { detectLanguage } from '@/lib/highlighter';

const Index = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const store = useQuartzStore();
  const platform = platformPresets[store.platformIndex];
  const cardWidth = cardWidthPresets[store.cardWidthIndex];
  const [dragging, setDragging] = useState(false);

  // Scale to fit viewport
  const maxW = typeof window !== 'undefined' ? window.innerWidth * 0.75 : 900;
  const maxH = typeof window !== 'undefined' ? (window.innerHeight - 220) * 0.8 : 600;
  const scaleX = maxW / (platform.width > 0 ? platform.width : 800);
  const scaleY = maxH / (platform.height > 0 ? platform.height : 600);
  const scale = Math.min(scaleX, scaleY, 1);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        // trigger PNG export via click
        const btn = document.querySelector('[data-export-png]') as HTMLButtonElement;
        btn?.click();
      }
    };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, []);

  // Drag & drop
  const handleDrop = useCallback((e: DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer?.files[0];
    if (file) {
      const ext = file.name.split('.').pop()?.toLowerCase() ?? '';
      const reader = new FileReader();
      reader.onload = (ev) => {
        const text = ev.target?.result as string;
        store.setCode(text);
        store.setLanguage(extMap[ext] ?? detectLanguage(text));
        store.setFilename(file.name);
      };
      reader.readAsText(file);
    }
  }, [store]);

  useEffect(() => {
    const prevent = (e: DragEvent) => e.preventDefault();
    const dragEnter = (e: DragEvent) => { e.preventDefault(); setDragging(true); };
    const dragLeave = (e: DragEvent) => { e.preventDefault(); setDragging(false); };
    document.addEventListener('drop', handleDrop);
    document.addEventListener('dragover', prevent);
    document.addEventListener('dragenter', dragEnter);
    document.addEventListener('dragleave', dragLeave);
    return () => {
      document.removeEventListener('drop', handleDrop);
      document.removeEventListener('dragover', prevent);
      document.removeEventListener('dragenter', dragEnter);
      document.removeEventListener('dragleave', dragLeave);
    };
  }, [handleDrop]);

  // URL state sync
  useEffect(() => {
    const params = new URLSearchParams();
    params.set('theme', String(store.themeIndex));
    params.set('lang', store.language);
    params.set('font', String(store.fontIndex));
    params.set('platform', String(store.platformIndex));
    params.set('nums', String(store.showLineNumbers));
    params.set('frame', String(store.showWindowChrome));
    params.set('shadow', String(store.showShadow));
    params.set('width', String(store.cardWidthIndex));
    history.replaceState(null, '', '?' + params.toString());
  }, [store.themeIndex, store.language, store.fontIndex, store.platformIndex, store.showLineNumbers, store.showWindowChrome, store.showShadow, store.cardWidthIndex]);

  return (
    <div className="relative min-h-screen flex flex-col items-center" style={{ zIndex: 1 }}>
      {/* Header */}
      <div className="flex items-center gap-2 pt-6 pb-4">
        <span className="quartz-logo cursor-default">◈ quartz</span>
        <span className="quartz-tagline ml-2">Crystallize your code.</span>
      </div>

      {/* Main container */}
      <div
        className="w-full max-w-[920px] mx-auto rounded-xl border flex flex-col overflow-hidden"
        style={{
          borderColor: '#2e2e4a',
          background: 'rgba(19, 19, 31, 0.85)',
          backdropFilter: 'blur(20px)',
          boxShadow: '0 0 40px rgba(124,58,237,0.12)',
        }}
      >
        <Topbar cardRef={cardRef} />

        {/* Dimension badge */}
        <div className="flex justify-center py-1.5">
          <span className="font-dimension text-[10px]" style={{ color: '#6b6b8a' }}>
            {platform.width} × {platform.height}px · {platform.name}
          </span>
        </div>

        {/* Canvas area */}
        <div
          className={`flex-1 flex items-center justify-center checkerboard min-h-[400px] ${dragging ? 'drop-highlight' : ''}`}
          style={{ padding: '48px 56px 44px' }}
        >
          <div
            style={{
              width: platform.width,
              height: platform.height,
              transform: `scale(${scale})`,
              transformOrigin: 'center center',
            }}
            className="flex items-center justify-center shrink-0"
          >
            <CodeCard cardRef={cardRef} />
          </div>
        </div>
      </div>

      {/* Footer hint */}
      <div className="py-4">
        <span className="font-footer text-xs" style={{ color: '#6b6b8a' }}>
          Start typing or drop a file to get started.
        </span>
      </div>
    </div>
  );
};

export default Index;
