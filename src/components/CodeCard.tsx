import React, { useRef, useCallback } from 'react';
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
  React.useEffect(() => {
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

  const cardStyleClass = `preset-${store.cardStyle}`;

  return (
    <div
      ref={cardRef}
      className={`code-card card-frame ${cardStyleClass}`}
      onClick={handleCardClick}
      style={{
        background: store.backgroundStyle,
        padding: `${store.padding}px`,
        borderRadius: `${store.borderRadius}px`,
        width: cardWidth.width,
        maxWidth: '100%',
        overflow: 'hidden',
      }}
    >
      <div
        className="vscode-win"
        style={{
          background: theme.bg,
          borderRadius: `${Math.max(store.borderRadius - 4, 0)}px`,
          overflow: 'hidden',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Window Chrome */}
        {store.showWindowChrome && (
          <div className="vscode-header">
            <div className="flex gap-2">
              <div className="w-[13px] h-[13px] rounded-full" style={{ background: '#ff5f57' }} />
              <div className="w-[13px] h-[13px] rounded-full" style={{ background: '#febc2e' }} />
              <div className="w-[13px] h-[13px] rounded-full" style={{ background: '#28c840' }} />
            </div>
            <input
              value={store.filename}
              onChange={(e) => store.setFilename(e.target.value)}
              className={`bg-transparent text-[13px] ${font.className} ml-2 outline-none border-none filename-tab`}
              style={{ color: 'rgba(255,255,255,0.50)', fontWeight: 500 }}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}

        {/* Code Area */}
        <div className="vscode-body relative" style={{ padding: '18px 28px 22px 18px', minHeight: '280px', minWidth: '380px' }}>
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

          <div
            ref={codeContainerRef}
            className={`${font.className} select-none pointer-events-none`}
            style={{ fontSize: `${store.fontSize}px`, lineHeight: store.lineHeight, overflow: 'visible' }}
          >
            {lines.map((line, i) => (
              <div key={i} className="flex" style={{ minHeight: `${store.fontSize * store.lineHeight}px` }}>
                {store.showLineNumbers && (
                  <span
                    className="line-number select-none text-right mr-4 shrink-0"
                    style={{ width: lineNumberWidth }}
                  >
                    {i + 1}
                  </span>
                )}
                <code style={{ display: 'inline', whiteSpace: 'pre', overflow: 'visible', maxWidth: 'none', width: 'max-content', paddingRight: '24px' }}>
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

          {store.showWatermark && (
            <div
              className="font-toolbar-btn text-right mt-2"
              style={{ color: 'rgba(255,255,255,0.3)', fontSize: '11px' }}
            >
              Made with ◈ Quartz
            </div>
          )}

          <textarea
            ref={textareaRef}
            value={store.code}
            onChange={handleCodeChange}
            onScroll={handleScroll}
            className={`code-textarea absolute inset-0 w-full h-full resize-none ${font.className} p-0 m-0 border-none outline-none`}
            style={{
              fontSize: `${store.fontSize}px`,
              lineHeight: store.lineHeight,
              color: 'transparent',
              caretColor: theme.text,
              background: 'transparent',
              paddingLeft: store.showLineNumbers ? `calc(${lineNumberWidth} + 1rem + 18px)` : '18px',
              paddingTop: '18px',
              paddingRight: '28px',
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
