<script>
	import Table from "$lib/Table.svelte";
  import Alink from "$lib/Alink.svelte";
  export let data;
	//console.log(data.tableData)
  var tablename = data.tableData.tableNames
  var cp_tables = data.tableData.cp_tables
</script>

<h1 data-theme="cmyk" class="text-5x1 font-bold text-center">List of Datasets present in the Database</h1>

<div class="max-w">
    <h3 class="text-3x1 font-bold">The Purpose</h3>
    <p class="py-6">Each of the dataset is used for different visualisations. Creating static visualisations are easier with data from the internet.
    The visuals that are dynamic, need the data available locally, or in the database from where it can be queried reliably. This repo holds such 
    dynamic visuals, dashboards and other complex charts.</p>
</div>

<div class="flex mx-auto py-6 px-4 gap-8">
  <div class='dropdown'>
    <label tabindex="0" class="btn m-1">Test DB</label>
    <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
      {#each tablename as table}
        <li><Alink location={'dataset'} variable={table.table_name}/></li>
      {/each}
    </ul>
  </div>
  <div class='dropdown'>
      <label tabindex="0" class="btn m-1">Company Progress DB</label>
      <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
        {#each cp_tables as cp_table}
          <li><Alink location={'companyProgress'} variable={cp_table.table_name}/></li>
        {/each}
      </ul>
  </div>
</div>
