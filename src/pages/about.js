import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { MDXRemote } from 'next-mdx-remote'

import {
  CustomH1,
  CustomH2,
  CustomH3,
  CustomH4,
  CustomH5,
  CustomH6,
} from '@/components/CustomHeading'
import CustomLink from '@/components/CustomLink'
import AuthorLayout from '@/layouts/AuthorLayout'
import { AUTHORS_FOLDER, getFileBySlug } from '@/lib/mdx'

const components = {
  a: CustomLink,
  h1: CustomH1,
  h2: CustomH2,
  h3: CustomH3,
  h4: CustomH4,
  h5: CustomH5,
  h6: CustomH6,
}

export async function getStaticProps({ locale }) {
  const authorDetails = await getFileBySlug(AUTHORS_FOLDER, ['easonchang'], locale)
  return {
    props: {
      ...(await serverSideTranslations(locale, ['common'])),
      authorDetails,
    },
  }
}

export default function About({ authorDetails }) {
  const { mdxSource, frontMatter } = authorDetails

  return (
    <AuthorLayout frontMatter={frontMatter}>
      <MDXRemote {...mdxSource} components={components} />
    </AuthorLayout>
  )
}
