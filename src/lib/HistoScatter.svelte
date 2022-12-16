<script>
// @ts-nocheck'
	import { onMount } from 'svelte';
	import * as d3 from 'd3'
	
	export let height;
    export let width;
	
	export let histoColor;
	export let scatterColor;
	
	export let Var;	//Variable that is changing wrt fundamental
	export let refVar; //Variable that is constant or fundamental variable
	
	export let Bins;
	
    export let chartData; //get the historic data from page.js

	let div;
	
	//console.log(width, height, chartData,Var,Bins,color,label)
	buildChart(width, height, chartData,Var,refVar, Bins,histoColor,scatterColor)

	function buildChart(width, height, data,Var, refVar, Bins,histoColor,scatterColor){
		
		const margin = {left:70,right:20,top:20,bottom:50}
		const visWidth = width - margin.left - margin.right
		const visHeight = height - margin.top - margin.bottom

		//Histobins is the function that splits the data into each bin
		
		const histoBins = d3.bin().thresholds(Bins)
		const histoData = histoBins(data.map(d => d[Var]))
		const maxBins = d3.max(histoData, d => d.length)

		const xScale = d3.scaleLinear()
			.domain([0,maxBins])
			.range([0,visWidth])

		const yScale = d3.scaleLinear()
			.domain(d3.extent(data, d => d[Var]))
			.range([visHeight,0])
	
		const timeScale = d3.scaleTime()
			.domain(d3.extent(data.map(d => d[refVar])))
			.range([0,visWidth])

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
			//Initiating the Axes
			const xAxis = d3.axisTop(xScale);
			const yAxis = d3.axisLeft(yScale);
			const timeAxis = d3.axisBottom(timeScale);
			
			//Positioning the Axes
			const yAx = canvas.append('g')
				.attr('transform',`translate(${margin.left},${margin.top})`)
				.call(yAxis)
				.selectAll("text")  
				.style("text-anchor", "end")
				.attr("dx", "-.1em")
				.attr("dy", ".05em")
				.attr("transform", "rotate(-25)")

	
			const timeAx = canvas.append('g')
				.attr('transform',`translate(${margin.left},${visHeight+margin.top})`)
				.call(timeAxis)
				.selectAll("text")  
				.style("text-anchor", "end")
				.attr("dx", "-.1em")
				.attr("dy", ".05em")
				.attr("transform", "rotate(-25)")

			const format = d3.format(".1%");
	
			//Placing the HistoGram first
			const dataBuckets = chart.selectAll('g')
				.data(histoData)
				.join('g');
			
			const bars = dataBuckets
				.append('rect')
				.attr('fill',histoColor)
				.attr('opacity',0.7)
				.attr('x', d => xScale(0))
				.attr('y', d => yScale(d.x1))
				.attr('height', d => yScale(d.x0) - yScale(d.x1) - 2)
				.attr('width',d => xScale(d.length))
	
			const labels = dataBuckets
				.append("text")
				.attr("y", d => ((yScale(d.x0) + yScale(d.x1)) / 2) + 5 | 0)
				.attr("x", d => xScale(d.length) + 15)
				.attr("fill", "black")
				.attr("font-size", 12)
				.attr("text-anchor", "middle")
				.text(d => format(d.length/ data.length))
	
			//Placing the Scatter Points
			const dataBubbles = chart.selectAll('g')
				.data(data)
				.join('g');
	
			const points = dataBubbles
				.append('circle')
				.attr('cy', d => yScale(d[Var]))
				.attr('cx', d => timeScale(d[refVar]))
				.attr('r', 2)
				.attr('fill',scatterColor)
			
		})
	}

</script>

<div bind:this={div}></div>