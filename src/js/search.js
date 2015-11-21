SimpleJekyllSearch({
    searchInput: document.getElementById('search-input'),
    resultsContainer: document.getElementById('results-container'),
    json: '/search.json',
    searchResultTemplate: '<div role="article" itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost"><a href="{url}"><meta itemprop="datePublished" content="{data}"><h3 itemprop="name">{titulo}</h3><p class="lead">{intro}</p></a></div><hr />',
    noResultsText: '<h3>Whooops! não encontrei nada :/</h3>',
    limit: 10,
    fuzzy: false,
    exclude: ['Welcome']
});

//<div role="article" itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost"><a href="{url}"><meta itemprop="datePublished" content="{data}"><h3 itemprop="name">{titulo}</h3><p class="lead">{intro}</p></a></div><hr />