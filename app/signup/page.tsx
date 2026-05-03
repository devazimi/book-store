"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { z } from "zod";

const zodFormSchema = z
  .object({
    username: z.string().min(5, "نام کاربری باید حداقل 5 حرف باشد"),
    email: z.string().email("فرمت ایمیل نا معتبر است"),
    password: z.string().min(8, "پسورد باید حداقل 8 حرف باشد"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "پسورد صحیح نمی باشد",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const router = useRouter();

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();

    setErrors({});

    const body = { username, email, password, confirmPassword };

    const parsed = zodFormSchema.safeParse(body);

    if (!parsed.success) {
      console.log("parsed error: ", parsed.error.flatten());
      const feildErrors: Record<string, string> = {};
      parsed.error.issues.forEach((issue) => {
        const field = issue.path[0] as string;
        feildErrors[field] = issue.message;
      });
      setErrors(feildErrors);
      return;
    }

    try {
      const res = await fetch(`/api/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      if (!res.ok) {
        console.log("error at try@");
        throw new Error("fetching data failed");
      }

      const data = await res.json();
      console.log("data: ", data);

      router.push("/login?registered=true");
      return data;
    } catch (err) {
      console.log("error: ", err);
      console.error("error: ", err);
    }
  };

  return (
    // container
    <div className="flex min-w-screen w-full p-4 justify-center items-center">
      {/* form */}
      <form
        onSubmit={registerUser}
        className="flex w-full max-w-md flex-col bg-white gap-5 rounded-2xl bg-white p-8 shadow-lg "
      >
        <h1 className="text-center text-md font-bold text-gray-500 mb-5">
          حساب خود را ایجاد کنید
        </h1>
        {/* input */}
        <input
          className={`w-full border rounded-xl px-4 py-3 text-right transition-colors
              focus:outline-none focus:border-[#4b7995] focus:ring-2 focus:ring-[#4b7995]/20 
              ${errors.email ? `border-red-200` : `border-gray-300`}
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
        {/* input */}
        <input
          className={`w-full border rounded-xl px-4 py-3 text-right transition-colors
              focus:outline-none focus:border-[#4b7995] focus:ring-2 focus:ring-[#4b7995]/20 
              ${errors.confirmPassword ? `border-red-200` : `border-gray-300`}
              `}
          aria-label="confirmPassword"
          placeholder="تکرار کلمه عبور..."
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
            if (errors.confirmPassword) {
              setErrors((prev) => {
                const newErrors = { ...prev };
                delete newErrors.confirmPassword;
                return newErrors;
              });
            }
          }}
          required
        />
        {errors.confirmPassword && (
          <p className="text-red-500 text-xs text-right">
            {errors.confirmPassword}
          </p>
        )}
        {/* button */}
        <button
          type="submit"
          className="mt-2 w-full py-3 bg-[#4b7995] text-white rounded-xl transition-colors 
          hover:bg-[#3a6178] focus:ring-2 focus:ring-gray-[#4b7995]/50 focus:outline-none cursor-pointer"
        >
          ثبت نام
        </button>
      </form>
    </div>
  );
}
