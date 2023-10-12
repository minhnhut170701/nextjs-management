"use client";
import Image from "next/image";
import { BsTrashFill } from "react-icons/bs";
import React, { useEffect, useState } from "react";
import ModalAdd from "./ModalAdd";
import { useRouter } from 'next/navigation'
import { logout } from "@/feature/User/UserSlice";
import { useSelector, useDispatch } from "react-redux";

function UserDashboard({ productData }) {
  const [checkedRows, setCheckedRows] = useState([]);
  const [isCheckedForTable, setIsCheckedForTable] = useState(false);
  const {user} = useSelector((state) => state.user)
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('')
  const [searchResults, setSearchResults] = useState([]); 
  const [userList, setUserList] = useState(productData)
  const onChecked = (e, id) => {
    if (e.target.checked) {
      setCheckedRows((prevCheckedRows) => [...prevCheckedRows, id]);
      setIsCheckedForTable(true);
    } else {
      setCheckedRows((prevCheckedRows) =>
        prevCheckedRows.filter((rowId) => rowId !== id)
      );
    }
  };

  
  const router = useRouter()
 
  
  useEffect(() => {
    if (!user) {
      // User is not logged in, redirect to login page
      router.push("/login");
    }
  }, []);

  useEffect(() => {
    if (checkedRows.length == 0) {
      setIsCheckedForTable(false);
    }
  }, [checkedRows]);

  const handleLogout = () => {
    dispatch(logout());
    router.push('/login');
  };


  const handleSearch = async (e) =>{
    e.preventDefault()
    try {
      const response = await fetch('https://nextjs13-ecommerce.onrender.com/api/user/find/email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: searchText }),
      });

      if (response.ok) {
        const data = await response.json();
        setSearchResults([data]);
        console.log('data nè: ', data);
      } else {
        console.error('lỗi xuất dữ liệu')
      }
    } catch (error) {
      console.log('Lỗi api')
    }
  }

  const fetchUser = async () =>{
    try {
      const res = await fetch(
        "https://nextjs13-ecommerce.onrender.com/api/user/all",
        { cache: 'no-cache' }
      );
  
      if (res.ok) {
        const userList = await res.json();
        setUserList(userList)
      }
    } catch (error) {
      console.log("lỗi server");
    }
  }

  const handleRemoveUser = async (userId) =>{
    const labelElement = document.querySelector(
      '.modal-action label[for="my-modal-4"]'
    );
    try {
      if (labelElement) {
        labelElement.click();
      }
      const response = await fetch(`https://nextjs13-ecommerce.onrender.com/api/user//remove/${userId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {  
        await fetchUser()
        setIsCheckedForTable(false)
        setCheckedRows([])
      } else {
        console.error('lỗi xuất dữ liệu')
      }
    } catch (error) {
      console.log('Lỗi api')
    }
  }


  return (
    <>
    <button className="pb-4" onClick={handleLogout}>Admin Name: <span className="font-bold">{user ? user.name : ''}</span></  button>
      <form className="w-[1100px] flex items-center space-x-2 justify-center" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Tìm kiếm người dùng"
          className="p-4 w-[90%] border"
          onChange={(e) => setSearchText(e.target.value)}
        />
        <button type="submit" className="p-4 bg-blue-500 text-white w-28">Tìm kiếm</button>
      </form>
      {/* table */}
      <div className="mt-10 max-w-[1150px] w-full">
        <div className="overflow-x-auto w-full h-[500px] overflow-y-auto">
          <table className="table w-full">
            {/* head */}
            <thead>
              <tr>
                <th></th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>CartID</th>
                {isCheckedForTable && <th>Xóa</th>}
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {(searchResults.length > 0 ? searchResults : userList).map((item, i) => {
                const rowId = `row_${i}`;
                const isChecked = checkedRows.includes(rowId);
                return (
                  <tr key={i}>
                    <th>
                      <label>
                        <input
                          type="checkbox"
                          className="checkbox"
                          onChange={(e) => onChecked(e, rowId)}
                        />
                      </label>
                    </th>
                    <td>
                      <div className="flex items-center space-x-6">
                        <Image
                          src="https://images.unsplash.com/photo-1661956600655-e772b2b97db4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=435&q=80"
                          alt={item.userName}
                          width={300}
                          height={300}
                          className="object-cover w-[50px] h-[50px]"
                        />
                        <p>{item.userName}</p>
                      </div>
                    </td>
                    <td>{item.email}</td>
                    <td>{item.cart[0]}</td>
                    {isChecked && (
                      <td>
                        <label htmlFor="my-modal-4" className="btn">
                          <BsTrashFill />
                        </label>
                        <input
                          type="checkbox"
                          id="my-modal-4"
                          className="modal-toggle"
                        />
                        <label
                          htmlFor="my-modal-4"
                          className="modal cursor-pointer"
                        >
                          <label
                            className="modal-box relative max-w-[800px]"
                            htmlFor=""
                          >
                            <h3 className="text-lg font-bold">
                              Bạn có chắc muốn xóa?
                            </h3>
                            <p className="py-4">
                              Sau khi chấp nhận, người dùng sẽ xóa vĩnh viễn
                              khỏi web
                            </p>
                            <div className="flex items-center justify-end space-x-5">
                              <div className="modal-action mt-0">
                                <label
                                  htmlFor="my-modal-4"
                                  className="p-2 bg-gray-400 rounded-md cursor-pointer"
                                >
                                  Hủy
                                </label>
                              </div>

                              <button className="p-2 bg-red-400 text-white rounded-md" onClick={() => handleRemoveUser(item._id)}>
                                Chấp nhận
                              </button>
                            </div>
                          </label>
                        </label>
                      </td>
                    )}
                  </tr>
                );
              })}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>Tên người dùng</th>
                <th>Email</th>
                <th>CartID</th>
                {isCheckedForTable && <th className=" text-black">Xóa</th>}
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </>
  );
}

export default UserDashboard;
