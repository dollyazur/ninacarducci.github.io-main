$(document).ready(function() {
    $('.gallery').mauGallery({
        columns: {
            xs: 1,
            sm: 2,
            md: 3,
            lg: 3,
            xl: 3
        },
        lightBox: true,
        lightboxId: 'myAwesomeLightbox',
        showTags: true,
        tagsPosition: 'top'
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const supportsWebP = () => {
      const canvas = document.createElement("canvas");
      return canvas.getContext && canvas.getContext("2d")
        ? canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0
        : false;
    };
  
    document.querySelectorAll("img").forEach(img => {
      const originalSrc = img.getAttribute("src");
  
      if (originalSrc) {
        const newSrc = originalSrc
          .replace("assets/images", "assets/output")
          .replace(/\.(jpg|jpeg|png)$/i, ".webp");
  
        // Si le navigateur supporte WebP, utiliser l'image WebP, sinon garder l'originale
        if (supportsWebP()) {
          img.setAttribute("src", newSrc);
        }
      }
    });
  });
  