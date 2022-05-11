const Logs = require("../models/logs");
const Placement_Logs = require("../models/placement_logs");


const logs_utils={
    // logs function for vehicle and part status change......
    createLogs:(newStatus,prevStatus,user,entity,vehicleId,partId)=>{
        const createdAt= new Date();
          const message = `${user.firstName} ${user.lastName} has changed "${entity}" status from "${prevStatus}" to "${newStatus}" at "${createdAt}"`
          const data = {
            user_id: user._id,
            vehicle_id: vehicleId,
            part_id: partId,
            updatedStatus:newStatus,
            previousStatus:prevStatus,
            createdAt,
            entity,
            message
          }
          const log = new Logs(data);
      
          log.save();
      
        },
    // log function for the placement of parts in subBins......
    createPlacementLogs:(user,partId,subBinId)=>{
        const createdAt= new Date();
          const message = `${user.firstName} ${user.lastName} has changed subBinId "${subBinId}" of part"${partId}" at "${createdAt}"`
          const data = {
            user_id: user._id,
            subBin_id: subBinId,
            part_id: partId,
            // updatedStatus:newStatus,
            // previousStatus:prevStatus,
            createdAt,
            // entity,
            message
          }
          const newlog = new Placement_Logs(data);
          newlog.save();
    }
}

module.exports = logs_utils