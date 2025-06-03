import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <div class="add-recipe-container">
      <h2>Add New Recipe</h2>
      
      <form [formGroup]="recipeForm" class="recipe-form card" (ngSubmit)="onSubmit()">
        <div class="form-group">
          <label for="name">Recipe Name</label>
          <input 
            id="name"
            type="text"
            formControlName="name"
            class="input"
            placeholder="Enter recipe name"
          >
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea
            id="description"
            formControlName="description"
            class="input textarea"
            placeholder="Describe your recipe"
          ></textarea>
        </div>

        <div class="form-group">
          <label>Cooking Information</label>
          <div class="cooking-info">
            <div>
              <label for="prepTime">Prep Time (mins)</label>
              <input
                id="prepTime"
                type="number"
                formControlName="preparationTime"
                class="input"
              >
            </div>
            <div>
              <label for="cookTime">Cook Time (mins)</label>
              <input
                id="cookTime"
                type="number"
                formControlName="cookingTime"
                class="input"
              >
            </div>
            <div>
              <label for="servings">Servings</label>
              <input
                id="servings"
                type="number"
                formControlName="servings"
                class="input"
              >
            </div>
          </div>
        </div>

        <div class="form-group">
          <label>Ingredients</label>
          <div formArrayName="ingredients" class="ingredients-list">
            @for (ingredient of ingredients.controls; track $index) {
              <div [formGroupName]="$index" class="ingredient-item">
                <input
                  formControlName="name"
                  placeholder="Ingredient name"
                  class="input"
                >
                <input
                  type="number"
                  formControlName="amount"
                  placeholder="Amount"
                  class="input"
                >
                <input
                  formControlName="unit"
                  placeholder="Unit"
                  class="input"
                >
                <button 
                  type="button"
                  class="remove-button"
                  (click)="removeIngredient($index)"
                >
                  <i class="material-icons">remove_circle</i>
                </button>
              </div>
            }
          </div>
          <button 
            type="button"
            class="button add-button"
            (click)="addIngredient()"
          >
            <i class="material-icons">add</i> Add Ingredient
          </button>
        </div>

        <div class="form-group">
          <label>Instructions</label>
          <div formArrayName="instructions" class="instructions-list">
            @for (instruction of instructions.controls; track $index) {
              <div class="instruction-item">
                <textarea
                  [formControlName]="$index"
                  placeholder="Enter instruction step"
                  class="input textarea"
                ></textarea>
                <button 
                  type="button"
                  class="remove-button"
                  (click)="removeInstruction($index)"
                >
                  <i class="material-icons">remove_circle</i>
                </button>
              </div>
            }
          </div>
          <button 
            type="button"
            class="button add-button"
            (click)="addInstruction()"
          >
            <i class="material-icons">add</i> Add Instruction
          </button>
        </div>

        <div class="form-group">
          <label>Nutritional Information</label>
          <div formGroupName="nutritionalInfo" class="nutrition-grid">
            <div>
              <label for="calories">Calories</label>
              <input
                id="calories"
                type="number"
                formControlName="calories"
                class="input"
              >
            </div>
            <div>
              <label for="protein">Protein (g)</label>
              <input
                id="protein"
                type="number"
                formControlName="protein"
                class="input"
              >
            </div>
            <div>
              <label for="carbs">Carbs (g)</label>
              <input
                id="carbs"
                type="number"
                formControlName="carbs"
                class="input"
              >
            </div>
            <div>
              <label for="fat">Fat (g)</label>
              <input
                id="fat"
                type="number"
                formControlName="fat"
                class="input"
              >
            </div>
          </div>
        </div>

        <button type="submit" class="button submit-button">
          Save Recipe
        </button>
      </form>
    </div>
  `,
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent {
  recipeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      preparationTime: [0, [Validators.required, Validators.min(0)]],
      cookingTime: [0, [Validators.required, Validators.min(0)]],
      servings: [1, [Validators.required, Validators.min(1)]],
      ingredients: this.fb.array([]),
      instructions: this.fb.array([]),
      nutritionalInfo: this.fb.group({
        calories: [0, [Validators.required, Validators.min(0)]],
        protein: [0, [Validators.required, Validators.min(0)]],
        carbs: [0, [Validators.required, Validators.min(0)]],
        fat: [0, [Validators.required, Validators.min(0)]]
      })
    });

    // Add initial empty ingredient and instruction
    this.addIngredient();
    this.addInstruction();
  }

  get ingredients() {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions() {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addIngredient() {
    const ingredientGroup = this.fb.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required]
    });
    this.ingredients.push(ingredientGroup);
  }

  removeIngredient(index: number) {
    this.ingredients.removeAt(index);
  }

  addInstruction() {
    this.instructions.push(this.fb.control('', Validators.required));
  }

  removeInstruction(index: number) {
    this.instructions.removeAt(index);
  }

  onSubmit() {
    if (this.recipeForm.valid) {
      console.log(this.recipeForm.value);
      // TODO: Implement recipe submission
    }
  }
}
