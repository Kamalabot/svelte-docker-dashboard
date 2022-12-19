import parsers from "$lib/parsers"
import { csv } from "d3"

export const load = async ({params,fetch})=>{
	
	const csvData = async(id) =>{
			const subDo = params.rep;
			const res = await fetch('/serveComplex')
			const csvServed = await res.json()
	//		console.log(csvServed.data[0], csvServed.data1[0])
			return{ reps:subDo, repsData:csvServed.salesData.filter(d => d['reps'] == subDo)}
		}

		return {
			csvData: csvData(params.rep),
		};
}; 