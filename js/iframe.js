'use strict';
//Import selection box code
const selBoxScript=document.createElement('script');
selBoxScript.src='https://SKCro.github.io/WebTV-HD/js/selectionBox.js';
document.head.appendChild(selBoxScript);
//Common variables
const iframe=document.getElementById('mainFrame');
const tvFrame=document.getElementById('tvFrame');
const statusBar=document.getElementById('statusBar');
const statusContainer=document.querySelector('.status-container');
const optionsBar=document.getElementById('optionsBar');
//Panel stuff
const panel=document.getElementById('panel');
const textInput=document.getElementById('textQuery');
const panelClear=document.getElementById('panelClear');
const panelCancel=document.getElementById('panelCancel');
const panelSubmit=document.getElementById('panelSubmit');
const panelAction=document.getElementById('panelAction');
const bottomMessage=document.getElementById('bottomMessage');
const pretext=document.getElementById('topInputPretext');
//Sounds
const audioPath='audio/';
window.clickSound=new Audio(audioPath+'click.mp3');
window.backSound=new Audio(audioPath+'goBack.mp3');
window.inputSound=new Audio(audioPath+'inputClick.mp3');
window.submitSound=new Audio(audioPath+'submitClick.mp3');
window.errorSound=new Audio(audioPath+'error.mp3');
window.bonkSound=new Audio(audioPath+'bonk.mp3');
window.modem=new Audio(audioPath+'modem.mp3');
window.panelUp=new Audio(audioPath+'up.mp3');
window.panelDown=new Audio(audioPath+'down.mp3');
window.panelSlide=new Audio(audioPath+'panelWhir.mp3');
window.viewSound=new Audio(audioPath+'view.mp3');
window.alertSound=errorSound;
window.playSound=function(snd){
	let sndString=snd;
	if(typeof snd==='string'){sndString=snd;snd=window[snd];}
	if(snd&&typeof snd==='object'&&snd!==undefined&&snd!==null){
		snd.currentTime=0;
		snd.play();
	}else{
		const msg=`Invalid sound ID provided: ${snd}/${sndString}. Valid sound IDs:
• clickSound - Self-explanitory.
• backSound - Normally plays when you hit back, but I can't get that functionality to work.
• inputSound - Plays when you click a radio button or change some types of inputs.
• errorSound - "Whoom" - usually accompanies an alert box.
• bonkSound - Plays when you try to scroll past the end of the page.
• modem - Plays when the modem "initializes".
• panelUp - Plays when a panel is shown.
• panelDown - Plays when a panel is hidden.
• panelSlide - Plays when a panel is transitioning in some cases.
• viewSound - Plays when transitioning between web mode and TV mode.
• alertSound - Usually the same as errorSound, but can be redefined with an undocumented function \;\)`;
		console.info(msg);
		return;
	}
}
window.help=function(){
	const commands=`%cAvailable commands:
%c————————————————————————————————————————
%cOptions menu stuff - these commands are also available in the options bar.
  %c• home(); - Go home.
  • find(string); - Open the find panel with an optional string.
  • info(); - Open the info panel.
  • goTo(url); - Open the go to panel with an optional URL.
  • view(); - Swaps between Web and TV mode. Catch ya on the flip side!
  • send(email); - Open the send panel with an optional address to send the page URL to.
%c————————————————————————————————————————
  %c• music(); - Toggle background music.
  • print(); - Print the current page.
  • hangUp(); - Simulate hanging up the phone. Stops background music.
  • reload(); - Reloads the page inside the iframe.
  • pip(); - Toggles picture-in-picture window.
%c————————————————————————————————————————
%cOther commands. Most of these are just used internally.
  %c• alert(text); - Shows an alert box with the specified text.
  • showAlert(text); - Shows a WebTV service-style alert box with the specified text. HTML and CSS (via <style>) can be used.
  • showCustomAlert(text,image,label,action); (iframe only) - Shows an alert box with the specified text, image URL for icon, button label, and button action. The action can be any JS code and will run inside the iframe page.
%c————————————————————————————————————————
  %c• playSound(sound); - Play a specific UI sound. Run the command without specifying a sound to see a list.
  • location.go(url); - Navigate the iframe to a different page. Basically the same as changing iframe.contentWindow.location.href. Bypasses go to panel entirely.
  • iframe.contentWindow.doKnockoffFunnies(); - Manually trigger knockoff mode. Only works if you're on the PowerOn page.
%c————————————————————————————————————————
%cThis page is too big to be shown completely.`;
	console.info(commands,
	'font-size:14px;font-weight:900;',
	'text-shadow:0 -1px 1px #aaa;',
	'font-weight:900;',
	'','text-shadow:0 -1px 1px #aaa;',
	'','text-shadow:0 -1px 1px #aaa;',
	'font-weight:900;',
	'','text-shadow:0 -1px 1px #aaa;',
	'','text-shadow:0 -1px 1px #aaa;',
	'text-align:center;font-weight:900;');
	return 'If you need help, contact me on Discord. My username is SKCro.';
}
//Main message handler
function handleMessage(e){
	switch(e.data.type){
		case 'sound':
			switch(e.data.soundType){
				case 'click':playSound(clickSound);break;
				case 'input':playSound(inputSound);break;
				case 'submit':playSound(submitSound);break;
				case 'stopSound':preventSound();break;
				default:playSound(e.data.soundType);
			}
		break;
		case 'loading':startLoading();break;
		case 'title':
			document.querySelector('.page-name').textContent=e.data.title;
			document.title=`${e.data.title} - WebTV HD`;
		break;
		case 'QueryForWebTVHD':iframe.contentWindow.postMessage({type:'Yes, I am the real SKCro!'},'*');break;//security 100
		case 'display'://<display>/<bgsound> tag reimplementation, parent-side
			if(e.data.attribute==='none'){
				statusBar.style.display='block';
				optionsBar.style.display='grid';
				iframe.classList.remove('noStatus');
				document.getElementById('music').disabled=false;
			}else if(e.data.attribute==='noStatus'){
				console.debug('Status bar hidden - noStatus is set in the display tag.');
				statusBar.style.display='none';
				optionsBar.style.display='none';
				iframe.classList.add('noStatus');
			}else if(e.data.attribute==='noMusic'){
				console.debug('Background music disabled - noMusic is set in display tag.');
				stopBGMusic();
				document.getElementById('music').disabled=true;
			}
		break;
		case 'showAudioscope':
			showAudioscope();
			if(musicIndicator.classList.contains('active')){stopBGMusic();}
		break;
		case 'hideAudioscope':hideAudioscope();break;
		case 'bgsound':
			const siteBGSound=document.getElementById('bgsound');
			if(e.data.source&&e.data.source!=='none'){
				if(siteBGSound.endsWith(';')){siteBGSound.loop=false;}else{siteBGSound.loop=true;}
				siteBGSound.src=e.data.source;
			}else{siteBGSound.pause();siteBGSound.src='empty.mp3';}
		break;
		case 'showOptionsBar':toggleOptionsBar();break;
		case 'matchFound':closePanel();break;
		case 'noMatchFound':
			playSound(errorSound);
			bottomMessage.textContent='Could not find the word on this page.';
		break;
		case 'theme':if(e.data.theme==1){document.body.classList.add('SKCro');}else{document.body.classList.remove('SKCro');}break;
		//Alert handing stuff
		case 'alert':showAlert(e.data.text);break;
		case 'jsalert':alert(e.data.text);break;
		case 'alertImage':setAlertImage(`url(${e.data.image})`);break;
		case 'alertText':setAlertText(e.data.text);break;
		case 'alertButtonText':setAlertButtonText(e.data.label);break;
		case 'alertButtonAction':setAlertButtonAction();break;
		case 'alertSound':setAlertSound(e.data.sound);break;
		case 'showCustomAlert':openDialog();break;
		//Other stuff
		case 'knockoffGaming':
			const knockoffPath='audio/knockoff/';
			clickSound=new Audio(knockoffPath+'click.mp3');
			backSound=new Audio(knockoffPath+'goBack.mp3');
			inputSound=new Audio(knockoffPath+'inputClick.mp3');
			submitSound=new Audio(knockoffPath+'inputClick.mp3');
			errorSound=new Audio(audioPath+'doh.mp3');
			bonkSound=new Audio(knockoffPath+'bonk.mp3');
			panelUp=new Audio(knockoffPath+'up.mp3');
			panelDown=new Audio(knockoffPath+'down.mp3');
			panelSlide=new Audio(knockoffPath+'up.mp3');
			viewSound=new Audio(knockoffPath+'view.mp3');
			document.getElementById('reconnectButton').textContent='un-hang up';
			document.getElementById('find').textContent='search for';
			document.getElementById('info').textContent='properties';
			document.getElementById('goto').textContent='address';
			document.getElementById('save').textContent='tv home';
			document.getElementById('send').textContent='email to';
			document.getElementById('music').innerHTML='bg music<div id=musicIndicator aria-hidden=true></div>';
			document.getElementById('print').textContent='print page';
			document.getElementById('hangup').textContent='disconnect';
			document.getElementById('reload').textContent='refresh';
			document.getElementById('pip').innerHTML='tv window<div id=pipIndicator aria-hidden=true></div>';
		break;
		case 'goFullscreen':
			if(document.documentElement.requestFullscreen){document.documentElement.requestFullscreen();}
			else if(document.documentElement.mozRequestFullScreen){document.documentElement.mozRequestFullScreen();}
			else if(document.documentElement.webkitRequestFullscreen){document.documentElement.webkitRequestFullscreen();}
		break;
		default:console.info(`Parent received unknown message type: ${e.data.type}\n${e.data}`);
	}
}addEventListener('message',handleMessage);

