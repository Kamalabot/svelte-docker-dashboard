<script>
// @ts-nocheck'
    import parsers from "$lib/parsers"    
	export let height;
    export let width;
	import * as d3 from 'd3'
	import { onMount } from 'svelte';
	export let label;
	export let color;
	export let xVar;
	export let yVar;	
    export let chartData; //get the historic data from page.js
	let div;

	buildChart(width, height, chartData,xVar,yVar,color,label)

	function buildChart(width, height, data, xVar, yVar, colorData, label){
		const margin = {left:70,right:20,top:20,bottom:50}
		const visWidth = width - margin.left - margin.right
		const visHeight = height - margin.top - margin.bottom

		const xScale = d3.scaleTime()
			.domain(d3.extent(data.map(d => d[xVar])))
			.range([0,visWidth])

		//console.log(data.map((d,i) => d[xVar]))

		const yScale = d3.scaleLinear()
			.domain(d3.extent(data.map(d => d[yVar])))
			.range([visHeight,margin.top])

		onMount(() => {

			const docLocation = d3.select(div)

			const canvas = docLocation.append('svg')
				.attr('width',width)
				.attr('height',height)

			const chart = canvas.append('g')
				.attr('transform',`translate(${margin.left},${margin.top})`)

			const title = canvas.append('g')
				.attr('transform',`translate(${width/4},${margin.top + 20})`)
				.append('text')
				.text(label)
				.attr('font-size','15')

			const xAxis = d3.axisBottom(xScale);

			const xAx = canvas.append('g')
				.attr('transform',`translate(${margin.left},${visHeight+margin.top})`)
				.call(xAxis)
				.selectAll("text")  
				.style("text-anchor", "end")
				.attr("dx", "-.1em")
				.attr("dy", ".05em")
				.attr("transform", "rotate(-25)")

			const yAxis = canvas.append('g')
				.attr('transform',`translate(${margin.left},${margin.top})`)
				.call(d3.axisLeft(yScale))
				.selectAll("text")  
				.style("text-anchor", "end")
				.attr("dx", "-.1em")
				.attr("dy", ".05em")
				.attr("transform", "rotate(-25)")

			const bubbles = chart.selectAll('g')
				.data(data)
				.join('g');

			const bars = bubbles
				.append('circle')
				.attr('cy', d => yScale(d[yVar]))
				.attr('cx', d => xScale(d[xVar]))
				.attr('r', 2)
				.attr('fill',colorData)
		})
	}
    //console.log(chartData,'Data Reached Line Chart')

</script>

<div bind:this={div}></div>