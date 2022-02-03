import Input from "../../global/component/input";
import TextArea from "../../global/component/textarea";
import {SubmitHandler, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import {newPost} from "../schema/new.schema";
import {useNewPostMutation} from "../../generated/graphql";
import {toast} from "react-hot-toast";

type Inputs = {
    title: string,
    text: string,
}

const NewForm = () => {

    const [, publish] = useNewPostMutation()

    const {register, handleSubmit, formState: {errors}, reset} = useForm<Inputs>({
        resolver: yupResolver(newPost),
        mode: "onBlur"
    })

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        const response = await publish(data)
        if(response.error?.message) {
            console.log(response.error?.message)
        } else {
            toast.success('Post Successfully posted!')
            reset({title: "", text: ""})
        }
    }

    return <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 divide-y divide-gray-200">
        <div className="space-y-8 divide-y divide-gray-200">
            <div>
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Post</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        This information will be displayed publicly so be careful what you share.
                    </p>
                </div>

            </div>

            <div className="pt-8">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Title</h3>
                    <p className="mt-1 text-sm text-gray-500">Use a nice title to hook up people</p>
                </div>
                <div className="mt-6 max-w-xl">
                    <Input label={"title"}
                           error={!!errors?.title}
                           errorMessage={errors?.title?.message}
                           ref={{...register("title", {required: true})}}
                           id={"title"}
                           type={"text"}
                           name={"title"}
                           placeholder={"Want to know a nice a tricks in css ?"}/>
                </div>
            </div>

            <div className="pt-8">
                <div>
                    <h3 className="text-lg leading-6 font-medium text-gray-900">Body</h3>
                    <p className="mt-1 text-sm text-gray-500">
                        Here, you can post all the informations you want about a topic of your choice!
                    </p>
                </div>
                <div className="mt-6 max-w-5xl">
                    <TextArea name={"text"}
                              error={!!errors?.text}
                              errorMessage={errors?.text?.message}
                              ref={{...register("text", {required: true})}}
                              id={"body"}
                              rows={15}
                              placeholder={"I like potatos"}
                              label={"Post"}/>
                </div>
            </div>
        </div>

        <div className="pt-5">
            <div className="flex justify-end">
                <button
                    type="button"
                    className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                    Save
                </button>
            </div>
        </div>
    </form>
}

export default  (NewForm)