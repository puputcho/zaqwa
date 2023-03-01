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
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results) {
    if (results.length > 0) {
        punhoEsquerdoX = results[0].pose.leftWrist.x
        punhoEsquerdoY = results[0].pose.leftWrist.y
        punhoDireitoX = results[0].pose.rightWrist.x
        punhoDireitoY = results[0].pose.rightWrist.y
        console.log(results);
        console.log('Esquerdo: (' + punhoEsquerdoX + ',' + punhoEsquerdoY + ')');
        console.log('Direito: (' + punhoDireitoX + ',' + punhoDireitoY + ')');
        precisaoPunhoD = results[0].pose.keypoints[10]
        precisaoPunhoE = results[0].pose.keypoints[9]
    }
}

function draw() {
    image(video, 0, 0, 600, 500);
    fill('#70ffe0');

    // if (precisaoPunhoD > 0.01) {
        circle(punhoDireitoX, punhoDireitooY, 20);
    if (punhoDireitoY > 0 && punhoDireitoY <= 100) {
        document.getElementById('velocidade').innerHTML = 'Velocidade = 0.5x'
        som.rate(0.5) 
    } else if(punhoDireitoY > 100 && punhoDireitoY <= 200){
        document.getElementById('velocidade').innerHTML = 'Velocidade = 1x'
        som.rate(1) 
    } else if(punhoDireitoY > 200 && punhoDireitoY <= 300){
        document.getElementById('velocidade').innerHTML = 'Velocidade = 1.5x'
        som.rate(1.5) 
    } else if(punhoDireitoY > 300 && punhoDireitoY <= 400){
        document.getElementById('velocidade').innerHTML = 'Velocidade = 2x'
        som.rate(2) 
    }else if(punhoDireitoY > 400){
        document.getElementById('velocidade').innerHTML = 'Velocidade = 2.5x'
        som.rate(2.5) 
    }
    // }
    if (precisaoPunhoE > 0.01) {
        circle(punhoEsquerdoX, punhoEsquerdoY, 20);

        numeroInteiro = floor(Number(punhoEsquerdoY));
        volume = numeroInteiro / 500;
        document.getElementById('volume').innerHTML = 'Volume = ' + volume;
        som.setVolume(volume)
        
    }
}
function play() {
    som.play()
}

function modelLoaded() {
    console.log("PoseNet inicializado");
}