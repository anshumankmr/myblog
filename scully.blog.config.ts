import { ScullyConfig } from '@scullyio/scully';

/** this loads the default render plugin, remove when switching to something else. */


export const config: ScullyConfig = {
  projectRoot: "./src",
  projectName: "blog",
  spsModulePath: 'YOUR OWN MODULE PATH HERE',
  outDir: './dist/static',
  routes: {
  },
  puppeteerLaunchOptions: {
    args: [
      "--disable-gpu",
      "--renderer",
      "--no-sandbox",
      "--no-service-autorun",
      "--no-experiments",
      "--no-default-browser-check",
      "--disable-dev-shm-usage",
      "--disable-setuid-sandbox",
      "--no-first-run",
      "--no-zygote",
      "--single-process",
      "--disable-extensions"
    ]
  }
};