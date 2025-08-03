[16:45:28.087] Running build in Washington, D.C., USA (East) – iad1
[16:45:28.087] Build machine configuration: 2 cores, 8 GB
[16:45:28.103] Cloning github.com/paskferrari/movieboli (Branch: main, Commit: dc9bb34)
[16:45:31.619] Cloning completed: 3.515s
[16:45:31.854] Restored build cache from previous deployment (CSkyhBvgekzGxvaRDCqswn5ihKYJ)
[16:45:33.758] Running "vercel build"
[16:45:34.363] Vercel CLI 44.6.4
[16:45:34.682] Installing dependencies...
[16:45:37.543] 
[16:45:37.544] added 1 package in 3s
[16:45:37.544] 
[16:45:37.545] 188 packages are looking for funding
[16:45:37.546]   run `npm fund` for details
[16:45:37.580] Detected Next.js version: 14.2.30
[16:45:37.585] Running "npm run build"
[16:45:37.697] 
[16:45:37.697] > festival-artistico@0.1.0 build
[16:45:37.697] > next build
[16:45:37.697] 
[16:45:38.992]   ▲ Next.js 14.2.30
[16:45:38.993]   - Experiments (use with caution):
[16:45:38.993]     · optimizeCss
[16:45:38.993] 
[16:45:38.993]    Linting and checking validity of types ...
[16:45:45.302]    Creating an optimized production build ...
[16:45:45.743] > [PWA] Compile server
[16:45:45.744] > [PWA] Compile server
[16:45:45.745] > [PWA] Compile client (static)
[16:45:45.746] > [PWA] Auto register service worker with: /vercel/path0/node_modules/next-pwa/register.js
[16:45:45.746] > [PWA] Service worker: /vercel/path0/public/sw.js
[16:45:45.746] > [PWA]   url: /sw.js
[16:45:45.746] > [PWA]   scope: /
[16:46:07.566]  ⚠ Compiled with warnings
[16:46:07.567] 
[16:46:07.568] ./components/admin/RealTimeStatsCard.jsx
[16:46:07.568] Attempted import error: 'TrendingUpIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingUpIcon').
[16:46:07.569] 
[16:46:07.569] Import trace for requested module:
[16:46:07.569] ./components/admin/RealTimeStatsCard.jsx
[16:46:07.570] ./components/admin/AdminDashboard.jsx
[16:46:07.570] 
[16:46:07.570] ./components/admin/RealTimeStatsCard.jsx
[16:46:07.571] Attempted import error: 'TrendingDownIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingDownIcon').
[16:46:07.571] 
[16:46:07.571] Import trace for requested module:
[16:46:07.571] ./components/admin/RealTimeStatsCard.jsx
[16:46:07.571] ./components/admin/AdminDashboard.jsx
[16:46:07.572] 
[16:46:07.572] ./components/admin/RealTimeStatsCard.jsx
[16:46:07.572] Attempted import error: 'TrendingUpIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingUpIcon').
[16:46:07.572] 
[16:46:07.572] Import trace for requested module:
[16:46:07.573] ./components/admin/RealTimeStatsCard.jsx
[16:46:07.573] ./components/admin/AdminDashboard.jsx
[16:46:07.573] ./pages/admin/index.jsx
[16:46:07.573] 
[16:46:07.573] ./components/admin/RealTimeStatsCard.jsx
[16:46:07.573] Attempted import error: 'TrendingDownIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingDownIcon').
[16:46:07.574] 
[16:46:07.574] Import trace for requested module:
[16:46:07.574] ./components/admin/RealTimeStatsCard.jsx
[16:46:07.574] ./components/admin/AdminDashboard.jsx
[16:46:07.574] ./pages/admin/index.jsx
[16:46:07.574] 
[16:46:07.575]    Collecting page data ...
[16:46:08.029] 🔍 DEBUG - supabaseUrl: undefined
[16:46:08.029] 🔍 DEBUG - supabaseAnonKey: MANCANTE
[16:46:08.030] 🔍 DEBUG - process.env check: { NODE_ENV: 'production', hasUrl: false, hasKey: false }
[16:46:08.030] 🔍 DEBUG - isDemoMode: true
[16:46:08.030] ⚠️ MODALITÀ DEMO: Configurare Supabase per l'autenticazione reale
[16:46:09.278]    Generating static pages (0/53) ...
[16:46:09.722] [32mInlined 3.53 kB (3% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:09.726] Time 208.912381
[16:46:09.948] [32mInlined 3.53 kB (3% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:09.949] Time 181.47411
[16:46:10.248] [32mInlined 17.55 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:10.250] Time 186.852656
[16:46:10.420] [32mInlined 16.86 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:10.421] Time 130.550859
[16:46:10.548] [32mInlined 9.03 kB (8% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:10.549] Time 72.924008
[16:46:10.696] [32mInlined 10.40 kB (9% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:10.698] Time 86.536521
[16:46:10.828] [32mInlined 17.05 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:10.828] Time 81.565814
[16:46:10.964] [32mInlined 19.29 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:10.964] Time 68.670812
[16:46:11.478] [32mInlined 22.79 kB (20% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:11.478] Time 107.431821
[16:46:11.879] [32mInlined 18.65 kB (16% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:11.879] Time 111.221413
[16:46:12.004] [32mInlined 17.78 kB (16% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:12.004] Time 67.57569
[16:46:12.032] ReferenceError: filmDataMap is not defined
[16:46:12.032]     at b (/vercel/path0/.next/server/pages/festival/programma.js:1:5998)
[16:46:12.033]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[16:46:12.033]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[16:46:12.033]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:12.034]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:46:12.034]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:12.034]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[16:46:12.034]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:12.034]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:46:12.035]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:12.035] 
[16:46:12.035] Error occurred prerendering page "/festival/programma". Read more: https://nextjs.org/docs/messages/prerender-error
[16:46:12.035] 
[16:46:12.035] ReferenceError: filmDataMap is not defined
[16:46:12.035]     at b (/vercel/path0/.next/server/pages/festival/programma.js:1:5998)
[16:46:12.036]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[16:46:12.036]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[16:46:12.036]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:12.037]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:46:12.038]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:12.038]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[16:46:12.038]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:12.038]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:46:12.039]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:12.223] [32mInlined 11.20 kB (10% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:12.223] Time 114.244587
[16:46:12.226]    Generating static pages (13/53) 
[16:46:12.382] [32mInlined 20.21 kB (18% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:12.383] Time 104.454542
[16:46:12.457] [32mInlined 8.00 kB (7% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:12.458] Time 48.983945
[16:46:12.578] [32mInlined 19.56 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:12.578] Time 71.587885
[16:46:12.697] [32mInlined 6.77 kB (6% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:12.698] Time 73.472423
[16:46:12.996] [32mInlined 11.56 kB (10% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:12.997] Time 56.105789
[16:46:13.165] [32mInlined 19.29 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:13.165] Time 105.681995
[16:46:13.307] [32mInlined 13.85 kB (12% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:13.307] Time 68.936049
[16:46:13.486] [32mInlined 17.49 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:13.486] Time 75.062177
[16:46:13.896] [32mInlined 17.24 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:13.897] Time 69.34451
[16:46:14.042] [32mInlined 17.36 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:14.042] Time 86.040305
[16:46:14.234] [32mInlined 2.39 kB (2% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:14.235] Time 65.261562
[16:46:14.369] [32mInlined 2.39 kB (2% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:14.369] Time 42.34226
[16:46:14.459] [32mInlined 3.53 kB (3% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:14.459] Time 51.218363
[16:46:14.460]    Generating static pages (26/53) 
[16:46:14.555] [32mInlined 3.53 kB (3% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:14.556] Time 39.976693
[16:46:14.681] [32mInlined 17.55 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:14.682] Time 63.041898
[16:46:15.281] [32mInlined 16.86 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:15.282] Time 90.575824
[16:46:15.580] [32mInlined 9.03 kB (8% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:15.582] Time 51.830042
[16:46:15.814] [32mInlined 10.40 kB (9% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:15.815] Time 55.377467
[16:46:16.173] [32mInlined 17.05 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:16.174] Time 63.579097
[16:46:16.322] [32mInlined 19.29 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:16.323] Time 93.129505
[16:46:16.441] [32mInlined 22.79 kB (20% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:16.441] Time 57.451972
[16:46:16.548] [32mInlined 18.65 kB (16% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:16.549] Time 52.805922
[16:46:16.658] [32mInlined 17.78 kB (16% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:16.659] Time 58.368104
[16:46:16.688] ReferenceError: filmDataMap is not defined
[16:46:16.689]     at b (/vercel/path0/.next/server/pages/festival/programma.js:1:5998)
[16:46:16.689]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[16:46:16.689]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[16:46:16.689]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:16.690]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:46:16.690]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:16.690]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[16:46:16.690]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:16.691]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:46:16.691]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:16.691] 
[16:46:16.692] Error occurred prerendering page "/it-IT/festival/programma". Read more: https://nextjs.org/docs/messages/prerender-error
[16:46:16.692] 
[16:46:16.692] ReferenceError: filmDataMap is not defined
[16:46:16.692]     at b (/vercel/path0/.next/server/pages/festival/programma.js:1:5998)
[16:46:16.692]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[16:46:16.693]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[16:46:16.693]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:16.694]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:46:16.695]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:16.695]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[16:46:16.696]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:16.696]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[16:46:16.696]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[16:46:16.785] [32mInlined 11.20 kB (10% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:16.785] Time 58.941277
[16:46:16.927] [32mInlined 20.21 kB (18% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:16.927] Time 80.784145
[16:46:16.928]    Generating static pages (39/53) 
[16:46:17.013] [32mInlined 8.00 kB (7% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:17.013] Time 51.180302
[16:46:17.201] [32mInlined 19.56 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:17.201] Time 66.414244
[16:46:17.331] [32mInlined 6.77 kB (6% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:17.333] Time 81.743989
[16:46:17.433] [32mInlined 11.56 kB (10% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:17.433] Time 51.066277
[16:46:17.554] [32mInlined 19.29 kB (17% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:17.554] Time 65.194404
[16:46:17.708] [32mInlined 13.85 kB (12% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:17.709] Time 58.528421
[16:46:17.845] [32mInlined 17.49 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:17.846] Time 79.595375
[16:46:17.934] [32mInlined 17.24 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:17.935] Time 59.241575
[16:46:18.093] [32mInlined 17.36 kB (15% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:18.094] Time 69.844162
[16:46:18.196] [32mInlined 13.80 kB (12% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:18.196] Time 56.582409
[16:46:18.296] [32mInlined 13.60 kB (12% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:18.297] Time 52.394969
[16:46:18.421] [32mInlined 3.43 kB (3% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:18.421] Time 43.196034
[16:46:18.478] [32mInlined 2.39 kB (2% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:18.479] Time 31.256905
[16:46:18.551] [32mInlined 2.39 kB (2% of original 109.74 kB) of _next/static/css/58fa1c231ddf0670.css.[39m
[16:46:18.552] Time 34.003086
[16:46:18.552]  ✓ Generating static pages (53/53)
[16:46:18.568] 
[16:46:18.571] > Export encountered errors on following paths:
[16:46:18.571] 	/festival/programma
[16:46:18.571] 	/festival/programma: /it-IT/festival/programma
[16:46:18.621] Error: Command "npm run build" exited with 1
[16:46:21.991] Exiting build container