//Apply fixes if the user is using macOS Safari
function safariStupid(){
	var ua=navigator.userAgent.toLowerCase();
	if(ua.indexOf('safari')!==-1&&ua.indexOf('chrome')===-1&&ua.indexOf('iphone')===-1){return true;}
	else{return false;}
}if(safariStupid()){document.body.classList.add('safari');console.log('safari stupid');}

//Location-related stuff
location.go=function(url){if(url){iframe.contentWindow.location.href=url;return `Going to ${url}`;}else{console.info(`Usage: location.go('url')`)}}

//Redirect if the user directly specifies a URL via ?page=
const pageValue=new URLSearchParams(location.search).get('page');
if(pageValue){location.go(pageValue);}

//Options bar stuff
let lastSelectedButton;
function showOptionsBar(){
	iframe.classList.add('noFocus');
	if(panel.classList.contains('show')||panel.classList.contains('showing')){closePanel();}
	resetSelectionBoxes();
	playSound(panelUp);
	optionsBar.removeAttribute('aria-hidden');
	optionsBar.classList.remove('hiding','hide');
	optionsBar.classList.add('show');
	statusBar.classList.remove('hiding','hide');
	statusBar.classList.add('show');
	setTimeout(function(){
		statusBar.classList.remove('show');
		optionsBar.classList.remove('show');
		statusBar.classList.add('showing');
		optionsBar.classList.add('showing');
	},300);
	document.querySelectorAll('.options-button').forEach(function(b){b.classList.remove('noselect');});
	document.getElementById('home').classList.remove('noselect');
	if(!lastSelectedButton||lastSelectedButton===null||!lastSelectedButton.classList.contains('options-button')){lastSelectedButton=document.getElementById('goto');}
	setTimeout(highlightNoScroll(lastSelectedButton),25);
}
function hideOptionsBar(){
	iframe.classList.remove('noFocus');
	playSound(panelDown);
	optionsBar.setAttribute('aria-hidden','true');
	optionsBar.classList.remove('showing','show');
	optionsBar.classList.add('hide');
	statusBar.classList.remove('showing','show');
	statusBar.classList.add('hide');
	setTimeout(function(){
		statusBar.classList.remove('hide');
		optionsBar.classList.remove('hide');
		statusBar.classList.add('hiding');
		optionsBar.classList.add('hiding');
	},300);
	document.querySelectorAll('.options-button').forEach(function(b){b.classList.add('noselect');});
	document.getElementById('home').classList.add('noselect');
	iframe.focus();
	lastSelectedButton=selectedElement;
	setTimeout(resetSelectionBox,380);
}
function hideOptionsBarNoSound(){
	if(optionsBar.classList.contains('show')||optionsBar.classList.contains('showing')){
		iframe.classList.remove('noFocus');
		setTimeout(function(){
			optionsBar.setAttribute('aria-hidden','true');
			optionsBar.classList.remove('showing','show');
			optionsBar.classList.add('hide');
			statusBar.classList.remove('showing','show');
			statusBar.classList.add('hide');
			setTimeout(function(){
				statusBar.classList.remove('hide');
				optionsBar.classList.remove('hide');
				statusBar.classList.add('hiding');
				optionsBar.classList.add('hiding');
			},300);
			document.querySelectorAll('.options-button').forEach(function(button){button.classList.add('noselect');});
			document.getElementById('home').classList.add('noselect');
			setTimeout(resetSelectionBox,380);
		},20);
	}else{console.debug(`Options bar isn't open, why are we closing it?`);}
}
window.toggleOptionsBar=function(){
	if(statusBar.classList.contains('slide-in')||statusBar.classList.contains('slide-out')||statusBar.style.display==='none'){playSound(bonkSound);}
	else{if(optionsBar.classList.contains('show')||optionsBar.classList.contains('showing')){hideOptionsBar();}else{showOptionsBar();}}
}
addEventListener('keydown',function(e){if(e.keyCode===46){e.preventDefault();toggleOptionsBar();}});
window.clearMessage=function(){bottomMessage.textContent='';}
window.removeNoSelects=function(){
	textInput.classList.remove('noselect');
	panelSubmit.classList.remove('noselect');
	panelClear.classList.remove('noselect');
	panelCancel.classList.remove('noselect');
	panelAction.classList.remove('noselect');
}

