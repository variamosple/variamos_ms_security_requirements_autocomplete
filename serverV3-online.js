var express = require('express');
var axios = require('axios');
var cors = require('cors');
const bodyParser = require("body-parser");
var app = express();
const PORT = 9898;
const HOST = '0.0.0.0';
//app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
const ip = "http://193.52.45.42:8585/";
//const data = ["apple","apple watch","iphone","iphone x","apple macbook","apple macbook air","apple macbook air pro 13"];
const conditions1 = {
    "If": {
        "placeholder": "<Condition>",
        "next": "then"
    },
    "When": {
        "placeholder": "<Condition>",
        "next": "then"
    },
    "While": {
        "placeholder": "<Activation State>",
        "next": ""
    },
    "During": {
        "placeholder": "<Activation State>",
        "next": ""
    },
    "In Case": {
        "placeholder": "<Included Feature>",
        "next": "is included"
    },
    "After": {
        "placeholder": "<Behavior>",
        "next": ""
    },
    "Before": {
        "placeholder": "<Behavior>",
        "next": ""

    },
    "As soon as": {
        "placeholder": "<Behavior>",
        "next": ""

    }
};
const system = {
    "The": {
        "placeholder": "<System or Part Name>",
        "next": ""
    }
};
 const systemDomain = {"All" :{
                    "placeholder1":"",
                    "next":"systems of the",
                    "placeholder2":"<Product line>",
                    "placeholder3":""
                 },
                 "Some" :{
                    "placeholder1":"",
                    "next":"systems of the",
                    "placeholder2":"<Product line>",
                    "placeholder3":""
                 },
                 "Those" :{
                    "placeholder1":"",
                    "next":"systems of the",
                    "placeholder2":"<Product line>",
                    "placeholder3":"Restriction: "

                 }

        }; 
const priority = ["shall", "should", "could", "will"];
const activity = {
    "provide": {
        "placeholder1": "<Who?>",
        "next": "with the ability to",
        "placeholder2": "<Process Verb>"
    },
    "verb": {
        "placeholder1": "<Process Verb>",
        "next": "",
        "placeholder2": ""
    },
    "be able to": {
        "placeholder1": "<Process Verb>",
        "next": [
            "from",
            "towards"
        ],
        "placeholder2": "<System or External Device Name>"
    }
};
var securityCriteria = [];
const asset = {
    "of": {
        "As Many": {
            "placeholder1": "<Objects/Assets>",
            "next": "as possible",
            "placeholder2": "",
            "placeholder3": ""
        },
        "As Few": {
            "placeholder1": "<Objects/Assets>",
            "next": "as possible",
            "placeholder2": "",
            "placeholder3": ""
        },
        "A": {
            "placeholder1": "<Objects/Assets>",
            "next": "",
            "placeholder2": "",
            "placeholder3": ""
        },
        "An": {
            "placeholder1": "<Objects/Assets>",
            "next": "",
            "placeholder2": "",
            "placeholder3": ""
        },
        "The": {
            "placeholder1": "<Objects/Assets>",
            "next": "",
            "placeholder2": "",
            "placeholder3": ""
        },
        "Number": {
            "placeholder1": "<X>",
            "next": "",
            "placeholder2": "<Objects/Assets>",
            "placeholder3": ""
        },
        "Between": {
            "placeholder1": "<A>",
            "next": "and",
            "placeholder2": "<B>",
            "placeholder3": "<Objects/Assets>"
        },
        "All the": {
            "placeholder1": "<Objects/Assets>",
            "next": "",
            "placeholder2": "",
            "placeholder3": ""
        }

    }

};
var securityMechanism = [];
const validation = {
    "complying with": {
        "placeholder1": "<Validation Criteria>"
    }
};
const condition2 = {
    "if and only if": {
        "placeholder1": "<Condition>"
    }
};
const additionalObjectDetails = {
    "additionalDetails": {
        "placeholder1": "<Additional Object Details>"
    }
};
const autoAdaptive = {
    "before": {
        "placeholder1": "<Event>"
    },
    "after": {
        "placeholder1": "<Event>"
    },
    "during": {
        "placeholder1": "<Event>"
    },
    "as early as possible before": {
        "placeholder1": "<Event>"
    },
    "as early as possible after": {
        "placeholder1": "<Event>"
    },
    "as early as possible during": {
        "placeholder1": "<Event>"
    },
    "as late as possible before": {
        "placeholder1": "<Event>"
    },
    "as late as possible after": {
        "placeholder1": "<Event>"
    },
    "as late as possible during": {
        "placeholder1": "<Event>"
    },
    "until": {
        "placeholder1": "<Event>"
    },
    "within": {
        "placeholder1": "<Time Interval>",
        "placeholder2": "<Time Unit>"
    },
    "at least": {
        "placeholder1": "<Quantity>",
        "placeholder2": "<Frequency>"
    },
    "eventually": {
        "placeholder1": ""
    },
    "as late as possible after": {
        "placeholder1": [
            "<Quantity>",
            "<Frequency>"
        ]
    }




};

