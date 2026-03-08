import React, { useRef, useEffect } from 'react';
import Topbar from '@/components/Topbar';
import CodeCard from '@/components/CodeCard';
import { useQuartzStore } from '@/store/useQuartzStore';
import { platformPresets } from '@/lib/themes';
import { detectLanguage } from '@/lib/highlighter';

const Index = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const store = useQuartzStore();
  const platform = platformPresets[store.platformIndex];

  // Calculate scale to fit viewport
  const maxW = typeof window !== 'undefined' ? window.innerWidth * 0.75 : 900;
  const maxH = typeof window !== 'undefined' ? (window.innerHeight - 220) * 0.8 : 600;
  const scaleX = maxW / (platform.width > 0 ? platform.width : 800);
  const scaleY = maxH / (platform.height > 0 ? platform.height : 600);
  const scale = Math.min(scaleX, scaleY, 1);

  // Drag & drop
  useEffect(() => {
    const handler = (e: DragEvent) => {
      e.preventDefault();
      const file = e.dataTransfer?.files[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const text = ev.target?.result as string;
          store.setCode(text);
          store.setLanguage(detectLanguage(text));
          store.setFilename(file.name);
        };
        reader.readAsText(file);
      }
    };
    const prevent = (e: DragEvent) => e.preventDefault();
    document.addEventListener('drop', handler);
    document.addEventListener('dragover', prevent);
    return () => {
      document.removeEventListener('drop', handler);
      document.removeEventListener('dragover', prevent);
    };
  }, [store]);

  return (
    <div className="relative min-h-screen flex flex-col items-center" style={{ zIndex: 1 }}>
      {/* Header */}
      <div className="flex items-center gap-2 pt-6 pb-4">
        <span
          className="text-2xl cursor-default transition-all duration-300 hover:drop-shadow-[0_0_12px_rgba(167,139,250,0.6)]"
          style={{ color: '#a78bfa' }}
        >
          ◈
        </span>
        <span className="font-semibold text-lg tracking-wide" style={{ color: '#a78bfa' }}>
          quartz
        </span>
        <span className="text-sm ml-2" style={{ color: '#6b6b8a' }}>
          Crystallize your code.
        </span>
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
        {/* Toolbar */}
        <Topbar cardRef={cardRef} />

        {/* Dimension badge */}
        <div className="flex justify-center py-1.5">
          <span className="text-[10px]" style={{ color: '#6b6b8a' }}>
            {platform.width} × {platform.height}px · {platform.name}
          </span>
        </div>

        {/* Canvas area */}
        <div className="flex-1 flex items-center justify-center checkerboard p-6 min-h-[400px]">
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
        <span className="text-xs" style={{ color: '#6b6b8a' }}>
          Start typing or drop a file to get started.
        </span>
      </div>
    </div>
  );
};

export default Index;
