import { defineConfig } from "vite";
import handlebars from "vite-plugin-handlebars";

export default defineConfig({
  plugins: [
    handlebars({
      context: {
        websiteTitle: "Tom van Ooijen",
        description: "Een onvergetelijke beeldend avontuur. Geef jezelf over.",
      },
      partialDirectory: "src/partials",
    }),
  ],
});
