    // Global variables initialization
var delay = 200; // Delay in milliseconds
var drag = false; // Flag for dragging
var objDisk = null; // Reference to the disk being dragged
var x = 0; // X-coordinate for mouse position
var y = 0; // Y-coordinate for mouse position
// Arrays to represent disks on each tower
var disksOnTower1 = new Array(null, null, null, null, null, null, null, null);
var disksOnTower2 = new Array(null, null, null, null, null, null, null, null);
var disksOnTower3 = new Array(null, null, null, null, null, null, null, null);
// Array to hold arrays representing disks on each tower
var disksOnTowers = new Array(disksOnTower1, disksOnTower2, disksOnTower3);
// Offset values for positioning elements
var offsetleft = 30;
var offsettop = 30;
var offsettower = 20;
var offsethoriz = 30;
var basetop = 0;
var diskheight = 0;
var midhoriztower = 0;
// Variables for tower indices, move count, and game state
var indexTo = 1;
var indexFr = 1;
var movectr = 0;
var gameOver = false;
// Other control variables
var prevIndex = 0;
var zindex = 0;
var currTower = 1;
var prevTower = 1;
var demo = false;
var arrFr = new Array(255); // Array for 'from' tower in moves
var arrTo = new Array(255); // Array for 'to' tower in moves
var idx = 0; // Index for moves arrays
var pos = 0; // Position in moves arrays
var t = null; // Timeout reference for solving animation
var stop = false; // Flag to stop solving animation

// Function to initialize the game
function init() {
    if (document.getElementById) {
        var diskno = document.hanoi.diskno;
        diskno.options.selectedIndex = 0;
        drawTowers(); // Draw towers on the screen
        drawDisks(parseInt(diskno.options[diskno.options.selectedIndex].text)); // Draw disks based on selected number
    }
}

// Function to initialize variables before starting a new game
function initVars() {
    for (var i = 0; i < disksOnTower1.length; i++) {
        disksOnTower1[i] = null;
        disksOnTower2[i] = null;
        disksOnTower3[i] = null;
    }
    drag = false;
    indexTo = 1;
    indexFr = 1;
    movectr = 0;
    zindex = 0;
    idx = 0;
    pos = 0;
    t = null;
    gameOver = false;
    stop = false;
    demo = false;
    document.hanoi.btnUndo.disabled = true;
}

// Function to draw towers on the screen
function drawTowers() {
    // Get references to HTML elements
    const title = document.getElementById("title");
    const tower1 = document.getElementById("tower1");
    const tower2 = document.getElementById("tower2");
    const tower3 = document.getElementById("tower3");
    const settings = document.getElementById("settings");
    // Get dimensions of elements
    const titleWidth = parseInt(title.style.width);
    const titleHeight = parseInt(title.style.height);
    const towerWidth = parseInt(tower1.style.width);
    const towerHeight = parseInt(tower1.style.height);
    const settingsWidth = parseInt(settings.style.width);

    // Calculate positions for towers and title
    midhoriztower = parseInt(document.getElementById("horiztower1").style.width) / 2;
    diskheight = parseInt(document.getElementById("disk1").style.height);
    title.style.left = `${offsetleft + 1.5 * towerWidth + offsettower - titleWidth / 2}px`;
    title.style.top = `${offsettop}px`;
    tower1.style.left = `${offsetleft}px`;
    tower1.style.top = `${offsettop + titleHeight + offsethoriz}px`;
    tower2.style.left = `${offsetleft + towerWidth + offsettower}px`;
    tower2.style.top = `${offsettop + titleHeight + offsethoriz}px`;
    tower3.style.left = `${offsetleft + (towerWidth + offsettower) * 2}px`;
    tower3.style.top = `${offsettop + titleHeight + offsethoriz}px`;
    settings.style.left = `${offsetleft + 1.5 * towerWidth + offsettower - settingsWidth / 2}px`;
    settings.style.top = `${parseInt(tower1.style.top) + towerHeight + offsethoriz}px`;
}