const getAllCriteria = async () => {

    try {
        var res = await axios.get(ip + 'criteria')
        //console.log(res);
        securityCriteria = res.data;

        //.then((response)=>{

        //securityCriteria=response.data;
        //})
        //.catch(function (error) {
        //console.log(error.toJSON());
        //});
    }
    catch (e) {
        console.log(e)
    }

}

async function getCriteriaMechanisms(criterion) {

    try {
        var res = await axios.get(ip + 'criteria/' + criterion + '/mechanisms')
        //console.log(res);
        securityMechanism = res.data;

        //.then((response)=>{

        //securityCriteria=response.data;
        //})
        //.catch(function (error) {
        //console.log(error.toJSON());
        //});
    }
    catch (e) {
        console.log(e)
    }

}
function elementInSentence(obj, sentence) {
    var str = "";
    Object.keys(obj).some(element => {
        //console.log(element);
        if (sentence.match(element + " ")) { console.log(element); str = element; }
    })
    return str;
}
function ObjectInSentence(obj, sentence) {
    var str = "";
    Object.keys(obj).some(element => {
        //console.log(element);
        if (sentence.match("of " + element + " ")) { console.log(element); str = element; }
    })
    return str;
}

app.post('/suggest', async function (req, res, next) {
    try {
        console.log(req.body.input)
        res.setHeader('Content-Type', 'application/json');

        var words = req.body.input.trim().split(" ");
        var sentence = req.body.input.trim();
        console.log(sentence)
        //var str={"input":sentence, "options":[]};
        var options = [];
        //var c1=words.some(item => Object.keys(conditions1).includes(item));
        var c1 = Object.keys(conditions1).some(element => {
            return sentence.includes(element);
        })
        console.log(c1);
        //var s=words.some(item => Object.keys(system).includes(item));
        var s = Object.keys(system).some(element => {
            return sentence.includes(element);
        })
        console.log(words);
        console.log(s);
        //var p=words.some(item =>priority.includes(item));
        var p = priority.some(element => {
            return sentence.includes(element);
        })
        //var a1=words.some(item => Object.keys(activity).includes(item));
        var a1 = Object.keys(activity).some(element => {
            return sentence.includes(element);
        })
        console.log(a1);
        //var sc=words.some(item => securityCriteria.includes(item));
        var sc = securityCriteria.some(element => {
            return sentence.includes(element);
        })
        //var a2=words.some(item => Object.keys(asset["of"]).includes(item));
        var a2 = Object.keys(asset["of"]).some(element => {
            return sentence.includes("of " + element);
        })
        var sm = securityMechanism.some(element => {
            return sentence.includes(element);
        })

        //var sm=false//words.some(item => securityMechanism.includes(item));
        //var vc=words.includes(Object.keys(validation));
        var vc = Object.keys(validation).some(element => {
            return sentence.includes(element);
        })
        //var ad=words.includes(Object.keys(additionalObjectDetails));
        var ad = Object.keys(additionalObjectDetails).some(element => {
            return sentence.includes(element);
        })
        //var c2=words.includes(Object.keys(condition2));
        var c2 = Object.keys(condition2).some(element => {
            return sentence.includes(element);
        })
        //var aa=words.includes(Object.keys(autoAdaptive));
        var aa = Object.keys(autoAdaptive).some(element => {
            return sentence.includes(element);
        })
        var criterion = "";

        // if(words.some(item => activity[elementInSentence(activity,sentence)]["next"].includes(item))) console.log("OK");

        // res.end(JSON.stringify(data.filter(value => value.includes(req.body.q))));

        // no text yet, show the conditions
        // if(req.body.q=="")res.end(JSON.stringify(Object.keys(conditions1)));
        // text but no complete condition yet, auto-complete the condition
        //else if(!Object.keys(conditions1).includes(req.body.q) && req.body.q!="" && !Object.keys(system).includes(req.body.q) && !priority.includes(req.body.q)) res.end(JSON.stringify(Object.keys(conditions1).filter(value => value.includes(req.body.q))));
        // complete condition, send the values
        //else if(Object.keys(conditions1).includes(req.body.q))res.end(JSON.stringify(conditions1[req.body.q]));
        //
        //else if(!Object.keys(system).includes(req.body.q) && !priority.includes(req.body.q)) res.end(JSON.stringify(Object.keys(system).filter(value => value.includes(req.body.q))))
        //
        //else if(Object.keys(system).includes(req.body.q)) res.end(JSON.stringify(system[req.body.q]));
        //
        //else if(priority.includes(req.body.q)) res.end(JSON.stringify(priority.filter(value=> value.includes(req.body.q))));
        //
        //else if(priority.includes(req.body.q)) res.end(JSON.stringify(priority.includes(req.body.q)))
        if (sentence == "") { options.push.apply(options, Object.keys(conditions1)); options.push.apply(options, Object.keys(system)); console.log(options); }

        else if (!c1 && req.body.input != "" && !s && !p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {
            if (Object.keys(conditions1).filter(value => value.includes(req.body.input)).length > 0) options = (Object.keys(conditions1).filter(value => value.includes(req.body.input)));
            if (Object.keys(system).filter(value => value.includes(req.body.input)).length > 0) options = (Object.keys(system).filter(value => value.includes(req.body.input)));
            console.log(options)
        }
        else if (c1 && req.body.input != "" && !s && !p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {

            if (Object.keys(conditions1).includes(words[words.length - 1]))
                options.push((conditions1[words[words.length - 1]]).placeholder);
            else if (words.length >= 2 && Object.keys(conditions1).includes(words[words.length - 2] + " " + words[words.length - 1]))
                options.push((conditions1[words[words.length - 2] + " " + words[words.length - 1]]).placeholder);
            else if (words.length >= 3 && Object.keys(conditions1).includes(words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]))
                options.push((conditions1[words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]]).placeholder);
            else if (conditions1[elementInSentence(conditions1, sentence)]["next"] != "" &&
                (words[words.length - 1]) != conditions1[elementInSentence(conditions1, sentence)]["next"] &&
                (words[words.length - 2] + " " + words[words.length - 1]) != conditions1[elementInSentence(conditions1, sentence)]["next"])
                options.push(conditions1[elementInSentence(conditions1, sentence)]["next"]);
            else options = (Object.keys(system));
        }
        else if (s && !p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {
            if (Object.keys(system).includes(words[words.length - 1]))
                options.push((system[words[words.length - 1]]).placeholder);
            else options = (priority);
        }
        else if (p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {
            if (priority.includes(words[words.length - 1]))
                options = (Object.keys(activity));
            //verb replaced
            else if (priority.includes(words[words.length - 2])) {
                await getAllCriteria();
                options = (securityCriteria);
            }
        }
        else if (a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {

            if (Object.keys(activity).includes(words[words.length - 1])) {
                if (words[words.length - 1] == "verb") sentence = sentence.replace("verb", "");
                options.push((activity[words[words.length - 1]]).placeholder1);
            }
            else if (words.length >= 3 && Object.keys(activity).includes(words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1])) {
                options.push((activity[words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]]).placeholder1);
            }
            else if (activity[elementInSentence(activity, sentence)]["next"] != "" &&
                (!Array.isArray(activity[elementInSentence(activity, sentence)]["next"]) &&
                    !sentence.includes(activity[elementInSentence(activity, sentence)]["next"]) &&
                    (words[words.length - 1]) != activity[elementInSentence(activity, sentence)]["next"] &&
                    (words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]) != activity[elementInSentence(activity, sentence)]["next"] &&
                    !activity[elementInSentence(activity, sentence)]["next"].includes((words[words.length - 1])) ||
                    (Array.isArray(activity[elementInSentence(activity, sentence)]["next"]) && !words.some(item => activity[elementInSentence(activity, sentence)]["next"].includes(item)))))
                if (Array.isArray(activity[elementInSentence(activity, sentence)]["next"]))
                    options.push.apply(options, activity[elementInSentence(activity, sentence)]["next"]);
                else options.push(activity[elementInSentence(activity, sentence)]["next"])
            else if (activity[elementInSentence(activity, sentence)]["next"] != "" &&
                (activity[elementInSentence(activity, sentence)]).placeholder2 != "" &&
                ((words[words.length - 1]) == activity[elementInSentence(activity, sentence)]["next"] ||
                    (words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]) == activity[elementInSentence(activity, sentence)]["next"] ||
                    activity[elementInSentence(activity, sentence)]["next"].includes((words[words.length - 1]))))
                options.push((activity[elementInSentence(activity, sentence)]).placeholder2)
            else {
                console.log(securityCriteria)
                //Needs to be synchronized
                await getAllCriteria();
                options = (securityCriteria);

            }
        }
        else if (sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {

            if (securityCriteria.includes(words[words.length - 1])) {
                criterion = words[words.length - 1];
                console.log(criterion)
                sentence += " of ";
                options = (Object.keys(asset["of"]));

            }
        }
        else if (a2 && !sm && !vc && !ad && !c2 && !aa) {
            //console.log(sentence.split("of")[1])
            //console.log(((asset["of"])[elementInSentence((asset["of"]),sentence.split("of")[1])]));
            if (Object.keys(asset["of"]).includes(words[words.length - 1])) {
                options.push(((asset["of"])[words[words.length - 1]]).placeholder1);
                console.log(options);
            }
            else if (Object.keys(asset["of"]).includes(words[words.length - 2] + " " + words[words.length - 1])) {
                options.push(((asset["of"])[words[words.length - 2] + " " + words[words.length - 1]]).placeholder1);
            }
            else if ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] != "" &&
                !sentence.includes((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"]) &&
                (words[words.length - 1]) != (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] &&
                (words[words.length - 2] + " " + words[words.length - 1]) != (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] &&
                !(asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"].includes((words[words.length - 1])))
                options.push((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"])
            else if ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] != "" &&
                ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder2 != "" &&
                ((words[words.length - 1]) == (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] ||
                    (words[words.length - 2] + " " + words[words.length - 1]) == (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] ||
                    (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"].includes((words[words.length - 1]))))
                options.push(((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder2)
            else if ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] == "" &&
                ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder2 != "" &&
                (ObjectInSentence((asset["of"]), sentence)) == (words[words.length - 2]))
                options.push(((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder2)
            else if ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] != "" &&
                ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder3 != "" &&
                ((words[words.length - 1]) != (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] &&
                    (words[words.length - 2] + " " + words[words.length - 1]) != (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] &&
                    (sentence.includes((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"]))) &&
                ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] == (words[words.length - 2])))
                options.push(((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder3)
            else {
                console.log("else")
                //Needs to be synchronized
                criterion = securityCriteria.find(element => words.includes(element));
                console.log(criterion);
                if (criterion != "") await getCriteriaMechanisms(criterion);
                sentence += " by ";
                options = (securityMechanism);

            }
            //if(elementInSentence((asset["of"]),sentence)=="Number") sentence=sentence.replace("","");
        }
        else if (sm && !vc && !ad && !c2 && !aa) {

            //console.log(asset["of"])
            if (securityMechanism.includes(words[words.length - 1])) {
                options.push.apply(options, Object.keys(validation));
                options.push.apply(options, Object.keys(condition2));
                options.push.apply(options, Object.keys(additionalObjectDetails));
                options.push.apply(options, Object.keys(autoAdaptive));
                console.log(options)

            }

        }
        else if (vc && !ad && !c2 && !aa) {

            if (Object.keys(validation).includes(words[words.length - 2] + " " + words[words.length - 1])) {
                options.push(validation["complying with"].placeholder1);

            }
            else {
                options.push.apply(options, Object.keys(condition2));
                options.push.apply(options, Object.keys(additionalObjectDetails));
                options.push.apply(options, Object.keys(autoAdaptive));
            }

        }
        else if (!ad && c2 && !aa) {

            if (Object.keys(condition2).includes(words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1])) {
                options.push(condition2[words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]].placeholder1);

            }
            else {
                options.push.apply(options, Object.keys(additionalObjectDetails));
                options.push.apply(options, Object.keys(autoAdaptive));
            }

        }
        else if (ad && !aa) {

            if (Object.keys(additionalObjectDetails).includes(words[words.length - 1])) {
                sentence = sentence.replace("additionalDetails", "");
                options.push(additionalObjectDetails[words[words.length - 1]].placeholder1);

            }
            else options = (Object.keys(autoAdaptive));

        }
        else if (aa) {

            if (Object.keys(autoAdaptive).includes(words[words.length - 1])) {
                options.push(autoAdaptive[words[words.length - 1]].placeholder1);

            }
            else if (Object.keys(autoAdaptive).includes(words[words.length - 2] + " " + words[words.length - 1])) {
                options.push(autoAdaptive[words[words.length - 2] + " " + words[words.length - 1]].placeholder1);

            }
            else if (Object.keys(autoAdaptive).includes(words[words.length - 5] + " " + words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1])) {
                options.push(autoAdaptive[words[words.length - 5] + " " + words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]].placeholder1);

            }
            else if (((autoAdaptive)[elementInSentence((autoAdaptive), sentence)]).placeholder2 != "" &&
                elementInSentence((autoAdaptive), sentence) != words[words.length - 1] &&
                elementInSentence((autoAdaptive), sentence) != words[words.length - 2] + " " + words[words.length - 1] &&
                (elementInSentence((autoAdaptive), sentence) == words[words.length - 2] || elementInSentence((autoAdaptive), sentence) == words[words.length - 3] + " " + words[words.length - 2]))
                options.push(((autoAdaptive)[elementInSentence((autoAdaptive), sentence)]).placeholder2)

        }



        //else if(words.includes(Object.keys(conditions1))  && !words.includes(Object.keys(system)) && !words.includes(priority)) str+=JSON.stringify(Object.keys(conditions1).filter(value => value.includes(req.body.q)));
        res.end(JSON.stringify({ "input": sentence, "options": options }));

    } catch (error) {
       var x=error;
       res.status(400).send(JSON.stringify(error.message));
    }

});
app.post('/suggest/domain', async function (req, res, next) {
    try {
        console.log(req.body.input)
        res.setHeader('Content-Type', 'application/json');

        var words = req.body.input.trim().split(" ");
        var sentence = req.body.input.trim();
        console.log(sentence)
        //var str={"input":sentence, "options":[]};
        var options = [];
        //var c1=words.some(item => Object.keys(conditions1).includes(item));
        var c1 = Object.keys(conditions1).some(element => {
            return sentence.includes(element);
        })
        console.log(c1);
        //var s=words.some(item => Object.keys(system).includes(item));
        var s = Object.keys(systemDomain).some(element => {
            return sentence.includes(element);
        })
        console.log(words);
        console.log(s);
        //var p=words.some(item =>priority.includes(item));
        var p = priority.some(element => {
            return sentence.includes(element);
        })
        //var a1=words.some(item => Object.keys(activity).includes(item));
        var a1 = Object.keys(activity).some(element => {
            return sentence.includes(element);
        })
        console.log(a1);
        //var sc=words.some(item => securityCriteria.includes(item));
        var sc = securityCriteria.some(element => {
            return sentence.includes(element);
        })
        //var a2=words.some(item => Object.keys(asset["of"]).includes(item));
        var a2 = Object.keys(asset["of"]).some(element => {
            return sentence.includes("of " + element);
        })
        var sm = securityMechanism.some(element => {
            return sentence.includes(element);
        })

        //var sm=false//words.some(item => securityMechanism.includes(item));
        //var vc=words.includes(Object.keys(validation));
        var vc = Object.keys(validation).some(element => {
            return sentence.includes(element);
        })
        //var ad=words.includes(Object.keys(additionalObjectDetails));
        var ad = Object.keys(additionalObjectDetails).some(element => {
            return sentence.includes(element);
        })
        //var c2=words.includes(Object.keys(condition2));
        var c2 = Object.keys(condition2).some(element => {
            return sentence.includes(element);
        })
        //var aa=words.includes(Object.keys(autoAdaptive));
        var aa = Object.keys(autoAdaptive).some(element => {
            return sentence.includes(element);
        })
        var criterion = "";

        // if(words.some(item => activity[elementInSentence(activity,sentence)]["next"].includes(item))) console.log("OK");

        // res.end(JSON.stringify(data.filter(value => value.includes(req.body.q))));

        // no text yet, show the conditions
        // if(req.body.q=="")res.end(JSON.stringify(Object.keys(conditions1)));
        // text but no complete condition yet, auto-complete the condition
        //else if(!Object.keys(conditions1).includes(req.body.q) && req.body.q!="" && !Object.keys(system).includes(req.body.q) && !priority.includes(req.body.q)) res.end(JSON.stringify(Object.keys(conditions1).filter(value => value.includes(req.body.q))));
        // complete condition, send the values
        //else if(Object.keys(conditions1).includes(req.body.q))res.end(JSON.stringify(conditions1[req.body.q]));
        //
        //else if(!Object.keys(system).includes(req.body.q) && !priority.includes(req.body.q)) res.end(JSON.stringify(Object.keys(system).filter(value => value.includes(req.body.q))))
        //
        //else if(Object.keys(system).includes(req.body.q)) res.end(JSON.stringify(system[req.body.q]));
        //
        //else if(priority.includes(req.body.q)) res.end(JSON.stringify(priority.filter(value=> value.includes(req.body.q))));
        //
        //else if(priority.includes(req.body.q)) res.end(JSON.stringify(priority.includes(req.body.q)))
        if (sentence == "") { options.push.apply(options, Object.keys(conditions1)); options.push.apply(options, Object.keys(systemDomain)); console.log(options); }

        else if (!c1 && req.body.input != "" && !s && !p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {
            if (Object.keys(conditions1).filter(value => value.includes(req.body.input)).length > 0) options = (Object.keys(conditions1).filter(value => value.includes(req.body.input)));
            if (Object.keys(systemDomain).filter(value => value.includes(req.body.input)).length > 0) options = (Object.keys(systemDomain).filter(value => value.includes(req.body.input)));
            console.log(options)
        }
        else if (c1 && req.body.input != "" && !s && !p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {

            if (Object.keys(conditions1).includes(words[words.length - 1]))
                options.push((conditions1[words[words.length - 1]]).placeholder);
            else if (words.length >= 2 && Object.keys(conditions1).includes(words[words.length - 2] + " " + words[words.length - 1]))
                options.push((conditions1[words[words.length - 2] + " " + words[words.length - 1]]).placeholder);
            else if (words.length >= 3 && Object.keys(conditions1).includes(words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]))
                options.push((conditions1[words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]]).placeholder);
            else if (conditions1[elementInSentence(conditions1, sentence)]["next"] != "" &&
                (words[words.length - 1]) != conditions1[elementInSentence(conditions1, sentence)]["next"] &&
                (words[words.length - 2] + " " + words[words.length - 1]) != conditions1[elementInSentence(conditions1, sentence)]["next"])
                options.push(conditions1[elementInSentence(conditions1, sentence)]["next"]);
            else options = (Object.keys(systemDomain));
        }
       else if(s && !p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa)
        {
      
        if(Object.keys(systemDomain).includes(words[words.length-1]))
            if((systemDomain[words[words.length-1]]).placeholder1!="")
               options.push((systemDomain[words[words.length-1]]).placeholder1);
            else options.push((systemDomain[words[words.length-1]]).next);
        else if(systemDomain[elementInSentence(systemDomain,sentence)]["next"]==(words[words.length-3]+" "+words[words.length-2]+" "+words[words.length-1]) && systemDomain[elementInSentence(systemDomain,sentence)].placeholder2!="")
            options.push(systemDomain[elementInSentence(systemDomain,sentence)].placeholder2);
        else if(systemDomain[elementInSentence(systemDomain,sentence)].placeholder3!="" ){
            options.push(systemDomain[elementInSentence(systemDomain,sentence)].placeholder3);
            if(sentence.includes(" Restriction: ")){

            str=sentence.split("Restriction: ")
            sentence=str[0]+str[1]
            options=(priority);
            } 
         }
        else options=(priority);
        }
        else if (p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {
            if (priority.includes(words[words.length - 1]))
                options = (Object.keys(activity));
            //verb replaced
            else if (priority.includes(words[words.length - 2])) {
                await getAllCriteria();
                options = (securityCriteria);
            }
        }
        else if (a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {

            if (Object.keys(activity).includes(words[words.length - 1])) {
                if (words[words.length - 1] == "verb") sentence = sentence.replace("verb", "");
                options.push((activity[words[words.length - 1]]).placeholder1);
            }
            else if (words.length >= 3 && Object.keys(activity).includes(words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1])) {
                options.push((activity[words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]]).placeholder1);
            }
            else if (activity[elementInSentence(activity, sentence)]["next"] != "" &&
                (!Array.isArray(activity[elementInSentence(activity, sentence)]["next"]) &&
                    !sentence.includes(activity[elementInSentence(activity, sentence)]["next"]) &&
                    (words[words.length - 1]) != activity[elementInSentence(activity, sentence)]["next"] &&
                    (words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]) != activity[elementInSentence(activity, sentence)]["next"] &&
                    !activity[elementInSentence(activity, sentence)]["next"].includes((words[words.length - 1])) ||
                    (Array.isArray(activity[elementInSentence(activity, sentence)]["next"]) && !words.some(item => activity[elementInSentence(activity, sentence)]["next"].includes(item)))))
                if (Array.isArray(activity[elementInSentence(activity, sentence)]["next"]))
                    options.push.apply(options, activity[elementInSentence(activity, sentence)]["next"]);
                else options.push(activity[elementInSentence(activity, sentence)]["next"])
            else if (activity[elementInSentence(activity, sentence)]["next"] != "" &&
                (activity[elementInSentence(activity, sentence)]).placeholder2 != "" &&
                ((words[words.length - 1]) == activity[elementInSentence(activity, sentence)]["next"] ||
                    (words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]) == activity[elementInSentence(activity, sentence)]["next"] ||
                    activity[elementInSentence(activity, sentence)]["next"].includes((words[words.length - 1]))))
                options.push((activity[elementInSentence(activity, sentence)]).placeholder2)
            else {
                console.log(securityCriteria)
                //Needs to be synchronized
                await getAllCriteria();
                options = (securityCriteria);

            }
        }
        else if (sc && !a2 && !sm && !vc && !ad && !c2 && !aa) {

            if (securityCriteria.includes(words[words.length - 1])) {
                criterion = words[words.length - 1];
                console.log(criterion)
                sentence += " of ";
                options = (Object.keys(asset["of"]));

            }
        }
        else if (a2 && !sm && !vc && !ad && !c2 && !aa) {
            //console.log(sentence.split("of")[1])
            //console.log(((asset["of"])[elementInSentence((asset["of"]),sentence.split("of")[1])]));
            if (Object.keys(asset["of"]).includes(words[words.length - 1])) {
                options.push(((asset["of"])[words[words.length - 1]]).placeholder1);
                console.log(options);
            }
            else if (Object.keys(asset["of"]).includes(words[words.length - 2] + " " + words[words.length - 1])) {
                options.push(((asset["of"])[words[words.length - 2] + " " + words[words.length - 1]]).placeholder1);
            }
            else if ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] != "" &&
                !sentence.includes((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"]) &&
                (words[words.length - 1]) != (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] &&
                (words[words.length - 2] + " " + words[words.length - 1]) != (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] &&
                !(asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"].includes((words[words.length - 1])))
                options.push((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"])
            else if ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] != "" &&
                ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder2 != "" &&
                ((words[words.length - 1]) == (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] ||
                    (words[words.length - 2] + " " + words[words.length - 1]) == (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] ||
                    (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"].includes((words[words.length - 1]))))
                options.push(((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder2)
            else if ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] == "" &&
                ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder2 != "" &&
                (ObjectInSentence((asset["of"]), sentence)) == (words[words.length - 2]))
                options.push(((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder2)
            else if ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] != "" &&
                ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder3 != "" &&
                ((words[words.length - 1]) != (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] &&
                    (words[words.length - 2] + " " + words[words.length - 1]) != (asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] &&
                    (sentence.includes((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"]))) &&
                ((asset["of"])[ObjectInSentence((asset["of"]), sentence)]["next"] == (words[words.length - 2])))
                options.push(((asset["of"])[ObjectInSentence((asset["of"]), sentence)]).placeholder3)
            else {
                console.log("else")
                //Needs to be synchronized
                criterion = securityCriteria.find(element => words.includes(element));
                console.log(criterion);
                if (criterion != "") await getCriteriaMechanisms(criterion);
                sentence += " by ";
                options = (securityMechanism);

            }
            //if(elementInSentence((asset["of"]),sentence)=="Number") sentence=sentence.replace("","");
        }
        else if (sm && !vc && !ad && !c2 && !aa) {

            //console.log(asset["of"])
            if (securityMechanism.includes(words[words.length - 1])) {
                options.push.apply(options, Object.keys(validation));
                options.push.apply(options, Object.keys(condition2));
                options.push.apply(options, Object.keys(additionalObjectDetails));
                options.push.apply(options, Object.keys(autoAdaptive));
                console.log(options)

            }

        }
        else if (vc && !ad && !c2 && !aa) {

            if (Object.keys(validation).includes(words[words.length - 2] + " " + words[words.length - 1])) {
                options.push(validation["complying with"].placeholder1);

            }
            else {
                options.push.apply(options, Object.keys(condition2));
                options.push.apply(options, Object.keys(additionalObjectDetails));
                options.push.apply(options, Object.keys(autoAdaptive));
            }

        }
        else if (!ad && c2 && !aa) {

            if (Object.keys(condition2).includes(words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1])) {
                options.push(condition2[words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]].placeholder1);

            }
            else {
                options.push.apply(options, Object.keys(additionalObjectDetails));
                options.push.apply(options, Object.keys(autoAdaptive));
            }

        }
        else if (ad && !aa) {

            if (Object.keys(additionalObjectDetails).includes(words[words.length - 1])) {
                sentence = sentence.replace("additionalDetails", "");
                options.push(additionalObjectDetails[words[words.length - 1]].placeholder1);

            }
            else options = (Object.keys(autoAdaptive));

        }
        else if (aa) {

            if (Object.keys(autoAdaptive).includes(words[words.length - 1])) {
                options.push(autoAdaptive[words[words.length - 1]].placeholder1);

            }
            else if (Object.keys(autoAdaptive).includes(words[words.length - 2] + " " + words[words.length - 1])) {
                options.push(autoAdaptive[words[words.length - 2] + " " + words[words.length - 1]].placeholder1);

            }
            else if (Object.keys(autoAdaptive).includes(words[words.length - 5] + " " + words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1])) {
                options.push(autoAdaptive[words[words.length - 5] + " " + words[words.length - 4] + " " + words[words.length - 3] + " " + words[words.length - 2] + " " + words[words.length - 1]].placeholder1);

            }
            else if (((autoAdaptive)[elementInSentence((autoAdaptive), sentence)]).placeholder2 != "" &&
                elementInSentence((autoAdaptive), sentence) != words[words.length - 1] &&
                elementInSentence((autoAdaptive), sentence) != words[words.length - 2] + " " + words[words.length - 1] &&
                (elementInSentence((autoAdaptive), sentence) == words[words.length - 2] || elementInSentence((autoAdaptive), sentence) == words[words.length - 3] + " " + words[words.length - 2]))
                options.push(((autoAdaptive)[elementInSentence((autoAdaptive), sentence)]).placeholder2)

        }



        //else if(words.includes(Object.keys(conditions1))  && !words.includes(Object.keys(system)) && !words.includes(priority)) str+=JSON.stringify(Object.keys(conditions1).filter(value => value.includes(req.body.q)));
        res.end(JSON.stringify({ "input": sentence, "options": options }));

    } catch (error) {
       var x=error;
       res.status(400).send(JSON.stringify(error.message));
    }

});
app.get('/version', async function (req, res, next) {
    let version="1.23.02.01.02"
    res.end(JSON.stringify({ "version": version }));
});

app.listen(PORT, HOST, () => {
    console.log(`Running on http://${HOST}:${PORT}`);
  });