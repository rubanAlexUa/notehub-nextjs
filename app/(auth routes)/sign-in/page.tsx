"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./SignIn.module.css";
import { login } from "@/lib/api/clientApi";
import { LoginRequest } from "@/lib/api/clientApi";
import { ApiError } from "@/lib/api/api";
import { useAuthStore } from "@/lib/store/authStore";

const Login = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    try {
      const data = Object.fromEntries(formData) as LoginRequest;
      const responce = await login(data);
      if (responce) {
        setUser(responce);
        router.push("/profile");
      } else {
        setError("Oops... some error");
      }
    } catch (error) {
      setError(
        (error as ApiError).response?.data.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <form className={css.form} action={handleSubmit}>
        <h1 className={css.formTitle}>Sign in</h1>

        <div className={css.formGroup}>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            name="email"
            className={css.input}
            required
          />
        </div>

        <div className={css.formGroup}>
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            name="password"
            className={css.input}
            required
          />
        </div>

        <div className={css.actions}>
          <button type="submit" className={css.submitButton}>
            Log in
          </button>
        </div>

        <p className={css.error}>{error}</p>
      </form>
    </main>
  );
};

export default Login;