// Function to draw disks on the towers based on the selected number of disks
function drawDisks(disknum) {
    var tower1 = document.getElementById("tower1");
    var disktop = parseInt(tower1.style.top) + parseInt(document.getElementById("horiztower1").style.top);
    var lefttower1 = parseInt(tower1.style.left);
    var disk;
    var f = document.hanoi;
    basetop = disktop;

    // Iterate through each tower and draw disks
    for (var i = disksOnTower1.length; i >= 1; i--) {
        disk = document.getElementById("disk" + i);
        disk.style.zIndex = ++zindex;

        // Position the disks on Tower 1 based on the selected number of disks
        if (i <= disknum) {
            disk.style.left = lefttower1 + midhoriztower - parseInt(disk.style.width) / 2 + "px";
            disk.style.top = disktop - diskheight - 1 + "px";
            disktop = parseInt(disk.style.top);
            disksOnTowers[0][i - 1] = disk;
        } else {
            // Hide the remaining disks
            disk.style.left = "-250px";
            disk.style.top = "-250px";
            disksOnTowers[0][i - 1] = null;
        }
    }

    // Update move count display
    f.minmove.value = f.diskno.options[f.diskno.options.selectedIndex].value;
    f.yourmove.value = 0;
}

// Function to handle initialization of drag operation
function initializeDrag(disk, e) {
    if (!e) e = event;
    if (stop) {
        alert("After clicking the 'Stop' button, you cannot resume solving the puzzle.\nAfter clicking the 'Stop' button, you cannot resume solving the puzzle");
        return;
    }

    indexFr = indexTo;
    if (disk.id != disksOnTowers[indexFr - 1][0].id || gameOver || demo) return;
    objDisk = disk;
    x = e.clientX;
    y = e.clientY;
    tempx = parseInt(disk.style.left);
    tempy = parseInt(disk.style.top);
    document.onmousemove = dragDisk;
}

// Function to handle dragging of disk
function dragDisk(event) {
    if (!event) event = window.event;

    zindex++;
    drag = true;

    var posX = tempx + event.clientX - x;
    var posY = tempy + event.clientY - y;

    var objTower1 = document.getElementById("tower1");
    var objTower2 = document.getElementById("tower2");
    var objTower3 = document.getElementById("tower3");

    var tower1Left = parseInt(objTower1.style.left);
    var tower2Left = parseInt(objTower2.style.left);
    var tower3Left = parseInt(objTower3.style.left);
    var tower3Width = parseInt(objTower3.style.width);

    objDisk.style.zIndex = zindex;
    objDisk.style.left = posX + 'px';
    objDisk.style.top = posY + 'px';

    if (
        event.clientX >= document.body.clientWidth - 10 ||
        event.clientY >= document.body.clientHeight - 5 ||
        event.clientX == 5 ||
        event.clientY == 5
    ) {
        indexTo = indexFr;
        dropDisk(objDisk);
    } else if (
        tower3Left <= posX &&
        tower3Left + tower3Width >= posX &&
        parseInt(objTower3.style.top) + parseInt(objTower3.style.height) > posY
    ) {
        indexTo = 3;
    } else if (tower2Left <= posX && tower2Left + tower3Width >= posX) {
        indexTo = 2;
    } else if (tower1Left <= posX && tower1Left + parseInt(objTower1.style.width) >= posX) {
        indexTo = 1;
    } else {
        indexTo = indexFr;
    }
    return false;
}

// Function to handle dropping of disk
function dropDisk(disk) {
    var f = document.hanoi;
    document.onmousemove = function () { return false; };

    if (!drag) return;

    var gameStatus = false;
    var topDisk = disksOnTowers[indexTo - 1][0];

    if (indexFr === indexTo) {
        getNewTop(indexFr, null);
        pushDisk(disk, indexFr); // Put disk back to the original tower
        getNewTop(indexFr, disk);
    } else if (topDisk === null) {
        pushDisk(disk, indexTo);
        getNewTop(indexFr, null);
        getNewTop(indexTo, disk);
        movectr++;
        currTower = indexTo;
        prevTower = indexFr;
        f.btnUndo.disabled = false;
    } else if (parseInt(disk.style.width) < parseInt(topDisk.style.width)) {
        pushDisk(disk, indexTo);
        getNewTop(indexFr, null);
        getNewTop(indexTo, disk);
        movectr++;
        currTower = indexTo;
        prevTower = indexFr;
        if (indexTo === 3) gameStatus = checkStatus();
        f.btnUndo.disabled = false;
    } else {
        getNewTop(indexFr, null);
        pushDisk(disk, indexFr); // Put disk back to the original tower
        getNewTop(indexFr, disk);
    }

    drag = false;
    f.yourmove.value = movectr;

    if (gameStatus) {
        f.btnUndo.disabled = true;
        minmove = parseInt(f.minmove.value);
        var msg = "";
        if (movectr === minmove) {
            msg = "\nGood job! You completed the game in " + minmove + " moves.";
        } else if (movectr > minmove) {
            msg = "\nBut there's room for improvement.";
            msg = "\nThe minimum move count for this number of disks is " + minmove;
        }
        alert("Well done! You completed the game.," + msg);
        gameOver = true;
    }
}

