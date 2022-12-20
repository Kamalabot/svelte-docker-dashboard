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
            console.log(fmcgRecd)
            const companyByIncome = fmcgRecd.map(d => ({
                Company_Name: d['Company Name'],
                qtr: d.Quarter,
                TotalIncome: Number(d['Total Income'])
              }))

            const companyfilteredbyincome = fmcgRecd	
              .filter(d => d.quarter == "q4 2019")
              .map(d => ({
              company_name: d['company name'],
              total_income: number(d['total income']),
              industry:d['industry'],
              net_profit:number(d['net profit  loss  from ordinary activities after tax'])
              }))
            const companies = [...new Set(companyByIncome.map(d => d.Company_Name))]
            const qtr = [...new Set(companyByIncome.map(d => d.qtr))]
            fmcgArray = [companyByIncome,companies,qtr,companyfilteredbyincome] 
            return fmcgArray
          }
    return {
        fmcgData: fmcgCompany(),
        color:'green',
        title:'Covid Status in US',
        xVar:'x',
        yVar:'y'
    };
}; 
