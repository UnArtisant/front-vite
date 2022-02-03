import {betterUpdateQuery} from "../../../global/helpers/updateQueryUrql";
import {LogoutMutation, UserDocument, UserQuery} from "../../../generated/graphql";
import {DataField, Variables, Cache, ResolveInfo} from "@urql/exchange-graphcache";

export const logoutCache = (_result: DataField, args: Variables, cache: Cache, _: ResolveInfo ) => {
    //@ts-ignore
    betterUpdateQuery<LogoutMutation, UserQuery>(cache, {query: UserDocument}, _result, () => ({user: null}));
}