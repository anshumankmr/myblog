const path = require('path')
const axios = require('axios')

const blogPost = path.resolve('./src/templates/blog-post.js')

exports.createPages = async ({ actions, reporter }) => {
  const { createPage } = actions

  try {
    const response = await axios.get('https://anshumankmr.github.io/generated/content.json')
    const blogs = response.data.data
    
    const sortedBlogs = blogs.sort((a, b) => 
      new Date(b.attributes.date).getTime() - new Date(a.attributes.date).getTime()
    )

    // Create individual blog posts
    sortedBlogs.forEach((blog, index) => {
      const previous = index === sortedBlogs.length - 1 ? null : {
        title: sortedBlogs[index + 1].attributes.Title,
        slug: `/article/${sortedBlogs[index + 1].attributes.date}/${generateSlug(sortedBlogs[index + 1].attributes.Title)}`
      }
      
      const next = index === 0 ? null : {
        title: sortedBlogs[index - 1].attributes.Title,
        slug: `/article/${sortedBlogs[index - 1].attributes.date}/${generateSlug(sortedBlogs[index - 1].attributes.Title)}`
      }
      
      createPage({
        path: `/article/${blog.attributes.date}/${generateSlug(blog.attributes.Title)}`,
        component: blogPost,
        context: {
          id: blog.attributes.articleId,
          previous,
          next,
          blog
        },
      })
    })

  } catch (error) {
    reporter.panicOnBuild(
      `Error fetching blog posts: ${error.message}`,
      error
    )
  }
}

function generateSlug(title) {
  return title
    .toLowerCase()
    .replace(/[\s\(\)]+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '')
}