import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="favorites-container">
      <h2>My Favorite Recipes</h2>
      
      <div class="recipes-grid">
        @for (recipe of favorites$ | async; track recipe.id) {
          <div class="recipe-card card">
            <div class="recipe-image" [style.background-image]="'url(' + recipe.imageUrl + ')'">
              <button 
                class="favorite-button active"
                (click)="handleFavoriteToggle(recipe)"
              >
                <i class="material-icons">favorite</i>
              </button>
            </div>
            <div class="recipe-content">
              <h3>{{ recipe.name }}</h3>
              <p>{{ recipe.description }}</p>
              <div class="recipe-meta">
                <span><i class="material-icons">timer</i> {{ recipe.preparationTime + recipe.cookingTime }} min</span>
                <span><i class="material-icons">restaurant</i> {{ recipe.servings }} servings</span>
              </div>
            </div>
          </div>
        }

        @empty {
          <div class="empty-state">
            <i class="material-icons">favorite_border</i>
            <p>No favorite recipes yet</p>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './favorites.component.css'
})
export class FavoritesComponent implements OnInit {
  favorites$!: Observable<Recipe[]>;

  constructor(private readonly _recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  private loadFavorites(): void {
    this.favorites$ = this._recipeService.getFavorites();
  }

  handleFavoriteToggle(recipe: Recipe): void {
    this._recipeService.toggleFavorite(recipe.id);
  }
}
