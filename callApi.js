async function callApiWeb() {
    const args = process.argv;
    const isLocal = args[2] == 's';
    let url;
    let token;
    let body;
  
    url = 'web';
    body = {
    //   fnName: 'getListDocument',
    //   args: [ {} ]

      fnName: 'getDocumentById',
      args: [
        { 
            docId: "6737bbc27323f423dc605920",
            docType : "f"
        }
      ]
    }
  
    if (!isLocal) url = "http://localhost:3000/" + url;
    else url = "https://7n2z6b81k2.execute-api.ap-southeast-1.amazonaws.com/Prod/" + url;
  
    const options = {};
    const method = "POST"; // post
  
    const headers = {
      "Content-Type": "application/json;charset=utf-8"
    }
  
    options.method = method;
    options.headers = headers;
    options.body = JSON.stringify(body);
  
    try {
      const response = await fetch(url,options);
      let data = await response.text();
      try {
        data = JSON.parse(data);
      } catch (e) {
        console.log(e);
      }

      const isHasColor = data.error;
      if (isHasColor) console.log(JSON.stringify(data.error, null, 2));
      else console.log(JSON.stringify(data, null,2 ));
    } catch(e) {
      console.error(JSON.stringify(e, null, 2));
    } finally {
      console.log("\n[end]")
    }
  }

callApiWeb();