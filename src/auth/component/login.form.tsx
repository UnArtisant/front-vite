import Input from "../../global/component/input";
import React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import registerSchema from "../schema/register.schema";
import {useLoginMutation} from "../../generated/graphql";
import {USER_COOKIES} from "../constant/security.constant";
import {useCookies} from "react-cookie";
import {REGISTER_ROUTE} from "../../global/constant/route";
import {Link, useLocation, useNavigate} from "react-router-dom";

interface loginFormInterface {}

type Inputs = {
    username: string,
    password: string,
}

function LoginForm ({} : loginFormInterface) {

    const [,loginCallBack] = useLoginMutation()
    const [, setCookie] = useCookies([USER_COOKIES])

    const navigate = useNavigate();
    const location = useLocation();
    //@ts-ignore
    const from = location.state?.from?.pathname || "/";

    const {register, handleSubmit, formState: {errors}, setError, reset} = useForm<Inputs>({
        mode: "onBlur",
        resolver: yupResolver(registerSchema)
    });

    const onSubmit: SubmitHandler<Inputs> = async data => {
        const response = await loginCallBack(data)
        const errors = response.data?.login.errors
        if(errors) {
            errors.forEach((error) => {
                // @ts-ignore
                setError(error.field, {
                    type: "manual",
                    message: error.message,
                });
            })
        } else if (response.data?.login.user){
            setCookie(USER_COOKIES, response.data.login.user.access_token, {
                path: "/",
                maxAge: 3600, // Expires after 1hr
                sameSite: true,
            })
            await navigate(from)
        }
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6" >
            <div>
                <label htmlFor="username" className="block text-sm font-medium text-gray-700">
                    Username
                </label>
                <div className="mt-1">
                    <Input ref={{...register('username', {required: true})}}
                           error={!!errors?.username}
                           errorMessage={errors?.username?.message}
                           id="username"
                           type={"text"}
                           placeholder={"Ex: john Doe"}
                           name={"username"}/>
                </div>
            </div>

            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                </label>
                <div className="mt-1">
                    <Input
                        error={!!errors?.password}
                        placeholder={"*********"}
                        errorMessage={errors?.password?.message}
                        ref={{...register('password', {required: true})}}
                        id="password"
                        name="password"
                        type="password"
                    />
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex items-center">
                    <input
                        id="remember-me"
                        name="remember-me"
                        type="checkbox"
                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                        Remember me
                    </label>
                </div>

                <div className="text-sm">
                    <Link to={REGISTER_ROUTE}>
                        <a  className="font-medium text-indigo-600 hover:text-indigo-500">
                            register here!
                        </a>
                    </Link>
                </div>
            </div>

            <div>
                <button
                    type="submit"
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Sign in
                </button>
            </div>
        </form>
    )
}

export default LoginForm