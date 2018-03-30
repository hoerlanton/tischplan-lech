/**
 * Created by antonhorl on 08.02.18.
 */

module.exports = {
    addInformationToTable: function (req, res, db) {
        console.log("addInformationToTable request made to /addInformationToTable");
        console.log(JSON.stringify(req.body));

        let data = JSON.stringify(req.body),
            splitted = data.split("\\"),
            informationElements2 = [],
            departmentValueDB = "",
            departmentValue = "",
            tableValueArray = [],
            tableValue = "",
            zimmernummerValue = [],
            anreiseValue = [],
            abreiseValue = [],
            name1Value = [],
            nameFrau1Value = [],
            nation1Value = [],
            pinfo1Value = [],
            aufenthalte1Value = [],
            letzterAufenthalt1Value = [],
            name2Value = [],
            nameFrau2Value = [],
            nation2Value = [],
            pinfo2Value = [],
            aufenthalte2Value = [],
            letzterAufenthalt2Value = [],
            name3Value = [],
            nameFrau3Value = [],
            nation3Value = [],
            pinfo3Value = [],
            aufenthalte3Value = [],
            letzterAufenthalt3Value = [],
            name4Value = [],
            nameFrau4Value = [],
            nation4Value = [],
            pinfo4Value = [],
            aufenthalte4Value = [],
            letzterAufenthalt4Value = [],
            personenAnzahlValue = [],
            newInfoText = [],
            newInfoRoomNumber = [],
            newInfoName = [],
            newInfoEmployee = [],
            newInfoDate = [],
            newInfoTableNumber = [];

        for (let s = 0; s < splitted.length; s++) {
            informationElements2.push(splitted[s].split(/:(.+)/)[1]);
            if (informationElements2[s] === undefined) {
                informationElements2[s] = splitted[s]
            }
        }

        console.log('informationElements2 length: -> ' + informationElements2.length);
        console.log(informationElements2);

    if (JSON.stringify(informationElements2).indexOf("topValue") == -1) {
            console.log("Liste dropped");
            if (informationElements2[0]) {
                zimmernummerValue.push(informationElements2[0].substring(1, informationElements2[0].length));
            }
            if (informationElements2[1]) {
                anreiseValue.push(informationElements2[1].substring(1, informationElements2[1].length));
            }
            if (informationElements2[2]) {
                abreiseValue.push(informationElements2[2].substring(1, informationElements2[2].length));
            }
            if (informationElements2[3]) {
                personenAnzahlValue.push(informationElements2[3].substring(1, informationElements2[3].length));
            }
            if (informationElements2[4]) {
                name1Value.push(informationElements2[4].substring(1, informationElements2[4].length));
            }
            if (informationElements2[5]) {
                nameFrau1Value.push(informationElements2[5].substring(1, informationElements2[5].length));
            }
            if (informationElements2[6]) {
                nation1Value.push(informationElements2[6].substring(1, informationElements2[6].length));
            }
            if (informationElements2[7]) {
                pinfo1Value.push(informationElements2[7].substring(1, informationElements2[7].length));
            }
            if (informationElements2[8]) {
                aufenthalte1Value.push(informationElements2[8].substring(1, informationElements2[8].length));
            }
            if (informationElements2[9]) {
                letzterAufenthalt1Value.push(informationElements2[9].substring(1, informationElements2[9].length));
            }
            if (informationElements2[10]) {
                name2Value.push(informationElements2[10].substring(1, informationElements2[10].length));
            }
            if (informationElements2[11]) {
                nameFrau2Value.push(informationElements2[11].substring(1, informationElements2[11].length));
            }
            if (informationElements2[12]) {
                nation2Value.push(informationElements2[12].substring(1, informationElements2[12].length));
            }
            if (informationElements2[13]) {
                pinfo2Value.push(informationElements2[13].substring(1, informationElements2[13].length));
            }
            if (informationElements2[14]) {
                aufenthalte2Value.push(informationElements2[14].substring(1, informationElements2[14].length));
            }
            if (informationElements2[15]) {
                letzterAufenthalt2Value.push(informationElements2[15].substring(1, informationElements2[15].length));
            }
            if (informationElements2[16]) {
                name3Value.push(informationElements2[16].substring(1, informationElements2[16].length));
            }
            if (informationElements2[17]) {
                nameFrau3Value.push(informationElements2[17].substring(1, informationElements2[17].length));
            }
            if (informationElements2[18]) {
                nation3Value.push(informationElements2[18].substring(1, informationElements2[18].length));
            }
            if (informationElements2[19]) {
                pinfo3Value.push(informationElements2[19].substring(1, informationElements2[19].length));
            }
            if (informationElements2[20]) {
                aufenthalte3Value.push(informationElements2[20].substring(1, informationElements2[20].length));
            }
            if (informationElements2[21]) {
                letzterAufenthalt3Value.push(informationElements2[21].substring(1, informationElements2[21].length));
            }
            if (informationElements2[22]) {
                name4Value.push(informationElements2[22].substring(1, informationElements2[22].length));
            }
            if (informationElements2[23]) {
                nameFrau4Value.push(informationElements2[23].substring(1, informationElements2[23].length));
            }
            if (informationElements2[24]) {
                nation4Value.push(informationElements2[24].substring(1, informationElements2[24].length));
            }
            if (informationElements2[25]) {
                pinfo4Value.push(informationElements2[25].substring(1, informationElements2[25].length));
            }
            if (informationElements2[26]) {
                aufenthalte4Value.push(informationElements2[26].substring(1, informationElements2[26].length));
            }
            if (informationElements2[27]) {
                letzterAufenthalt4Value.push(informationElements2[27].substring(1, informationElements2[27].length));
            }
            departmentValue = informationElements2[informationElements2.length - 1].substring(1, informationElements2[informationElements2.length - 1].length - 1).replace(new RegExp("[0-9]", "g"), "").replace(/\W/g, '');
            tableValueArray = informationElements2[informationElements2.length - 1].toString().match(/\d+/);
            tableValue = tableValueArray[0];

            console.log(tableValue + " " + departmentValue);
            if (departmentValue === "Restaurant") {
                departmentValueDB = "Restaurant";
            }
            setTimeout(function () {

                db.lechTables.update(
                    {
                        department: departmentValueDB,
                        "tables.number": tableValue
                    },
                    {
                        $push: {
                            "tables.$.groups": {
                                "zimmernummerValue": zimmernummerValue[0],
                                "anreiseValue": anreiseValue[0],
                                "abreiseValue": abreiseValue[0],
                                "personenAnzahlValue": personenAnzahlValue[0],
                                "name1Value": name1Value[0],
                                "nameFrau1Value": nameFrau1Value[0],
                                "nation1Value": nation1Value[0],
                                "pinfo1Value": pinfo1Value[0],
                                "aufenthalte1Value": aufenthalte1Value[0],
                                "letzterAufenthalt1Value": letzterAufenthalt1Value[0],
                                "name2Value": name2Value[0],
                                "nameFrau2Value": nameFrau2Value[0],
                                "nation2Value": nation2Value[0],
                                "pinfo2Value": pinfo2Value[0],
                                "aufenthalte2Value": aufenthalte2Value[0],
                                "letzterAufenthalt2Value": letzterAufenthalt2Value[0],
                                "name3Value": name3Value[0],
                                "nameFrau3Value": nameFrau3Value[0],
                                "nation3Value": nation3Value[0],
                                "pinfo3Value": pinfo3Value[0],
                                "aufenthalte3Value": aufenthalte3Value[0],
                                "letzterAufenthalt3Value": letzterAufenthalt3Value[0],
                                "name4Value": name4Value[0],
                                "nameFrau4Value": nameFrau4Value[0],
                                "nation4Value": nation4Value[0],
                                "pinfo4Value": pinfo4Value[0],
                                "aufenthalte4Value": aufenthalte4Value[0],
                                "letzterAufenthalt4Value": letzterAufenthalt4Value[0],
                            }
                        }
                    }, function (err, tables) {
                        if (err) {
                            console.log(err);
                        }
                        console.log("addInformationToTable updated successfully");
                    });
            }, 200);

        } else {
            console.log("umsetzen addInformationToTable");
            let umsetzen = JSON.parse(data);
            console.log("umsetzen");
            console.log(umsetzen);
                for (let i = 0; i < umsetzen[0].groups.length; i++) {
                        zimmernummerValue.push(umsetzen[0].groups[i].zimmernummerValue);
                        personenAnzahlValue.push(umsetzen[0].groups[i].personenAnzahlValue);
                        anreiseValue.push(umsetzen[0].groups[i].anreiseValue);
                        abreiseValue.push(umsetzen[0].groups[i].abreiseValue);
                        name1Value.push(umsetzen[0].groups[i].name1Value);
                        nameFrau1Value.push(umsetzen[0].groups[i].nameFrau1Value);
                        nation1Value.push(umsetzen[0].groups[i].nation1Value);
                        pinfo1Value.push(umsetzen[0].groups[i].pinfo1Value);
                        aufenthalte1Value.push(umsetzen[0].groups[i].aufenthalte1Value);
                        letzterAufenthalt1Value.push(umsetzen[0].groups[i].letzterAufenthalt1Value);
                        name2Value.push(umsetzen[0].groups[i].name2Value);
                        nameFrau2Value.push(umsetzen[0].groups[i].nameFrau2Value);
                        nation2Value.push(umsetzen[0].groups[i].nation2Value);
                        pinfo2Value.push(umsetzen[0].groups[i].pinfo2Value);
                        aufenthalte2Value.push(umsetzen[0].groups[i].aufenthalte2Value);
                        letzterAufenthalt2Value.push(umsetzen[0].groups[i].letzterAufenthalt2Value);
                        name3Value.push(umsetzen[0].groups[i].name3Value);
                        nameFrau3Value.push(umsetzen[0].groups[i].nameFrau3Value);
                        nation3Value.push(umsetzen[0].groups[i].nation3Value);
                        pinfo3Value.push(umsetzen[0].groups[i].pinfo3Value);
                        aufenthalte3Value.push(umsetzen[0].groups[i].aufenthalte3Value);
                        letzterAufenthalt3Value.push(umsetzen[0].groups[i].letzterAufenthalt3Value);
                        name4Value.push(umsetzen[0].groups[i].name4Value);
                        nameFrau4Value.push(umsetzen[0].groups[i].nameFrau4Value);
                        nation4Value.push(umsetzen[0].groups[i].nation4Value);
                        pinfo4Value.push(umsetzen[0].groups[i].pinfo4Value);
                        aufenthalte4Value.push(umsetzen[0].groups[i].aufenthalte4Value);
                        letzterAufenthalt4Value.push(umsetzen[0].groups[i].letzterAufenthalt4Value);
                        newInfoText.push(umsetzen[0].groups[i].newInfoName);
                        newInfoRoomNumber.push(umsetzen[0].groups[i].newInfoRoomNumber);
                        newInfoName.push(umsetzen[0].groups[i].newInfoName);
                        newInfoEmployee.push(umsetzen[0].groups[i].newInfoEmployee);
                        newInfoDate.push(umsetzen[0].groups[i].newInfoDate);
                        newInfoTableNumber.push(umsetzen[0].groups[i].newInfoTableNumber);
                    departmentValueDB = umsetzen[1].targetDepartment;
                    tableValue = umsetzen[1].targetTable;
                    umsetzen[0].department = umsetzen[1].targetDepartment;
                }
            //console.log(" nameValue " + nameValue + " zimmernummerValue " + zimmernummerValue + " anreiseValue " + anreiseValue + " abreiseValue " + abreiseValue + " personenAnzahlValue " + personenAnzahlValue + " notiz1Value " + notiz1Value + " notiz2Value " + notiz2Value + " bemerkungValue " + bemerkungValue + "tableValue" + tableValue + "departmentvalue" + departmentValue);


            setTimeout(function () {
                db.lechTables.findOne(
                    {
                        department: departmentValueDB,
                        "tables.number": tableValue
                    },
                    {
                        "tables.$": 1,
                    },
                    function (err, tablesfirst) {
                        if (err) {
                            res.send(err);
                        }
                        if (tablesfirst === null) {
                            console.log("tablesfirst is null");
                            console.log(tablesfirst);
                            return;
                        }
                        console.log("Länge tables firstplace" + JSON.stringify(tablesfirst.tables[0]).length);
                        for (let i = 0; i < umsetzen[0].groups.length; i++) {
                            if (name1Value[i]) {
                                db.lechTables.update(
                                {
                                    department: departmentValueDB,
                                    "tables.number": tableValue
                                },
                                {
                                    $push: {
                                        "tables.$.groups": {
                                            "zimmernummerValue": zimmernummerValue[i],
                                            "anreiseValue": anreiseValue[i],
                                            "abreiseValue": abreiseValue[i],
                                            "personenAnzahlValue": personenAnzahlValue[i],
                                            "name1Value": name1Value[i],
                                            "nameFrau1Value": nameFrau1Value[i],
                                            "nation1Value": nation1Value[i],
                                            "pinfo1Value": pinfo1Value[i],
                                            "aufenthalte1Value": aufenthalte1Value[i],
                                            "letzterAufenthalt1Value": letzterAufenthalt1Value[i],
                                            "name2Value": name2Value[i],
                                            "nameFrau2Value": nameFrau2Value[i],
                                            "nation2Value": nation2Value[i],
                                            "pinfo2Value": pinfo2Value[i],
                                            "aufenthalte2Value": aufenthalte2Value[i],
                                            "letzterAufenthalt2Value": letzterAufenthalt2Value[i],
                                            "name3Value": name3Value[i],
                                            "nameFrau3Value": nameFrau3Value[i],
                                            "nation3Value": nation3Value[i],
                                            "pinfo3Value": pinfo3Value[i],
                                            "aufenthalte3Value": aufenthalte3Value[i],
                                            "letzterAufenthalt3Value": letzterAufenthalt3Value[i],
                                            "name4Value": name4Value[i],
                                            "nameFrau4Value": nameFrau4Value[i],
                                            "nation4Value": nation4Value[i],
                                            "pinfo4Value": pinfo4Value[i],
                                            "aufenthalte4Value": aufenthalte4Value[i],
                                            "letzterAufenthalt4Value": letzterAufenthalt4Value[i],
                                        }
                                    }
                                }, function (err, tables) {
                                    if (err) {
                                        console.log("Error");
                                    }
                                    console.log("addInformationToTable updated successfully");
                                });
                        } else {
                                db.lechTables.update(
                                    {
                                        department: departmentValueDB,
                                        "tables.number": tableValue
                                    },
                                    {
                                        $push: {
                                            "tables.$.groups": {
                                                "newInfoText" : newInfoText[i],
                                                "newInfoRoomNumber": newInfoRoomNumber[i],
                                                "newInfoName": newInfoName[i],
                                                "newInfoEmployee": newInfoEmployee[i],
                                                "newInfoDate": newInfoDate[i],
                                                "newInfoTableNumber": newInfoTableNumber[i]
                                            }
                                        }
                                    }, function (err, tables) {
                                        if (err) {
                                            console.log("Error");
                                        }
                                        console.log("addInformationToTable updated successfully");
                                    });

                            }
                        }
                    });
            }, 200);
        }
        setTimeout(function () {
            db.lechTables.find(
                {
                    department: departmentValueDB,
                    "tables.number": tableValue
                }, function (err, tables) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(tables);
                    console.log("Add information to table response");
                    console.log(JSON.stringify(tables));
                });
        }, 1000);
    }
};