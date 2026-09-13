const Employee = require("../models/employee.model");

exports.getAll = async (req, res) => {
  try {
    res.json(await Employee.find().populate("department"));
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getRandom = async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const employee = await Employee.findOne().skip(rand).populate("department");

    if (!employee) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(employee);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.getById = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id).populate(
      "department",
    );

    if (!employee) {
      res.status(404).json({ message: "Not found" });
    } else {
      res.json(employee);
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.create = async (req, res) => {
  try {
    const { firstName, lastName, department } = req.body;

    const newEmployee = new Employee({
      firstName,
      lastName,
      department,
    });

    await newEmployee.save();

    res.json(newEmployee);
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.update = async (req, res) => {
  const { firstName, lastName, department } = req.body;

  try {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      employee.firstName = firstName;
      employee.lastName = lastName;
      employee.department = department;

      await employee.save();

      res.json(employee);
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

exports.remove = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);

    if (employee) {
      await Employee.deleteOne({ _id: req.params.id });

      res.json(employee);
    } else {
      res.status(404).json({ message: "Not found..." });
    }
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
