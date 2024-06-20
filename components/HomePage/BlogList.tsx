import {getBlogPosts} from "~/client/queries/get-blog-posts";
import {BlogPostCard} from "~/components/blog-post-card";

interface Props {
    params: {
        limit: number;
    };
}

export default async function BlogList({params: {limit}}: Props) {
    console.log('running');
    const blogPosts = await getBlogPosts({limit});
    // console.log('Data:' + JSON.stringify(blogPosts))
    return (
        <div className="bg-gray-100 py-12">
            <div className={' px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto'}>
                <h2 className="text-3xl font-black lg:text-4xl mb-10">Recent blogs</h2>
                <div className={'blogList grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
                {blogPosts?.posts.items.map((post) => {
                        return <BlogPostCard blogPost={post} key={post.entityId}/>;
                    })}
                </div>
            </div>
        </div>
    )
}
