import React from 'react'
import { DEMO_POSTS } from '@/data/posts'
import { PostDataType } from '@/data/types'
import Avatar from '@/shared/Avatar'
import Badge from '@/shared/Badge'
import ButtonPrimary from '@/shared/ButtonPrimary'
import ButtonSecondary from '@/shared/ButtonSecondary'
import Comment from '@/shared/Comment'
import SocialsList from '@/shared/SocialsList'
import Textarea from '@/shared/Textarea'
import Image from 'next/image'
import travelhero2Image from '@/images/travelhero2.png'
import Link from 'next/link'
import { Route } from '@/routers/types'

const Page = () => {
	const renderHeader = () => {
		return (
			<header className="container rounded-xl">
				<div className="mx-auto max-w-screen-md space-y-5">
					<Badge href="/blog" color="purple" name="Traveler" />
					<h1
						className="max-w-4xl text-3xl font-semibold text-neutral-900 dark:text-neutral-100 md:text-4xl md:!leading-[120%] lg:text-4xl"
						title="Quiet ingenuity: 120,000 lunches and counting"
					>
						Keep up the spirit of the desire to travel around the world
					</h1>
					<span className="block pb-1 text-base text-neutral-500 dark:text-neutral-400 md:text-lg">
						We’re an online magazine dedicated to covering the best in
						international product design. We started as a little blog back in
						2002 covering student work and over time
					</span>

					<div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
					<div className="flex flex-col items-baseline sm:flex-row sm:justify-between">
						<div className="nc-PostMeta2 flex flex-shrink-0 flex-wrap items-center text-left text-sm leading-none text-neutral-700 dark:text-neutral-200">
							<Avatar
								containerClassName="flex-shrink-0"
								sizeClass="w-8 h-8 sm:h-11 sm:w-11 "
							/>
							<div className="ml-3">
								<div className="flex items-center">
									<a className="block font-semibold" href="/">
										Fones Mimi
									</a>
								</div>
								<div className="mt-[6px] text-xs">
									<span className="text-neutral-700 dark:text-neutral-300">
										May 20, 2021
									</span>
									<span className="mx-2 font-semibold">·</span>
									<span className="text-neutral-700 dark:text-neutral-300">
										6 min read
									</span>
								</div>
							</div>
						</div>
						<div className="mt-3 sm:ml-3 sm:mt-0">
							<SocialsList />
						</div>
					</div>
				</div>
			</header>
		)
	}

	const renderContent = () => {
		return (
			<div
				id="single-entry-content"
				className="dark:prose-dark prose prose-sm mx-auto !max-w-screen-md dark:prose-invert sm:prose lg:prose-lg"
			>
				<p>
					Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure vel
					officiis ipsum placeat itaque neque dolorem modi perspiciatis dolor
					distinctio veritatis sapiente, minima corrupti dolores necessitatibus
					suscipit accusantium dignissimos culpa cumque.
				</p>
				<p>
					It is a long established fact that a <strong>reader</strong> will be
					distracted by the readable content of a page when looking at its{' '}
					<strong>layout</strong>. The point of using Lorem Ipsum is that it has
					a more-or-less normal{' '}
					<a href="/#" target="_blank" rel="noopener noreferrer">
						distribution of letters.
					</a>{' '}
				</p>
				<ol>
					<li>We want everything to look good out of the box.</li>
					<li>
						{` Really just the first reason, that's the whole point of the plugin.`}
					</li>
					<li>
						{`   Here's a third pretend reason though a list with three items looks
            more realistic than a list with two items.`}
					</li>
				</ol>
				<h3>Typography should be easy</h3>
				<p>
					{`So that's a header for you — with any luck if we've done our job
        correctly that will look pretty reasonable.`}
				</p>
				<p>Something a wise person once told me about typography is:</p>
				<blockquote>
					<p>
						{` Typography is pretty important if you don't want your stuff to look
            like trash. Make it good then it won't be bad.`}
					</p>
				</blockquote>
				<p>
					{`        It's probably important that images look okay here by default as well:`}
				</p>
				<figure>
					<Image src={travelhero2Image} alt="blog" className="rounded-2xl" />
					<figcaption>
						Lorem ipsum dolor, sit amet consectetur adipisicing elit. Iure vel
						officiis ipsum placeat itaque neque dolorem modi perspiciatis dolor
						distinctio veritatis sapiente
					</figcaption>
				</figure>
				<p>
					{` Now I'm going to show you an example of an unordered list to make sure
          that looks good, too:`}
				</p>
				<ul>
					<li>So here is the first item in this list.</li>
					<li>{`In this example we're keeping the items short.`}</li>
					<li>{`Later, we'll use longer, more complex list items.`}</li>
				</ul>
				<p>{`And that's the end of this section.`}</p>
				<h2>Code should look okay by default.</h2>
				<p>
					I think most people are going to use{' '}
					<a href="https://highlightjs.org/">highlight.js</a> or{' '}
					<a href="https://prismjs.com/">Prism</a>{' '}
					{`or something if they want to
          style their code blocks but it wouldn't hurt to make them look`}{' '}
					<em>okay</em> out of the box, even with no syntax highlighting.
				</p>
				<p>
					{`   What I've written here is probably long enough, but adding this final
          sentence can't hurt.`}
				</p>

				<p>Hopefully that looks good enough to you.</p>
				<h3>We still need to think about stacked headings though.</h3>

				<p>
					Phew, with any luck we have styled the headings above this text and
					they look pretty good.
				</p>
			</div>
		)
	}

	const renderTags = () => {
		return (
			<div className="mx-auto flex max-w-screen-md flex-wrap">
				<a
					className="nc-Tag mb-2 mr-2 inline-block rounded-lg border border-neutral-100 bg-white py-2 text-sm text-neutral-600 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-600 md:px-4"
					href="##"
				>
					Garden
				</a>
				<a
					className="nc-Tag mb-2 mr-2 inline-block rounded-lg border border-neutral-100 bg-white py-2 text-sm text-neutral-600 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-600 md:px-4"
					href="##"
				>
					Jewelry
				</a>
				<a
					className="nc-Tag mb-2 mr-2 inline-block rounded-lg border border-neutral-100 bg-white py-2 text-sm text-neutral-600 hover:border-neutral-200 dark:border-neutral-700 dark:bg-neutral-700 dark:text-neutral-300 dark:hover:border-neutral-600 md:px-4"
					href="##"
				>
					Tools
				</a>
			</div>
		)
	}

	const renderAuthor = () => {
		return (
			<div className="mx-auto max-w-screen-md">
				<div className="nc-SingleAuthor flex">
					<Avatar sizeClass="w-11 h-11 md:w-24 md:h-24" />
					<div className="ml-3 flex max-w-lg flex-col space-y-1 sm:ml-5">
						<span className="text-xs uppercase tracking-wider text-neutral-400">
							WRITEN BY
						</span>
						<h2 className="text-lg font-semibold text-neutral-900 dark:text-neutral-200">
							<a href="/">Fones Mimi</a>
						</h2>
						<span className="text-sm text-neutral-500 dark:text-neutral-300 sm:text-base">
							There’s no stopping the tech giant. Apple now opens its 100th
							store in China.There’s no stopping the tech giant.
							<a className="text-primary-600 ml-1 font-medium" href="/">
								Readmore
							</a>
						</span>
					</div>
				</div>
			</div>
		)
	}

	const renderCommentForm = () => {
		return (
			<div className="mx-auto max-w-screen-md pt-5">
				<h3 className="text-xl font-semibold text-neutral-800 dark:text-neutral-200">
					Responses (14)
				</h3>
				<form className="nc-SingleCommentForm mt-5">
					<Textarea />
					<div className="mt-2 space-x-3">
						<ButtonPrimary>Submit</ButtonPrimary>
						<ButtonSecondary>Cancel</ButtonSecondary>
					</div>
				</form>
			</div>
		)
	}

	const renderCommentLists = () => {
		return (
			<div className="mx-auto max-w-screen-md">
				<ul className="nc-SingleCommentLists space-y-5">
					<li>
						<Comment />
						<ul className="mt-5 space-y-5 pl-4 md:pl-11">
							<li>
								<Comment isSmall />
							</li>
						</ul>
					</li>
					<li>
						<Comment />
						<ul className="mt-5 space-y-5 pl-4 md:pl-11">
							<li>
								<Comment isSmall />
							</li>
						</ul>
					</li>
				</ul>
			</div>
		)
	}

	const renderPostRelated = (post: PostDataType) => {
		return (
			<div
				key={post.id}
				className="group aspect-h-4 aspect-w-3 relative overflow-hidden rounded-3xl"
			>
				<Link href={post.href as Route} />
				<Image
					className="transform object-cover transition-transform duration-300 group-hover:scale-105"
					src={post.featuredImage}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
					alt=""
				/>
				<div>
					<div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black"></div>
				</div>
				<div className="flex flex-col items-start justify-end space-y-2.5 p-4 text-xs text-neutral-300">
					<Badge name="Categories" />
					<h2 className="block text-lg font-semibold text-white">
						<span className="line-clamp-2">{post.title}</span>
					</h2>

					<div className="flex">
						<span className="block truncate font-medium text-neutral-200 hover:text-white">
							{"jjksdlakj"}
						</span>
						<span className="mx-1.5 font-medium">·</span>
						<span className="truncate font-normal">{"no"}</span>
					</div>
				</div>
				<Link href={post.href as Route} />
			</div>
		)
	}

	return (
		<div className="nc-PageSingle pt-8 lg:pt-16">
			{renderHeader()}
			<div className="container my-10 sm:my-12">
				<Image className="w-full rounded-xl" src={travelhero2Image} alt="" />
			</div>

			<div className="nc-SingleContent container space-y-10">
				{renderContent()}
				{renderTags()}
				<div className="mx-auto max-w-screen-md border-b border-t border-neutral-100 dark:border-neutral-700"></div>
				{renderAuthor()}
				{renderCommentForm()}
				{renderCommentLists()}
			</div>
			<div className="relative mt-16 bg-neutral-100 py-16 dark:bg-neutral-800 lg:mt-24 lg:py-28">
				<div className="container">
					<h2 className="text-3xl font-semibold">Related posts</h2>
					<div className="mt-10 grid gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-3 xl:grid-cols-4">
						{/*  */}
						{DEMO_POSTS.filter((_, i) => i < 4).map(renderPostRelated)}
						{/*  */}
					</div>
				</div>
			</div>
		</div>
	)
}

export default Page
