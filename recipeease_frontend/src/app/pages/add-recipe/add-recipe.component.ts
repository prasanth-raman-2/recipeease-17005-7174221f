import { Component, OnInit } from '@angular/core';
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
      
      <form [formGroup]="recipeForm" class="recipe-form card" (ngSubmit)="handleSubmit()">
        <div class="form-group">
          <label for="name">Recipe Name</label>
          <input id="name" type="text" formControlName="name" class="input">
        </div>

        <div class="form-group">
          <label for="description">Description</label>
          <textarea id="description" formControlName="description" class="input textarea"></textarea>
        </div>

        <div class="cooking-info">
          <div class="form-group">
            <label for="preparationTime">Prep Time (mins)</label>
            <input id="preparationTime" type="number" formControlName="preparationTime" class="input">
          </div>

          <div class="form-group">
            <label for="cookingTime">Cook Time (mins)</label>
            <input id="cookingTime" type="number" formControlName="cookingTime" class="input">
          </div>

          <div class="form-group">
            <label for="servings">Servings</label>
            <input id="servings" type="number" formControlName="servings" class="input">
          </div>
        </div>

        <div class="form-group">
          <label>Ingredients</label>
          <div class="ingredients-list" formArrayName="ingredients">
            @for (ingredient of ingredients.controls; track $index) {
              <div [formGroupName]="$index" class="ingredient-item">
                <input formControlName="name" placeholder="Ingredient" class="input">
                <input type="number" formControlName="amount" placeholder="Amount" class="input">
                <input formControlName="unit" placeholder="Unit" class="input">
                <button type="button" class="remove-button" (click)="removeIngredient($index)">
                  <i class="material-icons">remove</i>
                </button>
              </div>
            }
          </div>
          <button type="button" class="button add-button" (click)="addIngredient()">
            <i class="material-icons">add</i> Add Ingredient
          </button>
        </div>

        <div class="form-group">
          <label>Instructions</label>
          <div class="instructions-list" formArrayName="instructions">
            @for (instruction of instructions.controls; track $index) {
              <div class="instruction-item">
                <input [formControlName]="$index" placeholder="Step {{$index + 1}}" class="input">
                <button type="button" class="remove-button" (click)="removeInstruction($index)">
                  <i class="material-icons">remove</i>
                </button>
              </div>
            }
          </div>
          <button type="button" class="button add-button" (click)="addInstruction()">
            <i class="material-icons">add</i> Add Step
          </button>
        </div>

        <div class="form-group">
          <label>Nutritional Information</label>
          <div class="nutrition-grid" formGroupName="nutritionalInfo">
            <div class="form-group">
              <label for="calories">Calories</label>
              <input id="calories" type="number" formControlName="calories" class="input">
            </div>
            <div class="form-group">
              <label for="protein">Protein (g)</label>
              <input id="protein" type="number" formControlName="protein" class="input">
            </div>
            <div class="form-group">
              <label for="carbs">Carbs (g)</label>
              <input id="carbs" type="number" formControlName="carbs" class="input">
            </div>
            <div class="form-group">
              <label for="fat">Fat (g)</label>
              <input id="fat" type="number" formControlName="fat" class="input">
            </div>
          </div>
        </div>

        <button type="submit" class="button submit-button" [disabled]="!recipeForm.valid">
          Add Recipe
        </button>
      </form>
    </div>
  `,
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
  recipeForm!: FormGroup;

  /* eslint-disable no-unused-vars */
  constructor(private readonly formBuilder: FormBuilder) {}
  /* eslint-enable no-unused-vars */

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.recipeForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      preparationTime: [0, [Validators.required, Validators.min(0)]],
      cookingTime: [0, [Validators.required, Validators.min(0)]],
      servings: [1, [Validators.required, Validators.min(1)]],
      ingredients: this.formBuilder.array([]),
      instructions: this.formBuilder.array([]),
      nutritionalInfo: this.formBuilder.group({
        calories: [0, [Validators.required, Validators.min(0)]],
        protein: [0, [Validators.required, Validators.min(0)]],
        carbs: [0, [Validators.required, Validators.min(0)]],
        fat: [0, [Validators.required, Validators.min(0)]]
      })
    });

    this.addIngredient();
    this.addInstruction();
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }

  addIngredient(): void {
    const ingredientGroup = this.formBuilder.group({
      name: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      unit: ['', Validators.required]
    });
    this.ingredients.push(ingredientGroup);
  }

  removeIngredient(index: number): void {
    this.ingredients.removeAt(index);
  }

  addInstruction(): void {
    this.instructions.push(this.formBuilder.control('', Validators.required));
  }

  removeInstruction(index: number): void {
    this.instructions.removeAt(index);
  }

  handleSubmit(): void {
    if (this.recipeForm.valid) {
      console.log(this.recipeForm.value);
      // TODO: Implement recipe submission
    }
  }
}
