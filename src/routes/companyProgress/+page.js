/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"
import { descending, csv , timeParse, json, format} from "d3"

export const load = async ({fetch})=>{

      const progressData = async() =>{
        const url = 'http://localhost:5173/dbusers';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            tableName: "user_table"
          })
      };
      const res = await fetch(url,options)
      const companyProgress = await res.json()
      console.log(companyProgress)
      return companyProgress
      }
            return {
        progressCleaned:progressData(),
    };
}; 
