# PokéApp

Coding challenge for AbdoTech Internship Application.  [Original repo](https://github.com/rabregor/Pokemon_Coding_Challenge).

## Implementations

1. **`UseFetch`**:
    - Custom hook that fetches API, handling potential  failures and loading process.
    - Uses local storage to store the data from each API call.
        - Before fetching, checks saved data in the user device.
        - Saves in an object, the request as the key and the response as the value. 
        - Reduces the number of API calls.
        - Optimizes user navigation.
    - Replaced `fetchData` utils function.

2. **`PokemonList`**:
    - Refactored from a class-based component to a functional component.
    - Implementats pagination by initilially calling the API and saving every pokemon.
    - Applies the sorting and filtering algorithm.
        - User interface bugs where filter returns no results, were fixed.
        - Stores the sort selection value for a better navigation.

3. **`PokemonDetail`**:
    - Refactored from a class-based component to a functional component.
    - Solved the given error, where the pokemon clicked from `PokemonList` was not being displayed in the grid.

4. **`helpers`**:
    - Implemented both `sortData` and `filterData` logic.

5. **`General`**:
    - The website title and icon were changed.
    - Introduced responsive design improvements.
