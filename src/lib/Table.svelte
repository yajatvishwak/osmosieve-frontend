<script>
  // @ts-nocheck
  import axios from "axios";
  import { onMount } from "svelte";
  import { toast } from "svelte-french-toast";
  let data = {};
  let showOld = false;

  export let params = {};
  let command = "";
  let loading = false;
  const transform = async () => {
    loading = true;
    if (command === "") {
      toast.error("Please enter a command");
      return;
    }
    const res = await axios
      .post("http://localhost:5000/transform-data", {
        command,
        filename: "MOCK_DATA.csv",
      })
      .catch((err) => {
        console.log(err);
        loading = false;
        toast.error("Error in transforming data try again later");
      });
    console.log(res.data);
    data = res.data;
    data.tableValues = paginate(data.tableValues);
    loading = false;
  };
  // paginate the table
  const paginate = (tableValues) => {
    const tableValuesLength = tableValues.length;
    const tableValuesPerPage = 10;
    const pages = Math.ceil(tableValuesLength / tableValuesPerPage);
    const paginatedTableValues = [];
    for (let i = 0; i < pages; i++) {
      paginatedTableValues.push(
        tableValues.slice(i * tableValuesPerPage, (i + 1) * tableValuesPerPage)
      );
    }
    return paginatedTableValues;
  };
  let currentPage = 0;
  const changePage = (page) => {
    currentPage = page;
  };
  const nextPage = () => {
    if (showOld) {
      if (currentPage < data.oldTableValues.length - 1) {
        currentPage++;
      }
    } else {
      if (currentPage < data.tableValues.length - 1) {
        currentPage++;
      }
    }
  };
  const prevPage = () => {
    if (currentPage > 0) {
      currentPage--;
    }
  };
  const firstPage = () => {
    currentPage = 0;
  };
  const lastPage = () => {
    currentPage = paginatedTableValues.length - 1;
  };
  const goToPage = (page) => {
    currentPage = page;
  };

  let pageNumbers;
  $: {
    if ("columns" in data) {
      pageNumbers = [];
      for (let i = 0; i < data.tableValues.length; i++) {
        pageNumbers.push(i + 1);
      }
    }
  }
</script>

<section class="w-screen bg-black min-h-screen h-full pt-20">
  <div class="mx-auto max-w-screen-lg flex flex-col h-full justify-center">
    <div class="text-5xl font-black">Osmosieve</div>

    <div class=" mt-6">How do you want to transform this data?</div>
    <textarea
      bind:value={command}
      placeholder="Just type off....We'll do the heavy lifting for you"
      class="textarea textarea-bordered my-4"
      id=""
      rows="4"
    />

    {#if loading}
      <div class="animate-spin flex items-center justify-center">
        Loading...
      </div>
    {:else}
      <button on:click={transform} class="btn bg-purple-600 text-white mb-5"
        >Transform</button
      >
    {/if}

    <div class="my-5">
      <div class="label-text-alt my-2">Generated Transformation Code</div>
      <div class="mockup-code">
        {#if "generatedCode" in data}
          <pre data-prefix=">" class="p-4"><code>{data.generatedCode}</code
            ></pre>
        {:else}
          <pre data-prefix=">">waiting...</pre>
        {/if}
      </div>
    </div>

    <div class="overflow-x-auto">
      <div class="label-text-alt my-2">Transformed Table</div>
      {#if "columns" in data}
        <div class="flex my-3 ml-auto items-center gap-2">
          <div class="label-text-alt">Show old table</div>
          <input type="checkbox" class="toggle" bind:checked={showOld} />
        </div>

        <table class="table table-compact w-full">
          <thead>
            <tr>
              <th />
              {#if showOld}
                {#each data.oldColumns as key}
                  <th>{key}</th>
                {/each}
              {:else}
                {#each data.columns as key}
                  <th>{key}</th>
                {/each}
              {/if}
            </tr>
          </thead>
          <tbody>
            {#if showOld}
              {#each data.oldTableValues as row, i}
                <tr>
                  <th>{i + 1}</th>
                  {#each data.oldColumns as key}
                    <td>{row[key]}</td>
                  {/each}
                </tr>
              {/each}
            {:else}
              {#each data.tableValues[currentPage] as row, i}
                <tr>
                  <th>{i + 1}</th>
                  {#each data.columns as key}
                    <td>{row[key]}</td>
                  {/each}
                </tr>
              {/each}
            {/if}
          </tbody>
        </table>

        <div>
          <button on:click={nextPage} class="btn rounded-full">></button>
          <button on:click={prevPage} class="btn rounded-full">P</button>
        </div>

        <div class="flex gap-2 items-center m-5">
          <div
            class="mx-1 text-white bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
          >
            {currentPage + 1}
          </div>
          <div
            class="mx-1 text-white bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
          >
            {currentPage + 2}
          </div>
          <div
            class="mx-1 text-white bg-gray-600 rounded-full w-8 h-8 flex items-center justify-center"
          >
            {currentPage + 3}
          </div>
          <div>...</div>
        </div>
      {:else}
        <div class="flex items-center justify-between">
          <div class="text-xl">
            Wow, such empty. Transformed table will be visible here...
          </div>
          <img
            src="https://www.meme-arsenal.com/memes/c063230c818cb15f6dfa5f9569f13f23.jpg"
            class="rounded-xl opacity-25"
            alt=""
          />
        </div>
      {/if}
    </div>
  </div>
</section>
