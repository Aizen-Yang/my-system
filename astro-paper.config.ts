import { defineAstroPaperConfig } from './src/types/config';
import { siteSettings } from './src/site-settings';
export default defineAstroPaperConfig({
  site: { ...siteSettings.site, dir: 'ltr', ogImage: 'default-og.svg' },
  posts: siteSettings.posts,
  features: { lightAndDarkMode: true, dynamicOgImage: false, showArchives: true, showBackButton: true, editPost: { enabled: false }, search: 'pagefind' },
  socials: [], shareLinks: [],
});
