import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserPage = () => {
  let navigate = useNavigate();
  const { userId } = useParams();
  const user = useSelector((state) => state.user);

  useEffect(() => {
    if (user.id !== null && user.id !== userId) {
      navigate(`/user/${user.id}`);
    }

    if (user.id === null) {
      navigate(`/login`);
    }

    document.title = `${user.firstName} ${user.lastName} - Livin it`;
  }, [user.id, navigate, userId, user.firstName, user.lastName]);

  return <div>{user.id}</div>;
};

export default UserPage;
