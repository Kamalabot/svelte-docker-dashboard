/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"
import { csv } from "d3"

export const load = async ({fetch})=>{

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
      //:console.log(fmcgRecd)
            const companyByIncome = fmcgRecd.yourTable.map(d => ({
                Company_Name: d['companyname'],
                qtr: d.quarter,
              TotalIncome: Number(d['totalincome'])
              }))
            const companyFilteredByIncome = fmcgRecd.yourTable
                .filter(d => d.quarter == "Q4 2019")
                .map(d => ({
                Company_Name: d['companyname'],
                Total_Income: Number(d['totalincome']),
                Industry:d['industry'],
                Net_Profit:Number(d['NetProfitLossfromOrdinaryActivitiesafterTax'])
                }))
            const companies = [...new Set(companyByIncome.map(d => d.Company_Name))]
            const qtr = [...new Set(companyByIncome.map(d => d.qtr))]
            const fmcgArray = [companyByIncome,companies,qtr,companyFilteredByIncome] 
            return fmcgArray
          }
    return {
        fmcgData: fmcgCompany()
    };
}; 
