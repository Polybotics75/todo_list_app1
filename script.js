// getting all required elements
const inputBox = document.querySelector(".inputField input");
const addBtn = document.querySelector(".inputField button");
const todoList = document.querySelector(".todoList");
const deleteAllBtn = document.querySelector(".footer button");

// onkeyup event
inputBox.onkeyup = ()=>{
  let userEnteredValue = inputBox.value; //getting user entered value
  if(userEnteredValue.trim() != 0){ //if the user value isn't only spaces
    addBtn.classList.add("active"); //active the add button
  }else{
    addBtn.classList.remove("active"); //unactive the add button
  }
}

showTasks(); //calling showTask function

addBtn.onclick = ()=>{ //when user click on plus icon button
  let userEnteredValue = inputBox.value; //getting input field value
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
  }
  listArray.push(userEnteredValue); //pushing or adding new value in array
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //transforming js object into a json string
  showTasks(); //calling showTask function
  addBtn.classList.remove("active"); //unactive the add button once the task added
  showNotification("ADDED ITEM TO LIST", "To-Do list successfully updated"); //show notification for delete
}

function showTasks(){
  let getLocalStorageData = localStorage.getItem("New Todo");
  if(getLocalStorageData == null){
    listArray = [];
  }else{
    listArray = JSON.parse(getLocalStorageData); 
  }
  const pendingTasksNumb = document.querySelector(".pendingTasks");
  pendingTasksNumb.textContent = listArray.length; //passing the array length in pendingtask
  if(listArray.length > 0){ //if array length is greater than 0
    deleteAllBtn.classList.add("active"); //active the delete button
  }else{
    deleteAllBtn.classList.remove("active"); //unactive the delete button
  }
  let newLiTag = "";
  listArray.forEach((element, index) => {
    var itemId = "p-"+index; //create id for the icon span
    newLiTag += `<li><span class="item">${element}</span><span id="${itemId}" class="icon" onclick="deleteTask(${index})"><i class="far fa-trash-alt"></i></span></li>`;
  });
  todoList.innerHTML = newLiTag; //adding new li tag inside ul tag
  inputBox.value = ""; //once task added leave the input field blank
}

// delete task function
function deleteTask(index){
  var itemId = "p-"+index;
  var itemIcon = document.querySelector(`span.icon#${itemId}`); //get the icon span and add animation
  itemIcon.classList.add('animate');
  setTimeout(() => {
    itemIcon.innerHTML = '<i class="far fa-check"></i>';
  }, 4000);
  setTimeout(() => {
    let getLocalStorageData = localStorage.getItem("New Todo");
    listArray = JSON.parse(getLocalStorageData);
    listArray.splice(index, 1); //delete or remove the li
    localStorage.setItem("New Todo", JSON.stringify(listArray));
    showTasks(); //call the showTasks function
    showNotification("DELETED ITEM FROM LIST", "To-Do list successfully updated"); //show notification for delete
  }, 5000);
}

// delete all tasks function
deleteAllBtn.onclick = ()=>{
  let getLocalStorageData = localStorage.getItem("New Todo"); //getting localstorage
  if(getLocalStorageData == null){ //if localstorage has no data
    listArray = []; //create a blank array
  }else{
    listArray = JSON.parse(getLocalStorageData);  //transforming json string into a js object
    listArray = []; //create a blank array
  }
  localStorage.setItem("New Todo", JSON.stringify(listArray)); //set the item in localstorage
  showTasks(); //call the showTasks function
  showNotification("DELETED ALL ITEM LIST", "To-Do list successfully updated"); //show notification for delete
}


function showNotification(head, msg){
  Notification.requestPermission().then(perm => {
    if(perm === "granted") {
  
      var notification = new Notification(`${head}`, {

        body: msg,
        data: { hello: "todo" },
        icon: "Logo.png",
        tag: "Activity Update",
      })

      notification.addEventListener("error", e => {
        alert("Notification Error");
      })
    }
  })
}