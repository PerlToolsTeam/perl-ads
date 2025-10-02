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
  flashMessage.classList.add('show');
  setTimeout(() => {
    flashMessage.classList.remove('show');
  }, 3000);
}

document.addEventListener('DOMContentLoaded', () => {
  const triggers = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
  triggers.forEach(el => new bootstrap.Tooltip(el));
});

