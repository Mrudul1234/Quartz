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
  // Original 20
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

  // 15 existing new themes
  { name: "Cobalt2", bg: "#193549", header: "#122738", text: "#ffffff", comment: "#0088ff", kw: "#ffc600", fn: "#ffc600", str: "#a5ff90", num: "#ff628c", type: "#80ffbb", prop: "#9effff", op: "#e1efff", tag: "#ffc600", dots: ["#ff5f57", "#febc2e", "#28c840"] },
  { name: "Shades of Purple", bg: "#2d2b55", header: "#1e1d40", text: "#e0def4", comment: "#b362ff", kw: "#ff628c", fn: "#fad000", str: "#a5ff90", num: "#ff9d00", type: "#80ffbb", prop: "#9effff", op: "#ff9d00", tag: "#ff628c", dots: ["#ff5f57", "#febc2e", "#28c840"] },
  { name: "Palenight", bg: "#292d3e", header: "#222633", text: "#a6accd", comment: "#676e95", kw: "#c792ea", fn: "#82aaff", str: "#c3e88d", num: "#f78c6c", type: "#ffcb6b", prop: "#a6accd", op: "#89ddff", tag: "#f07178", dots: ["#ff5370", "#ffcb6b", "#c3e88d"] },
  { name: "Andromeda", bg: "#23262e", header: "#1e2027", text: "#d5ced9", comment: "#7a7a7a", kw: "#c74ded", fn: "#00e8c6", str: "#ffe66d", num: "#f39c12", type: "#00e8c6", prop: "#d5ced9", op: "#ee5d43", tag: "#c74ded", dots: ["#ff5f57", "#febc2e", "#28c840"] },
  { name: "Bearded Arc", bg: "#1c2433", header: "#161d2b", text: "#c3cfd9", comment: "#6a7a8b", kw: "#f59762", fn: "#69c3ff", str: "#98d982", num: "#e2a56e", type: "#efb993", prop: "#c3cfd9", op: "#f59762", tag: "#69c3ff", dots: ["#ff5f57", "#febc2e", "#28c840"] },
  { name: "Moonlight", bg: "#222436", header: "#1b1d2e", text: "#c8d3f5", comment: "#7a88cf", kw: "#c099ff", fn: "#82aaff", str: "#c3e88d", num: "#ff966c", type: "#ffc777", prop: "#c8d3f5", op: "#86e1fc", tag: "#c099ff", dots: ["#ff757f", "#ffc777", "#c3e88d"] },
  { name: "Everforest Dark", bg: "#2d353b", header: "#272e33", text: "#d3c6aa", comment: "#859289", kw: "#e67e80", fn: "#a7c080", str: "#dbbc7f", num: "#d699b6", type: "#7fbbb3", prop: "#d3c6aa", op: "#e67e80", tag: "#e67e80", dots: ["#e67e80", "#dbbc7f", "#a7c080"] },
  { name: "Ayu Mirage", bg: "#1f2430", header: "#1a1e29", text: "#cbccc6", comment: "#5c6773", kw: "#ffa759", fn: "#ffd580", str: "#bae67e", num: "#dfbfff", type: "#73d0ff", prop: "#cbccc6", op: "#f29e74", tag: "#73d0ff", dots: ["#ff3333", "#ff9940", "#bae67e"] },
  { name: "Catppuccin Mocha", bg: "#1e1e2e", header: "#181825", text: "#cdd6f4", comment: "#585b70", kw: "#cba6f7", fn: "#89b4fa", str: "#a6e3a1", num: "#fab387", type: "#f5c2e7", prop: "#f2cdcd", op: "#94e2d5", tag: "#f38ba8", dots: ["#f38ba8", "#f9e2af", "#a6e3a1"] },
  { name: "Catppuccin Latte", bg: "#eff1f5", header: "#e6e9ef", text: "#4c4f69", comment: "#9ca0b0", kw: "#8839ef", fn: "#1e66f5", str: "#40a02b", num: "#fe640b", type: "#ea76cb", prop: "#4c4f69", op: "#179299", tag: "#d20f39", dots: ["#d20f39", "#df8e1d", "#40a02b"] },
  { name: "Dracula Soft", bg: "#282a36", header: "#21222c", text: "#e8e8e2", comment: "#7970a9", kw: "#f286c4", fn: "#62e884", str: "#e7ee98", num: "#bf9eee", type: "#97e1f1", prop: "#e8e8e2", op: "#f286c4", tag: "#f286c4", dots: ["#ff6e6e", "#f1fa8c", "#62e884"] },
  { name: "Plastic", bg: "#21252b", header: "#1b1f23", text: "#a9b2c3", comment: "#5f6672", kw: "#d55fde", fn: "#61afef", str: "#98c379", num: "#d19a66", type: "#e5c07b", prop: "#e06c75", op: "#56b6c2", tag: "#e06c75", dots: ["#ff5f57", "#febc2e", "#28c840"] },
  { name: "Quiet Light", bg: "#f5f5f5", header: "#eaeaea", text: "#333333", comment: "#aaaaaa", kw: "#4b69c6", fn: "#aa3731", str: "#448c27", num: "#9c5d27", type: "#7a3e9d", prop: "#333333", op: "#777777", tag: "#4b69c6", dots: ["#ff5f57", "#febc2e", "#28c840"] },
  { name: "Solarized Light", bg: "#fdf6e3", header: "#eee8d5", text: "#657b83", comment: "#93a1a1", kw: "#859900", fn: "#268bd2", str: "#2aa198", num: "#d33682", type: "#b58900", prop: "#657b83", op: "#859900", tag: "#268bd2", dots: ["#dc322f", "#b58900", "#859900"] },
  { name: "Houston", bg: "#17191e", header: "#111316", text: "#c0cad8", comment: "#4b5263", kw: "#00d5a9", fn: "#5ccfe6", str: "#bae67e", num: "#f29e74", type: "#ffd580", prop: "#c0cad8", op: "#00d5a9", tag: "#5ccfe6", dots: ["#ef5350", "#ffd580", "#bae67e"] },

  // 15 additional themes
  { name: "Vitesse Dark", bg: "#121212", header: "#1a1a1a", text: "#dbd7ca", comment: "#758575", kw: "#4d9375", fn: "#80a665", str: "#c98a7d", num: "#4c9a91", type: "#5da994", prop: "#b8a965", op: "#cb7676", tag: "#4d9375", dots: ["#cb7676", "#c98a7d", "#4d9375"] },
  { name: "Vitesse Light", bg: "#ffffff", header: "#f5f5f5", text: "#393a34", comment: "#a0ada0", kw: "#1e754f", fn: "#59873a", str: "#b56959", num: "#2f798a", type: "#2e8f82", prop: "#998418", op: "#ab5959", tag: "#1e754f", dots: ["#ab5959", "#998418", "#1e754f"] },
  { name: "Min Dark", bg: "#1f1f1f", header: "#171717", text: "#b4b4b4", comment: "#546e7a", kw: "#ff6d12", fn: "#ffb62c", str: "#a5c261", num: "#ff9cac", type: "#c792ea", prop: "#b4b4b4", op: "#ff6d12", tag: "#80cbc4", dots: ["#ff5f57", "#febc2e", "#28c840"] },
  { name: "Slack Dark", bg: "#222222", header: "#1a1a1a", text: "#e8e8e8", comment: "#666666", kw: "#e6db74", fn: "#80cbc4", str: "#a5c261", num: "#ae81ff", type: "#66d9ef", prop: "#e8e8e8", op: "#f92672", tag: "#e6db74", dots: ["#ff5f57", "#febc2e", "#28c840"] },
  { name: "Laserwave", bg: "#27212e", header: "#1e1926", text: "#ffffff", comment: "#6b6477", kw: "#40b4c4", fn: "#eb64b9", str: "#b4dce7", num: "#f29668", type: "#ffe261", prop: "#ffffff", op: "#40b4c4", tag: "#eb64b9", dots: ["#eb64b9", "#ffe261", "#40b4c4"] },
  { name: "Bluloco Dark", bg: "#282c34", header: "#21252b", text: "#abb2bf", comment: "#636d83", kw: "#10b1fe", fn: "#3fc56b", str: "#f9c859", num: "#ff78f8", type: "#9f7efe", prop: "#ce9887", op: "#ff6480", tag: "#10b1fe", dots: ["#ff6480", "#f9c859", "#3fc56b"] },
  { name: "Bluloco Light", bg: "#f9f9f9", header: "#eeeeee", text: "#383a42", comment: "#a0a1a7", kw: "#0098dd", fn: "#23974a", str: "#c5a332", num: "#ce33c0", type: "#7a3e9d", prop: "#a05a48", op: "#d52753", tag: "#0098dd", dots: ["#d52753", "#c5a332", "#23974a"] },
  { name: "Atom One Light", bg: "#fafafa", header: "#f0f0f0", text: "#383a42", comment: "#a0a1a7", kw: "#a626a4", fn: "#4078f2", str: "#50a14f", num: "#986801", type: "#c18401", prop: "#e45649", op: "#0184bc", tag: "#e45649", dots: ["#e45649", "#c18401", "#50a14f"] },
  { name: "Panda", bg: "#292a2b", header: "#232425", text: "#e6e6e6", comment: "#676b79", kw: "#ff75b5", fn: "#6fc1ff", str: "#19f9d8", num: "#ffb86c", type: "#ff9ac1", prop: "#e6e6e6", op: "#ff2c6d", tag: "#ff75b5", dots: ["#ff2c6d", "#ffb86c", "#19f9d8"] },
  { name: "Snazzy", bg: "#282a36", header: "#21222c", text: "#eff0eb", comment: "#78787e", kw: "#ff6ac1", fn: "#5af78e", str: "#f3f99d", num: "#9aedfe", type: "#ff5c57", prop: "#eff0eb", op: "#ff6ac1", tag: "#ff5c57", dots: ["#ff5c57", "#f3f99d", "#5af78e"] },
  { name: "Winter is Coming", bg: "#011627", header: "#0b2942", text: "#d6deeb", comment: "#999999", kw: "#c792ea", fn: "#87e22e", str: "#addb67", num: "#f78c6c", type: "#ffcb8b", prop: "#7fdbca", op: "#c792ea", tag: "#7fdbca", dots: ["#ef5350", "#ffca28", "#9ccc65"] },
  { name: "Monokai Pro", bg: "#2d2a2e", header: "#252226", text: "#fcfcfa", comment: "#727072", kw: "#ff6188", fn: "#a9dc76", str: "#ffd866", num: "#ab9df2", type: "#78dce8", prop: "#fcfcfa", op: "#ff6188", tag: "#ff6188", dots: ["#ff6188", "#ffd866", "#a9dc76"] },
  { name: "Aurora", bg: "#07090f", header: "#0d1117", text: "#bcc5d0", comment: "#4c566a", kw: "#86e1fc", fn: "#82aaff", str: "#c3e88d", num: "#ffc777", type: "#c099ff", prop: "#bcc5d0", op: "#86e1fc", tag: "#c099ff", dots: ["#ff757f", "#ffc777", "#c3e88d"] },
  { name: "Noctis", bg: "#1b2932", header: "#152028", text: "#c5cdd3", comment: "#5b858b", kw: "#d19a66", fn: "#49e9a6", str: "#16b673", num: "#7060eb", type: "#e4b781", prop: "#c5cdd3", op: "#ec5f67", tag: "#d19a66", dots: ["#ec5f67", "#e4b781", "#49e9a6"] },
  { name: "Remedy Dark", bg: "#1c1c1c", header: "#161616", text: "#c5c8c6", comment: "#969896", kw: "#b294bb", fn: "#81a2be", str: "#b5bd68", num: "#de935f", type: "#8abeb7", prop: "#cc6666", op: "#b294bb", tag: "#cc6666", dots: ["#cc6666", "#f0c674", "#b5bd68"] },
];

