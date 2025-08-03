import { useContent } from '../contexts/ContentContext';

export const useMetaTags = () => {
  const { getContent } = useContent();
  
  return {
    title: getContent('homepage.meta.title', 'MOVIEBOLI APS - Cultura, Cinema, Comunità'),
    description: getContent('homepage.meta.description', 'MOVIEBOLI APS è un\'associazione di promozione sociale che promuove la cultura cinematografica e artistica nel territorio di Eboli attraverso festival, eventi e iniziative culturali.'),
    keywords: getContent('homepage.meta.keywords', 'MOVIEBOLI, associazione, cinema, festival, Eboli, cultura, arte, podcast, eventi')
  };
};