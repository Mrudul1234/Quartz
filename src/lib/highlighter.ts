import type { Theme } from './themes';

interface Token {
  text: string;
  type: 'comment' | 'string' | 'number' | 'keyword' | 'type' | 'function' | 'property' | 'operator' | 'tag' | 'text';
}

const JS_KEYWORDS = new Set([
  'const', 'let', 'var', 'function', 'return', 'if', 'else', 'for', 'while', 'do',
  'switch', 'case', 'break', 'continue', 'new', 'this', 'class', 'extends', 'import',
  'export', 'default', 'from', 'async', 'await', 'try', 'catch', 'finally', 'throw',
  'typeof', 'instanceof', 'in', 'of', 'yield', 'delete', 'void', 'null', 'undefined',
  'true', 'false', 'super', 'static', 'get', 'set', 'with', 'debugger',
]);

const PY_KEYWORDS = new Set([
  'def', 'class', 'if', 'elif', 'else', 'for', 'while', 'return', 'import', 'from',
  'as', 'try', 'except', 'finally', 'raise', 'with', 'pass', 'break', 'continue',
  'and', 'or', 'not', 'is', 'in', 'lambda', 'yield', 'global', 'nonlocal', 'assert',
  'True', 'False', 'None', 'async', 'await', 'del', 'print',
]);

const RUST_KEYWORDS = new Set([
  'fn', 'let', 'mut', 'const', 'if', 'else', 'match', 'for', 'while', 'loop',
  'return', 'struct', 'enum', 'impl', 'trait', 'pub', 'use', 'mod', 'crate',
  'self', 'super', 'where', 'async', 'await', 'move', 'ref', 'type', 'as',
  'true', 'false', 'Some', 'None', 'Ok', 'Err', 'Self', 'unsafe', 'extern',
]);

const GO_KEYWORDS = new Set([
  'func', 'var', 'const', 'type', 'struct', 'interface', 'map', 'chan', 'go',
  'return', 'if', 'else', 'for', 'range', 'switch', 'case', 'default', 'break',
  'continue', 'package', 'import', 'defer', 'select', 'fallthrough', 'goto',
  'true', 'false', 'nil', 'make', 'new', 'append', 'len', 'cap', 'fmt',
]);

function getKeywords(lang: string): Set<string> {
  switch (lang) {
    case 'python': return PY_KEYWORDS;
    case 'rust': return RUST_KEYWORDS;
    case 'go': return GO_KEYWORDS;
    default: return JS_KEYWORDS;
  }
}

export function tokenizeLine(line: string, lang: string): Token[] {
  const keywords = getKeywords(lang);
  const tokens: Token[] = [];
  let i = 0;

  while (i < line.length) {
    // Line comments
    if ((line[i] === '/' && line[i + 1] === '/') || (line[i] === '#' && (lang === 'python' || lang === 'rust'))) {
      tokens.push({ text: line.slice(i), type: 'comment' });
      return tokens;
    }

    // Strings
    if (line[i] === '"' || line[i] === "'" || line[i] === '`') {
      const quote = line[i];
      let j = i + 1;
      while (j < line.length && line[j] !== quote) {
        if (line[j] === '\\') j++;
        j++;
      }
      tokens.push({ text: line.slice(i, j + 1), type: 'string' });
      i = j + 1;
      continue;
    }

    // Numbers
    if (/\d/.test(line[i]) && (i === 0 || /[\s(,=+\-*/<>!&|^~%[\]{};:]/.test(line[i - 1]))) {
      let j = i;
      while (j < line.length && /[\d.xXbBoOa-fA-F_]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), type: 'number' });
      i = j;
      continue;
    }

    // Words
    if (/[a-zA-Z_$]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[a-zA-Z0-9_$]/.test(line[j])) j++;
      const word = line.slice(i, j);

      // Check if it's a function call
      let rest = line.slice(j);
      const isFnCall = /^\s*\(/.test(rest);
      // Check if preceded by a dot (property)
      const isProp = i > 0 && line[i - 1] === '.';

      if (keywords.has(word)) {
        tokens.push({ text: word, type: 'keyword' });
      } else if (isFnCall) {
        tokens.push({ text: word, type: 'function' });
      } else if (isProp) {
        tokens.push({ text: word, type: 'property' });
      } else if (/^[A-Z]/.test(word)) {
        tokens.push({ text: word, type: 'type' });
      } else {
        tokens.push({ text: word, type: 'text' });
      }
      i = j;
      continue;
    }

    // Operators
    if (/[+\-*/%=<>!&|^~?:]/.test(line[i])) {
      let j = i;
      while (j < line.length && /[+\-*/%=<>!&|^~?:]/.test(line[j])) j++;
      tokens.push({ text: line.slice(i, j), type: 'operator' });
      i = j;
      continue;
    }

    // Other characters
    tokens.push({ text: line[i], type: 'text' });
    i++;
  }

  return tokens;
}

export function getTokenColor(type: Token['type'], theme: Theme): string {
  switch (type) {
    case 'comment': return theme.comment;
    case 'string': return theme.str;
    case 'number': return theme.num;
    case 'keyword': return theme.kw;
    case 'function': return theme.fn;
    case 'property': return theme.prop;
    case 'operator': return theme.op;
    case 'type': return theme.type;
    case 'tag': return theme.tag;
    default: return theme.text;
  }
}

export function detectLanguage(code: string): string {
  if (/\bdef\b.*:/.test(code) || /\bprint\s*\(/.test(code) || /^\s*import\s+\w+\s*$/m.test(code)) return 'python';
  if (/\bfn\b/.test(code) && /\blet\s+mut\b/.test(code)) return 'rust';
  if (/\bfunc\b/.test(code) && /\bpackage\b/.test(code)) return 'go';
  if (/\bfn\b/.test(code) || /->/.test(code) && /\bstruct\b/.test(code)) return 'rust';
  return 'javascript';
}
