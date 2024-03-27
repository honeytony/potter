import axios from "axios";
import { create } from "zustand";
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export const useHeroesStore = create(devtools((set, get) => ({
    
    heroes: [],
    loading: false,
    error: false,

    fetchHeroes: () => {
        set({ loading: true })
        axios.get('http://localhost:3001/heroes').then((data)=>{
            set({ heroes: data.data })
            set({ loading: false })
        });    
    },


    filterByName: (name) => {
      let heroes = get().heroes;
      let newCards = [];
      heroes.forEach((card)=>{
        if(card.name.toLowerCase().includes(name.toLowerCase())){
          newCards.push(card);
        }
      })
      set({ heroes: newCards })
    },

    handleChoosedSchool: (choosedSchool) => {
          axios.get('http://localhost:3001/heroesFilterBySchool/' + choosedSchool).then((data)=>{
            set({ heroes: data.data })
          });
        }
  })))



  export const useSchoolStore = create(persist((set)=> ({
    schools: [],
    loading: false,
    error: false,


    fetchSchools: () => {
        set({ loading: true })
        axios.get('http://localhost:3001/schools').then((data)=>{
            set({ schools: data.data })
            set({ loading: true })
        });    
    },
  }),  {
    name: 'school-storage', // name of the item in the storage (must be unique)
    storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
  },))