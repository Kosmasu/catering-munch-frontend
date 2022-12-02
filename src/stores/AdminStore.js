import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import MunchService from '@/MunchService'

// composition sama option
// ini option api
export const useAdminStore = defineStore('AdminStore', {
  // state itu data
  state: ()=>({
    customers: undefined,
    providers: undefined,
  }),
  // getters itu computed properties
  getters: {

  },
  // actions itu method
  actions: {
    async fetchCustomers() {
      await MunchService.getAllCustomers()
        .then(response=>{
          this.customers = response.data
          console.log('this.customers:',this.customers);
        })
        .catch(error => {
          console.error(error);
        })
    },
  }
})
