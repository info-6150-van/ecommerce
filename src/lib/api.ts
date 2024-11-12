export function fetchProducts(): Promise<unknown> {
    return fetch('https://fakestoreapi.com/products')
            .then(res=>res.json())
            .then(json=>json)
            .catch((error) => {
                console.log(error)
                throw new Error(error)
            })
}