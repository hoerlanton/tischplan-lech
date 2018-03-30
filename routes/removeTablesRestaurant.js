module.exports = {
    removeTable: function (db, tableNumber, departmentValue, topValue, leftValue, height, width) {
     if (tableNumber === '1' && topValue === '500' && leftValue === '30' && width === '90') {
         db.lechTables.update(
             {
                 department: departmentValue,
                 "tables.number": tableNumber
             },
             {
                 $set: {
                     "tables.$.width": "60",
                 }
             }, function (err, tables) {
                 if (err) {
                     console.log("Error");
                 }
                 console.log("moveTable Update successful");
             });
         db.lechTables.update(
             {
                 department: departmentValue,
             }, {
                 $push: {
                     tables: {
                         $each: [{
                             "arrayIndex": "1",
                             "department": "Restaurant",
                             "number": "2",
                             "topValue": "500",
                             "leftValue": "120",
                             "bgColor": "#ffffff",
                             "isBesetzt": "false",
                             "placeholder": "true",
                             "border": "solid 3px #f3efe4",
                             "width": "30",
                             "height": "50",
                         }],
                         $sort: {number: 1}
                     }
                 }
             },
             {multi: true},
             function (err, tables) {
                 if (err) {
                     console.log("Error");
                 }
                 console.log("addTable Update successful");
             });
        }
    }
};