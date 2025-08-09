[02:16:13.126] Running build in Washington, D.C., USA (East) – iad1
[02:16:13.127] Build machine configuration: 2 cores, 8 GB
[02:16:13.141] Cloning github.com/paskferrari/movieboli (Branch: main, Commit: eb4f10a)
[02:16:15.436] Cloning completed: 2.295s
[02:16:15.607] Restored build cache from previous deployment (2uFupGnLUXv7yWvfFmb4MiKjA1FM)
[02:16:20.748] Running "vercel build"
[02:16:21.249] Vercel CLI 44.7.3
[02:16:21.617] Installing dependencies...
[02:16:23.645] npm warn deprecated crypto@1.0.1: This package is no longer supported. It's now a built-in Node module. If you've depended on crypto, you should switch to the one that's built-in.
[02:16:25.512] 
[02:16:25.513] added 77 packages in 4s
[02:16:25.516] 
[02:16:25.517] 193 packages are looking for funding
[02:16:25.518]   run `npm fund` for details
[02:16:25.554] Detected Next.js version: 14.2.30
[02:16:25.560] Running "npm run build"
[02:16:25.669] 
[02:16:25.669] > festival-artistico@0.1.0 build
[02:16:25.670] > next build
[02:16:25.670] 
[02:16:26.321]  ⨯ Failed to load next.config.js, see more info here https://nextjs.org/docs/messages/next-config-error
[02:16:26.364] 
[02:16:26.365] > Build error occurred
[02:16:26.365] /vercel/path0/next.config.js:110
[02:16:26.366]               "// Nella sezione CSP, modifica script-src per includere unsafe-eval in sviluppo
[02:16:26.366]               ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
[02:16:26.366] 
[02:16:26.366] SyntaxError: Invalid or unexpected token
[02:16:26.367]     at wrapSafe (node:internal/modules/cjs/loader:1620:18)
[02:16:26.367]     at Module._compile (node:internal/modules/cjs/loader:1662:20)
[02:16:26.367]     at Object..js (node:internal/modules/cjs/loader:1820:10)
[02:16:26.367]     at Module.load (node:internal/modules/cjs/loader:1423:32)
[02:16:26.367]     at Function._load (node:internal/modules/cjs/loader:1246:12)
[02:16:26.368]     at TracingChannel.traceSync (node:diagnostics_channel:322:14)
[02:16:26.368]     at wrapModuleLoad (node:internal/modules/cjs/loader:235:24)
[02:16:26.368]     at cjsLoader (node:internal/modules/esm/translators:268:5)
[02:16:26.368]     at ModuleWrap.<anonymous> (node:internal/modules/esm/translators:202:7)
[02:16:26.369]     at ModuleJob.run (node:internal/modules/esm/module_job:343:25)
[02:16:26.384] Error: Command "npm run build" exited with 1