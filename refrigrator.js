var img = "";
var statusweb = "";
var objects = "";

function preload() {
    img = loadImage("refrigrator.jpg");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.position(400, 130);
    objectDetector = ml5.objectDetector('cocossd', modelLoaded);
    document.getElementById("statusLbl").innerHTML = "Detecting..";
}

function modelLoaded() {
    console.log("Model Loaded");
    statusweb = true;
    objectDetector.detect(img, gotResults);
}

function gotResults(error, results) {
    if(error) {
        console.error(error);
    } else {
        console.log(results);
        objects = results;
    }
}

function draw() {
    image(img, 0, 0, 600, 500);

    if(statusweb != "") {
        document.getElementById("statusLbl").innerHTML = objects.length;
        for(i = 0; i < objects.length; i++){
            
            fill("black");
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 20);
            noFill();
            stroke("black");
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
    }
}

function goBack() {
    window.location = "index.html"
}