//Fetch All Pet Categories
const fetchPetCategory = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/categories').then(
    (res) => res.json().then((data) => displayFetchPetCategory(data.categories))
  );
};

// display All Pet Catefories Button
const displayFetchPetCategory = (petCategory) => {
  const getPetCategoryBtnContainer = document.getElementById(
    'btn-category-container'
  );
  //   console.log('data.catefories: ', petCategory);
  petCategory.forEach((element) => {
    // console.log('inside for each: ', element);
    const createPetCategorydiv = document.createElement('div');
    createPetCategorydiv.innerHTML = `
        <button class="border border-gray-200 rounded-lg flex gap-2 justify-center items-center px-6 py-2 font-semibold w-40 sm:w-40 md:w-36 lg:w-48"><img src=${element.category_icon} alt="" class="w-8"> ${element.category}</button>
    `;
    getPetCategoryBtnContainer.append(createPetCategorydiv);
  });
};

fetchPetCategory();
