//Fetch All Pet Categories..................................................................
const fetchPetCategory = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/categories').then(
    (res) => res.json().then((data) => displayFetchPetCategory(data.categories))
  );
};

//.Fetch All Pet Categories..................................................................
const fetchAllPets = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/pets').then((res) =>
    res.json().then((data) => displayAllFetchPets(data.pets))
  );
};

// display All Pet Catefories Button..........................................................
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

// diplay All Pets into cards
const displayAllFetchPets = (pets) => {
  const getPetsCardsContainer = document.getElementById('pets-cards-container');
  pets.forEach((element) => {
    // console.log('element: ', element);
    const createPetCardDiv = document.createElement('div');
    createPetCardDiv.classList = 'card bg-base-100 w-96 shadow-xl';
    createPetCardDiv.innerHTML = `
        <figure>
            <img
                src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                alt="Shoes" />
        </figure>
    `;
    getPetsCardsContainer.append(createPetCardDiv);
  });
};

fetchPetCategory();
fetchAllPets();
