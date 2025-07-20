import { NextApiRequest, NextApiResponse } from 'next';
import fs from 'fs';
import path from 'path';
import { createReadStream } from 'fs';

// Regex per identificare URL esterne
const isExternalUrl = (url: string) => /^https?:\/\//.test(url);

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { path: imagePath } = req.query;
  
  if (!imagePath || !Array.isArray(imagePath)) {
    return res.status(400).json({ error: 'Invalid image path' });
  }

  // Log the requested path for debugging
  console.log('Requested image path:', imagePath);
  
  // Decode URI components to handle spaces and special characters
  const decodedPath = imagePath.map(segment => decodeURIComponent(segment));
  console.log('Decoded path segments:', decodedPath);
  
  // Verifica se è un URL esterno (ad esempio https://i.postimg.cc/...)
  const fullPathStr = decodedPath.join('/');
  if (isExternalUrl(fullPathStr)) {
    console.log('Redirecting to external URL:', fullPathStr);
    return res.redirect(fullPathStr);
  }
  
  // Costruisci il percorso completo dell'immagine nella directory public
  const fullPath = path.join(process.cwd(), 'public', 'json-folders', ...decodedPath);
  console.log('Full path:', fullPath);

  // Verifica che il file esista
  if (!fs.existsSync(fullPath)) {
    console.log('File not found at:', fullPath);
    return res.status(404).json({ error: 'Image not found' });
  }

  return streamFile(fullPath, res);
}

// Funzione per lo streaming del file
function streamFile(filePath: string, res: NextApiResponse) {
  // Determina il tipo MIME in base all'estensione del file
  const ext = path.extname(filePath).toLowerCase();
  let contentType = 'application/octet-stream';

  switch (ext) {
    case '.jpg':
    case '.jpeg':
      contentType = 'image/jpeg';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.gif':
      contentType = 'image/gif';
      break;
    case '.webp':
      contentType = 'image/webp';
      break;
    // Aggiungi altri tipi MIME se necessario
  }

  // Imposta l'header Content-Type
  res.setHeader('Content-Type', contentType);

  // Crea uno stream di lettura e lo invia come risposta
  const fileStream = createReadStream(filePath);
  fileStream.pipe(res);
  
  // Gestione degli errori di stream
  fileStream.on('error', (err) => {
    console.error('Error streaming file:', err);
    res.status(500).json({ error: 'Error streaming file' });
  });
}