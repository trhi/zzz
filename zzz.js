
var stars = [];
let zzzs = [
  'assets/audio/zzz0.mp3',
  'assets/audio/zzz1.mp3',
  'assets/audio/zzz2.mp3',
  'assets/audio/zzz3.mp3',
  'assets/audio/zzz4.mp3',
  'assets/audio/zzz5.mp3'
];
let starsShining = [
  "assets/img/star-full-1.gif",
  "assets/img/star-full-2.gif",
  "assets/img/star-full-3.gif",
  "assets/img/star-full-4.gif",
  "assets/img/star-full-5.gif"
]
let audios;
let starFULL, starSHINE;
let starimage;

function windowResized() {
  location.reload();
}

function preload() {
  zzzs.forEach( element => {
    console.log("i went into foreach");
    let audio = createAudio(element);
    //let maxDuration = audio.duration;
    //let randomPosition = random(0, duration);
    audio.currentTime = random(0, 30);

    //audio.loop();
    //audios.push(audio);
  });

/*
  for (var i = 0; i < 5; i++) {
    stars[i] = new Star();
  }
  */

  for (var i = 0; i < 5; i++) {
    stars[i] = new Star(i);
  }

  //starimage = loadImage("assets/img/star-full.gif");

  audios = document.querySelectorAll("audio");


  //starFULL = createImg("assets/img/star-full.gif");
  //starSHINE = createImg("assets/img/star-xl-1.gif");

}//close preload



function playStars(){
  audios[0].play();
  audios[0].volume = 0.05;
  audios[0].loop = true;
  document.getElementById("clickStars").style.display = "none";
  document.getElementById("buttonDIV").style.display = "none";
}

function setup() {
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
  //cursor(ARROW);
  //image(starimage, 0, 0);

  if( frameCount == 1){
    for (i=1; i<audios.length; i++){
      let randomTime = floor(random(0, 490));
      audios[i].currentTime = randomTime;
      console.log("random is:", randomTime, "and currentTime was set to:", audios[i].currentTime, "for audio element:", audios[i].currentTime );
    }
  }

	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}

}

function mousePressed() {
    if( document.getElementById("clickStars").style.display == "" ){
      playStars();
    }
    stars.forEach( element => element.clicked(mouseX, mouseY) );
    //console.log("clicked here:", mouseX, mouseY);
    return false;
}//close mousePressed


// star class //
class Star {
	constructor(i) {
		this.x = random(40, windowWidth-80);
		this.y = random(40, windowHeight-80);

    this.full = createImg(`assets/img/star-full-${i+1}.gif?`);
    //this.full = loadImage("assets/img/star-full.gif?");

    //this.full =
    this.shining = createImg("assets/img/star-xl-1.gif?");
    //this.shining = loadImage("assets/img/star-xl-1.gif?");

    this.full.position(this.x, this.y);
    this.full.style('border-radius', '50%');

    this.shining.position(this.x, this.y);
    this.shining.style('border-radius', '50%');
    this.shining.style('visibility', 'hidden');

		this.size = 10;

		//this.t = random(TAU);

    this.audio;
    this.playing = false;
    //this.growth = 4;

	}

  clicked(x,y) {
    //console.log("testing number of click events fired");
    /*
    if ( !x && !y ){
      x = this.x;
      y = this.y;
    }
    */
    let me = createVector(this.x+40, this.y+40);
    let mouse = createVector(x, y);
    let dist = me.dist(mouse);
    //let chosen;

    if( dist <= this.size ) { //if taps within the radius of the circle
      let myIndex = stars.indexOf(this);
      console.log("clicked star number", myIndex );
      //text('good night', this.x, this.y);
      if ( this.playing == false ){
        audios[myIndex+1].play();
        audios[myIndex+1].volume = 0.2;
        audios[myIndex+1].loop = true;
        this.playing = true;
        //this.image = this.shining;
      } else {
        audios[myIndex+1].pause();
        this.playing = false;
        //this.image = this.full;
      }
    }//if dist

  }//clicked

	draw() {
    if( this.playing ){
      this.shining.style('visibility', 'visible');
      this.full.style('visibility', 'hidden');
    } else {
      this.full.style('visibility', 'visible');
      this.shining.style('visibility', 'hidden');
    }
	}//close draw

}
