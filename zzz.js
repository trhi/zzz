
var stars = [];
let zzzs = [
  'assets/audio/zzz0.mp3',
  'assets/audio/zzz1.mp3',
  'assets/audio/zzz2.mp3',
  'assets/audio/zzz3.mp3',
  'assets/audio/zzz4.mp3',
  'assets/audio/zzz5.mp3'
];
let audios;

function windowResized() {
  location.reload();
}

function preload() {
  zzzs.forEach( element => {
    console.log("i went into foreach");
    let audio = createAudio(element);

    //audio.loop();
    //audios.push(audio);
  });

  audios = document.querySelectorAll("audio");

/*
  var audioDiv = $('#audio');
  for ( let i=0; i<observations.fragments.length; i++ ){
    var audio = $( "<audio></audio>", {
      id: i, //in order to later maps hairs to audio elements
      src: observations.path+observations.fragments[i].filename,
      txt: observations.fragments[i].text, //in order to get the hair-related text directly out of the audio element
      preload: 'auto',
      on: {
        canplaythrough: function(event){//don't do anything
        },//close canplaythrough:
        ended: function(event){//don't do anything
        }//close ended:
      }//close on:
    });//close var audio
    audioDiv.append(audio);
  }
  */

  //use selector to select all audios and put the in an array by index

}//close preload



function playStars(){
  audios[0].play();
  audios[0].volume = 0.05;
  audios[0].loop = true;
  document.getElementById("clickStars").style.display = "none";
  document.getElementById("buttonDIV").style.display = "none";
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //color = color('rgba(255,255,255,0.29)');

	for (var i = 0; i < 5; i++) {
		stars[i] = new Star();
	}
}

//there is a general background noise, something soothing, calming, that loops.
//not music, a soundscape.
//The user can just listen to the soundscape to relax, if they want to,
//picking up details in the soundscape. It is very, very, very quiet.
//if the user clicks on a star: play audio.
//Once the audio has stopped playing, remove the star from the sky.
//the user can make all audios play at the same time.
//once the stars are all gone, all that remains is the soundscape.

function draw() {
  frameRate(5);
  background(0);
  cursor(ARROW);

	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
}

function mousePressed() {
    stars.forEach( element => element.clicked(mouseX, mouseY) );
    return false;
}//close mousePressed


// star class //
class Star {
	constructor() {
		this.x = random(20, windowWidth-20);
		this.y = random(20, windowHeight-20);
		this.size = 5;
		this.t = random(TAU);
    this.audio;
    this.playing = false;
    this.growth = 4;
	}

  clicked(x,y) {
    //console.log("testing number of click events fired");
    /*
    if ( !x && !y ){
      x = this.x;
      y = this.y;
    }
    */
    let me = createVector(this.x, this.y);
    let mouse = createVector(x, y);
    let dist = me.dist(mouse);
    //let chosen;
    if( dist <= this.size ) { //if taps within the radius of the circle
      let myIndex = stars.indexOf(this);
      console.log("clicked star number", myIndex );
      //text('good night', this.x, this.y);
      if ( this.playing == false){
        audios[myIndex+1].play();
        audios[myIndex+1].volume = 0.2;
        audios[myIndex+1].loop = true;
        this.playing = true;
      } else {
        audios[myIndex+1].pause();
        this.playing = false;
      }
    }

  }

	draw() {

    let me = createVector(this.x, this.y);
    let mouse = createVector(mouseX, mouseY);
    let dist = me.dist(mouse);
    //let chosen;
    if( dist <= this.size ) {
      cursor(HAND);
    }

		this.t += 0.1;
    if (this.playing){
      this.t += 0.2;
      //this.growth = 6;
    } else {
      //this.growth = 4;
    }
		var scale = this.size + sin(this.t) * this.growth;
		noStroke();


    drawingContext.shadowBlur = 50;
    drawingContext.shadowColor = 'white';
    fill(color('rgba(255,255,255,1)'));

    push();
    //translate(width * 0.5, height * 0.5);
    //rotate(frameCount / 50.0);
    star(this.x, this.y, scale, scale+5, 40);
    pop();


    drawingContext.shadowBlur = 30;
    drawingContext.shadowColor = 'white';
    fill(color('rgba(255,255,255,1)'));

    push();
    //translate(width * 0.5, height * 0.5);
    //rotate(frameCount / 50.0);
    star(this.x, this.y, scale, scale+5, 40);
    pop();

/*
      drawingContext.shadowBlur = 50;
      drawingContext.shadowColor = 'white';
      fill(color('rgba(255,255,255,1)'));
  		//ellipse(this.x, this.y, scale, scale);

      drawingContext.shadowBlur = 30;
      drawingContext.shadowColor = 'white';
      fill(color('rgba(255,255,255,1)'));
  		//ellipse(this.x, this.y, scale, scale);

*/
	}



}

function star(x, y, radius1, radius2, npoints) {
  let angle = TWO_PI / npoints;
  let halfAngle = angle / 2.0;
  beginShape();
  for (let a = 0; a < TWO_PI; a += angle) {
    let sx = x + cos(a) * radius2;
    let sy = y + sin(a) * radius2;
    vertex(sx, sy);
    sx = x + cos(a + halfAngle) * radius1;
    sy = y + sin(a + halfAngle) * radius1;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
