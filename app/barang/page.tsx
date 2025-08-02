'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function UsersPage() {
  const [users, setUsers] = useState<any[]>([]);
  const router = useRouter(); // ✅ fix: tambahkan router

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) {
      router.replace('/');
    } else {
      // Fetch data hanya jika token ada
      fetch('/api/data')
        .then((res) => res.json())
        .then((data) => setUsers(data))
        .catch((err) => console.error('Error fetch:', err));
    }
  }, [router]);

  return (
    <div className="p-4 text-white">
      <h1 className="text-2xl font-bold mb-4">Data Produk</h1>

      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-600 text-sm">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="border px-4 py-2 text-left">ID</th>
              <th className="border px-4 py-2 text-left">Nama Produk</th>
              <th className="border px-4 py-2 text-left">Brand</th>
              <th className="border px-4 py-2 text-left">Owner</th>
            </tr>
          </thead>
          <tbody className="bg-gray-700">
            {users.length > 0 ? (
              users.map((user) => (
                <tr key={user.product_id ?? user.id}>
                  <td className="border px-4 py-2">{user.id}</td>
                  <td className="border px-4 py-2">{user.product_name}</td>
                  <td className="border px-4 py-2">{user.product_brand}</td>
                  <td className="border px-4 py-2">
                    {user.products_owners ?? (
                      <span className="italic text-gray-400">Tidak ada</span>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-4 text-gray-400">
                  Tidak ada data
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
