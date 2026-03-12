"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

type Props = {
  children: React.ReactNode;
};

const AuthLayout = ({ children }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    router.refresh();
    setIsLoading(false);
  }, [isLoading]);

  return <>{isLoading ? <div>Loading...</div> : children}</>;
};

export default AuthLayout;
