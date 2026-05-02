"use client";
import { useState } from "react";
import {z} from 'zod';

const zodFormSchema = z
  .object({
    username: z.string().min(8, "username must be 5 characters at least"),
    email: z.string().email("invalid email format"),
    password: z.string().min(8, "password must be 8 characters at least"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "password is not match",
    path: ["confirmPassword"],
  }); 

export default function SignUpPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const registerUser = async(e: React.FormEvent) => {
        e.preventDefault();
        try{
            const body = {username, email, password, confirmPassword};
            
            const parsed = zodFormSchema.safeParse(body);

            if(!parsed.success){
                return parsed.error.issues.map((issue: any)=> ({
                    field: issue.path.join('.'),
                    message: issue.message,
                }))
            };

            const baseUrl = process.env.base_url;

            const res = await fetch(`${baseUrl}/api/signup`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({username, email, password}),
            });

            if(!res.ok){
                throw new Error('fetching data failed');
            }

            const data = await res.json();

            return data;

        }catch(err){
            console.error("error: ",err)
        }
    }




  return(
<></>
  )
}
