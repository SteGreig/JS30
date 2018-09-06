// Video
const video = document.querySelector('video');


// =================================
// PLAYER CONTROLS
// =================================

// Play/Pause
// ---------------
const playToggle = document.querySelector('.toggle');

function togglePlay() {
	video.paused ? video.play() : video.pause();
}
playToggle.addEventListener('click', togglePlay);

function updateToggleIcon() {
	const icon = this.paused ? '►' : '❚ ❚';
	playToggle.textContent = icon;
}
video.addEventListener('play', updateToggleIcon);
video.addEventListener('pause', updateToggleIcon);


// Volume / Playback Rate Sliders
// -------------------------------
const sliders = document.querySelectorAll('.player__slider');

function sliderControls() {
	video[this.name] = this.value;
}

sliders.forEach(slider => slider.addEventListener('change', sliderControls));
sliders.forEach(slider => slider.addEventListener('mousemove', sliderControls));


// Progress Bar
// -------------
const progress = document.querySelector('.progress');
const progressFilled = document.querySelector('.progress__filled');

function progressHandler() {
	const videoProgress = (video.currentTime / video.duration) * 100;
	progressFilled.style.flexBasis = `${videoProgress}%`;
}

video.addEventListener('timeupdate', progressHandler);

function progressJumper(e) {
	const barClickPosition = e.offsetX;
	progressFilled.style.flexBasis = `${barClickPosition}px`;

	const barClickPerc = (e.offsetX / progress.offsetWidth) * video.duration;
	video.currentTime = barClickPerc;
}

let isMouseDown = false;
progress.addEventListener('click', progressJumper);
progress.addEventListener('mousemove', (e) => isMouseDown && progressJumper(e));
progress.addEventListener('mousedown', () => isMouseDown = true);
progress.addEventListener('mouseup', () => isMouseDown = false);


// Skip Buttons
// -------------
const skipButtons = document.querySelectorAll('[data-skip]');

function skip() {
	console.log(this.dataset.skip);
	video.currentTime += parseFloat(this.dataset.skip);
}

skipButtons.forEach(button => button.addEventListener('click', skip))



