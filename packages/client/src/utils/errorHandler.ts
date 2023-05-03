import { toast } from 'react-hot-toast'

export const errorHandler = async(error: any) => {

	if(error.data.httpStatus === 401){
		
		toast.error('Session expired, please login again')
		localStorage.removeItem('user')
		window.location.href = '/login'
	}
	
    
	if (error && error.data?.zodError) {
		let message = JSON.parse(error.message)
		let zodError = message[0].message
		toast.error(zodError)
		
		
	} else if (error && error.data?.prismaError) {
		let message = error.data?.prismaError?.meta.target[0]

		toast.error(`${message} already in use`)
	} else {
		
		toast.error(error.message)
		
	}
}
