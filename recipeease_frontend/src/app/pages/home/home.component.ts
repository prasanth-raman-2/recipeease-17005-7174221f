import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecipeService } from '../../services/recipe.service';
import { Recipe } from '../../models/recipe.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="home-container">
      <div class="search-bar">
        <input 
          type="text" 
          [(ngModel)]="searchQuery" 
          (input)="handleSearch()"
          placeholder="Search recipes..."
          class="search-input"
        >
      </div>

      <div class="recipes-grid">
        @for (recipe of recipes$ | async; track recipe.id) {
          <div class="recipe-card card">
            <div class="recipe-image" [style.background-image]="'url(' + recipe.imageUrl + ')'">
              <button 
                class="favorite-button"
                (click)="handleFavoriteToggle(recipe)"
                [class.active]="recipe.isFavorite"
              >
                <i class="material-icons">{{ recipe.isFavorite ? 'favorite' : 'favorite_border' }}</i>
              </button>
            </div>
            <div class="recipe-content">
              <h3>{{ recipe.name }}</h3>
              <p>{{ recipe.description }}</p>
              <div class="recipe-meta">
                <span><i class="material-icons">timer</i> {{ recipe.preparationTime + recipe.cookingTime }} min</span>
                <span><i class="material-icons">restaurant</i> {{ recipe.servings }} servings</span>
              </div>
              <div class="nutrition-info">
                <div class="nutrition-item">
                  <span class="label">Calories</span>
                  <span class="value">{{ recipe.nutritionalInfo.calories }}</span>
                </div>
                <div class="nutrition-item">
                  <span class="label">Protein</span>
                  <span class="value">{{ recipe.nutritionalInfo.protein }}g</span>
                </div>
                <div class="nutrition-item">
                  <span class="label">Carbs</span>
                  <span class="value">{{ recipe.nutritionalInfo.carbs }}g</span>
                </div>
              </div>
            </div>
          </div>
        }
      </div>
    </div>
  `,
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  searchQuery = '';
  recipes$!: Observable<Recipe[]>;

  constructor(private readonly recipeService: RecipeService) {}

  ngOnInit(): void {
    this.loadRecipes();
  }

  private loadRecipes(): void {
    this.recipes$ = this.recipeService.getRecipes();
  }

  handleSearch(): void {
    if (this.searchQuery.trim()) {
      this.recipes$ = this.recipeService.searchRecipes(this.searchQuery);
    } else {
      this.loadRecipes();
    }
  }

  handleFavoriteToggle(recipe: Recipe): void {
    this.recipeService.toggleFavorite(recipe.id);
  }
}
