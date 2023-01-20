var express = require('express');
var axios = require('axios');
const bodyParser = require("body-parser");
var app=express()
var port =8989
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const ip = "http://193.52.45.42:8585/";
//const data = ["apple","apple watch","iphone","iphone x","apple macbook","apple macbook air","apple macbook air pro 13"];
const conditions1 = {"If" :{
                            "placeholder":"<Condition>",
                            "next":"then"
                         },
                    "When" :{
                        "placeholder":"<Condition>",
                        "next":"then"
                         },
                    "While" :{
                        "placeholder": "<Activation State>",
                        "next": ""
                        },
                    "During" :{
                        "placeholder" : "<Activation State>",
                        "next":""
                        },
                    "In Case" :{
                        "placeholder" : "<Included Feature>",
                        "next": "is included"
                    },
                    "After" :{
                        "placeholder" : "<Behavior>",
                        "next":""
                    },
                    "Before" :{
                        "placeholder" : "<Behavior>",
                        "next":""

                    },
                    "As soon as":{
                        "placeholder" : "<Behavior>",
                        "next":""

                    }
                };
 const system = {"The" :{
                    "placeholder":"<System or Part Name>",
                    "next":""
                 }
        }; 
const priority = ["shall","should","could","will"];
const activity = {"provide" :{
                "placeholder1":"<Who?>",
                "next":"with the ability to",
                "placeholder2":"<Process Verb>"
                },
                "verb" :{
                "placeholder1":"<Process Verb>",
                "next":"",
                "placeholder2":""
                },
                "be able to" :{
                "placeholder": "<Process Verb>",
                "next": [
                    "from",
                    "towards"
                    ],
                "placeholder2":"<System or External Device Name>"
                }
};
var securityCriteria=[];
const asset = { "of": {
                "as many ":{
                    "placeholder1":"<Objects/Assets>",
                    "next":"as possible",
                    "placeholder2":""
                },
                "as few ":{
                    "placeholder1":"<Objects/Assets>",
                    "next":"as possible",
                    "placeholder2":""
                },
                "a":{
                    "placeholder1":"<Objects/Assets>",
                    "next":"",
                    "placeholder2":""
                },
                "an":{
                    "placeholder1":"<Objects/Assets>",
                    "next":"",
                    "placeholder2":""
                },
                "the":{
                    "placeholder1":"<Objects/Assets>",
                    "next":"",
                    "placeholder2":""
                },
                "number":{
                    "placeholder1":"<X>",
                    "next":"",
                    "placeholder2":"<Objects/Assets>"
                },
                "between":{
                    "placeholder1":"<A>",
                    "next":"and",
                    "placeholder2":"<B>",
                    "placeholder3":"<Objects/Assets>"
                },
                "all the":{
                    "placeholder1":"<Objects/Assets>",
                    "next":"",
                    "placeholder2":"",
                    "placeholder3":""
                }

            }

};
var securityMechanism=[];
const validation={
    "complying with":{
        "placeholder1":"<Validation Criteria>"
    }
};
const condition2={
    "if and only if":{
        "placeholder1":"<Condition>"
    }
};
const additionalObjectDetails={
    "additionalDetails":{
        "placeholder1":"<Additional Object Details>"
    }
};
const autoAdaptive={
    "before":{
        "placeholder1":"<Event>"
    },
    "after":{
        "placeholder1":"<Event>"
    },
    "during":{
        "placeholder1":"<Event>"
    },
    "as early as possible before":{
        "placeholder1":"<Event>"
    },
    "as early as possible after":{
        "placeholder1":"<Event>"
    },
    "as early as possible during":{
        "placeholder1":"<Event>"
    },
    "as late as possible before":{
        "placeholder1":"<Event>"
    },
    "as late as possible after":{
        "placeholder1":"<Event>"
    },
    "as late as possible during":{
        "placeholder1":"<Event>"
    },
    "until":{
        "placeholder1":"<Event>"
    },
    "within":{
        "placeholder1":"<Time Interval>",
        "placeholder2":"<Time Unit>"
    },
    "at least":{
        "placeholder1":"<Quantity>",
        "placeholder2":"<Frequency>"
    },
    "eventually":{
        "placeholder1":""
    },
    "as late as possible after":{
        "placeholder1":[
            "<Quantity>",
            "<Frequency>"
        ]
    }
    

    

};
 
