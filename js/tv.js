document.addEventListener('DOMContentLoaded', function() {
  function updateClock() {
    var now = new Date();
    var options = { weekday: 'short', month: 'short', day: 'numeric' };
    var dateFormatted = now.toLocaleDateString('en-US', options).toUpperCase();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    var amPm = hours >= 12 ? 'PM' : 'AM';
    var formattedHours = hours % 12 || 12;
    var a = ' ';
    var dateString = `${dateFormatted} `
    var timeString = `${formattedHours}:${minutes < 10 ? '0' : ''}${minutes} ${amPm}`;
    document.getElementById('date').textContent = dateString;
    document.getElementById('time').textContent = timeString;
  }
  setInterval(updateClock, 1000);
  updateClock();
});