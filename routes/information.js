/**
 * Created by antonhorl on 11.01.18.
 */

module.exports = {
    getInformation: function (req, res, db) {
        console.log("tables get called");
        //Get guests from Mongo DB
        db.lechNewInformation.find(function (err, information) {
            if (err) {
                res.send(err);
            }
            res.json(information);
        });
    },
    deleteInformation: function (req, res, db) {

        //JSON string is parsed to a JSON object
        console.log("deleteInformation request made to /deleteInformation");
        let informationElementToDelete = req.body;
        console.log(JSON.stringify(informationElementToDelete));
        db.lechNewInformation.remove({

                roomNumber: informationElementToDelete.roomNumber,
                text: informationElementToDelete.text
            },
            {
                justOne: true,
            });
        res.json(informationElementToDelete);
    },
    newInformationToTable: function (req, res, db) {

        console.log("newInformationToTables post called");
        //Get guests from Mongo DB

        console.log(req.body);
        let newInformation = req.body;

        db.lechTables.update(
            {
                "tables.number": newInformation.tableNumber,
            },
            {
                $push: {
                    "tables.$.groups": {
                        "newInfoText": newInformation.text,
                        "newInfoRoomNumber": newInformation.roomNumber,
                        "newInfoName": newInformation.name,
                        "newInfoEmployee": newInformation.employee,
                        "newInfoDate": newInformation.date,
                        "newInfoTableNumber": newInformation.tableNumber
                    }
                }
            }, function (err, tables) {
                if (err) {
                    console.log("Error");
                }
                console.log("addInformationToTable updated successfully");
            });

        setTimeout(function () {
            db.lechTables.findOne(
                {
                    "tables.number": newInformation.tableNumber
                },
                {
                    "tables.$": 1,
                },
                function (err, tables) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(tables);
                    console.log(JSON.stringify(tables));
                });
        }, 500);
    },
    getInformationEmployees: function (req, res, db) {
        console.log("getInformationEmployees get called");
        //Get guests from Mongo DB
        db.lechNewInformationToEmployee.find(function (err, information) {
            if (err) {
                res.send(err);
            }
            res.json(information);
        });
    },

    newInformationToBox: function (req, res, db) {



        console.log("newInformationToBox post called");
        //Get guests from Mongo DB

        console.log(req.body);
        let newInformation = req.body;


        db.lechNewInformation.save(newInformation, function (err, newInformation) {
            if (err) {
                res.send(err);
            }
            res.json(newInformation);
        });

        setTimeout(function () {
            db.lechNewInformationToEmployee.findOne(
                {
                    "employee": newInformation.employee
                },
                {
                    "employee.$": 1,
                },
                function (err, infoEmployee) {
                    if (err) {
                        res.send(err);
                    }
                    db.lechNewInformationToEmployee.update(
                        {
                            "employee": newInformation.employee
                        },
                        {
                     $inc: {
                         numberOfInfos: +1,
                            }
                        }, function (err, tables) {
                            if (err) {
                                console.log("Error");
                            }
                            console.log("newInformationToEmployee updated successfully");
                        });
                });

        });

    }
};