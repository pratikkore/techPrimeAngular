const { ProjectModel } = require("../model/Project-Model");
const express = require("express");
const projectRoutes = express.Router();

projectRoutes.post("/save", async (req, res) => {
  try {
    const projectData = req.body;
    const project = new ProjectModel(projectData);
    await project.save();
    res.json({ status: 200, Msg: "Project Data Saved  Successfully..." });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Something went wrong while saveing Project Data.." });
  }
});

projectRoutes.get("/projectList", async (req, res) => {
  try {
    const sort = req.query.sortField;

    let sortQuery = {};
    if (sort !== "") {
      console.log(sort);
      sortQuery[sort] = 1;
    }
    console.log(sortQuery);
    const data = await ProjectModel.find().sort(sortQuery);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: "Unable to fetch Projects.." });
  }
});
projectRoutes.get("/projectStatusCount", async (req, res) => {
  try {
    const currentDate = new Date();
    const aggregationPipeline = [
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          closed: {
            $sum: { $cond: [{ $eq: ["$Status", "Closed"] }, 1, 0] },
          },
          running: {
            $sum: { $cond: [{ $eq: ["$Status", "Running"] }, 1, 0] },
          },
          
          canceled: {
            $sum: { $cond: [{ $eq: ["$Status", "Cancelled"] }, 1, 0] },
          },
          registered: {
            $sum: { $cond: [{ $eq: ["$Status", "Registered"] }, 1, 0] },
          },
          colsureDelay: {
            $sum: {
              $cond: [
                {
                  $and: [
                    { $eq: ["$Status", "Running"] }, //equal to running status
                    { $lt: ["$Enddate", currentDate] },//less than current date
                  ],
                },
                1,
                0,
              ],
            },
          },
        },
      },
    ];

    const result = await ProjectModel.aggregate(aggregationPipeline);

    if (result.length === 0) {
      return res.status(200).json({
        total: 0,
        closed: 0,
        running: 0,
        colsureDelay: 0,
        canceled: 0,
        registered: 0,
      });
    }

    const { total, closed, running, colsureDelay, canceled, registered } =
      result[0];

    return res.status(200).json({
      total,
      closed,
      running,
      colsureDelay,
      canceled,
      registered,
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});


projectRoutes.get("/chart", async (req, res) => {
  try {
    const pipeline = [
      {
        $group: {
          _id: "$Department",
          TotalCount: { $sum: 1 },
          closedCount: {
            $sum: { $cond: [{ $eq: ["$Status", "Closed"] }, 1, 0] },
          },
        },
      },
      {
        $project: {
          department: "$_id",
          TotalCount: 1,
          closedCount: 1,
        },
      },
    ];

    const departmentStats = await ProjectModel.aggregate(pipeline);

    return res.status(200).json(departmentStats);
  } catch (error) {
    res.status(500).json({ error: "Unable to fetch department crtas" });
  }
});

projectRoutes.patch("/updateStatus/:id/:status", async (req, res) => {
  try {
    const updatedProject = await ProjectModel.findByIdAndUpdate(
      req.params.id,
      
      { Status: req.params.status },
      { new: true }
    );
    res.json(updatedProject || { error: "Project not found" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Unable to update project status" });
  }
});

module.exports = projectRoutes;
