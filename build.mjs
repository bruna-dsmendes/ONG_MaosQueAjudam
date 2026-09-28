import { build } from 'esbuild';
import { minify } from 'html-minifier-terser';
import { readFile, writeFile, mkdir, cp, rm } from 'node:fs/promises';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/html', { recursive: true });

// JS: junta os módulos ES6 em um arquivo só e minifica
await build({
  entryPoints: ['js/main.js'], bundle: true, minify: true,
  format: 'esm', outfile: 'dist/js/main.min.js'
});

// CSS: minifica
await build({
  entryPoints: ['css/style.css'], minify: true, outfile: 'dist/css/style.min.css'
});

// HTML: aponta pros arquivos minificados e remove espaços/comentários
let html = await readFile('html/index.html', 'utf8');
html = html.replace('style.css', 'style.min.css').replace('main.js', 'main.min.js');
await writeFile('dist/html/index.html', await minify(html, {
  collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true
}));

// Imagens: copiadas (já otimizadas em webp/jpg)
await cp('images', 'dist/images', { recursive: true });
