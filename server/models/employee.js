const mongoose = require("../config/config");

const employeesSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    prefferedName: String,
    AlternativeName: String,
    AddressLine1: String,
    AddressLine2: String,
    socialSecurityNumber: String,
    reTypeSocialSecurityNumber: String,
    gender: String,
    home: String,
    country:String,
    city: String,
    cellNo: String,
    dateOfBirth: String,
    email: String,
    workAddressLine1: String,
    workAdressLine2: String,
    workCity: String,
    State: String,
    workState: String,
    zipCode: String,
    workPhone: String,
    workEmail: String,
    employmentStartDate: String,
    hireDate:String,
      socialSecurityNumber: String,
      employeeStatus: String,
      gender: String,
      jobTaxCredit: String,
      pension: String,
      paymentType: String,
      salary: String,
      statutoryEmployee: String,
      terminationDate: String,
      terminationReason: String,
      terminationDescription: String,
      lengthOfService:String,
      taxInfo:{"federal":{},"state":{},"local":{}}
      
});

const Employee = mongoose.model("Employee", employeesSchema);

module.exports = Employee;
