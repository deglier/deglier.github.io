function menuAction(){wrapper.classList.contains("show-menu")?wrapper.classList.remove("show-menu"):wrapper.classList.add("show-menu")}function queryAction(){search.classList.contains("show-search")?(search.classList.remove("show-search"),wrapper.classList.remove("show-down")):(search.classList.add("show-search"),wrapper.classList.add("show-down")),search.classList.contains("show-search")?queryIcon.classList.add("open"):queryIcon.classList.remove("open")}var toogleMenu=document.querySelectorAll(".toggle-menu"),toogleQuery=document.querySelectorAll(".toggle-query"),wrapper=document.querySelector(".wrapper"),search=document.querySelector(".header-search--form");queryIcon=document.querySelector(".queryIcon");for(var i=0;i<toogleMenu.length;i++)toogleMenu[i].addEventListener("click",menuAction);for(var i=0;i<toogleQuery.length;i++)toogleQuery[i].addEventListener("click",queryAction);$(document).ready(function(){$(".scroll").click(function(e){e.preventDefault(),$("html,body").animate({scrollTop:$(this.hash).offset().top},800)})});