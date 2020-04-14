import { environment } from 'src/environments/environment';

export const { baseURL = 'https://5e8be58cbe5500001689eddb.mockapi.io/' } = environment;

export const API = {
    products: {
        fetchProducts: baseURL + '/api/v1/products'
    }
}