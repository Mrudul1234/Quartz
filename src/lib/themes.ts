export type Theme = {
  name: string;
  bg: string;
  header: string;
  text: string;
  comment: string;
  kw: string;
  fn: string;
  str: string;
  num: string;
  type: string;
  prop: string;
  op: string;
  tag: string;
  dots: [string, string, string];
};

export const themes: Theme[] = [
  { name: "VS Code Dark+", bg: "#1e1e1e", header: "#2d2d2d", text: "#d4d4d4", comment: "#6a9955", kw: "#569cd6", fn: "#dcdcaa", str: "#ce9178", num: "#b5cea8", type: "#4ec9b0", prop: "#9cdcfe", op: "#d4d4d4", tag: "#569cd6", dots: ["#ff5f56", "#ffbd2e", "#27c93f"] },
  { name: "Dracula", bg: "#282a36", header: "#21222c", text: "#f8f8f2", comment: "#6272a4", kw: "#ff79c6", fn: "#50fa7b", str: "#f1fa8c", num: "#bd93f9", type: "#8be9fd", prop: "#f8f8f2", op: "#ff79c6", tag: "#ff79c6", dots: ["#ff5555", "#f1fa8c", "#50fa7b"] },
  { name: "Monokai", bg: "#272822", header: "#1e1f1c", text: "#f8f8f2", comment: "#75715e", kw: "#f92672", fn: "#a6e22e", str: "#e6db74", num: "#ae81ff", type: "#66d9ef", prop: "#f8f8f2", op: "#f92672", tag: "#f92672", dots: ["#ff5f56", "#ffbd2e", "#27c93f"] },
  { name: "One Dark Pro", bg: "#282c34", header: "#21252b", text: "#abb2bf", comment: "#5c6370", kw: "#c678dd", fn: "#61afef", str: "#98c379", num: "#d19a66", type: "#e5c07b", prop: "#e06c75", op: "#56b6c2", tag: "#e06c75", dots: ["#ff5f56", "#ffbd2e", "#27c93f"] },
  { name: "Tokyo Night", bg: "#1a1b26", header: "#16161e", text: "#a9b1d6", comment: "#565f89", kw: "#bb9af7", fn: "#7aa2f7", str: "#9ece6a", num: "#ff9e64", type: "#2ac3de", prop: "#73daca", op: "#89ddff", tag: "#f7768e", dots: ["#f7768e", "#e0af68", "#9ece6a"] },
  { name: "Catppuccin", bg: "#1e1e2e", header: "#181825", text: "#cdd6f4", comment: "#6c7086", kw: "#cba6f7", fn: "#89b4fa", str: "#a6e3a1", num: "#fab387", type: "#89dceb", prop: "#f5c2e7", op: "#94e2d5", tag: "#f38ba8", dots: ["#f38ba8", "#f9e2af", "#a6e3a1"] },
  { name: "Nord", bg: "#2e3440", header: "#272c36", text: "#d8dee9", comment: "#616e88", kw: "#81a1c1", fn: "#88c0d0", str: "#a3be8c", num: "#b48ead", type: "#8fbcbb", prop: "#d8dee9", op: "#81a1c1", tag: "#81a1c1", dots: ["#bf616a", "#ebcb8b", "#a3be8c"] },
  { name: "GitHub Dark", bg: "#0d1117", header: "#161b22", text: "#c9d1d9", comment: "#8b949e", kw: "#ff7b72", fn: "#d2a8ff", str: "#a5d6ff", num: "#79c0ff", type: "#7ee787", prop: "#c9d1d9", op: "#ff7b72", tag: "#7ee787", dots: ["#ff7b72", "#d29922", "#3fb950"] },
  { name: "GitHub Light", bg: "#ffffff", header: "#f6f8fa", text: "#24292f", comment: "#6e7781", kw: "#cf222e", fn: "#8250df", str: "#0a3069", num: "#0550ae", type: "#116329", prop: "#24292f", op: "#cf222e", tag: "#116329", dots: ["#ff5f56", "#ffbd2e", "#27c93f"] },
  { name: "Gruvbox", bg: "#282828", header: "#1d2021", text: "#ebdbb2", comment: "#928374", kw: "#fb4934", fn: "#b8bb26", str: "#b8bb26", num: "#d3869b", type: "#83a598", prop: "#ebdbb2", op: "#fe8019", tag: "#fb4934", dots: ["#fb4934", "#fabd2f", "#b8bb26"] },
  { name: "Solarized Dark", bg: "#002b36", header: "#073642", text: "#839496", comment: "#586e75", kw: "#859900", fn: "#268bd2", str: "#2aa198", num: "#d33682", type: "#b58900", prop: "#93a1a1", op: "#859900", tag: "#268bd2", dots: ["#dc322f", "#b58900", "#859900"] },
  { name: "Night Owl", bg: "#011627", header: "#0b2942", text: "#d6deeb", comment: "#637777", kw: "#c792ea", fn: "#82aaff", str: "#ecc48d", num: "#f78c6c", type: "#ffcb8b", prop: "#7fdbca", op: "#c792ea", tag: "#7fdbca", dots: ["#ef5350", "#ffca28", "#9ccc65"] },
  { name: "Horizon", bg: "#1c1e26", header: "#16171d", text: "#d5d8da", comment: "#6c6f93", kw: "#e95678", fn: "#25b0bc", str: "#fab795", num: "#f09483", type: "#fac29a", prop: "#d5d8da", op: "#e95678", tag: "#e95678", dots: ["#e95678", "#fab795", "#29d398"] },
  { name: "Rosé Pine", bg: "#191724", header: "#1f1d2e", text: "#e0def4", comment: "#6e6a86", kw: "#31748f", fn: "#9ccfd8", str: "#f6c177", num: "#eb6f92", type: "#c4a7e7", prop: "#e0def4", op: "#31748f", tag: "#eb6f92", dots: ["#eb6f92", "#f6c177", "#9ccfd8"] },
  { name: "Kanagawa", bg: "#1f1f28", header: "#16161d", text: "#dcd7ba", comment: "#727169", kw: "#957fb8", fn: "#7e9cd8", str: "#98bb6c", num: "#d27e99", type: "#7aa89f", prop: "#dcd7ba", op: "#ff5d62", tag: "#e82424", dots: ["#e82424", "#e6c384", "#98bb6c"] },
  { name: "Synthwave '84", bg: "#262335", header: "#1e1a2b", text: "#ffffff", comment: "#848bbd", kw: "#fede5d", fn: "#36f9f6", str: "#ff8b39", num: "#f97e72", type: "#fe4450", prop: "#ffffff", op: "#fede5d", tag: "#fe4450", dots: ["#fe4450", "#fede5d", "#72f1b8"] },
  { name: "Poimandres", bg: "#1b1e28", header: "#171922", text: "#a6accd", comment: "#767c9d", kw: "#5de4c7", fn: "#add7ff", str: "#a6da95", num: "#d0679d", type: "#89ddff", prop: "#e4f0fb", op: "#5de4c7", tag: "#5de4c7", dots: ["#d0679d", "#fffac2", "#5de4c7"] },
  { name: "Ayu Dark", bg: "#0a0e14", header: "#0d1117", text: "#bfbdb6", comment: "#acb6bf8c", kw: "#ff8f40", fn: "#ffb454", str: "#aad94c", num: "#d2a6ff", type: "#39bae6", prop: "#bfbdb6", op: "#f29668", tag: "#39bae6", dots: ["#f07178", "#ffb454", "#aad94c"] },
  { name: "Material Ocean", bg: "#0f111a", header: "#1a1c25", text: "#8f93a2", comment: "#464b5d", kw: "#c792ea", fn: "#82aaff", str: "#c3e88d", num: "#f78c6c", type: "#ffcb6b", prop: "#8f93a2", op: "#89ddff", tag: "#f07178", dots: ["#f07178", "#ffcb6b", "#c3e88d"] },
  { name: "Vesper", bg: "#101010", header: "#1a1a1a", text: "#b3b3b3", comment: "#505050", kw: "#ffc799", fn: "#99ffe4", str: "#99ffd5", num: "#ffb399", type: "#ff99cc", prop: "#b3b3b3", op: "#ffc799", tag: "#ff99cc", dots: ["#ff6666", "#ffcc66", "#66ff99"] },
];

export const gradientPresets = [
  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
  "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
  "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
  "linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)",
  "linear-gradient(135deg, #fa709a 0%, #fee140 100%)",
  "linear-gradient(135deg, #a18cd1 0%, #fbc2eb 100%)",
  "linear-gradient(135deg, #fccb90 0%, #d57eeb 100%)",
  "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
];

export const platformPresets = [
  { name: "X / Twitter", width: 1200, height: 675 },
  { name: "LinkedIn", width: 1200, height: 627 },
  { name: "Instagram Square", width: 1080, height: 1080 },
  { name: "Instagram Story", width: 1080, height: 1920 },
  { name: "YouTube Thumbnail", width: 1280, height: 720 },
  { name: "OG Image", width: 1200, height: 630 },
  { name: "Custom", width: 800, height: 600 },
];
