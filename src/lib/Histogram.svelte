<script>
// @ts-nocheck'
	export let height;
    export let width;
	import * as d3 from 'd3'
	import { onMount } from 'svelte';
	export let label;
	export let color;
	export let Var;	
	export let Bins;
    export let chartData; //get the historic data from page.js
	let div;
	//console.log(width, height, chartData,Var,Bins,color,label)
	
	buildChart(width, height, chartData,Var,Bins,color,label)

	function buildChart(width, height, data,Var, Bins,colorData, label){
		
		const margin = {left:70,right:20,top:20,bottom:50}
		const visWidth = width - margin.left - margin.right
		const visHeight = height - margin.top - margin.bottom

		//Histobins is the function that splits the data into each bin
		
		const histoBins = d3.bin().thresholds(Bins)
	
		const histoData = histoBins(data.map(d => Number(d[Var])))
	
		const maxBins = d3.max(histoData, d => d.length)

		const yScale = d3.scaleLinear()
			.domain([0,maxBins])
			.range([visHeight,margin.top])

		const xScale = d3.scaleLinear()
			.domain(d3.extent(data, d => Number(d[Var])))
			.range([30,width-margin.left])

		const freq = d3.scaleLinear()
			.domain([0, maxBins/ data.length])
			.nice()
			.range([height - margin.bottom, margin.top])		
			//console.log(histoData)
		onMount(() => {

			const docLocation = d3.select(div)

			const canvas = docLocation.append('svg')
				.attr('width',width)
				.attr('height',height)

			const chart = canvas.append('g')
				.attr('transform',`translate(${margin.left},${margin.top})`)

			const title = canvas.append('g')
				.attr('transform',`translate(${width/4},${margin.top})`)
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

			const format = d3.format(".1%");
	
			const dataBuckets = chart.selectAll('g')
				.data(histoData)
				.join('g');
			
			const bars = dataBuckets
				.append('rect')
				.attr('fill',colorData)
				.attr('y', d => yScale(d.length))
				.attr('x', d => xScale(d.x0))
				.attr('width', d => Math.max(0, xScale(d.x1) - xScale(d.x0)) - 2)
				.attr('height',d => yScale(0) - yScale(d.length))
	
			const labels = dataBuckets
				.append("text")
				.attr("x", d => ((xScale(d.x0) + xScale(d.x1)) / 2) + 5 | 0)
				.attr("y", d => yScale(d.length) - 2)
				.attr("fill", "black")
				.attr("font-size", 10)
				.attr("text-anchor", "middle")
				.text(d => format(d.length/ data.length)) 
		})
	}

</script>

<div bind:this={div}></div>