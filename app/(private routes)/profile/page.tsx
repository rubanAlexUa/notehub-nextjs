import css from "./Profile.module.css";

import Image from "next/image";
import Link from "next/link";
import { getServerMe } from "@/lib/api/serverApi";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Notehub | Profile",
  description:
    "NoteHub is a simple and fast app to create, organize and manage your notes by tags. Stay productive and never lose an idea.",
  openGraph: {
    title: "NoteHub — Your Personal Note Manager",
    description:
      "NoteHub is a simple and fast app to create, organize and manage your notes by tags. Stay productive and never lose an idea.",
    url: "https://notehub.com/profile",
    images: [
      {
        url: "https://ac.goit.global/fullstack/react/notehub-og-meta.jpg",
        alt: "Notehub App",
        width: 1200,
        height: 630,
      },
    ],
    type: "article",
  },
};

const Profile = async () => {
  const user = await getServerMe();
  return (
    <main className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={user.avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {user.username ?? user.email}</p>
          <p>Email: {user.email}</p>
        </div>
      </div>
    </main>
  );
};

export default Profile;
