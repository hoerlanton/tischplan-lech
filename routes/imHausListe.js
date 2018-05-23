/**
 * Created by antonhorl on 09.01.18.
 */

module.exports = {
    saveImHausListeProtel: function (req, res, db) {
    //JSON string is parsed to a JSON object

        console.log("JSON.stringify(req.body)");
        //console.log(JSON.stringify(req.body));

        let imHausListeData = {
            data: "",
        };

        let imHausListe = [];

        imHausListeData.data = req.body;

        let name = [];
        let nation = [];
        let sprache = [];
        let zimmerNummer = [];
        let kat = [];
        let pTyp = [];
        let anreise = [];
        let abreise  = [];
        let erwKi = [];
        let rbSou = [];
        let notiz2 = [];
        let trace = [];
        let counter = 0;
        console.log(imHausListeData.data.length);
        //console.log(imHausListeData.data);

        for (let row = 22; row < 10000; row += 3 ) {
            let accessorNameA = "A" + row;
            let accessorNameC = "C" + row;
            let accessorNameD = "D" + row;
            let accessorNameE = "E" + row;
            let accessorNameF = "F" + row;
            let accessorNameG = "G" + row;
            let accessorNameH = "H" + row;
            let accessorNameI = "I" + row;
            let accessorNameJ = "J" + row;
            let accessorNameK = "K" + row;
            let accessorNameL = "L" + row;

            //console.log(accessorNameA);
            //console.log(accessorNameC);

            if (imHausListeData.data[accessorNameA] == null) {
                break;
            } else if (imHausListeData.data[accessorNameA].w === "Traces:" && !imHausListeData.data[accessorNameH]) {
                continue;
            } else if (imHausListeData.data[accessorNameA].w === "Traces:" && imHausListeData.data[accessorNameH]) {
                trace[counter - 1] = imHausListeData.data[accessorNameH].w;
                continue;
            } else {
                if (imHausListeData.data[accessorNameA]) {
                    name.push(imHausListeData.data[accessorNameA].w)
                } else {
                    name.push("-");
                }
                if (imHausListeData.data[accessorNameC]) {
                    nation.push(imHausListeData.data[accessorNameC].w)
                } else {
                    nation.push("-");
                }
                if (imHausListeData.data[accessorNameD]) {
                    sprache.push(imHausListeData.data[accessorNameD].w)
                } else {
                    sprache.push("-");
                }
                if (imHausListeData.data[accessorNameE]) {
                    zimmerNummer.push(imHausListeData.data[accessorNameE].w)
                } else {
                    zimmerNummer.push("-");
                }
                if (imHausListeData.data[accessorNameF]) {
                    kat.push(imHausListeData.data[accessorNameF].w)
                } else {
                    kat.push("-");
                }
                if (imHausListeData.data[accessorNameG]) {
                    pTyp.push(imHausListeData.data[accessorNameG].w)
                } else {
                    pTyp.push("-");
                }
                if (imHausListeData.data[accessorNameH]) {
                    anreise.push(imHausListeData.data[accessorNameH].w)
                } else {
                    anreise.push("-");
                }
                if (imHausListeData.data[accessorNameI]) {
                    abreise.push(imHausListeData.data[accessorNameI].w)
                } else {
                    abreise.push("-");
                }
                if (imHausListeData.data[accessorNameJ]) {
                    erwKi.push(imHausListeData.data[accessorNameJ].w)
                } else {
                    erwKi.push("-");
                }
                if (imHausListeData.data[accessorNameK]) {
                    rbSou.push(imHausListeData.data[accessorNameK].w)
                } else {
                    rbSou.push("-");
                }
                if (imHausListeData.data[accessorNameL]) {
                    console.log("imHausListeData.data[accessorNameL]" + row + "=");
                    console.log(imHausListeData.data[accessorNameL]);
                    notiz2.push(imHausListeData.data[accessorNameL].w)
                } else {
                    notiz2.push("-");
                }
                trace.push("-");
            }
            counter++;
        }


        console.log("trace");
        //console.log(JSON.stringify(name));
        console.log(JSON.stringify(trace));
        //console.log(nation);

        for (let i = 0; i < counter; i++) {
            //console.log(i);
            //console.log(imHausListeData.data[i]);

            imHausListe.push({
                "name": name[i],
                "nation": nation[i],
                "sprache": sprache[i],
                "zimmernummer": zimmerNummer[i],
                "kat": kat[i],
                "pTyp": pTyp[i],
                "anreise": anreise[i],
                "abreise": abreise[i],
                "erwKi": erwKi[i],
                "rbSou": rbSou[i],
                "notiz2": notiz2[i],
                "trace": trace[i]
            });
        };

        //console.log(imHausListe);

        //+3 ist nächste Zeile
        //Wenn A+3 === Traces: && H+3 != „null“ dann Trace gehört zu A-3
        /*
         console.log("Post request made to /imHausListe");
         let imHausListeData = {
         data: "",
         };
         imHausListeData.data = req.body;
         //console.log(imHausListeData.data);
         //console.log(imHausListe[0].name);
         //console.log(imHausListe[1]);
         console.log(imHausListe);
         //console.log('req.body' + req.body);
         //console.log('imHausListe' +  imHausListe);
         //imHausListe.data = req.body;
         */
        db.lechImHausListe.remove({});
        setTimeout(function () {
            db.lechImHausListe.save(imHausListe, function (err, imHausListe) {
                if (err) {
                    res.send(err);
                }
                res.json(imHausListe);
                console.log("imHausListe save called");
            });
        }, 500);
    },
    saveImHausListeGastrodat: function (req, res, db) {
        //JSON string is parsed to a JSON object
        console.log("Post request made to /saveImHausListeGastrodat");
        //console.log(JSON.stringify(req.body));
        let imHausListeData = {
            data: "",
        };

        let imHausListe = [];
        let imHausListeDataArray = [];
        imHausListeData.data = req.body;
        console.log("imHausListeData.data");
        console.log(imHausListeData.data);
        //console.log(imHausListe[0].name);
        //console.log(imHausListe[1]);

        for (let i = 1; i < imHausListeData.data.length; i++) {
            let imHausListeDataArrayConcat = [];
            let imHausListeDataArrayConcatSplit = [];
            imHausListeDataArray = imHausListeData.data[i];
            for (let j = 0; j < imHausListeDataArray.length; j++) {
                imHausListeDataArrayConcat += imHausListeDataArray[j];
            }
            console.log("imHausListeDataArrayConcat");
            console.log(imHausListeDataArrayConcat);
            imHausListeDataArrayConcatSplit = imHausListeDataArrayConcat.split(";");
            let zimmerNummerSplitted = imHausListeDataArrayConcatSplit[2].split(" ");
        //console.log(imHausListeDataArrayConcatSplit);
        imHausListe.push({
            "zimmernummer": zimmerNummerSplitted[0],
            "anreise": imHausListeDataArrayConcatSplit[0],
            "abreise": imHausListeDataArrayConcatSplit[1],
            "name1": imHausListeDataArrayConcatSplit[8] + " " + imHausListeDataArrayConcatSplit[5] + " " + imHausListeDataArrayConcatSplit[6],
            "pinfo1": imHausListeDataArrayConcatSplit[15],
            "pinfo2": imHausListeDataArrayConcatSplit[32],
            "pinfo3": imHausListeDataArrayConcatSplit[49],
            "personenAnzahl": imHausListeDataArrayConcatSplit[74] + " / " + imHausListeDataArrayConcatSplit[77] + " / " + imHausListeDataArrayConcatSplit[78],
            "kategorie": imHausListeDataArrayConcatSplit[85],
        });
        }
        console.log(imHausListe);
        db.lechImHausListe.remove({});
        setTimeout(function () {
            db.lechImHausListe.save(imHausListe, function (err, imHausListe) {
                if (err) {
                    res.send(err);
                }
                res.json(imHausListe);
                console.log("imHausListe save called");
            });
        }, 500);
    },
    updateImHausListe: function (req, res, db) {

        console.log("Post request made to /updateImHausListeElement");

        let informationElements = req.body;

        console.log(req.body);

        let nameValueArray = [];
        let zimmernummerValueArray = [];
        let informationElementsString = JSON.stringify(informationElements);

        if (informationElementsString.indexOf("targetTable") != -1) {
            console.log("BUG I GONNA KILL YOU !!!!")
        } else {

        if (informationElementsString.indexOf("leftValue") != -1) {
            for (let i = 0; i < informationElements.groups.length; i++) {
                nameValueArray.push(informationElements.groups[i].name1Value);
                zimmernummerValueArray.push(informationElements.groups[i].zimmernummerValue);

                let string = " ";
                nameValueArray[i] = string.concat(nameValueArray[i]);

                console.log(nameValueArray[i]);
                console.log(zimmernummerValueArray[i]);

                db.lechImHausListe.update(
                    {
                        name1: nameValueArray[i],
                        "zimmernummer": zimmernummerValueArray[i]
                    },
                    {
                        $set: {
                            "bgColor": "ffffff",
                        }
                    }, function (err, imHausListe) {
                        if (err) {
                            console.log("Error");
                        }
                        console.log("lechImHausListe Update successful");
                        console.log(imHausListe);
                    });

            }
        } else {
            nameValueArray.push(informationElements[4].substring(0, informationElements[4].length));
            zimmernummerValueArray.push(informationElements[0].substring(1, informationElements[0].length));

            console.log(nameValueArray[0]);
            console.log(zimmernummerValueArray[0]);

            db.lechImHausListe.update(
                {
                    name1: nameValueArray[0],
                    "zimmernummer": zimmernummerValueArray[0]
                },
                {
                    $set: {
                        "bgColor": "0a7a74",
                    }
                }, function (err, tables) {
                    if (err) {
                        console.log("Error");
                    }
                    console.log("occupyTable Update successful");
                });
        }}

        setTimeout(function () {
            db.lechImHausListe.find(
                {},
                function (err, imHausListe) {
                    if (err) {
                        res.send(err);
                    }
                    res.json(imHausListe);
                    console.log('imHausListe');
                    console.log(JSON.stringify(imHausListe));
                });
        }, 700);

    },
    getImHausListe: function (req, res, db) {
        console.log("imHausListe get called");
//Get guests from Mongo DB
        db.lechImHausListe.find(function (err, imHausListe) {
            if (err) {
                res.send(err);
            }
            res.json(imHausListe);
        });
    }
};