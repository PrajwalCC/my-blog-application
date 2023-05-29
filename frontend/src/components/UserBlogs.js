import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";

const backendURL= process.env.REACT_APP_BACKEND_URL;

const UserBlogs = () => {
  const [userBlogs, setUserBlogs] = useState(null);
  const id = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUserBlogs = async () => {
      try {
        const res = await axios.get(`${backendURL}/api/blog/user/${id}`);
        const data = res.data;
        console.log(data.Blog);
        setUserBlogs(data.Blog);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserBlogs();
  }, [id]);

  console.log(userBlogs);
  return (
    <div>
      {userBlogs &&
        userBlogs.map((blog, index) => (
          <Blog
            id={blog._id}
            key={index}
            isUser={true}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={userBlogs.name}
          />
        ))}
    </div>
  );
};

export default UserBlogs;
