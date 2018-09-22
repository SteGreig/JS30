let countdown;
const buttons = document.querySelectorAll('[data-time]');

function timer(seconds) {
	// clear any existing timers
	clearInterval(countdown);

	const now = Date.now();
	const then = now + seconds * 1000;
	displayTimeLeft(seconds);
	displayEndTime(then);

	countdown = setInterval(() => {
		const secondsLeft = Math.round((then - Date.now()) / 1000);
		// check if we should stop it!
		if(secondsLeft <= 0) {
			clearInterval(countdown);
			return;
		}
		// display it
		displayTimeLeft(secondsLeft);
	}, 1000);
}

// Display the time
function displayTimeLeft(seconds) {
	const mins = Math.floor(seconds / 60);
	const secs = seconds % 60;
	const display = `${mins}:${secs < 10 ? '0' : ''}${secs}`;
	document.querySelector('.display__time-left').innerHTML = display;
	document.title = display;
}

// Display end time
function displayEndTime(timestamp) {
	const end = new Date(timestamp);
	const hour = end.getHours();
	const minutes = end.getMinutes();
	document.querySelector('.display__end-time').textContent = `Be back at ${hour}:${minutes < 10 ? '0' : ''}${minutes}`;
}

function startTimer() {
  const seconds = parseInt(this.dataset.time);
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
	e.preventDefault();
	const mins = this.minutes.value;
	timer(mins*60);
	this.reset();
});

timer(1200);



/*
1000000

1000000 + 10 * 1000

1000000 + 10000

1010000

// After 1 second
1010000 - 1001000 = 9000

9000 / 1000

9
*/