// Function to check game completion status
function checkStatus() {
    var gameStat = false;
    var disks = 0;
    for (var i = 0; i < disksOnTower3.length; i++) {
        if (disksOnTowers[2][i] != null) disks++;
    }

    if (disks == parseInt(document.hanoi.diskno.options[document.hanoi.diskno.options.selectedIndex].text)) gameStat = true;
    return gameStat;

}

// Function to push disk to a tower
function pushDisk(disk, index) {
    var diskWidth = parseInt(disk.style.width);
    var towerLeft = parseInt(document.getElementById("tower" + index).style.left);
    var topDisk = disksOnTowers[index - 1][0];
    if (topDisk != null) {
        topDiskWidth = parseInt(topDisk.style.width);
        topDiskTop = parseInt(topDisk.style.top);
        disk.style.left = towerLeft + midhoriztower - diskWidth / 2 + "px";
        disk.style.top = topDiskTop - diskheight - 1 + "px";
    } else {
        disk.style.left = towerLeft + midhoriztower - diskWidth / 2 + "px";
        disk.style.top = basetop - diskheight - 1 + "px";
    }
}

// Function to update the top disk of a tower
function getNewTop(index, disk) {
    if (disk == null) { //pop
        for (var i = 0; i < disksOnTower1.length - 1; i++) {
            disksOnTowers[index - 1][i] = disksOnTowers[index - 1][i + 1];
        }
        disksOnTowers[index - 1][disksOnTower1.length - 1] = null;
    } else { //push
        for (var i = disksOnTower1.length - 1; i >= 1; i--) {
            disksOnTowers[index - 1][i] = disksOnTowers[index - 1][i - 1];
        }
        disksOnTowers[index - 1][0] = disk;
    }
}

// Function to start solving the game
function solve(btn) {
    if (btn.value == "Solve") {
        if (movectr > 0 && !gameOver && !stop)
            if (!confirm("Exiting the current game will result in loss of data. Do you wish to continue?")) return;
        btn.value = "Stop";
        initVars();
        stop = false;
        demo = true;
        var f = document.hanoi;
        f.btnIns.disabled = true;
        f.btnRes.disabled = true;
        f.btnUndo.disabled = true;
        disknum = parseInt(f.diskno.options[f.diskno.options.selectedIndex].text);
        drawDisks(disknum);
        getMoves(0, 2, 1, disknum);
        t = window.setTimeout("moveDisk()", delay);
    } else {
        if (t) {
            window.clearTimeout(t);
            btn.value = "Solve";
            frm.btnIns.disabled = false;
            frm.btnRes.disabled = false;
            t = null;
            stop = true;
            demo = false;
        }
    }
}

// Function to animate disk movement during solving
function moveDisk() {
    frm = document.hanoi;
    disk = disksOnTowers[arrFr[pos]][0];
    pushDisk(disk, arrTo[pos] + 1);
    getNewTop(arrFr[pos] + 1, null);
    getNewTop(arrTo[pos] + 1, disk);
    movectr++;
    frm.yourmove.value = movectr;
    pos++;
    if (movectr < parseInt(frm.minmove.value)) t = window.setTimeout("moveDisk()", delay);
    else {
        alert("Can you do that in " + movectr + " moves?");
        gameOver = true;
        stop = false;
        frm.btnSolve.value = "Solve";
        frm.btnIns.disabled = false;
        frm.btnRes.disabled = false;
    }
}

// Function to generate moves for solving the game
function getMoves(from, to, empty, numDisk) {
    if (numDisk > 1) {
        getMoves(from, empty, to, numDisk - 1);
        arrFr[idx] = from;
        arrTo[idx++] = to;
        getMoves(empty, to, from, numDisk - 1);
    } else {
        arrFr[idx] = from;
        arrTo[idx++] = to;
    }
}

// Function to undo the last move
function unDo(btn) {
    disk = disksOnTowers[currTower - 1][0];
    pushDisk(disk, prevTower);
    getNewTop(currTower, null);
    getNewTop(prevTower, disk);
    movectr--;
    document.hanoi.yourmove.value = movectr;
    btn.disabled = true;
}

// Function to display game instructions
function displayIns() {
    var msg = "Your objective is to transfer all the disks from Tower 1 to Tower 3.\n";
    msg += "Remember the following rules:\n";
    msg += "\n";
    msg += "• You can only move one disk at a time.\n";
    msg += "• A larger disk must never be placed on top of a smaller one.\n";
    alert(msg);
}