<script>
	import * as d3 from "d3"
	import BarPlotV0 from "$lib/BarPlotV0.svelte"
	import TableV1 from "$lib/TableV1.svelte"
	import GroupbarPlot from "$lib/GroupbarPlot.svelte"
	import Alink from "$lib/Alink.svelte"
  import LineChart from "$lib/LineChart.svelte"
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

  var order_type_loc = data.order_type_location
  var order_type = data.order_type
  var order_date_hour = data.order_date_hour
  var order_date_data = data.order_date_data.sort((a,b) => d3.descending(a.order_count, b.order_count))
  console.log(order_date_data)
  var agent_ratings = data.agent_ratings
  var city_del_counts = data.city_del_counts          
  var city_del_date_counts = data.city_del_date_counts

  var cityCount = city_del_counts.length
  var deliveryCount = sumSeriesWoF(city_del_counts,'city_count')
  var agentCount = agent_ratings.length
  var orderPerDay = (sumSeriesWoF(order_date_data, 'order_count')/order_date_data.length).toFixed(1)

</script>	

<html class="h-full bg-gray-100">
<body class="h-full">
<div>
  <header class="bg-white">
    <div class="flex mx-auto max-w-7xl py-6 px-4 sm:px-6 lg:px-8 gap-8">
      <h1 class="text-3xl font-bold tracking-tight text-gray-900">Amazon Research Data Analysis</h1>
		</div>
	</header>
</div>
<div class="flex justify-center gap-4 p-6 h-48">  
		<div class="stat">
			<div class="stat-title">Cities Served</div>
			<div class="stat-value text-primary">{cityCount}</div>
		</div>
  	<div class="stat">
			<div class="stat-title">Delivery Done</div>
			<div class="stat-value text-primary">{deliveryCount}</div>
		</div>
  	<div class="stat">
			<div class="stat-title">Agents Delivering</div>
			<div class="stat-value text-primary">{agentCount}</div>
		</div>
  	<div class="stat">
			<div class="stat-title">Order Per Day</div>
			<div class="stat-value text-primary">{orderPerDay}</div>
		</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
  <div class="flex-auto card w-96 bg-base-100 shadow-xl">
    <div class="card-body">
      <h2 class="card-title">Order Delivered by Cities</h2>
      <figure><BarPlotV0 width={450} height={200} chartData={city_del_counts} xVar={"city_name"} yVar={"city_count"} color={'blue'} label={""} class="bg-primary" /></figure>
      <p>Cities served and number of deliveries done in them.</p>
      </div>
    </div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Agent Ratings</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={agent_ratings.slice(0,10)} xVar={"delivery_person_id"} yVar={"avg_ratings"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Average ratings of the delivery agents</p>
	  </div>
	</div>
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Min Salary Quoted</h2>
		<figure><BarPlotV0 width={250} height={200} chartData={order_type} xVar={"type_of_order"} yVar={"type_count"} color={'green'} label={""} class="bg-primary" /></figure>
		<p>How many jobs have these Min Salaries</p>
	  </div>
	</div>
</div>
<div class="flex justify-center gap-4 p-6 h-96">
	<div class="flex-auto card w-96 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Orders delivered by Date</h2>
		<figure><BarPlotV0 width={650} height={200} chartData={order_date_data} xVar={"order_date"} yVar={"order_count"} color={'orange'} label={""} class="bg-primary" /></figure>
		<p>Orders delivered by date, sorted by delivery count</p>
	  </div>
	</div>
</div>
<div class="flex justify-center gap-1 p-6 h-96">
	<div class="flex-auto card w-60 h-60 bg-base-100 shadow-xl">
	  <div class="card-body">
		<h2 class="card-title">Metropolitan</h2>
		<figure><BarPlotV0 width={200} height={150} chartData={order_type_loc.filter(x => x.city == 'Metropolitian')} xVar={'type_of_order'} yVar={'type_count'} color={'blue'} label={""} /></figure>
    </div>
  </div>
  <div class="flex-auto card w-60 h-60 bg-base-100 shadow-xl">
    <div class="card-body">
    <h2 class="card-title">Urban</h2>
    <figure><BarPlotV0 width={200} height={150} chartData={order_type_loc.filter(x => x.city == 'Urban')} xVar={'type_of_order'} yVar={'type_count'} color={'blue'} label={""} /></figure>
    </div>
  </div>
  <div class="flex-auto card w-60 h-60 bg-base-100 shadow-xl">
    <div class="card-body">
    <h2 class="card-title">Other</h2>
    <figure><BarPlotV0 width={200} height={150} chartData={order_type_loc.filter(x => x.city == 'other')} xVar={'type_of_order'} yVar={'type_count'} color={'blue'} label={""} /></figure>
    </div>
  </div>
  <div class="flex-auto card w-60 h-60 bg-base-100 shadow-xl">
    <div class="card-body">
    <h2 class="card-title">Semi-Urban</h2>
    <figure><BarPlotV0 width={200} height={150} chartData={order_type_loc.filter(x => x.city == 'Semi-Urban')} xVar={'type_of_order'} yVar={'type_count'} color={'blue'} label={""} /></figure>
    </div>
  </div>
</div>
</body>
</html>
