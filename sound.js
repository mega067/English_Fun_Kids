// script.js
document.addEventListener('DOMContentLoaded', (event) => {
    const links = document.querySelectorAll('a');
    const clickSound = new Audio('/sound/click.mp3'); // Ruta a tu archivo de sonido

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            clickSound.play();
        });
    });
});
