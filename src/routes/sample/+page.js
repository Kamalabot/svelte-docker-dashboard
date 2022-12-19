/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"
import { csv } from "d3"

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
          return dataRecd
        }

    const bseData = async() =>{
        const res = await fetch('bseScripts.json')
        const dataRecd = await res.json()
        return dataRecd
    }

    const pyPiDownloads = async() =>{
        const res = await fetch('top-pypi-packages-30-days.json')
        const pkgDownload = await res.json()
        return pkgDownload
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

          const athleteRes = dataRecd.map(d =>({
            name: d.name.split(' ')[1],
            weight: Number(d.weight),
            height: Number(d.height),
            sex: d.sex,
            sport:d.sport
          })).sort((a,b) => descending(a.weight, b.weight))
          return athleteRes
    }
    const fmcgCompany = async() =>{
              const url = 'http://localhost:5173/dbtable';
              const options = {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json;charset=UTF-8'
                },
                body: JSON.stringify({
                  tableName: "fmcgindia"
                })
            };
            const res = await fetch(url,options)
            const fmcgRecd = await res.json()
            const companyByIncome = fmcgRecd.map(d => ({
                Company_Name: d['Company Name'],
                qtr: d.Quarter,
                TotalIncome: Number(d['Total Income'])
              }))
            const companies = [...new Set(companyByIncome.map(d => d.Company_Name))]
            const qtr = [...new Set(companyByIncome.map(d => d.qtr))]
            fmcgArray = [companyByIncome,companies,qtr] 
            return fmcgArray
          }
    return {
        covidData: factcovid(),
        bseData: bseData(),
        pypiData: pyPiDownloads(), 
        athleteData: athleteData(),
        fmcgData: fmcgCompany(),
        irisData: irisData(),
        color:'green',
        title:'Covid Status in US',
        xVar:'x',
        yVar:'y'
    };
}; 
