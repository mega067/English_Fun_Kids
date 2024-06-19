document.addEventListener('DOMContentLoaded', (event) => {
    const links = document.querySelectorAll('a');
    const clickSound = new Audio('/sound/click.mp3'); // Ruta a tu archivo de sonido

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault(); // Previene la redirección inmediata
            const url = link.href; // Guarda la URL del enlace
            clickSound.play().then(() => {
                // Espera a que el sonido termine de reproducirse antes de redirigir
                clickSound.addEventListener('ended', () => {
                    window.location.href = url;
                });
            }).catch(error => {
                console.error('Error al reproducir el sonido:', error);
                window.location.href = url; // Redirigir si hay un error
            });
        });
    });
});
