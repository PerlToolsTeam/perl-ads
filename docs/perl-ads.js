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

      const adContainer = document.createElement('div');
      adContainer.id = 'perl-ad';
      adContainer.style.textAlign = 'center';
      adContainer.style.padding = '0.25rem';
      adContainer.style.margin = '0';
      adContainer.style.border = '0 solid inherit';

      const adTitle = document.createElement('span');
      adTitle.id = 'perl-ad-title';
      const boldTitle = document.createElement('b');
      boldTitle.textContent = `${randomAd.title}:`;
      adTitle.appendChild(boldTitle);

      const adDesc = document.createElement('span');
      adDesc.id = 'perl-ad-desc';
      adDesc.textContent = ` ${randomAd.description} `;

      const adLink = document.createElement('span');
      adLink.id = 'perl-ad-link';

      const link = document.createElement('a');
      link.href = randomAd.link;
      link.target = '_blank';
      link.textContent = 'Learn more';

      adLink.appendChild(link);

      const adParagraph = document.createElement('p');
      adParagraph.appendChild(adTitle);
      adParagraph.appendChild(adDesc);
      adParagraph.appendChild(adLink);

      adContainer.appendChild(adParagraph);

      document.body.insertBefore(adContainer, document.body.firstChild);
    })
    .catch(error => {
      console.error('Error fetching ad:', error);
    });
});
