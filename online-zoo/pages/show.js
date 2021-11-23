const down = document.querySelector('.down');

down.addEventListener('click', () => {
    const options = document.querySelectorAll('.hidden_animal');
    options.forEach(a => a.classList.toggle('show'));
})