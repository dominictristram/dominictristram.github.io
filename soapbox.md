---
layout: page
permalink: /soapbox/
title: Dom Tristram's Soapbox
tags: [podcast]
---

I make a short-form Podcast covering political issues of the day. There's no set release
schedule. Each episode is around five minutes long.

It's available as:
<ul>
<li><a href="https://podcasts.apple.com/gb/podcast/dom-tristrams-soapbox/id1377617516">audio Podcast in your favourite podcast app</a></li>
<li>audio and video on <a href="https://open.spotify.com/show/7Ga2Y3RFFO6GusdTyTLBip">Spotify</a></li>
<li><a href="https://www.tiktok.com/@dominictristram">TikTok</a></li>
<li><a href="https://www.instagram.com/dom_tristram/">Instagram</a></li>
<li><a href="https://www.youtube.com/watch?v=w0QA3Y5tZXE&list=PLTWQBi8hu8wo8a2EH6JmFLziALBhQ0hp-">YouTube</a></li>
</ul>
Please subscribe - it really helps.


<h2>Episodes (with transcripts):</h2>

{% for post in site.posts %}
{% for tag in post.tags %}
{% if tag == "soapbox" %}
<li><a href="{{ post.url | prepend: site.baseurl }}">{{post.title}}
</a></li>
<div class="summary">{{post.summary}}</div>
{% endif %}
{% endfor %}
{% endfor %}

