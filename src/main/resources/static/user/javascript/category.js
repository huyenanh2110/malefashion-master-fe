async function loadCategories() {
    try {
        // Gọi API để lấy dữ liệu the loai
        let {data: categories} = await axios.get(
            'http://localhost:8080/api/v1/categories');
        $('#category-list').empty();
        categories.forEach(category => {
            $('#category-list').append(
                `<li><a href="#"  class="text-uppercase">${category.categoryName}</a></li>`
            );
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
window.loadCategories();

