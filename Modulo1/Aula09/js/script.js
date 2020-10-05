window.addEventListener('load', start);

var globalNames = ['Um', 'Dois', 'Três', 'Quatro'];
var inputName = null;
var isEditing = false;
var currentIndex = null;
function start() {
  preventFormSubmit();
  inputName = document.querySelector('#inputName');
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }

  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
  }
  function updateName(newName) {
    globalNames[currentIndex] = newName;
  }

  function handleTyping(event) {
    if (
      event.key === 'Enter' &&
      event.target.value &&
      event.target.value.trim()
    ) {
      if (!isEditing) {
        insertName(event.target.value);
        //podia ter usado o valor do campo inputName também
        //insertName(inputName.value);
        clearInput();
      } else {
        updateName(event.target.value);
        //podia ter usado o valor do campo inputName também
        //insertName(inputName.value);
        clearInput();
      }
      render();
      isEditing = false;
    } else if (event.key === 'Enter' && !event.target.value.trim()) {
      clearInput();
    }
  }

  inputName.addEventListener('keyup', handleTyping);
  inputName.focus();
}

function render() {
  function createDeleteButton(index) {
    function deleteName() {
      globalNames.splice(index, 1);
      render();
    }
    var button = document.createElement('button');
    button.classList.add('deleteButton');
    button.textContent = 'x';
    button.addEventListener('click', deleteName);
    return button;
  }

  function createSpan(name, index) {
    function editItem() {
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
      render();
    }

    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click', editItem);

    return span;
  }

  var divNames = document.querySelector('#names');
  divNames.innerHTML = '';
  var ul = document.createElement('ul');

  for (let i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];
    var li = document.createElement('li');

    var button = createDeleteButton(i);

    var span = createSpan(currentName, i);

    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }
  divNames.appendChild(ul);
}

function clearInput() {
  inputName.value = '';
  inputName.focus();
}
