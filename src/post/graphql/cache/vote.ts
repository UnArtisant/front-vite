import {
    VoteMutationVariables
} from "../../../generated/graphql";

export const vote = (_result, args, cache, info) => {
    const {postId, value} = args as VoteMutationVariables;
    const data = cache.resolve({ __typename: "Post", postId }, "_id")
    console.log(data)
}