export interface IProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  categoryId: string;
}

export interface CreateProductDto extends Omit<IProduct, "id"> {}

export interface UpdateProductDto extends Partial<CreateProductDto> {}
