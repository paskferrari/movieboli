const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const contentData = {
  // Tutti i contenuti dal demoContent espanso
  // ... (inserire qui tutti i contenuti)
};

async function populateContent() {
  console.log('Popolamento database contenuti...');
  
  for (const [key, value] of Object.entries(contentData)) {
    const category = key.split('.')[0];
    const page = getPageFromKey(key);
    
    try {
      const { error } = await supabase
        .from('site_content')
        .upsert({
          key,
          value,
          category,
          page,
          description: `Contenuto per ${key}`,
          updated_at: new Date().toISOString()
        }, {
          onConflict: 'key'
        });
        
      if (error) {
        console.error(`Errore per ${key}:`, error);
      } else {
        console.log(`✓ ${key}`);
      }
    } catch (error) {
      console.error(`Errore per ${key}:`, error);
    }
  }
  
  console.log('Popolamento completato!');
}

function getPageFromKey(key) {
  if (key.startsWith('nav.')) return 'global';
  if (key.startsWith('footer.')) return 'global';
  if (key.startsWith('hero.')) return 'home';
  if (key.startsWith('about.')) return 'about';
  if (key.startsWith('activities.')) return 'activities';
  if (key.startsWith('festival.')) return 'festival';
  if (key.startsWith('admin.')) return 'admin';
  return 'global';
}

populateContent();