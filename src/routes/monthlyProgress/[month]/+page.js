/** @type {import('./$types').PageLoad} */
import { descending, csv , timeParse, json, format} from "d3"

export const load = async ({params,fetch})=>{

      const monthlyData = async(id) =>{
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
        return monthwise.yourTable.filter(x => x.month.trim() == id) 
      }
      const monthlyrep = async(id) =>{
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
        return monthrepwise.yourTable.filter(x => x.month.trim() == id) 
      }
       const monthlypdt = async(id) =>{
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
         return monthpdtwise.yourTable.filter(x => x.month.trim() == id) 
      }
      
      const monthlyloc = async(id) =>{
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
      console.log(monthlocwise.yourTable) 
      console.log(id)
        return monthlocwise.yourTable.filter(x => x.month.trim() == id) 
      }

            return {
        month_data:monthlyData(params.month),
        reps_monthly:monthlyrep(params.month),
        pdt_monthly:monthlypdt(params.month),
        location_monthly:monthlyloc(params.month)
    };
}; 
