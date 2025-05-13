const addTaskBtn = document.getElementById('add-task-btn');


addTaskBtn.addEventListener('click', () => {
    console.log('Add Btn clicked!');
    
    // Add event listener for container
    const todoContainer = document.querySelector(".todo-container");
    todoContainer.addEventListener('click', addTaskEvent);
    
});

const addTaskEvent = (event) =>{
    const x = event.clientX;
    const y = event.clientY;
    createTask(x,y);
}


function createTask(x, y){
    // Create taskDiv
    const taskDiv = document.createElement('div');
    taskDiv.classList.add('task-container');
    taskDiv.style.position = "absolute";
    taskDiv.style.left = x + "px";
    taskDiv.style.top = y + "px";
    console.log(`Task Div created at x = ${x} y = ${y}`);

    //Create checkbox
    const statusBox = document.createElement('input');
    statusBox.type = 'checkbox';


    //create input
    const inputTask = document.createElement('input');
    inputTask.classList.add('task-input');
    inputTask.type = 'text';


    //Create span for mirror
    const mirror = document.createElement('span');
    function updateWidth() {
        const valueToMeasure = inputTask.value || inputTask.placeholder || ' ';
        mirror.textContent = valueToMeasure;
        inputTask.style.width =  mirror.offsetWidth + 'px';
    }
    
    //Set-up auto sizing
    inputTask.addEventListener('input', updateWidth);
    //window.addEventListener('load', updateWidth);
   

    //Create remove button and set handle
    const removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.textContent = `X`;
    removeBtn.addEventListener('click', () =>{
        const ans = confirm(`Are you sure to remove task "${inputTask.value}" at(${x}, ${y})`);
        if(ans){
            taskDiv.remove();
            console.log('Item removed');
        }
        
        
    });

    // Append checkbox + input + span + button into taskDiv
    taskDiv.append(statusBox, inputTask, mirror,removeBtn);

    //Add handler when mouse DOWN on taskDiv
    let startX = 0, startY = 0;
    taskDiv.addEventListener('mousedown', (event) =>{
        console.log('mouse DOWN!');
        taskDivMouseDown(event);

        
    });
   

    function taskDivMouseDown(event){
        startX = event.clientX;
        startY = event.clientY;

        //Track motion on screen
        document.addEventListener('mousemove', taskDivMouseMove);

        document.addEventListener('mouseup', () =>{
            console.log('mouse UP!');
            document.removeEventListener('mousemove', taskDivMouseMove);     
        });
    
    }

    function taskDivMouseMove(event){
        console.log('Mouse MOVE');
        
        const newX = startX - event.clientX;
        const newY = startY - event.clientY;

        startX = event.clientX;
        startY = event.clientY;

        taskDiv.style.left = (taskDiv.offsetLeft - newX) + 'px';
        taskDiv.style.top = (taskDiv.offsetTop - newY) + 'px';
        
    }

    

    
    // Append taskDiv into main container
    const todoContainer = document.querySelector(".todo-container");
    todoContainer.append(taskDiv);
    

    //Remove the addTask event handler after each clicked
    todoContainer.removeEventListener('click', addTaskEvent);

}
