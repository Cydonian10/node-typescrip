export interface IUser {
  id: string;
  email: string;
  password: string;
}

export interface CreateUserDto extends Omit<IUser, "id"> {}

export interface UpdateUserDto extends Partial<CreateUserDto> {}

/**
 * @Customer
 */
export interface ICustomer {
  id: string;
  name: string;
  lastName: string;
}

export interface IFullUser {
  user: UpdateUserDto;
  customer: UpdateCustomerDto;
}

export interface CreateCustomerDto extends Omit<ICustomer, "id"> {}

export interface UpdateCustomerDto extends Partial<CreateCustomerDto> {}
