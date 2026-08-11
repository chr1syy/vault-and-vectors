import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Vault & Vectors",
    pageTitleSuffix: "",
    enableSPA: true,
    enablePopovers: true,
    analytics: null,
    locale: "en-US",
    baseUrl: "blog.bleuel-it.de",
    ignorePatterns: ["private", "templates", ".obsidian"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        // Bricolage for headings: a little character without being loud.
        // Source Serif for body — this is a reading site, long prose beats
        // a UI font. IBM Plex Mono stays; it pairs well with the serif.
        header: "Bricolage Grotesque",
        body: "Source Serif 4",
        code: "IBM Plex Mono",
      },
      colors: {
        // Warm paper + ink, one indigo accent. The Quartz default (cool gray
        // on white, teal-blue accent) reads like a docs site; this reads like
        // something written by a person.
        lightMode: {
          light: "#fbfaf7", // page — warm paper, not white
          lightgray: "#e6e2da", // borders, hr
          gray: "#a9a294", // muted text, graph links
          darkgray: "#55504a", // secondary text
          dark: "#1e1c1a", // body text — near-black, warm
          secondary: "#4b3fbe", // links, headings-on-hover, active nav
          tertiary: "#b0651f", // hover accent, graph focus — warm counterpoint
          highlight: "rgba(75, 63, 190, 0.09)", // internal-link bg, code bg
          textHighlight: "#f6d97b99",
        },
        darkMode: {
          light: "#15141a", // page — deep ink with a violet cast
          lightgray: "#33303c",
          gray: "#6f6a7d",
          darkgray: "#c2bdcc",
          dark: "#eceaf2",
          secondary: "#a89cf5",
          tertiary: "#e0a35e",
          highlight: "rgba(168, 156, 245, 0.12)",
          textHighlight: "#b3aa0288",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.RemoveDrafts()],
    emitters: [
      // Emits public/CNAME from baseUrl — GitHub Pages needs that file to
      // serve the custom domain. Without it the domain reverts on every deploy.
      Plugin.CNAME(),
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      // Comment out CustomOgImages to speed up build time
      Plugin.CustomOgImages(),
    ],
  },
}

export default config
