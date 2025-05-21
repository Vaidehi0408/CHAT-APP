import React, { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { authUser, setAuthUser } = useAuthContext();
  const signup = async ({
    fullName,
    userName,
    password,
    confirmedPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      userName,
      password,
      confirmedPassword,
      gender,
    });

    if (!success) return;

    setLoading(true);

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({
          fullName,
          userName,
          password,
          confirmedPassword,
          gender,
        }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return { loading, signup };
};

export default useSignup;

const handleInputErrors = ({
  fullName,
  userName,
  password,
  confirmedPassword,
  gender,
}) => {
  if (!fullName || !userName || !password || !confirmedPassword || !gender) {
    toast.error("Please Fill All The Fields!");
    return false;
  }

  if (password !== confirmedPassword) {
    toast.error("Password & Confirm Password do not match!");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password Must Be Atleast 6 Characters!");
    return false;
  }

  return true;
};
