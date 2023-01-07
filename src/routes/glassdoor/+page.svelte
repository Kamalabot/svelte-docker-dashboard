<script>
	import * as d3 from "d3"
	import BarPlotV0 from "$lib/BarPlotV0.svelte"
	import TableV1 from "$lib/TableV1.svelte"
	import GroupbarPlot from "$lib/GroupbarPlot.svelte"
	import Alink from "$lib/Alink.svelte"
  const numberFormat = d3.format(".2s")	
	function sumSeries(dataset, series,filterVar,filterOn){
    	let sum = d3.sum(dataset.filter(d =>d[filterOn]==filterVar), d => d[series])
    	return sum
	}
	
	function sumSeriesWoF(dataset, series){
    	let sum = d3.sum(dataset, d => d[series])
    	return sum
	}
	export let data;
  var opc_data = data.opc_data;
  var opl_data = data.opl_data;
  var opt_data = data.opt_data;
  var salq_data = data.salq_data;
  var tools_data = data.tools_data;
  console.log(tools_data)

</script>	

<html class="h-full bg-gray-100">
<body class="h-full">
<div>
  <header class="bg-white">
    <div class="flex mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 gap-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Data Scientist Roles & Salaries</h1>
		</div>
	</header>
</div>
<div class="flex justify-center gap-4 p-6 h-48">  
		<div class="stat">
			<div class="stat-title">Python Required</div>
			<div class="stat-value text-primary"><span>Yes: </span><span>{tools_data[1].python_reqd}</span></div>
      <div class="stat-value text-primary"><span>No: </span><span>{tools_data[0].python_reqd}</span></div>
		</div>
  	<div class="stat">
			<div class="stat-title">Spark Required</div>
			<div class="stat-value text-primary"><span>Yes: </span><span>{tools_data[1].spark_reqd}</span></div>
      <div class="stat-value text-primary"><span>No: </span><span>{tools_data[0].spark_reqd}</span></div>
		</div>
  	<div class="stat">
			<div class="stat-title">AWS Required</div>
			<div class="stat-value text-primary"><span>Yes: </span><span>{tools_data[1].aws_reqd}</span></div>
      <div class="stat-value text-primary"><span>No: </span><span>{tools_data[0].aws_reqd}</span></div>
		</div>
  	<div class="stat">
			<div class="stat-title">Excel Required</div>
			<div class="stat-value text-primary"><span>Yes: </span><span>{tools_data[1].excel_reqd}</span></div>
      <div class="stat-value text-primary"><span>No: </span><span>{tools_data[0].excel_reqd}</span></div>
		</div>
	  <div class="stat">
			<div class="stat-title">R Required</div>
			<div class="stat-value text-primary"><span>Yes: </span><span>{tools_data[1].r_reqd}</span></div>
      <div class="stat-value text-primary"><span>No: </span><span>{tools_data[0].r_reqd}</span></div>
		</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
  <div class="flex-auto card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Opportunity By Title</h2>
      <figure><BarPlotV0 width={450} height={200} chartData={opt_data.slice(0,10)} xVar={"job_title"} yVar={"title_count"} color={'blue'} label={""} class="bg-primary" /></figure>
      <p>Openings as per the title related to data work</p>
      </div>
    </div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Max Salary quoted</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={salq_data.slice(0,10)} xVar={"salary_quoted"} yVar={"max_salary_count"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>How many jobs have these Max Salaries</p>
	  </div>
	</div>
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Min Salary Quoted</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={salq_data.slice(0,10)} xVar={"salary_quoted"} yVar={"min_salary_count"} color={'red'} label={""} class="bg-primary" /></figure>
		<p>How many jobs have these Min Salaries</p>
	  </div>
	</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Opportunity by Location</h2>
		<figure><BarPlotV0 width={650} height={200} chartData={opl_data.slice(0,15)} xVar={"location_city"} yVar={"opening_location"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Number of opening based on Location</p>
	  </div>
	</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-64 h-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Openings in Company</h2>
		<figure><BarPlotV0 width={700} height={260} chartData={opc_data.slice(0,15)} xVar={'company_name'} yVar={'count_per_company'} color={'green'} label={""} class="bg-primary" /></figure>
	  </div>
	</div>
</div>
</body>
</html>
