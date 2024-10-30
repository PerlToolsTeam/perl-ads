function copyToClipboard() {
  const codeSnippet = document.getElementById('code-snippet').innerText;
  navigator.clipboard.writeText(codeSnippet).then(() => {
    showFlashMessage();
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

function showFlashMessage() {
  const flashMessage = document.getElementById('flash-message');
  flashMessage.style.opacity = 1;
  setTimeout(() => {
    flashMessage.style.opacity = 0;
  }, 10000); // 10 seconds
}
