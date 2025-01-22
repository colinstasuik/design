document.addEventListener('DOMContentLoaded', () => {
    const movingCircle = document.querySelector('.moving-circle');
    const leftSide = document.querySelector('.left-side');
    const emailLink = document.querySelector('a[href^="mailto:"]');

    // Get the dimensions of the left section to establish boundaries
    const leftSideRect = leftSide.getBoundingClientRect();
    const leftSideWidth = leftSideRect.width;
    const leftSideHeight = leftSideRect.height;

    // Initialize the circle's position randomly
    let xPos = Math.random() * (leftSideWidth - movingCircle.offsetWidth);
    let yPos = Math.random() * (leftSideHeight - movingCircle.offsetHeight);
    // change the speed
    const speed = 1.5;

    // Giving movement direction
    let xDirection = 1;
    let yDirection = 1;

    // Set the initial position for the circle
    movingCircle.style.position = 'absolute';
    movingCircle.style.left = `${xPos}px`;
    movingCircle.style.top = `${yPos}px`;

    // Array of approved gradients and solid colors
    const approvedColors = [
        "linear-gradient(90deg, hsla(10, 82%, 65%, 1) 0%, hsla(290, 79%, 13%, 1) 100%)", // original gradient
        "linear-gradient(45deg, hsla(282, 22%, 21%, 1) 0%, hsla(1, 62%, 48%, 1) 100%)", // darker red gradient gradient
        "linear-gradient(270deg, hsla(199, 70%, 46%, 1) 2%, hsla(271, 56%, 16%, 1) 98%)", // gradient
        "hsla(0, 100%, 50%, 1)", // solid red
        "hsla(120, 100%, 50%, 1)", // solid green
        "hsla(240, 100%, 50%, 1)", // solid blue
        "#ff6347", // solid tomato color
        "#dbbd5a", // solid gold
        "#1e90ff", // solid dodger blue
        "#f39c12", // solid orange
        "#9b59b6", // solid amethyst
        "#adff2f", // solid greenyellow
    ];

    function getRandomColor() {
        const randomIndex = Math.floor(Math.random() * approvedColors.length);
        return approvedColors[randomIndex];
    }

    // Check to see whether the circle should be paused
    let isPaused = false;

    // The function for the circle to move
    function moveCircle() {
        if (isPaused) {
            return;
        }
        // Update the position of the circle
        xPos += speed * xDirection;
        yPos += speed * yDirection;

        // check if the circle has hit a side edge and change color
        if (xPos + movingCircle.offsetWidth > leftSideWidth) {
            xPos = leftSideWidth - movingCircle.offsetWidth;
            xDirection = -1;
            movingCircle.style.background = getRandomColor();
        } else if (xPos < 0) {
            xPos = 0;
            xDirection = 1;
            movingCircle.style.background = getRandomColor();
        }

        // check if the circle has hit a top or bottom edge and change color
        if (yPos + movingCircle.offsetHeight > leftSideHeight) {
            yPos = leftSideHeight - movingCircle.offsetHeight;
            yDirection = -1;
            movingCircle.style.background = getRandomColor();
        } else if (yPos < 0) {
            yPos = 0;
            yDirection = 1;
            movingCircle.style.background = getRandomColor();
        }

        // Update the element's position within the DOM
        movingCircle.style.left = `${xPos}px`;
        movingCircle.style.top = `${yPos}px`;
        // request the next frame
        if (!isPaused) {
            requestAnimationFrame(moveCircle);
        }

    }

    // Pause movement when hovering over email
    emailLink.addEventListener('mouseenter', () => {
        isPaused = true;
    });
    // Resume movement when mouse goes away
    emailLink.addEventListener('mouseleave', () => {
        isPaused = false;
        moveCircle();
    });

    moveCircle();
});