const getAllCriteria= async () =>{
    
    try{
         var res=await axios.get(ip+'criteria')
         //console.log(res);
         securityCriteria=res.data;
         
        //.then((response)=>{
            
          //securityCriteria=response.data;
        //})
        //.catch(function (error) {
            //console.log(error.toJSON());
        //});
    }
    catch(e){
        console.log(e)
    }
    
}

 async function getCriteriaMechanisms(criterion){
    
    try{
         var res=await axios.get(ip+'criteria/'+criterion+'/mechanisms')
         //console.log(res);
         securityMechanism=res.data;
         
        //.then((response)=>{
            
          //securityCriteria=response.data;
        //})
        //.catch(function (error) {
            //console.log(error.toJSON());
        //});
    }
    catch(e){
        console.log(e)
    }
    
} 

app.post('/suggest',async function(req, res, next) {
  console.log(req.body.q)
  res.setHeader('Content-Type', 'application/json');
  
  var words=req.body.q.split(" ");
  var sentence=req.body.q;
  var str=sentence;
  //var c1=words.some(item => Object.keys(conditions1).includes(item));
  var c1=Object.keys(conditions1).some(element => {
    return sentence.includes(element);
  })
  console.log(c1);
  //var s=words.some(item => Object.keys(system).includes(item));
  var s=Object.keys(system).some(element => {
    return sentence.includes(element);
  })
  console.log(words);
  console.log(s);
  //var p=words.some(item =>priority.includes(item));
  var p=priority.some(element => {
    return sentence.includes(element);
  })
  //var a1=words.some(item => Object.keys(activity).includes(item));
  var a1=Object.keys(activity).some(element => {
    return sentence.includes(element);
  })
  console.log(a1);
  //var sc=words.some(item => securityCriteria.includes(item));
  var sc=securityCriteria.some(element => {
    return sentence.includes(element);
  })
  //var a2=words.some(item => Object.keys(asset["of"]).includes(item));
  var a2=Object.keys(asset["of"]).some(element => {
    return sentence.includes("of "+element);
  })
  var sm=securityMechanism.some(element => {
    return sentence.includes(element);
  })

 //var sm=false//words.some(item => securityMechanism.includes(item));
  //var vc=words.includes(Object.keys(validation));
  var vc=Object.keys(validation).some(element => {
    return sentence.includes(element);
  })
  //var ad=words.includes(Object.keys(additionalObjectDetails));
  var ad=Object.keys(additionalObjectDetails).some(element => {
    return sentence.includes(element);
  })
  //var c2=words.includes(Object.keys(condition2));
  var c2=Object.keys(condition2).some(element => {
    return sentence.includes(element);
  })
  //var aa=words.includes(Object.keys(autoAdaptive));
  var aa=Object.keys(autoAdaptive).some(element => {
    return sentence.includes(element);
  })
  var criterion="";
  
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
  if(sentence=="") str+=JSON.stringify(Object.keys(conditions1));
  else if(!c1 && req.body.q!="" && !s && !p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) 
   {
       if(Object.keys(conditions1).filter(value => value.includes(req.body.q)).length>0)str+=JSON.stringify(Object.keys(conditions1).filter(value => value.includes(req.body.q)));
       if(Object.keys(system).filter(value => value.includes(req.body.q)).length>0)str+=JSON.stringify(Object.keys(system).filter(value => value.includes(req.body.q)));
   }
  else if(c1 && req.body.q!="" && !s && !p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa) 
   {    
       if(Object.keys(conditions1).includes(words[words.length-1]))
            str+=JSON.stringify(conditions1[words[words.length-1]]);
       else if(words.length>=2 && Object.keys(conditions1).includes(words[words.length-2]+" "+words[words.length-1]))
            str+=JSON.stringify(conditions1[words[words.length-2]+" "+words[words.length-1]]);
       else if(words.length>=3 && Object.keys(conditions1).includes(words[words.length-3]+" "+words[words.length-2]+" "+words[words.length-1]))
            str+=JSON.stringify(conditions1[words[words.length-3]+" "+words[words.length-2]+" "+words[words.length-1]]);
       else str+=JSON.stringify(Object.keys(system));
   }
  else if(s && !p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa)
  {
        if(Object.keys(system).includes(words[words.length-1]))
            str+=JSON.stringify(system[words[words.length-1]]);
        else str+=JSON.stringify(priority);
  } 
  else if(p && !a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa)
  {
        if(priority.includes(words[words.length-1]))
            str+=JSON.stringify(Object.keys(activity));
        //verb replaced
        else if(priority.includes(words[words.length-2])){
            await getAllCriteria();
            str+=JSON.stringify(securityCriteria);
        }
  }
  else if(a1 && !sc && !a2 && !sm && !vc && !ad && !c2 && !aa)
  {
   
        if(Object.keys(activity).includes(words[words.length-1]))
            {
                if(words[words.length-1]=="verb") str=str.replace("verb","");
                str+=JSON.stringify(activity[words[words.length-1]]);
            }
        else if(words.length>=3 && Object.keys(activity).includes(words[words.length-3]+" "+words[words.length-2]+" "+words[words.length-1]))
        {
            str+=JSON.stringify(activity[words[words.length-3]+" "+words[words.length-2]+" "+words[words.length-1]]);
        }
        else  {
            console.log(securityCriteria)
            //Needs to be synchronized
            await getAllCriteria();
            str+=JSON.stringify(securityCriteria);
                
        }
  }
   else if(sc && !a2 && !sm && !vc && !ad && !c2 && !aa){

        if(securityCriteria.includes(words[words.length-1])){
            criterion=words[words.length-1];
            console.log(criterion)
            str+=" of "+JSON.stringify(Object.keys(asset["of"]));
            
        }
  }
  else if(a2 && !sm && !vc && !ad && !c2 && !aa){

    //console.log(asset["of"])
    if(Object.keys(asset["of"]).includes(words[words.length-1]))
    {
        str+=JSON.stringify((asset["of"])[words[words.length-1]]);
    }
    else  {
        //console.log(securityCriteria)
        //Needs to be synchronized
        criterion=securityCriteria.find(element => words.includes(element));
        console.log(criterion);
        if(criterion!="") await getCriteriaMechanisms(criterion);
        str+=" by "+JSON.stringify(securityMechanism);
            
    }
  } 
  else if(sm && !vc && !ad && !c2 && !aa){

    //console.log(asset["of"])
    if(securityMechanism.includes(words[words.length-1]))
    {
        str+=JSON.stringify("{"+Object.keys(validation)+","+Object.keys(condition2)+","+Object.keys(additionalObjectDetails)+","+Object.keys(autoAdaptive)+"}");
    
    }

  } 
  else if(vc && !ad && !c2 && !aa){
    
    if(Object.keys(validation).includes(words[words.length-2]+" "+words[words.length-1]))
    {
        str+=JSON.stringify(validation["complying with"]);
        
    }
    else str+=JSON.stringify("{"+Object.keys(condition2)+","+Object.keys(additionalObjectDetails)+","+Object.keys(autoAdaptive))+"}";

  }
  else if(!ad && c2 && !aa){
    
    if(Object.keys(condition2).includes(words[words.length-4]+" "+words[words.length-3]+" "+words[words.length-2]+" "+words[words.length-1]))
    {   
        str+=JSON.stringify(condition2[words[words.length-4]+" "+words[words.length-3]+" "+words[words.length-2]+" "+words[words.length-1]]);
        
    }
    else str+=JSON.stringify("{"+Object.keys(additionalObjectDetails)+","+Object.keys(autoAdaptive)+"}");

  } 
  else if(ad && !aa){
    
    if(Object.keys(additionalObjectDetails).includes(words[words.length-1]))
    {   
        str=str.replace("additionalDetails","");
        str+=JSON.stringify(additionalObjectDetails[words[words.length-1]]);
        
    }
    else str+=JSON.stringify(Object.keys(autoAdaptive));

  } 
  else if(aa){
    
    if(Object.keys(autoAdaptive).includes(words[words.length-1]))
    {   
        str+=JSON.stringify(autoAdaptive[words[words.length-1]]);
        
    }
    else if(Object.keys(autoAdaptive).includes(words[words.length-2]+" "+words[words.length-1]))
    {   
        str+=JSON.stringify(autoAdaptive[words[words.length-2]+" "+words[words.length-1]]);
        
    }
    else if(Object.keys(autoAdaptive).includes(words[words.length-5]+" "+words[words.length-4]+" "+words[words.length-3]+" "+words[words.length-2]+" "+words[words.length-1]))
    {   
        str+=JSON.stringify(autoAdaptive[words[words.length-5]+" "+words[words.length-4]+" "+words[words.length-3]+" "+words[words.length-2]+" "+words[words.length-1]]);
        
    }

  }

  

  //else if(words.includes(Object.keys(conditions1))  && !words.includes(Object.keys(system)) && !words.includes(priority)) str+=JSON.stringify(Object.keys(conditions1).filter(value => value.includes(req.body.q)));
  res.end(str);

});

app.listen(port);