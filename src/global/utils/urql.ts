import {createClient, dedupExchange, fetchExchange} from "urql";
import {cacheExchange} from "@urql/exchange-graphcache";
import {logoutCache} from "../../auth/graphql/cache/logout";
import {loginCache} from "../../auth/graphql/cache/login";
import {registerCache} from "../../auth/graphql/cache/register";
import {devtoolsExchange} from "@urql/devtools";
import cookie from "cookie";
import {USER_COOKIES} from "../../auth/constant/security.constant";

const token = document.cookie ? cookie.parse(document.cookie)?.[USER_COOKIES] : null

export const client = createClient({
    url: 'http://localhost:4000/graphql',
    fetchOptions: {
        headers: {
            Authorization: token
                ? `Bearer ${token ?? ''}`
                :  '',
        },
    },
    exchanges: [
        dedupExchange,
        cacheExchange({
            updates: {
                Mutation: {
                    logout: logoutCache,
                    login: loginCache,
                    register: registerCache
                }
            }
        }),
        fetchExchange,
        devtoolsExchange,
    ],
});