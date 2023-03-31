import { z } from 'zod'

export const registerUserSchema = z
	.object({
		userName: z
			.string()
			.min(3)
			.max(20)
			.regex(/^[a-zA-Z0-9_]+$/),
		email: z.string().email().min(3),
		password: z
			.string()
			.min(6)
			.max(24)
			.regex(
				/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,24}$/
			),
		confirmPassword: z
			.string()
			.min(6)
			.max(24)
			.regex(
				/^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,24}$/
			),
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: 'Passwords do not match',
		path: ['confirmPassword'],
	})
