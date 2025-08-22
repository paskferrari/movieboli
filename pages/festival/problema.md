[20:14:09.527] Running build in Washington, D.C., USA (East) – iad1
[20:14:09.528] Build machine configuration: 2 cores, 8 GB
[20:14:09.556] Cloning github.com/paskferrari/movieboli (Branch: main, Commit: 87e6278)
[20:14:13.341] Cloning completed: 3.785s
[20:14:15.209] Restored build cache from previous deployment (EE3pNNfcshZij1UWADcq14ka9pWd)
[20:14:15.941] Running "vercel build"
[20:14:17.212] Vercel CLI 46.0.2
[20:14:17.558] Installing dependencies...
[20:14:19.471] 
[20:14:19.472] up to date in 2s
[20:14:19.472] 
[20:14:19.473] 192 packages are looking for funding
[20:14:19.473]   run `npm fund` for details
[20:14:19.506] Detected Next.js version: 14.2.31
[20:14:19.512] Running "npm run build"
[20:14:19.627] 
[20:14:19.627] > festival-artistico@0.1.0 build
[20:14:19.628] > next build
[20:14:19.628] 
[20:14:20.936]   ▲ Next.js 14.2.31
[20:14:20.938] 
[20:14:20.938]    Linting and checking validity of types ...
[20:14:27.013]    Creating an optimized production build ...
[20:14:27.469] > [PWA] Compile server
[20:14:27.470] > [PWA] Compile server
[20:14:27.471] > [PWA] Compile client (static)
[20:14:27.472] > [PWA] Auto register service worker with: /vercel/path0/node_modules/next-pwa/register.js
[20:14:27.472] > [PWA] Service worker: /vercel/path0/public/sw.js
[20:14:27.473] > [PWA]   url: /sw.js
[20:14:27.473] > [PWA]   scope: /
[20:14:30.211] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (109kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[20:14:30.212] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (109kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[20:14:30.213] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (109kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[20:14:30.213] <w> [webpack.cache.PackFileCacheStrategy] Serializing big strings (110kiB) impacts deserialization performance (consider using Buffer instead and decode when needed)
[20:14:30.550] Failed to compile.
[20:14:30.550] 
[20:14:30.551] ./pages/festival/vota.jsx
[20:14:30.551] Error: 
[20:14:30.551]   [31mx[0m the name `Vota` is defined multiple times
[20:14:30.552]      ,-[[36;1;4m/vercel/path0/pages/festival/vota.jsx[0m:130:1]
[20:14:30.552]  [2m130[0m |   )
[20:14:30.552]  [2m131[0m | }
[20:14:30.553]  [2m132[0m | 
[20:14:30.553]  [2m133[0m | const Vota = ({ cortometraggi = [], error = null }) => {
[20:14:30.553]      : [31;1m      ^^|^[0m
[20:14:30.553]      :         [31;1m`-- [31;1mprevious definition of `Vota` here[0m[0m
[20:14:30.555]  [2m134[0m |   const { getContent } = useContent()
[20:14:30.555]  [2m135[0m |   const { user, isAuthenticated } = useAuth()
[20:14:30.555]  [2m136[0m |   const [ratings, setRatings] = useState({})
[20:14:30.555]  [2m137[0m |   const [showThankYou, setShowThankYou] = useState(null)
[20:14:30.555]  [2m138[0m |   const [pageLoading, setPageLoading] = useState(true)
[20:14:30.555]  [2m139[0m |   const [savingVotes, setSavingVotes] = useState(new Set())
[20:14:30.555]  [2m140[0m |   const [isScrolled, setIsScrolled] = useState(false)
[20:14:30.556]  [2m141[0m | 
[20:14:30.556]  [2m142[0m |   // Gestione scroll per navbar
[20:14:30.556]  [2m143[0m |   useEffect(() => {
[20:14:30.556]  [2m144[0m |     const handleScroll = () => {
[20:14:30.556]  [2m145[0m |       setIsScrolled(window.scrollY > 100)
[20:14:30.556]  [2m146[0m |     }
[20:14:30.557]  [2m147[0m |     window.addEventListener('scroll', handleScroll)
[20:14:30.557]  [2m148[0m |     return () => window.removeEventListener('scroll', handleScroll)
[20:14:30.557]  [2m149[0m |   }, [])
[20:14:30.557]  [2m150[0m | 
[20:14:30.557]  [2m151[0m |   // Inizializza i dati e termina il caricamento
[20:14:30.557]  [2m152[0m |   useEffect(() => {
[20:14:30.557]  [2m153[0m |     if (cortometraggi.length > 0) {
[20:14:30.558]  [2m154[0m |       setPageLoading(false)
[20:14:30.558]  [2m155[0m |     } else {
[20:14:30.558]  [2m156[0m |       const timer = setTimeout(() => {
[20:14:30.558]  [2m157[0m |         setPageLoading(false)
[20:14:30.558]  [2m158[0m |       }, 300)
[20:14:30.559]  [2m159[0m |       return () => clearTimeout(timer)
[20:14:30.559]  [2m160[0m |     }
[20:14:30.559]  [2m161[0m |   }, [cortometraggi])
[20:14:30.559]  [2m162[0m | 
[20:14:30.560]  [2m163[0m |   // Carica i voti dell'utente da Supabase
[20:14:30.560]  [2m164[0m |   useEffect(() => {
[20:14:30.560]  [2m165[0m |     const loadUserVotes = async () => {
[20:14:30.560]  [2m166[0m |       if (isAuthenticated && user) {
[20:14:30.560]  [2m167[0m |         try {
[20:14:30.561]  [2m168[0m |           const userVotes = await getUserVotes(user.id)
[20:14:30.561]  [2m169[0m |           const votesMap = {}
[20:14:30.561]  [2m170[0m |           userVotes.forEach(vote => {
[20:14:30.561]  [2m171[0m |             votesMap[vote.film_id] = vote.rating
[20:14:30.561]  [2m172[0m |           })
[20:14:30.562]  [2m173[0m |           setRatings(votesMap)
[20:14:30.562]  [2m174[0m |         } catch (error) {
[20:14:30.562]  [2m175[0m |           console.error('Errore nel caricamento dei voti:', error)
[20:14:30.562]  [2m176[0m |           // Fallback al localStorage per compatibilità
[20:14:30.563]  [2m177[0m |           const savedRatings = localStorage.getItem('movieboli-ratings')
[20:14:30.564]  [2m178[0m |           if (savedRatings) {
[20:14:30.564]  [2m179[0m |             try {
[20:14:30.564]  [2m180[0m |               setRatings(JSON.parse(savedRatings))
[20:14:30.564]  [2m181[0m |             } catch (e) {
[20:14:30.564]  [2m182[0m |               console.error('Errore nel caricamento dei voti dal localStorage:', e)
[20:14:30.565]  [2m183[0m |             }
[20:14:30.567]  [2m184[0m |           }
[20:14:30.567]  [2m185[0m |         }
[20:14:30.567]  [2m186[0m |       }
[20:14:30.568]  [2m187[0m |     }
[20:14:30.568]  [2m188[0m | 
[20:14:30.568]  [2m189[0m |     loadUserVotes()
[20:14:30.568]  [2m190[0m |   }, [isAuthenticated, user])
[20:14:30.568]  [2m191[0m | 
[20:14:30.568]  [2m192[0m |   // Gestisce il cambio di rating per un cortometraggio
[20:14:30.569]  [2m193[0m |   const handleRatingChange = async (cortoId, newRating) => {
[20:14:30.569]  [2m194[0m |     if (!isAuthenticated || !user) {
[20:14:30.569]  [2m195[0m |       console.error('Utente non autenticato')
[20:14:30.570]  [2m196[0m |       return
[20:14:30.571]  [2m197[0m |     }
[20:14:30.571]  [2m198[0m | 
[20:14:30.571]  [2m199[0m |     // Aggiorna immediatamente l'UI
[20:14:30.572]  [2m200[0m |     const newRatings = { ...ratings, [cortoId]: newRating }
[20:14:30.572]  [2m201[0m |     setRatings(newRatings)
[20:14:30.572]  [2m202[0m |     
[20:14:30.572]  [2m203[0m |     // Indica che stiamo salvando questo voto
[20:14:30.572]  [2m204[0m |     setSavingVotes(prev => new Set([...prev, cortoId]))
[20:14:30.572]  [2m205[0m |     
[20:14:30.572]  [2m206[0m |     try {
[20:14:30.573]  [2m207[0m |       // Salva nel database Supabase
[20:14:30.573]  [2m208[0m |       await saveVote(user.id, cortoId, newRating)
[20:14:30.573]  [2m209[0m |       
[20:14:30.573]  [2m210[0m |       // Salva anche nel localStorage come backup
[20:14:30.573]  [2m211[0m |       localStorage.setItem('movieboli-ratings', JSON.stringify(newRatings))
[20:14:30.573]  [2m212[0m |       
[20:14:30.573]  [2m213[0m |       // Mostra messaggio di conferma
[20:14:30.573]  [2m214[0m |       setShowThankYou(cortoId)
[20:14:30.573]  [2m215[0m |       setTimeout(() => {
[20:14:30.573]  [2m216[0m |         setShowThankYou(null)
[20:14:30.573]  [2m217[0m |       }, 2000)
[20:14:30.573]  [2m218[0m |     } catch (error) {
[20:14:30.573]  [2m219[0m |       console.error('Errore nel salvare il voto:', error)
[20:14:30.573]  [2m220[0m |       // In caso di errore, ripristina il voto precedente
[20:14:30.573]  [2m221[0m |       setRatings(ratings)
[20:14:30.573]  [2m222[0m |     } finally {
[20:14:30.573]  [2m223[0m |       // Rimuovi l'indicatore di salvataggio
[20:14:30.574]  [2m224[0m |       setSavingVotes(prev => {
[20:14:30.574]  [2m225[0m |         const newSet = new Set(prev)
[20:14:30.574]  [2m226[0m |         newSet.delete(cortoId)
[20:14:30.574]  [2m227[0m |         return newSet
[20:14:30.574]  [2m228[0m |       })
[20:14:30.574]  [2m229[0m |     }
[20:14:30.581]  [2m230[0m |   }
[20:14:30.581]  [2m231[0m | 
[20:14:30.581]  [2m232[0m |   // Ottiene il rating per un cortometraggio
[20:14:30.581]  [2m233[0m |   const getRating = (cortoId) => {
[20:14:30.581]  [2m234[0m |     return ratings[cortoId] || 0
[20:14:30.581]  [2m235[0m |   }
[20:14:30.581]  [2m236[0m | 
[20:14:30.581]  [2m237[0m |   const containerVariants = {
[20:14:30.581]  [2m238[0m |     hidden: { opacity: 0 },
[20:14:30.581]  [2m239[0m |     visible: {
[20:14:30.581]  [2m240[0m |       opacity: 1,
[20:14:30.581]  [2m241[0m |       transition: {
[20:14:30.581]  [2m242[0m |         staggerChildren: 0.1
[20:14:30.581]  [2m243[0m |       }
[20:14:30.581]  [2m244[0m |     }
[20:14:30.581]  [2m245[0m |   }
[20:14:30.581]  [2m246[0m | 
[20:14:30.581]  [2m247[0m |   const itemVariants = {
[20:14:30.581]  [2m248[0m |     hidden: { opacity: 0, y: 30 },
[20:14:30.581]  [2m249[0m |     visible: {
[20:14:30.582]  [2m250[0m |       opacity: 1,
[20:14:30.588]  [2m251[0m |       y: 0,
[20:14:30.588]  [2m252[0m |       transition: {
[20:14:30.588]  [2m253[0m |         duration: 0.6,
[20:14:30.588]  [2m254[0m |         ease: "easeOut"
[20:14:30.588]  [2m255[0m |       }
[20:14:30.588]  [2m256[0m |     }
[20:14:30.588]  [2m257[0m |   }
[20:14:30.588]  [2m258[0m | 
[20:14:30.588]  [2m259[0m |   const cardVariants = {
[20:14:30.588]  [2m260[0m |     hidden: { opacity: 0, scale: 0.9 },
[20:14:30.588]  [2m261[0m |     visible: {
[20:14:30.588]  [2m262[0m |       opacity: 1,
[20:14:30.588]  [2m263[0m |       scale: 1,
[20:14:30.588]  [2m264[0m |       transition: {
[20:14:30.588]  [2m265[0m |         duration: 0.5,
[20:14:30.588]  [2m266[0m |         ease: "easeOut"
[20:14:30.588]  [2m267[0m |       }
[20:14:30.588]  [2m268[0m |     },
[20:14:30.588]  [2m269[0m |     hover: {
[20:14:30.588]  [2m270[0m |       scale: 1.03,
[20:14:30.588]  [2m271[0m |       transition: {
[20:14:30.588]  [2m272[0m |         duration: 0.3,
[20:14:30.588]  [2m273[0m |         ease: "easeInOut"
[20:14:30.588]  [2m274[0m |       }
[20:14:30.588]  [2m275[0m |     }
[20:14:30.588]  [2m276[0m |   }
[20:14:30.588]  [2m277[0m | 
[20:14:30.588]  [2m278[0m |   return (
[20:14:30.588]  [2m279[0m |     <ProtectedRoute>
[20:14:30.588]  [2m280[0m |       <Head>
[20:14:30.588]  [2m281[0m |         <title>
[20:14:30.588]  [2m282[0m |           <EditableText 
[20:14:30.588]  [2m283[0m |             contentKey="vote.meta.title"
[20:14:30.589]  [2m284[0m |             defaultValue="Vota i Cortometraggi | MOVIEBOLI Festival"
[20:14:30.589]  [2m285[0m |             tag="span"
[20:14:30.589]  [2m286[0m |           />
[20:14:30.590]  [2m287[0m |         </title>
[20:14:30.590]  [2m288[0m |         <meta name="description" content={
[20:14:30.590]  [2m289[0m |           getContent('vote.meta.description', 'Esprimi il tuo voto per i cortometraggi in concorso al MOVIEBOLI Festival')
[20:14:30.590]  [2m290[0m |         } />
[20:14:30.590]  [2m291[0m |         <meta property="og:title" content="Vota i Cortometraggi | MOVIEBOLI Festival" />
[20:14:30.590]  [2m292[0m |         <meta property="og:description" content="Partecipa alla giuria popolare del festival." />
[20:14:30.590]  [2m293[0m |         <meta property="og:image" content="/images/og-image.jpg" />
[20:14:30.590]  [2m294[0m |       </Head>
[20:14:30.590]  [2m295[0m |       
[20:14:30.590]  [2m296[0m |       {/* Navbar Festival Standardizzata */}
[20:14:30.590]  [2m297[0m |       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
[20:14:30.591]  [2m298[0m |         isScrolled ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
[20:14:30.591]  [2m299[0m |       }`}>
[20:14:30.591]  [2m300[0m |         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
[20:14:30.591]  [2m301[0m |           <div className="flex justify-between items-center py-4">
[20:14:30.592]  [2m302[0m |             <Link href="/" className="flex items-center space-x-3 group">
[20:14:30.593]  [2m303[0m |               <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
[20:14:30.593]  [2m304[0m |                 <Image
[20:14:30.594]  [2m305[0m |                   src="/logo-movieboli.png"
[20:14:30.594]  [2m306[0m |                   alt="MOVIEBOLI Logo"
[20:14:30.594]  [2m307[0m |                   fill
[20:14:30.594]  [2m308[0m |                   className="object-contain filter brightness-0 invert"
[20:14:30.594]  [2m309[0m |                   priority
[20:14:30.594]  [2m310[0m |                 />
[20:14:30.594]  [2m311[0m |               </div>
[20:14:30.594]  [2m312[0m |               <span className="font-poppins font-semibold text-xl text-movieboli-violaPrincipale">
[20:14:30.594]  [2m313[0m |                 <EditableText 
[20:14:30.594]  [2m314[0m |                   contentKey="festival.nav.title"
[20:14:30.594]  [2m315[0m |                   defaultValue="FESTIVAL 2025"
[20:14:30.594]  [2m316[0m |                   tag="span"
[20:14:30.594]  [2m317[0m |                 />
[20:14:30.594]  [2m318[0m |               </span>
[20:14:30.594]  [2m319[0m |             </Link>
[20:14:30.594]  [2m320[0m |             <div className="hidden md:flex space-x-8">
[20:14:30.594]  [2m321[0m |               <Link href="/festival/programma" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.595]  [2m322[0m |                 <EditableText 
[20:14:30.595]  [2m323[0m |                   contentKey="nav.program"
[20:14:30.595]  [2m324[0m |                   defaultValue="Programma"
[20:14:30.595]  [2m325[0m |                   tag="span"
[20:14:30.595]  [2m326[0m |                 />
[20:14:30.595]  [2m327[0m |               </Link>
[20:14:30.595]  [2m328[0m |               <Link href="/festival/cortometraggi" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.595]  [2m329[0m |                 <EditableText 
[20:14:30.595]  [2m330[0m |                   contentKey="festival.nav.shorts"
[20:14:30.595]  [2m331[0m |                   defaultValue="Cortometraggi"
[20:14:30.595]  [2m332[0m |                   tag="span"
[20:14:30.596]  [2m333[0m |                 />
[20:14:30.596]  [2m334[0m |               </Link>
[20:14:30.596]  [2m335[0m |               <Link href="/festival/film" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.596]  [2m336[0m |                 <EditableText 
[20:14:30.596]  [2m337[0m |                   contentKey="festival.nav.films"
[20:14:30.596]  [2m338[0m |                   defaultValue="Film"
[20:14:30.596]  [2m339[0m |                   tag="span"
[20:14:30.596]  [2m340[0m |                 />
[20:14:30.596]  [2m341[0m |               </Link>
[20:14:30.596]  [2m342[0m |               <Link href="/festival/ospiti" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.596]  [2m343[0m |                 <EditableText 
[20:14:30.596]  [2m344[0m |                   contentKey="festival.nav.guests"
[20:14:30.596]  [2m345[0m |                   defaultValue="Ospiti"
[20:14:30.596]  [2m346[0m |                   tag="span"
[20:14:30.596]  [2m347[0m |                 />
[20:14:30.596]  [2m348[0m |               </Link>
[20:14:30.596]  [2m349[0m |               <Link href="/festival/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.596]  [2m350[0m |                 <EditableText 
[20:14:30.596]  [2m351[0m |                   contentKey="festival.nav.vote"
[20:14:30.596]  [2m352[0m |                   defaultValue="Vota"
[20:14:30.596]  [2m353[0m |                   tag="span"
[20:14:30.596]  [2m354[0m |                 />
[20:14:30.596]  [2m355[0m |               </Link>
[20:14:30.596]  [2m356[0m |               <Link href="/festival/contest_artistico/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.596]  [2m357[0m |                 <EditableText 
[20:14:30.596]  [2m358[0m |                   contentKey="festival.nav.contest"
[20:14:30.596]  [2m359[0m |                   defaultValue="Contest"
[20:14:30.596]  [2m360[0m |                   tag="span"
[20:14:30.596]  [2m361[0m |                 />
[20:14:30.596]  [2m362[0m |               </Link>
[20:14:30.596]  [2m363[0m |               <Link href="/chi-siamo" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.597]  [2m364[0m |                 <EditableText 
[20:14:30.597]  [2m365[0m |                   contentKey="nav.about"
[20:14:30.597]  [2m366[0m |                   defaultValue="Info"
[20:14:30.597]  [2m367[0m |                   tag="span"
[20:14:30.597]  [2m368[0m |                 />
[20:14:30.597]  [2m369[0m |               </Link>
[20:14:30.597]  [2m370[0m |             </div>
[20:14:30.597]  [2m371[0m |           </div>
[20:14:30.597]  [2m372[0m |         </div>
[20:14:30.597]  [2m373[0m |       </nav>
[20:14:30.597]  [2m374[0m | 
[20:14:30.597]  [2m375[0m |       {/* Contenuto principale con padding-top per compensare navbar fissa */}
[20:14:30.597]  [2m376[0m |       <main className="min-h-screen bg-movieboli-neroProfondo text-movieboli-crema pt-20">
[20:14:30.597]  [2m377[0m |         {pageLoading && (
[20:14:30.597]  [2m378[0m |           <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-neroProfondo">
[20:14:30.597]  [2m379[0m |             <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
[20:14:30.597]  [2m380[0m |               <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
[20:14:30.597]  [2m381[0m |               <h2 className="text-xl sm:text-2xl font-bold text-movieboli-crema">MOVIEBOLI Festival 2025</h2>
[20:14:30.597]  [2m382[0m |               <p className="text-sm sm:text-base text-movieboli-crema/80">
[20:14:30.597]  [2m383[0m |                 <EditableText 
[20:14:30.597]  [2m384[0m |                   contentKey="vote.loading"
[20:14:30.597]  [2m385[0m |                   defaultValue="Caricamento sistema di votazione..."
[20:14:30.597]  [2m386[0m |                   tag="span"
[20:14:30.597]  [2m387[0m |                 />
[20:14:30.597]  [2m388[0m |               </p>
[20:14:30.597]  [2m389[0m |             </div>
[20:14:30.597]  [2m390[0m |           </div>
[20:14:30.597]  [2m391[0m |         )}
[20:14:30.597]  [2m392[0m | 
[20:14:30.597]  [2m393[0m |         {/* Messaggio di errore */}
[20:14:30.597]  [2m394[0m |         {error && (
[20:14:30.597]  [2m395[0m |             <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-md mx-auto my-4 max-w-4xl">
[20:14:30.597]  [2m396[0m |               <div className="flex items-center">
[20:14:30.597]  [2m397[0m |                 <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.597]  [2m398[0m |                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
[20:14:30.598]  [2m399[0m |                 </svg>
[20:14:30.598]  [2m400[0m |                 <p>{error}</p>
[20:14:30.598]  [2m401[0m |               </div>
[20:14:30.598]  [2m402[0m |             </div>
[20:14:30.598]  [2m403[0m |           )}
[20:14:30.598]  [2m404[0m |           
[20:14:30.599]  [2m405[0m |           {/* Hero Section */}
[20:14:30.599]  [2m406[0m |           <section className="relative overflow-hidden">
[20:14:30.599]  [2m407[0m |             <div className="absolute inset-0 overflow-hidden">
[20:14:30.599]  [2m408[0m |               <div className="absolute inset-0 bg-movieboli-neroProfondo opacity-90"></div>
[20:14:30.599]  [2m409[0m |               <div className="absolute inset-0 bg-[url('/logo-movieboli.png')] opacity-5"></div>
[20:14:30.599]  [2m410[0m |             </div>
[20:14:30.599]  [2m411[0m |             
[20:14:30.599]  [2m412[0m |             <div className="container mx-auto px-4 py-20 relative z-10">
[20:14:30.599]  [2m413[0m |               <motion.div
[20:14:30.599]  [2m414[0m |                 initial={{ opacity: 0 }}
[20:14:30.599]  [2m415[0m |                 animate={{ opacity: 1 }}
[20:14:30.599]  [2m416[0m |                 transition={{ duration: 0.3 }}
[20:14:30.599]  [2m417[0m |                 className="text-center max-w-4xl mx-auto"
[20:14:30.599]  [2m418[0m |               >
[20:14:30.599]  [2m419[0m |                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-movieboli-rosaPastello via-movieboli-violaPrincipale to-movieboli-violaSecondario drop-shadow-lg tracking-tight leading-tight">
[20:14:30.600]  [2m420[0m |                   <EditableText 
[20:14:30.600]  [2m421[0m |                     contentKey="vote.title"
[20:14:30.600]  [2m422[0m |                     defaultValue="Vota i Cortometraggi del Festival 2025"
[20:14:30.600]  [2m423[0m |                     tag="span"
[20:14:30.601]  [2m424[0m |                   />
[20:14:30.601]  [2m425[0m |                 </h1>
[20:14:30.601]  [2m426[0m |                 <p className="text-lg md:text-xl text-movieboli-crema/80 mb-10 max-w-3xl mx-auto">
[20:14:30.601]  [2m427[0m |                   <EditableText 
[20:14:30.601]  [2m428[0m |                     contentKey="vote.subtitle"
[20:14:30.602]  [2m429[0m |                     defaultValue="Esprimi il tuo giudizio sui cortometraggi in competizione utilizzando il nostro sistema di rating a stelle. Puoi votare e modificare i tuoi voti in qualsiasi momento."
[20:14:30.602]  [2m430[0m |                     tag="span"
[20:14:30.602]  [2m431[0m |                   />
[20:14:30.602]  [2m432[0m |                 </p>
[20:14:30.602]  [2m433[0m |                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-movieboli-crema/70 mb-8">
[20:14:30.603]  [2m434[0m |                   <div className="flex items-center gap-2">
[20:14:30.603]  [2m435[0m |                     <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
[20:14:30.603]  [2m436[0m |                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
[20:14:30.603]  [2m437[0m |                     </svg>
[20:14:30.604]  [2m438[0m |                     <span>
[20:14:30.604]  [2m439[0m |                       <EditableText 
[20:14:30.604]  [2m440[0m |                         contentKey="vote.rating_system"
[20:14:30.604]  [2m441[0m |                         defaultValue="Sistema di rating a 5 stelle con mezze stelle"
[20:14:30.604]  [2m442[0m |                         tag="span"
[20:14:30.605]  [2m443[0m |                       />
[20:14:30.605]  [2m444[0m |                     </span>
[20:14:30.605]  [2m445[0m |                   </div>
[20:14:30.605]  [2m446[0m |                   <div className="flex items-center gap-2">
[20:14:30.605]  [2m447[0m |                     <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
[20:14:30.606]  [2m448[0m |                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
[20:14:30.606]  [2m449[0m |                     </svg>
[20:14:30.606]  [2m450[0m |                     <span>
[20:14:30.606]  [2m451[0m |                       <EditableText 
[20:14:30.606]  [2m452[0m |                         contentKey="vote.rating_system"
[20:14:30.606]  [2m453[0m |                         defaultValue="Sistema di rating a 5 stelle con mezze stelle"
[20:14:30.607]  [2m454[0m |                         tag="span"
[20:14:30.607]  [2m455[0m |                       />
[20:14:30.607]  [2m456[0m |                     </span>
[20:14:30.607]  [2m457[0m |                   </div>
[20:14:30.607]  [2m458[0m |                 </div>
[20:14:30.607]  [2m459[0m |                 <Link href="/festival" legacyBehavior passHref>
[20:14:30.608]  [2m460[0m |                   <motion.a
[20:14:30.608]  [2m461[0m |                     className="inline-flex items-center px-6 py-3 rounded-xl bg-movieboli-violaPrincipale text-movieboli-nero font-bold transition-all duration-300"
[20:14:30.608]  [2m462[0m |                     whileTap={{ scale: 0.95 }}
[20:14:30.608]  [2m463[0m |                   >
[20:14:30.608]  [2m464[0m |                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.608]  [2m465[0m |                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
[20:14:30.609]  [2m466[0m |                     </svg>
[20:14:30.609]  [2m467[0m |                     <EditableText 
[20:14:30.609]  [2m468[0m |                       contentKey="vote.back_to_festival"
[20:14:30.609]  [2m469[0m |                       defaultValue="Torna al Festival"
[20:14:30.609]  [2m470[0m |                       tag="span"
[20:14:30.609]  [2m471[0m |                     />
[20:14:30.610]  [2m472[0m |                   </motion.a>
[20:14:30.610]  [2m473[0m |                 </Link>
[20:14:30.610]  [2m474[0m |               </motion.div>
[20:14:30.610]  [2m475[0m |             </div>
[20:14:30.610]  [2m476[0m |           </section>
[20:14:30.611]  [2m477[0m | 
[20:14:30.611]  [2m478[0m |           {/* Sezione Cortometraggi */}
[20:14:30.611]  [2m479[0m |           <motion.section 
[20:14:30.611]  [2m480[0m |             className="py-20 px-4 bg-gradient-to-b from-movieboli-neroProfondo via-movieboli-bordeaux/5 to-movieboli-neroProfondo"
[20:14:30.611]  [2m481[0m |             variants={containerVariants}
[20:14:30.611]  [2m482[0m |             initial="hidden"
[20:14:30.612]  [2m483[0m |             whileInView="visible"
[20:14:30.613]  [2m484[0m |             viewport={{ once: true, margin: "-100px" }}
[20:14:30.613]  [2m485[0m |           >
[20:14:30.613]  [2m486[0m |             <div className="max-w-7xl mx-auto">
[20:14:30.613]  [2m487[0m |               <motion.div 
[20:14:30.613]  [2m488[0m |                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
[20:14:30.614]  [2m489[0m |                 variants={containerVariants}
[20:14:30.614]  [2m490[0m |               >
[20:14:30.614]  [2m491[0m |                 {cortometraggi.map((corto, index) => {
[20:14:30.614]  [2m492[0m |                   const cortoId = corto.id || corto.titolo || `corto-${index}`
[20:14:30.614]  [2m493[0m |                   const currentRating = getRating(cortoId)
[20:14:30.614]  [2m494[0m |                   const showingThankYou = showThankYou === cortoId
[20:14:30.614]  [2m495[0m |                   
[20:14:30.615]  [2m496[0m |                   return (
[20:14:30.615]  [2m497[0m |                     <motion.div
[20:14:30.615]  [2m498[0m |                       key={cortoId}
[20:14:30.615]  [2m499[0m |                       className="group bg-movieboli-bordeaux/20 rounded-2xl overflow-hidden border border-movieboli-violaPrincipale/20 hover:border-movieboli-violaPrincipale/50 transition-all duration-300 relative"
[20:14:30.615]  [2m500[0m |                       variants={cardVariants}
[20:14:30.615]  [2m501[0m |                       initial="hidden"
[20:14:30.615]  [2m502[0m |                       whileInView="visible"
[20:14:30.616]  [2m503[0m |                       whileHover="hover"
[20:14:30.616]  [2m504[0m |                       viewport={{ once: true }}
[20:14:30.616]  [2m505[0m |                     >
[20:14:30.616]  [2m506[0m |                       {/* Badge In Gara */}
[20:14:30.617]  [2m507[0m |                       <div className="absolute top-4 left-4 z-10">
[20:14:30.617]  [2m508[0m |                         <span className="bg-movieboli-violaPrincipale text-movieboli-nero text-xs font-bold px-3 py-1 rounded-full">
[20:14:30.617]  [2m509[0m |                           FESTIVAL 2025
[20:14:30.617]  [2m510[0m |                         </span>
[20:14:30.617]  [2m511[0m |                       </div>
[20:14:30.618]  [2m512[0m | 
[20:14:30.618]  [2m513[0m |                       {/* Messaggio Thank You */}
[20:14:30.618]  [2m514[0m |                       <AnimatePresence>
[20:14:30.618]  [2m515[0m |                         {showingThankYou && (
[20:14:30.618]  [2m516[0m |                           <motion.div 
[20:14:30.618]  [2m517[0m |                             className="absolute inset-0 bg-movieboli-violaPrincipale/95 flex items-center justify-center z-20 rounded-2xl"
[20:14:30.618]  [2m518[0m |                             initial={{ opacity: 0, scale: 0.8 }}
[20:14:30.618]  [2m519[0m |                             animate={{ opacity: 1, scale: 1 }}
[20:14:30.618]  [2m520[0m |                             exit={{ opacity: 0, scale: 0.8 }}
[20:14:30.618]  [2m521[0m |                             transition={{ duration: 0.3 }}
[20:14:30.618]  [2m522[0m |                           >
[20:14:30.618]  [2m523[0m |                             <div className="text-center text-movieboli-nero">
[20:14:30.618]  [2m524[0m |                               <motion.div
[20:14:30.618]  [2m525[0m |                                 initial={{ scale: 0 }}
[20:14:30.618]  [2m526[0m |                                 animate={{ scale: 1 }}
[20:14:30.618]  [2m527[0m |                                 transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
[20:14:30.618]  [2m528[0m |                               >
[20:14:30.619]  [2m529[0m |                                 <div className="w-16 h-16 bg-movieboli-crema rounded-full flex items-center justify-center mx-auto mb-4">
[20:14:30.619]  [2m530[0m |                                   <svg className="w-6 h-6 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.619]  [2m531[0m |                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
[20:14:30.619]  [2m532[0m |                                   </svg>
[20:14:30.619]  [2m533[0m |                                 </div>
[20:14:30.619]  [2m534[0m |                               </motion.div>
[20:14:30.619]  [2m535[0m |                               <h3 className="text-xl font-bold mb-2">
[20:14:30.619]  [2m536[0m |                                 <EditableText 
[20:14:30.619]  [2m537[0m |                                   contentKey="vote.success_title"
[20:14:30.619]  [2m538[0m |                                   defaultValue="Voto registrato!"
[20:14:30.619]  [2m539[0m |                                   tag="span"
[20:14:30.619]  [2m540[0m |                                 />
[20:14:30.619]  [2m541[0m |                               </h3>
[20:14:30.619]  [2m542[0m |                               <p className="text-sm opacity-80">
[20:14:30.619]  [2m543[0m |                                 <EditableText 
[20:14:30.619]  [2m544[0m |                                   contentKey="vote.success_message"
[20:14:30.619]  [2m545[0m |                                   defaultValue="Grazie per la tua valutazione"
[20:14:30.619]  [2m546[0m |                                   tag="span"
[20:14:30.619]  [2m547[0m |                                 />
[20:14:30.619]  [2m548[0m |                               </p>
[20:14:30.619]  [2m549[0m |                             </div>
[20:14:30.619]  [2m550[0m |                           </motion.div>
[20:14:30.619]  [2m551[0m |                         )}
[20:14:30.619]  [2m552[0m |                       </AnimatePresence>
[20:14:30.619]  [2m553[0m | 
[20:14:30.620]  [2m554[0m |                       {/* Immagine del Cortometraggio */}
[20:14:30.620]  [2m555[0m |                       <div className="relative aspect-[3/4] overflow-hidden">
[20:14:30.620]  [2m556[0m |                         {corto.immagine ? (
[20:14:30.620]  [2m557[0m |                           <img 
[20:14:30.620]  [2m558[0m |                             src={corto.immagine} 
[20:14:30.620]  [2m559[0m |                             alt={`Poster di ${corto.titolo}`}
[20:14:30.620]  [2m560[0m |                             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
[20:14:30.620]  [2m561[0m |                             onError={(e) => {
[20:14:30.620]  [2m562[0m |                               e.target.style.display = 'none'
[20:14:30.620]  [2m563[0m |                               e.target.nextSibling.style.display = 'flex'
[20:14:30.620]  [2m564[0m |                             }}
[20:14:30.620]  [2m565[0m |                           />
[20:14:30.620]  [2m566[0m |                         ) : null}
[20:14:30.620]  [2m567[0m |                         <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center" style={{ display: corto.immagine ? 'none' : 'flex' }}>
[20:14:30.620]  [2m568[0m |                           <div className="text-center text-movieboli-crema/60">
[20:14:30.620]  [2m569[0m |                             <div className="w-16 h-16 mx-auto mb-3 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center">
[20:14:30.620]  [2m570[0m |                               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
[20:14:30.620]  [2m571[0m |                                 <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
[20:14:30.620]  [2m572[0m |                               </svg>
[20:14:30.621]  [2m573[0m |                             </div>
[20:14:30.621]  [2m574[0m |                             <p className="text-sm">Poster del Film</p>
[20:14:30.621]  [2m575[0m |                           </div>
[20:14:30.621]  [2m576[0m |                         </div>
[20:14:30.621]  [2m577[0m |                         <div className="absolute inset-0 bg-gradient-to-t from-movieboli-neroProfondo/80 via-transparent to-transparent" />
[20:14:30.621]  [2m578[0m |                       </div>
[20:14:30.621]  [2m579[0m | 
[20:14:30.622]  [2m580[0m |                       {/* Contenuto Card */}
[20:14:30.622]  [2m581[0m |                       <div className="p-6">
[20:14:30.622]  [2m582[0m |                         <h3 className="text-xl font-bold mb-2 text-movieboli-crema group-hover:text-movieboli-violaPrincipale transition-colors duration-200">
[20:14:30.622]  [2m583[0m |                           {corto.titolo}
[20:14:30.622]  [2m584[0m |                         </h3>
[20:14:30.622]  [2m585[0m |                         <p className="text-movieboli-crema/70 mb-3">
[20:14:30.625]  [2m586[0m |                           Regia di {corto.regista}
[20:14:30.625]  [2m587[0m |                         </p>
[20:14:30.626]  [2m588[0m |                         <div className="flex justify-between items-center text-sm text-movieboli-crema/60 mb-4">
[20:14:30.626]  [2m589[0m |                           <span>{corto.durata}</span>
[20:14:30.626]  [2m590[0m |                           {corto.anno && <span>{corto.anno}</span>}
[20:14:30.626]  [2m591[0m |                         </div>
[20:14:30.626]  [2m592[0m |                         <p className="text-movieboli-crema/80 text-sm mb-6 line-clamp-3">
[20:14:30.626]  [2m593[0m |                           {corto.sinossi}
[20:14:30.626]  [2m594[0m |                         </p>
[20:14:30.626]  [2m595[0m |                         
[20:14:30.626]  [2m596[0m |                         {/* Sistema di Rating con Stelle */}
[20:14:30.626]  [2m597[0m |                         <div className="mb-4">
[20:14:30.626]  [2m598[0m |                           <div className="flex items-center justify-between mb-2">
[20:14:30.626]  [2m599[0m |                             <span className="text-sm font-medium text-movieboli-crema/80">
[20:14:30.626]  [2m600[0m |                               {currentRating > 0 ? `La tua valutazione: ${currentRating}/10` : 
[20:14:30.626]  [2m601[0m |                                 getContent('vote.rating.label', 'Valuta questo cortometraggio')
[20:14:30.626]  [2m602[0m |                               }
[20:14:30.626]  [2m603[0m |                             </span>
[20:14:30.626]  [2m604[0m |                             {currentRating > 0 && (
[20:14:30.626]  [2m605[0m |                                <button
[20:14:30.627]  [2m606[0m |                                  onClick={() => handleRatingChange(cortoId, 0)}
[20:14:30.627]  [2m607[0m |                                  className="text-xs text-movieboli-crema/60 hover:text-movieboli-violaPrincipale transition-colors"
[20:14:30.627]  [2m608[0m |                                >
[20:14:30.627]  [2m609[0m |                                  <EditableText 
[20:14:30.627]  [2m610[0m |                                    contentKey="vote.remove_vote"
[20:14:30.627]  [2m611[0m |                                    defaultValue="Rimuovi voto"
[20:14:30.627]  [2m612[0m |                                    tag="span"
[20:14:30.627]  [2m613[0m |                                  />
[20:14:30.627]  [2m614[0m |                                </button>
[20:14:30.627]  [2m615[0m |                              )}
[20:14:30.627]  [2m616[0m |                           </div>
[20:14:30.627]  [2m617[0m |                           <StarRating 
[20:14:30.627]  [2m618[0m |                              rating={currentRating}
[20:14:30.627]  [2m619[0m |                              onRatingChange={(rating) => handleRatingChange(cortoId, rating)}
[20:14:30.627]  [2m620[0m |                              isSaving={savingVotes.has(cortoId)}
[20:14:30.627]  [2m621[0m |                            />
[20:14:30.627]  [2m622[0m |                         </div>
[20:14:30.627]  [2m623[0m |                         
[20:14:30.627]  [2m624[0m |                         {/* Link al Trailer se disponibile */}
[20:14:30.628]  [2m625[0m |                         {(corto.trailer || corto.link) && (
[20:14:30.628]  [2m626[0m |                           <motion.a
[20:14:30.628]  [2m627[0m |                             href={corto.trailer || corto.link}
[20:14:30.628]  [2m628[0m |                             target="_blank"
[20:14:30.628]  [2m629[0m |                             rel="noopener noreferrer"
[20:14:30.628]  [2m630[0m |                             className="w-full py-2 px-4 rounded-xl border border-movieboli-violaPrincipale/50 text-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
[20:14:30.628]  [2m631[0m |                             whileHover={{ scale: 1.02 }}
[20:14:30.628]  [2m632[0m |                             whileTap={{ scale: 0.98 }}
[20:14:30.628]  [2m633[0m |                           >
[20:14:30.628]  [2m634[0m |                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.628]  [2m635[0m |                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
[20:14:30.628]  [2m636[0m |                             </svg>
[20:14:30.629]  [2m637[0m |                             <span>
[20:14:30.629]  [2m638[0m |                               <EditableText 
[20:14:30.629]  [2m639[0m |                                 contentKey="vote.watch_trailer"
[20:14:30.629]  [2m640[0m |                                 defaultValue="Guarda Trailer"
[20:14:30.629]  [2m641[0m |                                 tag="span"
[20:14:30.629]  [2m642[0m |                               />
[20:14:30.629]  [2m643[0m |                             </span>
[20:14:30.629]  [2m644[0m |                           </motion.a>
[20:14:30.629]  [2m645[0m |                         )}
[20:14:30.629]  [2m646[0m |                       </div>
[20:14:30.629]  [2m647[0m |                     </motion.div>
[20:14:30.629]  [2m648[0m |                   )
[20:14:30.629]  [2m649[0m |                 })}
[20:14:30.629]  [2m650[0m |               </motion.div>
[20:14:30.629]  [2m651[0m |             </div>
[20:14:30.629]  [2m652[0m |           </motion.section>
[20:14:30.630]  [2m653[0m | 
[20:14:30.630]  [2m654[0m |           <Footer />
[20:14:30.630]  [2m655[0m |         </main>
[20:14:30.630]  [2m656[0m |       </ProtectedRoute>
[20:14:30.630]  [2m657[0m |     )
[20:14:30.630]  [2m658[0m | }
[20:14:30.630]  [2m659[0m | 
[20:14:30.630]  [2m660[0m | // Funzione per caricare i dati dei cortometraggi dal lato server
[20:14:30.630]  [2m661[0m | export async function getStaticProps() {
[20:14:30.630]  [2m662[0m |   try {
[20:14:30.630]  [2m663[0m |     const fs = require('fs')
[20:14:30.630]  [2m664[0m |     const path = require('path')
[20:14:30.630]  [2m665[0m |     const filePath = path.join(process.cwd(), 'public', 'json-folders', 'film_unificati.json')
[20:14:30.630]  [2m666[0m |     const fileContents = fs.readFileSync(filePath, 'utf8')
[20:14:30.630]  [2m667[0m |     const allCortometraggi = JSON.parse(fileContents)
[20:14:30.630]  [2m668[0m | 
[20:14:30.630]  [2m669[0m |     // Lista dei primi 5 cortometraggi del programma del 22 agosto (venerdì)
[20:14:30.630]  [2m670[0m |     const cortometraggiVotabili = [
[20:14:30.635]  [2m671[0m |       'DIECI SECONDI',
[20:14:30.635]  [2m672[0m |       'Place under the sun',  // Corretto: era 'PLACE UNDER THE SUN'
[20:14:30.635]  [2m673[0m |       'The Rock Tensions',
[20:14:30.635]  [2m674[0m |       'APPUNTAMENTO A MEZZOGIORNO',
[20:14:30.635]  [2m675[0m |       'Ya Hanouni'
[20:14:30.635]  [2m676[0m |     ]
[20:14:30.635]  [2m677[0m | 
[20:14:30.635]  [2m678[0m |     // Filtra solo i cortometraggi votabili del 22 agosto
[20:14:30.635]  [2m679[0m |     const cortometraggi = allCortometraggi
[20:14:30.635]  [2m680[0m |       .filter(corto => cortometraggiVotabili.includes(corto.titolo))
[20:14:30.635]  [2m681[0m |       .sort((a, b) => {
[20:14:30.635]  [2m682[0m |         // Ordina secondo l'ordine del programma del 22 agosto
[20:14:30.635]  [2m683[0m |         const indexA = cortometraggiVotabili.indexOf(a.titolo)
[20:14:30.635]  [2m684[0m |         const indexB = cortometraggiVotabili.indexOf(b.titolo)
[20:14:30.635]  [2m685[0m |         return indexA - indexB
[20:14:30.635]  [2m686[0m |       })
[20:14:30.635]  [2m687[0m | 
[20:14:30.635]  [2m688[0m |     return {
[20:14:30.635]  [2m689[0m |       props: {
[20:14:30.635]  [2m690[0m |         cortometraggi,
[20:14:30.635]  [2m691[0m |       },
[20:14:30.635]  [2m692[0m |       revalidate: 3600, // Ricarica ogni ora
[20:14:30.635]  [2m693[0m |     }
[20:14:30.635]  [2m694[0m |   } catch (error) {
[20:14:30.636]  [2m695[0m |     console.error('Errore nel caricamento dei cortometraggi:', error)
[20:14:30.636]  [2m696[0m |     return {
[20:14:30.636]  [2m697[0m |       props: {
[20:14:30.636]  [2m698[0m |         cortometraggi: [],
[20:14:30.636]  [2m699[0m |         error: 'Errore nel caricamento dei cortometraggi'
[20:14:30.636]  [2m700[0m |       },
[20:14:30.636]  [2m701[0m |     }
[20:14:30.636]  [2m702[0m |   }
[20:14:30.636]  [2m703[0m | }
[20:14:30.636]  [2m704[0m | 
[20:14:30.636]  [2m705[0m | export default Vota
[20:14:30.636]  [2m706[0m | 
[20:14:30.636]  [2m707[0m | // Funzioni per chiamare l'API
[20:14:30.636]  [2m708[0m | const getUserVotesFromAPI = async (token) => {
[20:14:30.636]  [2m709[0m |   const response = await fetch('/api/votes', {
[20:14:30.636]  [2m710[0m |     method: 'GET',
[20:14:30.636]  [2m711[0m |     headers: {
[20:14:30.636]  [2m712[0m |       'Authorization': `Bearer ${token}`,
[20:14:30.636]  [2m713[0m |       'Content-Type': 'application/json'
[20:14:30.636]  [2m714[0m |     }
[20:14:30.636]  [2m715[0m |   });
[20:14:30.636]  [2m716[0m |   
[20:14:30.636]  [2m717[0m |   if (!response.ok) {
[20:14:30.636]  [2m718[0m |     throw new Error('Errore nel recupero dei voti');
[20:14:30.636]  [2m719[0m |   }
[20:14:30.636]  [2m720[0m |   
[20:14:30.636]  [2m721[0m |   const data = await response.json();
[20:14:30.636]  [2m722[0m |   return data.votes;
[20:14:30.637]  [2m723[0m | };
[20:14:30.637]  [2m724[0m | 
[20:14:30.637]  [2m725[0m | const saveVoteToAPI = async (token, filmId, rating) => {
[20:14:30.637]  [2m726[0m |   const response = await fetch('/api/votes', {
[20:14:30.637]  [2m727[0m |     method: 'POST',
[20:14:30.637]  [2m728[0m |     headers: {
[20:14:30.637]  [2m729[0m |       'Authorization': `Bearer ${token}`,
[20:14:30.637]  [2m730[0m |       'Content-Type': 'application/json'
[20:14:30.637]  [2m731[0m |     },
[20:14:30.637]  [2m732[0m |     body: JSON.stringify({
[20:14:30.637]  [2m733[0m |       film_id: filmId,
[20:14:30.637]  [2m734[0m |       rating: rating
[20:14:30.637]  [2m735[0m |     })
[20:14:30.637]  [2m736[0m |   });
[20:14:30.637]  [2m737[0m |   
[20:14:30.637]  [2m738[0m |   if (!response.ok) {
[20:14:30.637]  [2m739[0m |     throw new Error('Errore nel salvataggio del voto');
[20:14:30.637]  [2m740[0m |   }
[20:14:30.637]  [2m741[0m |   
[20:14:30.637]  [2m742[0m |   return await response.json();
[20:14:30.637]  [2m743[0m | };
[20:14:30.637]  [2m744[0m | 
[20:14:30.637]  [2m745[0m | const Vota = ({ cortometraggi = [], error = null }) => {
[20:14:30.637]      : [33;1m      ^^|^[0m
[20:14:30.637]      :         [33;1m`-- [33;1m`Vota` redefined here[0m[0m
[20:14:30.637]  [2m746[0m |   const { getContent } = useContent()
[20:14:30.638]  [2m747[0m |   const { user, isAuthenticated } = useAuth()
[20:14:30.638]  [2m748[0m |   const [ratings, setRatings] = useState({})
[20:14:30.638]      `----
[20:14:30.638] 
[20:14:30.638]   [31mx[0m the name `getStaticProps` is defined multiple times
[20:14:30.638]       ,-[[36;1;4m/vercel/path0/pages/festival/vota.jsx[0m:658:1]
[20:14:30.638]  [2m 658[0m | }
[20:14:30.638]  [2m 659[0m | 
[20:14:30.638]  [2m 660[0m | // Funzione per caricare i dati dei cortometraggi dal lato server
[20:14:30.638]  [2m 661[0m | export async function getStaticProps() {
[20:14:30.638]       : [31;1m                      ^^^^^^^|^^^^^^[0m
[20:14:30.638]       :                              [31;1m`-- [31;1mprevious definition of `getStaticProps` here[0m[0m
[20:14:30.638]  [2m 662[0m |   try {
[20:14:30.643]  [2m 663[0m |     const fs = require('fs')
[20:14:30.643]  [2m 664[0m |     const path = require('path')
[20:14:30.643]  [2m 665[0m |     const filePath = path.join(process.cwd(), 'public', 'json-folders', 'film_unificati.json')
[20:14:30.644]  [2m 666[0m |     const fileContents = fs.readFileSync(filePath, 'utf8')
[20:14:30.644]  [2m 667[0m |     const allCortometraggi = JSON.parse(fileContents)
[20:14:30.644]  [2m 668[0m | 
[20:14:30.644]  [2m 669[0m |     // Lista dei primi 5 cortometraggi del programma del 22 agosto (venerdì)
[20:14:30.644]  [2m 670[0m |     const cortometraggiVotabili = [
[20:14:30.645]  [2m 671[0m |       'DIECI SECONDI',
[20:14:30.645]  [2m 672[0m |       'Place under the sun',  // Corretto: era 'PLACE UNDER THE SUN'
[20:14:30.645]  [2m 673[0m |       'The Rock Tensions',
[20:14:30.645]  [2m 674[0m |       'APPUNTAMENTO A MEZZOGIORNO',
[20:14:30.645]  [2m 675[0m |       'Ya Hanouni'
[20:14:30.645]  [2m 676[0m |     ]
[20:14:30.646]  [2m 677[0m | 
[20:14:30.646]  [2m 678[0m |     // Filtra solo i cortometraggi votabili del 22 agosto
[20:14:30.646]  [2m 679[0m |     const cortometraggi = allCortometraggi
[20:14:30.646]  [2m 680[0m |       .filter(corto => cortometraggiVotabili.includes(corto.titolo))
[20:14:30.646]  [2m 681[0m |       .sort((a, b) => {
[20:14:30.646]  [2m 682[0m |         // Ordina secondo l'ordine del programma del 22 agosto
[20:14:30.647]  [2m 683[0m |         const indexA = cortometraggiVotabili.indexOf(a.titolo)
[20:14:30.647]  [2m 684[0m |         const indexB = cortometraggiVotabili.indexOf(b.titolo)
[20:14:30.647]  [2m 685[0m |         return indexA - indexB
[20:14:30.647]  [2m 686[0m |       })
[20:14:30.647]  [2m 687[0m | 
[20:14:30.647]  [2m 688[0m |     return {
[20:14:30.648]  [2m 689[0m |       props: {
[20:14:30.648]  [2m 690[0m |         cortometraggi,
[20:14:30.648]  [2m 691[0m |       },
[20:14:30.648]  [2m 692[0m |       revalidate: 3600, // Ricarica ogni ora
[20:14:30.648]  [2m 693[0m |     }
[20:14:30.648]  [2m 694[0m |   } catch (error) {
[20:14:30.649]  [2m 695[0m |     console.error('Errore nel caricamento dei cortometraggi:', error)
[20:14:30.649]  [2m 696[0m |     return {
[20:14:30.649]  [2m 697[0m |       props: {
[20:14:30.649]  [2m 698[0m |         cortometraggi: [],
[20:14:30.649]  [2m 699[0m |         error: 'Errore nel caricamento dei cortometraggi'
[20:14:30.650]  [2m 700[0m |       },
[20:14:30.650]  [2m 701[0m |     }
[20:14:30.650]  [2m 702[0m |   }
[20:14:30.651]  [2m 703[0m | }
[20:14:30.651]  [2m 704[0m | 
[20:14:30.651]  [2m 705[0m | export default Vota
[20:14:30.651]  [2m 706[0m | 
[20:14:30.651]  [2m 707[0m | // Funzioni per chiamare l'API
[20:14:30.652]  [2m 708[0m | const getUserVotesFromAPI = async (token) => {
[20:14:30.652]  [2m 709[0m |   const response = await fetch('/api/votes', {
[20:14:30.652]  [2m 710[0m |     method: 'GET',
[20:14:30.652]  [2m 711[0m |     headers: {
[20:14:30.652]  [2m 712[0m |       'Authorization': `Bearer ${token}`,
[20:14:30.652]  [2m 713[0m |       'Content-Type': 'application/json'
[20:14:30.653]  [2m 714[0m |     }
[20:14:30.653]  [2m 715[0m |   });
[20:14:30.653]  [2m 716[0m |   
[20:14:30.653]  [2m 717[0m |   if (!response.ok) {
[20:14:30.653]  [2m 718[0m |     throw new Error('Errore nel recupero dei voti');
[20:14:30.654]  [2m 719[0m |   }
[20:14:30.654]  [2m 720[0m |   
[20:14:30.654]  [2m 721[0m |   const data = await response.json();
[20:14:30.654]  [2m 722[0m |   return data.votes;
[20:14:30.654]  [2m 723[0m | };
[20:14:30.655]  [2m 724[0m | 
[20:14:30.655]  [2m 725[0m | const saveVoteToAPI = async (token, filmId, rating) => {
[20:14:30.655]  [2m 726[0m |   const response = await fetch('/api/votes', {
[20:14:30.655]  [2m 727[0m |     method: 'POST',
[20:14:30.655]  [2m 728[0m |     headers: {
[20:14:30.656]  [2m 729[0m |       'Authorization': `Bearer ${token}`,
[20:14:30.656]  [2m 730[0m |       'Content-Type': 'application/json'
[20:14:30.656]  [2m 731[0m |     },
[20:14:30.656]  [2m 732[0m |     body: JSON.stringify({
[20:14:30.656]  [2m 733[0m |       film_id: filmId,
[20:14:30.657]  [2m 734[0m |       rating: rating
[20:14:30.657]  [2m 735[0m |     })
[20:14:30.657]  [2m 736[0m |   });
[20:14:30.658]  [2m 737[0m |   
[20:14:30.658]  [2m 738[0m |   if (!response.ok) {
[20:14:30.658]  [2m 739[0m |     throw new Error('Errore nel salvataggio del voto');
[20:14:30.658]  [2m 740[0m |   }
[20:14:30.659]  [2m 741[0m |   
[20:14:30.659]  [2m 742[0m |   return await response.json();
[20:14:30.659]  [2m 743[0m | };
[20:14:30.659]  [2m 744[0m | 
[20:14:30.659]  [2m 745[0m | const Vota = ({ cortometraggi = [], error = null }) => {
[20:14:30.660]  [2m 746[0m |   const { getContent } = useContent()
[20:14:30.660]  [2m 747[0m |   const { user, isAuthenticated } = useAuth()
[20:14:30.660]  [2m 748[0m |   const [ratings, setRatings] = useState({})
[20:14:30.660]  [2m 749[0m |   const [showThankYou, setShowThankYou] = useState(null)
[20:14:30.661]  [2m 750[0m |   const [pageLoading, setPageLoading] = useState(true)
[20:14:30.661]  [2m 751[0m |   const [savingVotes, setSavingVotes] = useState(new Set())
[20:14:30.661]  [2m 752[0m |   const [isScrolled, setIsScrolled] = useState(false)
[20:14:30.661]  [2m 753[0m | 
[20:14:30.661]  [2m 754[0m |   // Gestione scroll per navbar
[20:14:30.662]  [2m 755[0m |   useEffect(() => {
[20:14:30.662]  [2m 756[0m |     const handleScroll = () => {
[20:14:30.662]  [2m 757[0m |       setIsScrolled(window.scrollY > 100)
[20:14:30.662]  [2m 758[0m |     }
[20:14:30.663]  [2m 759[0m |     window.addEventListener('scroll', handleScroll)
[20:14:30.663]  [2m 760[0m |     return () => window.removeEventListener('scroll', handleScroll)
[20:14:30.663]  [2m 761[0m |   }, [])
[20:14:30.663]  [2m 762[0m | 
[20:14:30.663]  [2m 763[0m |   // Inizializza i dati e termina il caricamento
[20:14:30.664]  [2m 764[0m |   useEffect(() => {
[20:14:30.664]  [2m 765[0m |     if (cortometraggi.length > 0) {
[20:14:30.664]  [2m 766[0m |       setPageLoading(false)
[20:14:30.664]  [2m 767[0m |     } else {
[20:14:30.665]  [2m 768[0m |       const timer = setTimeout(() => {
[20:14:30.665]  [2m 769[0m |         setPageLoading(false)
[20:14:30.665]  [2m 770[0m |       }, 300)
[20:14:30.665]  [2m 771[0m |       return () => clearTimeout(timer)
[20:14:30.665]  [2m 772[0m |     }
[20:14:30.666]  [2m 773[0m |   }, [cortometraggi])
[20:14:30.666]  [2m 774[0m | 
[20:14:30.666]  [2m 775[0m |   // Carica i voti dell'utente dall'API
[20:14:30.666]  [2m 776[0m |   useEffect(() => {
[20:14:30.667]  [2m 777[0m |     const loadUserVotes = async () => {
[20:14:30.667]  [2m 778[0m |       if (isAuthenticated && user) {
[20:14:30.667]  [2m 779[0m |         try {
[20:14:30.667]  [2m 780[0m |           // Ottieni il token di sessione
[20:14:30.667]  [2m 781[0m |           const { data: { session } } = await supabase.auth.getSession();
[20:14:30.668]  [2m 782[0m |           if (!session?.access_token) {
[20:14:30.668]  [2m 783[0m |             throw new Error('Token di sessione non disponibile');
[20:14:30.668]  [2m 784[0m |           }
[20:14:30.668]  [2m 785[0m | 
[20:14:30.668]  [2m 786[0m |           const userVotes = await getUserVotesFromAPI(session.access_token);
[20:14:30.669]  [2m 787[0m |           const votesMap = {};
[20:14:30.669]  [2m 788[0m |           userVotes.forEach(vote => {
[20:14:30.669]  [2m 789[0m |             votesMap[vote.film_id] = vote.rating;
[20:14:30.669]  [2m 790[0m |           });
[20:14:30.669]  [2m 791[0m |           setRatings(votesMap);
[20:14:30.670]  [2m 792[0m |         } catch (error) {
[20:14:30.671]  [2m 793[0m |           console.error('Errore nel caricamento dei voti:', error);
[20:14:30.671]  [2m 794[0m |           // Fallback al localStorage per compatibilità
[20:14:30.671]  [2m 795[0m |           const savedRatings = localStorage.getItem('movieboli-ratings');
[20:14:30.671]  [2m 796[0m |           if (savedRatings) {
[20:14:30.672]  [2m 797[0m |             try {
[20:14:30.672]  [2m 798[0m |               setRatings(JSON.parse(savedRatings));
[20:14:30.672]  [2m 799[0m |             } catch (e) {
[20:14:30.672]  [2m 800[0m |               console.error('Errore nel caricamento dei voti dal localStorage:', e);
[20:14:30.672]  [2m 801[0m |             }
[20:14:30.673]  [2m 802[0m |           }
[20:14:30.673]  [2m 803[0m |         }
[20:14:30.673]  [2m 804[0m |       }
[20:14:30.673]  [2m 805[0m |     };
[20:14:30.673]  [2m 806[0m | 
[20:14:30.674]  [2m 807[0m |     loadUserVotes();
[20:14:30.674]  [2m 808[0m |   }, [isAuthenticated, user]);
[20:14:30.674]  [2m 809[0m | 
[20:14:30.674]  [2m 810[0m |   // Gestisce il cambio di rating per un cortometraggio
[20:14:30.675]  [2m 811[0m |   const handleRatingChange = async (cortoId, newRating) => {
[20:14:30.675]  [2m 812[0m |     if (!isAuthenticated || !user) {
[20:14:30.675]  [2m 813[0m |       console.error('Utente non autenticato');
[20:14:30.676]  [2m 814[0m |       return;
[20:14:30.676]  [2m 815[0m |     }
[20:14:30.676]  [2m 816[0m | 
[20:14:30.676]  [2m 817[0m |     // Aggiorna immediatamente l'UI
[20:14:30.676]  [2m 818[0m |     const newRatings = { ...ratings, [cortoId]: newRating };
[20:14:30.677]  [2m 819[0m |     setRatings(newRatings);
[20:14:30.677]  [2m 820[0m |     
[20:14:30.677]  [2m 821[0m |     // Indica che stiamo salvando questo voto
[20:14:30.677]  [2m 822[0m |     setSavingVotes(prev => new Set([...prev, cortoId]));
[20:14:30.677]  [2m 823[0m |     
[20:14:30.678]  [2m 824[0m |     try {
[20:14:30.678]  [2m 825[0m |       // Ottieni il token di sessione
[20:14:30.678]  [2m 826[0m |       const { data: { session } } = await supabase.auth.getSession();
[20:14:30.678]  [2m 827[0m |       if (!session?.access_token) {
[20:14:30.679]  [2m 828[0m |         throw new Error('Token di sessione non disponibile');
[20:14:30.679]  [2m 829[0m |       }
[20:14:30.679]  [2m 830[0m | 
[20:14:30.679]  [2m 831[0m |       // Salva tramite API
[20:14:30.679]  [2m 832[0m |       await saveVoteToAPI(session.access_token, cortoId, newRating);
[20:14:30.680]  [2m 833[0m |       
[20:14:30.680]  [2m 834[0m |       // Salva anche nel localStorage come backup
[20:14:30.680]  [2m 835[0m |       localStorage.setItem('movieboli-ratings', JSON.stringify(newRatings));
[20:14:30.680]  [2m 836[0m |       
[20:14:30.681]  [2m 837[0m |       // Mostra messaggio di conferma
[20:14:30.681]  [2m 838[0m |       setShowThankYou(cortoId);
[20:14:30.681]  [2m 839[0m |       setTimeout(() => {
[20:14:30.681]  [2m 840[0m |         setShowThankYou(null);
[20:14:30.682]  [2m 841[0m |       }, 2000);
[20:14:30.682]  [2m 842[0m |     } catch (error) {
[20:14:30.682]  [2m 843[0m |       console.error('Errore nel salvare il voto:', error);
[20:14:30.682]  [2m 844[0m |       // In caso di errore, ripristina il voto precedente
[20:14:30.682]  [2m 845[0m |       setRatings(ratings);
[20:14:30.683]  [2m 846[0m |     } finally {
[20:14:30.683]  [2m 847[0m |       // Rimuovi l'indicatore di salvataggio
[20:14:30.683]  [2m 848[0m |       setSavingVotes(prev => {
[20:14:30.683]  [2m 849[0m |         const newSet = new Set(prev);
[20:14:30.683]  [2m 850[0m |         newSet.delete(cortoId);
[20:14:30.684]  [2m 851[0m |         return newSet;
[20:14:30.684]  [2m 852[0m |       });
[20:14:30.684]  [2m 853[0m |     }
[20:14:30.684]  [2m 854[0m |   };
[20:14:30.685]  [2m 855[0m | 
[20:14:30.685]  [2m 856[0m |   // Ottiene il rating per un cortometraggio
[20:14:30.685]  [2m 857[0m |   const getRating = (cortoId) => {
[20:14:30.685]  [2m 858[0m |     return ratings[cortoId] || 0
[20:14:30.686]  [2m 859[0m |   }
[20:14:30.686]  [2m 860[0m | 
[20:14:30.686]  [2m 861[0m |   const containerVariants = {
[20:14:30.686]  [2m 862[0m |     hidden: { opacity: 0 },
[20:14:30.686]  [2m 863[0m |     visible: {
[20:14:30.687]  [2m 864[0m |       opacity: 1,
[20:14:30.687]  [2m 865[0m |       transition: {
[20:14:30.687]  [2m 866[0m |         staggerChildren: 0.1
[20:14:30.687]  [2m 867[0m |       }
[20:14:30.688]  [2m 868[0m |     }
[20:14:30.688]  [2m 869[0m |   }
[20:14:30.688]  [2m 870[0m | 
[20:14:30.688]  [2m 871[0m |   const itemVariants = {
[20:14:30.688]  [2m 872[0m |     hidden: { opacity: 0, y: 30 },
[20:14:30.689]  [2m 873[0m |     visible: {
[20:14:30.689]  [2m 874[0m |       opacity: 1,
[20:14:30.689]  [2m 875[0m |       y: 0,
[20:14:30.689]  [2m 876[0m |       transition: {
[20:14:30.690]  [2m 877[0m |         duration: 0.6,
[20:14:30.690]  [2m 878[0m |         ease: "easeOut"
[20:14:30.690]  [2m 879[0m |       }
[20:14:30.690]  [2m 880[0m |     }
[20:14:30.691]  [2m 881[0m |   }
[20:14:30.691]  [2m 882[0m | 
[20:14:30.691]  [2m 883[0m |   const cardVariants = {
[20:14:30.691]  [2m 884[0m |     hidden: { opacity: 0, scale: 0.9 },
[20:14:30.692]  [2m 885[0m |     visible: {
[20:14:30.692]  [2m 886[0m |       opacity: 1,
[20:14:30.692]  [2m 887[0m |       scale: 1,
[20:14:30.692]  [2m 888[0m |       transition: {
[20:14:30.693]  [2m 889[0m |         duration: 0.5,
[20:14:30.693]  [2m 890[0m |         ease: "easeOut"
[20:14:30.694]  [2m 891[0m |       }
[20:14:30.694]  [2m 892[0m |     },
[20:14:30.694]  [2m 893[0m |     hover: {
[20:14:30.694]  [2m 894[0m |       scale: 1.03,
[20:14:30.695]  [2m 895[0m |       transition: {
[20:14:30.695]  [2m 896[0m |         duration: 0.3,
[20:14:30.695]  [2m 897[0m |         ease: "easeInOut"
[20:14:30.695]  [2m 898[0m |       }
[20:14:30.696]  [2m 899[0m |     }
[20:14:30.696]  [2m 900[0m |   }
[20:14:30.696]  [2m 901[0m | 
[20:14:30.696]  [2m 902[0m |   return (
[20:14:30.696]  [2m 903[0m |     <ProtectedRoute>
[20:14:30.697]  [2m 904[0m |       <Head>
[20:14:30.697]  [2m 905[0m |         <title>
[20:14:30.697]  [2m 906[0m |           <EditableText 
[20:14:30.698]  [2m 907[0m |             contentKey="vote.meta.title"
[20:14:30.698]  [2m 908[0m |             defaultValue="Vota i Cortometraggi | MOVIEBOLI Festival"
[20:14:30.698]  [2m 909[0m |             tag="span"
[20:14:30.698]  [2m 910[0m |           />
[20:14:30.698]  [2m 911[0m |         </title>
[20:14:30.699]  [2m 912[0m |         <meta name="description" content={
[20:14:30.699]  [2m 913[0m |           getContent('vote.meta.description', 'Esprimi il tuo voto per i cortometraggi in concorso al MOVIEBOLI Festival')
[20:14:30.699]  [2m 914[0m |         } />
[20:14:30.699]  [2m 915[0m |         <meta property="og:title" content="Vota i Cortometraggi | MOVIEBOLI Festival" />
[20:14:30.700]  [2m 916[0m |         <meta property="og:description" content="Partecipa alla giuria popolare del festival." />
[20:14:30.700]  [2m 917[0m |         <meta property="og:image" content="/images/og-image.jpg" />
[20:14:30.700]  [2m 918[0m |       </Head>
[20:14:30.700]  [2m 919[0m |       
[20:14:30.700]  [2m 920[0m |       {/* Navbar Festival Standardizzata */}
[20:14:30.701]  [2m 921[0m |       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
[20:14:30.701]  [2m 922[0m |         isScrolled ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
[20:14:30.701]  [2m 923[0m |       }`}>
[20:14:30.701]  [2m 924[0m |         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
[20:14:30.702]  [2m 925[0m |           <div className="flex justify-between items-center py-4">
[20:14:30.702]  [2m 926[0m |             <Link href="/" className="flex items-center space-x-3 group">
[20:14:30.702]  [2m 927[0m |               <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
[20:14:30.702]  [2m 928[0m |                 <Image
[20:14:30.703]  [2m 929[0m |                   src="/logo-movieboli.png"
[20:14:30.703]  [2m 930[0m |                   alt="MOVIEBOLI Logo"
[20:14:30.703]  [2m 931[0m |                   fill
[20:14:30.703]  [2m 932[0m |                   className="object-contain filter brightness-0 invert"
[20:14:30.704]  [2m 933[0m |                   priority
[20:14:30.704]  [2m 934[0m |                 />
[20:14:30.704]  [2m 935[0m |               </div>
[20:14:30.704]  [2m 936[0m |               <span className="font-poppins font-semibold text-xl text-movieboli-violaPrincipale">
[20:14:30.705]  [2m 937[0m |                 <EditableText 
[20:14:30.705]  [2m 938[0m |                   contentKey="festival.nav.title"
[20:14:30.705]  [2m 939[0m |                   defaultValue="FESTIVAL 2025"
[20:14:30.705]  [2m 940[0m |                   tag="span"
[20:14:30.705]  [2m 941[0m |                 />
[20:14:30.706]  [2m 942[0m |               </span>
[20:14:30.706]  [2m 943[0m |             </Link>
[20:14:30.706]  [2m 944[0m |             <div className="hidden md:flex space-x-8">
[20:14:30.706]  [2m 945[0m |               <Link href="/festival/programma" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.707]  [2m 946[0m |                 <EditableText 
[20:14:30.707]  [2m 947[0m |                   contentKey="nav.program"
[20:14:30.707]  [2m 948[0m |                   defaultValue="Programma"
[20:14:30.707]  [2m 949[0m |                   tag="span"
[20:14:30.708]  [2m 950[0m |                 />
[20:14:30.708]  [2m 951[0m |               </Link>
[20:14:30.708]  [2m 952[0m |               <Link href="/festival/cortometraggi" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.708]  [2m 953[0m |                 <EditableText 
[20:14:30.709]  [2m 954[0m |                   contentKey="festival.nav.shorts"
[20:14:30.709]  [2m 955[0m |                   defaultValue="Cortometraggi"
[20:14:30.709]  [2m 956[0m |                   tag="span"
[20:14:30.709]  [2m 957[0m |                 />
[20:14:30.709]  [2m 958[0m |               </Link>
[20:14:30.710]  [2m 959[0m |               <Link href="/festival/film" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.710]  [2m 960[0m |                 <EditableText 
[20:14:30.710]  [2m 961[0m |                   contentKey="festival.nav.films"
[20:14:30.710]  [2m 962[0m |                   defaultValue="Film"
[20:14:30.710]  [2m 963[0m |                   tag="span"
[20:14:30.710]  [2m 964[0m |                 />
[20:14:30.711]  [2m 965[0m |               </Link>
[20:14:30.711]  [2m 966[0m |               <Link href="/festival/ospiti" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.711]  [2m 967[0m |                 <EditableText 
[20:14:30.711]  [2m 968[0m |                   contentKey="festival.nav.guests"
[20:14:30.712]  [2m 969[0m |                   defaultValue="Ospiti"
[20:14:30.712]  [2m 970[0m |                   tag="span"
[20:14:30.712]  [2m 971[0m |                 />
[20:14:30.712]  [2m 972[0m |               </Link>
[20:14:30.712]  [2m 973[0m |               <Link href="/festival/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.713]  [2m 974[0m |                 <EditableText 
[20:14:30.713]  [2m 975[0m |                   contentKey="festival.nav.vote"
[20:14:30.713]  [2m 976[0m |                   defaultValue="Vota"
[20:14:30.713]  [2m 977[0m |                   tag="span"
[20:14:30.714]  [2m 978[0m |                 />
[20:14:30.714]  [2m 979[0m |               </Link>
[20:14:30.714]  [2m 980[0m |               <Link href="/festival/contest_artistico/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.714]  [2m 981[0m |                 <EditableText 
[20:14:30.714]  [2m 982[0m |                   contentKey="festival.nav.contest"
[20:14:30.715]  [2m 983[0m |                   defaultValue="Contest"
[20:14:30.715]  [2m 984[0m |                   tag="span"
[20:14:30.715]  [2m 985[0m |                 />
[20:14:30.715]  [2m 986[0m |               </Link>
[20:14:30.716]  [2m 987[0m |               <Link href="/chi-siamo" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.716]  [2m 988[0m |                 <EditableText 
[20:14:30.716]  [2m 989[0m |                   contentKey="nav.about"
[20:14:30.716]  [2m 990[0m |                   defaultValue="Info"
[20:14:30.716]  [2m 991[0m |                   tag="span"
[20:14:30.717]  [2m 992[0m |                 />
[20:14:30.717]  [2m 993[0m |               </Link>
[20:14:30.717]  [2m 994[0m |             </div>
[20:14:30.717]  [2m 995[0m |           </div>
[20:14:30.718]  [2m 996[0m |         </div>
[20:14:30.718]  [2m 997[0m |       </nav>
[20:14:30.718]  [2m 998[0m | 
[20:14:30.718]  [2m 999[0m |       {/* Contenuto principale con padding-top per compensare navbar fissa */}
[20:14:30.718]  [2m1000[0m |       <main className="min-h-screen bg-movieboli-neroProfondo text-movieboli-crema pt-20">
[20:14:30.719]  [2m1001[0m |         {pageLoading && (
[20:14:30.719]  [2m1002[0m |           <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-neroProfondo">
[20:14:30.719]  [2m1003[0m |             <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
[20:14:30.719]  [2m1004[0m |               <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
[20:14:30.720]  [2m1005[0m |               <h2 className="text-xl sm:text-2xl font-bold text-movieboli-crema">MOVIEBOLI Festival 2025</h2>
[20:14:30.720]  [2m1006[0m |               <p className="text-sm sm:text-base text-movieboli-crema/80">
[20:14:30.720]  [2m1007[0m |                 <EditableText 
[20:14:30.720]  [2m1008[0m |                   contentKey="vote.loading"
[20:14:30.720]  [2m1009[0m |                   defaultValue="Caricamento sistema di votazione..."
[20:14:30.721]  [2m1010[0m |                   tag="span"
[20:14:30.721]  [2m1011[0m |                 />
[20:14:30.721]  [2m1012[0m |               </p>
[20:14:30.721]  [2m1013[0m |             </div>
[20:14:30.721]  [2m1014[0m |           </div>
[20:14:30.722]  [2m1015[0m |         )}
[20:14:30.722]  [2m1016[0m | 
[20:14:30.722]  [2m1017[0m |         {/* Messaggio di errore */}
[20:14:30.722]  [2m1018[0m |         {error && (
[20:14:30.723]  [2m1019[0m |             <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-md mx-auto my-4 max-w-4xl">
[20:14:30.723]  [2m1020[0m |               <div className="flex items-center">
[20:14:30.723]  [2m1021[0m |                 <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.723]  [2m1022[0m |                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
[20:14:30.724]  [2m1023[0m |                 </svg>
[20:14:30.724]  [2m1024[0m |                 <p>{error}</p>
[20:14:30.724]  [2m1025[0m |               </div>
[20:14:30.724]  [2m1026[0m |             </div>
[20:14:30.725]  [2m1027[0m |           )}
[20:14:30.725]  [2m1028[0m |           
[20:14:30.725]  [2m1029[0m |           {/* Hero Section */}
[20:14:30.725]  [2m1030[0m |           <section className="relative overflow-hidden">
[20:14:30.726]  [2m1031[0m |             <div className="absolute inset-0 overflow-hidden">
[20:14:30.726]  [2m1032[0m |               <div className="absolute inset-0 bg-movieboli-neroProfondo opacity-90"></div>
[20:14:30.726]  [2m1033[0m |               <div className="absolute inset-0 bg-[url('/logo-movieboli.png')] opacity-5"></div>
[20:14:30.726]  [2m1034[0m |             </div>
[20:14:30.726]  [2m1035[0m |             
[20:14:30.727]  [2m1036[0m |             <div className="container mx-auto px-4 py-20 relative z-10">
[20:14:30.727]  [2m1037[0m |               <motion.div
[20:14:30.727]  [2m1038[0m |                 initial={{ opacity: 0 }}
[20:14:30.727]  [2m1039[0m |                 animate={{ opacity: 1 }}
[20:14:30.728]  [2m1040[0m |                 transition={{ duration: 0.3 }}
[20:14:30.728]  [2m1041[0m |                 className="text-center max-w-4xl mx-auto"
[20:14:30.728]  [2m1042[0m |               >
[20:14:30.728]  [2m1043[0m |                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-movieboli-rosaPastello via-movieboli-violaPrincipale to-movieboli-violaSecondario drop-shadow-lg tracking-tight leading-tight">
[20:14:30.729]  [2m1044[0m |                   <EditableText 
[20:14:30.729]  [2m1045[0m |                     contentKey="vote.title"
[20:14:30.729]  [2m1046[0m |                     defaultValue="Vota i Cortometraggi del Festival 2025"
[20:14:30.729]  [2m1047[0m |                     tag="span"
[20:14:30.729]  [2m1048[0m |                   />
[20:14:30.730]  [2m1049[0m |                 </h1>
[20:14:30.730]  [2m1050[0m |                 <p className="text-lg md:text-xl text-movieboli-crema/80 mb-10 max-w-3xl mx-auto">
[20:14:30.730]  [2m1051[0m |                   <EditableText 
[20:14:30.730]  [2m1052[0m |                     contentKey="vote.subtitle"
[20:14:30.730]  [2m1053[0m |                     defaultValue="Esprimi il tuo giudizio sui cortometraggi in competizione utilizzando il nostro sistema di rating a stelle. Puoi votare e modificare i tuoi voti in qualsiasi momento."
[20:14:30.730]  [2m1054[0m |                     tag="span"
[20:14:30.731]  [2m1055[0m |                   />
[20:14:30.731]  [2m1056[0m |                 </p>
[20:14:30.731]  [2m1057[0m |                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-movieboli-crema/70 mb-8">
[20:14:30.731]  [2m1058[0m |                   <div className="flex items-center gap-2">
[20:14:30.732]  [2m1059[0m |                     <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
[20:14:30.732]  [2m1060[0m |                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
[20:14:30.732]  [2m1061[0m |                     </svg>
[20:14:30.733]  [2m1062[0m |                     <span>
[20:14:30.733]  [2m1063[0m |                       <EditableText 
[20:14:30.734]  [2m1064[0m |                         contentKey="vote.rating_system"
[20:14:30.734]  [2m1065[0m |                         defaultValue="Sistema di rating a 5 stelle con mezze stelle"
[20:14:30.734]  [2m1066[0m |                         tag="span"
[20:14:30.734]  [2m1067[0m |                       />
[20:14:30.734]  [2m1068[0m |                     </span>
[20:14:30.735]  [2m1069[0m |                   </div>
[20:14:30.735]  [2m1070[0m |                   <div className="flex items-center gap-2">
[20:14:30.735]  [2m1071[0m |                     <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
[20:14:30.735]  [2m1072[0m |                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
[20:14:30.736]  [2m1073[0m |                     </svg>
[20:14:30.736]  [2m1074[0m |                     <span>
[20:14:30.736]  [2m1075[0m |                       <EditableText 
[20:14:30.736]  [2m1076[0m |                         contentKey="vote.rating_system"
[20:14:30.736]  [2m1077[0m |                         defaultValue="Sistema di rating a 5 stelle con mezze stelle"
[20:14:30.737]  [2m1078[0m |                         tag="span"
[20:14:30.737]  [2m1079[0m |                       />
[20:14:30.737]  [2m1080[0m |                     </span>
[20:14:30.737]  [2m1081[0m |                   </div>
[20:14:30.738]  [2m1082[0m |                 </div>
[20:14:30.738]  [2m1083[0m |                 <Link href="/festival" legacyBehavior passHref>
[20:14:30.738]  [2m1084[0m |                   <motion.a
[20:14:30.738]  [2m1085[0m |                     className="inline-flex items-center px-6 py-3 rounded-xl bg-movieboli-violaPrincipale text-movieboli-nero font-bold transition-all duration-300"
[20:14:30.738]  [2m1086[0m |                     whileTap={{ scale: 0.95 }}
[20:14:30.739]  [2m1087[0m |                   >
[20:14:30.739]  [2m1088[0m |                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.739]  [2m1089[0m |                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
[20:14:30.739]  [2m1090[0m |                     </svg>
[20:14:30.740]  [2m1091[0m |                     <EditableText 
[20:14:30.740]  [2m1092[0m |                       contentKey="vote.back_to_festival"
[20:14:30.740]  [2m1093[0m |                       defaultValue="Torna al Festival"
[20:14:30.740]  [2m1094[0m |                       tag="span"
[20:14:30.740]  [2m1095[0m |                     />
[20:14:30.740]  [2m1096[0m |                   </motion.a>
[20:14:30.741]  [2m1097[0m |                 </Link>
[20:14:30.741]  [2m1098[0m |               </motion.div>
[20:14:30.741]  [2m1099[0m |             </div>
[20:14:30.741]  [2m1100[0m |           </section>
[20:14:30.742]  [2m1101[0m | 
[20:14:30.742]  [2m1102[0m |           {/* Sezione Cortometraggi */}
[20:14:30.742]  [2m1103[0m |           <motion.section 
[20:14:30.742]  [2m1104[0m |             className="py-20 px-4 bg-gradient-to-b from-movieboli-neroProfondo via-movieboli-bordeaux/5 to-movieboli-neroProfondo"
[20:14:30.742]  [2m1105[0m |             variants={containerVariants}
[20:14:30.743]  [2m1106[0m |             initial="hidden"
[20:14:30.743]  [2m1107[0m |             whileInView="visible"
[20:14:30.743]  [2m1108[0m |             viewport={{ once: true, margin: "-100px" }}
[20:14:30.743]  [2m1109[0m |           >
[20:14:30.743]  [2m1110[0m |             <div className="max-w-7xl mx-auto">
[20:14:30.744]  [2m1111[0m |               <motion.div 
[20:14:30.744]  [2m1112[0m |                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
[20:14:30.744]  [2m1113[0m |                 variants={containerVariants}
[20:14:30.744]  [2m1114[0m |               >
[20:14:30.745]  [2m1115[0m |                 {cortometraggi.map((corto, index) => {
[20:14:30.745]  [2m1116[0m |                   const cortoId = corto.id || corto.titolo || `corto-${index}`
[20:14:30.745]  [2m1117[0m |                   const currentRating = getRating(cortoId)
[20:14:30.745]  [2m1118[0m |                   const showingThankYou = showThankYou === cortoId
[20:14:30.745]  [2m1119[0m |                   
[20:14:30.746]  [2m1120[0m |                   return (
[20:14:30.746]  [2m1121[0m |                     <motion.div
[20:14:30.746]  [2m1122[0m |                       key={cortoId}
[20:14:30.746]  [2m1123[0m |                       className="group bg-movieboli-bordeaux/20 rounded-2xl overflow-hidden border border-movieboli-violaPrincipale/20 hover:border-movieboli-violaPrincipale/50 transition-all duration-300 relative"
[20:14:30.747]  [2m1124[0m |                       variants={cardVariants}
[20:14:30.747]  [2m1125[0m |                       initial="hidden"
[20:14:30.747]  [2m1126[0m |                       whileInView="visible"
[20:14:30.747]  [2m1127[0m |                       whileHover="hover"
[20:14:30.747]  [2m1128[0m |                       viewport={{ once: true }}
[20:14:30.748]  [2m1129[0m |                     >
[20:14:30.748]  [2m1130[0m |                       {/* Badge In Gara */}
[20:14:30.748]  [2m1131[0m |                       <div className="absolute top-4 left-4 z-10">
[20:14:30.748]  [2m1132[0m |                         <span className="bg-movieboli-violaPrincipale text-movieboli-nero text-xs font-bold px-3 py-1 rounded-full">
[20:14:30.749]  [2m1133[0m |                           FESTIVAL 2025
[20:14:30.749]  [2m1134[0m |                         </span>
[20:14:30.749]  [2m1135[0m |                       </div>
[20:14:30.749]  [2m1136[0m | 
[20:14:30.749]  [2m1137[0m |                       {/* Messaggio Thank You */}
[20:14:30.750]  [2m1138[0m |                       <AnimatePresence>
[20:14:30.750]  [2m1139[0m |                         {showingThankYou && (
[20:14:30.750]  [2m1140[0m |                           <motion.div 
[20:14:30.750]  [2m1141[0m |                             className="absolute inset-0 bg-movieboli-violaPrincipale/95 flex items-center justify-center z-20 rounded-2xl"
[20:14:30.751]  [2m1142[0m |                             initial={{ opacity: 0, scale: 0.8 }}
[20:14:30.751]  [2m1143[0m |                             animate={{ opacity: 1, scale: 1 }}
[20:14:30.751]  [2m1144[0m |                             exit={{ opacity: 0, scale: 0.8 }}
[20:14:30.751]  [2m1145[0m |                             transition={{ duration: 0.3 }}
[20:14:30.752]  [2m1146[0m |                           >
[20:14:30.752]  [2m1147[0m |                             <div className="text-center text-movieboli-nero">
[20:14:30.752]  [2m1148[0m |                               <motion.div
[20:14:30.752]  [2m1149[0m |                                 initial={{ scale: 0 }}
[20:14:30.753]  [2m1150[0m |                                 animate={{ scale: 1 }}
[20:14:30.753]  [2m1151[0m |                                 transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
[20:14:30.753]  [2m1152[0m |                               >
[20:14:30.753]  [2m1153[0m |                                 <div className="w-16 h-16 bg-movieboli-crema rounded-full flex items-center justify-center mx-auto mb-4">
[20:14:30.753]  [2m1154[0m |                                   <svg className="w-6 h-6 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.754]  [2m1155[0m |                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
[20:14:30.754]  [2m1156[0m |                                   </svg>
[20:14:30.754]  [2m1157[0m |                                 </div>
[20:14:30.754]  [2m1158[0m |                               </motion.div>
[20:14:30.755]  [2m1159[0m |                               <h3 className="text-xl font-bold mb-2">
[20:14:30.755]  [2m1160[0m |                                 <EditableText 
[20:14:30.755]  [2m1161[0m |                                   contentKey="vote.success_title"
[20:14:30.755]  [2m1162[0m |                                   defaultValue="Voto registrato!"
[20:14:30.756]  [2m1163[0m |                                   tag="span"
[20:14:30.756]  [2m1164[0m |                                 />
[20:14:30.756]  [2m1165[0m |                               </h3>
[20:14:30.756]  [2m1166[0m |                               <p className="text-sm opacity-80">
[20:14:30.756]  [2m1167[0m |                                 <EditableText 
[20:14:30.757]  [2m1168[0m |                                   contentKey="vote.success_message"
[20:14:30.757]  [2m1169[0m |                                   defaultValue="Grazie per la tua valutazione"
[20:14:30.758]  [2m1170[0m |                                   tag="span"
[20:14:30.758]  [2m1171[0m |                                 />
[20:14:30.758]  [2m1172[0m |                               </p>
[20:14:30.758]  [2m1173[0m |                             </div>
[20:14:30.758]  [2m1174[0m |                           </motion.div>
[20:14:30.759]  [2m1175[0m |                         )}
[20:14:30.759]  [2m1176[0m |                       </AnimatePresence>
[20:14:30.759]  [2m1177[0m | 
[20:14:30.759]  [2m1178[0m |                       {/* Immagine del Cortometraggio */}
[20:14:30.760]  [2m1179[0m |                       <div className="relative aspect-[3/4] overflow-hidden">
[20:14:30.760]  [2m1180[0m |                         {corto.immagine ? (
[20:14:30.760]  [2m1181[0m |                           <img 
[20:14:30.760]  [2m1182[0m |                             src={corto.immagine} 
[20:14:30.760]  [2m1183[0m |                             alt={`Poster di ${corto.titolo}`}
[20:14:30.760]  [2m1184[0m |                             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
[20:14:30.761]  [2m1185[0m |                             onError={(e) => {
[20:14:30.761]  [2m1186[0m |                               e.target.style.display = 'none'
[20:14:30.761]  [2m1187[0m |                               e.target.nextSibling.style.display = 'flex'
[20:14:30.761]  [2m1188[0m |                             }}
[20:14:30.762]  [2m1189[0m |                           />
[20:14:30.762]  [2m1190[0m |                         ) : null}
[20:14:30.762]  [2m1191[0m |                         <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center" style={{ display: corto.immagine ? 'none' : 'flex' }}>
[20:14:30.762]  [2m1192[0m |                           <div className="text-center text-movieboli-crema/60">
[20:14:30.763]  [2m1193[0m |                             <div className="w-16 h-16 mx-auto mb-3 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center">
[20:14:30.763]  [2m1194[0m |                               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
[20:14:30.763]  [2m1195[0m |                                 <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
[20:14:30.763]  [2m1196[0m |                               </svg>
[20:14:30.764]  [2m1197[0m |                             </div>
[20:14:30.764]  [2m1198[0m |                             <p className="text-sm">Poster del Film</p>
[20:14:30.764]  [2m1199[0m |                           </div>
[20:14:30.764]  [2m1200[0m |                         </div>
[20:14:30.765]  [2m1201[0m |                         <div className="absolute inset-0 bg-gradient-to-t from-movieboli-neroProfondo/80 via-transparent to-transparent" />
[20:14:30.765]  [2m1202[0m |                       </div>
[20:14:30.765]  [2m1203[0m | 
[20:14:30.765]  [2m1204[0m |                       {/* Contenuto Card */}
[20:14:30.766]  [2m1205[0m |                       <div className="p-6">
[20:14:30.766]  [2m1206[0m |                         <h3 className="text-xl font-bold mb-2 text-movieboli-crema group-hover:text-movieboli-violaPrincipale transition-colors duration-200">
[20:14:30.766]  [2m1207[0m |                           {corto.titolo}
[20:14:30.766]  [2m1208[0m |                         </h3>
[20:14:30.766]  [2m1209[0m |                         <p className="text-movieboli-crema/70 mb-3">
[20:14:30.767]  [2m1210[0m |                           Regia di {corto.regista}
[20:14:30.767]  [2m1211[0m |                         </p>
[20:14:30.767]  [2m1212[0m |                         <div className="flex justify-between items-center text-sm text-movieboli-crema/60 mb-4">
[20:14:30.767]  [2m1213[0m |                           <span>{corto.durata}</span>
[20:14:30.768]  [2m1214[0m |                           {corto.anno && <span>{corto.anno}</span>}
[20:14:30.768]  [2m1215[0m |                         </div>
[20:14:30.768]  [2m1216[0m |                         <p className="text-movieboli-crema/80 text-sm mb-6 line-clamp-3">
[20:14:30.768]  [2m1217[0m |                           {corto.sinossi}
[20:14:30.768]  [2m1218[0m |                         </p>
[20:14:30.769]  [2m1219[0m |                         
[20:14:30.769]  [2m1220[0m |                         {/* Sistema di Rating con Stelle */}
[20:14:30.769]  [2m1221[0m |                         <div className="mb-4">
[20:14:30.769]  [2m1222[0m |                           <div className="flex items-center justify-between mb-2">
[20:14:30.770]  [2m1223[0m |                             <span className="text-sm font-medium text-movieboli-crema/80">
[20:14:30.770]  [2m1224[0m |                               {currentRating > 0 ? `La tua valutazione: ${currentRating}/10` : 
[20:14:30.770]  [2m1225[0m |                                 getContent('vote.rating.label', 'Valuta questo cortometraggio')
[20:14:30.770]  [2m1226[0m |                               }
[20:14:30.770]  [2m1227[0m |                             </span>
[20:14:30.770]  [2m1228[0m |                             {currentRating > 0 && (
[20:14:30.771]  [2m1229[0m |                                <button
[20:14:30.771]  [2m1230[0m |                                  onClick={() => handleRatingChange(cortoId, 0)}
[20:14:30.771]  [2m1231[0m |                                  className="text-xs text-movieboli-crema/60 hover:text-movieboli-violaPrincipale transition-colors"
[20:14:30.771]  [2m1232[0m |                                >
[20:14:30.772]  [2m1233[0m |                                  <EditableText 
[20:14:30.772]  [2m1234[0m |                                    contentKey="vote.remove_vote"
[20:14:30.772]  [2m1235[0m |                                    defaultValue="Rimuovi voto"
[20:14:30.772]  [2m1236[0m |                                    tag="span"
[20:14:30.772]  [2m1237[0m |                                  />
[20:14:30.773]  [2m1238[0m |                                </button>
[20:14:30.773]  [2m1239[0m |                              )}
[20:14:30.773]  [2m1240[0m |                           </div>
[20:14:30.773]  [2m1241[0m |                           <StarRating 
[20:14:30.774]  [2m1242[0m |                              rating={currentRating}
[20:14:30.774]  [2m1243[0m |                              onRatingChange={(rating) => handleRatingChange(cortoId, rating)}
[20:14:30.774]  [2m1244[0m |                              isSaving={savingVotes.has(cortoId)}
[20:14:30.775]  [2m1245[0m |                            />
[20:14:30.775]  [2m1246[0m |                         </div>
[20:14:30.775]  [2m1247[0m |                         
[20:14:30.775]  [2m1248[0m |                         {/* Link al Trailer se disponibile */}
[20:14:30.775]  [2m1249[0m |                         {(corto.trailer || corto.link) && (
[20:14:30.776]  [2m1250[0m |                           <motion.a
[20:14:30.776]  [2m1251[0m |                             href={corto.trailer || corto.link}
[20:14:30.776]  [2m1252[0m |                             target="_blank"
[20:14:30.776]  [2m1253[0m |                             rel="noopener noreferrer"
[20:14:30.776]  [2m1254[0m |                             className="w-full py-2 px-4 rounded-xl border border-movieboli-violaPrincipale/50 text-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
[20:14:30.776]  [2m1255[0m |                             whileHover={{ scale: 1.02 }}
[20:14:30.776]  [2m1256[0m |                             whileTap={{ scale: 0.98 }}
[20:14:30.776]  [2m1257[0m |                           >
[20:14:30.776]  [2m1258[0m |                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.776]  [2m1259[0m |                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
[20:14:30.777]  [2m1260[0m |                             </svg>
[20:14:30.777]  [2m1261[0m |                             <span>
[20:14:30.777]  [2m1262[0m |                               <EditableText 
[20:14:30.777]  [2m1263[0m |                                 contentKey="vote.watch_trailer"
[20:14:30.777]  [2m1264[0m |                                 defaultValue="Guarda Trailer"
[20:14:30.777]  [2m1265[0m |                                 tag="span"
[20:14:30.777]  [2m1266[0m |                               />
[20:14:30.777]  [2m1267[0m |                             </span>
[20:14:30.777]  [2m1268[0m |                           </motion.a>
[20:14:30.778]  [2m1269[0m |                         )}
[20:14:30.778]  [2m1270[0m |                       </div>
[20:14:30.778]  [2m1271[0m |                     </motion.div>
[20:14:30.778]  [2m1272[0m |                   )
[20:14:30.778]  [2m1273[0m |                 })}
[20:14:30.778]  [2m1274[0m |               </motion.div>
[20:14:30.778]  [2m1275[0m |             </div>
[20:14:30.778]  [2m1276[0m |           </motion.section>
[20:14:30.778]  [2m1277[0m | 
[20:14:30.779]  [2m1278[0m |           <Footer />
[20:14:30.779]  [2m1279[0m |         </main>
[20:14:30.779]  [2m1280[0m |       </ProtectedRoute>
[20:14:30.779]  [2m1281[0m |     )
[20:14:30.779]  [2m1282[0m | }
[20:14:30.779]  [2m1283[0m | 
[20:14:30.779]  [2m1284[0m | // Funzione per caricare i dati dei cortometraggi dal lato server
[20:14:30.779]  [2m1285[0m | export async function getStaticProps() {
[20:14:30.779]       : [33;1m                      ^^^^^^^|^^^^^^[0m
[20:14:30.779]       :                              [33;1m`-- [33;1m`getStaticProps` redefined here[0m[0m
[20:14:30.779]  [2m1286[0m |   try {
[20:14:30.779]  [2m1287[0m |     const fs = require('fs')
[20:14:30.779]  [2m1288[0m |     const path = require('path')
[20:14:30.780]       `----
[20:14:30.780] 
[20:14:30.780]   [31mx[0m the name `default` is exported multiple times
[20:14:30.780]       ,-[[36;1;4m/vercel/path0/pages/festival/vota.jsx[0m:702:1]
[20:14:30.780]  [2m 702[0m |   }
[20:14:30.780]  [2m 703[0m | }
[20:14:30.780]  [2m 704[0m | 
[20:14:30.780]  [2m 705[0m | export default Vota
[20:14:30.780]       : [31;1m^^^^^^^^^|^^^^^^^^^[0m
[20:14:30.780]       :          [31;1m`-- [31;1mprevious exported here[0m[0m
[20:14:30.780]  [2m 706[0m | 
[20:14:30.780]  [2m 707[0m | // Funzioni per chiamare l'API
[20:14:30.780]  [2m 708[0m | const getUserVotesFromAPI = async (token) => {
[20:14:30.780]  [2m 709[0m |   const response = await fetch('/api/votes', {
[20:14:30.780]  [2m 710[0m |     method: 'GET',
[20:14:30.780]  [2m 711[0m |     headers: {
[20:14:30.780]  [2m 712[0m |       'Authorization': `Bearer ${token}`,
[20:14:30.780]  [2m 713[0m |       'Content-Type': 'application/json'
[20:14:30.780]  [2m 714[0m |     }
[20:14:30.781]  [2m 715[0m |   });
[20:14:30.781]  [2m 716[0m |   
[20:14:30.781]  [2m 717[0m |   if (!response.ok) {
[20:14:30.781]  [2m 718[0m |     throw new Error('Errore nel recupero dei voti');
[20:14:30.781]  [2m 719[0m |   }
[20:14:30.781]  [2m 720[0m |   
[20:14:30.781]  [2m 721[0m |   const data = await response.json();
[20:14:30.781]  [2m 722[0m |   return data.votes;
[20:14:30.781]  [2m 723[0m | };
[20:14:30.781]  [2m 724[0m | 
[20:14:30.781]  [2m 725[0m | const saveVoteToAPI = async (token, filmId, rating) => {
[20:14:30.781]  [2m 726[0m |   const response = await fetch('/api/votes', {
[20:14:30.781]  [2m 727[0m |     method: 'POST',
[20:14:30.781]  [2m 728[0m |     headers: {
[20:14:30.781]  [2m 729[0m |       'Authorization': `Bearer ${token}`,
[20:14:30.781]  [2m 730[0m |       'Content-Type': 'application/json'
[20:14:30.781]  [2m 731[0m |     },
[20:14:30.781]  [2m 732[0m |     body: JSON.stringify({
[20:14:30.781]  [2m 733[0m |       film_id: filmId,
[20:14:30.781]  [2m 734[0m |       rating: rating
[20:14:30.781]  [2m 735[0m |     })
[20:14:30.782]  [2m 736[0m |   });
[20:14:30.782]  [2m 737[0m |   
[20:14:30.782]  [2m 738[0m |   if (!response.ok) {
[20:14:30.782]  [2m 739[0m |     throw new Error('Errore nel salvataggio del voto');
[20:14:30.782]  [2m 740[0m |   }
[20:14:30.782]  [2m 741[0m |   
[20:14:30.782]  [2m 742[0m |   return await response.json();
[20:14:30.782]  [2m 743[0m | };
[20:14:30.782]  [2m 744[0m | 
[20:14:30.782]  [2m 745[0m | const Vota = ({ cortometraggi = [], error = null }) => {
[20:14:30.782]  [2m 746[0m |   const { getContent } = useContent()
[20:14:30.782]  [2m 747[0m |   const { user, isAuthenticated } = useAuth()
[20:14:30.782]  [2m 748[0m |   const [ratings, setRatings] = useState({})
[20:14:30.795]  [2m 749[0m |   const [showThankYou, setShowThankYou] = useState(null)
[20:14:30.796]  [2m 750[0m |   const [pageLoading, setPageLoading] = useState(true)
[20:14:30.796]  [2m 751[0m |   const [savingVotes, setSavingVotes] = useState(new Set())
[20:14:30.796]  [2m 752[0m |   const [isScrolled, setIsScrolled] = useState(false)
[20:14:30.796]  [2m 753[0m | 
[20:14:30.796]  [2m 754[0m |   // Gestione scroll per navbar
[20:14:30.796]  [2m 755[0m |   useEffect(() => {
[20:14:30.797]  [2m 756[0m |     const handleScroll = () => {
[20:14:30.797]  [2m 757[0m |       setIsScrolled(window.scrollY > 100)
[20:14:30.797]  [2m 758[0m |     }
[20:14:30.797]  [2m 759[0m |     window.addEventListener('scroll', handleScroll)
[20:14:30.797]  [2m 760[0m |     return () => window.removeEventListener('scroll', handleScroll)
[20:14:30.797]  [2m 761[0m |   }, [])
[20:14:30.798]  [2m 762[0m | 
[20:14:30.798]  [2m 763[0m |   // Inizializza i dati e termina il caricamento
[20:14:30.801]  [2m 764[0m |   useEffect(() => {
[20:14:30.812]  [2m 765[0m |     if (cortometraggi.length > 0) {
[20:14:30.812]  [2m 766[0m |       setPageLoading(false)
[20:14:30.812]  [2m 767[0m |     } else {
[20:14:30.812]  [2m 768[0m |       const timer = setTimeout(() => {
[20:14:30.813]  [2m 769[0m |         setPageLoading(false)
[20:14:30.813]  [2m 770[0m |       }, 300)
[20:14:30.813]  [2m 771[0m |       return () => clearTimeout(timer)
[20:14:30.813]  [2m 772[0m |     }
[20:14:30.813]  [2m 773[0m |   }, [cortometraggi])
[20:14:30.813]  [2m 774[0m | 
[20:14:30.813]  [2m 775[0m |   // Carica i voti dell'utente dall'API
[20:14:30.813]  [2m 776[0m |   useEffect(() => {
[20:14:30.813]  [2m 777[0m |     const loadUserVotes = async () => {
[20:14:30.813]  [2m 778[0m |       if (isAuthenticated && user) {
[20:14:30.813]  [2m 779[0m |         try {
[20:14:30.813]  [2m 780[0m |           // Ottieni il token di sessione
[20:14:30.813]  [2m 781[0m |           const { data: { session } } = await supabase.auth.getSession();
[20:14:30.813]  [2m 782[0m |           if (!session?.access_token) {
[20:14:30.813]  [2m 783[0m |             throw new Error('Token di sessione non disponibile');
[20:14:30.813]  [2m 784[0m |           }
[20:14:30.813]  [2m 785[0m | 
[20:14:30.813]  [2m 786[0m |           const userVotes = await getUserVotesFromAPI(session.access_token);
[20:14:30.813]  [2m 787[0m |           const votesMap = {};
[20:14:30.813]  [2m 788[0m |           userVotes.forEach(vote => {
[20:14:30.813]  [2m 789[0m |             votesMap[vote.film_id] = vote.rating;
[20:14:30.813]  [2m 790[0m |           });
[20:14:30.813]  [2m 791[0m |           setRatings(votesMap);
[20:14:30.813]  [2m 792[0m |         } catch (error) {
[20:14:30.813]  [2m 793[0m |           console.error('Errore nel caricamento dei voti:', error);
[20:14:30.813]  [2m 794[0m |           // Fallback al localStorage per compatibilità
[20:14:30.813]  [2m 795[0m |           const savedRatings = localStorage.getItem('movieboli-ratings');
[20:14:30.813]  [2m 796[0m |           if (savedRatings) {
[20:14:30.813]  [2m 797[0m |             try {
[20:14:30.813]  [2m 798[0m |               setRatings(JSON.parse(savedRatings));
[20:14:30.813]  [2m 799[0m |             } catch (e) {
[20:14:30.813]  [2m 800[0m |               console.error('Errore nel caricamento dei voti dal localStorage:', e);
[20:14:30.813]  [2m 801[0m |             }
[20:14:30.813]  [2m 802[0m |           }
[20:14:30.813]  [2m 803[0m |         }
[20:14:30.813]  [2m 804[0m |       }
[20:14:30.813]  [2m 805[0m |     };
[20:14:30.813]  [2m 806[0m | 
[20:14:30.813]  [2m 807[0m |     loadUserVotes();
[20:14:30.813]  [2m 808[0m |   }, [isAuthenticated, user]);
[20:14:30.814]  [2m 809[0m | 
[20:14:30.814]  [2m 810[0m |   // Gestisce il cambio di rating per un cortometraggio
[20:14:30.814]  [2m 811[0m |   const handleRatingChange = async (cortoId, newRating) => {
[20:14:30.814]  [2m 812[0m |     if (!isAuthenticated || !user) {
[20:14:30.814]  [2m 813[0m |       console.error('Utente non autenticato');
[20:14:30.814]  [2m 814[0m |       return;
[20:14:30.814]  [2m 815[0m |     }
[20:14:30.814]  [2m 816[0m | 
[20:14:30.814]  [2m 817[0m |     // Aggiorna immediatamente l'UI
[20:14:30.814]  [2m 818[0m |     const newRatings = { ...ratings, [cortoId]: newRating };
[20:14:30.814]  [2m 819[0m |     setRatings(newRatings);
[20:14:30.814]  [2m 820[0m |     
[20:14:30.814]  [2m 821[0m |     // Indica che stiamo salvando questo voto
[20:14:30.814]  [2m 822[0m |     setSavingVotes(prev => new Set([...prev, cortoId]));
[20:14:30.814]  [2m 823[0m |     
[20:14:30.821]  [2m 824[0m |     try {
[20:14:30.821]  [2m 825[0m |       // Ottieni il token di sessione
[20:14:30.821]  [2m 826[0m |       const { data: { session } } = await supabase.auth.getSession();
[20:14:30.821]  [2m 827[0m |       if (!session?.access_token) {
[20:14:30.821]  [2m 828[0m |         throw new Error('Token di sessione non disponibile');
[20:14:30.821]  [2m 829[0m |       }
[20:14:30.821]  [2m 830[0m | 
[20:14:30.822]  [2m 831[0m |       // Salva tramite API
[20:14:30.822]  [2m 832[0m |       await saveVoteToAPI(session.access_token, cortoId, newRating);
[20:14:30.822]  [2m 833[0m |       
[20:14:30.822]  [2m 834[0m |       // Salva anche nel localStorage come backup
[20:14:30.822]  [2m 835[0m |       localStorage.setItem('movieboli-ratings', JSON.stringify(newRatings));
[20:14:30.822]  [2m 836[0m |       
[20:14:30.822]  [2m 837[0m |       // Mostra messaggio di conferma
[20:14:30.822]  [2m 838[0m |       setShowThankYou(cortoId);
[20:14:30.822]  [2m 839[0m |       setTimeout(() => {
[20:14:30.822]  [2m 840[0m |         setShowThankYou(null);
[20:14:30.822]  [2m 841[0m |       }, 2000);
[20:14:30.823]  [2m 842[0m |     } catch (error) {
[20:14:30.824]  [2m 843[0m |       console.error('Errore nel salvare il voto:', error);
[20:14:30.824]  [2m 844[0m |       // In caso di errore, ripristina il voto precedente
[20:14:30.824]  [2m 845[0m |       setRatings(ratings);
[20:14:30.824]  [2m 846[0m |     } finally {
[20:14:30.824]  [2m 847[0m |       // Rimuovi l'indicatore di salvataggio
[20:14:30.824]  [2m 848[0m |       setSavingVotes(prev => {
[20:14:30.824]  [2m 849[0m |         const newSet = new Set(prev);
[20:14:30.824]  [2m 850[0m |         newSet.delete(cortoId);
[20:14:30.824]  [2m 851[0m |         return newSet;
[20:14:30.824]  [2m 852[0m |       });
[20:14:30.824]  [2m 853[0m |     }
[20:14:30.824]  [2m 854[0m |   };
[20:14:30.824]  [2m 855[0m | 
[20:14:30.824]  [2m 856[0m |   // Ottiene il rating per un cortometraggio
[20:14:30.825]  [2m 857[0m |   const getRating = (cortoId) => {
[20:14:30.825]  [2m 858[0m |     return ratings[cortoId] || 0
[20:14:30.825]  [2m 859[0m |   }
[20:14:30.825]  [2m 860[0m | 
[20:14:30.825]  [2m 861[0m |   const containerVariants = {
[20:14:30.825]  [2m 862[0m |     hidden: { opacity: 0 },
[20:14:30.825]  [2m 863[0m |     visible: {
[20:14:30.825]  [2m 864[0m |       opacity: 1,
[20:14:30.825]  [2m 865[0m |       transition: {
[20:14:30.825]  [2m 866[0m |         staggerChildren: 0.1
[20:14:30.825]  [2m 867[0m |       }
[20:14:30.825]  [2m 868[0m |     }
[20:14:30.825]  [2m 869[0m |   }
[20:14:30.825]  [2m 870[0m | 
[20:14:30.825]  [2m 871[0m |   const itemVariants = {
[20:14:30.825]  [2m 872[0m |     hidden: { opacity: 0, y: 30 },
[20:14:30.825]  [2m 873[0m |     visible: {
[20:14:30.825]  [2m 874[0m |       opacity: 1,
[20:14:30.825]  [2m 875[0m |       y: 0,
[20:14:30.826]  [2m 876[0m |       transition: {
[20:14:30.826]  [2m 877[0m |         duration: 0.6,
[20:14:30.826]  [2m 878[0m |         ease: "easeOut"
[20:14:30.826]  [2m 879[0m |       }
[20:14:30.826]  [2m 880[0m |     }
[20:14:30.826]  [2m 881[0m |   }
[20:14:30.826]  [2m 882[0m | 
[20:14:30.826]  [2m 883[0m |   const cardVariants = {
[20:14:30.826]  [2m 884[0m |     hidden: { opacity: 0, scale: 0.9 },
[20:14:30.827]  [2m 885[0m |     visible: {
[20:14:30.828]  [2m 886[0m |       opacity: 1,
[20:14:30.828]  [2m 887[0m |       scale: 1,
[20:14:30.828]  [2m 888[0m |       transition: {
[20:14:30.828]  [2m 889[0m |         duration: 0.5,
[20:14:30.828]  [2m 890[0m |         ease: "easeOut"
[20:14:30.828]  [2m 891[0m |       }
[20:14:30.828]  [2m 892[0m |     },
[20:14:30.828]  [2m 893[0m |     hover: {
[20:14:30.828]  [2m 894[0m |       scale: 1.03,
[20:14:30.828]  [2m 895[0m |       transition: {
[20:14:30.828]  [2m 896[0m |         duration: 0.3,
[20:14:30.828]  [2m 897[0m |         ease: "easeInOut"
[20:14:30.828]  [2m 898[0m |       }
[20:14:30.828]  [2m 899[0m |     }
[20:14:30.828]  [2m 900[0m |   }
[20:14:30.828]  [2m 901[0m | 
[20:14:30.828]  [2m 902[0m |   return (
[20:14:30.828]  [2m 903[0m |     <ProtectedRoute>
[20:14:30.828]  [2m 904[0m |       <Head>
[20:14:30.828]  [2m 905[0m |         <title>
[20:14:30.828]  [2m 906[0m |           <EditableText 
[20:14:30.828]  [2m 907[0m |             contentKey="vote.meta.title"
[20:14:30.828]  [2m 908[0m |             defaultValue="Vota i Cortometraggi | MOVIEBOLI Festival"
[20:14:30.828]  [2m 909[0m |             tag="span"
[20:14:30.828]  [2m 910[0m |           />
[20:14:30.831]  [2m 911[0m |         </title>
[20:14:30.831]  [2m 912[0m |         <meta name="description" content={
[20:14:30.831]  [2m 913[0m |           getContent('vote.meta.description', 'Esprimi il tuo voto per i cortometraggi in concorso al MOVIEBOLI Festival')
[20:14:30.831]  [2m 914[0m |         } />
[20:14:30.831]  [2m 915[0m |         <meta property="og:title" content="Vota i Cortometraggi | MOVIEBOLI Festival" />
[20:14:30.831]  [2m 916[0m |         <meta property="og:description" content="Partecipa alla giuria popolare del festival." />
[20:14:30.831]  [2m 917[0m |         <meta property="og:image" content="/images/og-image.jpg" />
[20:14:30.831]  [2m 918[0m |       </Head>
[20:14:30.831]  [2m 919[0m |       
[20:14:30.831]  [2m 920[0m |       {/* Navbar Festival Standardizzata */}
[20:14:30.831]  [2m 921[0m |       <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
[20:14:30.831]  [2m 922[0m |         isScrolled ? 'bg-movieboli-nero/95 backdrop-blur-md shadow-xl' : 'bg-transparent'
[20:14:30.831]  [2m 923[0m |       }`}>
[20:14:30.831]  [2m 924[0m |         <div className="container mx-auto px-4 sm:px-6 lg:px-8">
[20:14:30.831]  [2m 925[0m |           <div className="flex justify-between items-center py-4">
[20:14:30.831]  [2m 926[0m |             <Link href="/" className="flex items-center space-x-3 group">
[20:14:30.832]  [2m 927[0m |               <div className="relative w-12 h-12 transform group-hover:scale-110 transition-transform duration-300">
[20:14:30.832]  [2m 928[0m |                 <Image
[20:14:30.832]  [2m 929[0m |                   src="/logo-movieboli.png"
[20:14:30.832]  [2m 930[0m |                   alt="MOVIEBOLI Logo"
[20:14:30.832]  [2m 931[0m |                   fill
[20:14:30.832]  [2m 932[0m |                   className="object-contain filter brightness-0 invert"
[20:14:30.832]  [2m 933[0m |                   priority
[20:14:30.832]  [2m 934[0m |                 />
[20:14:30.832]  [2m 935[0m |               </div>
[20:14:30.832]  [2m 936[0m |               <span className="font-poppins font-semibold text-xl text-movieboli-violaPrincipale">
[20:14:30.835]  [2m 937[0m |                 <EditableText 
[20:14:30.835]  [2m 938[0m |                   contentKey="festival.nav.title"
[20:14:30.835]  [2m 939[0m |                   defaultValue="FESTIVAL 2025"
[20:14:30.835]  [2m 940[0m |                   tag="span"
[20:14:30.835]  [2m 941[0m |                 />
[20:14:30.835]  [2m 942[0m |               </span>
[20:14:30.835]  [2m 943[0m |             </Link>
[20:14:30.835]  [2m 944[0m |             <div className="hidden md:flex space-x-8">
[20:14:30.835]  [2m 945[0m |               <Link href="/festival/programma" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.835]  [2m 946[0m |                 <EditableText 
[20:14:30.835]  [2m 947[0m |                   contentKey="nav.program"
[20:14:30.835]  [2m 948[0m |                   defaultValue="Programma"
[20:14:30.835]  [2m 949[0m |                   tag="span"
[20:14:30.835]  [2m 950[0m |                 />
[20:14:30.835]  [2m 951[0m |               </Link>
[20:14:30.835]  [2m 952[0m |               <Link href="/festival/cortometraggi" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.835]  [2m 953[0m |                 <EditableText 
[20:14:30.835]  [2m 954[0m |                   contentKey="festival.nav.shorts"
[20:14:30.836]  [2m 955[0m |                   defaultValue="Cortometraggi"
[20:14:30.836]  [2m 956[0m |                   tag="span"
[20:14:30.837]  [2m 957[0m |                 />
[20:14:30.837]  [2m 958[0m |               </Link>
[20:14:30.837]  [2m 959[0m |               <Link href="/festival/film" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.838]  [2m 960[0m |                 <EditableText 
[20:14:30.838]  [2m 961[0m |                   contentKey="festival.nav.films"
[20:14:30.839]  [2m 962[0m |                   defaultValue="Film"
[20:14:30.839]  [2m 963[0m |                   tag="span"
[20:14:30.839]  [2m 964[0m |                 />
[20:14:30.843]  [2m 965[0m |               </Link>
[20:14:30.843]  [2m 966[0m |               <Link href="/festival/ospiti" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.843]  [2m 967[0m |                 <EditableText 
[20:14:30.843]  [2m 968[0m |                   contentKey="festival.nav.guests"
[20:14:30.844]  [2m 969[0m |                   defaultValue="Ospiti"
[20:14:30.844]  [2m 970[0m |                   tag="span"
[20:14:30.844]  [2m 971[0m |                 />
[20:14:30.845]  [2m 972[0m |               </Link>
[20:14:30.845]  [2m 973[0m |               <Link href="/festival/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.845]  [2m 974[0m |                 <EditableText 
[20:14:30.845]  [2m 975[0m |                   contentKey="festival.nav.vote"
[20:14:30.846]  [2m 976[0m |                   defaultValue="Vota"
[20:14:30.846]  [2m 977[0m |                   tag="span"
[20:14:30.846]  [2m 978[0m |                 />
[20:14:30.846]  [2m 979[0m |               </Link>
[20:14:30.847]  [2m 980[0m |               <Link href="/festival/contest_artistico/vota" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.847]  [2m 981[0m |                 <EditableText 
[20:14:30.847]  [2m 982[0m |                   contentKey="festival.nav.contest"
[20:14:30.848]  [2m 983[0m |                   defaultValue="Contest"
[20:14:30.848]  [2m 984[0m |                   tag="span"
[20:14:30.848]  [2m 985[0m |                 />
[20:14:30.848]  [2m 986[0m |               </Link>
[20:14:30.848]  [2m 987[0m |               <Link href="/chi-siamo" className="font-poppins font-medium text-movieboli-crema hover:text-movieboli-violaPrincipale transition-colors duration-300">
[20:14:30.848]  [2m 988[0m |                 <EditableText 
[20:14:30.848]  [2m 989[0m |                   contentKey="nav.about"
[20:14:30.848]  [2m 990[0m |                   defaultValue="Info"
[20:14:30.848]  [2m 991[0m |                   tag="span"
[20:14:30.848]  [2m 992[0m |                 />
[20:14:30.848]  [2m 993[0m |               </Link>
[20:14:30.848]  [2m 994[0m |             </div>
[20:14:30.848]  [2m 995[0m |           </div>
[20:14:30.848]  [2m 996[0m |         </div>
[20:14:30.848]  [2m 997[0m |       </nav>
[20:14:30.848]  [2m 998[0m | 
[20:14:30.848]  [2m 999[0m |       {/* Contenuto principale con padding-top per compensare navbar fissa */}
[20:14:30.848]  [2m1000[0m |       <main className="min-h-screen bg-movieboli-neroProfondo text-movieboli-crema pt-20">
[20:14:30.848]  [2m1001[0m |         {pageLoading && (
[20:14:30.848]  [2m1002[0m |           <div className="fixed inset-0 z-50 flex items-center justify-center bg-movieboli-neroProfondo">
[20:14:30.848]  [2m1003[0m |             <div className="flex flex-col items-center justify-center space-y-4 sm:space-y-6">
[20:14:30.848]  [2m1004[0m |               <div className="w-12 h-12 sm:w-16 sm:h-16 border-4 border-movieboli-violaPrincipale/50 border-t-movieboli-violaPrincipale rounded-full animate-spin"></div>
[20:14:30.848]  [2m1005[0m |               <h2 className="text-xl sm:text-2xl font-bold text-movieboli-crema">MOVIEBOLI Festival 2025</h2>
[20:14:30.848]  [2m1006[0m |               <p className="text-sm sm:text-base text-movieboli-crema/80">
[20:14:30.848]  [2m1007[0m |                 <EditableText 
[20:14:30.848]  [2m1008[0m |                   contentKey="vote.loading"
[20:14:30.849]  [2m1009[0m |                   defaultValue="Caricamento sistema di votazione..."
[20:14:30.849]  [2m1010[0m |                   tag="span"
[20:14:30.849]  [2m1011[0m |                 />
[20:14:30.849]  [2m1012[0m |               </p>
[20:14:30.849]  [2m1013[0m |             </div>
[20:14:30.849]  [2m1014[0m |           </div>
[20:14:30.849]  [2m1015[0m |         )}
[20:14:30.849]  [2m1016[0m | 
[20:14:30.849]  [2m1017[0m |         {/* Messaggio di errore */}
[20:14:30.849]  [2m1018[0m |         {error && (
[20:14:30.849]  [2m1019[0m |             <div className="bg-red-500/20 border border-red-500 text-white px-4 py-3 rounded-md mx-auto my-4 max-w-4xl">
[20:14:30.849]  [2m1020[0m |               <div className="flex items-center">
[20:14:30.849]  [2m1021[0m |                 <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.849]  [2m1022[0m |                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
[20:14:30.849]  [2m1023[0m |                 </svg>
[20:14:30.849]  [2m1024[0m |                 <p>{error}</p>
[20:14:30.849]  [2m1025[0m |               </div>
[20:14:30.849]  [2m1026[0m |             </div>
[20:14:30.849]  [2m1027[0m |           )}
[20:14:30.849]  [2m1028[0m |           
[20:14:30.849]  [2m1029[0m |           {/* Hero Section */}
[20:14:30.849]  [2m1030[0m |           <section className="relative overflow-hidden">
[20:14:30.849]  [2m1031[0m |             <div className="absolute inset-0 overflow-hidden">
[20:14:30.849]  [2m1032[0m |               <div className="absolute inset-0 bg-movieboli-neroProfondo opacity-90"></div>
[20:14:30.853]  [2m1033[0m |               <div className="absolute inset-0 bg-[url('/logo-movieboli.png')] opacity-5"></div>
[20:14:30.854]  [2m1034[0m |             </div>
[20:14:30.854]  [2m1035[0m |             
[20:14:30.854]  [2m1036[0m |             <div className="container mx-auto px-4 py-20 relative z-10">
[20:14:30.855]  [2m1037[0m |               <motion.div
[20:14:30.855]  [2m1038[0m |                 initial={{ opacity: 0 }}
[20:14:30.855]  [2m1039[0m |                 animate={{ opacity: 1 }}
[20:14:30.855]  [2m1040[0m |                 transition={{ duration: 0.3 }}
[20:14:30.856]  [2m1041[0m |                 className="text-center max-w-4xl mx-auto"
[20:14:30.856]  [2m1042[0m |               >
[20:14:30.856]  [2m1043[0m |                 <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-br from-movieboli-rosaPastello via-movieboli-violaPrincipale to-movieboli-violaSecondario drop-shadow-lg tracking-tight leading-tight">
[20:14:30.856]  [2m1044[0m |                   <EditableText 
[20:14:30.856]  [2m1045[0m |                     contentKey="vote.title"
[20:14:30.857]  [2m1046[0m |                     defaultValue="Vota i Cortometraggi del Festival 2025"
[20:14:30.857]  [2m1047[0m |                     tag="span"
[20:14:30.857]  [2m1048[0m |                   />
[20:14:30.857]  [2m1049[0m |                 </h1>
[20:14:30.858]  [2m1050[0m |                 <p className="text-lg md:text-xl text-movieboli-crema/80 mb-10 max-w-3xl mx-auto">
[20:14:30.858]  [2m1051[0m |                   <EditableText 
[20:14:30.858]  [2m1052[0m |                     contentKey="vote.subtitle"
[20:14:30.858]  [2m1053[0m |                     defaultValue="Esprimi il tuo giudizio sui cortometraggi in competizione utilizzando il nostro sistema di rating a stelle. Puoi votare e modificare i tuoi voti in qualsiasi momento."
[20:14:30.858]  [2m1054[0m |                     tag="span"
[20:14:30.858]  [2m1055[0m |                   />
[20:14:30.858]  [2m1056[0m |                 </p>
[20:14:30.858]  [2m1057[0m |                 <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-movieboli-crema/70 mb-8">
[20:14:30.858]  [2m1058[0m |                   <div className="flex items-center gap-2">
[20:14:30.858]  [2m1059[0m |                     <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
[20:14:30.858]  [2m1060[0m |                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
[20:14:30.858]  [2m1061[0m |                     </svg>
[20:14:30.858]  [2m1062[0m |                     <span>
[20:14:30.858]  [2m1063[0m |                       <EditableText 
[20:14:30.858]  [2m1064[0m |                         contentKey="vote.rating_system"
[20:14:30.859]  [2m1065[0m |                         defaultValue="Sistema di rating a 5 stelle con mezze stelle"
[20:14:30.859]  [2m1066[0m |                         tag="span"
[20:14:30.859]  [2m1067[0m |                       />
[20:14:30.859]  [2m1068[0m |                     </span>
[20:14:30.859]  [2m1069[0m |                   </div>
[20:14:30.859]  [2m1070[0m |                   <div className="flex items-center gap-2">
[20:14:30.859]  [2m1071[0m |                     <svg className="w-5 h-5 text-movieboli-violaPrincipale" fill="currentColor" viewBox="0 0 20 20">
[20:14:30.859]  [2m1072[0m |                       <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
[20:14:30.859]  [2m1073[0m |                     </svg>
[20:14:30.859]  [2m1074[0m |                     <span>
[20:14:30.859]  [2m1075[0m |                       <EditableText 
[20:14:30.859]  [2m1076[0m |                         contentKey="vote.rating_system"
[20:14:30.859]  [2m1077[0m |                         defaultValue="Sistema di rating a 5 stelle con mezze stelle"
[20:14:30.859]  [2m1078[0m |                         tag="span"
[20:14:30.859]  [2m1079[0m |                       />
[20:14:30.859]  [2m1080[0m |                     </span>
[20:14:30.859]  [2m1081[0m |                   </div>
[20:14:30.859]  [2m1082[0m |                 </div>
[20:14:30.859]  [2m1083[0m |                 <Link href="/festival" legacyBehavior passHref>
[20:14:30.859]  [2m1084[0m |                   <motion.a
[20:14:30.859]  [2m1085[0m |                     className="inline-flex items-center px-6 py-3 rounded-xl bg-movieboli-violaPrincipale text-movieboli-nero font-bold transition-all duration-300"
[20:14:30.859]  [2m1086[0m |                     whileTap={{ scale: 0.95 }}
[20:14:30.859]  [2m1087[0m |                   >
[20:14:30.859]  [2m1088[0m |                     <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.859]  [2m1089[0m |                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
[20:14:30.859]  [2m1090[0m |                     </svg>
[20:14:30.859]  [2m1091[0m |                     <EditableText 
[20:14:30.859]  [2m1092[0m |                       contentKey="vote.back_to_festival"
[20:14:30.859]  [2m1093[0m |                       defaultValue="Torna al Festival"
[20:14:30.859]  [2m1094[0m |                       tag="span"
[20:14:30.859]  [2m1095[0m |                     />
[20:14:30.859]  [2m1096[0m |                   </motion.a>
[20:14:30.859]  [2m1097[0m |                 </Link>
[20:14:30.859]  [2m1098[0m |               </motion.div>
[20:14:30.859]  [2m1099[0m |             </div>
[20:14:30.859]  [2m1100[0m |           </section>
[20:14:30.859]  [2m1101[0m | 
[20:14:30.859]  [2m1102[0m |           {/* Sezione Cortometraggi */}
[20:14:30.859]  [2m1103[0m |           <motion.section 
[20:14:30.859]  [2m1104[0m |             className="py-20 px-4 bg-gradient-to-b from-movieboli-neroProfondo via-movieboli-bordeaux/5 to-movieboli-neroProfondo"
[20:14:30.859]  [2m1105[0m |             variants={containerVariants}
[20:14:30.859]  [2m1106[0m |             initial="hidden"
[20:14:30.859]  [2m1107[0m |             whileInView="visible"
[20:14:30.859]  [2m1108[0m |             viewport={{ once: true, margin: "-100px" }}
[20:14:30.859]  [2m1109[0m |           >
[20:14:30.859]  [2m1110[0m |             <div className="max-w-7xl mx-auto">
[20:14:30.868]  [2m1111[0m |               <motion.div 
[20:14:30.869]  [2m1112[0m |                 className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
[20:14:30.869]  [2m1113[0m |                 variants={containerVariants}
[20:14:30.869]  [2m1114[0m |               >
[20:14:30.869]  [2m1115[0m |                 {cortometraggi.map((corto, index) => {
[20:14:30.870]  [2m1116[0m |                   const cortoId = corto.id || corto.titolo || `corto-${index}`
[20:14:30.873]  [2m1117[0m |                   const currentRating = getRating(cortoId)
[20:14:30.874]  [2m1118[0m |                   const showingThankYou = showThankYou === cortoId
[20:14:30.874]  [2m1119[0m |                   
[20:14:30.874]  [2m1120[0m |                   return (
[20:14:30.875]  [2m1121[0m |                     <motion.div
[20:14:30.875]  [2m1122[0m |                       key={cortoId}
[20:14:30.875]  [2m1123[0m |                       className="group bg-movieboli-bordeaux/20 rounded-2xl overflow-hidden border border-movieboli-violaPrincipale/20 hover:border-movieboli-violaPrincipale/50 transition-all duration-300 relative"
[20:14:30.875]  [2m1124[0m |                       variants={cardVariants}
[20:14:30.876]  [2m1125[0m |                       initial="hidden"
[20:14:30.876]  [2m1126[0m |                       whileInView="visible"
[20:14:30.876]  [2m1127[0m |                       whileHover="hover"
[20:14:30.876]  [2m1128[0m |                       viewport={{ once: true }}
[20:14:30.877]  [2m1129[0m |                     >
[20:14:30.877]  [2m1130[0m |                       {/* Badge In Gara */}
[20:14:30.877]  [2m1131[0m |                       <div className="absolute top-4 left-4 z-10">
[20:14:30.877]  [2m1132[0m |                         <span className="bg-movieboli-violaPrincipale text-movieboli-nero text-xs font-bold px-3 py-1 rounded-full">
[20:14:30.878]  [2m1133[0m |                           FESTIVAL 2025
[20:14:30.878]  [2m1134[0m |                         </span>
[20:14:30.878]  [2m1135[0m |                       </div>
[20:14:30.878]  [2m1136[0m | 
[20:14:30.878]  [2m1137[0m |                       {/* Messaggio Thank You */}
[20:14:30.878]  [2m1138[0m |                       <AnimatePresence>
[20:14:30.880]  [2m1139[0m |                         {showingThankYou && (
[20:14:30.880]  [2m1140[0m |                           <motion.div 
[20:14:30.881]  [2m1141[0m |                             className="absolute inset-0 bg-movieboli-violaPrincipale/95 flex items-center justify-center z-20 rounded-2xl"
[20:14:30.881]  [2m1142[0m |                             initial={{ opacity: 0, scale: 0.8 }}
[20:14:30.881]  [2m1143[0m |                             animate={{ opacity: 1, scale: 1 }}
[20:14:30.881]  [2m1144[0m |                             exit={{ opacity: 0, scale: 0.8 }}
[20:14:30.882]  [2m1145[0m |                             transition={{ duration: 0.3 }}
[20:14:30.882]  [2m1146[0m |                           >
[20:14:30.883]  [2m1147[0m |                             <div className="text-center text-movieboli-nero">
[20:14:30.884]  [2m1148[0m |                               <motion.div
[20:14:30.884]  [2m1149[0m |                                 initial={{ scale: 0 }}
[20:14:30.884]  [2m1150[0m |                                 animate={{ scale: 1 }}
[20:14:30.884]  [2m1151[0m |                                 transition={{ delay: 0.1, type: "spring", stiffness: 200 }}
[20:14:30.885]  [2m1152[0m |                               >
[20:14:30.885]  [2m1153[0m |                                 <div className="w-16 h-16 bg-movieboli-crema rounded-full flex items-center justify-center mx-auto mb-4">
[20:14:30.885]  [2m1154[0m |                                   <svg className="w-6 h-6 text-movieboli-violaPrincipale" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.885]  [2m1155[0m |                                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
[20:14:30.886]  [2m1156[0m |                                   </svg>
[20:14:30.886]  [2m1157[0m |                                 </div>
[20:14:30.886]  [2m1158[0m |                               </motion.div>
[20:14:30.886]  [2m1159[0m |                               <h3 className="text-xl font-bold mb-2">
[20:14:30.886]  [2m1160[0m |                                 <EditableText 
[20:14:30.887]  [2m1161[0m |                                   contentKey="vote.success_title"
[20:14:30.887]  [2m1162[0m |                                   defaultValue="Voto registrato!"
[20:14:30.887]  [2m1163[0m |                                   tag="span"
[20:14:30.887]  [2m1164[0m |                                 />
[20:14:30.887]  [2m1165[0m |                               </h3>
[20:14:30.887]  [2m1166[0m |                               <p className="text-sm opacity-80">
[20:14:30.889]  [2m1167[0m |                                 <EditableText 
[20:14:30.889]  [2m1168[0m |                                   contentKey="vote.success_message"
[20:14:30.889]  [2m1169[0m |                                   defaultValue="Grazie per la tua valutazione"
[20:14:30.890]  [2m1170[0m |                                   tag="span"
[20:14:30.890]  [2m1171[0m |                                 />
[20:14:30.890]  [2m1172[0m |                               </p>
[20:14:30.890]  [2m1173[0m |                             </div>
[20:14:30.891]  [2m1174[0m |                           </motion.div>
[20:14:30.891]  [2m1175[0m |                         )}
[20:14:30.891]  [2m1176[0m |                       </AnimatePresence>
[20:14:30.891]  [2m1177[0m | 
[20:14:30.891]  [2m1178[0m |                       {/* Immagine del Cortometraggio */}
[20:14:30.892]  [2m1179[0m |                       <div className="relative aspect-[3/4] overflow-hidden">
[20:14:30.892]  [2m1180[0m |                         {corto.immagine ? (
[20:14:30.892]  [2m1181[0m |                           <img 
[20:14:30.892]  [2m1182[0m |                             src={corto.immagine} 
[20:14:30.893]  [2m1183[0m |                             alt={`Poster di ${corto.titolo}`}
[20:14:30.893]  [2m1184[0m |                             className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
[20:14:30.893]  [2m1185[0m |                             onError={(e) => {
[20:14:30.893]  [2m1186[0m |                               e.target.style.display = 'none'
[20:14:30.893]  [2m1187[0m |                               e.target.nextSibling.style.display = 'flex'
[20:14:30.893]  [2m1188[0m |                             }}
[20:14:30.893]  [2m1189[0m |                           />
[20:14:30.897]  [2m1190[0m |                         ) : null}
[20:14:30.898]  [2m1191[0m |                         <div className="w-full h-full bg-gradient-to-br from-movieboli-violaPrincipale/20 to-movieboli-bordeaux/30 flex items-center justify-center" style={{ display: corto.immagine ? 'none' : 'flex' }}>
[20:14:30.898]  [2m1192[0m |                           <div className="text-center text-movieboli-crema/60">
[20:14:30.898]  [2m1193[0m |                             <div className="w-16 h-16 mx-auto mb-3 bg-movieboli-violaPrincipale/20 rounded-full flex items-center justify-center">
[20:14:30.898]  [2m1194[0m |                               <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
[20:14:30.899]  [2m1195[0m |                                 <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
[20:14:30.899]  [2m1196[0m |                               </svg>
[20:14:30.899]  [2m1197[0m |                             </div>
[20:14:30.899]  [2m1198[0m |                             <p className="text-sm">Poster del Film</p>
[20:14:30.900]  [2m1199[0m |                           </div>
[20:14:30.900]  [2m1200[0m |                         </div>
[20:14:30.900]  [2m1201[0m |                         <div className="absolute inset-0 bg-gradient-to-t from-movieboli-neroProfondo/80 via-transparent to-transparent" />
[20:14:30.900]  [2m1202[0m |                       </div>
[20:14:30.901]  [2m1203[0m | 
[20:14:30.901]  [2m1204[0m |                       {/* Contenuto Card */}
[20:14:30.901]  [2m1205[0m |                       <div className="p-6">
[20:14:30.901]  [2m1206[0m |                         <h3 className="text-xl font-bold mb-2 text-movieboli-crema group-hover:text-movieboli-violaPrincipale transition-colors duration-200">
[20:14:30.901]  [2m1207[0m |                           {corto.titolo}
[20:14:30.901]  [2m1208[0m |                         </h3>
[20:14:30.901]  [2m1209[0m |                         <p className="text-movieboli-crema/70 mb-3">
[20:14:30.901]  [2m1210[0m |                           Regia di {corto.regista}
[20:14:30.901]  [2m1211[0m |                         </p>
[20:14:30.904]  [2m1212[0m |                         <div className="flex justify-between items-center text-sm text-movieboli-crema/60 mb-4">
[20:14:30.905]  [2m1213[0m |                           <span>{corto.durata}</span>
[20:14:30.905]  [2m1214[0m |                           {corto.anno && <span>{corto.anno}</span>}
[20:14:30.905]  [2m1215[0m |                         </div>
[20:14:30.905]  [2m1216[0m |                         <p className="text-movieboli-crema/80 text-sm mb-6 line-clamp-3">
[20:14:30.906]  [2m1217[0m |                           {corto.sinossi}
[20:14:30.906]  [2m1218[0m |                         </p>
[20:14:30.906]  [2m1219[0m |                         
[20:14:30.906]  [2m1220[0m |                         {/* Sistema di Rating con Stelle */}
[20:14:30.907]  [2m1221[0m |                         <div className="mb-4">
[20:14:30.907]  [2m1222[0m |                           <div className="flex items-center justify-between mb-2">
[20:14:30.907]  [2m1223[0m |                             <span className="text-sm font-medium text-movieboli-crema/80">
[20:14:30.907]  [2m1224[0m |                               {currentRating > 0 ? `La tua valutazione: ${currentRating}/10` : 
[20:14:30.907]  [2m1225[0m |                                 getContent('vote.rating.label', 'Valuta questo cortometraggio')
[20:14:30.908]  [2m1226[0m |                               }
[20:14:30.908]  [2m1227[0m |                             </span>
[20:14:30.908]  [2m1228[0m |                             {currentRating > 0 && (
[20:14:30.908]  [2m1229[0m |                                <button
[20:14:30.908]  [2m1230[0m |                                  onClick={() => handleRatingChange(cortoId, 0)}
[20:14:30.909]  [2m1231[0m |                                  className="text-xs text-movieboli-crema/60 hover:text-movieboli-violaPrincipale transition-colors"
[20:14:30.909]  [2m1232[0m |                                >
[20:14:30.909]  [2m1233[0m |                                  <EditableText 
[20:14:30.909]  [2m1234[0m |                                    contentKey="vote.remove_vote"
[20:14:30.909]  [2m1235[0m |                                    defaultValue="Rimuovi voto"
[20:14:30.909]  [2m1236[0m |                                    tag="span"
[20:14:30.909]  [2m1237[0m |                                  />
[20:14:30.909]  [2m1238[0m |                                </button>
[20:14:30.909]  [2m1239[0m |                              )}
[20:14:30.909]  [2m1240[0m |                           </div>
[20:14:30.909]  [2m1241[0m |                           <StarRating 
[20:14:30.909]  [2m1242[0m |                              rating={currentRating}
[20:14:30.909]  [2m1243[0m |                              onRatingChange={(rating) => handleRatingChange(cortoId, rating)}
[20:14:30.909]  [2m1244[0m |                              isSaving={savingVotes.has(cortoId)}
[20:14:30.909]  [2m1245[0m |                            />
[20:14:30.909]  [2m1246[0m |                         </div>
[20:14:30.909]  [2m1247[0m |                         
[20:14:30.909]  [2m1248[0m |                         {/* Link al Trailer se disponibile */}
[20:14:30.909]  [2m1249[0m |                         {(corto.trailer || corto.link) && (
[20:14:30.909]  [2m1250[0m |                           <motion.a
[20:14:30.909]  [2m1251[0m |                             href={corto.trailer || corto.link}
[20:14:30.909]  [2m1252[0m |                             target="_blank"
[20:14:30.909]  [2m1253[0m |                             rel="noopener noreferrer"
[20:14:30.909]  [2m1254[0m |                             className="w-full py-2 px-4 rounded-xl border border-movieboli-violaPrincipale/50 text-movieboli-violaPrincipale hover:bg-movieboli-violaPrincipale hover:text-movieboli-nero transition-all duration-200 flex items-center justify-center space-x-2 text-sm font-medium"
[20:14:30.909]  [2m1255[0m |                             whileHover={{ scale: 1.02 }}
[20:14:30.909]  [2m1256[0m |                             whileTap={{ scale: 0.98 }}
[20:14:30.909]  [2m1257[0m |                           >
[20:14:30.909]  [2m1258[0m |                             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
[20:14:30.909]  [2m1259[0m |                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
[20:14:30.909]  [2m1260[0m |                             </svg>
[20:14:30.909]  [2m1261[0m |                             <span>
[20:14:30.909]  [2m1262[0m |                               <EditableText 
[20:14:30.909]  [2m1263[0m |                                 contentKey="vote.watch_trailer"
[20:14:30.909]  [2m1264[0m |                                 defaultValue="Guarda Trailer"
[20:14:30.909]  [2m1265[0m |                                 tag="span"
[20:14:30.909]  [2m1266[0m |                               />
[20:14:30.909]  [2m1267[0m |                             </span>
[20:14:30.909]  [2m1268[0m |                           </motion.a>
[20:14:30.909]  [2m1269[0m |                         )}
[20:14:30.909]  [2m1270[0m |                       </div>
[20:14:30.909]  [2m1271[0m |                     </motion.div>
[20:14:30.909]  [2m1272[0m |                   )
[20:14:30.909]  [2m1273[0m |                 })}
[20:14:30.909]  [2m1274[0m |               </motion.div>
[20:14:30.909]  [2m1275[0m |             </div>
[20:14:30.910]  [2m1276[0m |           </motion.section>
[20:14:30.910]  [2m1277[0m | 
[20:14:30.910]  [2m1278[0m |           <Footer />
[20:14:30.910]  [2m1279[0m |         </main>
[20:14:30.910]  [2m1280[0m |       </ProtectedRoute>
[20:14:30.910]  [2m1281[0m |     )
[20:14:30.910]  [2m1282[0m | }
[20:14:30.915]  [2m1283[0m | 
[20:14:30.915]  [2m1284[0m | // Funzione per caricare i dati dei cortometraggi dal lato server
[20:14:30.915]  [2m1285[0m | export async function getStaticProps() {
[20:14:30.916]  [2m1286[0m |   try {
[20:14:30.916]  [2m1287[0m |     const fs = require('fs')
[20:14:30.916]  [2m1288[0m |     const path = require('path')
[20:14:30.916]  [2m1289[0m |     const filePath = path.join(process.cwd(), 'public', 'json-folders', 'film_unificati.json')
[20:14:30.916]  [2m1290[0m |     const fileContents = fs.readFileSync(filePath, 'utf8')
[20:14:30.916]  [2m1291[0m |     const allCortometraggi = JSON.parse(fileContents)
[20:14:30.917]  [2m1292[0m | 
[20:14:30.917]  [2m1293[0m |     // Lista dei primi 5 cortometraggi del programma del 22 agosto (venerdì)
[20:14:30.917]  [2m1294[0m |     const cortometraggiVotabili = [
[20:14:30.917]  [2m1295[0m |       'DIECI SECONDI',
[20:14:30.917]  [2m1296[0m |       'Place under the sun',  // Corretto: era 'PLACE UNDER THE SUN'
[20:14:30.917]  [2m1297[0m |       'The Rock Tensions',
[20:14:30.917]  [2m1298[0m |       'APPUNTAMENTO A MEZZOGIORNO',
[20:14:30.917]  [2m1299[0m |       'Ya Hanouni'
[20:14:30.917]  [2m1300[0m |     ]
[20:14:30.917]  [2m1301[0m | 
[20:14:30.917]  [2m1302[0m |     // Filtra solo i cortometraggi votabili del 22 agosto
[20:14:30.917]  [2m1303[0m |     const cortometraggi = allCortometraggi
[20:14:30.917]  [2m1304[0m |       .filter(corto => cortometraggiVotabili.includes(corto.titolo))
[20:14:30.917]  [2m1305[0m |       .sort((a, b) => {
[20:14:30.917]  [2m1306[0m |         // Ordina secondo l'ordine del programma del 22 agosto
[20:14:30.917]  [2m1307[0m |         const indexA = cortometraggiVotabili.indexOf(a.titolo)
[20:14:30.917]  [2m1308[0m |         const indexB = cortometraggiVotabili.indexOf(b.titolo)
[20:14:30.917]  [2m1309[0m |         return indexA - indexB
[20:14:30.917]  [2m1310[0m |       })
[20:14:30.917]  [2m1311[0m | 
[20:14:30.917]  [2m1312[0m |     return {
[20:14:30.917]  [2m1313[0m |       props: {
[20:14:30.917]  [2m1314[0m |         cortometraggi,
[20:14:30.917]  [2m1315[0m |       },
[20:14:30.917]  [2m1316[0m |       revalidate: 3600, // Ricarica ogni ora
[20:14:30.917]  [2m1317[0m |     }
[20:14:30.917]  [2m1318[0m |   } catch (error) {
[20:14:30.917]  [2m1319[0m |     console.error('Errore nel caricamento dei cortometraggi:', error)
[20:14:30.917]  [2m1320[0m |     return {
[20:14:30.917]  [2m1321[0m |       props: {
[20:14:30.917]  [2m1322[0m |         cortometraggi: [],
[20:14:30.917]  [2m1323[0m |         error: 'Errore nel caricamento dei cortometraggi'
[20:14:30.917]  [2m1324[0m |       },
[20:14:30.917]  [2m1325[0m |     }
[20:14:30.917]  [2m1326[0m |   }
[20:14:30.917]  [2m1327[0m | }
[20:14:30.917]  [2m1328[0m | 
[20:14:30.917]  [2m1329[0m | export default Vota
[20:14:30.917]       : [33;1m^^^^^^^^^|^^^^^^^^^[0m
[20:14:30.917]       :          [33;1m`-- [33;1mexported more than once[0m[0m
[20:14:30.917]  [2m1330[0m | 
[20:14:30.917]       `----
[20:14:30.917] 
[20:14:30.917] Error: 
[20:14:30.917]   [36m>[0m Exported identifiers must be unique
[20:14:30.917] 
[20:14:30.917] Import trace for requested module:
[20:14:30.917] ./pages/festival/vota.jsx
[20:14:30.917] 
[20:14:30.917] 
[20:14:30.917] > Build failed because of webpack errors
[20:14:30.917] Error: Command "npm run build" exited with 1