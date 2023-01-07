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
  console.log(data)
  const location = data.location_monthly.map(x => x.location)
  const reps = data.reps_monthly.map(x => x.sales_reps)
  
  const total_sales = numberFormat(sumSeriesWoF(data.month_data, 'monthly_sales')) 
  const total_qty = numberFormat(sumSeriesWoF(data.month_data,'monthly_qty'))
  const total_cost = numberFormat(sumSeriesWoF(data.month_data, 'monthly_cogs'))
  const total_profit = numberFormat(sumSeriesWoF(data.month_data, 'monthly_profit'))
  const total_payment = numberFormat(sumSeriesWoF(data.month_data, 'monthly_payment'))
  const total_target = numberFormat(sumSeriesWoF(data.month_data, 'monthly_target'))

  const top_product = data.pdt_monthly.slice(0,3)
  const least_product = data.pdt_monthly.slice(-3)
  console.log(data.reps_monthly)
</script>	

<html class="h-full bg-gray-100">
<body class="h-full">
<div>
  <header class="bg-white">
    <div class="flex mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 gap-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Company Progress Data</h1>
		<div class="dropdown">
			<label tabindex="0" class="btn m-1"><a href="/companyProgress">Main Dashboard</a></label>
    </div>
	</header>
</div>
<div class="flex justify-center gap-4 p-6 h-24">  
		<div class="stat">
			<div class="stat-title">Total_Profit $</div>
			<div class="stat-value text-primary">{total_profit}</div>
		</div>
		<div class="stat">
			<div class="stat-title">Total Payment</div>
			<div class="stat-value text-secondary">{total_payment}</div>
		</div>
		<div class="stat">
			<div class="stat-title">Total Target</div>
			<div class="stat-value text-secondary">{total_target}</div>
		</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
  <div class="w-64 bg-base-100 shadow-xl">  
    <div class="stat">
      <div class="stat-title">total_transaction</div>
      <div class="stat-value text-primary">{total_qty}</div>
      <div class="stat-desc">how much qty?</div>
    </div>
    <div class="stat">
      <div class="stat-title">total sales</div>
      <div class="stat-value text-secondary">{total_sales}</div>
      <div class="stat-desc">revenue</div>
    </div>
    <div class="stat">
      <div class="stat-title">cost of goods</div>
      <div class="stat-value text-secondary">{total_cost}</div>
      <div class="stat-desc">cost of goods sold</div>
    </div>
  </div>
    <div class="flex-auto card w-96 bg-base-100 shadow-xl">
      <div class="card-body">
      <h2 class="card-title">Gross Margin</h2>
      <figure><BarPlotV0 width={450} height={200} chartData={data.reps_monthly} xVar={"sales_reps"} yVar={"reps_profit"} color={'blue'} label={""} class="bg-primary" /></figure>
      <p>Monthly Gross Profit / Sales Rep</p>
      </div>
    </div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Sales Per Location</h2>
		<figure><BarPlotV0 width={650} height={200} chartData={data.location_monthly} xVar={"location"} yVar={"location_sales"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Sales Performance of the Location</p>
	  </div>
	</div>
</div>
<div class="flex justify-center gap-24 p-6 h-96">
  <div class="w-72 bg-base-100 shadow-xl">  
   <h1 class="text-3xl tracking-tight text-gray-900">Top 3 Product:</h1>
    <div class="stat">
      <div class="stat-title">{top_product[0].products}</div>
      <div class="stat-value text-primary"><span>Sales: </span><span>{numberFormat(top_product[0].product_sales)}</span></div>
    </div>
    <div class="stat">
      <div class="stat-title">{top_product[1].products}</div>
      <div class="stat-value text-primary"><span>Sales: </span><span>{numberFormat(top_product[1].product_sales)}</span></div>
    </div>
    <div class="stat">
      <div class="stat-title">{top_product[2].products}</div>
      <div class="stat-value text-primary"><span>Sales: </span><span>{numberFormat(top_product[2].product_sales)}</span></div>
    </div>
  </div>
   <div class="w-72 bg-base-100 shadow-xl">  
    <h1 class="text-3xl tracking-tight text-gray-900">Last 3 Product:</h1>
    <div class="stat">
      <div class="stat-title">{least_product[0].products}</div>
      <div class="stat-value text-primary"><span>Sales: </span><span>{numberFormat(least_product[0].product_sales)}</span></div>
    </div>
    <div class="stat">
      <div class="stat-title">{least_product[1].products}</div>
      <div class="stat-value text-primary"><span>Sales: </span><span>{numberFormat(least_product[1].product_sales)}</span></div>
    </div>
    <div class="stat">
      <div class="stat-title">{least_product[2].products}</div>
      <div class="stat-value text-primary"><span>Sales: </span><span>{numberFormat(least_product[2].product_sales)}</span></div>
    </div>
  </div>
  
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-64 h-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Sales and Cost of Top 10 products</h2>
		<figure><GroupbarPlot width={700} height={260} chartData={data.pdt_monthly} refVar={'products'} aVar={'product_sales'} bVar={'product_cogs'} /></figure>
	  </div>
	</div>
</div>
</body>
</html>
