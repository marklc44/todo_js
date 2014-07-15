// define DOM elements
var addForm = document.getElementById('add-form');
var todoList = document.getElementById('todo-list');
var todoItems = localStorage.getItem('items').length > 0 ? localStorage.getItem('items').split(',') : [];
console.log(todoItems);

// define addItems function to factor out adding nodes
var addItems = function(input) {
	var newLi = document.createElement('li');
	var todoText = document.createTextNode(input);
	var newRemoveButton = document.createElement('button');
	newRemoveButton.innerHTML = 'X';
	newRemoveButton.className = 'remove';

	newLi.appendChild(todoText);
	todoList.appendChild(newLi);
	newLi.appendChild(newRemoveButton);	
	return newRemoveButton;
};

var removeItems = function(thisButton, input) {
	var thisButton = this;
	var thisLi = thisButton.parentNode;
	var thisUl = thisLi.parentNode;

	thisUl.removeChild(thisLi);
	todoItems.splice(todoItems.indexOf(input), 1);
	localStorage.setItem('items', todoItems);
};


// populate the todo list with items from todoItems/localStorage
	todoItems.forEach(function(text) {
		var newButton = addItems(text);	
		newButton.addEventListener('click', removeItems, true, text);
	});


// add and remove from form
addForm.onsubmit = function(e) {
	e.preventDefault();
	
	var newButton = addItems(this.add_todo.value)
	todoItems.push(this.add_todo.value);
	localStorage.setItem('items', todoItems);
	newButton.addEventListener('click', removeItems, true, this.add_todo.value);

	this.add_todo.value = '';
};

