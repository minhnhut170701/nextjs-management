import React from "react";
import UserDashboard from "../components/UserDashBoard";

const getUser = async () => {
  try {
    const res = await fetch(
      "https://nextjs13-ecommerce.onrender.com/api/user/all",
      { next: { revalidate: 60 } }
    );

    if (res.ok) {
      const userList = await res.json();
      return userList;
    }
  } catch (error) {
    console.log("lỗi server");
  }
};

async function UserManagement() {
  const userNe = await getUser();

  return (
    <main className="flex flex-col items-center h-screen justify-center max-w-[80%] w-full mx-auto">
      <UserDashboard productData={userNe} />
    </main>
  );
}

export default UserManagement;
