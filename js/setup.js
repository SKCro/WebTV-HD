'use strict';
//Cookie stuff
const cookies=document.cookie.split(';');
function eatCookies(){
	for(var i=0;i<cookies.length;i++){
		var cookie=cookies[i];
		var eqPos=cookie.indexOf("=");
		var name=eqPos>-1?cookie.substr(0,eqPos):cookie;
		document.cookie=name+"=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
	}showCustomAlert('Cookies for WebTV HD settings have been cleared.','none','none','history.back();');
}//Change cookie clear link depending on browser
const clearCookieBrowser=document.getElementById('clearCookiesBrowser');
if(clearCookieBrowser!==null){
	if(navigator.userAgent.indexOf('Chrome')!=-1){clearCookieBrowser.href='https://support.google.com/accounts/answer/32050';}
	else if(navigator.userAgent.indexOf('Firefox')!=-1){clearCookieBrowser.href='https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox#w_clear-cookies-for-any-website';}
	else{clearCookieBrowser.href='https://google.com/search?q=clear+cookies';}
}//Startup logo
const startupLogoChooser=document.getElementById('startupLogo');
if(startupLogoChooser!==null){
	let startupLogoValue;
	if(cookieExists('startupLogo')){
		startupLogoValue=getCookie('startupLogo');
		console.debug(`StartupLogo cookie exists - its value is ${startupLogoValue}.`);
	}else{
		console.debug(`StartupLogo cookie doesn't exist.`);
		startupLogoValue='random';
	}
	startupLogoChooser.value=startupLogoValue;
	startupLogoChooser.addEventListener('change',function(){
		const selectedLogo=this.value;
		setCookie('startupLogo',selectedLogo);
		console.debug(`Selected logo: ${selectedLogo}`);
	});
}//Username
const usernameChooser=document.getElementById('username');
if(usernameChooser!==null){
	let usernameValue;
	if(cookieExists('username')){
		usernameValue=getCookie('username');
		console.debug(`Username cookie exists - its value is ${usernameValue}.`);
	}else{
		console.debug(`Username cookie doesn't exist.`);
		usernameValue='';
	}
	usernameChooser.value=usernameValue;
	usernameChooser.addEventListener('blur',function(){
		const usernameCurrentValue=this.value;
		if(usernameCurrentValue===null||usernameCurrentValue===''||usernameCurrentValue===' '){this.value='';setCookie('username','SKCro');}
		else{setCookie('username',usernameCurrentValue);}
		console.debug(`Selected username: ${usernameCurrentValue}`);
	});
}//Homepage theme
const themeToggle=document.getElementById('SKCroTheme');
if(themeToggle!==null){
	if(cookieExists('useSKCroTheme')){
		console.debug(`Theme cookie exists - its value is ${getCookie('useSKCroTheme')}.`);
		themeToggle.checked=JSON.parse(getCookie('useSKCroTheme'));
	}else{
		console.debug(`Theme cookie doesn't exist.`);
		themeToggle.checked=false;
	}themeToggle.addEventListener('change',function(){setCookie('useSKCroTheme',this.checked);});
}