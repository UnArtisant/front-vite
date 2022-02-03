import {usePostsQuery} from "../../generated/graphql";
import PostCard from "../../post/component/post.card";

function Index() {
    const [{data, fetching}] = usePostsQuery({
        variables: {
            limit: 10
        }
    })
    return <div className="container mx-auto">
            <div className="my-14">
                {fetching && "loading"}
                {!fetching && data?.posts?.map(item => (
                    <div key={item.id} className="my-4 flex justify-center">
                        <PostCard post={item} />
                    </div>
                ))}
            </div>
        </div>
}

export default Index