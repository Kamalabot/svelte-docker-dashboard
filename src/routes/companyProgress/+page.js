/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"
import { descending, csv , timeParse, json, format} from "d3"

export const load = async ({fetch})=>{

      const progressData = async() =>{
        const url = 'http://localhost:5173/dbcompany_prog';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            tableName: "company_made_progress"
          })
      };
      const res = await fetch(url,options)
      const companyProgress = await res.json()
      return companyProgress
      }
      const monthlyData = async() =>{
        const url = 'http://localhost:5173/dbcompany_prog';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            tableName: "monthly_data"
          })
      };
      const res = await fetch(url,options)
      const monthwise = await res.json()
      return monthwise 
      }
       const repsData = async() =>{
        const url = 'http://localhost:5173/dbcompany_prog';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            tableName: "salesreps_data"
          })
      };
      const res = await fetch(url,options)
      const repswise = await res.json()
      return repswise 
      }
       const productData = async() =>{
        const url = 'http://localhost:5173/dbcompany_prog';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            tableName: "product_data"
          })
      };
      const res = await fetch(url,options)
      const productwise = await res.json()
      return productwise 
      }
       const locationData = async() =>{
        const url = 'http://localhost:5173/dbcompany_prog';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            tableName: "location_data"
          })
      };
      const res = await fetch(url,options)
      const locationwise = await res.json()
      return locationwise 
      }
       const monthlyrep = async() =>{
        const url = 'http://localhost:5173/dbcompany_prog';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            tableName: "reps_monthly"
          })
      };
      const res = await fetch(url,options)
      const monthrepwise = await res.json()
      return monthrepwise 
      }
       const monthlypdt = async() =>{
        const url = 'http://localhost:5173/dbcompany_prog';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            tableName: "product_monthly"
          })
      };
      const res = await fetch(url,options)
      const monthpdtwise = await res.json()
      return monthpdtwise 
      }
      
      const monthlyloc = async() =>{
        const url = 'http://localhost:5173/dbcompany_prog';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            tableName: "location_monthly"
          })
      };
      const res = await fetch(url,options)
      const monthlocwise = await res.json()
      return monthlocwise 
      }

            return {
        progressCleaned:progressData(),
        month_data:monthlyData(),
        product_data:productData(),
        location_data:locationData(),
        reps_data:repsData(),
        reps_monthly:monthlyrep(),
        pdt_monthly:monthlypdt(),
        location_monthly:monthlyloc()
    };
}; 
