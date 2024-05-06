import React from "react";

const UserDetails = ({ user }) => {
  return (
    <div>
      <h1>Hello, {user.name}</h1>
      <h2>Your role is {user.role}.</h2>
    </div>
  );
};

export default UserDetails;
