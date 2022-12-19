<script>
	import * as d3 from "d3"
	import BarPlotV0 from "$lib/BarPlotV0.svelte"
	import TableV1 from "$lib/TableV1.svelte"
	import GroupbarPlot from "$lib/GroupbarPlot.svelte"
	
	function sumSeries(dataset, series,filterVar,filterOn){
    	let sum = d3.sum(dataset.filter(d =>d[filterOn]==filterVar), d => d[series])
    	return sum
	}
	
	function sumSeriesWoF(dataset, series){
    	let sum = d3.sum(dataset, d => d[series])
    	return sum
	}
	export let data;
	
	const store = data.csvData.store
	const storeData = data.csvData.storeData
	
	//group data
    var dayList = d3.rollups(storeData,v => v.length,d => d.weekDays).map(d => d[0]);
	
	
	let saleUnits = sumSeries(storeData, 'qty',) 
	let UPT = saleUnits / storeData.length
	let sales = sumSeries(storeData, 'totalSales')
	let cost = sumSeries(storeData, 'cost') / storeData.length
	
	var pdtListStore = d3.rollups(storeData,v => v.length,d => d.product).map(d => d[0])
	
	function shortenName(name){
		let nameLen = name.split(' ').length;
		let abbrv = [];
		if(nameLen > 1){
			for (let part of name.split(' ')){
				abbrv.push(part[0])
			}
		} else {
			return name
		}
		return abbrv.join('.')
	}
	
	var pdtPerformance = pdtListStore.map(c =>({
				product:shortenName(c),
	 			sales: sumSeries(storeData,'totalSales',c,'product'),
				cost: sumSeries(storeData,'cost',c,'product')
			})).sort((a,b) => d3.descending(a.sales, b.sales)).slice(0,10)
	console.log(pdtPerformance)
	
</script>	

<html class="h-full bg-gray-100">
<body class="h-full">
<div>
  <header class="bg-white">
    <div class="flex mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 gap-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Sale Performance of {store}</h1>
		<button class="btn m-1"><a href='/performanceDB' alt='Main Dash'>Main Dash</a></button>	
    </div>
  </header>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Sales $</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={storeData} xVar={"month"} yVar={"totalSales"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Monthly Sales Performance</p>
	  </div>
	</div>
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Gross Margin</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={storeData} xVar={"month"} yVar={"grossProfit"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Monthly Gross Margin Performance</p>
	  </div>
	</div>
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Cost $</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={storeData} xVar={"month"} yVar={"cogs"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Monthly Cost of Goods Sold</p>
	  </div>
	</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Sales/ Day</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={storeData} xVar={"weekDays"} yVar={"totalSales"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Sales Performance of the Store</p>
	  </div>
	</div>
	<div class="w-64 bg-base-100 shadow-xl">  
		  <div class="stat">
			<div class="stat-title">Unit/Txn</div>
			<div class="stat-value text-primary">{UPT.toFixed(1)}</div>
			<div class="stat-desc">How Many / txn?</div>
		  </div>
		  <div class="stat">
			<div class="stat-title">Sales Units</div>
			<div class="stat-value text-secondary">{saleUnits}</div>
			<div class="stat-desc">Total Units</div>
		  </div>
		  <div class="stat">
			<div class="stat-title">Cost$ / Txn</div>
			<div class="stat-value text-secondary">{cost.toFixed(1)}</div>
			<div class="stat-desc">At cost / Txn?</div>
		  </div>
	</div>
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Units Sold Trend Daily</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={storeData} xVar={"weekDays"} yVar={"qty"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Ads usage of the Store</p>
	  </div>
	</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-64 h-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Sales and Cost of Top 10 products</h2>
		<figure><GroupbarPlot width={400} height={300} chartData={pdtPerformance} refVar={'product'} aVar={'sales'} bVar={'cost'} /></figure>
	  </div>
	</div>
</div>
</body>
</html>