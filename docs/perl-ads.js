document.addEventListener("DOMContentLoaded", function() {
  fetch('https://perl-ads.perlhacks.com/perl-ads.json')
    .then(response => {
      if (response.status === 404) {
        return null;
      }
      return response.json();
    })
    .then(data => {
      if (!data || !Array.isArray(data) || data.length === 0) {
        return;
      }

      const randomAd = data[Math.floor(Math.random() * data.length)];

      const adFragment = document.createElement('div');
      adFragment.innerHTML = `
        <div class="ad text-center mt-1">
          <p><span class="fw-bold">${randomAd.title}:</span> ${randomAd.description} <a href="${randomAd.link}" target="_blank">Learn more</a></p>
        </div>
      `;

      document.body.insertBefore(adFragment, document.body.firstChild);
    })
    .catch(error => {
      console.error('Error fetching ad:', error);
    });
});
