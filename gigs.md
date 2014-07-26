---
layout: page
permalink: /gigs/
title: Gigs
description: "Where to find us"
tags: [Gigs]
---
<ul class="post-list">
{% for post in site.categories.gigs limit:10 %}
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.venue }} <span class="entry-date">{{ post.when }}</span></a></article></li>
{% endfor %}
</ul>
