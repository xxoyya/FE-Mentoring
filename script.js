// ----- State -----
let todos = []; // {id, text, completed}
let filter = 'all'; // 'all' | 'active' | 'completed'

// ----- Theme (9) -----
const root = document.documentElement;
const themeToggle = document.getElementById('themeToggle');
const BG = {
    light: 'assets/bg_desktop_light.png',
    dark:  'assets/bg_desktop_dark.png'
};
function setHeroBg(theme){
    const img = document.querySelector('.hero__bg');
    img.src = BG[theme] || BG.light;
}
function applySavedTheme(){
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    setHeroBg(saved);
}
applySavedTheme();

themeToggle.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
    setHeroBg(next);
});

// ----- Elements -----
const form = document.getElementById('todoForm');
const input = document.getElementById('newTodo');
const listEl = document.getElementById('todoList');
const leftCountEl = document.getElementById('leftCount');
const filters = document.querySelectorAll('.filter');
const clearBtn = document.getElementById('clearCompleted');

// ----- Helpers -----
const uid = () => crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random());

function getFilteredTodos(){
    switch(filter){
        case 'active': return todos.filter(t => !t.completed);
        case 'completed': return todos.filter(t => t.completed);
        default: return todos;
    }
}
function updateLeftCount(){
    const left = todos.filter(t=>!t.completed).length;
    leftCountEl.textContent = `${left} item${left===1?'':'s'} left`;
}

// ----- Render -----
function render(){
    const items = getFilteredTodos();
    listEl.innerHTML = '';
    items.forEach(t => {
        const li = document.createElement('li');
        li.className = `todo${t.completed ? ' completed' : ''}`;
        li.dataset.id = t.id;

        // custom checkbox
        const label = document.createElement('label');
        label.className = 'checkbox';
        const cb = document.createElement('input');
        cb.type = 'checkbox';
        cb.checked = t.completed;
        const visual = document.createElement('span');
        visual.className = 'check';
        visual.innerHTML = `
      <svg width="11" height="9" viewBox="0 0 11 9" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        <path d="M1 4.5L4 7.5L10 1.5" stroke="white" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>`;
        label.append(cb, visual);

        // text
        const text = document.createElement('span');
        text.className = 'text';
        text.textContent = t.text;

        // destroy button (X) (6)
        const remove = document.createElement('button');
        remove.className = 'destroy';
        remove.setAttribute('aria-label','삭제');
        remove.innerHTML = `<svg class="x" viewBox="0 0 24 24"><path d="M18.3 5.7a1 1 0 00-1.4 0L12 10.6 7.1 5.7A1 1 0 105.7 7.1L10.6 12l-4.9 4.9a1 1 0 101.4 1.4L12 13.4l4.9 4.9a1 1 0 001.4-1.4L13.4 12l4.9-4.9a1 1 0 000-1.4z"/></svg>`;

        li.append(label, text, remove);
        listEl.appendChild(li);
    });

    updateLeftCount();
}
render();

// ----- Events -----
// add todo
form.addEventListener('submit', (e)=>{
    e.preventDefault();
    const text = input.value.trim();
    if(!text) return;
    todos.unshift({ id: uid(), text, completed:false });
    input.value = '';
    render();
});

// toggle complete: click on checkbox OR text area (8)
listEl.addEventListener('click', (e)=>{
    const li = e.target.closest('.todo');
    if(!li) return;
    const id = li.dataset.id;

    if (e.target.closest('.checkbox') || e.target.classList.contains('text')) {
        todos = todos.map(t => t.id === id ? ({...t, completed: !t.completed}) : t);
        render();
    }

    // remove
    if (e.target.closest('.destroy')) {
        todos = todos.filter(t => t.id !== id);
        render();
    }
});

// filters (3)
filters.forEach(btn=>{
    btn.addEventListener('click', ()=>{
        filters.forEach(b=>{ b.classList.remove('is-active'); b.setAttribute('aria-selected','false'); });
        btn.classList.add('is-active'); btn.setAttribute('aria-selected','true');
        filter = btn.dataset.filter;
        render();
    });
});

// clear completed (4)
clearBtn.addEventListener('click', ()=>{
    todos = todos.filter(t=>!t.completed);
    render();
});
