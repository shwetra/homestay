// src/app/blog/[slug]/page.tsx
'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useParams, useRouter } from 'next/navigation'

interface User {
  first_name: string
  last_name: string
  profile_src: string
}

interface BlogPost {
  id: number
  title: string
  slug: string
  description: string
  image: string
  content: string
  created_at: string
  user: User
}

const BlogPostPage = () => {
  const { slug } = useParams()
  const router = useRouter()

  const [post, setPost] = useState<BlogPost | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `https://homestay.kliffhost.in/api/blog/${slug}`,
          {
            headers: {
              'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY || '',
            },
          }
        )
        setPost(res?.data.data.posts[0])
      } catch (err) {
        console.error(err)
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    if (slug) fetchData()
  }, [slug])

  if (loading) return <div className="p-10 text-center">Loading...</div>
  if (error || !post) return <div className="p-10 text-center">Blog not found</div>

console.log(post,"jsadjslajk")



  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
     

      <Image
        src={post.image}
        alt={post.title}
        width={800}
        height={400}
        className="w-full rounded-xl mb-6"
      />

      

<h1 className="text-4xl font-bold mb-4">{post?.title}</h1>

<div className="flex items-center gap-4 mb-6">
  <Image
    src={post.image}
    alt={post.title}
    width={50}
    height={50}
    className="rounded-full"
  />
  <div>
    {/* <p className="text-lg font-medium">
      {post.title} 
    </p> */}

    <p className="text-lg font-medium">
      {post.description} 
    </p>
    <p className="text-sm text-gray-500">
      {new Date(post.created_at).toLocaleDateString()}
    </p>
  </div>
</div>


<div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />

    </div>
  )
}

export default BlogPostPage
