'use strict';
//Redirect if the user isn't using the iframe page
if(self===top){location.replace('/?page='+location.pathname);}

//Sound handling, tabindex, and hover effect
function playSound(snd){parent.postMessage({type:'sound',soundType:snd},'*');}
addEventListener('DOMContentLoaded',function(){
	//Import selection box code
	const selBoxScript=document.createElement('script');
	selBoxScript.src='../../js/selectionBox.js';//CHANGE ME BEFORE RELEASE TO /WebTV-HD/js/selectionBox.js
	document.body.appendChild(selBoxScript);

	const inputs=document.querySelectorAll('.input');
	const submitInputs=document.querySelectorAll('.submit');
	const clickableButtons=document.querySelectorAll('.clickable');
	const inputNoSound=document.querySelectorAll('.inputNoSound');
	const audioTags=document.querySelectorAll('audio');
	for(let audioTag of audioTags){
		audioTag.addEventListener('play', function(){parent.postMessage({type:'showAudioscope'},'*');});
		audioTag.addEventListener('pause',function(){parent.postMessage({type:'hideAudioscope'},'*');});
		audioTag.addEventListener('ended',function(){parent.postMessage({type:'hideAudioscope'},'*');});
	}
	for(let i=0;i<clickableButtons.length;i++){
		clickableButtons[i].addEventListener('mouseenter',function(){highlightNoScroll(this);});
		clickableButtons[i].addEventListener('click',function(){playSound('click');});
		clickableButtons[i].setAttribute('tabindex',0);
	}
	for(let j=0;j<inputs.length;j++){
		inputs[j].addEventListener('mouseenter',function(){highlightNoScroll(this);});
		inputs[j].addEventListener('click',function(){playSound('input');});
		inputs[j].setAttribute('tabindex',0);
	}
	for(let k=0;k<submitInputs.length;k++){
		submitInputs[k].addEventListener('mouseenter',function(){highlightNoScroll(this);});
		submitInputs[k].addEventListener('click',function(){playSound('submit');});
		submitInputs[k].setAttribute('tabindex',0);
	}
	for(let l=0;l<inputNoSound.length;l++){
		inputNoSound[l].addEventListener('mouseenter',function(){highlightNoScroll(this);});
		inputNoSound[l].addEventListener('click',function(){playSound('stopSound');});
		inputNoSound[l].setAttribute('tabindex',0);
	}

	//Page name updater
	function pageNameUpdater(){
		if(isTVHome()){return;}//a stupid workaround for an even more stupid bug
		const observer=new MutationObserver(updatePageName);
		function updatePageName(){parent.postMessage({type:'title',title:document.title},'*');}
		function trackName(){
			updatePageName();
			observer.disconnect();
			observer.observe(document.querySelector('title'),{subtree:true,characterData:true,childList:true});
		}addEventListener('load',trackName);
	}pageNameUpdater();

	//<display>/<bgsound> tag reimplementation, page-side
	function handleDisplay(){
		if(isTVHome()){return;}
		const displayTag=document.querySelector('meta[name="display"]');
		if(displayTag){
			const displayOptions=displayTag.getAttribute('content').split(' ');
			if(displayOptions.includes('noScroll')){
				console.debug('Scrolling disabled - noScroll is set in the display tag.');
				document.querySelector('html').style.overflow='hidden';
				document.body.style.overflow='hidden';
			}
			if(displayOptions.includes('noStatus')){parent.postMessage({type:'display',attribute:'noStatus'},'*');}
			if(displayOptions.includes('noMusic')){parent.postMessage({type:'display',attribute:'noMusic'},'*');}
		}else{parent.postMessage({type:'display',attribute:'none'},'*');}
		const bgsound=document.querySelector('meta[name="bgsound"]');
		if(bgsound){
			const bgsoundSrc=bgsound.getAttribute('content');
			if(bgsoundSrc){parent.postMessage({type:'bgsound',source:bgsoundSrc},'*');}
		}else{parent.postMessage({type:'bgsound',source:'none'},'*');}
	}handleDisplay();
});

//Link handler - shorthand for setting location.href
function go(url){location.href=url;}

