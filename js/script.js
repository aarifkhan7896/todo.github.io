const addBtn = document.querySelector('#addBtn');
const inputField = document.querySelector('#inputField');
const card = document.querySelector("#card");
const searchIcon = document.querySelector('#searchIcon');
const searchBox = document.querySelector('#searchBox');
const allCard = document.querySelectorAll('.card');

searchBox.addEventListener('keyup',(e)=>{
    const allCard = document.querySelectorAll('.card');
    e.preventDefault();
    const filter = e.target.value.toLowerCase().trim();
    allCard.forEach((element)=>{
        if(element.textContent.includes(filter)){
            element.style.display="block";
        }else{
            element.style.display="none";
        }
    })
})
showData();

addBtn.addEventListener('click',(e)=>{
    e.preventDefault();
    if(inputField.value=="" || inputField.value==null){
        return alert("Kindly enter todo...")
    }

    const local = localStorage.getItem('todo');
    if(local==null){
        newArr=[];
    }else{
        newArr=JSON.parse(local);
    }
    const objData = {
        title:inputField.value
    }
    newArr.push(objData);
    localStorage.setItem('todo',JSON.stringify(newArr));
    inputField.value="";
    showData();
})

function showData(){
    const local = localStorage.getItem('todo');
    if(local==null){
        newArr=[];
    }else{
        newArr=JSON.parse(local);
    }
    let allData = "";
    newArr.forEach((element,index) => {
        const localData = `<div class="card">
                            <div
                            class="card-body d-flex justify-content-between align-items-center text-dark"
                            >
                            <p class="card-text fs-4">${element.title}</p>
                            <div>
                            <button class="me-3" id="deleteBtn" title="delete" onclick="deleteFun(${index})">
                            <i class="fas fa-trash fs-3 text-danger"></i>
                            </button>
                            <button id="deleteBtn" title="edit" onclick="editFun(${index})">
                                <i class="fas fa-edit fs-3 text-primary"></i>
                            </button>
                            </div>
                            </div>
                        </div>`;
    allData+=localData;
    card.innerHTML=allData;
    });
}

function deleteFun(index){
    const local = localStorage.getItem('todo');
    newArr=JSON.parse(local);
    newArr.splice(index,1);
    localStorage.setItem('todo',JSON.stringify(newArr));
    document.location.reload();
    showData();
}

function editFun(index){
    const inputField = document.querySelector('#inputField');
    const local = localStorage.getItem('todo');
    if(local==null){
        newArr=[];
    }else{
        newArr=JSON.parse(local);
    }
    newArr.findIndex((element,index)=>{
        inputField.value=element.title;
    })
    newArr.splice(index,1);
    localStorage.setItem('todo',JSON.stringify(newArr));
    showData();
}