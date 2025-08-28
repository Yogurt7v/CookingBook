import { Category, Unit } from '@/generated/prisma';

interface IIngredient {
  id: string;
  name: string;
  category: Category;
  unit: Unit;
  pricePerUnit: number | null;
  description: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export default function TableIngredients({ data }: { data: IIngredient[] | [] }) {
  return (
    <div className="w-full max-w-4xl mx-auto space-y-3 p-4">
      {data.map((ingredient) => (
        <div
          key={ingredient.id}
          className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl border border-gray-700 p-5 hover:border-blue-400 transition-all duration-200 hover:shadow-lg hover:shadow-blue-500/10"
        >
          {/* Основная информация в одну строку */}
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4 flex-1">
              {/* Название */}
              <h3 className="text-lg font-semibold text-white truncate min-w-[120px]">
                {ingredient.name}
              </h3>

              {/* Категория и единица измерения */}
              <div className="flex items-center gap-2">
                <span className="px-2 py-1 bg-blue-600/20 text-blue-300 text-xs rounded-full border border-blue-500/30 whitespace-nowrap">
                  {ingredient.category}
                </span>
                <span className="px-2 py-1 bg-purple-600/20 text-purple-300 text-xs rounded-full border border-purple-500/30 whitespace-nowrap">
                  {ingredient.unit}
                </span>
              </div>

              {/* Цена */}
              <div className="flex-1 text-right">
                <span
                  className={`text-2xl font-medium ${
                    ingredient.pricePerUnit ? 'text-green-300' : 'text-gray-400'
                  }`}
                >
                  {ingredient.pricePerUnit} ₽
                </span>
              </div>
            </div>
          </div>

          {/* Описание и дополнительная информация */}
          <div className="flex items-center justify-between">
            {/* Описание */}
            <div className="flex-1">
              {ingredient.description && (
                <p className="text-sm text-gray-300 line-clamp-1">
                  {ingredient.description}
                </p>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
