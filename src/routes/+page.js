/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"

export const load = async ({fetch})=>{
    
    const fetchData = async() =>{
        const res = await fetch('https://api.covidtracking.com/v1/us/daily.json')
        const dataRecd = await res.json()
        const parsedData = parsers.historicUS(dataRecd)
        return parsedData
    }
    
    return {
        chartData: fetchData(),
        color:'green',
        title:'Covid Status in US',
        xVar:'x',
        yVar:'y'
    };
}; 