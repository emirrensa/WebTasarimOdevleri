function textImage(text,bg){
  var w=400,h=500;
  var svg="<svg xmlns='http://www.w3.org/2000/svg' width='"+w+"' height='"+h+"'>"
    +"<rect width='100%' height='100%' fill='"+bg+"'/><g font-family='Arial, sans-serif' fill='#fff'>"
    +"<text x='50%' y='50%' font-size='28' text-anchor='middle'>"+text+"</text></g></svg>";
  return "data:image/svg+xml;utf8,"+encodeURIComponent(svg);
}

const COLORS={ "Tişört":"#ff7a00","Hoodie":"#4444cc","Pantolon":"#0e8f6e","Mont":"#aa2b2b","Sweatshirt":"#6b4f9b","Gömlek":"#2c7be5","Eşofman":"#2aa198","Default":"#333333" };

function imgFor(cat,name){
  return textImage(name, COLORS[cat]||COLORS.Default);
}

const products=[
  {id:1,name:'Oversize Tişört',category:'Tişört',size:['S','M','L'],price:149,img:imgFor('Tişört','Oversize Tişört')},
  {id:2,name:'Klasik Hoodie',category:'Hoodie',size:['M','L','XL'],price:399,img:imgFor('Hoodie','Klasik Hoodie')},
  {id:3,name:'Kot Pantolon',category:'Pantolon',size:['30','31','32'],price:549,img:imgFor('Pantolon','Kot Pantolon')},
  {id:4,name:'Mom Jean',category:'Pantolon',size:['34','36'],price:599,img:imgFor('Pantolon','Mom Jean')},
  {id:5,name:'Şişme Mont',category:'Mont',size:['S','M','L'],price:1299,img:imgFor('Mont','Şişme Mont')},
  {id:6,name:'Sweatshirt',category:'Sweatshirt',size:['M','L'],price:329,img:imgFor('Sweatshirt','Sweatshirt')},
  {id:7,name:'Klasik Gömlek',category:'Gömlek',size:['S','M','L','XL'],price:459,img:imgFor('Gömlek','Klasik Gömlek')},
  {id:8,name:'Eşofman Altı',category:'Eşofman',size:['S','M','L','XL'],price:299,img:imgFor('Eşofman','Eşofman Altı')}
];

const state={q:'',categories:new Set(),sizes:new Set(),minPrice:'',maxPrice:'',sort:'reco'};
const grid=document.getElementById('grid');
const empty=document.getElementById('empty');
const catList=document.getElementById('catList');
const sizeList=document.getElementById('sizeList');
const minPrice=document.getElementById('minPrice');
const maxPrice=document.getElementById('maxPrice');
const sortSel=document.getElementById('sortSel');

function setupFilters(){
  const cats=[...new Set(products.map(p=>p.category))];
  catList.innerHTML=cats.map(c=>`<label><input type="checkbox" value="${c}" class="cat"> ${c}</label>`).join('');
  const sizes=[...new Set(products.flatMap(p=>p.size))];
  sizeList.innerHTML=sizes.map(s=>`<label><input type="checkbox" value="${s}" class="size"> ${s}</label>`).join('');
  catList.querySelectorAll('.cat').forEach(cb=>cb.addEventListener('change',e=>{if(e.target.checked)state.categories.add(e.target.value);else state.categories.delete(e.target.value);render();}));
  sizeList.querySelectorAll('.size').forEach(cb=>cb.addEventListener('change',e=>{if(e.target.checked)state.sizes.add(e.target.value);else state.sizes.delete(e.target.value);render();}));
  document.getElementById('applyPrice').addEventListener('click',()=>{state.minPrice=minPrice.value;state.maxPrice=maxPrice.value;render();});
  document.getElementById('clearPrice').addEventListener('click',()=>{minPrice.value='';maxPrice.value='';state.minPrice='';state.maxPrice='';render();});
  document.getElementById('clearAll').addEventListener('click',()=>{state.q='';state.categories.clear();state.sizes.clear();state.minPrice='';state.maxPrice='';sortSel.value='reco';document.getElementById('q').value='';catList.querySelectorAll('input').forEach(i=>i.checked=false);sizeList.querySelectorAll('input').forEach(i=>i.checked=false);minPrice.value='';maxPrice.value='';render();});
  sortSel.addEventListener('change',()=>{state.sort=sortSel.value;render();});
}

function card(p){
  return `<article class="card">
    <div class="thumb"><img src="${p.img}" alt="${p.name}"></div>
    <div class="info">
      <h4 class="title">${p.name}</h4>
      <div class="meta">
        <span class="pill">${p.category}</span>
        <span class="price">₺${p.price}</span>
      </div>
    </div>
  </article>`;
}

function matches(p){
  const qok=state.q.trim().length===0||p.name.toLowerCase().includes(state.q)||p.category.toLowerCase().includes(state.q);
  const catok=state.categories.size===0||state.categories.has(p.category);
  const sizeok=state.sizes.size===0||p.size.some(s=>state.sizes.has(s));
  const minok=state.minPrice===''||p.price>=Number(state.minPrice);
  const maxok=state.maxPrice===''||p.price<=Number(state.maxPrice);
  return qok&&catok&&sizeok&&minok&&maxok;
}

function sortList(list){
  if(state.sort==='priceAsc')return list.sort((a,b)=>a.price-b.price);
  if(state.sort==='priceDesc')return list.sort((a,b)=>b.price-a.price);
  if(state.sort==='nameAsc')return list.sort((a,b)=>a.name.localeCompare(b.name));
  return list;
}

function render(){
  const filtered=products.filter(matches);
  const sorted=sortList(filtered.slice());
  grid.innerHTML=sorted.map(card).join('');
  empty.hidden=sorted.length!==0;
}

function setupSearch(){
  const qInput=document.getElementById('q');
  document.getElementById('searchForm').addEventListener('submit',e=>{
    e.preventDefault();
    state.q=qInput.value.trim().toLowerCase();
    render();
  });
}

setupFilters();
setupSearch();
render();
