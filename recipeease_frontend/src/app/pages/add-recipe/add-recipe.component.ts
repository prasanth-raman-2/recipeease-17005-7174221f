import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-recipe',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  template: `
    <!-- Template remains the same -->
  `,
  styleUrl: './add-recipe.component.css'
})
export class AddRecipeComponent implements OnInit {
  recipeForm!: FormGroup;

  constructor(private readonly fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
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

  // Rest of the component remains the same
}
