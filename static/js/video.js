function stopVideo() {
  var videoFrame = document.getElementById('videoFrame');

  videoFrame.removeAttribute('src');
}

function playVideo() {
  var videoFrame = document.getElementById('videoFrame');
  var videoId = videoFrame.getAttribute('data-video-id');

  videoFrame.setAttribute('src', 'https://www.youtube.com/embed/' + videoId + '?autoplay=1&vq=hd1080');
}
