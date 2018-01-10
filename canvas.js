var canvas = document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c = canvas.getContext('2d');

/*c.fillStyle='rgba(255,0,0,0.5)';
c.fillRect(100,100,100,100);
c.fillStyle='rgba(0,255,0,0.5)';
c.fillRect(400,100,100,100);
c.fillStyle='red';
c.fillRect(300,300,100,100);

// Line

c.beginPath();      //Seperates this line from all other preexisting lines
c.moveTo(50,300);    
c.lineTo(300, 100);
c.lineTo(400,300);
c.strokeStyle="red";  //Changes line color
c.stroke();

//Arc / Circle
//(x coordinate [int], ycoordinate [int],radius [int],startAngle [Float in radians],endAngle [Float in radians],drawCounterClockwise [True or False])

//c.beginPath();
//c.arc(300,300,30,0,Math.PI*2, false);   //Creates an Outline, needs a stroke propriety
//c.strokeStyle = 'blue';
//c.stroke();

//Using For loop to make multiple circles. 

for(var i=0;i<12;i++){
	var x = Math.random()*window.innerWidth;
	var y = Math.random()*window.innerHeight;
	var r = Math.floor(Math.random())*256;
	var b = Math.floor(Math.random())*256;
	var g = Math.floor(Math.random())*256;
	var rgb = "rgba('+r+','+g+','+b+','+0.9+')";
	c.beginPath();
	c.arc(x,y,30,0,Math.PI*2, false);   //Creates an Outline, needs a stroke propriety
	c.strokeStyle=rgb;
	c.stroke();
}*/
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


/*var x= Math.random()*innerWidth;
var dx = (Math.random()-0.5)*8;
var r = 30;
var y= Math.random()*innerHeight;
var dy = (Math.random()-0.5)*8;*/

function animate() {
	requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for (var i =0; i<circleArray.length;i++){
    	circleArray[i].update();
    }

	/*c.beginPath();
    c.arc(x,y,r,0,Math.PI*2, false);   //Creates an Outline, needs a stroke propriety
    c.strokeStyle='blue';
    c.stroke();
    
    if (x+r>innerWidth || x-r<0) {
    	dx=-dx;
    }
    x += dx;

    if (y+r>innerHeight || y-r<0){
    	dy=-dy;
    }
    y += dy;*/

}

animate();

/*animate();

animate();*/