import { build } from 'esbuild';
import { minify } from 'html-minifier-terser';
import { readFile, writeFile, mkdir, cp, rm, rename } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';

await rm('dist', { recursive: true, force: true });
await mkdir('dist/html', { recursive: true });

// JS: junta os módulos ES6 em um arquivo só e minifica
await build({ entryPoints: ['js/main.js'], bundle: true, minify: true, format: 'esm', outfile: 'dist/js/main.min.js' });
// CSS: minifica
await build({ entryPoints: ['css/style.css'], minify: true, outfile: 'dist/css/style.min.css' });

// Coloca um hash do conteúdo no nome do arquivo (cache busting): se o
// conteúdo mudar, o nome muda, e o navegador nunca usa uma versão velha.
async function comHash(caminho) {
  const conteudo = await readFile(caminho);
  const hash = createHash('sha1').update(conteudo).digest('hex').slice(0, 8);
  const novo = caminho.replace('.min.', `.${hash}.`);
  await rename(caminho, novo);
  return novo.split('/').pop();
}
const jsFinal = await comHash('dist/js/main.min.js');
const cssFinal = await comHash('dist/css/style.min.css');

// HTML: aponta para os arquivos com hash e remove espaços/comentários
let html = await readFile('html/index.html', 'utf8');
const antes = html;
html = html
  .replace('href="../css/style.css"', `href="../css/${cssFinal}"`)
  .replace('src="../js/main.js"', `src="../js/${jsFinal}"`);
if (html === antes || html.includes('../js/main.js"') || html.includes('style.css"')) {
  throw new Error('Não consegui apontar o HTML para os arquivos minificados');
}
await writeFile('dist/html/index.html', await minify(html, {
  collapseWhitespace: true, removeComments: true, minifyCSS: true, minifyJS: true
}));

// Imagens: copiadas (já otimizadas em webp/jpg)
await cp('images', 'dist/images', { recursive: true });

// Verificação: todo href/src local do HTML final precisa existir em dist/
const final = await readFile('dist/html/index.html', 'utf8');
const faltando = [...final.matchAll(/(?:href|src)="(\.\.\/[^"]+)"/g)]
  .map((m) => m[1])
  .filter((ref) => !existsSync(resolve(dirname('dist/html/index.html'), ref)));
if (faltando.length) {
  throw new Error('Referências quebradas no HTML de produção: ' + faltando.join(', '));
}
console.log(`Build ok: ${cssFinal}, ${jsFinal}`);
