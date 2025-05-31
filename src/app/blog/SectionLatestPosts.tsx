'use client';

import React, { FC, useEffect, useState } from 'react';
import Heading from '@/shared/Heading';
import { PostDataType } from '@/data/types';
import Pagination from '@/shared/Pagination';
import ButtonPrimary from '@/shared/ButtonPrimary';
import Image from 'next/image';
import Link from 'next/link';
import PostTypeFeaturedIcon from '@/components/PostTypeFeaturedIcon';
import PostCardMeta from '@/components/PostCardMeta';
import CategoryBadgeList from '@/components/CategoryBadgeList';
import axios from 'axios';
import WidgetHeading1 from './WidgetHeading1';

export interface SectionLatestPostsProps {
	className?: string;
	postCardName?: 'card3';
}

const SectionLatestPosts: FC<SectionLatestPostsProps> = ({
	postCardName = 'card3',
	className = '',
}) => {
	const [categories, setCategories] = useState<any[]>([]);
	const [allPosts, setAllPosts] = useState<PostDataType[]>([]);
	const [filteredPosts, setFilteredPosts] = useState<PostDataType[]>([]);
	const [activeTag, setActiveTag] = useState<string>('all');

	const fetchData = async () => {
		try {
			const res = await axios.get(`https://homestay.kliffhost.in/api/blog-category`, {
				headers: {
					'X-API-KEY': process.env.NEXT_PUBLIC_X_API_KEY || '',
				},
			});

			const categoriesData = res.data?.data?.category || [];

			const allPostsData: PostDataType[] = categoriesData.flatMap((cat: any) =>
				cat.posts.map((post: any) => ({
				  id: post.id,
				  title: post.title,
				  href: `/blog/${post.slug}`,
				  featuredImage: post.image,
				  slug:post.slug,
				  desc: post.description,
				  created_at:post.created_at,
				  postType: 'standard',
				  categories: [{ name: cat.name }],
				  user: {
					id: post.user?.id,
					first_name: post.user?.first_name,
					last_name: post.user?.last_name,
					email: post.user?.email,
					profile_src: post.user?.profile_src,
				  },
				}))
			  );
			  

			setCategories(categoriesData);
			setAllPosts(allPostsData);
			setFilteredPosts(allPostsData);
		} catch (error) {
			console.error('Failed to fetch blog data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, []);

	const handleTagClick = (tag: string) => {
		setActiveTag(tag);

		if (tag === 'all') {
			setFilteredPosts(allPosts);
		} else {
			const filtered = allPosts.filter((post) =>
				post.categories.some((cat) => cat.name.toLowerCase() === tag.toLowerCase())
			);
			setFilteredPosts(filtered);
		}
	};

	return (
		<div className={`nc-SectionLatestPosts relative ${className}`}>
			<div className="flex flex-col lg:flex-row">
				<div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-14 overflow-y-auto h-screen scrollbar-hide">
					<Heading>Latest Blogs 🎈</Heading>
					<div className={`grid grid-cols-1 gap-6 md:gap-8`}>
						{filteredPosts.map((post) => (
							<div
								key={post.id}
								className="nc-Card3 group relative flex flex-col-reverse rounded-[40px] sm:flex-row sm:items-center"
							>
								<div className="flex flex-grow flex-col">
									<div className="mb-4 space-y-5">
										<CategoryBadgeList categories={post.categories} />
										<Link href={`/blog/${post.slug}`}>
											<h2 className="nc-card-title block text-xl font-semibold text-neutral-900 dark:text-neutral-100">
											<p className="line-clamp-2" title={post.title}>
													{post.title}
													</p>
											</h2>
											<div className="hidden sm:mt-2 sm:block">
												<span className="line-clamp-2.5 text-base text-neutral-500 dark:text-neutral-400">
													{post.desc}
												</span>
											</div>
										</Link>
										<PostCardMeta meta={post} />
									</div>
								</div>

								<div className=" imagesize mb-5 block flex-shrink-0 overflow-hidden rounded-3xl sm:mb-0 sm:ml-6 sm:w-56">
									<Link
										href={post.href as any}
										className="aspect-h-9 aspect-w-16 block h-0 w-full sm:aspect-h-16"
									>
										<Image
											fill
											src={post.featuredImage}
											alt={post.title}
											sizes="(max-width: 768px) 100vw, 400px"
										/>
										<span>
											<PostTypeFeaturedIcon
												className="absolute bottom-2 left-2"
												postType={post.postType}
												wrapSize="w-8 h-8"
												iconSize="w-4 h-4"
											/>
										</span>
									</Link>
								</div>
							</div>
						))}
					</div>

					<div className="mt-12 flex flex-col space-y-5 sm:flex-row sm:items-center sm:justify-between sm:space-x-3 sm:space-y-0 md:mt-20">
						<Pagination />
						{/* <ButtonPrimary loading>Show me more</ButtonPrimary> */}
					</div>
				</div>

				{/* Sidebar */}
				<div className="mt-24 w-full space-y-7 lg:mt-0 lg:w-2/5 lg:pl-10 xl:w-1/3 xl:pl-0">
					<div className="nc-WidgetTags overflow-hidden rounded-3xl bg-neutral-100 dark:bg-neutral-800">
						<WidgetHeading1 title="🏷 Filter" viewAll={{ label: 'View all', href: '/#' }} />
						<div className="flex flex-wrap p-4 xl:p-5">
							<button
								onClick={() => handleTagClick('all')}
								className={`m-1 rounded-lg border px-3 py-2 text-sm ${
									activeTag === 'all'
										? 'bg-blue-500 text-white'
										: 'bg-white text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300'
								}`}
							>
								All
							</button>
							{categories.map((tag) => (
								<button
									key={tag.id}
									onClick={() => handleTagClick(tag.name)}
									className={`m-1 rounded-lg border px-3 py-2 text-sm ${
										activeTag === tag.name
											? 'bg-blue-500 text-white'
											: 'bg-white text-neutral-600 hover:bg-neutral-200 dark:bg-neutral-700 dark:text-neutral-300'
									}`}
								>
									{tag.name}
								</button>
							))}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default SectionLatestPosts;

