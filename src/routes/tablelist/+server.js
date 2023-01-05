export const GET = async({request, locals})=>{
    console.log('Requesting postgres to provide data');
     
    const {sql} = locals;
    const {sql2} = locals;
     
    const tableNames = await sql`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`
    const cp_tables = await sql2`SELECT table_name FROM information_schema.tables WHERE table_schema='public'`
    const tableData = {tableNames,cp_tables} 
    console.log(tableData,'API reply')
    return new Response(JSON.stringify(tableData),{status:200})
}

 
