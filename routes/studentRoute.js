import express from "express";
import fns from "date-fns";
// const x = fns.isBefore("11-11-2021", "12-11-2021");
// console.log(x);
// (new Date(1986, 6, 10), new Date(1987, 1, 11));
const router = express.Router();
import Student from "../models/studentModel.js";

// gets all students
router.get("/", async (req, res, next) => {
  try {
    const all = await Student.find({});
    console.log("Successfully Found");
    res.json(all);
  } catch (error) {
    next(error);
  }
});
// gets students with course: law
router.get("/law", async (req, res, next) => {
  try {
    console.log("in law");
    const students = await Student.find({ courses: { $in: ["Law"] } });
    console.log(`Successfully Found ${students}`);
    res.json(students);
  } catch (err) {
    next(err);
  }
});
// get all students where courses include "Java"
// and gender set to "Female"
router.get("/javafem", async (req, res, next) => {
  try {
    const students = await Student.find({
      $and: [{ courses: { $in: ["Java"] } }, { gender: "Female" }],
    });
    console.log(`Successfully Found ${students}`);
    res.json(students);
  } catch (error) {
    next(error);
  }
});
// get all students born before 05/05/1998
router.get("/birth", async (req, res, next) => {
  console.log("birth");
  const compDate = new Date(1998, 5, 5);
  try {
    const students = await Student.find({});
    const youngerOnes = students.map(obj => {
      console.log(compDate);
      // const x = fns.parseISO(new Date(obj.birth));
      // console.log(x);
      // console.log(fns.isBefore(compDate, makeDate(obj.birth)));
      // if (fns.isBefore(compDate, makeDate(obj.birth))) {
      //   return obj;
      // }
    });
    console.log(`Successfully Found ${youngerOnes}`);
    res.json(youngerOnes);
  } catch (error) {
    next(error);
  }
});
router.get("/054", async (req, res, next) => {
  console.log("054");
  try {
    // const students = await Student.find({
    //   $where: this.phone.slice(0, 2) === "54",
    // });
    const students = await Student.find({
      $expr: {
        $function: {
          body: function (phone) {
            console.log(phone);
            return;
          },
          args: ["$phone"],
          lang: "js",
        },
      },
    });
    console.log(`Successfully Found ${students}`);
    res.json(youngerOnes);
  } catch (error) {
    next(error);
  }
});
// Gets "Ido" (or any student) by query params
// Notice that this is case sensitive, rightfully so
router.get("/:name", async (req, res, next) => {
  const { name } = req.params;
  console.log(name);
  try {
    const student = await Student.find({ name });
    if (student.length < 1) {
      throw { status: 404, message: "Wrong name/ Route" };
    }
    console.log(`Successfully Found ${student}`);
    res.json(student);
  } catch (error) {
    next(error);
  }
});

// Only activated once to post to db
// import students from "../localData/studentData.js";
// router.post("/", async (req, res, next) => {
//   const studentArr = students.map(obj => Student(obj));
//   try {
//     await Student.insertMany(studentArr);
//     console.log("Data Inserted");
//     res.json(studentArr);
//   } catch (err) {
//     next(err);
//   }
// });

export default router;

function makeDate(d) {
  const m = d.getMonth();
  const y = d.getFullYear();
  const day = d.getDate();
  return new Date(y, m, day);
}
