
///
// Function definitions for all the required functions
/// 

// The currently selected colour (also applied when using colourFill)
// Should perhaps be renamed to main colour or current colour or something similar
function penColour() {

}

// Sets the colour of the background (could be hidden under "more settings" perhaps?)
function backgroundColour() {

}

// Sets the colour of the grid lines, if there are any (otherwise option can be hidden to clear clutter)
function gridColour() {

}

// Fills all connecting boxes of the same colour with current colour
function colourFill() {

}

// Grab the colour of the selected element
function colourGrabber() {

}

// Eraser mode if selected (perhaps toggle name is misleading?)
function toggleEraser() {

}

function toggleRainbow() {

}

function toggleShadowing() {

}

function toggleLighten() {

}

function clearGridBoard(gridBoard) {
    // Clear the board of previous boxes:
    const previousGridBoxes = document.body.querySelectorAll('.grid-box');
    const previousGridBoxesArray = Array.from(previousGridBoxes);
    previousGridBoxesArray.forEach((gridBox) => {
        const removedBox = gridBoard.removeChild(gridBox);
    })
}

function generateGrid(gridSize) {
    // Board element
    let board = document.querySelector("#eas-painting-board");

    // Clear the board
    clearGridBoard(board);

    // Generate new grid-boxes
    let gridBoxes = [];
    for (let i = 0; i < (gridSize * gridSize); i++) {
        let el = document.createElement('div');
        // Add attributes, etc...
        el.setAttribute('class', `grid-box grid-box-${i + 1}`);

        gridBoxes.push(el);
    }
    
    // Push nodes to DOM
    board.append(...gridBoxes);

    // Takes three parameters, grid size, grid border size and grid box border radius
}

function toggleGridLines() {
    
}

function setGridLinesSize() {

}

function clearGrid() {
    // Get the current grid-size:
    const gridSize = document.body.querySelector("#grid-size-indicator").value;
    // We can use this funtion to "reset/clear" the grid board
    handleGridSizeChange(gridSize);
}

function exportGrid() {
    // html2canvas
    // Export canvas as PNG
    // the element we need to convert to canvas is #eas-painting-board
}


// Run the Etch-A-Sketch
// Takes default set-up parameters
// Handles the eventHandlers
function runEAS() {

}

function handleGridSizeChange(gridSize) {
    let safeGridSize = 0;
    // Handle grid size for non integer values:
    safeGridSize = Math.floor(gridSize);
    // Handle grid size for outside range values:
    if (safeGridSize > 100) {
        safeGridSize = 100;
    }
    if (safeGridSize < 2) {
        safeGridSize = 2;
    }
    // Generate grid with correct grid size
    generateGrid(safeGridSize);
    // Update grid-size-indicator in settings pane
    gridSizeIndicator = document.body.querySelector("#grid-size-indicator");
    gridSizeIndicator.value = safeGridSize;
    // Update grid-size-slider in settings pane
    gridSizeSlider = document.body.querySelector("#grid-size-slider");
    gridSizeSlider.value = safeGridSize;
    // Update grid container style to correct # of columns
    const board = document.body.querySelector("#eas-painting-board");
    let gridColumns = "";
    for (let i = 0; i < safeGridSize; i++) {
        gridColumns += " 1fr "
    }
    gridColumns = gridColumns.trim();
    board.style.gridTemplateColumns = gridColumns;
}



///
// Event listeneres to run our Etch-A-Sketch
/// 

// Listen for grid size slider value
const sliders = document.querySelectorAll(".slider");
sliders.forEach((slider) => {
    slider.addEventListener('change', (e) => {
        handleGridSizeChange(e.target.value);
    })
})

// Listen for grid size input value
const gridSizeInput = document.querySelector("#grid-size-indicator");
gridSizeInput.addEventListener('change', (e) => {
    handleGridSizeChange(e.target.value);
})

// Listen for painting
const gridBoxes = document.querySelectorAll(".grid-box");
gridBoxes.forEach((gridBox) => {
    if (hoverPainting) {
        // Run painting function on hoverEvents
        gridBox.addEventListener('hover', (e) => {
            
        })
    }
    if (clickPainting) {
        // Run painting function on keyDown events?
    }
})