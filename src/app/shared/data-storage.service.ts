import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { RecipeService } from '../recipes/recipe.service';
import { Recipe } from '../recipes/recipe.model';
import { map } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
@Injectable()
export class DataStorageService {
    constructor(private http: HttpClient, 
                private recipeService: RecipeService, 
                private authService: AuthService ) {
                }
  
    storeRecipes(){
        const token = this.authService.getToken();
        return this.http.put('https://ng-recipe-book-4fcf8.firebaseio.com/recipes.json?auth='+token, 
        this.recipeService.getRecipes());
    }

    getRecipes(){
        const token = this.authService.getToken();
        this.http.get('https://ng-recipe-book-4fcf8.firebaseio.com/recipes.json?auth=' + token)
        .pipe(map(
            (response: Recipe[]) => {
                const recipes: Recipe[] = response;
                for(let recipe of recipes){
                    if(!recipe['ingredients']){
                        console.log(recipe);
                        recipe['ingredients']=[];
                    }
                }
                return recipes;
            }
        )).subscribe(
            // data => console.log(data)
            (recipes: Recipe[]) => {
                this.recipeService.setRecipes(recipes);
            }
        );
   
    }


}
