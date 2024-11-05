// Optional: Add lightbox functionality for images
document.querySelectorAll('.card img').forEach((img) => {
    img.addEventListener('click', () => {
        const src = img.src;
        // Implement lightbox functionality here
        alert('Open image in a lightbox: ' + src);
    });
});