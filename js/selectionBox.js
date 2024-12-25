//Create selection box and append it to page
window.selectionBox=document.createElement('div');
selectionBox.id='selectionBox';
selectionBox.setAttribute('aria-hidden','true');
document.body.appendChild(selectionBox);

let selectedElement=null;
function highlight(e){
	selectedElement=e;
	try{selectedElement.focus({focusVisible:false});}catch(error){}
	if(disableScrolling!==true){updateSelectionBox(2);}else{updateSelectionBox();}
}
function highlightNoScroll(e){
	selectedElement=e;
	try{selectedElement.focus({preventScroll:true,focusVisible:false});}catch(error){}
	updateSelectionBox();
}
function resetSelectionBox(){
	try{selectedElement.blur();}catch(error){}
	selectedElement=null;updateSelectionBox();
}

let disableScrolling=false;
if(location.pathname==='/'||location.pathname==='index.html'){disableScrolling=true;}

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
				if(disableScrolling===true){console.error('scroll attempted!');console.trace();return;}
				if(disableScrolling!==true&&isElementOffScreen(selectedElement)){selectedElement.scrollIntoView({behavior:'smooth',block:'end',inline:'end'});}
				selectedElement.focus({focusVisible:false});}catch(error){}
			}
		}
	}else{selectionBox.style.display='none';}
}
addEventListener('resize',updateSelectionBox);
addEventListener('wheel',updateSelectionBox);
setInterval(updateSelectionBox,1);//Gotta find a better way to do this - maybe only update when changes to the element are detected?
function checkIfInteractive(e){
	return(
		(e.classList.contains('clickable')||e.classList.contains('submit'))
		&&!e.classList.contains('noselect')
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
	if(checkIfInteractive(clickedElement)){
		selectedElement=clickedElement;
		updateSelectionBox(1);
	}else{updateSelectionBox();}
});
addEventListener('keydown',function(e){
	if(e.key==='Tab'){
		e.preventDefault();
		if(selectedElement&&selectedElement.tagName==='INPUT'){selectedElement.blur();}
		const interactiveElements=getInteractiveElements();
		const index=interactiveElements.indexOf(selectedElement);
		if(e.shiftKey){selectedElement=interactiveElements[(index-1+interactiveElements.length)%interactiveElements.length];}
		else{selectedElement=interactiveElements[(index+1)%interactiveElements.length];}
		updateSelectionBox(2);
	}else if(e.key==='Enter'){
		if(selectedElement){
			if(selectedElement.tagName==='INPUT'&&selectedElement.type!=='submit'&&selectedElement.type!=='button'&&selectedElement.type!=='reset'){
				updateSelectionBox();
				selectedElement.click();
				selectedElement.focus({preventScroll:true});
			}else if(selectedElement.tagName==='g'){
				selectedElement.dispatchEvent(new MouseEvent('click',{bubbles:true,cancelable:true,view:window}));
				updateSelectionBox(1);
			}else{updateSelectionBox(1);selectedElement.click();}
		}
	}
});