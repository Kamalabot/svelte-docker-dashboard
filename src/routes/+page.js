/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"

export const load = async ({fetch})=>{
    const fetchData = async() =>{
    const url = 'http://localhost:5173/dbtable';
    const options = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      body: JSON.stringify({
        tableName: "factcovid"
      })
    };
    const res = await fetch(url,options)
    const dataRecd = await res.json()
    const parsedData = parsers.historicUS(dataRecd.yourTable)
    return parsedData
  }
    
  //console.log(fetchData())
  return {
      chartData: fetchData(),
      color:'green',
      title:'Covid Status in US',
      xVar:'x',
      yVar:'y'
  };
}; 
