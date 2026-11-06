// Common library setup and menu behaviour for every themed page.
// Classic scripts support direct file:// browsing; async=false preserves dependency order.
(() => {
// Dean Attali / Beautiful Jekyll 2020

var BeautifulJekyllJS = {

  init : function() {
    setTimeout(BeautifulJekyllJS.initNavbar, 10);

    // Shorten the navbar after scrolling a little bit down
    $(window).scroll(function() {
        if ($(".navbar").offset().top > 50) {
            $(".navbar").addClass("top-nav-short");
        } else {
            $(".navbar").removeClass("top-nav-short");
        }
    });

    // On mobile, hide the avatar when expanding the navbar menu
    $('#main-navbar').on('show.bs.collapse', function () {
      $(".navbar").addClass("top-nav-expanded");
    });
    $('#main-navbar').on('hidden.bs.collapse', function () {
      $(".navbar").removeClass("top-nav-expanded");
    });

  },

  initNavbar : function() {
    // Set the navbar-dark/light class based on its background color
    const rgb = $('.navbar').css("background-color").replace(/[^\d,]/g,'').split(",");
    const brightness = Math.round(( // http://www.w3.org/TR/AERT#color-contrast
      parseInt(rgb[0]) * 299 +
      parseInt(rgb[1]) * 587 +
      parseInt(rgb[2]) * 114
    ) / 1000);
    if (brightness <= 125) {
      $(".navbar").removeClass("navbar-light").addClass("navbar-dark");
    } else {
      $(".navbar").removeClass("navbar-dark").addClass("navbar-light");
    }
  }
};



  const dependencies = [
  {
    "src": "https://code.jquery.com/jquery-3.5.1.slim.min.js",
    "integrity": "sha256-4+XzXVhsDmqanXGHaHvgh1gMQKX40OUvDEBTu8JcmNs=",
    "crossorigin": "anonymous"
  },
  {
    "src": "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
    "integrity": "sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo",
    "crossorigin": "anonymous"
  },
  {
    "src": "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
    "integrity": "sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6",
    "crossorigin": "anonymous"
  }
];
  Promise.all(dependencies.map(attributes => new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.async = false;
    for (const [name, value] of Object.entries(attributes)) {
      script.setAttribute(name, value);
    }
    script.onload = resolve;
    script.onerror = () => reject(new Error(`Unable to load ${attributes.src}`));
    document.head.append(script);
  }))).then(() => {
    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', BeautifulJekyllJS.init, { once: true });
    } else {
      BeautifulJekyllJS.init();
    }
  }).catch(error => console.error('Site menu could not initialise:', error));
})();
