import parsers from "$lib/parsers"
import { csv } from "d3"

export const load = async ({params,fetch})=>{
	
	const csvData = async(id) =>{
			const subDo = params.store;
			const res = await fetch('/serveComplex')
			const csvServed = await res.json()
	//		console.log(csvServed.data[0], csvServed.data1[0])
			return{ store:subDo, storeData:csvServed.salesData.filter(d => d['stores'] == subDo)}
		}

		return {
			csvData: csvData(params.store),
		};
}; 