import React from 'react';
import { useQuartzStore } from '@/store/useQuartzStore';
import { X } from 'lucide-react';
import { detectLanguage } from '@/lib/highlighter';

interface CodeDrawerProps {
  open: boolean;
  onClose: () => void;
}

const CodeDrawer: React.FC<CodeDrawerProps> = ({ open, onClose }) => {
  const store = useQuartzStore();

  if (!open) return null;

  return (
    <>
      <div className="fixed inset-0 z-40" onClick={onClose} />
      <div className="fixed right-0 top-0 bottom-0 z-50 w-[340px] max-w-full border-l border-border flex flex-col"
        style={{ backgroundColor: 'rgba(14,14,14,0.95)', backdropFilter: 'blur(20px)' }}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <span className="text-sm font-medium text-foreground">Edit Code</span>
          <button onClick={onClose} className="text-muted-foreground hover:text-foreground transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>
        <textarea
          value={store.code}
          onChange={(e) => {
            store.setCode(e.target.value);
            const lang = detectLanguage(e.target.value);
            store.setLanguage(lang);
          }}
          className="flex-1 w-full bg-transparent text-foreground font-code text-sm p-4 outline-none resize-none"
          style={{ lineHeight: 1.65 }}
          spellCheck={false}
          placeholder="Paste your code here..."
        />
      </div>
    </>
  );
};

export default CodeDrawer;
