document.addEventListener("DOMContentLoaded", function() {
  fetch('/perl-ads.json')
    .then(response => {
      if (response.status === 404) {
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (!data || !data.link) {
        return;
      }

      const adFragment = document.createElement('div');
      adFragment.innerHTML = `
        <div class="ad">
          <h2>${data.title}</h2>
          <p>${data.description}</p>
          <a href="${data.link}">Learn more</a>
        </div>
      `;

      document.body.insertBefore(adFragment, document.body.firstChild);
    })
    .catch(error => {
      console.error('Error fetching ad:', error);
    });
});
