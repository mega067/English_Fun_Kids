document.addEventListener('DOMContentLoaded', (event) => {
    const links = document.querySelectorAll('a');
    const clickSound = new Audio('/sound/click.mp3'); // Ruta a tu archivo de sonido

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Previene la redirección inmediata
            const url = link.href; // Guarda la URL del enlace
            clickSound.play();

            // Espera a que el sonido termine de reproducirse antes de redirigir
            clickSound.addEventListener('ended', () => {
                window.location.href = url;
            });
        });
    });
});
