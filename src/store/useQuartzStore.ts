import { create } from 'zustand';
import { gradientPresets } from '@/lib/themes';

interface QuartzState {
  code: string;
  language: string;
  themeIndex: number;
  fontSize: number;
  padding: number;
  borderRadius: number;
  lineHeight: number;
  showLineNumbers: boolean;
  showWindowChrome: boolean;
  showShadow: boolean;
  backgroundStyle: string;
  platformIndex: number;
  filename: string;
  customWidth: number;
  customHeight: number;
  fontIndex: number;
  cardWidthIndex: number;
  showWatermark: boolean;
  cardStyle: string;
  setCode: (code: string) => void;
  setLanguage: (lang: string) => void;
  setThemeIndex: (i: number) => void;
  setFontSize: (v: number) => void;
  setPadding: (v: number) => void;
  setBorderRadius: (v: number) => void;
  setLineHeight: (v: number) => void;
  toggleLineNumbers: () => void;
  toggleWindowChrome: () => void;
  toggleShadow: () => void;
  setBackgroundStyle: (bg: string) => void;
  setPlatformIndex: (i: number) => void;
  setFilename: (f: string) => void;
  setCustomWidth: (w: number) => void;
  setCustomHeight: (h: number) => void;
  setFontIndex: (i: number) => void;
  setCardWidthIndex: (i: number) => void;
  toggleWatermark: () => void;
  setCardStyle: (style: string) => void;
}

const defaultCode = `const crystallize = (idea) => {
  const clarity = idea.trim().toLowerCase();
  return \`✦ \${clarity} — made beautiful\`;
};

console.log(crystallize("  Your Code  "));
// ✦ your code — made beautiful`;

export const useQuartzStore = create<QuartzState>((set) => ({
  code: defaultCode,
  language: 'javascript',
  themeIndex: 0,
  fontSize: 13,
  padding: 32,
  borderRadius: 10,
  lineHeight: 1.6,
  showLineNumbers: true,
  showWindowChrome: true,
  showShadow: true,
  backgroundStyle: gradientPresets[0],
  platformIndex: 0,
  filename: 'snippet.js',
  customWidth: 800,
  customHeight: 600,
  fontIndex: 0,
  cardWidthIndex: 1,
  showWatermark: false,
  cardStyle: 'gradient',
  setCode: (code) => set({ code }),
  setLanguage: (language) => set({ language }),
  setThemeIndex: (themeIndex) => set({ themeIndex }),
  setFontSize: (fontSize) => set({ fontSize }),
  setPadding: (padding) => set({ padding }),
  setBorderRadius: (borderRadius) => set({ borderRadius }),
  setLineHeight: (lineHeight) => set({ lineHeight }),
  toggleLineNumbers: () => set((s) => ({ showLineNumbers: !s.showLineNumbers })),
  toggleWindowChrome: () => set((s) => ({ showWindowChrome: !s.showWindowChrome })),
  toggleShadow: () => set((s) => ({ showShadow: !s.showShadow })),
  setBackgroundStyle: (backgroundStyle) => set({ backgroundStyle }),
  setPlatformIndex: (platformIndex) => set({ platformIndex }),
  setFilename: (filename) => set({ filename }),
  setCustomWidth: (customWidth) => set({ customWidth }),
  setCustomHeight: (customHeight) => set({ customHeight }),
  setFontIndex: (fontIndex) => set({ fontIndex }),
  setCardWidthIndex: (cardWidthIndex) => set({ cardWidthIndex }),
  toggleWatermark: () => set((s) => ({ showWatermark: !s.showWatermark })),
  setCardStyle: (cardStyle) => set({ cardStyle }),
}));