//Top row buttons
window.home=function(){
	hideOptionsBarNoSound();
	location.go('https://SKCro.github.io/WebTV-HD/wtv-home/home.html');
}

window.find=function(text){
	hideOptionsBarNoSound();
	function openFindPanel(){
		removeNoSelects();
		pretext.textContent='Find word';
		pretext.style.color='var(--webtv-yellow)';
		bottomMessage.textContent='';
		if(text!==undefined){textInput.value=text}else{textInput.value='';}
		textInput.placeholder='';
		panelSubmit.textContent='Find on Page';
		panelSubmit.onclick=findText;
		panelClear.onclick=clearFindBox;
		panelAction.classList.add('noselect');
		panelAction.style.display='none';
		bottomMessage.textContent=`NOTE: Find functionality is a bit buggy. This isn't the fault of WTV-HD - the find(); function responsible for finding the text seems to be buggy in general.`;
		openPanel();
	}
	function clearFindBox(){textInput.value='';}
	function findText(){iframe.contentWindow.postMessage({type:'find',term:textInput.value.toLowerCase()},'*');}
	openFindPanel();
}

window.info=function(){
	hideOptionsBarNoSound();
	removeNoSelects();
	pretext.style.width='80%';
	pretext.textContent=document.title;
	if(iframe.contentDocument!==null){bottomMessage.textContent=`Address: ${iframe.contentDocument.location.href}`;}
	else{bottomMessage.innerHTML=`Address: Unknown - page is <a class=clickable onclick="playSound(submitSound);location.go('https://SKCro.github.io/WebTV-HD/wtv-other/FAQ.html#classesandids');closePanel();">cross-origin</a>`;}
	bottomMessage.style.bottom='16vw';
	textInput.value='';
	textInput.placeholder='';
	textInput.style.display='none';
	textInput.classList.add('noselect');
	panelSubmit.style.top='unset';
	panelSubmit.textContent='Close';
	panelSubmit.onclick=closePanel;
	panelClear.style.display='none';
	panelCancel.style.display='none';
	panelAction.style.display='none';
	panelClear.classList.add('noselect');
	panelCancel.classList.add('noselect');
	panelAction.classList.add('noselect');
	openPanel();
}

