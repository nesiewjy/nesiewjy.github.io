let circles = [];

function setup() {
    createCanvas(windowWidth, windowHeight);
    generatePattern();
}

function generatePattern() {
    clear();
    noFill();
    stroke("#FFF9BD"); // Yellow lines

    circles = []; // Reset circles
    let numPatterns = 50; 
    let emptyZone = width * 0.2; 

    for (let i = 0; i < numPatterns; i++) {
        let x = random(emptyZone - noise(i) * emptyZone, width);
        let y = random(height);
        let radius = random(20, 200);
        let dotSpacing = random(5, 20);

        circles.push({ x, y, radius, dotSpacing });
        drawDottedCircle(x, y, radius, dotSpacing);
    }

    drawRandomGrid(emptyZone);
}

function drawDottedCircle(x, y, radius, dotSpacing) {
    let numDots = TWO_PI * radius / dotSpacing;
    for (let i = 0; i < numDots; i++) {
        let angle = map(i, 0, numDots, 0, TWO_PI);
        let xPos = x + cos(angle) * radius;
        let yPos = y + sin(angle) * radius;

        if (xPos < width * 0.2 && noise(xPos * 0.005, yPos * 0.005) < 0.5) continue;

        strokeWeight(random(1, 3));
        point(xPos, yPos);
    }
}

function drawRandomGrid(emptyZone) {
    strokeWeight(0.5);

    for (let c of circles) {
        let gridSize = random(50, 150);
        let xStart = c.x - c.radius;
        let yStart = c.y - c.radius;
        let xEnd = c.x + c.radius;
        let yEnd = c.y + c.radius;

        for (let x = xStart; x < xEnd; x += gridSize) {
            if (random() > 0.5) continue;
            if (x < emptyZone && noise(x * 0.005) < 0.5) continue;
            line(x, yStart, x, yEnd);
        }

        for (let y = yStart; y < yEnd; y += gridSize) {
            if (random() > 0.5) continue;
            if (y < emptyZone && noise(y * 0.005) < 0.5) continue;
            line(xStart, y, xEnd, y);
        }
    }
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
    generatePattern();
}

// Click to regenerate pattern
function mousePressed() {
    generatePattern();
}
