"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function DashboardPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<{
    name: string;
    email: string;
    avatar: string;
  } | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("/");
    } else {
      fetch("https://api.escuelajs.co/api/v1/auth/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          setProfile({
            name: data.name,
            email: data.email,
            avatar: data.avatar,
          });
          setLoading(false);
        })
        .catch(() => {
          localStorage.removeItem("token");
          router.replace("/");
        });
    }
  }, [router]);

  if (loading) {
    return <p className="text-white">Loading...</p>;
  }

  if (!profile) {
    return <p className="text-white">Gagal memuat profil.</p>;
  }

  return (
    <div className="text-white p-6">
      <h1 className="text-2xl font-bold mb-4">Welcome, {profile.name}</h1>

      <div className="bg-gray-800 p-4 rounded-lg shadow max-w-sm">
        <img
          src={profile.avatar}
          alt="Avatar"
          className="w-24 h-24 rounded-full mx-auto mb-4 border-2 border-white"
        />
        <h2 className="text-center text-lg font-semibold">{profile.name}</h2>
        <p className="text-center text-sm text-gray-300">{profile.email}</p>
      </div>

     
    </div>
  );
}
