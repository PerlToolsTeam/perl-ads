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
        <div class="ad text-center">
          <p><span style="font-weight: bold;">${data.title}</span> ${data.description} <a href="${data.link}">Learn more</a></p>
        </div>
      `;

      document.body.insertBefore(adFragment, document.body.firstChild);
    })
    .catch(error => {
      console.error('Error fetching ad:', error);
    });
});
