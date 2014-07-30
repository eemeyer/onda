---
layout: page
permalink: /shows/
title: Shows
description: "Where to find us"
tags: [Shows]
---
<script type="text/javascript">
	var shows =
	{% include shows.json %}
	|| []
	;
</script>
<ul class="post-list" id='shows'>
{% for post in site.categories.shows limit:10 %}
  <li><article><a href="{{ site.url }}{{ post.url }}">{{ post.venue }} <span class='show-date'>{{ post.when }}</span></a></article></li>
{% endfor %}
</ul>
