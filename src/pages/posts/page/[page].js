import { PageSEO } from '@/components/SEO'
import { DEFAULT_LOCALE, POSTS_PER_PAGE } from '@/constants/siteMeta'
import siteMetadata from '@/data/siteMetadata'
import ListLayout from '@/layouts/ListLayout'
import { getAllFilesFrontMatter, POSTS_FOLDER } from '@/lib/mdx'

export async function getStaticPaths() {
  // TODO might have problem in the future if totalPosts in en and zh-TW are different
  const totalPosts = await getAllFilesFrontMatter(POSTS_FOLDER, DEFAULT_LOCALE)
  const totalPages = Math.ceil(totalPosts.length / POSTS_PER_PAGE)
  const paths = Array.from({ length: totalPages }, (_, i) => ({
    params: { page: (i + 1).toString() },
  }))

  return {
    paths,
    fallback: false,
  }
}

export async function getStaticProps(context) {
  const {
    params: { page },
    locale,
  } = context
  const posts = await getAllFilesFrontMatter(POSTS_FOLDER, locale)
  const pageNumber = parseInt(page)
  const initialDisplayPosts = posts.slice(
    POSTS_PER_PAGE * (pageNumber - 1),
    POSTS_PER_PAGE * pageNumber
  )
  const pagination = {
    currentPage: pageNumber,
    totalPages: Math.ceil(posts.length / POSTS_PER_PAGE),
  }

  return {
    props: {
      posts,
      initialDisplayPosts,
      pagination,
    },
  }
}

export default function PostPage({ posts, initialDisplayPosts, pagination }) {
  return (
    <>
      <PageSEO title={siteMetadata.title} description={siteMetadata.description} />
      <ListLayout
        posts={posts}
        initialDisplayPosts={initialDisplayPosts}
        pagination={pagination}
        title="All Posts"
      />
    </>
  )
}
