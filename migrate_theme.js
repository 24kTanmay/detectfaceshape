const fs = require('fs');

const files = [
  'app/page.js',
  'app/results/page.js',
  'components/AnalyzingScreen.jsx',
  'components/CanvasOverlay.jsx',
  'components/HairstyleSection.jsx',
  'components/MetricCard.jsx',
  'components/ShareCard.jsx',
  'components/UploadZone.jsx'
];

const replacements = [
  { from: /bg-slate-950(?![\/\-])/g, to: 'bg-slate-50 dark:bg-slate-950' },
  { from: /bg-slate-900(?![\/\-])/g, to: 'bg-white dark:bg-slate-900' },
  { from: /bg-slate-800(?![\/\-])/g, to: 'bg-slate-100 dark:bg-slate-800' },
  
  { from: /bg-slate-950\/(\d+)/g, to: 'bg-slate-50/$1 dark:bg-slate-950/$1' },
  { from: /bg-slate-900\/(\d+)/g, to: 'bg-white/$1 dark:bg-slate-900/$1' },
  { from: /bg-slate-800\/(\d+)/g, to: 'bg-slate-100/$1 dark:bg-slate-800/$1' },

  { from: /text-slate-100/g, to: 'text-slate-900 dark:text-slate-100' },
  { from: /text-slate-200/g, to: 'text-slate-800 dark:text-slate-200' },
  { from: /text-slate-300/g, to: 'text-slate-700 dark:text-slate-300' },
  { from: /text-slate-400/g, to: 'text-slate-600 dark:text-slate-400' },
  
  { from: /text-white/g, to: 'text-slate-900 dark:text-white' },

  { from: /border-slate-900(?![\/\-])/g, to: 'border-slate-200 dark:border-slate-900' },
  { from: /border-slate-800(?![\/\-])/g, to: 'border-slate-300 dark:border-slate-800' },
  { from: /border-slate-700(?![\/\-])/g, to: 'border-slate-400 dark:border-slate-700' },
  
  { from: /border-slate-900\/(\d+)/g, to: 'border-slate-200/$1 dark:border-slate-900/$1' },
  { from: /border-slate-800\/(\d+)/g, to: 'border-slate-300/$1 dark:border-slate-800/$1' },
  { from: /border-slate-700\/(\d+)/g, to: 'border-slate-400/$1 dark:border-slate-700/$1' },
  
  { from: /from-slate-950/g, to: 'from-slate-50 dark:from-slate-950' },
  { from: /to-slate-950/g, to: 'to-slate-50 dark:to-slate-950' },
  { from: /via-slate-950/g, to: 'via-slate-50 dark:via-slate-950' },
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    for (const { from, to } of replacements) {
      content = content.replace(from, to);
    }
    fs.writeFileSync(file, content);
  } else {
    console.warn(`File not found: ${file}`);
  }
}
console.log('Migration complete.');
