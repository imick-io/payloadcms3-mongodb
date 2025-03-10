import type { Config } from 'src/payload-types'

import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { unstable_cache } from 'next/cache'

async function getLatestPosts() {
  const payload = await getPayload({ config: configPromise })

  const posts = await payload.find({
    collection: 'posts',
    draft: false,
    limit: 3,
    sort: '-publishedAt',
  })

  return posts.docs
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedLatestPosts = () =>
  unstable_cache(async () => getLatestPosts(), [], {
    tags: [`latest_posts`],
  })
