'use client';

import { layoutConfig } from '@/config/layout-config';
import RecipeForm from '@/forms/recipe-form';

export default function NewRecipePage() {
  return (
    <div
      className="container mx-auto p-4 mt-10"
      style={{
        minHeight: `calc(100dvh - ${layoutConfig.headerHeight} - ${layoutConfig.footerHeight} - ${layoutConfig.titleHeight})`,
      }}
    >
      <h1 className="text-4xl font-bold mb-4">Новый рецепт</h1>
      <RecipeForm />
    </div>
  );
}
