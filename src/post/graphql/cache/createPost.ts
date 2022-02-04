import {Cache, DataField, ResolveInfo, Variables} from "@urql/exchange-graphcache";

export const createPost = (_result: DataField, args: Variables, cache: Cache, _: ResolveInfo ) => {
  cache.invalidate("Query", "posts", {
      limit: 10,
      offset: 0
  })
}