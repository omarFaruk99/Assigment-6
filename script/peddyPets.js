//Fetch All Pet Categories..................................................................
const fetchPetCategory = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/categories').then(
    (res) => res.json().then((data) => displayFetchPetCategory(data.categories))
  );
};

//.Fetch All Pets..................................................................
const fetchAllPets = () => {
  fetch('https://openapi.programming-hero.com/api/peddy/pets').then((res) =>
    res.json().then((data) => displayAllFetchPets(data.pets))
  );
};

// Fetch pets by category
const loadCategoryPet = (petCategory) => {
  // console.log(petCategory);
  const petCategoryBtnId = document.getElementById(`pet-${petCategory}`);
  const petCategoryBtnClass = document.querySelectorAll('.petsBtn');

  // Remove 'colorBtn: active btn bg color' class from all buttons (deactivate all)
  petCategoryBtnClass.forEach((activeBtn) => {
    activeBtn.classList.remove('colorBtn');
  });

  // Add 'colorBtn: active btn bg color' class to the clicked button (activate current button)
  petCategoryBtnId.classList.add('colorBtn');

  fetch(
    `https://openapi.programming-hero.com/api/peddy/category/${petCategory}`
  )
    .then((res) => res.json())
    .then((data) => displayAllFetchPets(data.data)) // Function to display videos
    .catch((err) => console.log(err));
};

// Function to fetch videos from the API[......for sorting purpose].............????????????????????.....................
async function fetchPets() {
  try {
    const response = await fetch(
      'https://openapi.programming-hero.com/api/peddy/pets'
    );
    const data = await response.json();
    if (data.status) {
      // console.log('after fetch: ', data);
      // console.log('data.pets :', data.pets);
      return data.pets; // Return the list of pets
    } else {
      console.error('Failed to fetch videos');
      return [];
    }
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
}

// function to sort videos by views[.....for sorting purpose].............................................................
function sortpetsByPrice(pets) {
  // pets.sort((a, b) => parseViews(a.price) - parseViews(b.price));
  pets.sort((a, b) => a.price - b.price);
  displayAllFetchPets(pets); // Re-render the sorted videos[send to displayVideos function]
}

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
        <button id="pet-${element.category}" onclick="loadCategoryPet('${element.category}')" class="border petsBtn border-gray-200 rounded-lg flex gap-2 justify-center items-center px-6 py-2 font-semibold w-40 sm:w-40 md:w-36 lg:w-48"><img src=${element.category_icon} alt="" class="w-8"> ${element.category}</button>
    `;
    getPetCategoryBtnContainer.append(createPetCategorydiv);
  });
};

// diplay All Pets into cards
const displayAllFetchPets = (pets) => {
  const getPetsCardsContainer = document.getElementById('pets-cards-container');
  getPetsCardsContainer.innerHTML = '';
  // if any 'pets' is empty array then it show a customize message
  if (pets.length === 0) {
    getPetsCardsContainer.classList.remove('grid');
    getPetsCardsContainer.innerHTML = `
      <div class =" min-h-[500px] flex flex-col justify-center items-center gap-4"> 
          <img src="./asset/error.webp">
          <h5 class="font-bold text-lg md:text-3xl" >No Information Available</h5>
          <p class="text-sm md:text-base text-gray-400 text-center">It is a long established fact that a reader will be distracted by the readable content of a page when looking at <br> its layout. The point of using Lorem Ipsum is that it has a.</p>
      </div>
    `;
    return;
  } else {
    getPetsCardsContainer.classList.add('grid');
  }

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

// Event listener for the sort button[.........for shorting purpose]
document.getElementById('btn-sortPrice').addEventListener('click', async () => {
  // call function to action sortbutton after click
  // activeSortBtn();
  // console.log('sort button clicked');
  const pets = await fetchPets(); // Fetch videos from the API
  console.log(pets);
  sortpetsByPrice(pets); // Sort and render the pets
});
