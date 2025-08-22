const input = document.getElementById('input');
const ul = document.getElementById('tasks-list');

const STORAGE_KEY = 'tasksList';
let tasksList = loadTasks();
renderFromTasks();

function showHint(msg) {
  const hint = document.getElementById('hint');
  hint.textContent = msg;
  hint.classList.add('show');
  
  setTimeout(() => {
    hint.classList.remove('show');
  }, 2000);
}

input.addEventListener('keydown', e => {
  if (e.key === "Enter") {
    e.preventDefault();
    
    const taskText = input.value.trim();
    if (!taskText) {
      showHint('Du musst schon was eingeben, Diggi...');
      return;
    }
    
    if (tasksList.some(t => t.text.toLowerCase() === taskText.toLowerCase())) {
    showHint('Den Eintrag gibts schon, Freundchen...');
    return;
    }
    
    addTask(taskText);
    input.value = '';
    input.blur();
    console.log(tasksList);
  }
});

function addTask(taskText) {
  const taskObj = { text: taskText, done: false};
  tasksList.push(taskObj);
  saveTasks();
  addListItem(taskObj);
}

function addListItem(taskObj) {
  
    const li = document.createElement('li');
    const span = document.createElement('span');
    span.textContent = taskObj.text;

    if (taskObj.done) li.classList.add('done');
    
    const buttonEdit = document.createElement('button');
    buttonEdit.classList.add('btn-edit');
    buttonEdit.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" 
     width="27" height="27" 
     viewBox="0 0 24 24" 
     fill="currentColor">
    <path fill-rule="evenodd" clip-rule="evenodd"
        d="M15.8787 3.70705C17.0503 2.53547 18.9498 2.53548 20.1213
        3.70705L20.2929 3.87862C21.4645 5.05019 21.4645 6.94969 20.2929
        8.12126L18.5556 9.85857L8.70713 19.7071C8.57897 19.8352 8.41839
        19.9261 8.24256 19.9701L4.24256 20.9701C3.90178 21.0553 3.54129
        20.9554 3.29291 20.7071C3.04453 20.4587 2.94468 20.0982 3.02988
        19.7574L4.02988 15.7574C4.07384 15.5816 4.16476 15.421 4.29291
        15.2928L14.1989 5.38685L15.8787 3.70705ZM18.7071 5.12126C18.3166
        4.73074 17.6834 4.73074 17.2929 5.12126L16.3068 6.10738L17.8622
        7.72357L18.8787 6.70705C19.2692 6.31653 19.2692 5.68336 18.8787
        5.29283L18.7071 5.12126ZM16.4477 9.13804L14.8923 7.52185L5.90299
        16.5112L5.37439 18.6256L7.48877 18.097L16.4477 9.13804Z"/>
    </svg>
    `;

    const buttonDelete = document.createElement('button');
    buttonDelete.classList.add('btn-delete');
    buttonDelete.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" 
         fill="currentColor" viewBox="0 0 16 16">
      <path d="M5.5 5.5A.5.5 0 0 1 6 6v7a.5.5 0 0 1-1 
               0V6a.5.5 0 0 1 .5-.5zm2.5.5a.5.5 0 0 
               1 1 0v7a.5.5 0 0 1-1 0V6zm3 
               .5a.5.5 0 0 0-1 0v7a.5.5 0 0 0 
               1 0V6.5z"/>
      <path fill-rule="evenodd" 
            d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 
               0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 
               1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 
               0 0 1 1-1h2a1 1 0 0 1 1 
               1h3.5a1 1 0 0 1 1 1v1zM4.118 
               4 4 4.059V13a1 1 0 0 0 1 
               1h6a1 1 0 0 0 1-1V4.059L11.882 
               4H4.118zM2.5 3V2h11v1h-11z"/>
    </svg>
    `;
    
    li.append(buttonEdit);
    li.append(span);
    li.append(buttonDelete);
    ul.append(li);
    
    li.addEventListener('click', () => {
      li.classList.toggle('done');
      taskObj.done = li.classList.contains('done');
      saveTasks();
    });
    
    buttonEdit.addEventListener('click', e => {
      e.stopPropagation();
      

      const edit = document.createElement('input');
      edit.type = 'text';
      edit.value = taskObj.text;
      li.insertBefore(edit, span);
      li.removeChild(span);
      edit.focus();
      
      edit.addEventListener('click', ev => {
        ev.stopPropagation();
      })

      function saveEdit() {
        const newText = edit.value.trim();
        if (newText === taskObj.text) {
          li.insertBefore(span, edit);
          li.removeChild(edit);
          return;
        }
        if (!newText) {
          showHint('Na hör mal...')
          li.insertBefore(span, edit);
          li.removeChild(edit);
          return;
        }
        if (tasksList.some(nt => nt.text.toLowerCase() === newText.toLowerCase())) {
          showHint('Jetzt schlägts aber 13...');
          li.insertBefore(span, edit);
          li.removeChild(edit);
          return;
        }
        taskObj.text = newText;
        span.textContent = newText;
        li.insertBefore(span, edit);
        li.removeChild(edit);
        saveTasks();
      }
      edit.addEventListener('blur', saveEdit);
      edit.addEventListener('keydown', ev => {
        if (ev.key ==='Enter') edit.blur();
        });
      });
    
    buttonDelete.addEventListener('click', e => {
      e.stopPropagation();
      li.remove();
      tasksList = tasksList.filter(t => t !== taskObj);
      saveTasks();
      console.log(tasksList);
    });
}

function renderFromTasks() {
  ul.innerHTML = '';
  tasksList.forEach(addListItem);
}

function saveTasks() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(tasksList));
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}