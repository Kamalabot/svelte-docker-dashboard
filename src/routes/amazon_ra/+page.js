/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"
import { descending, csv , timeParse, json, format} from "d3"

export const load = async ({fetch})=>{

      const ciDaDelData = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/amazon_RAnalyst_dataset/city_date_deliveries.json' 
        const res = await fetch(url)
        const cityDateDel = await res.json()
      return cityDateDel.city_date_deliveries
      }
      const ciDelData = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/amazon_RAnalyst_dataset/city_delivery_counts.json'
        const res = await fetch(url)
      const ciDel = await res.json()
      return ciDel.city_delivery_counts
      }
       const agentRateData = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/amazon_RAnalyst_dataset/delivery_agent_ratings.json';
        const res = await fetch(url)
      const agentRate = await res.json()
      return agentRate.delivery_agent_ratings
      }
       const ordDateData = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/amazon_RAnalyst_dataset/order_date_count.json';
        const res = await fetch(url)
      const ordDate = await res.json()
      return ordDate.order_date_count
      }
       const ordHour = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/amazon_RAnalyst_dataset/order_date_hour.json';
        const res = await fetch(url)
      const ordHr = await res.json()
      return ordHr.order_date_hour
      }
       const ordType = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/amazon_RAnalyst_dataset/order_type_count.json';
        const res = await fetch(url)
      const ordTp = await res.json()
      return ordTp.order_type_count
      }
       const ordLoc = async() =>{
        const url = 'https://kamalabot.github.io/json_data_repo/amazon_RAnalyst_dataset/order_type_location_count.json';
        const res = await fetch(url)
      const ordTpLoc = await res.json()
      return ordTpLoc.order_type_location_count
      }

            return {
          order_type_location:ordLoc(),
          order_type:ordType(),
          order_date_hour:ordHour(),
          order_date_data:ordDateData(),
          agent_ratings:agentRateData(),
          city_del_counts:ciDelData(),
          city_del_date_counts:ciDaDelData()
    };
}; 
