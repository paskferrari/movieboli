[16:40:54.087] Running build in Washington, D.C., USA (East) – iad1
[16:40:54.087] Build machine configuration: 2 cores, 8 GB
[16:40:54.103] Cloning github.com/paskferrari/movieboli (Branch: main, Commit: 56a23e6)
[16:40:57.580] Cloning completed: 3.476s
[16:40:57.685] Restored build cache from previous deployment (CSkyhBvgekzGxvaRDCqswn5ihKYJ)
[16:41:00.352] Running "vercel build"
[16:41:00.838] Vercel CLI 44.6.4
[16:41:01.162] Installing dependencies...
[16:41:03.982] 
[16:41:03.983] added 1 package in 3s
[16:41:03.983] 
[16:41:03.984] 188 packages are looking for funding
[16:41:03.984]   run `npm fund` for details
[16:41:04.019] Detected Next.js version: 14.2.30
[16:41:04.024] Running "npm run build"
[16:41:04.417] 
[16:41:04.418] > festival-artistico@0.1.0 build
[16:41:04.418] > next build
[16:41:04.419] 
[16:41:06.321]   ▲ Next.js 14.2.30
[16:41:06.322]   - Experiments (use with caution):
[16:41:06.322]     · optimizeCss
[16:41:06.323] 
[16:41:06.323]    Linting and checking validity of types ...
[16:41:12.708]    Creating an optimized production build ...
[16:41:13.171] > [PWA] Compile server
[16:41:13.172] > [PWA] Compile server
[16:41:13.174] > [PWA] Compile client (static)
[16:41:13.175] > [PWA] Auto register service worker with: /vercel/path0/node_modules/next-pwa/register.js
[16:41:13.175] > [PWA] Service worker: /vercel/path0/public/sw.js
[16:41:13.175] > [PWA]   url: /sw.js
[16:41:13.175] > [PWA]   scope: /
[16:41:35.217]  ⚠ Compiled with warnings
[16:41:35.218] 
[16:41:35.218] ./components/admin/RealTimeStatsCard.jsx
[16:41:35.219] Attempted import error: 'TrendingUpIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingUpIcon').
[16:41:35.219] 
[16:41:35.220] Import trace for requested module:
[16:41:35.220] ./components/admin/RealTimeStatsCard.jsx
[16:41:35.220] ./components/admin/AdminDashboard.jsx
[16:41:35.221] 
[16:41:35.221] ./components/admin/RealTimeStatsCard.jsx
[16:41:35.221] Attempted import error: 'TrendingDownIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingDownIcon').
[16:41:35.222] 
[16:41:35.222] Import trace for requested module:
[16:41:35.222] ./components/admin/RealTimeStatsCard.jsx
[16:41:35.222] ./components/admin/AdminDashboard.jsx
[16:41:35.222] 
[16:41:35.223] ./components/admin/RealTimeStatsCard.jsx
[16:41:35.223] Attempted import error: 'TrendingUpIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingUpIcon').
[16:41:35.223] 
[16:41:35.223] Import trace for requested module:
[16:41:35.224] ./components/admin/RealTimeStatsCard.jsx
[16:41:35.224] ./components/admin/AdminDashboard.jsx
[16:41:35.224] ./pages/admin/index.jsx
[16:41:35.224] 
[16:41:35.224] ./components/admin/RealTimeStatsCard.jsx
[16:41:35.224] Attempted import error: 'TrendingDownIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingDownIcon').
[16:41:35.224] 
[16:41:35.224] Import trace for requested module:
[16:41:35.225] ./components/admin/RealTimeStatsCard.jsx
[16:41:35.225] ./components/admin/AdminDashboard.jsx
[16:41:35.225] ./pages/admin/index.jsx
[16:41:35.225] 
[16:41:35.225]    Collecting page data ...
[16:41:35.520] 🔍 DEBUG - supabaseUrl: undefined
[16:41:35.520] 🔍 DEBUG - supabaseAnonKey: MANCANTE
[16:41:35.520] 🔍 DEBUG - process.env check: { NODE_ENV: 'production', hasUrl: false, hasKey: false }
[16:41:35.520] 🔍 DEBUG - isDemoMode: true
[16:41:35.521] ⚠️ MODALITÀ DEMO: Configurare Supabase per l'autenticazione reale
[16:41:36.761]    Generating static pages (0/53) ...
[16:41:37.098] [32mInlined 3.53 kB (3% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:37.099] Time 172.192066
[16:41:37.309] [32mInlined 3.53 kB (3% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:37.311] Time 133.513389
[16:41:37.532] [32mInlined 17.55 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:37.532] Time 174.097629
[16:41:37.680] [32mInlined 16.86 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:37.681] Time 79.276686
[16:41:37.819] [32mInlined 9.03 kB (8% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:37.819] Time 90.010145
[16:41:37.942] [32mInlined 10.40 kB (9% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:37.942] Time 71.226392
[16:41:38.047] [32mInlined 17.05 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:38.047] Time 61.709739
[16:41:38.210] [32mInlined 19.29 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:38.211] Time 81.770628
[16:41:38.411] [32mInlined 22.79 kB (20% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:38.412] Time 102.513459
[16:41:38.554] [32mInlined 18.65 kB (16% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:38.555] Time 89.395676
[16:41:38.662] [32mInlined 17.78 kB (16% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:38.664] Time 54.170969
[16:41:38.919] ReferenceError: filmDataMap is not defined
[16:41:38.924]     at b (/vercel/path0/.next/server/pages/festival/programma.js:1:5998)
[16:41:38.924]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[16:41:38.925]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[16:41:38.925]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:38.926]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:41:38.926]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:38.926]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[16:41:38.927]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:38.927]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:41:38.927]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:38.927] 
[16:41:38.928] Error occurred prerendering page "/festival/programma". Read more: https://nextjs.org/docs/messages/prerender-error
[16:41:38.928] 
[16:41:38.928] ReferenceError: filmDataMap is not defined
[16:41:38.929]     at b (/vercel/path0/.next/server/pages/festival/programma.js:1:5998)
[16:41:38.929]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[16:41:38.929]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[16:41:38.929]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:38.930]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:41:38.930]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:38.930]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[16:41:38.931]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:38.931]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:41:38.931]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:39.204] [32mInlined 11.20 kB (10% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:39.204] Time 92.710931
[16:41:39.217]    Generating static pages (13/53) 
[16:41:39.603] [32mInlined 20.21 kB (18% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:39.603] Time 106.817928
[16:41:39.689] [32mInlined 8.00 kB (7% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:39.689] Time 52.939804
[16:41:39.934] [32mInlined 19.56 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:39.935] Time 84.030585
[16:41:40.055] [32mInlined 6.77 kB (6% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:40.056] Time 91.168799
[16:41:40.173] [32mInlined 11.56 kB (10% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:40.174] Time 58.728783
[16:41:40.334] [32mInlined 19.29 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:40.335] Time 112.054177
[16:41:40.455] [32mInlined 13.85 kB (12% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:40.456] Time 72.077453
[16:41:40.829] [32mInlined 17.49 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:40.829] Time 71.775822
[16:41:40.932] [32mInlined 17.24 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:40.932] Time 65.615367
[16:41:41.088] [32mInlined 17.36 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:41.089] Time 86.039304
[16:41:41.170] [32mInlined 2.39 kB (2% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:41.170] Time 44.447554
[16:41:41.590] [32mInlined 2.39 kB (2% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:41.591] Time 44.238382
[16:41:41.693] [32mInlined 3.53 kB (3% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:41.693] Time 34.511561
[16:41:41.718]    Generating static pages (26/53) 
[16:41:41.914] [32mInlined 3.53 kB (3% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:41.915] Time 49.335801
[16:41:42.059] [32mInlined 17.55 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:42.059] Time 72.981626
[16:41:42.164] [32mInlined 16.86 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:42.165] Time 62.776535
[16:41:42.286] [32mInlined 9.03 kB (8% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:42.287] Time 57.326925
[16:41:42.378] [32mInlined 10.40 kB (9% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:42.378] Time 51.658964
[16:41:42.952] [32mInlined 17.05 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:42.953] Time 53.702543
[16:41:43.280] [32mInlined 19.29 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:43.282] Time 70.904987
[16:41:43.495] [32mInlined 22.79 kB (20% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:43.496] Time 57.409869
[16:41:43.856] [32mInlined 18.65 kB (16% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:43.858] Time 59.858477
[16:41:44.008] [32mInlined 17.78 kB (16% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:44.008] Time 56.436277
[16:41:44.057] ReferenceError: filmDataMap is not defined
[16:41:44.057]     at b (/vercel/path0/.next/server/pages/festival/programma.js:1:5998)
[16:41:44.057]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[16:41:44.058]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[16:41:44.058]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:44.058]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:41:44.059]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:44.059]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[16:41:44.059]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:44.060]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:41:44.060]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:44.060] 
[16:41:44.060] Error occurred prerendering page "/it-IT/festival/programma". Read more: https://nextjs.org/docs/messages/prerender-error
[16:41:44.061] 
[16:41:44.061] ReferenceError: filmDataMap is not defined
[16:41:44.061]     at b (/vercel/path0/.next/server/pages/festival/programma.js:1:5998)
[16:41:44.061]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[16:41:44.062]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[16:41:44.062]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:44.062]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:41:44.062]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:44.063]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[16:41:44.063]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:44.063]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:41:44.063]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:41:44.185] [32mInlined 11.20 kB (10% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:44.185] Time 90.256307
[16:41:44.344] [32mInlined 20.21 kB (18% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:44.345] Time 73.323126
[16:41:44.346]    Generating static pages (39/53) 
[16:41:44.418] [32mInlined 8.00 kB (7% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:44.418] Time 48.309883
[16:41:44.525] [32mInlined 19.56 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:44.525] Time 66.040536
[16:41:44.599] [32mInlined 6.77 kB (6% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:44.600] Time 48.315101
[16:41:44.725] [32mInlined 11.56 kB (10% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:44.725] Time 67.060269
[16:41:44.838] [32mInlined 19.29 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:44.838] Time 60.296554
[16:41:44.963] [32mInlined 13.85 kB (12% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:44.964] Time 55.147895
[16:41:45.072] [32mInlined 17.49 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:45.073] Time 64.463939
[16:41:45.171] [32mInlined 17.24 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:45.172] Time 55.501999
[16:41:45.290] [32mInlined 17.36 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:45.290] Time 53.243684
[16:41:45.447] [32mInlined 13.80 kB (12% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:45.449] Time 62.618037
[16:41:45.581] [32mInlined 13.60 kB (12% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:45.581] Time 52.907874
[16:41:45.659] [32mInlined 3.43 kB (3% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:45.660] Time 42.189116
[16:41:45.717] [32mInlined 2.39 kB (2% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:45.717] Time 35.317685
[16:41:45.838] [32mInlined 2.39 kB (2% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:41:45.839] Time 31.675545
[16:41:45.839]  ✓ Generating static pages (53/53)
[16:41:45.863] 
[16:41:45.868] > Export encountered errors on following paths:
[16:41:45.868] 	/festival/programma
[16:41:45.868] 	/festival/programma: /it-IT/festival/programma
[16:41:45.917] Error: Command "npm run build" exited with 1
[16:41:49.326] Exiting build container