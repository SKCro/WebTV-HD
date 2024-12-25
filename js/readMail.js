'use strict';
addEventListener('DOMContentLoaded',function(){
	let messageID;
	function getEmailId(){
		var urlParams=new URLSearchParams(window.location.search);
		return urlParams.get('messageID');
	}
	const email=document.getElementById('emailContent');
	const messages=[`
	<!DOCTYPE HTML><html lang=en><head><title>Welcome to WebTV HD!</title>
	<meta name=sender content=SKCro>
	<meta name=senderEmail content=SKCro@localhost>
	<meta name=date content="Just now (okay not really)">
	<link rel=stylesheet type=text/css href=../css/style.css>
	<link rel=stylesheet type=text/css href=../css/service.css>
	<style>body{animation:none;}</style><meta charset=UTF-8></head><body>
	<p><b>Welcome to WebTV HD!</b></p>
	<p>This is a project aiming to replicate the look, feel, and some functionality of the WebTV service. I've gotten a lot of the base WebTV stuff down, including (but not limited to):</p>
	<ul><li>Colors and fonts</li><li>Input styles</li><li>Dialog boxes</li><li>More stuff I can't name off the top of my head</li></ul>
	<p>There's also a lot of stuff I plan to reimplement, like...</p>
	<ul><li>Some Page Builder styles</li><li>Other service pages</li><li>Better transitions</li><li>More stuff I, again, can't name off the top of my head</li></ul>
	<p>Thanks for checking out my project!</p>
	<p>The latest update logs are available <a class=clickable href=https://github.com/SKCro/WebTV-HD/commits/main/ target=_blank>here</a>.</p>
	<p>- SKCro</p>
	</body></html>
	`,`
	<!DOCTYPE HTML><html lang=en><head><title>Notice of Eviction</title>
	<meta name=sender content=johnlandlord@aol.com>
	<meta name=senderEmail content=johnlandlord@aol.com>
	<meta name=date content="1 minute ago">
	<link rel=stylesheet type=text/css href=../css/style.css>
	<link rel=stylesheet type=text/css href=../css/service.css>
	<style>body{animation:none;}</style><meta charset=UTF-8></head><body>
	<p>This document serves as a notice of your eviction from... uh... screw it, I have no clue how to write an eviction notice.</p>
	</body></html>
	`,`
	<!DOCTYPE HTML><html lang=en><head><title>Plea se re-ente r your Anazone passwor d</title>
	<meta name=sender content="Ana zon e .com">
	<meta name=senderEmail content=anazoneoficial22@totally-legit-mail.beans>
	<meta name=date content="5 minutes ago">
	<link rel=stylesheet type=text/css href=../css/style.css>
	<link rel=stylesheet type=text/css href=../css/service.css>
	<style>body{animation:none;}</style><meta charset=UTF-8></head><body>
	<p>enter your anazone password now or jef bozos will break down your door</p>
	<button onclick="parent.playSound('submit');parent.showAlert('haha get scammed');">Log into Scamazon</button>
	</body></html>
	`]
	const errorMessage=`
	<!DOCTYPE HTML><html lang=en><head><title>Whoops</title>
	<meta name=sender content=Unknown>
	<meta name=senderEmail content=Unknown>
	<meta name=date content=Unknown>
	<link rel=stylesheet type=text/css href=../css/style.css>
	<link rel=stylesheet type=text/css href=../css/service.css>
	<style>body{animation:none;}</style><meta charset=UTF-8></head><body>
	<p>We couldn't find that email. You might have deleted it or it might not belong to you.</p>
	</body></html>`
	messageID=getEmailId();
	getEmailId();
	console.debug(`Loaded message ID ${messageID}.`);
	if(messageID){email.srcdoc=messages[messageID];}else{email.srcdoc=errorMessage}
	email.addEventListener('load',function(){
		email.style.height=email.contentWindow.document.body.scrollHeight+24+'px';
		const messageSender=email.contentDocument.querySelector('meta[name="sender"]').getAttribute('content');
		const messageSenderEmail=email.contentDocument.querySelector('meta[name="senderEmail"]').getAttribute('content');
		const messageSentDate=email.contentDocument.querySelector('meta[name="date"]').getAttribute('content');
		const messageSubject=email.contentDocument.querySelector('title').textContent;
		document.getElementById('emailSender').textContent=messageSender;
		document.getElementById('emailSenderAddress').textContent=messageSenderEmail;
		document.getElementById('emailDateRecieved').textContent=messageSentDate;
		document.getElementById('emailSubject').textContent=messageSubject;
		document.title=messageSubject;
	});
});