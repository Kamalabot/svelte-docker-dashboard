import { csv } from "d3"

export const POST = async({request, locals})=>{
	const {sql1} = locals;	
	console.log("Executing the Users table!!!");
    const body = await request.json();
	const tableName = body.tableName;
	const yourTable = await sql1`SELECT * FROM ${ sql1(tableName) }`
	return new Response(JSON.stringify({yourTable}));
} 
