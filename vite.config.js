import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";
// import { resolve } from "path";

export default defineConfig({
  plugins: [
    handlebars({
      context: {
        websiteTitle: "Landengenerator",
        description: "Voor de leukste avonden van het jaar.",
      },
      partialDirectory: "src",
    }),
  ],
  // build: {
  //   rollupOptions: {
  //     input: {
  //       main: resolve(__dirname, "public/index.html"),
  //       about: resolve(__dirname, "public/about/index.html"),
  //     },
  //   },
  // },
});
