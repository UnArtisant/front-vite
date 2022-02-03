import {betterUpdateQuery} from "../../../global/helpers/updateQueryUrql";
import {RegisterMutation, UserDocument, UserQuery} from "../../../generated/graphql";
import {Cache, DataField, ResolveInfo, Variables} from "@urql/exchange-graphcache";

export const registerCache = (_result: DataField, args: Variables, cache: Cache, _: ResolveInfo ) => {
    betterUpdateQuery<RegisterMutation, UserQuery>(
        cache,
        { query: UserDocument },
        _result,
        //@ts-ignore
        (result, query) => {
            if (result.register.errors) {
                return query;
            } else {
                return {
                    user: result.register.user,
                };
            }
        }
    )
}