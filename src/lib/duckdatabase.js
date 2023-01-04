import duck from "duckdb"
console.log('Reading from the repo location /lib');
var db = new duck.Database(":memory:") 
var con = db.connect()
con.run("CREATE TABLE iris AS SELECT * FROM read_csv_auto('/run/media/solverbot/repoA/gitFolders/svelte-docker-dashboard/src/lib/iris.csv')");
con.all('SELECT * FROM iris', (e, r) =>{
  if(e){
    throw e
  }
  console.log(r)
}) 
var file = con.return()
console.log(file)
