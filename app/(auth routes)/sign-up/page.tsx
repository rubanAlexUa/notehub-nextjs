"use client";
import css from "./SignUp.module.css";
import { register, RegisterRequets } from "@/lib/api/clientApi";
import { ApiError } from "@/lib/api/api";
import { useUserStore } from "@/lib/store/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignUp = () => {
  const [error, setError] = useState("");
  const router = useRouter();
  const setUser = useUserStore((state) => state.setUser);

  const handleSubmit = async (formData: FormData) => {
    const user = Object.fromEntries(formData) as RegisterRequets;
    try {
      const responce = await register(user);
      if (responce) {
        setUser(responce);
        router.push("/profile");
      } else {
        setError("Invalid email or password");
      }
    } catch (error) {
      setError(
        (error as ApiError)?.response?.data.error ??
          (error as ApiError).message ??
          "Oops... some error"
      );
    }
  };
  return (
    <main className={css.mainContent}>
      <h1 className={css.formTitle}>Sign up</h1>
      <form className={css.form} action={handleSubmit}>
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
            Register
          </button>
        </div>

        {error && <p>{error}</p>}
      </form>
    </main>
  );
};

export default SignUp;
