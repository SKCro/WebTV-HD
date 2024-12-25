'use strict';
function getCookie(name){
	const cookies=document.cookie.split(';');
	for(let i=0;i<cookies.length;i++){
		const cookie=cookies[i].trim();
		if(cookie.startsWith(`${name}=`)){return cookie.substring(name.length+1);}
	}return null;
}
window.cookieExists=function(name){return document.cookie.split(';').some(function(cookie){return cookie.trim().startsWith(`${name}=`);});}
window.setCookie=function(name,value){document.cookie=`${name}=${value}; path=/`;}
if(cookieExists&&cookieExists('useSKCroTheme')){window.addEventListener('DOMContentLoaded',function(){
	if(getCookie('useSKCroTheme')==='true'){document.body.classList.add('SKCro');parent.postMessage({type:'theme',theme:1},'*');}
	else{parent.postMessage({type:'theme',theme:0},'*');}
});}
//Dynamic username change
addEventListener('DOMContentLoaded',function(){
	const dynamicUsername=document.querySelectorAll('.dynamic-username');
	if(cookieExists&&cookieExists('username')){dynamicUsername.forEach(function(u){u.textContent=getCookie('username');})}
});