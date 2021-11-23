const menu = document.querySelector('.left_menu');
const openMenu = document.querySelector('.openMenu');
const closeMenu = document.querySelector('.closeMenu');


openMenu.addEventListener('click', showMenu);
closeMenu.addEventListener('click', hideMenu);

function showMenu() {
    menu.style.display = 'flex';
    menu.style.top = '0';  
}
function hideMenu() {
    menu.style.top = '-400%';
}