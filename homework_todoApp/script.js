let items = [];
const todolist = document.getElementById("todolist");

const createTodoBtn = document.getElementById("createTodoBtn");
createTodoBtn.addEventListener("click", createTodo);
function createTodo(){
    alert("createTodo");
    
    const item={
        id :new Date().getTime(),
        text :""
    }
    items.unshift(item);  //unshift에서 자꾸 에러남

    const itemEl = createTodoEl(item);
    todolist.prepend(itemEl);
    saveToLocalStorage();
}
function createTodoEl(item){

    //각 요소들 생성
    const itemEl = document.createElement("div");
    itemEl.classList.add("item");

    const checkbox =document.createElement("input");
    checkbox.type="checkbox";

    const inputEl = document.createElement("input");
    inputEl.type="text";
    inputEl.value=item.text;

    const buttonsEl = document.createElement("div");
    buttonsEl.id= "buttons";

    const editBtnEl = document.createElement("button");
    editBtnEl.id= "editTodoBtn";

    const removeBtnEl = document.createElement("button");
    editBtnEl.id= "deleteTodoBtn";

    //각 요소들에 하위 요소들 달아주기
    buttonsEl.append(editBtnEl);
    buttonsEl.append(removeBtnEl);
    itemEl.append(checkbox);
    itemEl.append(inputEl);
    itemEl.append(buttonsEl);

    //각 요소들에 이벤트 달아주기
    inputEl.addEventListener("input",()=>{
        item.text=inputEl.value;

        saveToLocalStorage();
    })

    removeBtnEl.addEventListener("click",()=>{
        items =items.filter(one=>one.id!=item.id);
        
        saveToLocalStorage();
        itemEl.remove();
    })

    return itemEl;
}
//로컬스토리지에 저장
function saveToLocalStorage(){
    const data = JSON.stringify(items);
    localStorage.setItem("my todolist",data);  //localStorage.setItem
}
//화면 로드할때 draw호출
drawTodoList();
function drawTodoList(){
    loadFromLocalStorage();
    for(let i=0; i<items.length; i++){
        const itemelment = createTodo(items[i]);
        todolist.append(itemelment);
    }
}
//로컬스토리지에서 가져오기
function loadFromLocalStorage(){
    const data = localStorage.getItem("my_todolist");
    items = JSON.parse(data);
}