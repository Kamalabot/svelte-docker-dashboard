<script>
// @ts-nocheck'
    import parsers from "$lib/parsers"    
	export let height;
    export let width;
	import * as d3 from 'd3'
	import { onMount } from 'svelte';
	export let aVar;
	export let bVar;
	export let refVar;
	export let chartData; //get the historic data from page.js
	let div;
	

	groupbarPlot(width, height,chartData,refVar,aVar,bVar,'orange','blue')


	function groupbarPlot(width, height, chartData,refVar,aVar,bVar,aColor,bColor){

		const margin = { left: 40, right: 20, top: 10, bottom: 30 };
		const visHeight = height - margin.top - margin.bottom;
		const visWidth = width - margin.right - margin.left;


		const aData = chartData.map(d => d[aVar]);
		const bData = chartData.map(d => d[bVar]);
		const refData = chartData.map(d => d[refVar]);
		
		const maxVal = d3.max([d3.max(aData),d3.max(bData)])
		console.log(aData)
		console.log(bData)
		console.log(maxVal)
		const numberFormat = d3.format(".2s");
	
		  // this scale will be used to position the groups for each month
		  const group = d3.scaleBand()
			  .domain(refData)
			  .range([0, visWidth])
			  .padding(0.2);

		  const y = d3.scaleLinear()
			  .domain([0, maxVal]).nice()
			  .range([visHeight, 0]);

		  // this scale will be used to position the bars within a group
		  const x = d3.scaleBand()
			  .domain([aVar,bVar])
			  .range([0, group.bandwidth()]);


		onMount(() => {

		const docLocation = d3.select(div)
		
		const canvas = docLocation.append('svg')
				.attr('width',width)
				.attr('height',height)

		const chart = canvas.append('g')
			.attr('transform', `translate(${margin.left}, ${margin.top})`);

		const yAxis = canvas.append('g')
			.attr('transform', `translate(${margin.left},${margin.top})`)
			.call(d3.axisLeft(y)
					.tickFormat(function(d){
							return d3.format('~s')(d)
								}))
			.selectAll("text")  
			.style("text-anchor", "end")
			.attr("dx", "-.1em")
			.attr("dy", ".05em")
			.attr("transform", "rotate(-25)");

		const xAxis = canvas.append('g')
			.attr('transform', `translate(${margin.left},${visHeight + margin.top})`)
			.call(d3.axisBottom(group))
			.selectAll("text")  
			.style("text-anchor", "end")
			.attr("dx", "-.1em")
			.attr("dy", ".05em")
			.attr("transform", "rotate(-25)");
		// create and position one group for each month
	  	
		const groups = chart.append('g')
			.selectAll('g')
			.data(chartData)
			.join('g')
		  	.attr('transform', d => `translate(${group(d[refVar])},0)`);

	  // add the bars to each group
		 groups.append('rect')
		  .attr('class','aVar')
		  .attr('fill',aColor)
		  .attr('y', d => y(d[aVar]))
		  .attr('height', d => visHeight - y(d[aVar]))
		  .attr('x', d => x(aVar))
		  .attr('width', x.bandwidth());
	
		groups.append('rect')
		  .attr('class','bVar')
		  .attr('fill',bColor)
		  .attr('y', d => y(d[bVar]))
		  .attr('height', d => visHeight - y(d[bVar]))
		  .attr('x', d => x(bVar))
		  .attr('width', x.bandwidth());
	
			})
	}
</script>

<div bind:this={div}></div>