/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.com/docs/reference/config-files/gatsby-config/
 */

/**
 * @type {import('gatsby').GatsbyConfig}
 */
const axios = require('axios');

module.exports = {
  siteMetadata: {
    title: `Anshuman's Blog`,
    author: {
      name: `Anshuman Kumar`,
      summary: `I live and work in Bengaluru, occasionally doing useful things.`,
    },
    description: `A starter blog demonstrating what Gatsby can do.`,
    siteUrl: `https://www.anshumankumar.dev/`,
    social: {
      twitter: `anshuman_kmr`,
    },
  },
  plugins: [
    `gatsby-plugin-image`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/content/blog`,
        name: `blog`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 630,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          `gatsby-remark-prismjs`,
        ],
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
          {
            site {
              siteMetadata {
                title
                description
                siteUrl
                site_url: siteUrl
              }
            }
          }
        `,
        feeds: [
          {
            serialize: async ({ query: { site } }) => {
              const response = await axios.get('https://anshumankmr.github.io/generated/content.json');
              const blogs = response.data.data;

              const sortedBlogs = blogs.sort((a, b) =>
                new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()
              );

              return sortedBlogs.map(blog => ({
                title: blog.attributes.Title,
                description: blog.attributes.Excerpt || '',
                date: blog.attributes.date,
                url: `${site.siteMetadata.siteUrl}/article/${blog.attributes.date}/${generateSlug(blog.attributes.Title)}`,
                guid: `${site.siteMetadata.siteUrl}/article/${blog.attributes.date}/${generateSlug(blog.attributes.Title)}`,
              }));
            },
            query: `
              {
                site {
                  siteMetadata {
                    siteUrl
                  }
                }
              }
            `,
            output: "/rss.xml",
            title: "Anshuman's Blog RSS Feed",
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Gatsby Starter Blog`,
        short_name: `Gatsby`,
        start_url: `/`,
        background_color: `#ffffff`,
        // This will impact how browsers show your PWA/website
        // https://css-tricks.com/meta-theme-color-and-trickery/
        // theme_color: `#663399`,
        display: `minimal-ui`,
        icon: `src/images/gatsby-icon.png`, // This path is relative to the root of the site.
      },
    },
  ],
};

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[\s\(\)]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '');
}
