import parsers from "$lib/parsers"
import { csv, timeParse, format } from "d3"

export const load = async ({params,fetch})=>{
    const tableData = async(id) =>{
      console.log(id)
      const url = 'http://localhost:5173/dbtable';
      const options = {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json;charset=UTF-8'
        },
        body: JSON.stringify({
          tableName: id 
        })
       };
      const res = await fetch(url,options)
      const dataServed = await res.json()
      console.log(dataServed)
			return dataServed.yourTable

      }
    const fetchList= async() =>{
      const url = 'http://localhost:5173/tablelist';
      const res = await fetch(url)
      const dataRecd = await res.json()
      return dataRecd.tableNames
      }

		return {
			tableData: tableData(params.table),
      tableList: fetchList()
		};
  }
