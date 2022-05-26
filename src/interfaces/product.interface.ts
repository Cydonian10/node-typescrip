export interface IProduct {
  id: string;
  name: string;
  image: string;
  price: number;
  isBlock: boolean;
}

export interface CreateProductDto extends Omit<IProduct, "id"> {}

export interface UpdateProductDto extends Partial<CreateProductDto> {}
