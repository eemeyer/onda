---
layout: page
permalink: /shows/
title: Shows
description: "Where to find us"
tags: [Shows]
---
<ul class="post-list">
{% for post in site.categories.shows limit:10 %}
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.venue }} <span>{{ post.when }}</span></a></article></li>
{% endfor %}
</ul>
