var express = require("express");
const user = require("../controller/user");
const locations = require("../controller/locations_controller");
const schedule = require("../controller/schedule_controller");
const customer = require("../controller/customer_controller");
const vehicle = require("../controller/vehicle_controller");
const employee = require("../controller/employee");
const contractor = require("../controller/contractor");
const laborRate = require("../controller/labor_rate");
const partPrice = require("../controller/partPriceManager");
const companyInformation = require("../controller/companyInformation");
const supplier = require("../controller/supplier");
const bankAccount = require("../controller/bankAccount");
const check = require("../controller/checkTemplate");
const checks = require("../controller/checks");
const authorizedUser = require("../controller/authorizedUser");
const signature = require("../controller/signature");
const authorizedUserBanks = require("../controller/authorizedUser_bankAccount");
const workOrder = require("../controller/workOrder");
const inspectionCategory = require("../controller/inspection_category_controller");
const inspectionQuestion = require("../controller/inspection_questions_controller");
const inspectionTest = require("../controller/inspection_test_controller");
const inspectionResults = require("../controller/inspection_result_controller");
const vehiclePart = require("../controller/vehicle_part_controller");
const inventory = require("../controller/inventory_controller");
// const aaVehiclesParts = require("../controller/aavehiclesparts_controller");
const vendor = require("../controller/vendor_controller");
const product = require("../controller/product_controller");

const categoryObj = require("../controller/category_controller");

const axios = require("axios");
// const upload = require("../helper/helper");
const multer = require("multer");
const { promisify } = require("util");
const pipeline = promisify(require("stream").pipeline);
const upload = multer();

const fs = require("fs");
const part_list = require("../controller/partList_controller");
const warehouse = require("../controller/warehouse_controller");
const racks = require("../controller/racks_controller");
const shelfs = require("../controller/shelfs_controller");
const bins = require("../controller/bins_controller");
const subBins = require("../controller/subBins_controller");
const aaVehiclesMarketing = require("../controller/aaVehicleMarketing_controller");
const orders = require("../controller/getOrdersList_Controller");
const products = require("../controller/Product_Controller");

