
///
// Function definitions for all the required functions
///


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
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

    // Apply event listeners
    paintingListeners()
}


function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0');   // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}


function hexToHSL(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        r = parseInt(result[1], 16);
        g = parseInt(result[2], 16);
        b = parseInt(result[3], 16);
        r /= 255, g /= 255, b /= 255;
        const max = Math.max(r, g, b), min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        if(max == min){
        h = s = 0; // achromatic
        }else{
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
        }
    let HSL = new Object();
    HSL['h']=h;
    HSL['s']=s;
    HSL['l']=l;
    return HSL;
}


// Generate rainbow colours
function rainbowColour(value) {
    // We will generate a random HSL colour so we can control S and L better (for human visible reasons)
    let H = 0;
    let S = 100;
    let L = 50;
    if (value) {
        // Generate another colour based on previous value (keep trail going)
        if (value - 10 >= 360) {
            H = 0 + (Math.random() * 10);
        }
        else {
            H = value + (Math.random() * 10);
        }
    }
    else {
        // Generate a completely random colour
        H = Math.random() * 360;
    }
    // Returns [hexValue, Hue (HSL)]
    return [hslToHex(H, S, L), H]
}


// Lightened colour generator
function lightenColor(colour) {

    return newColour;
}


// Darkened colour generator
function darkenColour(colour) {

    return newColour;
}


// Paint the board
function paint(e) {
    e.preventDefault();
    // Return if event.target is not a grid-box (so we don't accidentally change something on EAS-painting-board)
    if (!e.target.classList.contains("grid-box")) {
        return;
    }
    let colour = document.querySelector("#painting-colour").dataset.colour;
    e.target.style.background = colour;
    console.log(e.target);
}


function startClickPaint(e) {
    paint(e);
    const gridBoxes = document.querySelectorAll(".grid-box");
    gridBoxes.forEach((gridBox) => {
        gridBox.addEventListener('mouseover', paint);
    })
}


function stopClickPaint() {
    const gridBoxes = document.querySelectorAll(".grid-box");
    gridBoxes.forEach((gridBox) => {
        gridBox.removeEventListener('mouseover', paint);
    })
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


// Listen for clear button click
const clearButton = document.querySelector("#clear-grid-button");
clearButton.addEventListener("click", () => {
    clearGrid();
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
            paintingListeners();
        })
    }
    // For all Mode buttons:
    if (button.classList.contains("mode")) {
        button.addEventListener('click', () => {
            // // Right now the fill function does not work so this is disabled.
            // // Update the paintingMode to the buttons data- attr
            // const paintingMode = document.querySelector("#painting-mode-info");
            // paintingMode.dataset.mode = button.dataset.button;
            // paintingMode.textContent = capitalizeFirstLetter(button.dataset.button);
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
    const board = document.querySelector("#eas-painting-board");

    // Types = click or hover
    const type = document.querySelector("#painting-type-info").dataset.type;

    if (type === "hover") {
        gridBoxes.forEach((gridBox) => {
            gridBox.removeEventListener('mousedown', startClickPaint);
            gridBox.removeEventListener('mouseup', stopClickPaint);

            // Run painting function on hoverEvents
            gridBox.addEventListener('mouseover', paint);
        })
    }

    if (type === "click") {
        gridBoxes.forEach((gridBox) => {
            // Clear all other painting event listeners on the painting board:
            gridBox.removeEventListener('mouseover', paint, false);
        })

        // On mousedown inside board, apply eventlisteners for mouseover
        board.addEventListener('mousedown', startClickPaint);

        // If mouseup, remove event listeners - no longer painting
        board.addEventListener('mouseup', stopClickPaint);
    }
}


// Default values for grid:
const initialGridSize = 16;
const initialGridBorderRadius = 26;
const intitalGridBoxSpacing = 4;

// Generate grid when page loads first time:
window.onload = () => {
    handleGridSizeChange(initialGridSize);
    handleGridBoxBorderRadiusChange(initialGridBorderRadius);
    handleGridLineSizeChange(intitalGridBoxSpacing);
}