window.goTo=function(url){
	hideOptionsBarNoSound();
	removeNoSelects();
	pretext.textContent='Address';
	bottomMessage.textContent='';
	textInput.classList.remove('noselect');
	textInput.type='url';
	if(url){textInput.value=url;}else{textInput.value='http://';}
	textInput.placeholder='';
	panelSubmit.textContent='Go to Page';
	panelSubmit.onclick=goToURL;
	panelClear.onclick=clearURL;
	panelAction.textContent='Show Current';
	panelAction.onclick=showCurrentURL;
	openPanel();
	function goToURL(e){
		e.preventDefault();
		switch(textInput.value){
			case 'http://':
			case 'https://':
			case '':
				bottomMessage.textContent='Type the address of a webpage.';
				playSound(errorSound);
			break;
			case 'barrelroll':
			case 'barrel roll':
			case 'doabarrelroll':
			case 'do a barrel roll':doBarrelRoll();break;
			case 'http://sparklecarehospital.com':
			case 'https://sparklecarehospital.com':
			case 'spackle car':
				closePanel();
				dialogLogo.style.backgroundImage='url(images/SurfWatch.svg)';
				dialogMessage.innerText='SurfWatch has blocked access to the requested page.';
				openDialog();
			break;
			default:location.go(textInput.value);closePanel();
		}
	}
	function showCurrentURL(){
		if(iframe.contentDocument!==null){textInput.value=iframe.contentDocument.location.href;}
		else{playSound(errorSound);bottomMessage.textContent='Could not get page URL.'}
	}function clearURL(){textInput.value='http://';}
}

window.view=function(){
	//This code sucks. Really wish I could make it better.
	if(tvFrame.classList.contains('hidden')){
		hideOptionsBarNoSound();
		stopBGMusic();
		setTimeout(function(){
			//Switch to TV mode
			playSound(viewSound);
			statusBar.classList.remove('slide-in');
			iframe.offsetHeight;
			iframe.classList.add('flip');
			statusBar.classList.add('slide-out');
			tvFrame.contentWindow.location.replace('TV/TVHome.html');
			iframe.setAttribute('aria-hidden','true');
			tvFrame.setAttribute('aria-hidden','false');
			setTimeout(function(){
				iframe.classList.remove('shown');
				iframe.classList.remove('flip');
				iframe.classList.add('hidden');
				tvFrame.classList.remove('hidden');
				tvFrame.classList.add('shown');
				tvFrame.classList.add('flip');
				setTimeout(function(){
					tvFrame.classList.remove('flip');
					tvFrame.focus();
				},250);
			},250);
		},750);
	}else{
		setTimeout(function(){
			//Switch to Web mode
			playSound(viewSound);
			tvFrame.classList.remove('flip-back');
			statusBar.classList.add('slide-in');
			tvFrame.offsetHeight;
			tvFrame.classList.add('flip-back');
			statusBar.classList.remove('slide-out');
			iframe.setAttribute('aria-hidden','false');
			tvFrame.setAttribute('aria-hidden','true');
			setTimeout(function(){
				tvFrame.classList.remove('shown');
				tvFrame.classList.add('hidden');
				tvFrame.classList.remove('flip');
				iframe.classList.remove('hidden');
				iframe.classList.add('shown');
				iframe.classList.add('flip-back');
				tvFrame.contentWindow.location.replace('blank.html');
				setTimeout(function(){
					statusBar.classList.remove('slide-in');
					tvFrame.classList.remove('flip-back');
					iframe.classList.remove('flip-back');
					iframe.focus();
				},250);
			},250);
		},750);
	}
}

