import {usePostsQuery} from "../../generated/graphql";
import PostCard from "../../post/component/post.card";
import {useState} from "react";
import InfiniteScroll from "react-infinite-scroll-component";

function Index() {
    const [offset, setOffset] = useState(0)
    const [{data}] = usePostsQuery({
        variables: {
            limit: 10,
            offset: offset
        }
    })
    return <div className="container mx-auto">
            <div className="my-14">
                <InfiniteScroll
                    dataLength={data?.posts.posts.length || 0} //This is important field to render the next data
                    next={() => setOffset(o => o + 1)}
                    hasMore={data?.posts.hasMore || true}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <p style={{ textAlign: 'center' }}>
                            <b>Yay! You have seen it all</b>
                        </p>
                    }
                >
                    {data?.posts.posts?.map((item,k) => (
                        <div key={k} className="my-4 flex justify-center">
                            <PostCard post={item} />
                        </div>
                    ))}
                </InfiniteScroll>
            </div>
        </div>
}

export default Index