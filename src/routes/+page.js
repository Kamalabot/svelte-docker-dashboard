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
    console.log(bseScripts,'json imported')
    return parsedData
  }
    const fetchGap = async()=>{
	const gapRes = await fetch('https://kamalabot.github.io/M3nD3/ObservableData/gapminder.json')
	const gapminder = await gapRes.json() 
	console.log(gapminder)
	return gapminder
    }
  //console.log(fetchData())
  return {
      chartData: fetchData(),
      gapData: fetchGap(),
      color:'green',
      title:'Covid Status in US',
      xVar:'x',
      yVar:'y'
  };
}; 
