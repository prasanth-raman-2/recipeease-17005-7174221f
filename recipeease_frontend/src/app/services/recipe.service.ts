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
      imageUrl: 'https://placehold.co/600x400',
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
    // Add more mock recipes here
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
