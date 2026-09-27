import http from 'node:http';
import { createReadStream, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const types={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.jpg':'image/jpeg','.png':'image/png','.mp4':'video/mp4'};
http.createServer((req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost');
  let file=path.resolve(root,'.'+decodeURIComponent(url.pathname));
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403);return res.end();}
  if(statSync(file).isDirectory())file=path.join(file,'index.html');
  const size=statSync(file).size;
  res.setHeader('Content-Type',types[path.extname(file)]||'application/octet-stream');
  res.setHeader('Accept-Ranges','bytes');
  const match=/^bytes=(\d+)-(\d*)$/.exec(req.headers.range||'');
  if(match){const start=Number(match[1]);const end=match[2]?Math.min(Number(match[2]),size-1):size-1;if(start>end||start>=size){res.writeHead(416,{'Content-Range':`bytes */${size}`});return res.end();}res.writeHead(206,{'Content-Range':`bytes ${start}-${end}/${size}`,'Content-Length':end-start+1});createReadStream(file,{start,end}).pipe(res);}
  else{res.writeHead(200,{'Content-Length':size});createReadStream(file).pipe(res);}
 }catch{res.writeHead(404,{'Content-Type':'text/plain'});res.end('Page not found');}
}).listen(4173,'127.0.0.1',()=>console.log('NeoNaar preview: http://127.0.0.1:4173'));
