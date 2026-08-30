const mongoose = require("mongoose");
const Employee = require("../employee.model.js");
const expect = require("chai").expect;

describe("Employee", () => {
  it('should throw an error if no "firstName" arg', () => {
    const employee = new Employee({
      lastName: "Doe",
      department: "Management",
    });

    const err = employee.validateSync();

    expect(err.errors.firstName).to.exist;
  });
  it('should throw an error if no "lastName" arg', () => {
    const employee = new Employee({
      firstName: "John",
      department: "Management",
    });

    const err = employee.validateSync();

    expect(err.errors.lastName).to.exist;
  });
  it('should throw an error if no "department" arg', () => {
    const employee = new Employee({
      firstName: "John",
      lastName: "Doe",
    });

    const err = employee.validateSync();

    expect(err.errors.department).to.exist;
  });
  it("should not throw an error if all args are okay", () => {
    const employee = new Employee({
      firstName: "John",
      lastName: "Doe",
      department: "Management",
    });

    const err = employee.validateSync();

    expect(err).to.not.exist;
  });
  it('should throw an error if "firstName" is not a string', () => {
    const cases = [{}, []];

    for (let firstName of cases) {
      const employee = new Employee({
        firstName,
        lastName: "Doe",
        department: "Management",
      });

      const err = employee.validateSync();

      expect(err.errors.firstName).to.exist;
    }
  });
  it('should throw an error if "lastName" is not a string', () => {
    const cases = [{}, []];

    for (let lastName of cases) {
      const employee = new Employee({
        firstName: "John",
        lastName,
        department: "Management",
      });

      const err = employee.validateSync();

      expect(err.errors.lastName).to.exist;
    }
  });
  it('should throw an error if "department" is not a string', () => {
    const cases = [{}, []];

    for (let department of cases) {
      const employee = new Employee({
        firstName: "John",
        lastName: "Doe",
        department,
      });

      const err = employee.validateSync();

      expect(err.errors.department).to.exist;
    }
  });

  after(() => {
    mongoose.models = {};
  });
});
