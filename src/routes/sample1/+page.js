/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"
import { csv } from "d3"

export const load = async ({fetch})=>{
    
    const fetchData = async() =>{
        const res = await fetch('https://api.covidtracking.com/v1/us/daily.json')
        const dataRecd = await res.json()
        const parsedData = parsers.historicUS(dataRecd)
        return parsedData
    }

    const irisData = async() =>{
        const res = await fetch('/bseScripts.json')
        const dataRecd = await res.json()
        return dataRecd
    }

    const pyPiDownloads = async() =>{
        const res = await fetch('/top-pypi-packages-30-days.json')
        const pkgDownload = await res.json()
        return pkgDownload
    }

    const csvData = async() =>{
        const res = await fetch('/serveCSV')
        const csvServed = await res.json()
//		console.log(csvServed.data[0], csvServed.data1[0])
        return csvServed
    }
	
	 const complexData = async() =>{
        const res = await fetch('/serveComplex')
        const csvSimple = await res.json()
//		console.log(csvServed.data[0], csvServed.data1[0])
        return csvSimple
    }
    
    return {
        chartData: fetchData(),
        irisData: irisData(),
        pypiData: pyPiDownloads(), 
        csvData: csvData(),
		complexData: complexData(),
        color:'green',
        title:'Covid Status in US',
        xVar:'x',
        yVar:'y'
    };
}; 