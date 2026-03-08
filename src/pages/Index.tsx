import React, { useRef, useState, useEffect } from 'react';
import { BeamsBackground } from '@/components/ui/beams-background';
import Topbar from '@/components/Topbar';
import CodeCard from '@/components/CodeCard';
import CodeDrawer from '@/components/CodeDrawer';
import { useQuartzStore } from '@/store/useQuartzStore';
import { platformPresets } from '@/lib/themes';
import { detectLanguage } from '@/lib/highlighter';

const Index = () => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const store = useQuartzStore();
  const platform = platformPresets[store.platformIndex];

  // Calculate scale to fit viewport
  const maxW = typeof window !== 'undefined' ? window.innerWidth * 0.85 : 900;
  const maxH = typeof window !== 'undefined' ? (window.innerHeight - 120) * 0.85 : 600;
  const scaleX = maxW / (platform.width > 0 ? platform.width : 800);
  const scaleY = maxH / (platform.height > 0 ? platform.height : 600);
  const scale = Math.min(scaleX, scaleY, 1);

  // Escape closes drawer
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

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
          const ext = file.name.split('.').pop() || '';
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
    <BeamsBackground intensity="medium">
      <div className="grain-overlay h-screen flex flex-col overflow-hidden">
        <Topbar cardRef={cardRef} onToggleDrawer={() => setDrawerOpen(!drawerOpen)} />

        {/* Canvas area */}
        <div className="flex-1 flex items-center justify-center checkerboard overflow-hidden">
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

        <CodeDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      </div>
    </BeamsBackground>
  );
};

export default Index;
