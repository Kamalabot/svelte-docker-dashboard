/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"
import { descending, csv , timeParse, json, format} from "d3"

export const load = async ({fetch})=>{

      const opcData = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/glass_door_DSci_datasets/openings_per_company.json' 
        const res = await fetch(url)
        const opcdata_res = await res.json()
      return opcdata_res.openings_per_company 
      }
      const oplData = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/glass_door_DSci_datasets/openings_per_location.json'
        const res = await fetch(url)
      const opldata_res = await res.json()
      return opldata_res.openings_per_location 
      }
       const optData = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/glass_door_DSci_datasets/openings_per_title.json';
        const res = await fetch(url)
      const optdata_res = await res.json()
      return optdata_res.openings_per_title 
      }
       const salquoteData = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/glass_door_DSci_datasets/salary_quote_count.json';
        const res = await fetch(url)
      const salquotedata_res = await res.json()
      return salquotedata_res.salary_quote_count
      }
       const toolsData = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/glass_door_DSci_datasets/tools_required.json';
        const res = await fetch(url)
      const toolsdata_res = await res.json()
      return toolsdata_res.tools_required
      }

            return {
        opc_data:opcData(),
        opl_data:oplData(),
        opt_data:optData(),
        salq_data:salquoteData(),
        tools_data:toolsData()
    };
}; 
