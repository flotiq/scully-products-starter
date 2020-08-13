import { Product } from './product';
export interface ProductList {
    total_count: number;
    count: number;
    total_pages: number;
    current_page: number;
    data?: Array<Product>;
}
