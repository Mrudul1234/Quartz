import React, { useRef, useEffect, useCallback } from 'react';
import { useQuartzStore } from '@/store/useQuartzStore';
import { themes } from '@/lib/themes';
import { tokenizeLine, getTokenColor, detectLanguage } from '@/lib/highlighter';

interface CodeCardProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

const CodeCard: React.FC<CodeCardProps> = ({ cardRef }) => {
  const store = useQuartzStore();
  const theme = themes[store.themeIndex];
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const codeContainerRef = useRef<HTMLDivElement>(null);

  const lines = store.code.split('\n');

  // Global paste handler
  useEffect(() => {
    const handler = (e: ClipboardEvent) => {
      if (document.activeElement === textareaRef.current) return;
      const text = e.clipboardData?.getData('text');
      if (text) {
        e.preventDefault();
        store.setCode(text);
        const lang = detectLanguage(text);
        store.setLanguage(lang);
      }
    };
    document.addEventListener('paste', handler);
    return () => document.removeEventListener('paste', handler);
  }, [store]);

  const handleCardClick = useCallback(() => {
    textareaRef.current?.focus();
  }, []);

  const handleCodeChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    store.setCode(e.target.value);
  };

  // Sync scroll between textarea and rendered code
  const handleScroll = useCallback(() => {
    if (textareaRef.current && codeContainerRef.current) {
      codeContainerRef.current.scrollTop = textareaRef.current.scrollTop;
      codeContainerRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  }, []);

  const lineNumberWidth = `${Math.max(2, String(lines.length).length) * 0.7}em`;

  return (
    <div
      ref={cardRef}
      style={{
        background: store.backgroundStyle,
        padding: `${store.padding}px`,
        borderRadius: `${store.borderRadius}px`,
        boxShadow: store.showShadow ? '0 25px 50px -12px rgba(0,0,0,0.6), 0 0 100px -20px rgba(0,0,0,0.3)' : 'none',
      }}
      className="relative"
    >
      <div
        style={{
          background: theme.bg,
          borderRadius: `${Math.max(store.borderRadius - 4, 0)}px`,
          overflow: 'hidden',
        }}
      >
        {/* Window Chrome */}
        {store.showWindowChrome && (
          <div
            style={{ background: theme.header }}
            className="flex items-center gap-2 px-4 py-3"
          >
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full" style={{ background: theme.dots[0] }} />
              <div className="w-3 h-3 rounded-full" style={{ background: theme.dots[1] }} />
              <div className="w-3 h-3 rounded-full" style={{ background: theme.dots[2] }} />
            </div>
            <input
              value={store.filename}
              onChange={(e) => store.setFilename(e.target.value)}
              className="bg-transparent text-xs font-code ml-2 outline-none border-none"
              style={{ color: theme.comment }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Code Area */}
        <div
          className="relative"
          style={{ padding: '16px 0' }}
        >
          {/* Rendered code overlay */}
          <div
            ref={codeContainerRef}
            className="font-code select-none pointer-events-none overflow-hidden"
            style={{ fontSize: `${store.fontSize}px`, lineHeight: store.lineHeight }}
          >
            {lines.map((line, i) => (
              <div key={i} className="flex px-4" style={{ minHeight: `${store.fontSize * store.lineHeight}px` }}>
                {store.showLineNumbers && (
                  <span
                    className="select-none text-right mr-4 shrink-0"
                    style={{ color: theme.comment, opacity: 0.5, width: lineNumberWidth }}
                  >
                    {i + 1}
                  </span>
                )}
                <span className="whitespace-pre">
                  {tokenizeLine(line, store.language).map((token, j) => (
                    <span key={j} style={{ color: getTokenColor(token.type, theme) }}>
                      {token.text}
                    </span>
                  ))}
                  {line === '' && '\u00A0'}
                </span>
              </div>
            ))}
          </div>

          {/* Editable textarea */}
          <textarea
            ref={textareaRef}
            value={store.code}
            onChange={handleCodeChange}
            onScroll={handleScroll}
            className="absolute inset-0 w-full h-full resize-none font-code p-0 m-0 border-none outline-none"
            style={{
              fontSize: `${store.fontSize}px`,
              lineHeight: store.lineHeight,
              color: 'transparent',
              caretColor: theme.text,
              background: 'transparent',
              paddingLeft: store.showLineNumbers ? `calc(1rem + ${lineNumberWidth} + 1rem)` : '1rem',
              paddingTop: '16px',
              paddingRight: '1rem',
              WebkitTextFillColor: 'transparent',
            }}
            spellCheck={false}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      </div>
    </div>
  );
};

export default CodeCard;
