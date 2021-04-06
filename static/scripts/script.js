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

        console.log('====================')
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
function elmnt(el, cls='', inText){
    const myElmt = document.createElement(el)
    if(cls.split(' ').length > 1){
        for (c of cls.split(' ')){
            myElmt.classList.add(c)
        }
    } else{
        myElmt.className = cls
    }

    myElmt.innerHTML=inText

    console.log(myElmt)
    return myElmt
}