window.send=function(email){
	hideOptionsBarNoSound();
	removeNoSelects();
	pretext.textContent='To:';
	pretext.style.color='var(--webtv-link)';
	bottomMessage.textContent=`Send "${document.querySelector('.page-name').textContent}" by electronic mail.`;
	if(email){textInput.value=email;}else{textInput.value='';}
	panelSubmit.textContent='Send Page';
	panelSubmit.onclick=doSend;
	panelClear.onclick=clearEmail;
	panelAction.classList.add('noselect');
	panelAction.style.display='none';
	openPanel();
	function clearEmail(){textQuery.value='';}
	function doSend(){window.open(`mailto:${textInput.value}?body=${location.href}`,'_blank');closePanel();}
}

//Bottom row buttons
window.music=function(){
	hideOptionsBarNoSound();
	const musicIndicator=document.getElementById('musicIndicator');
	if(musicIndicator.classList.contains('active')){stopBGMusic();}else{startBGMusic();}
}

window.print=function(){
	hideOptionsBarNoSound();
	setTimeout(function(){iframe.contentWindow.postMessage({type:'print'},'*');},350);
}

window.hangUp=function(){
	const reconnectPanel=document.getElementById('reconnectPanel');
	hideOptionsBarNoSound();
	resetSelectionBox();
	stopBGMusic();
	if(panel.classList.contains('show')||panel.classList.contains('showing')){closePanel();}
	reconnectPanel.style.display='flex';
	reconnectPanel.showModal();
	document.getElementById('reconnectButton').classList.remove('noselect');
	document.querySelector('.status-indicator').classList.add('disconnected');
	setTimeout(function(){highlightNoScroll(document.getElementById('reconnectButton'));},500);//because my js is wack and something is causing it to defocus
}

//Reconnect logic
window.reconnect=function(){
	const reconnectPanel=document.getElementById('reconnectPanel');
	playSound(modem);
	resetSelectionBox();
	reconnectPanel.style.display='none';
	reconnectPanel.close();
	document.getElementById('reconnectButton').classList.add('noselect');
	document.querySelector('.status-indicator').classList.remove('disconnected');
	checkBGMusicStatus();
}
document.getElementById('reload').addEventListener('click',function(e){reload(e);});
window.reload=function(e){
	hideOptionsBarNoSound();
	const crossOriginReload='Page is cross-origin, sending reload event and hoping for the best';
	function standardReload(){
		console.debug('Standard reload requested.');
		if(iframe.contentDocument!==null){iframe.contentWindow.location.reload();}
		else{console.debug(crossOriginReload);iframe.contentWindow.postMessage({type:'reload'},'*');}
	}
	if(e){
		if(e.ctrlKey||e.metaKey||e.shiftKey){
			console.debug('Force reload requested!');
			if(iframe.contentDocument!==null){iframe.contentWindow.location.reload(true);}
			else{console.debug(crossOriginReload);iframe.contentWindow.postMessage({type:'forceReload'},'*');}
		}else{standardReload();}
	}else{standardReload();}//Fall back to standard reload if function not called from event
}

window.pip=function(){
	const pipIndicator=document.getElementById('pipIndicator');
	const pipWindow=document.getElementById('pipWindow');
	const pipVideo=document.getElementById('pipVideo');
	function showPipWindow(){
		pipIndicator.classList.add('active');
		pipWindow.style.display='block';
		setTimeout(function(){pipWindow.classList.remove('hide');pipWindow.classList.remove('hidden');pipWindow.classList.add('show');},500);
		if(musicIndicator.classList.contains('active')){stopBGMusic();}
		hideOptionsBarNoSound();
		pipVideo.contentWindow.location.replace('https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?autoplay=1');
		function showVideo(){this.style.visibility='visible';this.removeEventListener('load',showVideo);}
		pipVideo.addEventListener('load',showVideo);
	}
	function hidePipWindow(){
		pipIndicator.classList.remove('active');
		setTimeout(function(){pipWindow.classList.remove('show');pipWindow.classList.add('hide');pipWindow.classList.add('hide');},500);
		checkBGMusicStatus();
		hideOptionsBarNoSound();
		pipVideo.style.visibility='hidden';
		pipVideo.contentWindow.location.replace('blank.html');
	}if(pipIndicator.classList.contains('active')){hidePipWindow();}else{showPipWindow();}
}

