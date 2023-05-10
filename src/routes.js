import Home from "./lib/Home.svelte";
import Table from "./lib/Table.svelte";

export const routes = {
  "/": Home,
  "/result/:filename": Table,
};
