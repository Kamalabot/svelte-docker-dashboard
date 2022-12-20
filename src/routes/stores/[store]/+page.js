import parsers from "$lib/parsers"
import { csv } from "d3"

export const load = async ({params,fetch})=>{
      const salesData = async(id) =>{
			const subDo = id;
      const url = 'http://localhost:5173/dbtable';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          tableName: "sales_performance_csv"
        })
       };
      const res = await fetch(url,options)
      const dataServed = await res.json()
      //console.log(dataServed)
      const dataFiltered = dataServed.yourTable.filter(d => d['Stores'] == subDo)
      //console.log(dataFiltered)
			return{ store:subDo, storeData:dataFiltered }

      }
		return {
			storeSD: salesData(params.store)
		};
  }
