import cookie from "cookie"

export function parseCookies(req : any)  {
    if(req) {
        return cookie.parse(req?.headers?.cookie)
    }
    if(typeof window === 'object') {
        return cookie.parse(document?.cookie)
    }
    return {}
}