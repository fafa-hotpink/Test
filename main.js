const input = document.getElementById('input');
const ul = document.getElementById('tasks-list');

const STORAGE_KEY = 'tasksList';
let tasksList = loadTasks();
renderFromTasks();

input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    input.blur();
  }
});

input.addEventListener('keydown', e => {
  if (e.key === "Enter") {
    const taskText = input.value.trim();
    if (!taskText) {
      alert('Yo!');
      return;
    }
    addTask(taskText);
    input.value = '';
    console.log(tasksList);
  }
});

function addTask(taskText) {
  
  if (tasksList.some(t => t.text.toLowerCase() === taskText.toLowerCase())) {
    alert('Jibbit schon');
    return;
}
    
    const taskObj = { text: taskText, done: false};
    tasksList.push(taskObj);
    saveTasks();
    addListItem(taskObj);
}

function addListItem(taskObj) {
  
    const li = document.createElement('li');
    li.textContent = taskObj.text;
    if (taskObj.done) li.classList.add('done');
    
    const button = document.createElement('button');
    button.innerHTML = `
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
    li.append(button);
    ul.append(li);
    
    li.addEventListener('click', e => {
      if (e.target === button) return;
      
      li.classList.toggle('done');
      taskObj.done = li.classList.contains('done');
      saveTasks();
    });
    
    button.addEventListener('click', () => {
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