
var stars = [];
//let color;

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

	for (var i = 0; i < stars.length; i++) {
		stars[i].draw();
	}
}


// star class //
class Star {
	constructor() {
		this.x = random(20, windowWidth-20);
		this.y = random(20, windowHeight-20);
		this.size = 5;
		this.t = random(TAU);
	}

	draw() {
		this.t += 0.1;
		var scale = this.size + sin(this.t) * 4;
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
