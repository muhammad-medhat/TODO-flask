document.querySelectorAll('.todo span').forEach(el=>{
    //console.log(el)
    el.style.width = el.dataset.prog
})
document.getElementById('addTask').addEventListener('click', e => {
    console.log(e)
    const tName = document.getElementById('tNme').value
    const tcont = document.getElementById('tCnt').value
    const data = {
        'name': tName, 
        'content': tcont
    }

    fetch('add_task', {
        method: 'post', 
        headers: {            
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((res)=>{
        return res.json()
    }).then((ret)=>{
        //update UI
        /**
         *      <!-- <div class="font-weight-bold">{{loop.index}}</div> -->
                    <div class='li-container'>


                        <div class="task-prog">Overall Progress: {{task[3]}}%
                            <span data-prog="{{task[3]}}%"></span>
                        </div>  
                    </div>
                    <div class="btn btn-delete">&cross;</div>
         */
        console.log('====================')
        console.log(ret)
        const li = document.createElement('li')
        
        const liDiv = document.createElement('div')
        liDiv.classList.add('li-container')

        const idDiv = document.createElement('div')
        idDiv.classList.add('task-id', 'text-left')
        idDiv.innerHTML=`ID: ${ret['todo']['id']}`
        liDiv.appendChild(idDiv)
        
        const nameDiv = document.createElement('div')
        nameDiv.classList.add('task-name', 'font-weight-bold')
        nameDiv.innerHTML=`${ret['todo']['name']}`
        liDiv.appendChild(nameDiv)


        const descDiv = document.createElement('div')
        descDiv.classList.add('task-desc')
        descDiv.innerHTML=`${ret['todo']['content']}`
        liDiv.appendChild(descDiv)


        li.appendChild(liDiv)
        document.getElementById('todoList').prepend(li)
        idDiv.classList.add('task-id', 'text-left')
        idDiv.innerHTML=`ID: ${ret}`

    })

})    
const postData = async (url='', data) => {

}