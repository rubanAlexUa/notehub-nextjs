"use client";
import css from "./Edit.module.css";
import { useAuthStore } from "@/lib/store/authStore";
import { updateMe } from "@/lib/api/clientApi";
import { useState } from "react";
import { useEffect } from "react";
import { getMe } from "@/lib/api/clientApi";
import Image from "next/image";
import { useRouter } from "next/navigation";

const Page = () => {
  const router = useRouter();

  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);
  const [username, setUsername] = useState(user?.username ?? "");
  const [email, setEmail] = useState("");
  useEffect(() => {
    const fetchUser = async () => {
      getMe().then((user) => {
        setUsername(user.username ?? "");
        setEmail(user.email);
        setUser(user);
      });
    };
    fetchUser();
  }, [setUser]);
  const handleSubmit = async () => {
    const updatedUser = await updateMe({ username });
    setUser(updatedUser);
    router.push("/profile");
  };
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <h1 className={css.formTitle}>Edit Profile</h1>

        <Image
          src={user?.avatar || "/my-avatar.png.png"}
          alt="User Avatar"
          width={120}
          height={120}
          className={css.avatar}
        />

        <form className={css.profileInfo} action={handleSubmit}>
          <div className={css.usernameWrapper}>
            <label htmlFor="username">Username: {username}</label>
            <input
              id="username"
              type="text"
              className={css.input}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <p>Email: {email}</p>

          <div className={css.actions}>
            <button type="submit" className={css.saveButton}>
              Save
            </button>
            <button type="button" className={css.cancelButton}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </main>
  );
};

export default Page;
