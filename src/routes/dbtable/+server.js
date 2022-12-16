import { csv } from "d3"

export const GET = async({request, locals})=>{
    console.log('Requesting postgres to provide data');
     
    const {sql} = locals;
     
    const irisData = await sql`SELECT * FROM iris`
	//const custAcq = await sql`SELECT * FROM custacq`
	//const monthlyTgts = await sql`SELECT * FROM monthlytgt`
	//const visHeads = await sql`SELECT * FROM vizhead` 
	//const fmcgCompany = await sql`SELECT * FROM fmcgindia` 
    const tableData = {irisData} 
    console.log(tableData,'API reply')
    return new Response(JSON.stringify(tableData),{status:200})
}

export const POST = async({request, locals})=>{
	const {sql} = locals;	
	console.log("Requesting specific tables from the database!!!");
    const body = await request.json();
	const tableName = body.tableName;
	const yourTable = await sql`SELECT * FROM ${ sql(tableName) }`
	return new Response(JSON.stringify({yourTable}));
} 
