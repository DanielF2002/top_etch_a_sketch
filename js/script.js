const DELAY = 100;
let times = 0;

/**
 * Init the page by generate the matrix, and add listener to button.
 */
let init = () => {
    generateMatrix();

    // Add handler to button.
    let btn = document.querySelector("button");
    btn.addEventListener("click", btnClickHandler);
}

/**
 * Handles the button click event.
 * Pop up a prompt window to ask user to input the size of matrix.
 * The user input should be an integer and between [2, 100].
 * @param {Event} e The DOM event.
 */
let btnClickHandler = (e) => {
    let userInput = 0;
    while (isNaN(userInput) || userInput < 2 || userInput > 100) { // the input should be [2, 100].
        userInput = parseInt(prompt("Please enter the size of matrix between 2 and 100:"), 10);
    }
    generateMatrix(userInput);
}

/**
 * Generate the matrix.
 * @param {number} numbers The size of matrix, default is 16.
 */
let generateMatrix = (numbers = 16) => {
    let container = document.querySelector(".square-container");

    // Clear the existed matrix.
    let existedMatrix = document.querySelector(".matrix");
    if (existedMatrix != null) {
        container.removeChild(existedMatrix);
    }

    // Add new matrix.
    container.appendChild(matrix(numbers));
}

/**
 * Respects a matrix of squares.
 * class="matrix"
 * @param {number} n The size of a matrix.
 * @returns {HTMLElement} The matrix of squares.
 */
let matrix = (n) => {
    let matrix = document.createElement("div");
    matrix.classList.add("matrix");
    for (let i = 0; i < n; i++) {
        matrix.appendChild(row(n)); // Add rows.
    }
    return matrix;
}

/**
 * Respects a row of squares.
 * class="row"
 * @param {number} n The number of squares in a row.
 * @returns {HTMLElement} The row of squares.
 */
let row = (n) => {
    let row = document.createElement("div");
    row.classList.add("row");
    for (let i = 0; i < n; i++) {
        row.appendChild(square()); // Add squares.
    }
    return row;
}

/**
 * Repects a square.
 * class="square", data-color.
 * event: mouseover, mouseout.
 * @returns {HTMLElement} A square.
 */
let square = () => {
    let div = document.createElement("div");
    div.classList.add("square");
    div.dataset["color"] = ""; // For backup the original color.
    div.addEventListener("mouseover", mouseOverHandler);
    div.addEventListener("mouseout", mouseOutHandler);
    return div;
}

/**
 * Backup the DOM's origial background color to dataset.color,
 * then set to COLOR_ON_MOUSE_OVER.
 * @param {Event} e The DOM event.
 */
let mouseOverHandler = (e) => {
    if (e.target.dataset["color"] !== "") {
        return;
    }
    const style = window.getComputedStyle(e.target);
    e.target.dataset["color"] = style.backgroundColor; // Backup the original color.
    e.target.style["background-color"] = generateRandomColor();

    if (times < 10) {
        times++;
    }
    let squares = document.querySelectorAll(".square");
    squares.forEach(s => s.style["opacity"] = times * 0.1);
}

/**
 * Return a random color.
 * @returns {string} A HEX color string.
 */
let generateRandomColor = () => {
    let color = "#";
    for (let i = 0; i < 3; i++) {
        let part = parseInt(Math.random() * 256).toString(16);
        color += part.length == 1 ? "0" + part : part;
    }
    return color;
}

/**
 * Restore the DOM's background color from dataset.color.
 * @param {Event} e The DOM event.
 */
let mouseOutHandler = (e) => {
    const originalColor = e.target.dataset["color"];
    if (originalColor === "") {
        return;
    }
    setTimeout(() => { // Delay for visual effect.
        e.target.style["background-color"] = originalColor;
        e.target.dataset["color"] = "";
    }, DELAY);
}

init();
