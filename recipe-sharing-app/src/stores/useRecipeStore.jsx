import {create} from "zustand"

const useRecipeStore = create (
    set => ({
        recieps :[],
        addRecipe :(newRecipe) => set(state => ({recieps: [...state.recieps,newRecipe] 
        })),
        setRecipes :(recieps) => set(recieps)

    }))

    export default useRecipeStore;
