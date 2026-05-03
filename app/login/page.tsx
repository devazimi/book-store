"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { z } from "zod";

const zodSchema = z.object({
  username: z.string(),
  email: z.string().email("فرمت ایمیل صحیح نمی باشد"),
  password: z.string(),
});

export default function LoginPage() {
  const searchParams = useSearchParams();
  const registered = searchParams.get("registered");
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const loginHandler = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    try {
      const body = { username, email, password };

      const parsed = zodSchema.safeParse(body);

      if (parsed.error) {
        console.log("parsed error");
        const fieldErrors: Record<string, string> = {};
        parsed.error.issues.forEach((issue) => {
          const field = issue.path[0] as string;
          fieldErrors[field] = issue.message;
        });

        return setErrors(fieldErrors);
      }

      const fetchUser = await signIn("credentials", {
        username,
        email,
        password,
        redirect: false,
      });

      if (fetchUser?.error) {
        console.log("error: ", fetchUser?.error);
        throw new Error("error here")
      }

      if (fetchUser?.ok) {
        router.push("/main");
      }
    } catch (err) {
      console.error("error login user: ", err);
    }
  };

  return (
    // container
    <div className="flex min-w-screen w-full p-4 justify-center items-center">
      {/* form */}
      <form
        onSubmit={loginHandler}
        className="flex w-full max-w-md flex-col bg-white gap-5 rounded-2xl bg-white p-8 shadow-lg "
      >
        {registered && (
          <h1 className="text-center text-md font-bold text-gray-500">
            ثبت نام با موفقیت انجام شد ✅
          </h1>
        )}
        <h1 className="text-center text-md font-bold text-gray-500 mb-5">
          لطفا وارد شوید
        </h1>
        {/* input */}
        <input
          className={`w-full border rounded-xl px-4 py-3 text-right transition-colors
              focus:outline-none focus:border-[#4b7995] focus:ring-2 focus:ring-[#4b7995]/20 
              ${errors.username ? `border-red-200` : `border-gray-300`}
              `}
          aria-label="username..."
          placeholder="نام کاربری..."
          value={username}
          onChange={(e) => {
            setUsername(e.target.value);
            if (errors.username) {
              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.username;
                return newErrors;
              });
            }
          }}
          required
        />
        {errors.username && (
          <p className="text-red-500 text-xs text-right">{errors.username}</p>
        )}
        {/* input */}
        <input
          className={`w-full border rounded-xl px-4 py-3 text-right transition-colors
              focus:outline-none focus:border-[#4b7995] focus:ring-2 focus:ring-[#4b7995]/20 
              ${errors.email ? `border-red-200` : `border-gray-300`}
              `}
          aria-label="email..."
          placeholder="آدرس ایمیل..."
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (errors.email) {
              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.email;
                return newErrors;
              });
            }
          }}
          required
        />
        {errors.email && (
          <p className="text-red-500 text-xs text-right">{errors.email}</p>
        )}
        {/* input */}
        <input
          className={`w-full border rounded-xl px-4 py-3 text-right transition-colors
              focus:outline-none focus:border-[#4b7995] focus:ring-2 focus:ring-[#4b7995]/20 
              ${errors.password ? `border-red-200` : `border-gray-300`}
              `}
          aria-label="password"
          placeholder="کلمه عبور..."
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
            if (errors.password) {
              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.password;
                return newErrors;
              });
            }
          }}
          required
        />
        {errors.password && (
          <p className="text-red-500 text-xs text-right">{errors.password}</p>
        )}

        {/* button */}
        <button
          type="submit"
          className="mt-2 w-full py-3 bg-[#4b7995] text-white rounded-xl transition-colors 
          hover:bg-[#3a6178] focus:ring-2 focus:ring-gray-[#4b7995]/50 focus:outline-none cursor-pointer"
        >
          ورود
        </button>
      </form>
    </div>
  );
}
