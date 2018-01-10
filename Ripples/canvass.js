var canvas = document.querySelector('canvas');

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

var c = canvas.getContext('2d');

var r = 0;
var rippleArray =[];
var i=-1;
var dr=3;
var counter =0;

var colors=[
	"#D90429",
	"#EF233C",
	"#EDF2F4",
	"#8D99AE",
	"#054A91",
]


function Circle(x,y,r,dr){

	this.x=x;
	this.y=y;
	this.r=r;
	this.dr=dr;
	this.width=5;
	this.color=colors[Math.floor(Math.random()*5)];

	this.ripple =function(){
		c.beginPath();
		c.arc(this.x,this.y,this.r,0,Math.PI*2,false);
		c.strokeStyle=this.color;
		c.lineWidth=this.width;
		c.stroke();
	}

	this.update= function(){
		if (this.r<200 && this.width>0.1){
		this.r += this.dr;
		this.width -=0.0289;
		if (this.dr>0.1){
			this.dr = this.dr-0.03;
		}
		this.ripple();
	}

	}
}


function animate() {
	requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var a =0;a<=i;a++){
    rippleArray[a].update();
	}
}


window.addEventListener('click',function(event){
	var mousex= event.clientX;
    var mousey= event.clientY;
	rippleArray.push(new Circle(mousex,mousey,r,dr));
	i++;
	
	if(counter==0){
		animate(); 
		counter++;
	}

})