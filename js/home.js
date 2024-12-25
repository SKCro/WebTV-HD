'use strict';
if(cookieExists&&cookieExists('username')){
	window.username=getCookie('username');
	document.title=`Home for ${username}`;
}else{document.title='Home for SKCro';}

document.addEventListener('DOMContentLoaded',function(){
	const todayContainer=document.querySelector('.webtv-today-container');
	function adjustOverlayArea(){
		const bottomLinks=document.querySelector('.bottom-links');
		const overlay=document.querySelector('.clickable-today-overlay');
		if(!todayContainer){return;}
		overlay.style.width=(todayContainer.offsetWidth*0.99)+'px';
		overlay.style.height=(todayContainer.offsetHeight-bottomLinks.offsetHeight)*0.98+'px';
	}
	const resizeObserver=new ResizeObserver(adjustOverlayArea);
	if(todayContainer){resizeObserver.observe(todayContainer);}
	addEventListener('load',adjustOverlayArea);
	addEventListener('resize',adjustOverlayArea);
	const footerImage=document.getElementById('contentFooterImage');
	if(!footerImage){return;}
	function pickRandomImage(){
		const path='../images/home/ads/';
		const images=[
		path+'spons.png',
		path+'yourmother.png',
		path+'tiktok.png',
		path+'tictactoe.svg',
		path+'real.svg'];
		footerImage.src=images[Math.floor(Math.random()*images.length)];
		console.info('Every 30 seconds, a half-minute passes in Africa');
	}
	function changeImage(){try{pickRandomImage();}catch(error){return;}}
	changeImage();
	setInterval(changeImage,30000);
});

function search(e){
	e.preventDefault();
	const q=document.getElementById('q').value;
	if(q.startsWith('http://')||q.startsWith('https://')){window.open(q,'_blank')}else{window.open('https://bing.com/search?q='+q,'_blank');}
}

function funnyExplore(){
	const e=document.getElementById('explore');
	if(!e.paused){
		document.title=`Home for ${username}`;
		e.pause();
	}else{
		document.title='Petscop Soundtrack - Explore';
		e.currentTime=0;
		e.play();
	}e.addEventListener('ended',function(){document.title=`Home for ${username}`;});
}