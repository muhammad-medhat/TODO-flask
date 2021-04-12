document.querySelectorAll('.todo span').forEach(el=>{
    //console.log(el)
    el.style.width = el.dataset.prog
})
document.querySelectorAll('.btn-delete').forEach(b=>{
    b.addEventListener('click', (e) => {
            const li = e.target.closest('li')
            const id = li.dataset.task_id
            console.log(`delete ../todos/${id}`)
            fetch(`/todos/${id}`, {
                    method: 'delete', 
                    headers: {            
                        'Content-Type': 'application/json'
                    }
                }).then((res)=>{
                    console.log(res)
                    return res.json()
                }).then((ret)=>{
                //update UI
                    console.log(ret)
                    document.getElementById('todoList').removeChild(li)
                    //li.classList.add('remove')
                })

        })
})
document.querySelectorAll('.btn-edit').forEach(b=>{
    b.addEventListener('click', e=>{
        const li = e.target.closest('li')
        const id = li.dataset.task_id
        const tName = li.dataset.name
        const tCont = li.dataset.cont
        const tProg = li.dataset.prog
        // console.log(id)
        /**
         * Change style of li
         */

        li.style.display='grid'
        // 1.Hide content
        li.innerHTML=''
        // 2.display controls for edit
        const fragment = document.createDocumentFragment();
        
        const ctls = createEdit(id, tName, tCont, tProg)
        const btn = document.createElement('button')
        btn.classList.add('btn', 'btn-primary')
        btn.innerText = 'Update'
        btn.addEventListener('click', btnEv=>{

            console.log(btnEv.target)
            const bdy = JSON.stringify({
                'name': ctls[0].value, 
                'content': ctls[1].value, 
                'prog': ctls[2].value
            })
            // Sending an update request to the endpoint
            //! Note: not tested yet
            fetch(`/todos/${id}/edit`, {
                method: 'patch', 
                body: bdy, 
                headers: {            
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                console.log(res)
                return res.json()
            }).then((ret)=>{
            //update UI
                console.log(ret)
                li.innerHTML=''
                li.appendChild(afterEdit(id, ret))
            })




        })
        fragment.appendChild(liDiv)
        fragment.appendChild(btn)            
        // 3.create a button to fire the update event
        
        li.appendChild(fragment)
        /**
            const cont = createEdit(id, tName, tCont, tProg)
            console.log(cont)
            cont.forEach(inp=>{
                console.log(inp)
                li.appendChild(inp)
            })         
         */
    })
})

document.getElementById('addTask').addEventListener('click', e => {
    console.log(e)
    const tName = document.getElementById('tNme').value
    const tcont = document.getElementById('tCnt').value
    const data = {
        'name': tName, 
        'content': tcont
    }
    fetch('/todos', {
        method: 'post', 
        headers: {            
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
    }).then((res)=>{
        return res.json()
    }).then((ret)=>{
        //update UI

        console.log(ret)
        const li = document.createElement('li')
        
        const liDiv = document.createElement('div')
        liDiv.classList.add('li-container')    

        liDiv.appendChild(elmnt('div', 'task-id text-left', 'ID: ' + ret['todo']['id']))
        liDiv.appendChild(elmnt('div', 'task-name font-weight-bold', ret['todo']['name']))
        liDiv.appendChild(elmnt('div', 'task-desc', ret['todo']['content']))

        li.appendChild(liDiv)
        li.appendChild(elmnt('div', 'btn btn-delete', '&cross;'))
        document.getElementById('todoList').prepend(li)
    })
})   

/**
 * Helper functions
 * */ 
function elmnt(el, cls='', inDisp, type=''){
    const myElmt = document.createElement(el)
    if(cls.split(' ').length > 1){
        for (c of cls.split(' ')){
            myElmt.classList.add(c)
        }
    } else{
        myElmt.className = cls
    }
    /**********************/
    if(typeof(inDisp) === "object"){
        myElmt.appendChild(inDisp)        
    } else {
        myElmt.innerHTML=inDisp
    }
    if(type){
        myElmt.type=type
    }
    // console.log(myElmt)
    return myElmt
}

function createElement(elType, elID, elVal){
    const el = document.createElement(elType)
    el.id = elID
    el.value = elVal
    return el
}
function createEdit(id, tName, tCont, tProg){
    // const tNameInp = createElement('input', `editN-${tid}`, tName)
    // const tContInp = createElement('textarea', `editC-${tid}`, tContent)
    // const tProgInp = createElement('input', `editP-${tid}`, tProg)
    // return [tNameInp, tContInp, tProgInp]

        // 2.display controls for edit
        const fragment = document.createDocumentFragment();
        const ctls = []

        const idDiv = elmnt('div', 'task-id text-left', `ID: ${id}`)
        
        const tNameInp = createElement('input', `editN-${id}`, tName)
        const nameDiv = elmnt('div', 'task-name font-weight-bold', tNameInp)

        const tContInp = createElement('textarea', `editC-${id}`, tCont)
        const ctntDiv = elmnt('div', 'task-desc', tContInp)

        const tProgInp = createElement('input', `editP-${id}`, tProg)
        const progDiv = elmnt('div', 'task-prog', tProgInp, type='number')


        /**
         * creating the li-container div
         * */
        liDiv = createElement('div', 'li-container', '')

        ctls.push(idDiv, nameDiv, ctntDiv, progDiv)
        for(ctl of ctls){
            liDiv.appendChild(ctl)
        }
        return [tNameInp, tContInp, tProgInp]
}
function afterEdit(id, jsn){
    /**
    <div class='li-container'>
        <div class="task-id text-left">
            ID: {{task.id}}
            <span id='btnEdit_{{task.id}}' class="btn btn-edit">&checkmark;</span>
            <span id='btnDelete_{{task.id}}' class="btn btn-delete">&cross;</span>                              
        </div>
        <div class="task-name font-weight-bold">
            {{task.name}}
        </div>

        <div class="task-desc">
            {{task.content}}
        </div>

        <div class="task-prog">Overall Progress: {{task.prog}}%
            <span data-prog="{{task.prog}}%"></span>
        </div>                    
    </div>  
     */
    const liDiv = createElement('div', 'li-container', '')

    const idDiv = elmnt('div', 'task-id text-left', `ID: ${id}`)
    const nameDiv = elmnt('div', 'task-name font-weight-bold', jsn['body']['name'])
    const ctntDiv = elmnt('div', 'task-desc',  jsn['body']['content'])
    const progDiv = elmnt('div', 'task-prog',  jsn['body']['prog'])

    liDiv.appendChild(idDiv)
    liDiv.appendChild(nameDiv)
    liDiv.appendChild(ctntDiv)
    liDiv.appendChild(progDiv)
    console.log(liDiv);
    return liDiv
}
