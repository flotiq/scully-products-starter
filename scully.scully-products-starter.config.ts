import { ScullyConfig } from '@scullyio/scully';
export const config: ScullyConfig = {
  projectRoot: './src',
  projectName: 'scully-products-starter',
  outDir: './dist/static',
  routes: {
    '/product/:slug': {
      type: 'json',
      slug: {
        url: 'https://api.flotiq.com/api/v1/content/product',
        property: 'slug',
        headers: {
          'X-AUTH-TOKEN': 'MY_API_KEY'
        },
        resultsHandler: rawData => rawData.data
      }
    },
    '/:page': {
      type: 'json',
      page: {
        url: 'https://api.flotiq.com/api/v1/content/product?page=1&limit=8',
        property: 'page',
        headers: {
          'X-AUTH-TOKEN': 'MY_API_KEY'
        },
        resultsHandler: rawData => {
          const pages = [];
          for (let i = 1; i <= rawData.total_pages; i++) {
            pages.push({page: i});
          }
          return pages;
        }
      }
    }
  }
};
