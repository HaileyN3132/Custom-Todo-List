/*Change the background of todo list*/
const bgList = document.querySelector('.bg-color-list');
bgList.addEventListener('input', () => {
    const bodyTag = document.getElementsByTagName("body")[0];
    bodyTag.style.backgroundColor = bgList.value;
});



/* disable/enable DRAG button */
let draggable = false;
const dragBtn = document.getElementById('drag-btn');
dragBtn.addEventListener('click', () => {
    dragBtn.classList.toggle('enable-drag');
    draggable = draggable? false : true;
    
});



/* Text Box */
const textBoxBtn = document.getElementById('text-box-btn');
textBoxBtn.addEventListener('click', createTextBox);

function createTextBox(){

    const textDiv = document.createElement('div');
    textDiv.classList.add('text-container');

    const textBox = document.createElement('textarea');
    textBox.classList.add('text-box');

    const removeTextBtn = document.createElement('button');
    removeTextBtn.classList.add('remove-textbox-btn');
    removeTextBtn.textContent = 'X';

    // Handlder remove text-area
    removeTextBtn.addEventListener('click', () =>{
        textDiv.remove();   
    });

    textDiv.append(textBox, removeTextBtn);
    
    

    // First time create
    const todoContainer = document.querySelector('.todo-container');
    todoContainer.addEventListener('click', (event) =>{
        textDiv.style.left = event.clientX + "px";
        textDiv.style.top = event.clientY + "px";
        todoContainer.append(textDiv);
    }, {once:true});


    //Handler for drag and drop
    let startX = 0, startY = 0;

    textDiv.addEventListener('mousedown', (event) => {
        startX = event.clientX;
        startY = event.clientY;

        // Only drag when enable
        if(draggable){
             
            document.addEventListener('mousemove', dragText);

            document.addEventListener('mouseup', () =>{
                document.removeEventListener('mousemove', dragText);  
            });
        }
        
    });

 

    function dragText(event){
        console.log('Mouse MOVE');
        
        const newX = startX - event.clientX;
        const newY = startY - event.clientY;

        startX = event.clientX;
        startY = event.clientY;

        textDiv.style.left = (textDiv.offsetLeft - newX) + 'px';
        textDiv.style.top = (textDiv.offsetTop - newY) + 'px';
        
    }
    

}




/*COLOR FILL*/
const colorInput = document.getElementById('color-input');
colorInput.addEventListener('input', () => {
    const items = document.querySelectorAll('.selected')
    items.forEach(item => {
        item.style.backgroundColor = colorInput.value;
        
    });
});




/* ROTATION  */
let curDegree = 0;

const degreeInput = document.getElementById('degree-input');
//Handler when user input specific value
degreeInput.addEventListener('input', () => {
    curDegree = Number(degreeInput.value);
    rotate();
});

function rotate(){
    //Update the input to display
    degreeInput.value = curDegree;   

    const items = document.querySelectorAll('.selected')
    items.forEach(item => {
        item.style.transform = `rotate(${curDegree}deg)`;
    
    });
}


//Handler when up-btn click
const upDegreeBtn = document.getElementById('up-deg');
upDegreeBtn.addEventListener('click', () => {
    curDegree++;
    rotate();
});

//Handler when up-btn click
const downDegreeBtn = document.getElementById('down-deg');
downDegreeBtn.addEventListener('click', () => {
    curDegree--;
    rotate();
});


//Display current degree if SINGLE element is selected when hover container
const rotateContainer = document.querySelector(".rotate-container");
rotateContainer.addEventListener('mouseover', () => {
   const items = document.querySelectorAll('.selected');
    if(items.length == 1){
        items.forEach(item => {
            degreeInput.value = item.style.transform.match(/\d+/g);
        });
    }else{
        degreeInput.value = '0';
    } 
});








/* CREATE SHAPE */

//Dropdown menu control
const defaultShapeBtn = document.getElementById('default-shape-btn');
defaultShapeBtn.addEventListener('click', () => {
    const icon = defaultShapeBtn.querySelector('span');
    console.log(`Default = ${icon.textContent}`);
    createShape(icon);
});

const shapeDropDownBtn = document.getElementById('shape-drop-down-btn');
const dropdownContent = document.getElementById('shape-drop-down-content');

shapeDropDownBtn.addEventListener('click', () => {
    dropdownContent.classList.toggle('enable-shape-drop-down-content');
});

dropdownContent.addEventListener('click', () => {
    dropdownContent.classList.toggle('enable-shape-drop-down-content');
});





const shapeBtns = document.querySelectorAll('.shape-btn');
shapeBtns.forEach(btn => btn.addEventListener('click', () => {
    // Create element base on clicked shape
    createShape(btn);   

    //Swap icons of the selected button to default-shape-btn
    const defaultIcon = defaultShapeBtn.querySelector("span");
    const tempIcon = defaultIcon.textContent;
    defaultIcon.textContent = btn.textContent;
    btn.textContent = tempIcon;
}));


