function menuAction(){wrapper.classList.contains("show-menu")?wrapper.classList.remove("show-menu"):wrapper.classList.add("show-menu")}function queryAction(){search.classList.contains("show-search")?(search.classList.remove("show-search"),wrapper.classList.remove("show-down")):(search.classList.add("show-search"),wrapper.classList.add("show-down")),search.classList.contains("show-search")?(queryIcon.classList.add("open"),document.getElementById("search-input").focus()):(queryIcon.classList.remove("open"),document.getElementById("search-input").blur()),document.getElementById("search-input").blur()&&(document.getElementById("search-input").value="")}var toogleMenu=document.querySelectorAll(".toggle-menu"),toogleQuery=document.querySelectorAll(".toggle-query"),wrapper=document.querySelector(".wrapper"),search=document.querySelector(".header-search--form");queryIcon=document.querySelector(".queryIcon");for(var i=0;i<toogleMenu.length;i++)toogleMenu[i].addEventListener("click",menuAction);for(var i=0;i<toogleQuery.length;i++)toogleQuery[i].addEventListener("click",queryAction);jQuery(document).ready(function(e){e("a[href*=#]:not([href=#])").click(function(t){t.preventDefault(),e("html,body").animate({scrollTop:e(this.hash).offset().top},1200)})}),!function e(t,r,n){function o(u,s){if(!r[u]){if(!t[u]){var a="function"==typeof require&&require;if(!s&&a)return a(u,!0);if(i)return i(u,!0);throw new Error("Cannot find module '"+u+"'")}var c=r[u]={exports:{}};t[u][0].call(c.exports,function(e){var r=t[u][1][e];return o(r?r:e)},c,c.exports,e,t,r,n)}return r[u].exports}for(var i="function"==typeof require&&require,u=0;u<n.length;u++)o(n[u]);return o}({1:[function(e,t,r){"use strict";function n(e,t){var r;r=window.XMLHttpRequest?new XMLHttpRequest:new ActiveXObject("Microsoft.XMLHTTP"),r.open("GET",e,!0),r.onreadystatechange=function(){if(200===r.status&&4===r.readyState)try{t(null,JSON.parse(r.responseText))}catch(e){t(e,null)}},r.send()}t.exports={load:n}},{}],2:[function(e,t,r){"use strict";t.exports=function n(e){function t(e){return e?void 0!==e.required&&e.required instanceof Array:!1}if(!t(e))throw new Error("-- OptionsValidator: required options missing");if(!(this instanceof n))return new n(e);var r=e.required;this.getRequiredOptions=function(){return r},this.validate=function(e){var t=[];return r.forEach(function(r){void 0===e[r]&&t.push(r)}),t}}},{}],3:[function(e,t,r){"use strict";function n(e){return u(e)?a(e):s(e)?c(e):void 0}function o(){return g.length=0,g}function i(){return g}function u(e){return!!e&&"[object Object]"===Object.prototype.toString.call(e)}function s(e){return!!e&&"[object Array]"===Object.prototype.toString.call(e)}function a(e){return g.push(e),g}function c(e){for(var t=[],r=0;r<e.length;r++)u(e[r])&&t.push(a(e[r]));return t}function l(e){return e?f(g,e,v.searchStrategy,v):[]}function p(e){v=e||{},v.fuzzy=e.fuzzy||!1,v.limit=e.limit||10,v.searchStrategy=e.fuzzy?m:y}function f(e,t,r,n){for(var o=[],i=0;i<e.length&&o.length<n.limit;i++){var u=h(e[i],t,r,n);u&&o.push(u)}return o}function h(e,t,r,n){for(var o in e)if(!d(e[o],n.exclude)&&r.matches(e[o],t))return e}function d(e,t){var r=!1;t=t||[];for(var n=0;n<t.length;n++){var o=t[n];!r&&new RegExp(e).test(o)&&(r=!0)}return r}t.exports={put:n,clear:o,get:i,search:l,setOptions:p};var m=e("./SearchStrategies/FuzzySearchStrategy"),y=e("./SearchStrategies/LiteralSearchStrategy"),g=[],v={};v.fuzzy=!1,v.limit=10,v.searchStrategy=v.fuzzy?m:y},{"./SearchStrategies/FuzzySearchStrategy":4,"./SearchStrategies/LiteralSearchStrategy":5}],4:[function(e,t,r){"use strict";function n(){function e(e){return new RegExp(e.split("").join(".*?"),"gi")}this.matches=function(t,r){return"string"!=typeof t?!1:(t=t.trim(),!!e(r).test(t))}}t.exports=new n},{}],5:[function(e,t,r){"use strict";function n(){function e(e,t){return e.toLowerCase().indexOf(t.toLowerCase())>=0}this.matches=function(t,r){return"string"!=typeof t?!1:(t=t.trim(),e(t,r))}}t.exports=new n},{}],6:[function(e,t,r){"use strict";function n(e){i.pattern=e.pattern||i.pattern,i.template=e.template||i.template,"function"==typeof e.middleware&&(i.middleware=e.middleware)}function o(e){return i.template.replace(i.pattern,function(t,r){var n=i.middleware(r,e[r],i.template);return void 0!==n?n:e[r]||t})}t.exports={compile:o,setOptions:n};var i={};i.pattern=/\{(.*?)\}/g,i.template="",i.middleware=function(){}},{}],7:[function(e,t,r){!function(t,r,n){"use strict";function o(e){d.put(e),a()}function i(e){m.load(e,function(t,r){t&&l("failed to get JSON ("+e+")"),o(r)})}function u(){p.resultsContainer.innerHTML=""}function s(e){p.resultsContainer.innerHTML+=e}function a(){p.searchInput.addEventListener("keyup",function(e){u(),e.target.value.length>0&&c(d.search(e.target.value))})}function c(e){if(0===e.length)return s(p.noResultsText);for(var t=0;t<e.length;t++)s(h.compile(e[t]))}function l(e){throw new Error("SimpleJekyllSearch --- "+e)}var p={searchInput:null,resultsContainer:null,json:[],searchResultTemplate:'<li><a href="{url}" title="{desc}">{title}</a></li>',templateMiddleware:function(){},noResultsText:"No results found",limit:10,fuzzy:!1,exclude:[]},f=["searchInput","resultsContainer","json"],h=e("./Templater"),d=e("./Repository"),m=e("./JSONLoader"),y=e("./OptionsValidator")({required:f}),g=e("./utils");t.SimpleJekyllSearch=function(e){var t=y.validate(e);t.length>0&&l("You must specify the following required options: "+f),p=g.merge(p,e),h.setOptions({template:p.searchResultTemplate,middleware:p.templateMiddleware}),d.setOptions({fuzzy:p.fuzzy,limit:p.limit}),g.isJSON(p.json)?o(p.json):i(p.json)},t.SimpleJekyllSearch.init=t.SimpleJekyllSearch}(window,document)},{"./JSONLoader":1,"./OptionsValidator":2,"./Repository":3,"./Templater":6,"./utils":8}],8:[function(e,t,r){"use strict";function n(e,t){var r={};for(var n in e)r[n]=e[n],void 0!==t[n]&&(r[n]=t[n]);return r}function o(e){try{return e instanceof Object&&JSON.parse(JSON.stringify(e))?!0:!1}catch(t){return!1}}t.exports={merge:n,isJSON:o}},{}]},{},[7]),SimpleJekyllSearch({searchInput:document.getElementById("search-input"),resultsContainer:document.getElementById("results-container"),json:"/search.json",searchResultTemplate:'<div role="article"itemscope="itemscope" itemtype="http://schema.org/BlogPosting" itemprop="blogPost"><a href="{url}"><meta itemprop="datePublished" content="{data}"><h3 itemprop="name">{titulo}</h3><p class="lead">{intro}</p></a></div><hr />',noResultsText:"<h3>Whooops! não encontrei nada :/</h3",limit:10,fuzzy:!1,exclude:["Welcome"]});