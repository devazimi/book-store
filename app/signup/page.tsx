"use client";
import { useState } from "react";
import { z } from "zod";

const zodFormSchema = z
  .object({
    username: z.string().min(5, "username must be 5 characters at least"),
    email: z.string().email("invalid email format"),
    password: z.string().min(8, "password must be 8 characters at least"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.confirmPassword === data.password, {
    message: "password is not match",
    path: ["confirmPassword"],
  });

export default function SignUpPage() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const registerUser = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const body = { username, email, password, confirmPassword };

      const parsed = zodFormSchema.safeParse(body);

      if (!parsed.success) {
        console.log("parsed error: ", parsed.error.flatten());
        return parsed.error.issues.map((issue: any) => ({
          field: issue.path.join("."),
          message: issue.message,
        }));
      }

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
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-right transition-colors
              focus:outline-none focus:border-[#4b7995] focus:ring-2 focus:ring-[#4b7995]/20"
          aria-label="username..."
          placeholder="نام کاربری..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        {/* input */}
        <input
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-right transition-colors
              focus:outline-none focus:border-[#4b7995] focus:ring-2 focus:ring-[#4b7995]/20"
          aria-label="username..."
          placeholder="آدرس ایمیل..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* input */}
        <input
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-right transition-colors
              focus:outline-none focus:border-[#4b7995] focus:ring-2 focus:ring-[#4b7995]/20"
          aria-label="username..."
          placeholder="کلمه عبور..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* input */}
        <input
          className="w-full border border-gray-300 rounded-xl px-4 py-3 text-right transition-colors
              focus:outline-none focus:border-[#4b7995] focus:ring-2 focus:ring-[#4b7995]/20"
          aria-label="username..."
          placeholder="تکرار کلمه عبور..."
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        {/* button */}
        <button
          type="submit"
          className="mt-2 w-full py-3 bg-[#4b7995] text-white rounded-xl transition-colors hover:bg-[#3a6178]
           focus:ring-2 focus:ring-gray-[#4b7995]/50 focus:outline-none"
        >
          ثبت نام
        </button>
      </form>
    </div>
  );
}
