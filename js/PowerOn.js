'use strict';
//Most of this code was originally written by nitrate92
const pO=document.getElementById('powerOn');
const l=document.getElementById('logo');
const c=document.getElementById('connecting');
const s=document.getElementById('splash');

const hOC=document.querySelector('.hideOnClick');
const pOB=document.getElementById('powerOnButton');
const dM=document.getElementById('dialingMusic');
const p=document.getElementById('progressbar');
const pM=document.getElementById('progressMessage');
const sD=document.getElementById('skipDialing');
const sJ=document.getElementById('splashJingle');

let stopProgressUpdates=false;
function wait(ms){return new Promise(function(r){setTimeout(r,ms);});}
if(Math.floor(Math.random()*10)+1===1){dM.src='audio/music/other/aoltv.mp3';dM.load();}

async function powerOn(){
	parent.postMessage({type:'goFullscreen'},'*');
	if(hOC){hOC.remove();}
	highlight(sD);
	selectionBox.style.opacity=0;
	pO.classList.add('no-cursor');//Disable cursor whilst logo appears
	await wait(750);
	playSound('modem');
	l.style.display='block';
	l.classList.add('animating');
	await wait(3000);//Wait for logo to finish
	initDialing();//Show dialing elements
}

function initDialing(){
	pO.remove();
	c.style.display='block';
	c.classList.add('fade-in');
	selectionBox.style.opacity=1;
	selectionBox.classList.add('fade-in');
	sD.disabled=false;
	highlight(sD);
	dM.play();
	document.title='Connecting to WebTV';
	let value=10;
	if(useKnockoffLogos===1){
		p.addEventListener('animationend',function(){
			function restartAnim(){
				p.classList.remove('spin');
				void p.offsetWidth;
				p.classList.add('spin');
			}switch(this.style.animationDuration){
				case '':restartAnim();this.style.animationDuration='4.5s';break;
				case '4.5s':restartAnim();this.style.animationDuration='4s';break;
				case '4s':restartAnim();this.style.animationDuration='3.5s';break;
				case '3.5s':restartAnim();this.style.animationDuration='3s';break;
				case '3s':restartAnim();this.style.animationDuration='2.5s';break;
				case '2.5s':restartAnim();this.style.animationDuration='2s';break;
				case '2s':restartAnim();this.style.animationDuration='1.5s';break;
				case '1.5s':restartAnim();this.style.animationDuration='1s';break;
				case '1s':restartAnim();this.style.animationDuration='0.5s';break;
				case '0.5s':restartAnim();this.style.animationDuration='0.25s';break;
				case '0.25s':restartAnim();this.style.animationDuration='0.125s';break;
				default:restartAnim();break;
			}
		});
	}
	const i=setInterval(function(){
		if(stopProgressUpdates){clearInterval(i);return;}
		value+=10;
		/*Progress bar messages. For first message, see PowerOn.html
			When setting these messages, set an interval value for when they should occur.
			Progress bar values are defined from 0 to 100, counting by tens.
			The example provided mimmics a box with a Tellyscript.*/
		const progressBarMessages=[
			{message:'Dialing WebTV',interval:20,value:11},
			{message:'Waiting for answer',interval:50,value:43},
			{message:'WebTV answering',interval:70,value:60},
			{message:'Connecting',interval:90,value:90},
			{message:'Connecting to WebTV',interval:160,value:100},
			{message:'Connected to WebTV',interval:320,value:110}
		];
		progressBarMessages.forEach(function(details){
			if(value==details.interval){
				p.value=details.value;
				pM.textContent=details.message;
				if(details.value>=110){doSplash();}
			}
		});
	},1000);
}

function skipDialing(){
	if(pO){pOB.disabled=true;pO.classList.add('fade-out');}
	stopProgressUpdates=true;
	p.value=100;
	pM.textContent='ultimatetv reference';
	dM.pause();
	sD.disabled=true;
	setTimeout(function(){sD.remove();},450);
	doSplash();
}

function doSplash(){
	dM.pause();
	c.classList.add('fade-out');
	selectionBox.classList.add('fade-out');
	setTimeout(function(){c.remove();pO.remove();},450);
	sJ.play();
	s.style.display='flex';
	s.classList.add('fade-in');
	document.title='WebTV HD Service';
	fetch('wtv-home/home.html');
	setTimeout(function(){
		parent.postMessage({type:'hideAudioscope'},'*');
		location.replace('wtv-home/home.html');
	},(sJ.duration*1000));
}

let startupLogo;
window.doKnockoffFunnies=function(){
	const path='images/logos/';
	sJ.src='audio/knockoff/splash.wav';
	window.logos=[path+'Phillip.png',path+'Snoy.png',path+'CAR.svg',path+'Smasnug.png',path+'Shid.svg'];
	document.getElementById('splashLogo').style.display='none';
	document.getElementById('splash').style.width='auto';
	document.getElementById('itv').style.display='block';
	sD.classList.add('spin');
	p.classList.add('spin');
	chooseLogo();
	parent.postMessage({type:'knockoffGaming'},'*');
	useKnockoffLogos=1;
	console.info('using knockoff mode lmfao');
}
const path='images/logos/';
window.useKnockoffLogos=Math.floor(Math.random()*100)+1===1?1:0;
if(useKnockoffLogos===0){window.logos=[path+'Philips.svg',path+'Sony.png',path+'RCA.svg',path+'Samsung.png',path+'Dish.svg'];}else{doKnockoffFunnies();}
function chooseLogo(){
	if(cookieExists&&cookieExists('startupLogo')){
		startupLogo=getCookie('startupLogo');
		console.info('startupLogo is set to '+startupLogo);
		if(startupLogo!=='random'){l.src=logos[startupLogo];}else{l.src=logos[Math.floor(Math.random()*logos.length)];}
	}else{console.info('User doesn\'t have startup logo cookie - using random logo.');l.src=logos[Math.floor(Math.random()*logos.length)];}
}chooseLogo();
addEventListener('load',function(){if(pOB){highlight(pOB);}});