function createShape(btn){
    const todoContainer = document.querySelector(".todo-container");
    
    const shapeDiv = document.createElement('div');
    const removeShapeBtn = document.createElement('button');
    
    switch(btn.textContent){
        case 'rectangle':
            todoContainer.addEventListener('click', (event) => {
                createRectangle(event,shapeDiv);
                renderRemoveShapeBtn(removeShapeBtn);       
                shapeDiv.append(removeShapeBtn);
            }, {once:true});
            break;


        case 'circle':
            todoContainer.addEventListener('click', (event) => {
                createCircle(event,shapeDiv);
                renderRemoveShapeBtn(removeShapeBtn);       
                shapeDiv.append(removeShapeBtn);
            }, {once:true});
            break;
        
        

        
        case 'square':
            console.log('Create Square!');
            todoContainer.addEventListener('click',(event) =>{
                createSquare(event, shapeDiv);
                renderRemoveShapeBtn(removeShapeBtn);
                shapeDiv.append(removeShapeBtn);
            }, {once:true});
            break;
    }


    // Handler for remove btn
    removeShapeBtn.addEventListener('click', () =>{
        shapeDiv.remove();
    });


    //Handler for drag and drop
    let startX = 0, startY = 0;

    shapeDiv.addEventListener('mousedown', (event) => {
        startX = event.clientX;
        startY = event.clientY;

        // Only drag when enable
        if(draggable){        
            document.addEventListener('mousemove', dragShape);

            document.addEventListener('mouseup', () =>{
                document.removeEventListener('mousemove', dragShape);  
            });
        }
    });

 

    function dragShape(event){
        console.log('Mouse MOVE');
        
        const newX = startX - event.clientX;
        const newY = startY - event.clientY;

        startX = event.clientX;
        startY = event.clientY;

        shapeDiv.style.left = (shapeDiv.offsetLeft - newX) + 'px';
        shapeDiv.style.top = (shapeDiv.offsetTop - newY) + 'px';
        
    }

    // Display/hide remove button + resize
    shapeDiv.addEventListener('mouseover', () => {
        // remove btn
        removeShapeBtn.style.visibility = 'visible';


        // Resize 
        if(draggable){
            shapeDiv.children[0].classList.add('disable-resize');
            shapeDiv.children[0].classList.add('enable-move-shape');
        }else{
            shapeDiv.children[0].classList.remove('disable-resize');
            shapeDiv.children[0].classList.remove('enable-move-shape');
        }
    });

    shapeDiv.addEventListener('mouseleave', () => {
        removeShapeBtn.style.visibility = 'hidden';
    });


    //DOUBLE clicks = SELECTED SHAPE
    shapeDiv.addEventListener('dblclick', () =>{
        const targetShape = shapeDiv.querySelector('.shape');
        targetShape.classList.toggle('selected');
        
    });

    
    //Append shapeDiv to the container
    todoContainer.append(shapeDiv);
}


// Style the shape-container
function renderShapeDiv(event,shapeDiv){
    shapeDiv.classList.add('shape-container');
    shapeDiv.style.position = "absolute";       // This make the div display anywhere
    shapeDiv.style.left = event.clientX + "px";
    shapeDiv.style.top = event.clientY + "px";
}

// Style the button
function renderRemoveShapeBtn(removeShapeBtn){
    removeShapeBtn.textContent = 'X';
    removeShapeBtn.classList.add('remove-shape-btn');

}

function createRectangle(event, shapeDiv){
    
    renderShapeDiv(event,shapeDiv);

    // create RECTANGLE shape
    const shape = document.createElement('div');
    shape.classList.add('rectangle');
    shape.classList.add('shape');       // Important - use to activate selected function
    


    //Append the rectangle to its shape container
    shapeDiv.append(shape);
}

function createCircle(event, shapeDiv){
    renderShapeDiv(event, shapeDiv);

    // create CIRCLE shape
    const shape = document.createElement('div');
    shape.classList.add('circle');
    shape.classList.add('shape');           // Important - use to activate selected function

    //Append the circle to its shape container
    shapeDiv.append(shape);
}

function createSquare(event, shapeDiv){
    renderShapeDiv(event, shapeDiv);

    // create SQUARE shape
    const shape = document.createElement('div');
    shape.classList.add('square');
    shape.classList.add('shape');
    
    //Append the circle to its shape container
    shapeDiv.append(shape);

}


/*
function createTriangle(event, shapeDiv){
    renderShapeDiv(event, shapeDiv);

    const shape = document.createElement('div');
    shape.classList.add('triangle');
    shape.classList.add('shape');
    shapeDiv.append(shape);

}

*/



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
    mirror.classList.add('mirror-span');
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

    
    // Hide/display remove button
    taskDiv.addEventListener('mouseover', () => {
        removeBtn.style.visibility = 'visible';
        
    });

    taskDiv.addEventListener('mouseleave', () => {
        removeBtn.style.visibility = 'hidden';
    });

    
    // Append taskDiv into main container
    const todoContainer = document.querySelector(".todo-container");
    todoContainer.append(taskDiv);
    

    //Remove the addTask event handler after each clicked
    todoContainer.removeEventListener('click', addTaskEvent);

}
