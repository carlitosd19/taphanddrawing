 
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
let touchPressed = false;


setBackground(imagePath,canvas);

//mouse : over
canvas.on('mouse:move',(event) =>{
    //console.log(event);
    // if (mousePressed) { 
    //  const mEvent= event.e;
    //  const delta = new fabric.Point(mEvent.movementX,mEvent.movementY);
    //  canvas.relativePan(delta);
    // }
});
//mouse : down
canvas.on('mouse:down',(event) =>{
    //console.log(event);
    //mousePressed = true;
    
});
//mouse : up
canvas.on('mouse:up',(event) =>{
    //console.log(event);
   // mousePressed = false;     
});


canvas.on({
    'touch:gesture': function(e) {
        if (e.e.touches && e.e.touches.length == 2) {
            pausePanning = true;
            var point = new fabric.Point(e.self.x, e.self.y);
            if (e.self.state == "start") {
                zoomStartScale = self.canvas.getZoom();
            }
            var delta = zoomStartScale * e.self.scale;
            self.canvas.zoomToPoint(point, delta);
            pausePanning = false;
        }
    },
    'object:selected': function() {
        pausePanning = true;
    },
    'selection:cleared': function() {
        pausePanning = false;
    },
    'touch:drag': function(e) {
        if (pausePanning == false && undefined != e.e.layerX && undefined != e.e.layerY) {
            currentX = e.e.layerX;
            currentY = e.e.layerY;
            xChange = currentX - lastX;
            yChange = currentY - lastY;

            if( (Math.abs(currentX - lastX) <= 50) && (Math.abs(currentY - lastY) <= 50)) {
                var delta = new fabric.Point(xChange, yChange);
                canvas.relativePan(delta);
            }

            lastX = e.e.layerX;
            lastY = e.e.layerY;
        }
    }
});
