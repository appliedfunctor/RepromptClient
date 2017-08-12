export class Arrays {

    /**
     * Fisher–Yates shuffle
     * https://basarat.gitbooks.io/algorithms/docs/shuffling.html Accessed 12/08/2017
     * @static
     * @template T 
     * @param {T[]} array 
     * @returns {T[]} 
     * @memberof Arrays
     */
    static shuffleInPlace<T>(array: T[]): T[] {

        if (array.length <= 1) return array

        for (let i = 0; i < array.length; i++) {
            let index = Math.floor(Math.random() * array.length);
            [array[i], array[index]] = [array[index], array[i]];
        }

        return array
    }
}