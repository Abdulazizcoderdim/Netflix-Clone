import * as z from "zod";

export const createAccountSchema = z.object({
    name: z.string().min(3, { message: "Name must be at least 3 characters" }).max(15, { message: "Name must be less than 8 characters" }),
    pin: z.string().min(4).max(4),
})

export const loginSchema = z.object({
    pin: z.string().min(4).max(4),
})