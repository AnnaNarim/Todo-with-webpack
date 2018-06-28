const funcs = {};
module.exports = funcs;

const root = document.getElementById('root');
const API_URL = 'http://localhost:3000/api/todos';
const API_URL_INDEX = 'http://localhost:3000/api/todos/';

funcs.formComponent = () => `
          <h1>My todos</h1>
          <p id='unfilled' style='color: red'></p>
          <input type='text' id='addInput'>
        `;

funcs.getdata = () => {
  fetch(API_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(resp => resp.json())
    .then(data => funcs.drawList(data))
    .catch(console.error);
};

funcs.drawList = (data) => {
	root.innerHTML = funcs.formComponent();
  	const addB = document.createElement('button')
  	addB.id = 'addB'
  	addB.innerHTML = 'Add';
  	addB.onclick = funcs.add;
  	document.getElementById('root').appendChild(addB)
	if (data) {
	    const ul = document.createElement('ul');
	    data.map((item) => {
	    	if(item.active !=0){
		      const li = document.createElement('li');
		      li.innerHTML = item.todo;
		      li.id = `${item.id}`;

		      const editB = document.createElement('button');
		      editB.onclick = () => funcs.edit(item.id)
		      editB.innerHTML = 'Edit';
		      li.appendChild(editB);

		      const deleteB = document.createElement('button');
		      deleteB.onclick = () => funcs.deleteTodo(item.id)
		      deleteB.innerHTML = 'Delete';
		      li.appendChild(deleteB);
		      ul.appendChild(li);
		    }
	      
    	})
    	root.appendChild(ul);
	}
}

funcs.add = function() {
  const text = document.getElementById('addInput').value;
  if (text === '') {
    document.getElementById('unfilled').innerHTML = 'Input field is empty';
  } else {
    fetch(API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
      .then(funcs.getdata())
      .catch(console.error);
  }
};

funcs.edit = (index) => {
  document.getElementById('addInput').value = document.getElementById(`${index}`).childNodes[0].data;
  document.getElementById('addB').innerHTML = 'Update';
  document.getElementById('addB').onclick = () => funcs.	update(index);
};

funcs.update = (index) => {
  const value = document.getElementById('addInput').value;
  if (value === '') {
    document.getElementById('unfilled').innerHTML = 'Input field is empty';
  } else {
    fetch(API_URL_INDEX + index, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ value, id: index }),
    })
      .then(funcs.getdata());
    document.getElementById('addB').innerHTML = 'Add';
    document.getElementById('addB').onclick = () => funcs.add();
  }
};

funcs.deleteTodo = (index) => {
  fetch(API_URL_INDEX + index, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: index }),
  })
    .then(funcs.getdata());
};