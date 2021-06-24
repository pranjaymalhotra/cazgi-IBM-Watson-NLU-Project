const express = require('express');
const dotenv = require('dotenv');

dotenv.config();

const app = new express();


function getNLUInstance(){
    let api_key = process.env.API_KEY;
    let api_url = process.env.API_URL;

    const NaturalLanguageUnderstandingV1 = require('ibm-watson/natural-language-understanding/v1');
    const { IamAuthenticator } = require('ibm-watson/auth');

    const naturalLanguageUnderstanding = new NaturalLanguageUnderstandingV1({
      version: '2021-03-25',
      authenticator: new IamAuthenticator({
        apikey: api_key,
      }),
      serviceUrl: api_url,
    });


    return naturalLanguageUnderstanding;

}


const nlu = getNLUInstance();

app.use(express.static('client'))

const cors_app = require('cors');
app.use(cors_app());

app.get("/",(req,res)=>{
    res.render('index.html');
  });

app.get("/url/emotion", (req,res) => {

    const analyzeParams = {
      'url': req.query.text,
      'features': {
        'emotion': {}
        },
    };

    nlu.analyze(analyzeParams)
       .then(analysisResults => {
            let result = analysisResults.result.emotion.document.emotion;
            console.log(result);
            return res.send(result);
       })
       .catch(err => {
            return res.send("error: "+err);
       })
});

app.get("/url/sentiment", (req,res) => {
    const analyzeParams = {
      'url': req.query.text,
      'features': {
        'sentiment': {}
        },
    };

    nlu.analyze(analyzeParams)
       .then(analysisResults => {
            let result = analysisResults.result.sentiment.document.label;
            console.log(result);
            return res.send(result);
       })
       .catch(err => {
            return res.send("error: "+err);
       })
});

app.get("/text/emotion", (req,res) => {
    const analyzeParams = {
      'text': req.query.text,
      'features': {
        'emotion': {}
        },
    };

    nlu.analyze(analyzeParams)
       .then(analysisResults => {
            let result = analysisResults.result.emotion.document.emotion;
            console.log(result);
            return res.send(result);
       })
       .catch(err => {
            return res.send("error: "+err);
       })
});

app.get("/text/sentiment", (req,res) => {

    const analyzeParams = {
      'text': req.query.text,
      'features': {
        'sentiment': {}
        },
    };

    nlu.analyze(analyzeParams)
       .then(analysisResults => {
            let result = analysisResults.result.sentiment.document.label;
            console.log(result);
            return res.send(result);
       })
       .catch(err => {
            return res.send("error: "+err);
       })

});

let server = app.listen(8080, () => {
    console.log('Listening', server.address().port)
})
