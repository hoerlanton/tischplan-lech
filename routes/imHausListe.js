/**
 * Created by antonhorl on 09.01.18.
 */

module.exports = {
    saveImHausListe: function (req, res, db) {

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
        db.imHausListeTest.remove({});
        setTimeout(function () {
            db.imHausListeTest.save(imHausListe, function (err, imHausListe) {
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

        if (informationElementsString.indexOf("nameValue") === -1) {
            return;
        }

        if (informationElementsString.indexOf("leftValue") != -1) {
            for (let i = 0; i < informationElements.groups.length; i++) {
                nameValueArray.push(informationElements.groups[i].nameValue);
                zimmernummerValueArray.push(informationElements.groups[i].zimmernummerValue);

                db.imHausListeTest.update(
                    {
                        name: nameValueArray[i],
                        "zimmernummer": zimmernummerValueArray[i]
                    },
                    {
                        $set: {
                            "bgColor": "ffffff",
                        }
                    }, function (err, tables) {
                        if (err) {
                            console.log("Error");
                        }
                        console.log("occupyTable Update successful");
                    });

            }
        } else {
            nameValueArray.push(informationElements[0].substring(1, informationElements[0].length));
            zimmernummerValueArray.push(informationElements[4].substring(1, informationElements[4].length));

            console.log(nameValueArray[0]);
            console.log(zimmernummerValueArray[0]);

            db.imHausListeTest.update(
                {
                    name: nameValueArray[0],
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
        }

        setTimeout(function () {
            db.imHausListeTest.find(
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
        db.imHausListeTest.find(function (err, imHausListe) {
            if (err) {
                res.send(err);
            }
            res.json(imHausListe);
        });
    }
};