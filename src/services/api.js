export async function getCategories() {
  // Implemente aqui
  const response = await fetch('https://api.mercadolibre.com/sites/MLB/categories');
  const responseJson = await response.json();
  return responseJson;
}

export async function getProductsFromCategoryAndQuery(categoryId, query) {
// Implemente aqui! Quando o fizer, descomente os parâmetros que essa função recebe
  const response = await fetch(`https://api.mercadolibre.com/sites/MLB/search?category=${categoryId}&q=${query}`);
  const responseJson = await response.json();
  return responseJson;
}

export async function getProductById(productId) {
  // Esta implementação específica não é avaliada, mas pode ajudar você 🙂
  // Atenção: essa função não deverá ser chamada na tela do carrinho de compras.
  const response = await fetch(`https://api.mercadolibre.com/items/${productId}`);
  const responseJson = await response.json();
  return responseJson;
}