window.openPanel=function(){
	iframe.classList.add('noFocus');
	focus({preventScroll:true});
	panel.classList.remove('hide','hiding');
	setTimeout(function(){
		panel.classList.add('show');
		playSound(panelSlide);
		highlightNoScroll(textInput);
		setTimeout(function(){panel.classList.add('showing');panel.classList.remove('show');},300);
	},290);
}
window.closePanel=function(){
	iframe.classList.remove('noFocus');
	panel.classList.remove('show','showing');
	panel.classList.add('hide');
	setTimeout(function(){
		pretext.style.width='10%';
		pretext.style.color='var(--webtv-yellow)';
		textInput.style.display='unset';
		textInput.style.type='text';
		textInput.classList.add('noselect');
		bottomMessage.style.bottom='7vw';
		panelClear.style.display='unset';
		panelClear.classList.add('noselect');
		panelCancel.style.display='unset';
		panelCancel.classList.add('noselect');
		panelSubmit.style.top='6.5vw';
		panelSubmit.style.display='unset';
		panelSubmit.classList.add('noselect');
		panelAction.style.display='unset';
		panelAction.classList.add('noselect');
		playSound(panelSlide);
		resetSelectionBox();
	},200);
	setTimeout(function(){panel.classList.add('hiding');panel.classList.remove('hide');},300);
}

//Background music, baby!
const bgMusic=document.getElementById('bgmusic');
const musicIndicator=document.getElementById('musicIndicator');
const musicList=[
	'audio/music/ambient/sunlane.mp3',
	'audio/music/classical/minuet.mp3',
	'audio/music/keyboards/catacombs.mp3',
	'audio/music/keyboards/home_wtv.mp3',
	'audio/music/upbeat/jetset.mp3',
	'audio/music/ROMCache/prealphaDialing.mp3',
	'audio/music/other/aoltv.mp3',
	'audio/music/other/joeb.mp3'
];
function shuffle(array){
	for(let i=array.length-1;i>0;i--){
		const j=Math.floor(Math.random()*(i+1));
		const k=array[i];
		array[i]=array[j];
		array[j]=k;
	}
}
let shuffledMusicList=[...musicList];
let currentSongIndex=0;
let musicPlaying;
window.startBGMusicWithDelay=function(ms){setTimeout(startBGMusic,ms);}
window.startBGMusic=function(){
	musicIndicator.classList.add('active');
	document.getElementById('music').setAttribute('aria-pressed','true');
	shuffle(shuffledMusicList);
	if(!bgMusic.src){bgMusic.src=shuffledMusicList[currentSongIndex];}
	bgMusic.currentTime=0;
	bgMusic.play();
	bgMusic.addEventListener('ended',playNextSong);
	showAudioscope();
	musicPlaying=true;
}
window.stopBGMusic=function(){
	musicPlaying=false;
	musicIndicator.classList.remove('active');
	document.getElementById('music').setAttribute('aria-pressed','false');
	fadeOutMusic();
	hideAudioscope();
}
function playNextSong(){
	bgMusic.removeEventListener('ended',playNextSong);
	currentSongIndex=(currentSongIndex+1)%shuffledMusicList.length;
	bgMusic.src=shuffledMusicList[currentSongIndex];
	bgMusic.currentTime=0;
	bgMusic.play();
	bgMusic.addEventListener('ended',playNextSong);
}
function pickNextSong(){
	bgMusic.removeEventListener('ended',playNextSong);
	currentSongIndex=(currentSongIndex+1)%shuffledMusicList.length;
	bgMusic.src=shuffledMusicList[currentSongIndex];
	bgMusic.currentTime=0;
	bgMusic.addEventListener('ended',playNextSong);
}
window.fadeOutMusic=function(){
	bgMusic.volume=bgMusic.volume-0.01;
	const fadeOutInterval=setInterval(function(){
		if(bgMusic.volume>0){bgMusic.volume=Math.max(0,bgMusic.volume-0.01);}
		else{
			clearInterval(fadeOutInterval);
			pickNextSong();
			bgMusic.volume=1;
		}
	},0.5*10);//First value is the fade-out duration in seconds
}
window.checkBGMusicStatus=function(){
	async function check(message){
		iframe.contentWindow.postMessage({type:'bgMusicQuery'},'*');
		let status=new Promise(function(resolve,reject){
			function messageHandler(e){
				if(e.data&&e.data.type==='bgmStatus'){
					if(e.data.status==='enabled'){resolve(1);}
					else if(e.data.status==='disabled'){resolve(0);}
					else{resolve(0);}
				}
			}window.addEventListener('message',messageHandler);
			setTimeout(function(){
				window.removeEventListener('message',messageHandler);
				resolve(0);
			},1000);
		});return status;
	}if(check===1){startBGMusicWithDelay(500);}else if(check===0){pickNextSong();}else{startBGMusicWithDelay(500);}
}

