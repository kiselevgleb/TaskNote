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
let ar = [];
const messNoTasks = document.createElement('p');
pInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    const t = event.target.value;
    if (t.length > 0) {
      const divTask = document.createElement('div');
      const task = document.createElement('p');
      const boxTask = document.createElement('input');
      boxTask.type = "checkbox";
      task.className = "task";
      boxTask.className = "task";
      task.innerText = t;
      ar.push(t);
      divTask.appendChild(task);
      divTask.appendChild(boxTask);
      divAllTask.appendChild(divTask);
      event.target.value = "";
    } else {
      event.target.value = "ERROR input box without text";
      document.body.addEventListener('click', (event) => {
        event.target.value = "";
      });
    }
    divAllTask.childNodes.forEach(element => {
      if (element.childNodes.length == 2) {
        element.style.display = 'block';
      }
    });
    divAllTask.removeChild(messNoTasks);
  }
  divParent.addEventListener('click', (event) => {
    console.log(event.target.parentNode);
    console.log(event.target.parentNode.parentNode);
    if (event.target.parentNode.parentNode == divAllTask && event.target.checked) {
      divPinned.appendChild(event.target.parentNode);
      ar.remove(event.target.previoussibling);
      if (divPinned.childNodes.length > 1) {
        divPinned.removeChild(pNoPinned);
      }
    } else if (event.target.parentNode.parentNode == divPinned && !event.target.checked) {
      ar.push(event.target.previoussibling);
      divAllTask.appendChild(event.target.parentNode);
      if (divPinned.childNodes.length == 1) {
        divPinned.appendChild(pNoPinned);
      }
    }

  });
});
pInput.addEventListener('input', (event) => {
  let coin = 0;

  divAllTask.childNodes.forEach(element => {
    if (element.childNodes.length == 2) {
      if (!element.childNodes[0].innerText.includes(event.target.value)) {
        element.style.display = 'none';
        coin++;
      } else {
        element.style.display = 'block';
      }
    }
  });
  if (coin + 1 == divAllTask.childNodes.length) {
    messNoTasks.innerText = 'No tasks found';
    divAllTask.appendChild(messNoTasks);
  }
});