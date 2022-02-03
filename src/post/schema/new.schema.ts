import * as yup from "yup"

export const newPost = yup.object({
    title: yup.string()
        .min(5, "Title can't be under 5 chars")
        .max(250, "Title can't have more than 250 chars"),
    text: yup.string()
        .min(20, "Body can't be under 20 chars")
        .max(1500, "Title can't have more than 1500 chars")
})