import { toast } from "react-hot-toast"

export const errorHandler = (error: any) => {

//zod error
    if(error && error.data?.zodError){
    let message = JSON.parse(error.message)
    let zodError = message[0].message

    toast.error(zodError)
} else if(error && error.data?.prismaError){
    let message = error.data?.prismaError?.meta.target[0]

    toast.error(`${message} already in use`);
    
} else {
    toast.error(error.message)
}



}