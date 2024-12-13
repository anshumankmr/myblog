const path = require(`path`)
const axios = require(`axios`) // You'll need to install axios: npm install axios

const blogPost = path.resolve(`./src/templates/blog-post.js`)

exports.createPages = async ({ actions, reporter }) => {
  const { createPage } = actions

  try {
    // Fetch blogs from your REST API
    const response = await axios.get('https://glass-approach-204914.uc.r.appspot.com/api/blogs')
    const blogs = response.data.data

    // Sort blogs by date (matching your Angular custom_sort logic)
    const sortedBlogs = blogs.sort((a, b) => 
      new Date(a.attributes.date).getTime() - new Date(b.attributes.date).getTime()
    )

    // Generate slug function matching your Angular implementation
    const generateSlug = (title) => {
      return title
        .toLowerCase()
        .replace(/[\s\(\)]+/g, '-')
        .replace(/[^\w-]+/g, '')
        .replace(/--+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '')
    }

    // Create pages for each blog post
    sortedBlogs.forEach((blog, index) => {
      const previousBlogId = index === 0 ? null : sortedBlogs[index - 1].id
      const nextBlogId = index === sortedBlogs.length - 1 ? null : sortedBlogs[index + 1].id
      const slug = generateSlug(blog.attributes.Title)

      createPage({
        path: `/article/${blog.attributes.date}/${slug}`,
        component: blogPost,
        context: {
          id: blog.attributes.articleId,
          previousBlogId,
          nextBlogId,
          blog: blog // Pass entire blog data to the template
        },
      })
    })

  } catch (error) {
    reporter.panicOnBuild(
      `There was an error fetching blog posts from the API`,
      error
    )
  }
}

// Remove the onCreateNode and createSchemaCustomization functions 
// as we're now using REST API data directly