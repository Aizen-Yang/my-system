import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {createRequire} from 'node:module';
import {fileURLToPath} from 'node:url';

// 上传目录 inbox/ 是用户入口；构建时生成文章，不需要用户填写技术元数据。
export function importMarkdown(root) {
  const {parse,stringify}=createRequire(path.join(root,'package.json'))('yaml');
  const input=path.join(root,'inbox');
  const output=path.join(root,'src/content/posts/uploaded');
  if(!fs.existsSync(input)) return 0;
  fs.mkdirSync(output,{recursive:true});
  const config=parse(fs.readFileSync(path.join(root,'site.yaml'),'utf8'));
  let count=0;
  const generated = new Set();
  for(const entry of fs.readdirSync(input,{withFileTypes:true})) {
    if(!entry.isFile()||!entry.name.toLowerCase().endsWith('.md')) continue;
    const name=entry.name.slice(0,-3);
    const raw=fs.readFileSync(path.join(input,entry.name),'utf8').replace(/^\uFEFF/,'');
    const match=raw.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
    const metadata=match?(parse(match[1])??{}):{};
    if(typeof metadata!=='object'||Array.isArray(metadata)) throw new Error(`${entry.name}: 元数据应为对象`);
    const body=match?raw.slice(match[0].length):raw;
    const heading=body.match(/^#\s+(.+)$/m)?.[1];
    const excerpt=body.split(/\r?\n\s*\r?\n/).find(s=>s.trim()&&!s.trim().startsWith('#'))??'';
    let uploadedAt;
    try {
      uploadedAt=execFileSync('git',['log','--follow','--diff-filter=A','--format=%aI','--',`inbox/${entry.name}`],{cwd:root,encoding:'utf8',stdio:['ignore','pipe','ignore']}).trim().split(/\r?\n/).at(-1);
    } catch {}
    const data={...metadata,title:metadata.title??heading??name,
      pubDatetime:metadata.pubDatetime??uploadedAt??fs.statSync(path.join(input,entry.name)).mtime.toISOString(),
      description:metadata.description??(excerpt.replace(/!?\[([^\]]*)\]\([^)]*\)/g,'$1').replace(/[*_\x60>#]/g,'').replace(/\s+/g,' ').trim().slice(0,120)||heading||name),
      author:metadata.author??config.site.author};
    if(data.category&&!config.categories.some(c=>c.id===data.category)) throw new Error(`${entry.name}: 未知分类 ${data.category}`);
    if(!Number.isFinite(new Date(data.pubDatetime).getTime())) throw new Error(`${entry.name}: 发布日期无效`);
    // 文件名使用编码，避免空格、中文和标点影响生成文件名；同名重新上传即更新。
    const filename=encodeURIComponent(name)+'.md';
    generated.add(filename);
    fs.writeFileSync(path.join(output,filename),`---\n${stringify(data)}---\n\n${body}`);
    count++;
  }
  // 这个目录专用于生成文章；删除上传文件后，构建也移除对应生成文件。
  for (const entry of fs.readdirSync(output,{withFileTypes:true})) {
    if (entry.isFile() && entry.name.endsWith('.md') && !generated.has(entry.name)) fs.unlinkSync(path.join(output,entry.name));
  }
  return count;
}

if(process.argv[1]&&path.resolve(process.argv[1])===fileURLToPath(import.meta.url)) {
  console.log(`Imported ${importMarkdown(process.cwd())} Markdown articles.`);
}