//Audioscope logic
setTimeout(function(){statusContainer.classList.remove('has-audioscope');},10);
window.toggleAudioscope=function(){if(statusContainer.classList.contains('has-audioscope')){hideAudioscope();}else{showAudioscope();}}
window.showAudioscope=function(){statusContainer.classList.add('has-audioscope');}
window.hideAudioscope=function(){statusContainer.classList.remove('has-audioscope');}

/*Audioscope styling workaround, no longer needed but kept for reference
const statusbarAudioscope=document.querySelector('.status-container webtv-audioscope');
if(statusbarAudioscope&&statusbarAudioscope.shadowRoot){
	if(statusbarAudioscope.shadowRoot.querySelector('canvas')){canvas.style.borderRadius='0.4vw';}
}
*/

//Sidebar toggling logic, parent-side
function toggleSidebar(){iframe.contentWindow.postMessage({type:'toggleSidebar'},'*');}

//Loading panel logic
const loadingPanel=document.getElementById('loadingPanel');
const loadingMessage=document.getElementById('loadingMessage');
const loadingIndicator=document.querySelector('.status-indicator');
window.startLoading=function startLoading(){
	console.debug('startLoading called, showing loading indicator');
	loadingPanel.style.visibility='visible';
	loadingPanel.removeAttribute('aria-hidden');
	loadingMessage.textContent='Contacting service';
	loadingIndicator.classList.add('loading');
	function getIframeTitle(){
		if(iframe.contentDocument===null){loadingMessage.textContent='Getting page';return;}
		const iframeTitle=iframe.contentDocument.title;
		if(iframeTitle){loadingMessage.textContent=iframeTitle;}else{setTimeout(getIframeTitle,10);}
	}getIframeTitle();
}
window.stopLoading=function(){
	console.debug('stopLoading called, hiding loading indicator');
	loadingPanel.setAttribute('aria-hidden','true');
	loadingPanel.style.visibility='hidden';
	loadingMessage.textContent='beans';
	loadingIndicator.classList.remove('loading');
}
iframe.addEventListener('load',stopLoading);

//Dialog/showAlert logic
window.dialog=document.getElementById('dialog');
window.dialogLogo=document.getElementById('dialogLogo');
window.dialogMessage=document.getElementById('dialogMessage');
window.dialogButton=document.getElementById('dialogButton');
function sanitizeHTML(html){
	const temp=document.createElement('div');
	temp.innerHTML=html;
	const scripts=temp.getElementsByTagName('script');
	for(let i=0;i<scripts.length;i++){scripts[i].parentNode.removeChild(scripts[i]);}
	const elementsWithEvents=temp.querySelectorAll('[onclick],[ondblclick],[onload],[onmouseover],[onmouseout],[onkeydown],[onkeyup],[onkeypress],[onchange],[onsubmit],[onblur],[onfocus],[onabort],[onerror],[onresize],[onscroll]');
	for(let j=0;j<elementsWithEvents.length;j++){
		const e=elementsWithEvents[j];
		e.removeAttribute('onclick');
		e.removeAttribute('ondblclick');
		e.removeAttribute('onload');
		e.removeAttribute('onmouseover');
		e.removeAttribute('onmouseout');
		e.removeAttribute('onkeydown');
		e.removeAttribute('onkeyup');
		e.removeAttribute('onkeypress');
		e.removeAttribute('onchange');
		e.removeAttribute('onsubmit');
		e.removeAttribute('onblur');
		e.removeAttribute('onfocus');
		e.removeAttribute('onabort');
		e.removeAttribute('onerror');
		e.removeAttribute('onresize');
		e.removeAttribute('onscroll');
	}return temp.innerHTML;
}
alert=function(text){
	dialogLogo.style.backgroundImage='url(images/JSAlert.svg)';
	dialogMessage.innerHTML=sanitizeHTML(text);
	dialogButton.textContent='OK';
	alertSound=errorSound;
	openDialog();
}
window.showAlert=function(text){
	dialogLogo.style.backgroundImage='url(images/WebTVShadowInset.svg)';
	dialogMessage.innerHTML=sanitizeHTML(text);
	dialogButton.textContent='Continue';
	alertSound=errorSound;
	openDialog();
}
function setAlertText(txt){dialogMessage.innerHTML=sanitizeHTML(txt);}
function setAlertImage(img){dialogLogo.style.backgroundImage=img;}
function setAlertButtonText(label){dialogButton.textContent=label;}
function setAlertButtonAction(){dialogButton.addEventListener('click',function(){iframe.contentWindow.postMessage({type:'doAlertAction'},'*');});}
function setAlertSound(snd){alertSound=new Audio(snd);}
window.openDialog=function(){
	resetSelectionBoxIframe();
	setTimeout(function(){
		playSound(alertSound);
		dialog.classList.remove('hidden');
		dialog.classList.add('shown');
		dialog.setAttribute('aria-hidden','false');
		dialog.showModal();
		dialogButton.classList.remove('noselect');
		resetSelectionBox();
		highlightNoScroll(dialogButton);
	},2);
}
window.closeDialog=function(){
	setTimeout(function(){
		dialog.classList.remove('shown');
		dialog.classList.add('hidden');
		dialog.close();
		dialog.setAttribute('aria-hidden','true');
		dialogButton.classList.add('noselect');
		resetSelectionBox();
		dialogMessage.textContent='';
		dialogButton.textContent='Continue';
		dialogLogo.style.backgroundImage='url(images/WebTVShadowInset.svg)';
		dialogButton.removeEventListener('click',function(){action});
		iframe.focus();
	},2);
}

