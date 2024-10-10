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
    createPetCardDiv.classList = 'border-2 p-5 rounded-lg';
    createPetCardDiv.innerHTML = `
        <div class = "flex flex-col border-b-2">
            <figure>
            <img
                src=${element.image}
                class="w-full h-full object-cover rounded-md"
            </figure>
            <div>
                <h5 class="pet-name font-bold text-xl" >${element.pet_name}</h5>
                <p class="breed text-gray-400">
                    <i class="fa-solid fa-qrcode"></i>
                     Breed: ${element.breed}</p>
                <p class="birth text-gray-400">
                    <i class="fa-regular fa-calendar"></i>
                     Birth: ${new Date(
                       element.date_of_birth
                     ).getFullYear()}</p>  
                <p class="gender text-gray-400">
                    <i class="fa-solid fa-mercury"></i>
                     Gender: ${element.gender}</p>
                <p class="price text-gray-400">
                    <i class="fa-solid fa-dollar-sign"></i>
                     Price: ${element.price}$</p>
            </div>
        </div>
        <div class="flex flex-col sm:flex-row lg:flex-row items-center mt-3 flex-wrap gap-1 lg:justify-evenly"> 
            <button class="border border-gray-300 px-2 sm:px-5 py-2 rounded-md w-full lg:w-auto">
                <i class="fa-regular fa-thumbs-up"></i>
            </button>
            <button class="border border-gray-300 px-2 sm:px-5 py-2 rounded-md colorBtnText font-bold w-full lg:w-auto ">Adopt</button>
            <button class="border border-gray-300 px-2 sm:px-5 py-2 rounded-md colorBtnText font-bold w-full lg:w-auto">Details</button>    
        </div>
       

    `;
    getPetsCardsContainer.append(createPetCardDiv);
  });
};

fetchPetCategory();
fetchAllPets();
