import { csv } from "d3"

export const POST = async({request, locals})=>{
	const {sql2} = locals;	
	console.log("Executing the company_progress table!!!");
    const body = await request.json();
	const tableName = body.tableName;
	const yourTable = await sql2`SELECT * FROM ${ sql2(tableName) }`
	return new Response(JSON.stringify({yourTable}));
} 
