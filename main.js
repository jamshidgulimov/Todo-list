const inpt = document.querySelector('#inpt')
const item = document.querySelector('.list-group')
const but = document.getElementById('but')
const formadd = document.getElementById('formadd')
const fullTime = document.querySelector('#fullTime')
const secTime = document.querySelector('#secTime')

const formedit = document.getElementById('formedit')
const inptedit = document.getElementById('inptedit')
const modl = document.getElementById('modl')
const overly = document.getElementById('overly')
const x = document.getElementById('x')

let editItemId


let todos = JSON.parse(localStorage.getItem('list')) ? JSON.parse(localStorage.getItem('list')) : []

if (todos.length) showTodos() 
      
function addlocal() {
    localStorage.setItem('list', JSON.stringify(todos))
   
}

function showTodos(){
   const todosi = JSON.parse(localStorage.getItem('list'))

   item.innerHTML =''
   todosi.forEach((el, i) => {

    item.innerHTML +=`<li ondblclick="setCompleted(${i})"  class="list-group-item list-group-item-primary d-flex justify-content-between"> 
    
    <h1 class='no'>${i + 1}</h1>

    <h1> ${el.text} </h1>
    
    <div class='d-flex gap-4'>
    
    <span class="time">${el.time}</span>

    <span onclick=(editTodo(${i}))><i class="fa-solid fa-pen"></i></span>
    <i onclick=(deleteTodo(${i})) class="fa-solid fa-trash x"></i>
</div>
    
    </li>`
    
   });
}

function getTime(){
    const now = new Date()
    const date= now.getDate() < 10 ? '0' + now.getDate() : now.getDate()
    const month= now.getMonth() < 9 ? '0' + (now.getMonth() + 1) : (now.getMonth() + 1)
    const year= now.getFullYear()

    const hour= now.getHours() < 10 ? '0' + now.getHours() : now.getHours()
    const minut= now.getMinutes() < 10 ? '0' + now.getMinutes() : now.getMinutes()
    const second= now.getSeconds() < 10 ? '0' + now.getSeconds() : now.getSeconds()

    const months = [
        'Yanvar',
        'Fevral',
        'Mart',
        'Aprel',
        'May',
        'Iyun',
        'Iyul',
        'Avgust',
        'Sentabr',
        'Oktabr',
        'Noyabr',
        'Dekabr'
    ]

    const month1= now.getMonth() < 10 ?(now.getMonth()) : now.getMonth()

    fullTime.innerHTML = `${date}, ${months[month1]}, ${year}`
    
    secTime.innerHTML = `${hour}:${minut}:${second}`

    return `${hour}:${minut},  ${date}.${month}.${year}`
    
}

setInterval(getTime, 1000)

function showError(where, err){
    document.getElementById(`${where}`).textContent = err

    setTimeout(() => {
    document.getElementById(`${where}`).textContent = ''

    }, 3000)
   }

but.addEventListener('click', (e)=>{
    e.preventDefault()
    let val = inpt.value.trim()
       
    formadd.reset()
    if(!val){
        showError('inptapp', 'error...')

    }else{
        // inptapp.innerHTML = ``
        todos.push({text: val, time: getTime()})

        addlocal()
        showTodos()         
    }
    
})

function deleteTodo(id){
   const delTodos = todos.filter((item, i) =>{
       
       return i!==id
    })
    
    todos = delTodos

   addlocal()
   showTodos()
}

formedit.addEventListener('submit', (e) =>{
    e.preventDefault()

    let valu = inptedit.value.trim()
    formedit.reset()
    if(!valu){
        showError('inptapp2', 'error...')

    }else{
        // inptapp.innerHTML = ``
        todos.splice(editItemId, 1, {text: valu, time: getTime()})

        addlocal()
        showTodos()
        close()           
    }
})

function editTodo(id){   
    open()
   editItemId = id
}
 
function open(){
    modl.classList.remove('hidden')
    overly.classList.remove('hidden')
}

x.addEventListener('click', close)
overly.addEventListener('click', close)
document.addEventListener('keydown', (e) =>{
    if(e.which == 27){
        close()
    }
})
function close(){
    modl.classList.add('hidden')
    overly.classList.add('hidden')
}