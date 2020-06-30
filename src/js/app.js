const divParent = document.createElement('div');
const classParent = 'hole-task';
divParent.classList.add(classParent);
document.body.appendChild(divParent);

const pTitle = document.createElement('p');
pTitle.innerText = 'TOP Tasks';
divParent.appendChild(pTitle);

const pInput = document.createElement('input');
const classInput = 'hole-input';
pInput.classList.add(classInput);
divParent.appendChild(pInput);

const messError = document.createElement('p');
divParent.appendChild(messError);

const divPinned = document.createElement('div');
divParent.appendChild(divPinned);
const pPinned = document.createElement('p');
pPinned.innerText = 'Pinned';
const pNoPinned = document.createElement('p');
pNoPinned.innerText = 'No pinned tasks';
divPinned.appendChild(pPinned);
divPinned.appendChild(pNoPinned);

const divAllTask = document.createElement('div');
divParent.appendChild(divAllTask);
const pAllTask = document.createElement('p');
pAllTask.innerText = 'All Task';
divAllTask.appendChild(pAllTask);
const messNoTasks = document.createElement('p');

pInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    messError.innerText = '';
    const t = event.target.value;
    if (t.length > 0) {
      const divTask = document.createElement('div');
      const task = document.createElement('p');
      const boxTask = document.createElement('input');
      boxTask.type = 'checkbox';
      task.className = 'task';
      boxTask.className = 'task';
      task.innerText = t;
      divTask.appendChild(task);
      divTask.appendChild(boxTask);
      divAllTask.appendChild(divTask);
      event.target.value = '';
    }  else {
      messError.innerText = 'ERROR input box without text';
      document.body.addEventListener('click', (e) => {
        messError.innerText = '';
      });
    }
    divAllTask.childNodes.forEach((element) => {
      if (element.childNodes.length === 2) {
        element.style.display = 'block';
      }
    });
    divAllTask.removeChild(messNoTasks);
  }
  divParent.addEventListener('click', (eventC) => {
    if (eventC.target.parentNode.parentNode === divAllTask && eventC.target.checked) {
      divPinned.appendChild(eventC.target.parentNode);
      if (divPinned.childNodes.length > 1) {
        divPinned.removeChild(pNoPinned);
      }
    } else if (eventC.target.parentNode.parentNode === divPinned && !eventC.target.checked) {
      divAllTask.appendChild(eventC.target.parentNode);
      if (divPinned.childNodes.length === 1) {
        divPinned.appendChild(pNoPinned);
      }
    }
  });
});
pInput.addEventListener('input', (event) => {
  let coin = 0;

  divAllTask.childNodes.forEach((elem) => {
    if (elem.childNodes.length === 2) {
      if (!elem.childNodes[0].innerText.includes(event.target.value)) {
        elem.style.display = 'none';
        coin += 1;
      } else {
        elem.style.display = 'block';
      }
    }
  });
  if (coin + 1 === divAllTask.childNodes.length) {
    messNoTasks.innerText = 'No tasks found';
    divAllTask.appendChild(messNoTasks);
  }
});
