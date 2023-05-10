<script>
  import axios from "axios";
  import { push } from "svelte-spa-router";
  let files;
  const uploadFile = () => {
    const formData = new FormData();
    formData.append("file", files[0]);
    axios.post("http://localhost:5000/process-file", formData).then((res) => {
      push("/result/" + res.data.filename);
    });
  };
</script>

<section class="h-screen w-screen bg-black text-white">
  <div
    class="flex flex-col justify-center h-full mx-auto max-w-screen-lg w-full"
  >
    <div>
      <div class="text-5xl font-black">Osmosieve</div>
      <div class="text-xl opacity-50 mt-2">
        The only data transformer you'll need
      </div>
      <div class="text-sm opacity-50">(maybe)</div>
    </div>
    <input type="file" bind:files class="hidden" name="" id="gomma" />

    <label
      for="gomma"
      class="bg-gray-950 flex justify-center gap-5 items-center flex-col p-5 mt-7 border border-dashed border-gray-800 rounded-xl"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
        class="w-20 h-20 opacity-30 hover:opacity-50 mt-5"
      >
        <path
          d="M19.906 9c.382 0 .749.057 1.094.162V9a3 3 0 00-3-3h-3.879a.75.75 0 01-.53-.22L11.47 3.66A2.25 2.25 0 009.879 3H6a3 3 0 00-3 3v3.162A3.756 3.756 0 014.094 9h15.812zM4.094 10.5a2.25 2.25 0 00-2.227 2.568l.857 6A2.25 2.25 0 004.951 21H19.05a2.25 2.25 0 002.227-1.932l.857-6a2.25 2.25 0 00-2.227-2.568H4.094z"
        />
      </svg>
      <div class="flex flex-col items-center justify-center mb-5">
        {#if files}
          <div class="text-xl font-bold">File uploaded</div>
          <div class="opacity-30">{files[0].name}</div>
        {:else}
          <div class="text-xl font-bold">Upload your file</div>
          <div class="opacity-30">(.csv works)</div>
        {/if}
      </div>
    </label>
    <button on:click={uploadFile} class="btn mt-5 bg-purple-700 text-white"
      >Submit</button
    >
  </div>
</section>