export const gradientPresets = [
  "linear-gradient(135deg, #1a0533, #2d1b69)",
  "linear-gradient(135deg, #1a1a2e, #16213e)",
  "linear-gradient(135deg, #0f0c29, #302b63)",
  "linear-gradient(135deg, #11998e, #38ef7d)",
  "linear-gradient(135deg, #fc4a1a, #f7b733)",
  "linear-gradient(135deg, #c94b4b, #4b134f)",
  "linear-gradient(135deg, #005c97, #363795)",
  "linear-gradient(135deg, #ee0979, #ff6a00)",
  "linear-gradient(135deg, #f953c6, #b91d73)",
  "linear-gradient(135deg, #00b4db, #0083b0)",
  "linear-gradient(135deg, #654ea3, #eaafc8)",
  "linear-gradient(135deg, #2193b0, #6dd5ed)",
  "#0a0a0a",
  "#1a1a2e",
  "#ffffff",
  "transparent",
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

export const codeFonts = [
  { name: "JetBrains Mono", className: "font-jetbrains" },
  { name: "Fira Code", className: "font-fira" },
  { name: "Source Code Pro", className: "font-source" },
  { name: "Inconsolata", className: "font-inconsolata" },
];

export const cardWidthPresets = [
  { name: "Narrow", width: 480 },
  { name: "Default", width: 680 },
  { name: "Wide", width: 860 },
  { name: "XL", width: 1060 },
];

export const extMap: Record<string, string> = {
  js: 'javascript', ts: 'typescript', tsx: 'typescript', jsx: 'javascript',
  py: 'python', rs: 'rust', go: 'go', java: 'java', cpp: 'cpp', c: 'c',
  cs: 'c', rb: 'python', php: 'javascript', swift: 'javascript',
  kt: 'java', sh: 'python', html: 'html', css: 'css', json: 'javascript', md: 'javascript',
};

export const langExtMap: Record<string, string> = {
  javascript: 'js', typescript: 'ts', python: 'py', rust: 'rs',
  go: 'go', java: 'java', cpp: 'cpp', c: 'c', html: 'html', css: 'css',
};