/*Attempt at making loading progress indicators work - commented out because it doesn't work :P
window.addEventListener('progress',function(e){
	function getLoadPercentage(){
		const percentLoaded=(e.loaded/e.total)*100;
		console.info('Iframe: load percentage: '+e.loaded);
		parent.postMessage({type:'loadingProgress',progress:percentLoaded},'*');
	}if(e.lengthComputable){getLoadPercentage();}else{setTimeout(getLoadPercentage,25);}
}); */

//ShowAlert handlers
alert=function(text){parent.postMessage({type:'jsalert',text:text},'*');}
function showAlert(text){parent.postMessage({type:'alert',text:text},'*');}
function showCustomAlert(text,image,label,action){
	window.tempAction=action;
	try{
		if(text&&image&&label&&action){
			if(text!==null&&text!=='none'){parent.postMessage({type:'alertText',text:text},'*');}
			if(image!==null&&image!=='none'){parent.postMessage({type:'alertImage',image:image},'*');}
			if(label!==null&&label!=='none'){parent.postMessage({type:'alertButtonText',label:label},'*');}
			if(action!==null&&action!=='none'){parent.postMessage({type:'alertButtonAction'},'*');}
			parent.postMessage({type:'showCustomAlert'},'*');
		}else{showAlert(`Usage: showCustomAlert('Alert text', 'Image URL', 'Button Label', Button Action Code); Use 'none' if you don't want to specify part of a dialog.`);}
	}catch(error){
		parent.postMessage({type:'alertSound',sound:`audio/doh.mp3`},'*');
		showCustomAlert(`D'oh! ${error} | See console for details.`,'images/JSAlert.svg','Dang it...','none');
		console.log(error);
	}
}

//Loading indicator
addEventListener('pagehide',function(){
	if(isTVHome()){return;}
	parent.postMessage({type:'loading'},'*');
	parent.postMessage({type:'hideAudioscope'},'*');
});
addEventListener('popstate',function(e){//I might never get this working :P
	console.log('kill me');
	if(e.state&&e.state.direction==='backward'){console.error('FINALLY');playSound('backSound');}
});

//Message handler
function handleMessage(e){
	switch(e.data.type){
		case 'BGMusicQuery'://BG music stuff
			const displayTag=document.querySelector('meta[name="display"]');
			if(displayTag&&displayOptions.includes('noMusic')){parent.postMessage({type:bgmStatus,status:'disabled'},'*');}else{parent.postMessage({type:bgmStatus,status:'enabled'},'*');}
		break;
		case 'doAlertAction':eval(tempAction);tempAction='';break;
		case 'find'://Find on page
			const term=find(e.data.term);
			if(term){parent.postMessage({type:'matchFound'},'*');}else{parent.postMessage({type:'noMatchFound'},'*');}
		break;
		case 'print':print();break;//Print handler
		case 'reload':location.reload();
		case 'forceReload':location.reload(true);
		case 'toggleSidebar'://Sidebar toggling logic, page-side
			const sidebar=document.querySelector('.sidebar');
			const nav=document.querySelector('.side-nav');
			function show(e){
				playSound('panelUp');
				e.classList.remove('hiding','hide');
				e.classList.add('show');
				resetSelectionBox();
			}
			function hide(e){
				playSound('panelDown');
				e.classList.remove('showing','show');
				e.classList.add('hide');
				resetSelectionBox();
			}
			if(sidebar){if(sidebar.classList.contains('show')||sidebar.classList.contains('showing')){hide(sidebar);}else{show(sidebar);}}
			else if(nav){if(nav.classList.contains('show')||nav.classList.contains('showing')){hide(nav);}else{show(nav);}}
			else{playSound('bonkSound');}
		break;
		case 'resetSelectionBox':resetSelectionBox();break;
		default:console.info(`Page received unknown message type: ${e.data.type}\n${e.data}`);
	}
}addEventListener('message',handleMessage);

//Options bar toggling logic
addEventListener('keydown',function(e){if(e.keyCode===46){e.preventDefault();parent.postMessage({type:'showOptionsBar'},'*');parent.focus();}});

//Knockoff mode placeholder to prevent errors
if(location.href.includes('PowerOn.html')===false){window.doKnockoffFunnies=function(){return 'You need to run this command on the PowerOn page for it to work. To get there quickly, hold shift and click reload.';}}

//Is the current page TV Home?
function isTVHome(){if(location.href.includes('TVHome.html')){return true;}else{return false;}}