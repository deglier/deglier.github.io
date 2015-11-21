// elementos auxiliares
var toogleMenu  = document.querySelectorAll('.toggle-menu'),
    toogleQuery = document.querySelectorAll('.toggle-query'),
    wrapper     = document.querySelector('.wrapper'),
    search      = document.querySelector('.header-search--form');
    queryIcon   = document.querySelector('.queryIcon');

// criando evento de click para abrir o menu
for (var i = 0; i < toogleMenu.length; i++){
    toogleMenu[i].addEventListener('click', menuAction);
}
// função auxiliar que abre e fecha o menu
function menuAction() {
    if(wrapper.classList.contains('show-menu')){
        wrapper.classList.remove('show-menu');
    } else {
        wrapper.classList.add('show-menu');
    }
}

// criando evento de click para abrir o menu
for (var i = 0; i < toogleQuery.length; i++){
    toogleQuery[i].addEventListener('click', queryAction);
}

// função auxiliar que abre e fecha o pesquisar
function queryAction() {
    if(search.classList.contains('show-search')){
        search.classList.remove('show-search');
        wrapper.classList.remove('show-down');
    } else {
        search.classList.add('show-search');
        wrapper.classList.add('show-down');
    }
    if(search.classList.contains('show-search')){
        queryIcon.classList.add('open');
        document.getElementById('search-input').focus();
    } else {
        queryIcon.classList.remove('open');
        document.getElementById('search-input').blur();        
    }
    if(document.getElementById('search-input').blur()){
        document.getElementById('search-input').value="";
    }
}

$(document).ready(function() { 
    $(".scroll").click(function(event){        
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top}, 800);
   });
});