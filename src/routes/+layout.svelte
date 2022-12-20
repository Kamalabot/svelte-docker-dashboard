<script>
  import "../app.css";
  export let data;	
</script>

<div class="navbar bg-primary">
  <!-- svelte-ignore a11y-missing-attribute -->
  <a class="btn btn-ghost normal-case text-xl" href="/">Home</a>	
  <a class="btn btn-ghost normal-case text-xl" href="/dataset">Datasets</a>
	<div class="dropdown">
	  <label tabindex="0" class="btn btn-ghost normal-case text-xl m-1">DashBoards</label>
	  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		<li><a href="/performanceDB">Sales Performance Dashboard</a></li>
	  </ul>
	</div>
	<div class="dropdown">
	  <label tabindex="0" class="btn btn-ghost normal-case text-xl m-1">Gallery</label>
	  <ul tabindex="0" class="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52">
		<li><a href="/sample">Basic Charts</a></li>
		<li><a href="/sample1">Complex Charts</a></li>
	  </ul>
	</div>
</div>


<slot />
