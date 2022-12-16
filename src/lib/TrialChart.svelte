<script>
//Component is for trial purpose. I tried sending the mount pointt 
// through the chart creation function. That did not work.
  	export let height;
    export let width;
	import { onMount } from 'svelte';
	
    export let chartData; //get the historic data from page.js
	
	let title;
	let div;

	// console.log(chartData)
	onMount(() => {
		div = d3.select(div)
		buildChart(div, width, height, chartData[0].data, chartData[0].borderColor,chartData[0].label)
	})

</script>

<div bind:this={div}></div>