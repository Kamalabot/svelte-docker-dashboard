import duck from "duckdb"

export const GET = async ()=>{
  console.log('Reading the csv file directly from the repo location /lib');
  var db = new duck.Database(":memory:") 
  var con = db.connect()
  con.run("CREATE TABLE iris AS SELECT * FROM read_csv_auto('src/lib/iris.csv')");
  var getData = con.all('SELECT * FROM iris', (e, payload)=>{
    if(e){
      throw e;
    }
    console.log('this is inside func',payload.slice(1,2))
    return payload
  });
  console.log('outside',getData)
  return new Response(JSON.stringify(payload))
}
