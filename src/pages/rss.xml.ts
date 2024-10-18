import type { APIRoute } from 'astro';
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export const GET: APIRoute = async ({ params, request, site }) => {
    
    const blogPosts = await getCollection('blog')
    return rss({
        //stylesheet: '/styles/rss.xsl',
        // `<title>` field in output xml
        title: 'Cinlo Blog',
        // `<description>` field in output xml
        description: 'Un blog de mis pensamientos y reflexiones',
        // Pull in your project "site" from the endpoint context
        // https://docs.astro.build/en/reference/api-reference/#contextsite
        site: site ?? '',
        // Array of `<item>`s in output xml
        // See "Generating items" section for examples using content collections and glob imports
        items: blogPosts.map( ({ data, slug }) => ({
            title: data.title,
            description: data.description,
            link: `/posts/${slug}`,
            date: data.date,
        })
        ),
        // (optional) inject custom xml
        customData: `<language>es-es</language>`,
      });
}