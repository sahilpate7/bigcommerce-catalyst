import { getCategoryTree } from '~/client/queries/get-category-tree';
import {BlogPostCard} from "~/components/blog-post-card";
import Image from 'next/image';

// interface Props {
//     params: {
//         limit: number;
//     };
// }

export default async function CategoryList() {
    const categoryTree = await getCategoryTree();
    console.log('Data:' + JSON.stringify(categoryTree))
    return (
        <div className="bg-gray-100 py-12">
            <div className={' px-6 2xl:container sm:px-10 lg:px-12 2xl:mx-auto'}>
                <h2 className="text-3xl font-black lg:text-4xl mb-10">Top Categories</h2>
                <div className={'blogList grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'}>
                    {
                        categoryTree.map((category)=>{
                            let imageURL = category.image?.urlOriginal;
                            return(
                            <div>
                                <p>{category.name}</p>
                                <Image 
                                    src={imageURL || '/default-image.jpg'}
                                    width={800}
                                    height={500}
                                    alt='Category Image'
                                />
                            </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}
