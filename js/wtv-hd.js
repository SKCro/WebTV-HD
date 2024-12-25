'use strict';
/*
	WebTV HD compatibility script - See https://github.com/SKCro/WebTV-HD for details.

	Add this script to every page on your site to make it more compatible with WebTV HD.
	/!\ Place the script at the very end of the body so everything can load in beforehand, otherwise you'll probably get errors - the script relies on the page being fully loaded in beforehand. /!\
	This script will send basic metadata (page title and address) to WTV-HD and enable exclusive functionality once verified.

	Note that this script redefines alert() in a way that doesn't block script execution while the message is shown, so keep that in mind. See line 23.
	It also remaps the "Del" key (not backspace) to open the options bar. See line 129.

	Yes, I know, the code is a mess. I'm sorry.
*/

//Verify if the iframe is actually WebTV HD before sending metadata - yes, I know this security method is lame. I'll probably tighten it up later, but for now, it's good for testing.
//I should probably limit the message source to the current instance of WebTV HD, which is at https://skcro.github.io/WebTV-HD, although I'll also be hosting the beta version, so it would break if I did that. I dunno.
if(window.self!==window.top){//If the current window isn't the top one...
	parent.postMessage({type:'QueryForWebTVHD'},'*');//Post a message querying for WebTV HD...
	addEventListener('message',doInit);//Then once that message is recieved, start other functions
	function doInit(e){
		if(e.data&&e.data.type==='Yes, I am the real SKCro!'){
			init();
			removeEventListener('message',doInit);
		}
	}
	function init(){//Main functionality
		//Alert-related functionality
		alert=function(text){parent.postMessage({type:'jsalert',text:text},'*');}//Redefine alert to use WebTV-style alert dialogs - it still works the same, but doesn't block execution of scripts
		function showAlert(text){parent.postMessage({type:'alert',text:text},'*');}//Add support for service-style alert dialogs that use the WebTV logo instead
		window.tempAction='';//Temporary place to store the action while it's queued
		function showCustomAlert(text,image,label,action){//Example usage: showCustomAlert(`<h1>beans</h1>`,'https://www.recipetineats.com/wp-content/uploads/2014/05/Homemade-Heinz-Baked-Beans_0-SQ.jpg','beans','none');
			window.tempAction=action;
			try{
				if(text&&image&&label&&action){
					if(text!==null&&text!=='none'){parent.postMessage({type:'alertText',text:text},'*');}
					if(image!==null&&image!=='none'){parent.postMessage({type:'alertImage',image:image},'*');}
					if(label!==null&&label!=='none'){parent.postMessage({type:'alertButtonText',label:label},'*');}
					if(action!==null&&action!=='none'){parent.postMessage({type:'alertButtonAction'},'*');}
					parent.postMessage({type:'showCustomAlert'},'*');
				}else{showAlert(`Usage: showCustomAlert('Alert text', 'Image URL', 'Button Label', 'Button Action Code'); Use 'none' if you don't want to specify part of a dialog.`);}
			}catch(error){
				parent.postMessage({type:'alertSound',sound:`audio/doh.mp3`},'*');
				showCustomAlert(`D'oh! ${error} | See console for details.`, 'images/JSAlert.svg', 'Dang it...', 'none');
				console.log(error);
			}
		}
		window.linkHandler=function(url){location.href=url;}//Useful for buttons or other clickable things that don't support href

		//Page name updater - monitors page title and reports any changes back to WTV-HD
		const observer=new MutationObserver(updatePageName);//Set up a new observer to, well, observe page name updates
		function updatePageName(){parent.postMessage({type:'title',title:document.title},'*');}//Send a message to the parent iframe with the current document title
		function trackName(){
			updatePageName();//Send page name once updates are detected
			observer.disconnect();//Disconnect any existing observers to prevent duplicates
			observer.observe(document.querySelector('title'),{subtree:true,characterData:true,childList:true});//Tell the observer to look for changes in the page name
		}trackName();//Kick off the page name updater

		/* <display> tag reimplementation
			HOW TO USE:
			Add a <meta name=display> tag to the header of your page. Set the content to one or more of the following:
			noScroll - prevent scrolling the page (although this is probably better achieved with CSS)
			noStatus - hide the status bar (which also prevents opening the options menu, so use with care)
			noMusic - disable the user's background music (use if your site has content that the background music might interfere with, like videos)
			For example: <meta name=display content="noMusic noStatus">
		*/
		const displayTag=document.querySelector('meta[name="display"]');//Get the display tag from the document, if any
		if(displayTag){//If the display tag exists...
			const displayOptions=displayTag.getAttribute('content').split(' ');//Get its content and post messages if certain attributes are found
			if(displayOptions.includes('noScroll')){console.debug('Scrolling disabled - noScroll is set in the display tag.');document.querySelector('html').style.overflow='hidden';document.body.style.overflow='hidden';}
			if(displayOptions.includes('noStatus')){parent.postMessage({type:'display',attribute:'noStatus'},'*');}
			if(displayOptions.includes('noMusic')){parent.postMessage({type:'display',attribute:'noMusic'},'*');}
		}else{parent.postMessage({type:'display',attribute:'none'},'*');}//If there isn't any display tag, just post none so WTV-HD knows that the page doesn't have any special properties

		/* <bgsound> tag reimplementation
			HOW TO USE:
			Add a <meta name=bgsound> tag to the header of your page. Set the content to the absolute source URL of a music file, preferably an MP3 (since modern browsers don't do MIDI).
			If the music shouldn't loop (it does by default), add ";" to the end of the URL.
			For example: <meta name=bgsound content="https://example.com/bgsound.mp3">
		*/
		const bgsound=document.querySelector('meta[name="bgsound"]');//Get the bgsound tag from the document, if any
		if(bgsound){//If the bgsound tag exists...
			const bgsoundSrc=bgsound.getAttribute('content');//Get its content...
			if(bgsoundSrc){parent.postMessage({type:'bgsound',source:bgsoundSrc},'*');}//...and post a message if a source is found
		}else{parent.postMessage({type:'bgsound',source:'none'},'*');}//If there isn't any display tag, just post none so WTV-HD knows that the page doesn't have any bgmusic

		//Message handlers
		function handleMessage(e){//Listen for messages from WebTV HD
			switch(e.data.type){
				case 'BGMusicQuery'://If the message is "BGMusicQuery", check if the display tag contains noMusic, and report the status back
					const displayTag=document.querySelector('meta[name="display"]');
					if(displayTag&&displayOptions.includes('noMusic')){parent.postMessage({type:bgmStatus,status:'disabled'},'*');}else{parent.postMessage({type:bgmStatus,status:'enabled'},'*');}
				break;
				case 'doAlertAction':eval(tempAction);tempAction='';break;//If the message is "doAlertAction", execute the code set earlier by an alert and clear the action
				case 'find'://If the message is "find", and we have a search term...
					const term=find(e.data.term);//...look for the term on the page and highlight it if we found it
					if(term){parent.postMessage({type:'matchFound'},'*');}//If the term was found, tell WTV-HD that we found the term (which closes the find panel)
					else{parent.postMessage({type:'noMatchFound'},'*');}//Or, if we didn't find it, tell WTV-HD just that (which brings up an error message)
				break;
				case 'print':print();break;//If the message is "print", prompt the user to print the page
				case 'reload':location.reload();break;//If the message is "reload" or "forceReload", reload the page, clearing the cache if necessary
				case 'forceReload':location.reload(true);break;
				case 'toggleSidebar'://If the message is "toggleSidebar"...
					const sidebar=document.querySelector('.sidebar');//Locate the sidebar or navigation bar
					const nav=document.querySelector('.side-nav');
					function show(e){//Show sidebar
						playSound('panelUp');
						e.classList.remove('hiding','hide');
						e.classList.add('show');
						resetSelectionBox();
					}
					function hide(e){//Hide sidebar
						playSound('panelDown');
						e.classList.remove('showing','show');
						e.classList.add('hide');
						resetSelectionBox();
					}
					if(sidebar){//If there's a sidebar, show or hide it
						if(sidebar.classList.contains('show')||sidebar.classList.contains('showing')){hide(sidebar);}else{show(sidebar);}
					}else if(nav){//If there's a side nav, show or hide it
						if(nav.classList.contains('show')||nav.classList.contains('showing')){hide(nav);}else{show(nav);}
					}else{playSound('bonkSound');console.trace();}//If there's neither, just play the bonk sound effect
				break;
				case 'resetSelectionBox':resetSelectionBox();break;//If the message is "resetSelectionBox", do just that :P
				default:console.info(`Cross-origin page received unknown message type: ${e.data.type}\n${e.data}`);//If it's a message we don't recognize, log it to the console
			}
		}
		addEventListener('message',handleMessage);

		//Loading indicator code - when the page hides via navigation, tell WTV-HD so it can show the loading indicator and hide the audioscope (if necessary)
		addEventListener('pagehide',function(){
			parent.postMessage({type:'loading'},'*');
			parent.postMessage({type:'hideAudioscope'},'*');
		});

		//Make the Del key open the options bar - remove if you don't want this functionality
		document.addEventListener('keydown',function(e){if(e.keyCode===46){e.preventDefault();parent.postMessage({type:'showOptionsBar'},'*');parent.focus();}});

		//Scan for and attach the clickable attribute to all clickable elements - just anchors and stuff with an inline onClick handler for now
		//To opt a tag out of being clickable, add the "noselect" class to it - it will still have the clickable class attached (and thus, will still play click sounds) but the selection box won't highlight it
		document.querySelectorAll('a,[onclick]').forEach(function(e){e.classList.add('clickable');});

		//Selection box
		window.selectionBox=document.createElement('div');
		const selectionBoxStyles=document.createElement('style');
		selectionBox.id='selectionBox';
		selectionBox.setAttribute('aria-hidden','true');
		selectionBox.style.position='fixed';
		selectionBoxStyles.textContent=`#selectionBox{
	content:'';
	display:none;
	position:fixed;
	border-style:solid;
	border-image-source:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI3IDFoMnYxaC0yek0xIDI3aDF2Mkgxek0wIDNoMXYyNUgwem0wLTFoMnYxSDB6bTEtMWgydjFIMXptMS0xaDI2djFIMnoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZmlsbD0iI2ZmZTM0NyIgZD0iTTMgMWgyNHYxSDN6TTIgMmgxdjFIMnpNMSAzaDF2MjRIMXoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZmlsbD0iI2ZmY2IwMCIgZD0iTTI1IDRoMXYxaC0xem0xLTFoMXYxaC0xem0xIDBoMXYyM2gtMXptLTEgMjNoMnYxaC0yek0yIDI3aDI1djFIMnptMi0xaDF2MUg0em0tMi0xaDJ2Mkgyek00IDNoMXYxSDR6TTMgMmgyNXYxSDN6TTIgM2gydjJIMnptMCAyaDF2MjBIMnoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZmlsbD0iI2ZmZTU0NyIgZD0iTTUgMjZoMjF2MUg1ek0yNiA0aDF2MjFoLTF6bS0xIDIxaDJ2MWgtMnpNNCAyNWgxdjFINHoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZmlsbD0iI2NlYTUwMCIgZD0iTTUgM2gyMXYxSDV6TTMgNWgxdjIwSDN6bTEtMWgxdjFINHpNMiAyOGgyNXYxSDJ6bTI1LTFoMXYxaC0xem0xLTI1aDF2MjVoLTF6IiBvcGFjaXR5PSIuNyIvPjxwYXRoIGZpbGw9IiNmZmYiIGQ9Ik01IDI1aDIwdjFINXptMTktMWgxdjFoLTF6bTEtMTloMXYyMGgtMXoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZD0iTTQgNWgxdjIwSDR6bTEtMWgyMHYxSDV6TTIgMjloMjZ2MUgyem0yNS0xaDJ2MWgtMnptMS0xaDJ2MWgtMnptMS0yNWgxdjI1aC0xeiIgb3BhY2l0eT0iLjUiLz48L3N2Zz4=);
	border-image-slice:5;
	border-image-width:5px;
	border-image-outset:4px;
	border-image-repeat:stretch;
	border-color:#0000;
	box-sizing:border-box;
	pointer-events:none;
	z-index:99999;
}#selectionBox.green{border-image-source:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMCIgaGVpZ2h0PSIzMCI+PHBhdGggZmlsbD0iI2ZmZiIgZD0iTTI3IDFoMnYxaC0yek0xIDI3aDF2Mkgxek0wIDNoMXYyNUgwem0wLTFoMnYxSDB6bTEtMWgydjFIMXptMS0xaDI2djFIMnoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZmlsbD0iIzVjZmQ0NyIgZD0iTTMgMWgyNHYxSDN6TTIgMmgxdjFIMnpNMSAzaDF2MjRIMXoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZmlsbD0iIzJkZmQwMCIgZD0iTTI1IDRoMXYxaC0xem0xLTFoMXYxaC0xem0xIDBoMXYyM2gtMXptLTEgMjNoMnYxaC0yek0yIDI3aDI1djFIMnptMi0xaDF2MUg0em0tMi0xaDJ2Mkgyek00IDNoMXYxSDR6TTMgMmgyNXYxSDN6TTIgM2gydjJIMnptMCAyaDF2MjBIMnoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZmlsbD0iIzVjZmQ0NyIgZD0iTTUgMjZoMjF2MUg1ek0yNiA0aDF2MjFoLTF6bS0xIDIxaDJ2MWgtMnpNNCAyNWgxdjFINHoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZmlsbD0iIzJkZmQwMCIgZD0iTTUgM2gyMXYxSDV6TTMgNWgxdjIwSDN6bTEtMWgxdjFINHoiIG9wYWNpdHk9Ii43Ii8+PHBhdGggZmlsbD0iIzI0Y2QwMCIgZD0iTTIgMjhoMjV2MUgyem0yNS0xaDF2MWgtMXptMS0yNWgxdjI1aC0xeiIgb3BhY2l0eT0iLjciLz48cGF0aCBmaWxsPSIjZmZmIiBkPSJNNSAyNWgyMHYxSDV6bTE5LTFoMXYxaC0xem0xLTE5aDF2MjBoLTF6IiBvcGFjaXR5PSIuNyIvPjxwYXRoIGQ9Ik00IDVoMXYyMEg0em0xLTFoMjB2MUg1ek0yIDI5aDI2djFIMnptMjUtMWgydjFoLTJ6bTEtMWgydjFoLTJ6bTEtMjVoMXYyNWgtMXoiIG9wYWNpdHk9Ii41Ii8+PC9zdmc+);}`;
		document.body.appendChild(selectionBoxStyles);
		document.body.appendChild(selectionBox);
		window.selectedElement=null;
		window.highlight=function(e){
			selectedElement=e;
			try{selectedElement.focus({focusVisible:false});}catch(error){}
			updateSelectionBox(2);
		}
		window.highlightNoScroll=function(e){
			selectedElement=e;
			try{selectedElement.focus({preventScroll:true,focusVisible:false});}catch(error){}
			updateSelectionBox();
		}
		window.resetSelectionBox=function(){try{selectedElement.blur();}catch(error){}selectedElement=null;updateSelectionBox();}
		function updateSelectionBox(v){
			if(selectedElement){
				const elementRect=selectedElement.getBoundingClientRect();
				//Apply calculated dimensions and position to the selection box
				selectionBox.style.top=elementRect.top+'px';
				selectionBox.style.left=elementRect.left+'px';
				selectionBox.style.width=elementRect.width+2+'px';
				selectionBox.style.height=elementRect.height+2+'px';
				selectionBox.style.display='block';
				if(v){
					if(v===1){
						//Change the selection box to green
						if(!selectedElement.classList.contains('input')){
							selectionBox.classList.add('green');
							setTimeout(function(){selectionBox.classList.remove('green');},100);
						}
					}else if(v===2){try{
						//Check if the element is offscreen and scroll if it is
						if(isElementOffScreen(selectedElement)){selectedElement.scrollIntoView({behavior:'smooth',block:'end',inline:'end'});}
						selectedElement.focus({focusVisible:false});}catch(error){}
					}
				}
			}else{selectionBox.style.display='none';}
		}
		if(selectionBox){setInterval(updateSelectionBox,1);}//Decrease this if performance becomes a problem
		function checkIfInteractive(e){
			return(
				(e.classList.contains('clickable')||e.classList.contains('submit'))&&!e.classList.contains('noselect')
			 ||(e.tagName==='INPUT'&&!e.classList.contains('noselect'))
			);
		}
		function getInteractiveElements(){
			const allElements=document.querySelectorAll('*');
			const interactiveElements=[];
			for(let i=0;i<allElements.length;i++){if(checkIfInteractive(allElements[i])){interactiveElements.push(allElements[i]);}}
			return interactiveElements;
		}
		//Find the nearest interactive element to a given position
		function findNearestInteractiveElement(x,y){
			const interactiveElements=getInteractiveElements();
			const nearestElement=null;
			const minDistance=Number.MAX_SAFE_INTEGER;
			for(let i=0;i<interactiveElements.length;i++){
				const element=interactiveElements[i];
				const rect=element.getBoundingClientRect();
				const centerX=rect.left+rect.width/2;
				const centerY=rect.top+rect.height/2;
				const distance=Math.sqrt((x-centerX)**2+(y-centerY)**2);
				if(distance<minDistance){minDistance=distance;nearestElement=element;}
			}return nearestElement;
		}
		addEventListener('resize',updateSelectionBox);
		addEventListener('wheel',updateSelectionBox);
		function isElementOffScreen(e){
			const rect=e.getBoundingClientRect();
			return(
				rect.bottom<0||
				rect.right<0||
				rect.left>window.innerWidth||
				rect.top>window.innerHeight
			);
		}
		addEventListener('click',function(e){
			const clickedElement=e.target;
			if(checkIfInteractive(clickedElement)&&clickedElement!==selectedElement){
				selectedElement=clickedElement;
				updateSelectionBox(1);
			}else{updateSelectionBox(2);}
		});
		addEventListener('keydown',function(e){
			if(e.key==='Tab'){
				e.preventDefault();
				if(selectedElement&&selectedElement.tagName==='INPUT'){selectedElement.blur();}
				const interactiveElements=getInteractiveElements();
				const index=interactiveElements.indexOf(selectedElement);
				if(e.shiftKey){selectedElement=interactiveElements[(index-1+interactiveElements.length)%interactiveElements.length];
				}else{selectedElement=interactiveElements[(index+1)%interactiveElements.length];}
				updateSelectionBox();
			}else if(e.key==='Enter'){
				if(selectedElement){
					if(selectedElement.tagName==='INPUT'&&selectedElement.type==='text'||selectedElement.type==='url'||selectedElement.type==='email'){
						updateSelectionBox();selectedElement.click();selectedElement.focus({preventScroll:true});
					}else if(selectedElement.tagName==='g'){selectedElement.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));updateSelectionBox(1);}//Fix for clickable SVG groups
					else{updateSelectionBox(1);selectedElement.click();}
				}
			}
		});
	}

	//Sound effects - also adds tabindex stuff to clickable things to make them focusable
	window.playSound=function(snd){parent.postMessage({type:'sound',soundType:snd},'*');}
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
};