const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// Dossiers source et sortie
const inputDirectory = './images'; // Dossier source contenant vos images
const outputDirectory = './output'; // Dossier cible pour les images optimisées

// Dimensions maximales des images
const MAX_WIDTH = 1920; // Largeur maximale
const MAX_HEIGHT = 1000; // Hauteur maximale

// Fonction récursive pour traiter les fichiers dans les sous-dossiers
function processDirectory(inputDir, outputDir) {
  try {
    // Crée le dossier de sortie s'il n'existe pas
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Liste les fichiers et sous-dossiers du dossier actuel
    const filesAndDirs = fs.readdirSync(inputDir);

    filesAndDirs.forEach(item => {
      const inputPath = path.join(inputDir, item); // Chemin source complet
      const outputPath = path.join(outputDir, item); // Chemin de sortie complet

      try {
        if (fs.statSync(inputPath).isDirectory()) {
          // Si c'est un dossier, appel récursif
          console.log(`📂 Dossier détecté : ${inputPath}`);
          processDirectory(inputPath, outputPath);
        } else if (/\.(jpg|jpeg|png)$/i.test(item)) {
          // Si c'est une image (jpg, jpeg, png), on la traite
          console.log(`🖼️ Image trouvée : ${inputPath}`);
          sharp(inputPath)
            .resize({
              width: MAX_WIDTH,
              height: MAX_HEIGHT,
              fit: 'inside', // Redimensionne en respectant les proportions
              withoutEnlargement: true // Ne redimensionne pas si l'image est plus petite
            })
            .toFormat('webp') // Compression en WebP 
            .toFile(outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp')) // Sauvegarde en WebP
            .then(() => {
              console.log(`✅ Image optimisée : ${outputPath.replace(/\.(jpg|jpeg|png)$/i, '.webp')}`);
            })
            .catch(err => {
              console.error(`❌ Erreur lors du traitement de l'image ${inputPath} :`, err);
            });
        } else {
          console.log(`⚠️ Fichier ignoré (pas une image) : ${inputPath}`);
        }
      } catch (err) {
        console.error(`❌ Erreur lors de l'accès à l'élément ${inputPath} :`, err);
      }
    });
  } catch (err) {
    console.error(`❌ Erreur lors du traitement du dossier ${inputDir} :`, err);
  }
}

// Appel principal pour traiter le dossier source
console.log('🚀 Début du traitement...');
processDirectory(inputDirectory, outputDirectory);
console.log('✅ Traitement terminé.');

