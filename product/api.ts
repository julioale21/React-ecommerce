import axios from "axios";
import Papa from "papaparse";

import { Product } from './types';


export default {
  list: async (): Promise<Product[]> => {
    return axios.get("https://docs.google.com/spreadsheets/d/e/2PACX-1vTL8TZTTWSsEeAv7aEQmkVJd52Ge56MOgA-t2OpnzsegYTNwYTYlw1Ur-PnHSYlSKK8xIhmhYAcN6Le/pub?output=csv",
    {
      responseType: "blob"
    })
    .then(response => 
      new Promise<Product[]>((resolve, reject) => {
        Papa.parse(response.data, {
          header: true,
          complete: (results) => resolve(results.data as Product[]),
          error: (error) =>  reject(error.message),
        });
      })
    );
  }
}