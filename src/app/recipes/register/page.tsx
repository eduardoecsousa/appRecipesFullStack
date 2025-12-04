'use client';
import { RecipeForm } from "./types";
import { useForm } from "react-hook-form";
import { useFieldArray } from "react-hook-form";

const RegisterRecipePage = () => {
  const { register, control, handleSubmit } = useForm<RecipeForm>({
    defaultValues: {
      ingredients: [{ quantity: "", typeMeasure: "", name: "" }]
    }
  });

  const { fields, append } = useFieldArray({
    control,
    name: "ingredients"
  });

  const onSubmit = (data: RecipeForm) => {
    // Aqui você manda para sua API (Next API / Backend / Express / Spring)
    console.log(data);
  };


  return (
    <div className="min-h-screen bg-gray-100 p-6 flex justify-center">
      <div className="w-full max-w-2xl bg-white shadow-md rounded-lg p-6">
        <h1 className="text-2xl font-semibold mb-6 text-gray-800 text-center">
          Register Recipe
        </h1>

        <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
          {/* Nome da Receita */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Recipe Name:
            </label>
            <input
              type="text"
              placeholder="sliced ​​bread"
              {...register("recipeName")}
              className="w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
            />
          </div>

          {/* Ingredientes */}
          <div>
            <h3 className="font-semibold text-gray-800 mb-2">
              Ingredients
            </h3>

            <div className="space-y-3">
              {fields.map((item, i) => (
                <div
                  key={i}
                  className="flex gap-3 items-center"
                >
                  <input
                    type="text"
                    placeholder="Quantities"
                    {...register(`ingredients.${i}.quantity` as const)}
                    className="w-1/3 border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />

                  <select {...register(`ingredients.${i}.typeMeasure` as const)} className="w-1/3 border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition">
                    <option value="">Type Measure</option>
                    <option value="grams">Grams</option>
                    <option value="ml">Milliliters</option>
                    <option value="cups">Cups</option>
                  </select>

                  <input
                    type="text"
                    placeholder="Ingredients"
                    {...register(`ingredients.${i}.name` as const)}
                    className="flex-1 border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500 transition"
                  />
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => append({ quantity: "", typeMeasure: "", name: "" })}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition"
            >
              + Add Ingredient
            </button>
          </div>

          {/* Instructions */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Instructions:
            </label>
            <textarea
              {...register("instructions")}
              className="w-full border px-3 py-2 rounded-md outline-none min-h-[120px] focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Image */}
          <div>
            <label className="block font-medium text-gray-700 mb-1">
              Image URL:
            </label>
            <input
              type="url"
              {...register("image")}
              className="w-full border px-3 py-2 rounded-md outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-2 rounded-md transition"
          >
            Register Recipe
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegisterRecipePage;
