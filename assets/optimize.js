const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Dossiers source et sortie
const inputDirectory = './images'; // Dossier contenant vos images et sous-dossiers
const outputDirectory = './output'; // Où les fichiers optimisés seront sauvegardés

// Fonction pour parcourir les dossiers de manière récursive
function processDirectory(inputDir, outputDir) {
  // Crée le dossier de sortie s'il n'existe pas
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  // Parcourt tous les fichiers et dossiers dans le dossier courant
  fs.readdirSync(inputDir).forEach(item => {
    const inputPath = path.join(inputDir, item);
    const outputPath = path.join(outputDir, item);

    if (fs.statSync(inputPath).isDirectory()) {
      // Si c'est un sous-dossier, on le traite récursivement
      processDirectory(inputPath, outputPath);
    } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
      // Si c'est une image, on la redimensionne et la convertit en WebP
      sharp(inputPath)
       
        .toFormat('webp') // Convertit au format WebP
        .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp'))
        .then(() => console.log(`Optimisé : ${outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`))
        .catch(err => console.error(`Erreur avec ${inputPath}:`, err));
    }
  });
}

// Démarre le traitement depuis le dossier principal
processDirectory(inputDirectory, outputDirectory);
