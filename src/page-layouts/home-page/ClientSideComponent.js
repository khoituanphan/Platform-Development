"use client";

import React from "react";
import { useRouter } from "next/router";

function ClientSideComponent() {
  const router = useRouter();

  const handleAvatarClick = () => {
    // Xử lý sự kiện khi avatar được nhấp vào
    console.log('Avatar clicked');
  };

  return (
    <button onClick={handleAvatarClick} className="avatar-button">
      {/* Sử dụng Image component để hiển thị avatar */}
      <div className="avatar-container">
        <Image
          src="/user-avatar.png" // Đường dẫn đến hình ảnh avatar của người dùng
          alt="User Avatar"
          width={40} // Độ rộng của hình ảnh avatar
          height={40} // Độ cao của hình ảnh avatar
        />
      </div>
      <span className="avatar-text">Profile</span>
    </button>
  );
}

export default ClientSideComponent;
