 
 const imagePath='./img/citytransit.jpg';
 const image= new Image();
 image.src=imagePath;
const initCanvas =(id)=> {

    
    return new fabric.Canvas(id, {
        width:500,
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

const canvas = initCanvas('canvas');
let mousePressed = false;


setBackground(imagePath,canvas);

//mouse : over
canvas.on('mouse:move',(event) =>{
    //console.log(event);
    if (mousePressed) { 
     const mEvent= event.e;
     const delta = new fabric.Point(mEvent.movementX,mEvent.movementY);
     canvas.relativePan(delta);
    }
});
//mouse : down
canvas.on('mouse:down',(event) =>{
    //console.log(event);
    mousePressed = true;
    
});
//mouse : up
canvas.on('mouse:up',(event) =>{
    //console.log(event);
    mousePressed = false;     
});
