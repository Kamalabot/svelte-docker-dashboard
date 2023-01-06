<script>
	import * as d3 from "d3"
	import BarPlotV0 from "$lib/BarPlotV0.svelte"
	import TableV1 from "$lib/TableV1.svelte"
	import GroupbarPlot from "$lib/GroupbarPlot.svelte"
	import Alink from "$lib/Alink.svelte"
	
	function sumSeries(dataset, series,filterVar,filterOn){
    	let sum = d3.sum(dataset.filter(d =>d[filterOn]==filterVar), d => d[series])
    	return sum
	}
	
	function sumSeriesWoF(dataset, series){
    	let sum = d3.sum(dataset, d => d[series])
    	return sum
	}
	export let data;
	console.log(data.month_data.yourTable,'location_data')
  const months = data.month_data.yourTable.map(x => x.month)
  const location = data.location_data.yourTable.map(x => x.location)
  const reps = data.reps_data.yourTable.map(x => x.sales_reps)
  
  const total_sales = sumSeriesWoF(data.month_data.yourTable, 'monthly_sales') 
  const total_qty = sumSeriesWoF(data.month_data.yourTable,'monthly_qty')
  const total_cost = sumSeriesWoF(data.month_data.yourTable, 'monthly_cogs')
  console.log(total_cost)	
</script>	

<html class="h-full bg-gray-100">
<body class="h-full">
<div>
  <header class="bg-white">
    <div class="flex mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 gap-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Company Progress Data</h1>
		<div class="dropdown">
			<label tabindex="0" class="btn m-1">Month</label>
			<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
			{#each months as mon}
			  <li><Alink location={'month'} variable={mon}/></li>
			{/each}
			</ul>
		</div>
		<div class="dropdown">
			<label tabindex="0" class="btn m-1">Executives</label>
			<ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
			{#each reps as rep}
			  <li><Alink location={'reps'} variable={rep}/></li>
			{/each}
			</ul>
    	</div>
  </header>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Monthly Sales $</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={data.month_data.yourTable} xVar={"month"} yVar={"monthly_sales"} color={'green'} label={""} class="bg-primary" /></figure>
		<p>Monthly Sales Performance</p>
	  </div>
	</div>
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Gross Margin</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={data.month_data.yourTable} xVar={"month"} yVar={"monthly_profit"} color={'blue'} label={""} class="bg-primary" /></figure>
		<p>Monthly Gross Margin Performance</p>
	  </div>
	</div>
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Cost $</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={data.month_data.yourTable} xVar={"month"} yVar={"monthly_cogs"} color={'red'} label={""} class="bg-primary" /></figure>
		<p>Monthly Cost of Goods Sold</p>
	  </div>
	</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Sales Per Location</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={data.location_data.yourTable} xVar={"location"} yVar={"location_sales"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Sales Performance of the Location</p>
	  </div>
	</div>
	<div class="w-64 bg-base-100 shadow-xl">  
		  <div class="stat">
			<div class="stat-title">Total_transaction</div>
			<div class="stat-value text-primary">{total_qty}</div>
			<div class="stat-desc">How Much qty?</div>
		  </div>
		  <div class="stat">
			<div class="stat-title">Total Sales</div>
			<div class="stat-value text-secondary">{total_sales}</div>
			<div class="stat-desc">Revenue</div>
		  </div>
		  <div class="stat">
			<div class="stat-title">Cost of Goods</div>
			<div class="stat-value text-secondary">{total_cost}</div>
			<div class="stat-desc">Cost of Goods Sold</div>
		  </div>
	</div>
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Units Sold per Product</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={data.product_data.yourTable} xVar={"product"} yVar={"product_qty"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Sales of Each product</p>
	  </div>
	</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Sales Performance</h2>
		<figure><figure>
	  </div>
	</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-64 h-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Sales and Cost of Top 10 products</h2>
		<figure><GroupbarPlot width={400} height={300} chartData={data.product_data.yourTable} refVar={'product'} aVar={'product_sales'} bVar={'product_cogs'} /></figure>
	  </div>
	</div>
</div>
</body>
</html>
