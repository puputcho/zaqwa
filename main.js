som = "";
punhoEsquerdoX = 0;
punhoEsquerdoY = 0;
punhoDireitoX = 0;
punhoDireitoY = 0;
precisaoPunhoD = 0;
precisaoPunhoE = 0;

function preload() {
    som = loadSound("music.mp3");
}

function setup() {
    canvas = createCanvas(600, 500);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function gotPoses() {
    
} 
function draw() {
    image(video, 0, 0, 600, 500)
    if (precisaoPunhoE > 0.2) {
        fill('#70ffe0')
        circle(0,0,40)
    }
}

function modelLoaded() {
    console.log("PoseNet inicializado");
}