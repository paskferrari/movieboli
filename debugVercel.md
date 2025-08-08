[00:12:48.376] Running build in Washington, D.C., USA (East) – iad1
[00:12:48.376] Build machine configuration: 2 cores, 8 GB
[00:12:48.392] Cloning github.com/paskferrari/movieboli (Branch: main, Commit: a9b1ce5)
[00:12:51.164] Cloning completed: 2.772s
[00:12:51.271] Restored build cache from previous deployment (FpQQYvGWVNDqzqrhkbjrrYiptch3)
[00:12:55.885] Running "vercel build"
[00:12:56.363] Vercel CLI 44.7.3
[00:12:56.999] Installing dependencies...
[00:12:58.720] 
[00:12:58.721] up to date in 1s
[00:12:58.722] 
[00:12:58.722] 188 packages are looking for funding
[00:12:58.723]   run `npm fund` for details
[00:12:58.751] Detected Next.js version: 14.2.30
[00:12:58.756] Running "npm run build"
[00:12:58.870] 
[00:12:58.871] > festival-artistico@0.1.0 build
[00:12:58.871] > next build
[00:12:58.871] 
[00:13:00.182]   ▲ Next.js 14.2.30
[00:13:00.184]   - Experiments (use with caution):
[00:13:00.184]     · optimizeCss
[00:13:00.185] 
[00:13:00.185]    Linting and checking validity of types ...
[00:13:06.555]    Creating an optimized production build ...
[00:13:07.010] > [PWA] Compile server
[00:13:07.011] > [PWA] Compile server
[00:13:07.012] > [PWA] Compile client (static)
[00:13:07.012] > [PWA] Auto register service worker with: /vercel/path0/node_modules/next-pwa/register.js
[00:13:07.013] > [PWA] Service worker: /vercel/path0/public/sw.js
[00:13:07.013] > [PWA]   url: /sw.js
[00:13:07.014] > [PWA]   scope: /
[00:13:16.962]  ⚠ Compiled with warnings
[00:13:16.962] 
[00:13:16.963] ./components/admin/RealTimeStatsCard.jsx
[00:13:16.963] Attempted import error: 'TrendingUpIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingUpIcon').
[00:13:16.963] 
[00:13:16.963] Import trace for requested module:
[00:13:16.963] ./components/admin/RealTimeStatsCard.jsx
[00:13:16.963] ./components/admin/AdminDashboard.jsx
[00:13:16.963] 
[00:13:16.963] ./components/admin/RealTimeStatsCard.jsx
[00:13:16.963] Attempted import error: 'TrendingDownIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingDownIcon').
[00:13:16.963] 
[00:13:16.963] Import trace for requested module:
[00:13:16.963] ./components/admin/RealTimeStatsCard.jsx
[00:13:16.963] ./components/admin/AdminDashboard.jsx
[00:13:16.963] 
[00:13:16.963] ./components/admin/RealTimeStatsCard.jsx
[00:13:16.963] Attempted import error: 'TrendingUpIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingUpIcon').
[00:13:16.964] 
[00:13:16.964] Import trace for requested module:
[00:13:16.964] ./components/admin/RealTimeStatsCard.jsx
[00:13:16.964] ./components/admin/AdminDashboard.jsx
[00:13:16.964] ./pages/admin/index.jsx
[00:13:16.964] 
[00:13:16.964] ./components/admin/RealTimeStatsCard.jsx
[00:13:16.964] Attempted import error: 'TrendingDownIcon' is not exported from '__barrel_optimize__?names=MinusIcon,TrendingDownIcon,TrendingUpIcon!=!@heroicons/react/24/outline' (imported as 'TrendingDownIcon').
[00:13:16.964] 
[00:13:16.964] Import trace for requested module:
[00:13:16.964] ./components/admin/RealTimeStatsCard.jsx
[00:13:16.964] ./components/admin/AdminDashboard.jsx
[00:13:16.964] ./pages/admin/index.jsx
[00:13:16.964] 
[00:13:16.965]    Collecting page data ...
[00:13:17.273] 🔍 DEBUG - supabaseUrl: https://igxnfduvvarrnywanxsr.supabase.co
[00:13:17.277] 🔍 DEBUG - supabaseAnonKey: PRESENTE
[00:13:17.277] 🔍 DEBUG - process.env check: { NODE_ENV: 'production', hasUrl: true, hasKey: true }
[00:13:17.278] 🔍 DEBUG - isDemoMode: false
[00:13:18.638]    Generating static pages (0/53) ...
[00:13:19.085] [32mInlined 3.53 kB (3% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:19.085] Time 190.72688
[00:13:19.269] [32mInlined 3.53 kB (3% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:19.271] Time 132.092185
[00:13:19.572] [32mInlined 16.32 kB (14% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:19.574] Time 190.412137
[00:13:19.693] [32mInlined 15.63 kB (13% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:19.694] Time 90.347821
[00:13:19.823] [32mInlined 9.03 kB (8% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:19.824] Time 72.067707
[00:13:19.927] [32mInlined 10.43 kB (9% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:19.928] Time 68.837954
[00:13:20.053] [32mInlined 15.82 kB (14% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:20.054] Time 92.35117
[00:13:20.200] [32mInlined 20.33 kB (18% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:20.200] Time 93.726279
[00:13:20.343] [32mInlined 22.03 kB (19% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:20.344] Time 81.962559
[00:13:20.471] [32mInlined 18.49 kB (16% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:20.472] Time 84.921525
[00:13:20.973] [32mInlined 16.17 kB (14% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:20.975] Time 94.162074
[00:13:21.011] ReferenceError: getContent is not defined
[00:13:21.011]     at j (/vercel/path0/.next/server/pages/festival/programma.js:1:11595)
[00:13:21.012]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[00:13:21.012]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[00:13:21.012]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:21.012]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[00:13:21.012]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:21.012]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[00:13:21.012]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:21.012]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[00:13:21.012]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:21.012] 
[00:13:21.013] Error occurred prerendering page "/festival/programma". Read more: https://nextjs.org/docs/messages/prerender-error
[00:13:21.013] 
[00:13:21.013] ReferenceError: getContent is not defined
[00:13:21.013]     at j (/vercel/path0/.next/server/pages/festival/programma.js:1:11595)
[00:13:21.013]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[00:13:21.013]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[00:13:21.013]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:21.013]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[00:13:21.013]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:21.013]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[00:13:21.013]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:21.013]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[00:13:21.014]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:21.333] [32mInlined 11.20 kB (9% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:21.334] Time 60.186261
[00:13:21.339]    Generating static pages (13/53) 
[00:13:21.499] [32mInlined 23.24 kB (20% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:21.501] Time 99.467285
[00:13:21.572] [32mInlined 8.00 kB (7% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:21.572] Time 43.008637
[00:13:21.757] [32mInlined 19.56 kB (17% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:21.758] Time 68.471453
[00:13:21.856] [32mInlined 6.79 kB (6% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:21.856] Time 56.252713
[00:13:22.042] [32mInlined 11.56 kB (10% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:22.043] Time 81.634344
[00:13:22.151] [32mInlined 18.54 kB (16% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:22.151] Time 61.692315
[00:13:22.293] [32mInlined 13.89 kB (12% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:22.294] Time 67.283983
[00:13:22.567] [32mInlined 16.74 kB (14% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:22.569] Time 142.081052
[00:13:22.824] [32mInlined 17.21 kB (15% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:22.824] Time 144.355281
[00:13:22.944] [32mInlined 16.20 kB (14% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:22.945] Time 72.35932
[00:13:23.042] [32mInlined 2.39 kB (2% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:23.042] Time 59.410878
[00:13:23.168] [32mInlined 2.39 kB (2% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:23.168] Time 43.658384
[00:13:23.597] [32mInlined 3.53 kB (3% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:23.598] Time 50.020487
[00:13:23.604]    Generating static pages (26/53) 
[00:13:23.723] [32mInlined 3.53 kB (3% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:23.724] Time 63.926512
[00:13:23.925] [32mInlined 16.32 kB (14% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:23.927] Time 63.555237
[00:13:24.046] [32mInlined 15.63 kB (13% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:24.048] Time 52.760812
[00:13:24.135] [32mInlined 9.03 kB (8% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:24.135] Time 44.77104
[00:13:24.278] [32mInlined 10.43 kB (9% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:24.278] Time 67.323087
[00:13:24.437] [32mInlined 15.82 kB (14% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:24.438] Time 59.437411
[00:13:25.020] [32mInlined 20.33 kB (18% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:25.021] Time 62.978398
[00:13:25.340] [32mInlined 22.03 kB (19% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:25.341] Time 49.638285
[00:13:25.567] [32mInlined 18.49 kB (16% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:25.567] Time 67.875751
[00:13:25.907] [32mInlined 16.17 kB (14% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:25.907] Time 51.04557
[00:13:25.955] ReferenceError: getContent is not defined
[00:13:25.955]     at j (/vercel/path0/.next/server/pages/festival/programma.js:1:11595)
[00:13:25.955]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[00:13:25.956]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[00:13:25.956]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:25.956]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[00:13:25.956]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:25.957]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[00:13:25.957]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:25.957]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[00:13:25.963]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:25.964] 
[00:13:25.964] Error occurred prerendering page "/it-IT/festival/programma". Read more: https://nextjs.org/docs/messages/prerender-error
[00:13:25.964] 
[00:13:25.964] ReferenceError: getContent is not defined
[00:13:25.964]     at j (/vercel/path0/.next/server/pages/festival/programma.js:1:11595)
[00:13:25.965]     at Wc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:68:44)
[00:13:25.965]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:253)
[00:13:25.965]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:25.965]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[00:13:25.965]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:25.966]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:70:481)
[00:13:25.966]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:25.966]     at Zc (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:74:209)
[00:13:25.966]     at Z (/vercel/path0/node_modules/react-dom/cjs/react-dom-server.browser.production.min.js:76:89)
[00:13:26.058] [32mInlined 11.20 kB (9% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:26.058] Time 54.353182
[00:13:26.169] [32mInlined 23.24 kB (20% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:26.170] Time 70.584355
[00:13:26.171]    Generating static pages (39/53) 
[00:13:26.256] [32mInlined 8.00 kB (7% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:26.256] Time 39.007885
[00:13:26.359] [32mInlined 19.56 kB (17% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:26.359] Time 66.265259
[00:13:26.431] [32mInlined 6.79 kB (6% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:26.431] Time 45.119808
[00:13:26.526] [32mInlined 11.56 kB (10% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:26.527] Time 53.267644
[00:13:26.631] [32mInlined 18.54 kB (16% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:26.631] Time 75.772874
[00:13:26.771] [32mInlined 13.89 kB (12% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:26.771] Time 35.429148
[00:13:27.007] [32mInlined 16.74 kB (14% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:27.007] Time 114.11961
[00:13:27.152] [32mInlined 17.21 kB (15% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:27.152] Time 90.475638
[00:13:27.258] [32mInlined 16.20 kB (14% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:27.259] Time 54.297727
[00:13:27.429] [32mInlined 12.53 kB (11% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:27.429] Time 109.448916
[00:13:27.548] [32mInlined 12.33 kB (10% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:27.548] Time 65.647365
[00:13:27.620] [32mInlined 3.43 kB (3% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:27.621] Time 49.009895
[00:13:27.741] [32mInlined 2.39 kB (2% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:27.743] Time 49.624182
[00:13:27.820] [32mInlined 2.39 kB (2% of original 112.69 kB) of _next/static/css/56db64c46866ba30.css.[39m
[00:13:27.822] Time 47.710941
[00:13:27.823]  ✓ Generating static pages (53/53)
[00:13:27.839] 
[00:13:27.843] > Export encountered errors on following paths:
[00:13:27.843] 	/festival/programma
[00:13:27.844] 	/festival/programma: /it-IT/festival/programma
[00:13:27.888] Error: Command "npm run build" exited with 1