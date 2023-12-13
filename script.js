window.addEventListener("DOMContentLoaded", get);

const apiUrl = "https://crudcrud.com/api/4bd327503b2e46aebcf99085f6250b77/products";

    async function addProduct(event) {
        event.preventDefault();

        const sellingPriceInput = document.getElementById("sellingPrice");
        const productNameInput = document.getElementById("productName");
        const categoryInput = document.getElementById("category");

        const sellingPrice = sellingPriceInput.value;
        const productName = productNameInput.value;
        const category = categoryInput.value;

        const userData = {
            sellingPrice: sellingPrice,
            productName: productName,
            category: category
        };

        try {
                const response = await axios.post(apiUrl, userData);
                console.log("Product Added Successfully");

                showOnScreen(response.data);

                sellingPriceInput.value = "";
                productNameInput.value = "";

            } catch (error) {
                console.error("Error Adding Product:", error);
            }
        }

        async function get() {
            try {
                const response = await axios.get(apiUrl);

                for (let i = 0; i < response.data.length; i++)
                    showOnScreen(response.data[i]);
            } catch (error) {
                console.log(error);
            }
        }

        function showOnScreen(product) {
            const listItem = document.createElement("li");
            
            listItem.textContent = `${product.productName}, Rs.${product.sellingPrice}`;

            const deleteButton = document.createElement("button");

            deleteButton.textContent = "Delete";

            deleteButton.addEventListener("click", () => deleteProduct(product._id, listItem));

            listItem.appendChild(deleteButton);

            const categoryList = document.getElementById(product.category);

            if (categoryList) {
                categoryList.appendChild(listItem);
            } else {
                console.error(`Invalid category: ${product.category}`);
            }
        }

        async function deleteProduct(id, listItem) {
                await axios.delete(`${apiUrl}/${id}`);
                console.log(`Product Deleted Successfully.`);

                // Remove the element from the screen
                if (listItem) {
                    listItem.remove();
                } else {
                    console.error(`Error: Element with ID ${id} not found.`);
                }
        }

        const productForm = document.getElementById("productForm");
        productForm.addEventListener('submit', (event) => addProduct(event));