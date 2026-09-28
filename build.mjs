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
// troca só os atributos href/src reais (não comentários) e falha se não achar
const antes = html;
html = html
  .replace('href="../css/style.css"', 'href="../css/style.min.css"')
  .replace('src="../js/main.js"', 'src="../js/main.min.js"');
if (html === antes || html.includes('../js/main.js"') || html.includes('style.css"')) {
  throw new Error('Não consegui apontar o HTML para os arquivos minificados');
}
await writeFile('dist/html/index.html', await minify(html, {
  collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true
}));

// Imagens: copiadas (já otimizadas em webp/jpg)
await cp('images', 'dist/images', { recursive: true });

// Verificação: todo href/src local do HTML final precisa existir em dist/
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
const final = await readFile('dist/html/index.html', 'utf8');
const faltando = [...final.matchAll(/(?:href|src)="(\.\.\/[^"]+)"/g)]
  .map((m) => m[1])
  .filter((ref) => !existsSync(resolve(dirname('dist/html/index.html'), ref)));
if (faltando.length) {
  throw new Error('Referências quebradas no HTML de produção: ' + faltando.join(', '));
}
console.log('Build ok: todas as referências locais do HTML existem em dist/');
