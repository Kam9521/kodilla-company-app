const mongoose = require("mongoose");
const Employee = require("../employee.model");
const expect = require("chai").expect;

describe("Employee CRUD", () => {
  before(async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/companyDBtest", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
    } catch (err) {
      console.error(err);
    }
  });

  describe("Reading data", () => {
    before(async () => {
      const testEmployeeOne = new Employee({
        firstName: "John",
        lastName: "Doe",
        department: "Management",
      });
      await testEmployeeOne.save();

      const testEmployeeTwo = new Employee({
        firstName: "Amanda",
        lastName: "Smith",
        department: "Human Resources",
      });
      await testEmployeeTwo.save();
    });

    it('should return all the data with "find" method', async () => {
      const employees = await Employee.find();

      expect(employees.length).to.be.equal(2);
    });

    it('should return proper document by various params with "findOne" method', async () => {
      const employeeByFirstName = await Employee.findOne({
        firstName: "John",
      });

      const employeeByLastName = await Employee.findOne({
        lastName: "Smith",
      });

      const employeeByDepartment = await Employee.findOne({
        department: "Management",
      });

      expect(employeeByFirstName.firstName).to.be.equal("John");
      expect(employeeByLastName.lastName).to.be.equal("Smith");
      expect(employeeByDepartment.department).to.be.equal("Management");
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Creating data", () => {
    it('should insert new document with "insertOne" method', async () => {
      const employee = new Employee({
        firstName: "John",
        lastName: "Doe",
        department: "Management",
      });

      await employee.save();

      expect(employee.isNew).to.be.false;
    });

    after(async () => {
      await Employee.deleteMany();
    });
  });

  describe("Updating data", () => {
    beforeEach(async () => {
      const testEmployeeOne = new Employee({
        firstName: "John",
        lastName: "Doe",
        department: "Management",
      });
      await testEmployeeOne.save();

      const testEmployeeTwo = new Employee({
        firstName: "Amanda",
        lastName: "Smith",
        department: "Human Resources",
      });
      await testEmployeeTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly update one document with "updateOne" method', async () => {
      await Employee.updateOne(
        { firstName: "John" },
        { $set: { firstName: "Johnny" } },
      );

      const updatedEmployee = await Employee.findOne({
        firstName: "Johnny",
      });

      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update one document with "save" method', async () => {
      const employee = await Employee.findOne({
        firstName: "John",
      });

      employee.firstName = "Johnny";
      await employee.save();

      const updatedEmployee = await Employee.findOne({
        firstName: "Johnny",
      });

      expect(updatedEmployee).to.not.be.null;
    });

    it('should properly update multiple documents with "updateMany" method', async () => {
      await Employee.updateMany(
        {},
        { $set: { department: "Updated Department" } },
      );

      const employees = await Employee.find({
        department: "Updated Department",
      });

      expect(employees.length).to.be.equal(2);
    });
  });

  describe("Removing data", () => {
    beforeEach(async () => {
      const testEmployeeOne = new Employee({
        firstName: "John",
        lastName: "Doe",
        department: "Management",
      });
      await testEmployeeOne.save();

      const testEmployeeTwo = new Employee({
        firstName: "Amanda",
        lastName: "Smith",
        department: "Human Resources",
      });
      await testEmployeeTwo.save();
    });

    afterEach(async () => {
      await Employee.deleteMany();
    });

    it('should properly remove one document with "deleteOne" method', async () => {
      await Employee.deleteOne({
        firstName: "John",
      });

      const removedEmployee = await Employee.findOne({
        firstName: "John",
      });

      expect(removedEmployee).to.be.null;
    });

    it('should properly remove multiple documents with "deleteMany" method', async () => {
      await Employee.deleteMany();

      const employees = await Employee.find();

      expect(employees.length).to.be.equal(0);
    });
  });
});
