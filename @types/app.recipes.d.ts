declare enum Difficulty {
    Easy = 'Easy',
    Medium = 'Medium',
    Hard = 'Hard',
}

declare namespace App.Recipes {
    export interface Instruction {
        description: string;
        id: string;
        image: App.Images.Image;
        order: number;
        orderDisplay?: string;
    }

    export interface Recipe {
        cookTimeInMs: number;
        description?: string;
        difficulty: Difficulty;
        id: string;
        ingredients: App.Ingredients.Ingredient[];
        instructions: App.Recipes.Instruction[];
        name: string;
        images: App.Images.Image[];
        prepTimeInMs: number;
        rating?: number;
        servings: number;
    }

    export interface Search {
        term?: string;
        results: App.Recipes.Recipe[];
    }
}
