// const auth = require("../middleware/auth");
const Assignment = require("../../../models/Assignment");

// CREATE TICKET
module.exports.addAssignment = async (req, res) => {
  try {
    const newAssignment = new Assignment({
      // userId: req.user._id,
      name: req.body.name,
      // teacher: req.body.teacher,
      description: req.body.description,
      points: req.body.points,
      date: req.body.date,
    });
    const savedAssignment = await newAssignment.save();
    res.status(200).json(savedAssignment);
  } catch (error) {
    console.log("error in adding assignment");
    res.status(500).json(error);
  }
};

module.exports.getAssignments = async (req, res) => {
  try {
    // const tickets = await Ticket.find({ userId: req.user._id });
    const assignments = await Assignment.find({ userId: req.params.id });
    res.json(assignments);
  } catch (error) {
    res.status(500).json({ msg: "assignments not found .." });
  }
};

//GET ticket by ID
// router.get("/:id", async (req, res) => {
//   try {
//     const ticket = await Ticket.findById(req.params.id);
//     res.status(200).json(ticket);
//   } catch (error) {
//     res.status(500).json(error);
//     console.log("Error in this block");
//   }
// });

//GET All assignments
module.exports.getAllAssignments = async (req, res) => {
  try {
    const assignments = await Assignment.find({});
    res.status(200).json(assignments);
  } catch (error) {
    console.log("Error while getting all assignments");
    res.status(500).json(error);
  }
};

module.exports.uploadFile = async (req, res) => {
  console.log(req.file);
};
