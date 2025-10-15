const videos = [
  {
    title: 'Big Buck Bunny',
    category: 'Animasyon',
    duration: '9:56',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/BigBuckBunny.jpg'
  },
  {
    title: 'Sintel',
    category: 'Kısa Film',
    duration: '14:48',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/Sintel.jpg'
  },
  {
    title: 'Elephants Dream',
    category: 'Kısa Film',
    duration: '10:53',
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
    poster: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/ElephantsDream.jpg'
  }
];

const cats = document.getElementById('cats');
const grid = document.getElementById('grid');
const q = document.getElementById('q');
const empty = document.getElementById('empty');

let state = { cat: 'Tümü', query: '' };
const categories = ['Tümü', ...new Set(videos.map(v => v.category))];

function renderCats(){
  cats.innerHTML='';
  categories.forEach(c=>{
    const b=document.createElement('button');
    b.textContent=c;
    b.className=c===state.cat?'active':'';
    b.onclick=()=>{state.cat=c;renderAll();};
    cats.appendChild(b);
  });
}
function renderGrid(items){
  grid.innerHTML='';
  if(items.length===0){empty.style.display='block';return;} else {empty.style.display='none';}
  items.forEach(v=>{
    const card=document.createElement('div');card.className='card';
    card.onclick=()=>openModal(v);
    card.innerHTML=`<div class='thumb'><img src='${v.poster}' alt='${v.title}'></div>
    <div class='meta'><p class='title'>${v.title}</p><span class='badge'>${v.category} • ${v.duration}</span></div>`;
    grid.appendChild(card);
  });
}
function applyFilters(){
  const qLower=state.query.toLowerCase();
  return videos.filter(v=>(state.cat==='Tümü'||v.category===state.cat)&&v.title.toLowerCase().includes(qLower));
}
function renderAll(){renderCats();renderGrid(applyFilters());}
q.addEventListener('input',e=>{state.query=e.target.value;renderAll();});

const modal=document.getElementById('modal');
const player=document.getElementById('player');
const modalTitle=document.getElementById('modalTitle');
const metaCat=document.getElementById('metaCat');
const metaDur=document.getElementById('metaDur');
const closeBtn=document.getElementById('closeBtn');

function openModal(v){
  modalTitle.textContent=v.title;
  player.src=v.src;
  player.poster=v.poster;
  metaCat.textContent=v.category;
  metaDur.textContent=v.duration;
  modal.classList.add('open');
}
function closeModal(){
  modal.classList.remove('open');
  player.pause();player.removeAttribute('src');player.load();
}
modal.addEventListener('click',e=>{if(e.target===modal)closeModal();});
closeBtn.addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal();});

document.addEventListener('contextmenu', e => e.preventDefault());
document.addEventListener('selectstart', e => e.preventDefault());

renderAll();
