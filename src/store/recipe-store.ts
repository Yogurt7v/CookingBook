import {
  createRecipe,
  deleteRecipe,
  getRecipes,
  IRecipe,
  updateRecipe,
} from '@/actions/recipe';
import { create } from 'zustand';

interface IActionResult {
  success: boolean;
  recipe?: IRecipe;
  error?: string;
}

interface IRecipeState {
  recipes: IRecipe[];
  isLoading: boolean;
  error: string | null;
  loadRecipes: () => Promise<void>;
  addRecipe: (formdata: FormData) => Promise<IActionResult>;
  updateRecipe: (id: string, formdata: FormData) => Promise<IActionResult>;
  removeRecipe: (id: string) => Promise<IActionResult>;
}

export const useRecipeStore = create<IRecipeState>((set) => ({
  recipes: [],
  isLoading: false,
  error: null,
  loadRecipes: async () => {
    set({ isLoading: true, error: null });
    try {
      const result = await getRecipes();

      if (result.success) {
        set({ recipes: result.recipes, isLoading: false });
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      console.log('error', error);
      set({ error: 'Ошибка при загрузке рецептов', isLoading: false });
    }
  },
  addRecipe: async (formdata: FormData) => {
    set({ error: null });
    try {
      const result = await createRecipe(formdata);

      if (result.success) {
        set((state) => ({
          recipes: [...state.recipes, result.recipe!],
          isLoading: false,
        }));
        return { success: true, recipe: result.recipe };
      } else {
        set({ error: result.error, isLoading: false });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.log('error', error);
      set({ error: 'Ошибка при добавлении рецепта', isLoading: false });
      return { success: false, error: 'Ошибка при добавлении рецепта' };
    }
  },
  updateRecipe: async (id: string, formdata: FormData) => {
    set({ error: null });
    try {
      const result = await updateRecipe(id, formdata);

      if (result.success) {
        set((state) => ({
          recipes: state.recipes.map((recipe) =>
            recipe.id === id ? result.recipe! : recipe
          ),
          isLoading: false,
        }));
        return { success: true, recipe: result.recipe };
      } else {
        set({ error: result.error, isLoading: false });
        return { success: false, error: result.error };
      }
    } catch (error) {
      console.log('error', error);
      set({ error: 'Ошибка при обновлении рецепта', isLoading: false });
      return { success: false, error: 'Ошибка при обновлении рецепта' };
    }
  },
  removeRecipe: async (id: string) => {
    set({ error: null });
    try {
      const result = await deleteRecipe(id);

      if (result.success) {
        set((state) => ({
          recipes: state.recipes.filter((recipe) => recipe.id !== id),
          isLoading: false,
        }));
      } else {
        set({ error: result.error, isLoading: false });
      }
    } catch (error) {
      console.log('error', error);
      set({ error: 'Ошибка при удалении рецепта', isLoading: false });
    }
  },
}));
