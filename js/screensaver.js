'use strict';
//Screensaver code forked (read: heavily modified) from Yannis' DVD Screensaver remake - https://codepen.io/heinhein/pen/WPZpVv
const logos=[];
let logoCount=1;

class webtvLogo{
	constructor(x,y,dx,dy,speed,animDuration,element){
		this.x=x;
		this.y=y;
		this.dx=dx;
		this.dy=dy;
		this.speed=speed;
		this.animDuration=animDuration;
		this.element=element;
	}
	run(){
		this.updatePosition();
		this.update();
	}
	update(){
		if(this.x+this.element.offsetWidth>innerWidth||this.x<0){this.dx=-this.dx;}
		if(this.y+this.element.offsetHeight>innerHeight||this.y<0){this.dy=-this.dy;}
		this.x+=this.dx*this.speed;
		this.y+=this.dy*this.speed;
	}
	updatePosition(){
		this.element.style.left=`${this.x}px`;
		this.element.style.top=`${this.y}px`;
		this.element.style.animationDuration=`${this.animDuration}s`;
	}
}

function generateLogo(){
	if(logoCount>30){showCustomAlert(`Caught in 4K trying to bypass the limits 📸`,'none','fuck','none');return;}
	const newLogo=document.createElement('img');
	newLogo.src='../images/WebTVJewelScreensaver.svg';
	newLogo.classList.add('logo');
	newLogo.id=`logo_${logoCount++}`;
	document.body.appendChild(newLogo);
	const x=Math.random()*(window.innerWidth-1000)+400;
	const y=Math.random()*(window.innerHeight-800)+400;
	const dx=2.5;
	const dy=1.5;
	const speed=parseFloat((Math.random()*1).toFixed(2))+1.6;
	const animDuration=parseFloat((Math.random()*1).toFixed(2))+3;
	const element=newLogo;
	const logoInstance=new webtvLogo(x,y,dx,dy,speed,animDuration,element);
	logos.push(logoInstance);
}
generateLogo();
generateLogo();
generateLogo();

function update(){for(var i=0;i<logos.length;i++){logos[i].run();}}
setInterval(function(){requestAnimationFrame(update);},16);

function morePlease(){
	if(logoCount===10){showCustomAlert(`Don't you think that's enough?`,'none','no','none');generateLogo();}
	else if(logoCount===20){showCustomAlert(`Okay really, I think that's enough now.`,'none','no it isn\'t','none');generateLogo();}
	else if(logoCount===30){
		const addLogo=document.getElementById('addLogo');
		if(addLogo){
			addLogo.remove();
			generateLogo();
			showCustomAlert(`This has gone too far. No more logos for you, mister.`,'none','dang it','none');
		}else{
			showCustomAlert(`Caught in 4K trying to bypass the limits 📸`,'none','fuck','none');
			return;
		}
	}else if(logoCount>30){showCustomAlert(`Caught in 4K trying to bypass the limits 📸`,'none','fuck','none');return;}
	else{generateLogo();}
}