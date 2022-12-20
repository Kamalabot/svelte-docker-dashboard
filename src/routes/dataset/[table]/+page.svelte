<script>
	import Table from "$lib/Table.svelte";
  import SvelteTable from "svelte-table"
  export let data;
	console.log(data.tableData)
  var tablename = data.tableList
  var tableData = data.tableData.slice(0,5)
  console.log('svelteData',tableData)
  var columns = []
  //Looping through the keys of the table data.
  const data_keys = Object.keys(tableData[0])
  console.log(data_keys)
  for (let key of data_keys){
    let spec = {
      key: key,
      title: key,
      value: v => v[key],
      sortable: true,
      headerClass: "text-center" 
    }
    columns.push(spec)
  }
  </script>

<h1 data-theme="cmyk" class="text-5x1 font-bold text-center">List of Datasets present in the Database</h1>

<div class="max-w">
    <h3 class="text-3x1 font-bold">The Purpose</h3>
    <p class="py-6">Each of the dataset is used for different visualisations. Creating static visualisations are easier with data from the internet.
    The visuals that are dynamic, need the data available locally, or in the database from where it can be queried reliably. This repo holds such 
    dynamic visuals, dashboards and other complex charts.</p>
</div>

<Table fileData={tablename} /> 
<SvelteTable columns="{columns}" rows="{tableData}" />
