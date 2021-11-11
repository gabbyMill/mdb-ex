import students from "../localData/studentData.js";
import express from "express";
const router = express.Router();
import Student from "../models/studentModel.js";

router.post("/", async (req, res, next) => {
  const studentArr = students.map(obj => Student(obj));
  try {
    await Student.insertMany(studentArr);
    console.log("Data Inserted");
    res.json(studentArr);
  } catch (err) {
    next(err);
  }
});

export default router;
