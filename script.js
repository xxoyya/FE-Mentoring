(() => {
    // ----- LocalStorage Keys -----
    const LS = { TODOS: 'todo:list', THEME: 'theme', FILTER: 'todo:filter' };

    // ----- State -----
    let todos = [];               // {id, text, completed}
    let filter = 'all';           // 'all' | 'active' | 'completed'

    // ----- Shortcuts -----
    const $  = (s) => document.querySelector(s);
    const $$ = (s) => Array.from(document.querySelectorAll(s));
    const uid = () => (crypto.randomUUID ? crypto.randomUUID() : String(Date.now() + Math.random()));

    // ----- Theme / Hero BG -----
    const BG = {
        light: 'assets/bg_desktop_light.png',
        dark:  'assets/bg_desktop_dark.png',
    };
    function setHeroBg(theme){
        const img = $('.hero__bg');
        if (img) img.src = BG[theme] || BG.light;
    }
    function applySavedTheme(){
        const saved = localStorage.getItem(LS.THEME) || 'light';
        document.documentElement.setAttribute('data-theme', saved);
        setHeroBg(saved);
    }

    // ----- Persist Helpers -----
    function saveTodos(){ localStorage.setItem(LS.TODOS, JSON.stringify(todos)); }
    function loadTodos(){
        try { todos = JSON.parse(localStorage.getItem(LS.TODOS) || '[]'); }
        catch { todos = []; }
    }
    function saveFilter(){ localStorage.setItem(LS.FILTER, filter); }
    function loadFilter(){
        const f = localStorage.getItem(LS.FILTER);
        if (['all','active','completed'].includes(f)) filter = f;
    }

    // ----- Derived -----
    function getFiltered(){
        if (filter === 'active') return todos.filter(t => !t.completed);
        if (filter === 'completed') return todos.filter(t =>  t.completed);
        return todos;
    }

    // ----- DOM refs (after DOM is ready because script is deferred) -----
    const form         = $('#todoForm');
    const input        = $('#newTodo');
    const listEl       = $('#todoList');
    const leftCountEl  = $('#leftCount');
    const clearBtn     = $('#clearCompleted');
    const themeToggle  = $('#themeToggle');

    // ----- UI helpers -----
    function updateLeft(){
        const left = todos.filter(t => !t.completed).length;
        if (leftCountEl) leftCountEl.textContent = `${left} item${left===1?'':'s'} left`;
    }
    function updateFilterUI(){
        $$('.filter').forEach(b => {
            const on = b.dataset.filter === filter;
            b.classList.toggle('is-active', on);
            b.setAttribute('aria-selected', on ? 'true' : 'false');
        });
    }

    // ----- Render -----
    function render(){
        if (!listEl) return;
        listEl.innerHTML = '';
        for (const t of getFiltered()){
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

            const text = document.createElement('span');
            text.className = 'text';
            text.textContent = t.text;

            const remove = document.createElement('button');
            remove.className = 'destroy';
            remove.setAttribute('aria-label','삭제');
            remove.innerHTML = `
        <svg class="x" viewBox="0 0 24 24">
          <path d="M18.3 5.7a1 1 0 00-1.4 0L12 10.6 7.1 5.7A1 1 0 105.7 7.1L10.6 12l-4.9 4.9a1 1 0 101.4 1.4L12 13.4l4.9 4.9a1 1 0 001.4-1.4L13.4 12l4.9-4.9a1 1 0 000-1.4z"/>
        </svg>`;

            li.append(label, text, remove);
            listEl.appendChild(li);
        }
        updateLeft();
    }

    // ===== Init order (safe) =====
    applySavedTheme();   // theme + bg
    loadFilter();        // restore filter
    loadTodos();         // restore todos
    updateFilterUI();    // reflect filter buttons
    render();            // draw list

    // Ensure form can submit on Enter (some browsers need a submit button)
    if (form && !form.querySelector('button[type="submit"]')) {
        const hidden = document.createElement('button');
        hidden.type = 'submit';
        hidden.className = 'sr-only';
        hidden.textContent = '추가';
        form.appendChild(hidden);
    }

    // ----- Events -----
    // theme toggle
    if (themeToggle) themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const next = current === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        localStorage.setItem(LS.THEME, next);
        setHeroBg(next);
    });

    // add todo
    if (form) {
        // Enter 확실히 submit
        if (input) input.addEventListener('keydown', (e)=>{
            if (e.key === 'Enter') { e.preventDefault(); form.requestSubmit(); }
        });

        form.addEventListener('submit', (e)=>{
            e.preventDefault();
            if (!input) return;
            const text = input.value.trim();
            if (!text) return;
            todos.unshift({ id: uid(), text, completed:false });
            input.value = '';
            saveTodos();
            render();
        });
    }

    // toggle & delete
    if (listEl) listEl.addEventListener('click', (e)=>{
        const li = e.target.closest('.todo');
        if (!li) return;
        const id = li.dataset.id;

        if (e.target.closest('.checkbox') || e.target.classList.contains('text')) {
            todos = todos.map(t => t.id === id ? ({...t, completed: !t.completed}) : t);
            saveTodos();
            render();
        } else if (e.target.closest('.destroy')) {
            todos = todos.filter(t => t.id !== id);
            saveTodos();
            render();
        }
    });

    // filters
    $$('.filter').forEach(btn=>{
        btn.addEventListener('click', ()=>{
            filter = btn.dataset.filter;
            saveFilter();
            updateFilterUI();
            render();
        });
    });

    // clear completed
    if (clearBtn) clearBtn.addEventListener('click', ()=>{
        todos = todos.filter(t => !t.completed);
        saveTodos();
        render();
    });
})();
