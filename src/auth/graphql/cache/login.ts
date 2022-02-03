import {betterUpdateQuery} from "../../../global/helpers/updateQueryUrql";
import {LoginMutation, UserDocument, UserQuery} from "../../../generated/graphql";
import {Cache, DataField, ResolveInfo, Variables} from "@urql/exchange-graphcache";

export const loginCache = (_result: DataField, args: Variables, cache: Cache, _: ResolveInfo ) => {
    betterUpdateQuery<LoginMutation, UserQuery>(
        cache,
        { query: UserDocument },
        _result,
        //@ts-ignore
        (result, query) => {
            if (result.login.errors) {
                return query;
            } else {
                return {
                    user: result.login.user,
                };
            }
        }
    )
}