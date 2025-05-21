import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateJwtTokenAndSetCookie from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const { fullName, userName, password, confirmedPassword, gender } =
      req.body;

    if (password !== confirmedPassword) {
      return res
        .status(400)
        .json({ error: "Password & Confirmed Password both are diffrent!!" });
    }
    const user = await User.findOne({ userName });
    if (user) {
      return res.status(400).json({ error: "userName Already Exists!" });
    }
    //hash password here
    const boysProfilePic = `https://avatar.iran.liara.run/public/boy?username=${userName}`;
    const girlsProfilePic = `https://avatar.iran.liara.run/public/girl?username=${userName}`;

    let genders = gender.toLowerCase();
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      fullName,
      userName,
      password: hashedPassword,
      gender: genders,
      profilePic: genders == "male" ? boysProfilePic : girlsProfilePic,
    });

    if (newUser) {
      generateJwtTokenAndSetCookie(newUser._id, res);

      await newUser.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        userName: newUser.userName,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid User data" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { userName, password } = req.body;
    const user = await User.findOne({ userName });
    if (!user) {
      return res.status(404).json({ error: "User Not Found!" });
    }
    const isPasswordCorrect = await bcrypt.compare(password, user?.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Incorrect Password!" });
    }

    generateJwtTokenAndSetCookie(user._id, res);

    res.status(200).json({
      _id: user._id,
      fullName: user.fullName,
      userName: user.userName,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal Server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logout Successfully!!" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server error" });
  }
};
