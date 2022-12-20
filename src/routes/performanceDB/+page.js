/** @type {import('./$types').PageLoad} */
import parsers from "$lib/parsers"
import { descending, csv , timeParse, json, format} from "d3"

export const load = async ({fetch})=>{

      const salesData = async() =>{
        const url = 'http://localhost:5173/dbtable';
        const options = {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;charset=UTF-8'
          },
          body: JSON.stringify({
            tableName: "sales_performance_csv"
          })
      };
      const res = await fetch(url,options)
      const salesPerformanceData= await res.json()
      const parseDate = timeParse("%d-%m-%Y");
      const numberFormat = format(".2s")
      var monthNames= ["January","February","March","April","May","June","July",
                  "August","September","October","November","December"];
      const cleanSalePerfData = salesPerformanceData.yourTable.map(d=>({
              cogs: Number(d.COGS),
              category: d.Category,
              cost: Number(d.Cost),
              customerName: d['Customer Name'],
              gender: d.Gender,
              grossProfit: Number(d['Gross Profit']),
              price: Number(d.Price),
              product: d.Product,
              qty: Number(d.Qty),
              dateSold: parseDate(d['Sales Date']),
              saleId:d['Sales ID'],
              reps: d['Sales Reps'],
              stores:d.Stores,
              totalSales: Number(d['Total Sales']),
              txnType: d['Trans.Types'],
              weekDays:d['Week days'],
              month: monthNames[parseDate(d['Sales Date']).getMonth()]
          }))
        return cleanSalePerfData
      }
            return {
        salesCleaned:salesData(),
    };
}; 
