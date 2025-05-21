import React, { useState } from "react";
import GenderCheckBox from "./GenderCheckBox";
import useSignup from "../../hooks/useSignup";

const Signup = () => {
  const [inputs, setInputs] = useState({
    fullName: "",
    userName: "",
    password: "",
    confirmedPassword: "",
    gender: "",
  });

  const { loading, signup } = useSignup();

  const handleCheckBoxChange = (gender) => {
    setInputs({ ...inputs, gender });
  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    await signup(inputs);
  };
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold ">
          Sign &nbsp;
          <span className="text-blue-500">Up</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label className="label p-2">
              <span className="text-base label-text">Full Name</span>
            </label>
            <input
              type="text"
              placeholder="john Doe"
              className="w-full input input-bordered h-10"
              value={inputs.fullName}
              onChange={(e) => {
                setInputs({ ...inputs, fullName: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Username</span>
            </label>
            <input
              type="text"
              placeholder="john123"
              className="w-full input input-bordered h-10"
              value={inputs.userName}
              onChange={(e) => {
                setInputs({ ...inputs, userName: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Password"
              className="w-full input input-bordered h-10"
              value={inputs.password}
              onChange={(e) => {
                setInputs({ ...inputs, password: e.target.value });
              }}
            />
          </div>

          <div>
            <label className="label p-2">
              <span className="text-base label-text">Confirm Password</span>
            </label>
            <input
              type="text"
              placeholder="Enter Confirm Password"
              className="w-full input input-bordered h-10"
              value={inputs.confirmedPassword}
              onChange={(e) => {
                setInputs({ ...inputs, confirmedPassword: e.target.value });
              }}
            />
          </div>
          <div className="mt-2">
            <GenderCheckBox
              onCheckBoxChange={handleCheckBoxChange}
              selectGender={inputs.gender}
            />
          </div>

          <a
            href="/login"
            className="text-sm hover:underline hover:text-blue-600 mt-4 inline-block"
          >
            Already have an account?
          </a>

          <div>
            {!loading ? (
              <button className="btn btn-block btn-sm mt-2" disabled={loading}>
                Sign Up
              </button>
            ) : (
              <span className="loading loading-spinner"></span>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
