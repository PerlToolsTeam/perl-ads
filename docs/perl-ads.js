document.addEventListener("DOMContentLoaded", function() {
  fetch('https://perl-ads.perlhacks.com/perl-ads.json')
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
        <div class="ad text-center mt-1">
          <p><span class="fw-bold">${data.title}:</span> ${data.description} <a href="${data.link}" target="_blank">Learn more</a></p>
        </div>
      `;

      document.body.insertBefore(adFragment, document.body.firstChild);
    })
    .catch(error => {
      console.error('Error fetching ad:', error);
    });
});
