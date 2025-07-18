const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

async function generateIcons() {
  const iconsDir = path.join(__dirname, '../public/icons');
  
  // Ensure icons directory exists
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }

  const icons = [
    { input: 'icon-192x192.svg', output: 'icon-192x192.png', size: 192 },
    { input: 'icon-512x512.svg', output: 'icon-512x512.png', size: 512 },
    { input: 'icon-apple-touch.svg', output: 'icon-apple-touch.png', size: 180 }
  ];

  for (const icon of icons) {
    const inputPath = path.join(iconsDir, icon.input);
    const outputPath = path.join(iconsDir, icon.output);
    
    try {
      await sharp(inputPath)
        .resize(icon.size, icon.size)
        .png({ quality: 90, compressionLevel: 9 })
        .toFile(outputPath);
      
      console.log(`✅ Generated ${icon.output}`);
    } catch (error) {
      console.error(`❌ Error generating ${icon.output}:`, error.message);
    }
  }
  
  console.log('🎉 Icon generation completed!');
}

generateIcons().catch(console.error);