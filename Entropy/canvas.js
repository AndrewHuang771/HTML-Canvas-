var canvas = document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c = canvas.getContext('2d');


var mouse ={
	x:undefined,
	y:undefined
}

var Maxradius = 40;
//var Minradius = 2; //don't all shrink back down to 2, so comment out.

var colorArray = [
	'#8D99AE',
	'#EDF2F4',
	'#991727',
	'#DC1F26',
]

window.addEventListener('mousemove',function(event){
	mouse.x=event.x;
	mouse.y=event.y;

}) //Interactivity for mouse movement

window.addEventListener('resize',function(event){
	canvas.width=window.innerWidth;
	canvas.height=window.innerHeight;
})



function Circle(x,y,dx,dy,r) {
	this.x=x;
	this.y=y;
	this.dx=dx;
	this.dy=dy;
	this.r=r;
	this.Minradius=r;
	this.color = colorArray[Math.floor(Math.random()*colorArray.length)];
	
	this.draw = function() {
		c.beginPath();
    	c.arc(this.x,this.y,this.r,0,Math.PI*2, false);   //Creates an Outline, needs a stroke propriety
    	c.strokeStyle='blue';
    	c.fillStyle = this.color;
    	c.fill();
	}
	this.update = function(){
		if (this.x+this.r>innerWidth || this.x-this.r<0) {
    		this.dx=-this.dx;
    	}
    	this.x += this.dx;

   		if (this.y+this.r>innerHeight || this.y-this.r<0){
    		this.dy=-this.dy;
    	}
    	this.y += this.dy;

    	//Interactivity
    	if (mouse.x - this.x<50 && mouse.x - this.x > -50 && mouse.y - this.y<50 && mouse.y - this.y>-50 && this.r<Maxradius) {
    		this.r +=1;
    	}

    	else if (this.r>this.Minradius){
    		this.r-=1;
    	}

    	this.draw();
		}
}


var circleArray= [];

for (var i =0; i<800;i++) {
	var x= innerWidth/2 + Math.random()*100-50;//Math.random()*(innerWidth-2*r)+r;
	var dx = (Math.random()-0.5);
	var r = Math.random()*3 +1;
	var y= innerHeight/2 + Math.random()*100-50;//Math.random()*(innerHeight-2*r)+r;
	var dy = (Math.random()-0.5);
	circleArray.push(new Circle(x,y,dx,dy,r));
}

var circle= new Circle(200,200,3,3,30);


function animate() {
	requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for (var i =0; i<circleArray.length;i++){
    	circleArray[i].update();
    }



}

animate();

