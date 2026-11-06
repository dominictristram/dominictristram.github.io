// Load comments only when the reader approaches the comments section.
(() => {
  const thread = document.getElementById('disqus_thread');
  if (!thread) return;
  function load() {
    const canonical = document.querySelector('link[rel="canonical"]');
    const pageURL = canonical?.getAttribute('href');
    window.disqus_shortname = 'dominictristram';
    window.disqus_url = pageURL
      ? new URL(pageURL, 'https://dominictristram.com/').href
      : location.href.split(/[?#]/)[0];
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://dominictristram.disqus.com/embed.js';
    document.head.append(script);
  }
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => {
      if (entries.some(entry => entry.isIntersecting)) {
        observer.disconnect();
        load();
      }
    }, { rootMargin: '300px' });
    observer.observe(thread);
  } else {
    load();
  }
})();
