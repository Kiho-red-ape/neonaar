import {readFileSync,writeFileSync,existsSync} from 'node:fs';
import path from 'node:path';
export const origin='https://neonaar.com';
export const canonical=route=>origin+(route?'/'+route+(route.endsWith('.html')?'':'/'):'/');
const esc=s=>String(s).replaceAll('&','&amp;').replaceAll('"','&quot;').replaceAll('<','&lt;');
const org={'@type':'Organization','@id':origin+'/#organization',name:'NeoNaar Biotech Private Limited',alternateName:'NeoNaar',url:origin,description:'Indian biomaterials company developing functional cellulose materials from agricultural residues.',logo:origin+'/assets/brand-symbol.png'};
export function seoHead(route,title,description){
 const url=canonical(route),ogTitle=route?title:'NeoNaar | Functional Biomaterials from Agricultural Residues',ogDescription=route?description:'Performance-driven cellulose materials for formulation, rheology, suspension and next-generation material applications.';
 const graph=[org,{'@type':'WebPage','@id':url+'#webpage',url,name:title,description,isPartOf:{'@id':origin+'/#website'},about:{'@id':org['@id']}}];
 graph.push({'@type':'WebSite','@id':origin+'/#website',url:origin,name:'NeoNaar',publisher:{'@id':org['@id']}});
 if(route){const parts=route.split('/');const labels={'products':'Products','applications':'Applications','neocell':'NeoCell','neonilam':'NeoNilam','neocell-pure':'NeoCell PURE','pure':'NeoCell PURE','grow':'NeoCell GROW','base':'NeoNilam BASE','balance':'NeoNilam BALANCE','about':'About NeoNaar','contact':'Contact','microfibrillated-cellulose':'Microfibrillated Cellulose','personal-care':'Personal Care','coatings':'Coatings','packaging':'Packaging','credits.html':'Credits'};const crumbs=[{name:'Home',item:canonical('')}];parts.forEach((p,i)=>{if(p==='applications')return;crumbs.push({name:labels[p]||p,item:canonical(parts.slice(0,i+1).join('/'))})});graph.push({'@type':'BreadcrumbList',itemListElement:crumbs.map((c,i)=>({'@type':'ListItem',position:i+1,...c}))});}
 if(route==='products/neocell-pure')graph.push({'@type':'Product','@id':url+'#product',name:'NeoCell PURE',url,image:origin+'/assets/neocell-pure.png',description,brand:{'@type':'Brand',name:'NeoNaar'},category:'Microfibrillated Cellulose / Functional Cellulose Ingredient',manufacturer:{'@id':org['@id']}});
 return `<link rel="canonical" href="${url}"><meta property="og:type" content="website"><meta property="og:site_name" content="NeoNaar"><meta property="og:title" content="${esc(ogTitle)}"><meta property="og:description" content="${esc(ogDescription)}"><meta property="og:url" content="${url}"><meta property="og:image" content="${origin}/assets/neonaar-social.jpg"><meta property="og:image:width" content="1200"><meta property="og:image:height" content="630"><meta property="og:image:alt" content="NeoNaar — functional biomaterials from agricultural residues"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(ogTitle)}"><meta name="twitter:description" content="${esc(ogDescription)}"><meta name="twitter:image" content="${origin}/assets/neonaar-social.jpg"><script type="application/ld+json">${JSON.stringify({'@context':'https://schema.org','@graph':graph}).replaceAll('<','\\u003c')}</script>`;
}
export function optimizeImages(html,root){
 const file=path.join(root,'scripts/image-manifest.json');if(!existsSync(file))return html;
 const assets=JSON.parse(readFileSync(file,'utf8'));
 return html.replace(/<img\b[^>]*>/g,tag=>{const src=tag.match(/src="([^"]+)"/)?.[1],asset=assets[src];if(!asset)return tag;tag=tag.replace(/\s(?:width|height|srcset|sizes|decoding)="[^"]*"/g,'');return tag.replace(`src="${src}"`,`src="${asset.src}" srcset="${src.includes('kerala-palakkad')?asset.src+' 1200w':asset.srcset}" sizes="${src.includes('kerala-palakkad')?'100vw':'(max-width: 700px) 100vw, 50vw'}" width="${asset.width}" height="${asset.height}" decoding="async"`);});
}
export function writeDiscovery(routes,dist){
 writeFileSync(path.join(dist,'robots.txt'),`User-agent: *\nAllow: /\n\nSitemap: ${origin}/sitemap.xml\n`);
 writeFileSync(path.join(dist,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+routes.map(r=>`<url><loc>${canonical(r)}</loc></url>`).join('')+'</urlset>\n');
}