// const CompanyInfo = require("../models/company-info-");
var router = express.Router();
const routes = {
  "/register": (req, res) => {
    user.register(req, res);
  },
  "/login": (req, res) => {
    user.login(req, res);
  },
  "/fetchMechanic": (req, res) => {
    user.fetchMechanic(req, res);
  },
  "/getUserList": (req, res) => {
    user.fetchUsers(req, res);
  },
  "/addLocation": (req, res) => {
    locations.addNewLocation(req, res);
  },
  "/getLocations": (req, res) => {
    locations.getAllLocations(req, res);
  },
  "/myaccount": (req, res) => {
    user.myAccount(req, res);
  },
  "/fetchUserByMechanic": (req, res) => {
    user.fetchMechanic(req, res);
  },
  "/updatePasswordFromAdmin": (req, res) => {
    user.updatePasswordfromAdmin(req, res);
  },
  "/updateStatus": (req, res) => {
    user.updateStatus(req, res);
  },
  "/createSchedule": (req, res) => {
    schedule.addNewschedule(req, res);
  },
  "/getSchedules": (req, res) => {
    schedule.getAllschedules(req, res);
  },
  "/scheduleUpdate": (req, res) => {
    schedule.scheduleUpdate(req, res);
  },
  "/createCustomer": (req, res) => {
    customer.addNewcustomer(req, res);
  },
  "/updateCustomerById": (req, res) => {
    customer.updateCustomerById(req, res);
  },
  "/getCustomers": (req, res) => {
    customer.getCustomer(req, res);
  },
  "/getAllCustomers": (req, res) => {
    customer.getAllCustomers(req, res);
  },
  "/createVendor": (req, res) => {
    vendor.addNewuVendor(req, res);
  },

  "/addVendorImage": (req, res) => {
    vendor.addVendorImage(req, res);
  },

  
  "/createCategory": (req, res) => {
    categoryObj.addNewCategory(req, res);
  },
  "/addCategoryImage": (req, res) => {
    categoryObj.addCategoryImage(req, res);
  },

  
  "/createVehicle": (req, res) => {
    vehicle.addNewvehicle(req, res);
  },
  "/getAllVehicles": (req, res) => {
    vehicle.getAllvehicles(req, res);
  },
  "/getAAVehicles": (req, res) => {
    vehicle.getAAvehicles(req, res);
  },
  "/getAAVehicleById": (req, res) => {
    vehicle.getAAVehicleById(req, res);
  },
  "/getVehicle": (req, res) => {
    vehicle.getAllvehicles(req, res);
  },
  "/updateVehicleById": (req, res) => {
    vehicle.updateVehicleById(req, res);
  },
  "/updateAAVehicleById": (req, res) => {
    vehicle.updateAAVehicleById(req, res);
  },
  "/updateAAVehicleTimeTracks": (req, res) => {
    vehicle.updateAAVehicleTimeTracks(req, res);
  },
  "/getCustomerVehicle": (req, res) => {
    vehicle.getCustomerVehicles(req, res);
  },
  // using vehicle collection to get the cabinets data.....
  "/getAllRooms": (req, res) => {
    vehicle.getAllRooms(req, res);
  },
  "/addNewPartsCabinet": (req, res) => {
    vehicle.addNewPartsCabinet(req, res);
  },
  "/getRoomById": (req, res) => {
    vehicle.getRoomById(req, res);
  },
  "/getAllCabinets": (req, res) => {
    vehicle.getAllCabinets(req, res);
  },
  "/getCabinetById": (req, res) => {
    vehicle.getCabinetById(req, res);
  },
  "/addIdentifiedParts": (req, res) => {
    aaVehiclesParts.addIdentifiedParts(req, res);
  },
  "/addIdentifiedPartImages": (req, res) => {
    aaVehiclesParts.addIdentifiedPartImages(req, res);
  },
  "/getAAVehiclesParts": (req, res) => {
    aaVehiclesParts.getAAVehiclesParts(req, res);
  },
  "/getAAVehiclesPartsById": (req, res) => {
    aaVehiclesParts.getAAVehiclesPartsById(req, res);
  },
  "/getAAPartById": (req, res) => {
    aaVehiclesParts.getAAPartById(req, res);
  },
  "/updateAAPartStatusById": (req, res) => {
    aaVehiclesParts.updateAAPartStatus(req, res);
  },
  "/updateAAPartSalePriceById": (req, res) => {
    aaVehiclesParts.updateAAPartSalePriceById(req, res);
  },
  "/updateAAPartCabinet": (req, res) => {
    aaVehiclesParts.updateAAPartCabinet(req, res);
  },
  "/updateAAPartSubBin": (req, res) => {
    aaVehiclesParts.updateAAPartSubBin(req, res);
  },
  "/getAAPartsBySubBinId": (req, res) => {
    aaVehiclesParts.getAAPartsBySubBinId(req, res);
  },
  "/updateAAPartImage": (req, res) => {
    aaVehiclesParts.updateAAPartImage(req, res);
  },
  "/deleteAAPartById": (req, res) => {
    aaVehiclesParts.deleteAAPartById(req, res);
  },
  "/deleteAAPartImage": (req, res) => {
    aaVehiclesParts.deleteAAPartImage(req, res);
  },
  "/addProductImage": (req, res) => {
    products.addProductImage(req, res);
  },
  "/createProducts": (req, res) => {
    products.addNewProduct(req, res);
  },
  "/bulkUpdate": (req, res) => {
    products.bulkUpload(req, res);
  },
  "/getAllProducts": (req, res) => {
    products.getAllProducts(req, res);
  },
  "/getOrdersList": (req, res) => {
    orders.GetOrders(req, res);
  },
  "/getOrdersByStatus": (req, res) => {
    orders.GetOrdersByStatus(req, res);
  },
  "/getOrdersById": (req, res) => {
    orders.GetOrdersById(req, res);
  },
  "/UpdateOrderbyID": (req, res) => {
    orders.UpdateOrder(req, res);
  },
  "/createEmployee": (req, res) => {
    employee.addNewEmployee(req, res);
  },
  "/updateEmployeeById": (req, res) => {
    employee.updateEmployeeById(req, res);
  },
  "/updateEmployeeTaxById": (req, res) => {
    employee.updateEmployeeTaxById(req, res);
  },
  "/getAllEmployee": (req, res) => {
    employee.getAllEmployee(req, res);
  },
  "/getEmployeeById": (req, res) => {
    employee.getEmployeeById(req, res);
  },
  "/createContractor": (req, res) => {
    contractor.addNewContractor(req, res);
  },
  "/getAllContractor": (req, res) => {
    contractor.getAllContractor(req, res);
  },
  "/createLaborRate": (req, res) => {
    laborRate.addNewLaborRate(req, res);
  },
  "/getLaborRate": (req, res) => {
    laborRate.getAllLaborRate(req, res);
  },
  "/getLaborRateByLocationId": (req, res) => {
    laborRate.getLaborRateByLocationId(req, res);
  },
  "/createPartPrice": (req, res) => {
    partPrice.addNewPartPrice(req, res);
  },
  "/getPartPrice": (req, res) => {
    partPrice.getAllPartPrice(req, res);
  },
  "/createCompanyInformation": (req, res) => {
    companyInformation.addNewCompanyInfo(req, res);
  },
  "/getCompanyInformation": (req, res) => {
    companyInformation.getAllCompanyInfo(req, res);
  },
  "/createSupplier": (req, res) => {
    supplier.addNewsupplier(req, res);
  },
  "/getSupplier": (req, res) => {
    supplier.getAllsuppliers(req, res);
  },
  "/createBankAccount": (req, res) => {
    bankAccount.addNewbankAccount(req, res);
  },
  "/getBankAccount": (req, res) => {
    bankAccount.getAllbankAccounts(req, res);
  },
  "/createAuthorizedUser": (req, res) => {
    authorizedUser.addNewauthorizedUser(req, res);
  },
  "/getAuthorizedUser": (req, res) => {
    authorizedUser.getAllauthorizedUsers(req, res);
  },
  "/createCheck": (req, res) => {
    check.addNewCheck(req, res);
  },
  "/createFinanceCheck": (req, res) => {
    check.addNewFinanceCheck(req, res);
  },
  "/getAllChecks": (req, res) => {
    check.getAllChecks(req, res);
  },
  "/getChecksById": (req, res) => {
    check.getCheckById(req, res);
  },
  "/getOneCheck": (req, res) => {
    check.getOneCheck(req, res);
  },
  "/getAuthorizedUserById": (req, res) => {
    authorizedUser.getAuthorizedUsers(req, res);
  },
  "/createSignature":
    (upload.single("file"),
    async (req, res) => {
      signature.createSignature(req, res);
    }),
  "/getSignature": (req, res) => {
    signature.getSignature(req, res);
  },
  "/getAuthorizedUserBanks": (req, res) => {
    authorizedUserBanks.getAuthorizedUserBanks(req, res);
  },
  "/createWorkOrder": (req, res) => {
    workOrder.addNewWorkOrder(req, res);
  },
  "/getAllWorkOrders": (req, res) => {
    workOrder.getAllWorkOrder(req, res);
  },
  "/getWorkOrderById": (req, res) => {
    workOrder.getWorkOrderById(req, res);
  },
  "/getWorkOrderByVehicleId": (req, res) => {
    workOrder.getWorkOrderByVehicleId(req, res);
  },
  "/updateWorkOrderJobCategory": (req, res) => {
    workOrder.updateWorkOrderJobCategory(req, res);
  },
  "/fetchWorkOrderbyMechanicID": (req, res) => {
    workOrder.fetchWorkOrderbyMechanicID(req, res);
  },
  "/updateWorkOrder": (req, res) => {
    workOrder.updateWorkOrder(req, res);
  },
  "/updateWorkOrderServicesAndParts": (req, res) => {
    workOrder.updateWorkOrderServicesAndParts(req, res);
  },
  "/updateWorkOrderMillage": (req, res) => {
    workOrder.updateWorkOrderMillage(req, res);
  },
  "/deleteWorkOrderService": (req, res) => {
    workOrder.deleteWorkOrderService(req, res);
  },
  "/assignedMechanic": (req, res) => {
    workOrder.assignedMechanic(req, res);
  },
  "/deleteWorkOrderPart": (req, res) => {
    workOrder.deleteWorkOrderPart(req, res);
  },
  "/searchWorkOrderByLicensePlateNumber": (req, res) => {
    workOrder.searchWorkOrderByLicensePlateNumber(req, res);
    // console.log(req.body);
  },
  "/checkStatusVerified": (req, res) => {
    check.checkStatusVerified(req, res);
  },
  "/generateNewCheck": (req, res) => {
    checks.generateNewCheck(req, res);
    // console.log(req.body);
  },
  "/createFinanceCheck": (req, res) => {
    checks.generateNewFinanceCheck(req, res);
  },
  "/getCheckBylocation": (req, res) => {
    check.getCheckBylocation(req, res);
  },
  "/viewCheck": (req, res) => {
    checks.getAllGeneratedChecks(req, res);
  },
  "/getCheckByID": (req, res) => {
    checks.getGeneratedCheckById(req, res);
  },
  "/getCheckByCheckType": (req, res) => {
    checks.getGeneratedCheckByCheckType(req, res);
  },

  "/addInspectionCategory": (req, res) => {
    inspectionCategory.addInspectionCategory(req, res);
  },
  "/getAllInspectionCategories": (req, res) => {
    inspectionCategory.getAllInspectionCategories(req, res);
  },
  "/addInspectionQuestion": (req, res) => {
    inspectionQuestion.addInspectionQuestion(req, res);
  },
  "/getAllInspectionQuestions": (req, res) => {
    inspectionQuestion.getAllInspectionQuestions(req, res);
  },
  // Inspections Tests ...................###########..................
  "/addInspectionTest": (req, res) => {
    inspectionTest.addInspectionTest(req, res);
  },
  "/getAllInspectionTests": (req, res) => {
    inspectionTest.getAllInspectionTests(req, res);
  },
  "/getAllInspectionTestsForEdit": (req, res) => {
    inspectionTest.getAllInspectionTestsForEdit(req, res);
  },
  "/getInspectionTestById": (req, res) => {
    inspectionTest.getInspectionTestById(req, res);
  },

  "/getAllInspectionQuestions": (req, res) => {
    inspectionQuestion.getAllInspectionQuestions(req, res);
  },
  "/getAllInspectionQuestionsByCategory": (req, res) => {
    inspectionQuestion.getAllInspectionQuestionsByCategory(req, res);
  },

  "/updateInspectionQuestionsById": (req, res) => {
    inspectionQuestion.updateInspectionQuestionsById(req, res);
  },
  // inspection result.........
  "/addInspectionResult": (req, res) => {
    inspectionResults.addInspectionResult(req, res);
  },
  "/addInspectionImages": (req, res) => {
    inspectionResults.addInspectionImages(req, res);
  },
  "/getInspectionrResultById": (req, res) => {
    inspectionResults.getInspectionrResultById(req, res);
  },
  "/getAllInspectionrResult": (req, res) => {
    inspectionResults.getAllInspectionrResult(req, res);
  },
  "/getInspectionrResultsByWoId": (req, res) => {
    inspectionResults.getInspectionrResultsByWoId(req, res);
  },
  "/updateInspectionResult": (req, res) => {
    inspectionResults.updateInspectionResult(req, res);
  },
  // vehicle parts............
  "/addVehiclePart": (req, res) => {
    vehiclePart.addVehiclePart(req, res);
  },
  "/getAllVehicleParts": (req, res) => {
    vehiclePart.getAllVehicleParts(req, res);
  },
  "/addNewInventory": (req, res) => {
    inventory.addNewInventory(req, res);
  },
  "/getInventoryByLocationId": (req, res) => {
    inventory.getInventoryByLocationId(req, res);
  },
  "/addNewPart": (req, res) => {
    part_list.addNewPart(req, res);
  },
  "/getParts": (req, res) => {
    part_list.getParts(req, res);
  },
  "/getPartAddressByWcId": (req, res) => {
    aaVehiclesParts.getAAPartAddressByWCId(req, res);
  },
  "/getPartAddressById": (req, res) => {
    aaVehiclesParts.getAAPartAddressById(req, res);
  },

  // Warehouses ................
  "/addNewWarehouse": (req, res) => {
    warehouse.addNewWarehouse(req, res);
  },
  "/getAllWarehouses": (req, res) => {
    warehouse.getAllWarehouses(req, res);
  },
  "/getAllWarehouseData": (req, res) => {
    warehouse.getAllWarehouseData(req, res);
  },
  //RAcks .............
  "/addNewRack": (req, res) => {
    racks.addNewRack(req, res);
  },
  "/getAllRacks": (req, res) => {
    racks.getAllRacks(req, res);
  },
  "/getRacksByWhId": (req, res) => {
    racks.getRacksByWhId(req, res);
  },
  // Shelfs ................
  "/addNewShelfs": (req, res) => {
    shelfs.addNewShelfs(req, res);
  },
  "/getAllShelfs": (req, res) => {
    shelfs.getAllShelfs(req, res);
  },
  "/getShelfsByRackId": (req, res) => {
    shelfs.getShelfsByRackId(req, res);
  },
  // Bins ................
  "/addNewBins": (req, res) => {
    bins.addNewBins(req, res);
  },
  "/getAllBins": (req, res) => {
    bins.getAllBins(req, res);
  },
  "/getBinsByShelfId": (req, res) => {
    bins.getBinsByShelfId(req, res);
  },
  // Sub-Bins ................
  "/addNewSubBins": (req, res) => {
    subBins.addNewSubBins(req, res);
  },
  "/getAllSubBins": (req, res) => {
    subBins.getAllSubBins(req, res);
  },

  "/getSearchedSubBins": (req, res) => {
    subBins.getSearchedSubBins(req, res);
  },

  // aaVehiclesMarketing................................................................
  "/addMarketingData": (req, res) => {
    aaVehiclesMarketing.addMarketingData(req, res);
  },
  "/addMarketingContent": (req, res) => {
    aaVehiclesMarketing.addMarketingContent(req, res);
  },
  "/updateMarketingContent": (req, res) => {
    aaVehiclesMarketing.updateMarketingContent(req, res);
  },
  "/deleteMarketingContent": (req, res) => {
    aaVehiclesMarketing.deleteMarketingContent(req, res);
  },
  "/deleteMarketingData": (req, res) => {
    aaVehiclesMarketing.deleteMarketingData(req, res);
  },
  "/getAllMarketingContent": (req, res) => {
    aaVehiclesMarketing.getAllMarketingContent(req, res);
  },
  "/getContentByVehicleId": (req, res) => {
    aaVehiclesMarketing.getContentByVehicleId(req, res);
  },

  "/test": (req, res) => {},
};

router.use("/", function (req, res) {
  if (routes[req.path] == undefined) {
    console.log(req.path);
  } else {
    const path = req.path;
    console.log(req.path);
    routes[path](req, res);
  }
});

module.exports = router;
