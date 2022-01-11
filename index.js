const imagePath = './img/citytransit.jpg';
const image = new Image();
image.src = imagePath;

(function () {
  var defaultOnTouchStartHandler = fabric.Canvas.prototype._onTouchStart;
  fabric.util.object.extend(fabric.Canvas.prototype, {
    _onTouchStart: function (e) {
      var target = this.findTarget(e);
      // if allowTouchScrolling is enabled, no object was at the
      // the touch position and we're not in drawing mode, then
      // let the event skip the fabricjs canvas and do default
      // behavior
      if (this.allowTouchScrolling && !target && !this.isDrawingMode) {
        // returning here should allow the event to propagate and be handled
        // normally by the browser
        return;
      }

      // otherwise call the default behavior
      defaultOnTouchStartHandler.call(this, e);
    },
  });
})();

const initCanvas = (id) => {
  return new fabric.Canvas(id, {
    width: 1200,
    height: 1400,
    backgroundColor: 'gray',
    selection: false,
    controlsAboveOverlay: true,
    centeredScaling: true,
    allowTouchScrolling: true,
  });
};

const setBackground = (url, canvas) => {
  fabric.Image.fromURL(url, (img) => {
    canvas.backgroundImage = img;
    canvas.requestRenderAll();
  });
};

const toggleMode = (mode) => {
  if (mode === modes.pan) {
    if (currentMode === modes.pan) {
      currentMode = '';
      //canvas.isDrawingMode=true;
      canvas.requestRenderAll();
    } else {
      currentMode = modes.pan;
      canvas.isDrawingMode = false;
      canvas.requestRenderAll();
    }
  } else if (mode === modes.drawing) {
    if (currentMode === modes.drawing) {
      currentMode = '';
      canvas.isDrawingMode = false;
      canvas.requestRenderAll();
    } else {
      //change the brush
      //canvas.freeDrawingBrush = new fabric.SprayBrush(canvas);
      //   canvas.freeDrawingBrush.color = 'red';
      //   canvas.freeDrawingBrush.width = 15;
      currentMode = modes.drawing;
      canvas.freeDrawingBrush.color = color;
      canvas.isDrawingMode = true;
      canvas.requestRenderAll();
    }
  }
  //console.log(mode)
};

const setPanEvents = (canvas) => {
  //mouse : over
  canvas.on('mouse:move', (event) => {
    //console.log(event);
    // if (mousePressed && currentMode === modes.pan) {

    if (mousePressed && currentMode === modes.pan) {
      canvas.setCursor('grab');
      canvas.isDrawingMode = false;

      canvas.requestRenderAll();

      const mEvent = event.e;
      const delta = new fabric.Point(mEvent.movementX, mEvent.movementY);
      canvas.relativePan(delta);
    }
  });
  //mouse : down
  canvas.on('mouse:down', (event) => {
    //console.log(event);
    mousePressed = true;

    if (currentMode === modes.pan) {
      canvas.setCursor('grab');
      canvas.requestRenderAll();
    }
  });
  //mouse : up
  canvas.on('mouse:up', (event) => {
    //console.log(event);
    mousePressed = false;
    canvas.setCursor('default');
    canvas.requestRenderAll();
  });
};

const clearCanvas = (canvas) => {
  canvas.getObjects().forEach((o) => {
    if (o !== canvas.backgroundImage) {
      canvas.remove(o);
    }
  });
};

const setColorListener = () => {
  const picker = document.getElementById('colorPicker');
  picker.addEventListener('change', (event) => {
    color = event.target.value;
    canvas.freeDrawingBrush.color = color;
  });
};

const canvas = initCanvas('canvas');
let mousePressed = false;
let color = '#000000';

let currentMode;
const modes = {
  pan: 'pan',
  drawing: 'drawing',
};

setBackground(imagePath, canvas);

setPanEvents(canvas);

setColorListener();
