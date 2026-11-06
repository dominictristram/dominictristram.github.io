(() => {
  const script = document.currentScript;
  const root = new URL('../../', script.src);
  const template = document.createElement('template');
  template.innerHTML = "<nav class=\"navbar navbar-expand-xl navbar-light fixed-top navbar-custom top-nav-regular\"><a class=\"navbar-brand\" href=\"index.html\">Dom Tristram</a><button class=\"navbar-toggler\" type=\"button\" data-toggle=\"collapse\" data-target=\"#main-navbar\" aria-controls=\"main-navbar\" aria-expanded=\"false\" aria-label=\"Toggle navigation\"><span class=\"navbar-toggler-icon\"></span></button><div class=\"collapse navbar-collapse\" id=\"main-navbar\"><ul class=\"navbar-nav ml-auto\"><li class=\"nav-item dropdown\"><a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Politics and Elections</a><div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navbarDropdown\"><a class=\"dropdown-item\" href=\"politics/index.html\">Politics</a><a class=\"dropdown-item\" href=\"soapbox/index.html\">Dom Tristrams Soapbox Podcast</a><a class=\"dropdown-item\" href=\"media/index.html\">Media</a><a class=\"dropdown-item\" href=\"events/index.html\">Events</a><a class=\"dropdown-item\" href=\"political_socials/index.html\">Social Media Links</a><a class=\"dropdown-item\" href=\"town_council/index.html\">Town Council</a></div></li><li class=\"nav-item dropdown\"><a class=\"nav-link dropdown-toggle\" href=\"#\" id=\"navbarDropdown\" role=\"button\" data-toggle=\"dropdown\" aria-haspopup=\"true\" aria-expanded=\"false\">Other roles</a><div class=\"dropdown-menu dropdown-menu-right\" aria-labelledby=\"navbarDropdown\"><a class=\"dropdown-item\" href=\"ruhgovernor.html\">Hospital Governor</a></div></li><li class=\"nav-item\"><a class=\"nav-link\" href=\"https://domtristrammusic.com\">Music</a></li></ul></div><div class=\"avatar-container\"><div class=\"avatar-img-border\"><a href=\"index.html\"><img alt=\"Navigation bar avatar\" class=\"avatar-img\" src=\"assets/img/bio-photo.jpg\" /></a></div></div></nav>";
  template.content.querySelectorAll('[href], [src]').forEach(element => {
    for (const attribute of ['href', 'src']) {
      const value = element.getAttribute(attribute);
      if (value && !value.startsWith('#') && !/^(?:[a-z]+:|\/\/)/i.test(value)) {
        element.setAttribute(attribute, new URL(value, root).href);
      }
    }
  });
  script.replaceWith(template.content);
})();
