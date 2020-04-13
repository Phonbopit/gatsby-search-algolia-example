const postQuery = `{
  posts: allMarkdownRemark {
    edges {
      node {
        objectID: id
        fields {
          slug
        }
        frontmatter {
          title
          date(formatString: "MMM D, YYYY")
        }
        excerpt(pruneLength: 3000)
      }
    }
  }
}`

const flatten = arr =>
  arr.map(({ node: { frontmatter, ...rest } }) => ({
    ...frontmatter,
    ...rest,
  }))

const settings = {
  attributesToSnippet: [`excerpt:20`],
  attributeForDistinct: "slug",
  distinct: true,
}

const queries = [
  {
    query: postQuery,
    transformer: ({ data }) => flatten(data.posts.edges),
    indexName: `Posts`,
    settings,
  },
]

module.exports = queries
