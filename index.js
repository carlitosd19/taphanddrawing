 
 const imagePath='./img/citytransit.jpg';
 const image= new Image();
 image.src=imagePath;
const initCanvas =(id)=> {

    
    return new fabric.Canvas(id, {
        width:1200,
        height:500,
        backgroundColor:'gray',
        selection:false
    });
}

const setBackground = (url,canvas) => {
        fabric.Image.fromURL(url,(img)=> {
            // img.set({
            //     left: 0,
            //     top: 0
            //     // Scale image to fit width / height ?
            //   });
            //   img.scaleToHeight(300);
            //   img.scaleToWidth(820);

        canvas.backgroundImage = img
        canvas.requestRenderAll()
    });
}

const toggleMode =(mode)=> {
    if(mode === modes.pan){
        if(currentMode === modes.pan){
            currentMode='';
            //canvas.isDrawingMode=true;
            canvas.requestRenderAll();
        }
        else {
            currentMode = modes.pan;
            canvas.isDrawingMode=false;
            canvas.requestRenderAll();
        }
    }
    else if(mode === modes.drawing) {
        if(currentMode === modes.drawing){
            currentMode = '';
            canvas.isDrawingMode=false;
            canvas.requestRenderAll();
        }
        else {
            currentMode = modes.drawing;
            canvas.isDrawingMode=true;
            canvas.requestRenderAll();
        }
    }
    console.log(mode)
}

const setPanEvents =(canvas)=>{     
            //mouse : over
            canvas.on('mouse:move',(event) =>{
                //console.log(event);
            // if (mousePressed && currentMode === modes.pan) { 

                if (mousePressed && currentMode === modes.pan) 
                { 
                    canvas.setCursor('grab');
                    canvas.isDrawingMode=false;
                    
                    canvas.requestRenderAll();

                    const mEvent= event.e;
                    const delta = new fabric.Point(mEvent.movementX,mEvent.movementY);
                    canvas.relativePan(delta);
                }               
            });
            //mouse : down
            canvas.on('mouse:down',(event) =>{
                //console.log(event);
                mousePressed = true;

                if(currentMode === modes.pan)
                {       
                    canvas.setCursor('grab');
                    canvas.requestRenderAll();
                }
            });
            //mouse : up
            canvas.on('mouse:up',(event) =>{
                //console.log(event);
                mousePressed = false;    
                canvas.setCursor('default');
                canvas.requestRenderAll(); 
            });
}

const canvas = initCanvas('canvas');
let mousePressed = false;
let touchPressed = false;

let currentMode;
const modes = {
    pan:'pan',
    drawing:'drawing'
}

setBackground(imagePath,canvas);

setPanEvents(canvas);