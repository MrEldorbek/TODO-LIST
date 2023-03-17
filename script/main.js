const todolistForm = document.querySelector("#todolist-form")
const todolistFormInput = document.querySelector("#todolist-adder-input");
const todolistCollection = document.querySelector("#todolist-collection");
const todolistDeleteAll = document.querySelector("#delete-all");

todolistForm.addEventListener("submit", addTodo)

function addTodo(e){
  e.preventDefault();
  const inputValue = todolistFormInput.value;
  if(inputValue.trim().length >= 3){
    const time = new Date();
    const now = `${time.getHours().toString().padStart(2, "0")} : ${time.getMinutes().toString().padStart(2, "0")} : ${time.getSeconds().toString().padStart(2, "0")}`;
    console.log(now);
    const todolistLi = document.createElement("li");
    const btnWrapperDiv = document.createElement("div");
    btnWrapperDiv.innerHTML = `
    <button class="btn btn-complete" id="btn-complete"><i class="fas fa-check-circle"></i> <br> Complete</button>
    <button class="btn btn-edit" id="btn-edit"><i class="fas fa-edit"></i> <br> Edit</button>
    <button class="btn btn-time" id="btn-time"><i class="fas fa-clock"></i> <br> ${now}</button>
    <button class="btn btn-delete" id="btn-delete"><i class="fas fa-trash"></i> <br> Delete</button>

    `
    todolistLi.className = "collection__item"; 
    const todolistText = document.createElement("p");
    todolistText.innerText = inputValue;
    todolistLi.appendChild(todolistText);
    todolistLi.appendChild(btnWrapperDiv);
    todolistCollection.prepend(todolistLi);
    todolistFormInput.value = '';

  }
  else{
    alert("Please Enter more than 2 characters");
  }
}

todolistDeleteAll.addEventListener("click", () => {
  if(todolistCollection.firstChild){
    const userResponse = confirm("Are you sure to delete this item?");
    console.log(userResponse);
    if(userResponse){
      // 1-way
      todolistCollection.innerHTML = '';
      // 2-way
      // qachonki
      // while(todolistCollection.firstChild === true){
      //   todolistCollection.removeChild(todolistCollection.firstChild);
      // }
    }
  }
})


todolistCollection.addEventListener("click", (e) => {
   if(e.target.classList.contains("btn-delete")){
    const isAgrredToDElete = confirm("Are you sure to delete this item?");
    if(isAgrredToDElete){
      e.target.parentElement.parentElement.remove()
    }
 
   }else if(e.target.classList.contains("btn-edit")){
    if(e.target.parentElement.previousSibling.hasAttribute("contenteditable")){
      e.target.parentElement.previousSibling.removeAttribute("contenteditable")
      e.target.innerHTML = ' <i class="fas fa-edit"></i> <br>Edit'
      e.target.style.background = "gold";
    }
    else{ (e.target.parentElement.previousSibling.setAttribute("contenteditable", true))
      e.target.innerHTML = '<i class="fas fa-check-double"></i> <br>Done'
      e.target.style.background = "purple";  
    } 
 
   
   }else if(e.target.classList.contains("btn-complete")){
    e.target.parentElement.previousSibling.classList.toggle("textEl")
   }
})