function doBarrelRoll(){
	closePanel();
	setTimeout(function(){
		playSound(viewSound);
		iframe.classList.remove('broll-back');
		statusBar.classList.remove('slide-in');
		iframe.offsetHeight;
		iframe.classList.add('broll');
		statusBar.classList.add('slide-out');
		setTimeout(function(){
			iframe.classList.add('broll-back');
			iframe.classList.remove('broll');
			statusBar.classList.remove('slide-out');
			statusBar.classList.add('slide-in');
			setTimeout(function(){statusBar.classList.remove('slide-in');},5000);
		},5000);
	},750);
}

function resetSelectionBoxes(){resetSelectionBox();resetSelectionBoxIframe();}
function resetSelectionBoxIframe(){
	if(iframe.contentWindow===null){return;}
	iframe.contentWindow.postMessage({type:'resetSelectionBox'},'*');
}

//Modified functions from main.js - button sounds and tabindexes
const inputs=document.querySelectorAll('.input');
const submitInputs=document.querySelectorAll('.submit');
const clickableStuff=document.querySelectorAll('.clickable');
const inputNoSound=document.querySelectorAll('.inputNoSound');
function preventSound(){inputSound.pause();}
for(let i=0;i<clickableStuff.length;i++){
	clickableStuff[i].addEventListener('mouseenter',function(){highlightNoScroll(this);});
	clickableStuff[i].addEventListener('click',function(){playSound(clickSound);});
	clickableStuff[i].setAttribute('tabindex',0);
}
for(let j=0;j<inputs.length;j++){
	inputs[j].addEventListener('mouseenter',function(){highlightNoScroll(this);});
	inputs[j].addEventListener('click',function(){playSound(inputSound);});
	inputs[j].setAttribute('tabindex',0);
}
for(let k=0;k<submitInputs.length;k++){
	submitInputs[k].addEventListener('mouseenter',function(){highlightNoScroll(this);});
	submitInputs[k].addEventListener('click',function(){playSound(submitSound);});
	submitInputs[k].setAttribute('tabindex',0);
}
for(let l=0;l<inputNoSound.length;l++){
	inputNoSound[l].addEventListener('mouseenter',function(){highlightNoScroll(this);});
	inputNoSound[l].addEventListener('click',function(){preventSound();});
	inputNoSound[l].setAttribute('tabindex',0);
}

//Prevent running directly from disk since it doesn't function properly without a server
if(location.href.startsWith('file://')){
	iframe.remove();
	tvFrame.remove();
	statusBar.remove();
	optionsBar.remove();
	reconnectPanel.remove();
	loadingPanel.remove();
	pipWindow.remove();
	panel.remove();
	selectionBox.remove();
	document.querySelector('.perspective-fix').remove();
	document.title='Error';
	alert('WebTV HD requires a server and will not function properly if index.html is run directly in your browser (or saved to disk).');
	dialogButton.textContent='Explain';
	dialogButton.addEventListener('click',function(){setTimeout(function(){location.replace(`https://github.com/SKCro/WebTV-HD/wiki/Why-can't-I-run-WebTV-HD-by-opening-index.html%3F`);},220);});
}