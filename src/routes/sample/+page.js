/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"
import { descending, csv } from "d3"

export const load = async ({fetch})=>{

      const factcovid = async() =>{
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
    const irisData = async() =>{
            const url = 'http://localhost:5173/dbtable';
            const options = {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
              },
              body: JSON.stringify({
                tableName: "iris"
              })
          };
          const res = await fetch(url,options)
          const dataRecd = await res.json()
          return dataRecd.yourTable
        }

    const athleteData = async() =>{
            const url = 'http://localhost:5173/dbtable';
            const options = {
              method: 'POST',
              headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json;charset=UTF-8'
              },
              body: JSON.stringify({
                tableName: "athletes"
              })
          };
          const res = await fetch(url,options)
          const dataRecd = await res.json()

          const athleteRes = dataRecd.yourTable.map(d =>({
            name: d.name.split(' ')[1],
            weight: Number(d.weight),
            height: Number(d.height),
            sex: d.sex,
            sport:d.sport
          })).sort((a,b) => descending(a.weight, b.weight))
          return athleteRes
    }
        return {
        covidData: factcovid(),
        athleteData: athleteData(),
        irisData: irisData(),
        color:'green',
        title:'Covid Status in US',
        xVar:'x',
        yVar:'y'
    };
}; 
