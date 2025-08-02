
// import PagePlaceholder from '@/components/page-placeholder';

// export default function Home() {

//     return <PagePlaceholder pageName="Home" />;

// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      // Kalau tidak ada token, redirect ke login
      router.replace("/");
    } else {
      // Ambil data user (opsional)
      fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(res => res.json())
        .then(data => {
          setUsername(data.name);
          setLoading(false);
        })
        .catch(() => {
          // Token invalid, redirect
          localStorage.removeItem("token");
          router.replace("/");
        });
    }
  }, [router]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold">Welcome, {username}</h1>
      <p>You are now in the dashboard.</p>
      {/* <button
        onClick={() => {
          localStorage.removeItem("token");
          router.push("/");
        }}
        className="mt-4 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button> */}
    </div>
  );
}
