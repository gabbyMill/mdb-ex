import mongoose from "mongoose";

const studentSchema = mongoose.Schema({
  name: String,
  surName: String,
  birth: String,
  phone: Number,
  gender: String,
  courses: Array, // or Object ?
});

const Student = mongoose.model("Student", studentSchema);

studentSchema.set("toJSON", {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const LooseSchema = mongoose.Schema({}, { strict: false });
const User = mongoose.model("User", LooseSchema);

export { Student, User };
