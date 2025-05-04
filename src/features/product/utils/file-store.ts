import { readUsersFromFile } from '@/features/auth/utils';
import fs from 'fs';
import path from 'path';

import { Product } from '../model';

const usersFilePath = path.join(process.cwd(), 'public/data/users.json');
const productsFilePath = path.join(process.cwd(), 'public/data/products.json');

const readProductsFromFile = async (): Promise<Product[]> => {
  try {
    const fileData = fs.readFileSync(productsFilePath, 'utf-8');

    return JSON.parse(fileData);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to read products:', err);

    return [];
  }
};

const addProductToFile = async (
  productId: string,
  userId: string
): Promise<void> => {
  try {
    const users = await readUsersFromFile();
    const userIndex = users.findIndex((u) => u.id === userId);

    if (userIndex === -1) {
      throw new Error(`User with ID "${userId}" not found`);
    }

    const user = users[userIndex];
    const userProducts = (user.plants || []) as Product[];
    const productExists = userProducts.some(
      (product) => product.id === productId
    );

    if (productExists) {
      throw new Error(`Product with ID "${productId}" already added`);
    }

    const products = await readProductsFromFile();
    const newProduct = products.find((product) => product.id === productId);

    if (!newProduct) {
      throw new Error(`Product with ID "${productId}" not found`);
    }

    user.plants = [...userProducts, newProduct];

    fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to add product to user:', err);
    throw new Error('Failed to add product to user');
  }
};

const addNewProductToFile = async (newProduct: Product): Promise<void> => {
  try {
    const products = await readProductsFromFile();
    const productExists = products.some(
      (product) => product.id === newProduct.id
    );

    if (productExists) {
      throw new Error(`Product with ID "${newProduct.id}" already exists`);
    }
    products.push(newProduct);
    fs.writeFileSync(productsFilePath, JSON.stringify(products, null, 2));
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error('Failed to add new product:', err);
    throw new Error('Failed to add new product');
  }
};

export { addNewProductToFile, addProductToFile, readProductsFromFile };
