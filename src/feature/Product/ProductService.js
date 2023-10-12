// add product
const fetchProduct = async () => {
  const response = await fetch(
    `https://nextjs13-ecommerce.onrender.com/api/product`,
    { cache: "no-cache" }
  );

  const data = await response.json();
  return data;
};

// delete product
const deleteProduct = async (productId) => {
  const res = await fetch(
    `https://nextjs13-ecommerce.onrender.com/api/product/remove/${productId}`,
    {
      method: "DELETE",
    }
  );

  return res.ok;
};

// get comment
const createProduct = async (productData) => {
  const response = await fetch(
    `https://nextjs13-ecommerce.onrender.com/api/product`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
      body: JSON.stringify(productData),
    }
  );

  return response.json();
};

export const CommentService = {
  fetchProduct,
  createProduct,
  deleteProduct,
};
