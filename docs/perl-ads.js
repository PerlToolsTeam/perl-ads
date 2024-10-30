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
        <div class="perl-ad text-center mt-1">
          <p><span class="perl-ad-title fw-bold">${randomAd.title}:</span> <span class="perl-ad-desc">${randomAd.description}</span> <span class="perl-ad-link"><a href="${randomAd.link}" target="_blank">Learn more</a></span></p>
        </div>
      `;

      document.body.insertBefore(adFragment, document.body.firstChild);
    })
    .catch(error => {
      console.error('Error fetching ad:', error);
    });
});
