
///
// Function definitions for all the required functions
///

// Capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

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

// Painting mode & settings
function changePaintingMode(mode) {
    // Hover or Click to draw mode?
    if (mode === "hover") {
        // Set data-mode to corret mode 
        // Update the painting mode info/indicator
    }
    if (mode === "click") {

    }
}

function changePaintingType(type) {
    // Pen or Fill type?
}

function changePaintingColouring(colouring) {
    // Colour, random colour, lighting, shadowing, or erasing?
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


function handleGridBoxBorderRadiusChange(borderRadius) {
    let safeBorderRadius = 0;
    // Handle grid size for non integer values:
    safeBorderRadius = Math.floor(borderRadius);
    // Handle grid size for outside range values:
    if (safeBorderRadius > 100) {
        safeBorderRadius = 100;
    }
    if (safeBorderRadius < 0) {
        safeBorderRadius = 0;
    }
    // Update grid-box-border-radius-indicator in settings pane
    gridBoxBorderRadiusIndicator = document.body.querySelector("#grid-box-br-indicator");
    gridBoxBorderRadiusIndicator.value = safeBorderRadius;
    // Update grid-size-slider in settings pane
    gridSizeSlider = document.body.querySelector("#grid-box-br-slider");
    gridSizeSlider.value = safeBorderRadius;
    // Update grid-box border-radius:
    let rootElement = document.querySelector(":root");
    rootElement.style.setProperty("--grid-box-border-radius", `${safeBorderRadius}%`);
}


function handleGridLineSizeChange(gridLineSize) {
    let safeGridLineSize = 0;
    // Handle grid size for non integer values:
    // Rounds to nearest 0.5
    safeGridLineSize = Math.round(gridLineSize*2)/2;
    // Handle grid size for outside range values:
    if (safeGridLineSize > 10) {
        safeGridLineSize = 10;
    }
    if (safeGridLineSize < 0) {
        safeGridLineSize = 0;
    }
    // Update grid-line-size-indicator in settings pane
    gridLineSizeIndicator = document.body.querySelector("#grid-line-size-indicator");
    gridLineSizeIndicator.value = safeGridLineSize;
    // Update grid-line-size-slider in settings pane
    gridLineSizeSlider = document.body.querySelector("#grid-line-size-slider");
    gridLineSizeSlider.value = safeGridLineSize;
    // Update grid-line-size:
    let rootElement = document.querySelector(":root");
    rootElement.style.setProperty("--grid-line-size", `${safeGridLineSize}px`);
}


function handleBoardColourChange(boardColour) {
    const boardBackground = document.querySelector("#eas-painting-board");
    boardBackground.style.background = boardColour;
}


function handlePaintingColourChange(paintingColour) {
    const paintingColourInput = document.querySelector("#painting-colour");
    paintingColourInput.dataset.colour = paintingColour;
}



///
// Event listeneres to run our Etch-A-Sketch
/// 

// Listen for grid size slider value
const gridSliders = document.querySelectorAll(".grid-size-slider");
gridSliders.forEach((slider) => {
    slider.addEventListener('change', (e) => {
        handleGridSizeChange(e.target.value);
    })
})

// Listen for grid size input value
const gridSizeInput = document.querySelector("#grid-size-indicator");
gridSizeInput.addEventListener('change', (e) => {
    handleGridSizeChange(e.target.value);
})

// Listen for grid size slider value
const gridBoxBrSliders = document.querySelectorAll(".grid-box-br-slider");
gridBoxBrSliders.forEach((slider) => {
    slider.addEventListener('change', (e) => {
        handleGridBoxBorderRadiusChange(e.target.value);
    })
})

// Listen for grid size input value
const gridBoxBrInput = document.querySelector("#grid-box-br-indicator");
gridBoxBrInput.addEventListener('change', (e) => {
    handleGridBoxBorderRadiusChange(e.target.value);
})

// Listen for grid line size slider value
const gridLineSizeSliders = document.querySelectorAll("#grid-line-size-slider");
gridLineSizeSliders.forEach((slider) => {
    slider.addEventListener('change', (e) => {
        handleGridLineSizeChange(e.target.value);
    })
})

// Listen for grid line size input value
const gridLineSizeInput = document.querySelector("#grid-line-size-indicator");
gridLineSizeInput.addEventListener('change', (e) => {
    handleGridLineSizeChange(e.target.value);
})


// Listen for background/border line colour input value
const boardColour = document.querySelector("#board-colour");
boardColour.addEventListener('change', (e) => {
    handleBoardColourChange(e.target.value);
}) 


// Listen for pen/fill colour input value
const paintingColour = document.querySelector("#painting-colour");
paintingColour.addEventListener('change', (e) => {
    handlePaintingColourChange(e.target.value);
})


// Listen for button clicks changing the settings
const buttons = document.querySelectorAll(".button");
buttons.forEach((button) => {
    // For all Type buttons:
    if (button.classList.contains("type")) {
        button.addEventListener('click', () => {
            // Update the paintingType to the buttons data- attr
            const paintingType = document.querySelector("#painting-type-info");
            paintingType.dataset.type = button.dataset.button;
            paintingType.textContent = capitalizeFirstLetter(button.dataset.button);
        })
    }
    // For all Mode buttons:
    if (button.classList.contains("mode")) {
        button.addEventListener('click', () => {
            // Update the paintingMode to the buttons data- attr
            const paintingMode = document.querySelector("#painting-mode-info");
            paintingMode.dataset.mode = button.dataset.button;
            paintingMode.textContent = capitalizeFirstLetter(button.dataset.button);
        })
    }
    // For all Setting buttons:
    if (button.classList.contains("setting")) {
        button.addEventListener('click', () => {
            // Update the paintingSetting to the buttons data- attr
            const paintingSetting = document.querySelector("#painting-setting-info");
            paintingSetting.dataset.setting = button.dataset.button;
            paintingSetting.textContent = capitalizeFirstLetter(button.dataset.button);
        })
    }
})


// Listen for painting by placing event listeners on grid-boxes:
function paintingListeners() {
    const gridBoxes = document.querySelectorAll(".grid-box");
    gridBoxes.forEach((gridBox) => {
        // Modes = [hoverPainting, clickPainting]
        const mode = document.querySelector("#painting-mode-info").dataset.mode;
        console.log(mode);
        if (mode) {
            // Clear all other painting event listeners on the painting board:
            gridBox.removeEventListener('mousedown');

            // Run painting function on hoverEvents
            gridBox.addEventListener('hover', (e) => {
                
            })
        }
        if (mode) {
            // Clear all other painting event listeners on the painting board:
            gridBox.removeEventListener('hover');

            // Run painting function on keyDown events?
            gridBox.addEventListener('mousedown', (e) => {
                
            })
        }
    })
}