import React, { useRef, useEffect, useCallback } from 'react';
import { useQuartzStore } from '@/store/useQuartzStore';
import { themes, codeFonts, cardWidthPresets } from '@/lib/themes';
import { tokenizeLine, getTokenColor, detectLanguage } from '@/lib/highlighter';

interface CodeCardProps {
  cardRef: React.RefObject<HTMLDivElement>;
}

const CodeCard: React.FC<CodeCardProps> = ({ cardRef }) => {
  const store = useQuartzStore();
  const theme = themes[store.themeIndex];
  const font = codeFonts[store.fontIndex];
  const cardWidth = cardWidthPresets[store.cardWidthIndex];
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
      className="code-card card-frame"
      onClick={handleCardClick}
      style={{
        background: store.backgroundStyle,
        padding: `${store.padding}px`,
        borderRadius: `${store.borderRadius}px`,
        width: cardWidth.width,
        minWidth: typeof window !== 'undefined' && window.innerWidth < 768 ? '320px' : '560px',
      }}
    >
      <div
        style={{
          background: theme.bg,
          borderRadius: `${Math.max(store.borderRadius - 4, 0)}px`,
          overflow: 'hidden',
        }}
      >
        {/* Window Chrome — glass header */}
        {store.showWindowChrome && (
          <div className="vscode-header">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-3 h-3 rounded-full" style={{ background: '#28c840' }} />
            </div>
            <input
              value={store.filename}
              onChange={(e) => store.setFilename(e.target.value)}
              className={`bg-transparent text-xs ${font.className} ml-2 outline-none border-none`}
              style={{ color: 'rgba(255,255,255,0.45)', fontWeight: 500, fontSize: '12px' }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Code Area */}
        <div className="relative" style={{ padding: '12px 14px', minHeight: '180px', minWidth: '280px' }}>
          {/* Line number gutter border */}
          {store.showLineNumbers && (
            <div
              className="absolute top-0 bottom-0"
              style={{
                left: `calc(16px + ${lineNumberWidth})`,
                width: '1px',
                background: 'rgba(255,255,255,0.06)',
              }}
            />
          )}

          {/* Rendered code overlay */}
          <div
            ref={codeContainerRef}
            className={`${font.className} select-none pointer-events-none overflow-hidden`}
            style={{ fontSize: `${store.fontSize}px`, lineHeight: store.lineHeight }}
          >
            {lines.map((line, i) => (
              <div key={i} className="flex" style={{ minHeight: `${store.fontSize * store.lineHeight}px` }}>
                {store.showLineNumbers && (
                  <span
                    className="select-none text-right mr-4 shrink-0"
                    style={{ color: 'rgba(255,255,255,0.2)', width: lineNumberWidth }}
                  >
                    {i + 1}
                  </span>
                )}
                <code style={{ display: 'inline', whiteSpace: 'pre' }}>
                  {tokenizeLine(line, store.language).map((token, j) => (
                    <span key={j} style={{ color: getTokenColor(token.type, theme) }}>
                      {token.text}
                    </span>
                  ))}
                  {line === '' && '\u00A0'}
                </code>
              </div>
            ))}
          </div>

          {/* Watermark */}
          {store.showWatermark && (
            <div
              className="font-toolbar-btn text-right mt-2"
              style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}
            >
              Made with ◈ Quartz
            </div>
          )}

          {/* Editable textarea */}
          <textarea
            ref={textareaRef}
            value={store.code}
            onChange={handleCodeChange}
            onScroll={handleScroll}
            className={`absolute inset-0 w-full h-full resize-none ${font.className} p-0 m-0 border-none outline-none`}
            style={{
              fontSize: `${store.fontSize}px`,
              lineHeight: store.lineHeight,
              color: 'transparent',
              caretColor: theme.text,
              background: 'transparent',
              paddingLeft: store.showLineNumbers ? `calc(${lineNumberWidth} + 1rem + 16px)` : '16px',
              paddingTop: '14px',
              paddingRight: '16px',
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