objects=[]
status = ""
function preload () {
   
}

function setup () {
canvas = createCanvas(600,400)
canvas.position(400,200)
video = createCapture(VIDEO)
video.hide()
video.size(600,400)
}

function draw () {
image(video,0,0,600,400)
if (status != "") {
    cocossd.detect(video,gotresult)
    for(i=0;i<objects.length;i++) {
        document.getElementById("status").innerHTML="Status :  Object Detected  "
        document.getElementById("object").innerHTML="Number of objects detected are " + objects.length
        fill("red") 
        percent = floor(objects[i].confidence*100)
        text(objects[i].label+ " "+ percent + "%",objects[i].x,objects[i].y)
        noFill()
        stroke("red")
        rect(objects[i].x,objects[i].y,objects[i].width,objects[i].height)
    }
}
}

function modelloaded () {
    console.log("The Model has been loaded")
    status = true
  video.loop()
 video.volume(0)
 video.speed(1)
}

function gotresult (error,result) {
    if (error) {
        console.log(error)
    }
    else {
        
        console.log(result)
        objects = result

    }
    
}


function start () {
    cocossd = ml5.objectDetector("cocossd",modelloaded)
document.getElementById("status").innerHTML="Status : Detecting Objects"
}

