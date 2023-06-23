const inputEl = document.querySelector("#input");
const buttonEl = document.querySelector("#delete");
const outputEl = document.querySelector("#list-container");
const form = document.querySelector("form");

// deleting task
// "id" is used here to delete the task user clicked
const deleteTask = (id) => {
  let tasks; // using this to save tasks and it is an array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  // filtering "tasks" array with id
  tasks = tasks.filter((t) => {
    return t.id !== id;
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
  getTasks(); // After deleting the task, calling "getTasks()" method to display the updated tasks from localStorage
};

// Getting Task and displaying it in browser window
const getTasks = () => {
  let tasks; // using this to save tasks and it is an array
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    let output;
    const allTaskHTMLFormat = tasks.map((t) => {
      return `<li id="item">
                <span>${t.title}</span>
               <button id="delete" onClick="deleteTask(${t.id})">X</button>
              </li>`;
    });
    output = allTaskHTMLFormat.join(""); // "join("") is used to  convert array data to single string seperated by separated by spaces". Refer - https://chat.openai.com/share/fe62f4f5-9243-4e0c-8791-470bdcba6b48
    outputEl.innerHTML = output;
  }
};
getTasks(); // Calling "getTasks()" method here to load tasks the window is opened

// Adding Task into localStorage
const addTasks = (e) => {
  e.preventDefault();

  // Checking if the task input text field is empty
  if (inputEl.value === "") {
    alert("Please enter a Task");
  } else {
    // Get the task inputfield text value
    let task = inputEl.value;
    // Creating tasks array
    let tasks; // using this to save tasks and it is an array
    if (localStorage.getItem("tasks") === null) {
      tasks = []; // Creating "tasks[] array"
    } else {
      tasks = JSON.parse(localStorage.getItem("tasks")); // Converting String object data to JSON data
    }
    tasks.unshift({ id: Date.now(), title: task }); // if "tasks[] array is already there in localStorage, then add the user entered task into array at the beginning". "unshift" is used to insert elements at the beginning of the array
    localStorage.setItem("tasks", JSON.stringify(tasks)); // Adding the updated "tasks[] array that is converted to String" into localStorage
    getTasks(); // calling getTasks() method to get the task and display it in the browser window
    inputEl.value = ""; // Clearing "Task entry input text field after entering and saving it in localStorage"
  }
};

// Adding Event Listener
form.addEventListener("submit", addTasks);
