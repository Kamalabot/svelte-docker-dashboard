<script>
	import Table from "$lib/Table.svelte";
  export let data;
	console.log(data.tableData)
  var tablename = data.tableList
  var tableData = data.tableData
</script>

<h1 data-theme="cmyk" class="text-5x1 font-bold text-center">List of Datasets present in the Database</h1>

<div class="max-w">
    <h3 class="text-3x1 font-bold">The Purpose</h3>
    <p class="py-6">Each of the dataset is used for different visualisations. Creating static visualisations are easier with data from the internet.
    The visuals that are dynamic, need the data available locally, or in the database from where it can be queried reliably. This repo holds such 
    dynamic visuals, dashboards and other complex charts.</p>
</div>

<Table fileData={tablename} /> 
