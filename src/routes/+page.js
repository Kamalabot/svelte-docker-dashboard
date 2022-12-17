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
        tableName: "factCovid"
      })
    };
    const res = await fetch('https://api.covidtracking.com/v1/us/daily.json')
    const dataRecd = await res.json()
    const parsedData = parsers.historicUS(dataRecd)
    return parsedData
  }
    
  return {
      chartData: fetchData(),
      color:'green',
      title:'Covid Status in US',
      xVar:'x',
      yVar:'y'
  };
}; 
