/** The datasets available in the database will be populated here*/
import parsers from "$lib/parsers"

export const load = async ({fetch})=>{
    const fetchData = async() =>{
    const url = 'http://localhost:5173/tablelist';
    const res = await fetch(url)
    const dataRecd = await res.json()
    return dataRecd
  }
    
  return {
      tableData: fetchData()
  };
}; 
