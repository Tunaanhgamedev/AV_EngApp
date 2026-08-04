import React from 'react';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  if (!content) return null;

  const lines = content.split('\n');
  const blocks: React.ReactNode[] = [];
  let currentTable: string[][] = [];
  let currentList: { type: 'bullet' | 'ordered'; items: string[] } | null = null;

  const flushTable = (key: number) => {
    if (currentTable.length === 0) return null;
    const header = currentTable[0];
    const rows = currentTable.slice(2); // row 1 is separator |---|---|
    currentTable = [];
    return (
      <div key={`table-${key}`} className="overflow-x-auto my-3 rounded-xl border border-slate-200 dark:border-slate-700 shadow-sm max-w-full">
        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700 text-xs">
          <thead className="bg-slate-50 dark:bg-slate-800 font-bold text-slate-700 dark:text-slate-300">
            <tr>
              {header.map((col, idx) => (
                <th key={idx} className="px-3 py-2 text-left font-semibold border-r last:border-r-0 border-slate-200 dark:border-slate-700">
                  {parseInline(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className="hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors">
                {row.map((col, cIdx) => (
                  <td key={cIdx} className="px-3 py-2 border-r last:border-r-0 border-slate-200 dark:border-slate-700 whitespace-pre-line">
                    {parseInline(col || '')}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const flushList = (key: number) => {
    if (!currentList) return null;
    const list = currentList;
    currentList = null;
    const Tag = list.type === 'ordered' ? 'ol' : 'ul';
    const listClass = list.type === 'ordered' ? 'list-decimal pl-5 my-2 space-y-1' : 'list-disc pl-5 my-2 space-y-1';
    return (
      <Tag key={`list-${key}`} className={listClass}>
        {list.items.map((item, idx) => (
          <li key={idx} className="text-xs text-slate-700 dark:text-slate-300">{parseInline(item)}</li>
        ))}
      </Tag>
    );
  };

  function parseInline(text: string): React.ReactNode {
    let currentText = text.trim();
    const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
    const tokens = currentText.split(regex);
    
    return tokens.map((token, idx) => {
      if (token.startsWith('**') && token.endsWith('**')) {
        return <strong key={idx} className="font-bold text-slate-900 dark:text-slate-100">{token.slice(2, -2)}</strong>;
      }
      if (token.startsWith('*') && token.endsWith('*')) {
        return <em key={idx} className="italic text-slate-800 dark:text-slate-200">{token.slice(1, -1)}</em>;
      }
      if (token.startsWith('`') && token.endsWith('`')) {
        return <code key={idx} className="bg-slate-100 dark:bg-slate-800 text-red-600 dark:text-red-400 font-mono px-1 py-0.5 rounded text-[11px] font-semibold">{token.slice(1, -1)}</code>;
      }
      return token;
    });
  }

  let blockKey = 0;
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();

    // 1. Table handling
    if (line.startsWith('|') && line.endsWith('|')) {
      if (currentList) {
        blocks.push(flushList(blockKey++));
      }
      const cells = line.split('|').slice(1, -1).map(c => c.trim());
      currentTable.push(cells);
      continue;
    } else if (currentTable.length > 0) {
      blocks.push(flushTable(blockKey++));
    }

    // 2. List handling
    const bulletMatch = line.match(/^[-*]\s+(.*)/);
    const orderedMatch = line.match(/^(\d+)\.\s+(.*)/);
    if (bulletMatch) {
      if (currentTable.length > 0) blocks.push(flushTable(blockKey++));
      if (!currentList || currentList.type !== 'bullet') {
        if (currentList) blocks.push(flushList(blockKey++));
        currentList = { type: 'bullet', items: [] };
      }
      currentList.items.push(bulletMatch[1]);
      continue;
    } else if (orderedMatch) {
      if (currentTable.length > 0) blocks.push(flushTable(blockKey++));
      if (!currentList || currentList.type !== 'ordered') {
        if (currentList) blocks.push(flushList(blockKey++));
        currentList = { type: 'ordered', items: [] };
      }
      currentList.items.push(orderedMatch[2]);
      continue;
    } else if (currentList) {
      blocks.push(flushList(blockKey++));
    }

    if (line === '') {
      continue;
    }

    // 3. Headers
    if (line.startsWith('#')) {
      const level = line.match(/^#+/)?.[0].length || 1;
      const text = line.replace(/^#+\s*/, '');
      const headerClasses = 
        level === 1 ? "text-base font-extrabold text-slate-900 dark:text-slate-100 mt-4 mb-2" :
        level === 2 ? "text-sm font-bold text-slate-800 dark:text-slate-200 mt-3 mb-2" :
        "text-xs font-bold text-slate-800 dark:text-slate-200 mt-2 mb-1";
      blocks.push(
        React.createElement(`h${Math.min(level, 6)}`, { key: blockKey++, className: headerClasses }, parseInline(text))
      );
      continue;
    }

    // 4. Regular Paragraphs
    blocks.push(
      <p key={blockKey++} className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed mb-2">
        {parseInline(line)}
      </p>
    );
  }

  if (currentTable.length > 0) {
    blocks.push(flushTable(blockKey++));
  }
  if (currentList) {
    blocks.push(flushList(blockKey++));
  }

  return <div className="space-y-1">{blocks}</div>;
}
