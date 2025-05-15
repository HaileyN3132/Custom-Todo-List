/* CREATE SHAPE */
const shapeBtns = document.querySelectorAll('.shape-btn');
shapeBtns.forEach(btn => btn.addEventListener('click', () => {
    createShape(btn);   // Pass the btn element
}));


function createShape(btn){
    const todoContainer = document.querySelector(".todo-container");

    switch(btn.textContent){
        case 'Rectangle':
            todoContainer.addEventListener('click', (event) => {
                createRectangle(event, todoContainer);
            }, {once:true});
            break;
        case 'Circle':
            console.log('Create Circle!');
            break;
        case 'Triangle':
            console.log('Create Triangle!');
            break;
    }
}

function createRectangle(event, todoContainer){
    console.log(`(${event.clientX}, ${event.clientY})`);
    //create the shape-container
    const shapeDiv = document.createElement('div');
    shapeDiv.classList.add('shape-container');
    shapeDiv.style.position = "absolute";       // This make the div display anywhere
    shapeDiv.style.left = event.clientX + "px";
    shapeDiv.style.top = event.clientY + "px";

    // create the shape
    const shape = document.createElement('div');
    shape.classList.add('rectangle');


    // remove button
    const  removeShapeBtn = document.createElement('button');
    removeShapeBtn.textContent = 'X';
    removeShapeBtn.classList.add('remove-shape-btn');
    removeShapeBtn.addEventListener('click', () =>{
        shapeDiv.remove();
    });



    //Append the rectangle to its container
    shapeDiv.append(shape, removeShapeBtn);

    //Append new shape to the container
    todoContainer.append(shapeDiv);
    
}






/* CREATE TASK */
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

    //Create checkbox to keep track task status
    const statusTask = document.createElement('input');
    statusTask.type = 'checkbox';
    statusTask.style.color = 'gray';
    
    


    //create input
    const inputTask = document.createElement('input');
    inputTask.classList.add('task-input');
    inputTask.type = 'text';

    //Handler for DONE task
    statusTask.addEventListener('click', () =>{
        taskDiv.classList.toggle('checked-task');
        inputTask.classList.toggle('done-input-task');
    });


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
    taskDiv.append(statusTask, inputTask, mirror,removeBtn);

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
