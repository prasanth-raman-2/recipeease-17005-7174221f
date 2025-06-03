import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private mockRecipes: Recipe[] = [
    {
      id: '1',
      name: 'Classic Margherita Pizza',
      description: 'Traditional Italian pizza with fresh basil and mozzarella',
      imageUrl: 'https://images.unsplash.com/photo-1604068549290-dea0e4a305ca',
      preparationTime: 20,
      cookingTime: 15,
      servings: 4,
      ingredients: [
        { name: 'Pizza Dough', amount: 1, unit: 'piece' },
        { name: 'Tomato Sauce', amount: 200, unit: 'ml' },
        { name: 'Fresh Mozzarella', amount: 200, unit: 'g' },
        { name: 'Fresh Basil', amount: 10, unit: 'leaves' }
      ],
      instructions: [
        'Preheat oven to 450°F (230°C)',
        'Roll out the pizza dough',
        'Spread tomato sauce evenly',
        'Add torn mozzarella pieces',
        'Bake for 12-15 minutes',
        'Add fresh basil leaves'
      ],
      nutritionalInfo: {
        calories: 266,
        protein: 11,
        carbs: 33,
        fat: 9
      },
      isFavorite: false
    },
    {
      id: '2',
      name: 'Grilled Salmon with Asparagus',
      description: 'Healthy and delicious salmon fillet with grilled asparagus and lemon',
      imageUrl: 'https://images.unsplash.com/photo-1580476262798-bddd9f4b7369',
      preparationTime: 15,
      cookingTime: 20,
      servings: 2,
      ingredients: [
        { name: 'Salmon Fillet', amount: 400, unit: 'g' },
        { name: 'Asparagus', amount: 200, unit: 'g' },
        { name: 'Lemon', amount: 1, unit: 'piece' },
        { name: 'Olive Oil', amount: 2, unit: 'tbsp' },
        { name: 'Garlic', amount: 2, unit: 'cloves' }
      ],
      instructions: [
        'Marinate salmon with olive oil, garlic, and lemon juice',
        'Preheat grill to medium-high heat',
        'Grill salmon for 4-5 minutes per side',
        'Grill asparagus until tender-crisp',
        'Serve with lemon wedges'
      ],
      nutritionalInfo: {
        calories: 385,
        protein: 42,
        carbs: 8,
        fat: 22
      },
      isFavorite: false
    },
    {
      id: '3',
      name: 'Chocolate Chip Cookies',
      description: 'Classic homemade cookies with gooey chocolate chips',
      imageUrl: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e',
      preparationTime: 25,
      cookingTime: 12,
      servings: 24,
      ingredients: [
        { name: 'All-purpose Flour', amount: 280, unit: 'g' },
        { name: 'Butter', amount: 230, unit: 'g' },
        { name: 'Brown Sugar', amount: 200, unit: 'g' },
        { name: 'Granulated Sugar', amount: 100, unit: 'g' },
        { name: 'Eggs', amount: 2, unit: 'pieces' },
        { name: 'Chocolate Chips', amount: 300, unit: 'g' }
      ],
      instructions: [
        'Cream butter and sugars until fluffy',
        'Beat in eggs and vanilla',
        'Mix in dry ingredients',
        'Fold in chocolate chips',
        'Drop spoonfuls onto baking sheet',
        'Bake at 350°F for 12 minutes'
      ],
      nutritionalInfo: {
        calories: 180,
        protein: 2,
        carbs: 24,
        fat: 9
      },
      isFavorite: false
    },
    {
      id: '4',
      name: 'Vegetarian Buddha Bowl',
      description: 'Nutritious bowl with quinoa, roasted vegetables, and tahini dressing',
      imageUrl: 'https://images.unsplash.com/photo-1546007600-8c2e5a9b8957',
      preparationTime: 30,
      cookingTime: 25,
      servings: 2,
      ingredients: [
        { name: 'Quinoa', amount: 200, unit: 'g' },
        { name: 'Sweet Potato', amount: 1, unit: 'large' },
        { name: 'Chickpeas', amount: 400, unit: 'g' },
        { name: 'Kale', amount: 100, unit: 'g' },
        { name: 'Avocado', amount: 1, unit: 'piece' },
        { name: 'Tahini', amount: 30, unit: 'ml' }
      ],
      instructions: [
        'Cook quinoa according to package instructions',
        'Roast sweet potato chunks and chickpeas',
        'Massage kale with olive oil',
        'Prepare tahini dressing',
        'Assemble bowls with all ingredients',
        'Drizzle with dressing'
      ],
      nutritionalInfo: {
        calories: 520,
        protein: 18,
        carbs: 65,
        fat: 24
      },
      isFavorite: false
    },
    {
      id: '5',
      name: 'Spicy Chicken Curry',
      description: 'Rich and aromatic Indian-style curry with tender chicken pieces',
      imageUrl: 'https://images.unsplash.com/photo-1604579659931-6414945117ce',
      preparationTime: 30,
      cookingTime: 45,
      servings: 4,
      ingredients: [
        { name: 'Chicken Thighs', amount: 800, unit: 'g' },
        { name: 'Onions', amount: 2, unit: 'large' },
        { name: 'Tomatoes', amount: 4, unit: 'medium' },
        { name: 'Ginger', amount: 30, unit: 'g' },
        { name: 'Garlic', amount: 6, unit: 'cloves' },
        { name: 'Garam Masala', amount: 2, unit: 'tbsp' }
      ],
      instructions: [
        'Marinate chicken with yogurt and spices',
        'Sauté onions until golden',
        'Add ginger-garlic paste and spices',
        'Cook tomatoes until soft',
        'Add chicken and simmer',
        'Garnish with fresh cilantro'
      ],
      nutritionalInfo: {
        calories: 420,
        protein: 38,
        carbs: 12,
        fat: 28
      },
      isFavorite: false
    }
  ];

  private recipesSubject = new BehaviorSubject<Recipe[]>(this.mockRecipes);
  private favoritesSubject = new BehaviorSubject<Recipe[]>([]);

  getRecipes(): Observable<Recipe[]> {
    return this.recipesSubject.asObservable();
  }

  getFavorites(): Observable<Recipe[]> {
    return this.favoritesSubject.asObservable();
  }

  toggleFavorite(recipeId: string): void {
    const recipes = this.recipesSubject.value;
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe) {
      recipe.isFavorite = !recipe.isFavorite;
      this.recipesSubject.next(recipes);
      
      const favorites = recipes.filter(r => r.isFavorite);
      this.favoritesSubject.next(favorites);
    }
  }

  searchRecipes(query: string): Observable<Recipe[]> {
    const filteredRecipes = this.mockRecipes.filter(recipe => 
      recipe.name.toLowerCase().includes(query.toLowerCase()) ||
      recipe.description.toLowerCase().includes(query.toLowerCase())
    );
    return of(filteredRecipes);
  }
}
