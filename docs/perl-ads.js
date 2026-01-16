if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function() {
    initializeAds();
  });
} else {
  initializeAds();
}

function initializeAds() {
  const storageKey = 'perlAds';
  const storageTimestampKey = 'perlAdsTimestamp';
  const expireAfter = 60 * 60 * 1000; // One hour in milliseconds

  const fetchAds = () => {
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

        localStorage.setItem(storageKey, JSON.stringify(data));
        localStorage.setItem(storageTimestampKey, Date.now().toString());

        displayAd(data);
      })
      .catch(error => {
        console.error('Error fetching ad:', error);
      });
  };

  const displayAd = (data) => {
    const currentDate = new Date().toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
    const currentDomain = window.location.hostname;

    const validAds = data.filter(ad => {
      // Check domain first - don't show ads for the current domain
      try {
        const adLinkDomain = new URL(ad.link).hostname;
        if (adLinkDomain === currentDomain) {
          return false;
        }
      } catch (e) {
        console.error('Invalid URL in ad:', ad.link);
        return false;
      }

      // Then check date validity
      const startDate = ad.start ? new Date(ad.start) : null;
      const endDate = ad.end ? new Date(ad.end) : null;

      if (startDate && endDate) {
        return currentDate >= ad.start && currentDate <= ad.end;
      } else if (startDate) {
        return currentDate >= ad.start;
      } else if (endDate) {
        return currentDate <= ad.end;
      }

      return true; // Ads without start and end dates are always valid
    });

    if (validAds.length === 0) {
      return; // No valid ads to display
    }

    const target = document.getElementById('perl-ad-target');

    const randomAd = validAds[Math.floor(Math.random() * validAds.length)];

    const adContainer = document.createElement('div');
    adContainer.id = 'perl-ad';
    // Add our custom styles unless the user has opted out by having a
    // #perl-ad-target element with the data-no-styles attribute.
    if(!target || target.dataset.noStyles === undefined) {
       adContainer.style.textAlign = 'center';
       adContainer.style.padding = '0.125rem';
       adContainer.style.margin = '0';
       adContainer.style.border = '0 solid inherit';
    }

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
    // Add UTM tracking parameters to the link
    try {
      const linkUrl = new URL(randomAd.link);
      linkUrl.searchParams.set('utm_source', 'perl-ads');
      linkUrl.searchParams.set('utm_medium', 'banner');
      linkUrl.searchParams.set('utm_campaign', randomAd.publisher || 'unknown');
      linkUrl.searchParams.set('utm_content', window.location.hostname);
      link.href = linkUrl.toString();
    } catch (e) {
      // Fallback to original link if URL parsing fails
      link.href = randomAd.link;
    }
    link.target = '_blank';
    link.textContent = 'Learn more';

    adLink.appendChild(link);

    const adParagraph = document.createElement('p');
    adParagraph.appendChild(adTitle);
    adParagraph.appendChild(adDesc);
    adParagraph.appendChild(adLink);

    adContainer.appendChild(adParagraph);

    if (target) {
      target.appendChild(adContainer);
    } else {
      document.body.insertBefore(adContainer, document.body.firstChild);
    }
  };

  const storedAds = localStorage.getItem(storageKey);
  const storedTimestamp = localStorage.getItem(storageTimestampKey);

  if (storedAds && storedTimestamp && (Date.now() - parseInt(storedTimestamp, 10)) < expireAfter) {
    displayAd(JSON.parse(storedAds));
  } else {
    fetchAds();
  }
}
