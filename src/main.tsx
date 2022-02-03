import React, {lazy, Suspense} from 'react'
import ReactDOM from 'react-dom'
import {CookiesProvider} from "react-cookie";
import {Provider} from "urql";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import {LOGIN_ROUTE, REGISTER_ROUTE} from "./global/constant/route";
import {client} from "./global/utils/urql";

const Login = lazy(() => import("./auth/pages/login"));
const Register = lazy(() => import("./auth/pages/register"));
const NewPost = lazy(() => import("./post/pages/new.post"));
const Index = lazy(() => import("./global/pages"));

import './styles/index.css'
import Layout from "./global/component/layout";
import IsUserRedirect from "./auth/component/user.redirect.route";
import RequireAuth from "./auth/component/require.auth";

ReactDOM.render(
    <React.StrictMode>
        <CookiesProvider>
            <Provider value={client}>
                <BrowserRouter>
                    <Layout>
                        <Suspense fallback={"loading..."}>
                            <Routes>
                                <Route path="post/new" element={
                                    <RequireAuth>
                                        <NewPost/>
                                    </RequireAuth>
                                }/>
                                <Route path={REGISTER_ROUTE}
                                       element={
                                           <IsUserRedirect loggedInPath="/">
                                               <Register/>
                                           </IsUserRedirect>
                                       }/>
                                <Route path={LOGIN_ROUTE}
                                       element={
                                           <IsUserRedirect loggedInPath="/">
                                               <Login/>
                                           </IsUserRedirect>
                                       }/>
                                <Route path="/" element={<Index/>}/>
                            </Routes>
                        </Suspense>
                    </Layout>
                </BrowserRouter>
            </Provider>
        </CookiesProvider>
    </React.StrictMode>,
    document.getElementById('root')
)
