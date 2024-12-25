'use strict';
const date=document.getElementById('date');
const time=document.getElementById('time');
function updateClock(){
	const now=new Date();
	const dateFormatted=now.toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'}).toUpperCase();
	const hours=now.getHours();
	const minutes=now.getMinutes();
	const seconds=now.getSeconds();
	const amPm=hours>=12?'PM':'AM';
	const formattedHours=hours%12||12;
	const dateString=`${dateFormatted}`;
	const timeString=`${formattedHours}:${minutes<10?'0':''}${minutes} ${amPm}`;
	if(date.textContent!==dateString){date.textContent=dateString}
	if(time.textContent!==timeString){time.textContent=timeString}
}
setInterval(updateClock,500);
updateClock();