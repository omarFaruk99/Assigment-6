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

// Show the spinner and hide the pets cards container
const showSpinner = () => {
  document.getElementById('spinner').classList.remove('hidden');
  document.getElementById('pets-cards-container').classList.add('hidden'); // Hide the pets container
};

// Hide the spinner and show the pets cards container
const hideSpinner = () => {
  document.getElementById('spinner').classList.add('hidden');
  document.getElementById('pets-cards-container').classList.remove('hidden'); // Show the pets container
};

// Fetch pets by category and show spinner for 2 seconds
const loadCategoryPet = (petCategory) => {
  // Show the spinner
  showSpinner();

  // Fetch category-specific pets after 2 seconds
  setTimeout(() => {
    fetch(
      `https://openapi.programming-hero.com/api/peddy/category/${petCategory}`
    )
      .then((res) => res.json())
      .then((data) => {
        // Hide the spinner and display pets
        hideSpinner();
        displayAllFetchPets(data.data); // Function to display pets
      })
      .catch((err) => {
        hideSpinner(); // Hide spinner on error
        console.log(err);
      });
  }, 2000); // Ensure spinner is shown for at least 2 seconds
};

// Fetch pets by category...............@@@@@@@@@@@@@@@@@@@@@@@@
// const loadCategoryPet = (petCategory) => {
//   // console.log(petCategory);
//   const petCategoryBtnId = document.getElementById(`pet-${petCategory}`);
//   const petCategoryBtnClass = document.querySelectorAll('.petsBtn');

//   // Remove 'colorBtn: active btn bg color' class from all buttons (deactivate all)
//   petCategoryBtnClass.forEach((activeBtn) => {
//     activeBtn.classList.remove('colorBtn');
//   });

//   // Add 'colorBtn: active btn bg color' class to the clicked button (activate current button)
//   petCategoryBtnId.classList.add('colorBtn');

//   fetch(
//     `https://openapi.programming-hero.com/api/peddy/category/${petCategory}`
//   )
//     .then((res) => res.json())
//     .then((data) => displayAllFetchPets(data.data)) // Function to display videos
//     .catch((err) => console.log(err));
// };

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
  pets.sort((b, a) => a.price - b.price);
  displayAllFetchPets(pets); // Re-render the sorted videos[send to displayVideos function]
}

// Load pets by 'PetID' when clike on 'details' button.............................................................
const clickDetailsBtn = async (petID) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petID}`;
  const res = await fetch(url);
  const data = await res.json();
  displayPetDetailsOnclick(data.petData);
};

// fetch pets by 'PetID' when click on 'thumpsUP icon'
const clickThumbsUP = async (petID) => {
  const url = `https://openapi.programming-hero.com/api/peddy/pet/${petID}`;
  const res = await fetch(url);
  const data = await res.json();
  displayAppend(data.petData);
  // displayPetDetailsOnclick(data.petData);
};

// append specific pet image into 'append' section
const displayAppend = (specificPetObj) => {
  const getAppendContainer = document.getElementById('like-btn-append');
  const createPetImageDiv = document.createElement('div');
  createPetImageDiv.classList.add('m-2');
  createPetImageDiv.innerHTML = `
      <img src= ${specificPetObj.image} alt="" class="w-full h-auto object-cover rounded-md" >  
    `;
  getAppendContainer.append(createPetImageDiv);
};

// displayPetDetails: when click on details btn then [onclick > clickDetailsBtn > displayPetDetailsOnclick]
const displayPetDetailsOnclick = (specificPetID) => {
  const modalContent = document.getElementById('modal-content');
  modalContent.innerHTML = `
     <div>
        <div class="flex justify-center">
            <img src=${specificPetID.image} alt="" class="rounded-md w-full">
        </div>

        <div class="mt-3" > <h5 class="pet-name font-bold text-xl" >${
          specificPetID.pet_name
        }</h5>
        </div>
        
        <div class="flex gap-x-5 border-b-2 mt-2">
            <div>
                <p class="breed text-gray-400">
                    <i class="fa-solid fa-qrcode"></i>
                      Breed: ${specificPetID.breed}</p>
                <p class="gender text-gray-400">
                      <i class="fa-solid fa-mercury"></i>
                      Gender: ${specificPetID.gender}</p>
                <p class="gender text-gray-400">
                      <i class="fa-solid fa-mercury"></i>
                      vaccinated_status: ${
                        specificPetID.vaccinated_status
                      }</p>      
                      
            </div>
            <div>
                <p class="birth text-gray-400">
                    <i class="fa-regular fa-calendar"></i>
                      Birth: ${new Date(
                        specificPetID.date_of_birth
                      ).getFullYear()}</p>  
                <p class="price text-gray-400">
                    <i class="fa-solid fa-dollar-sign"></i>
                    Price: ${specificPetID.price}$</p>     
            </div>   
         </div>
          <div class="mt-3"> 
                <h5 class="font-semibold text-base" >Details Information</h5>
                <p class="text-gray-400">${specificPetID.pet_details}</p>
          </div> 
    </div>  
    
  `;

  const modal = document.getElementById('my_modal_5');
  modal.showModal();
};

// clickAdoptBtnDisplay(): when click 'Adopt' btn then [onclick > clickAdoptBtnDisplay]
const clickAdoptBtnDisplay = () => {
  const getModalContent = document.getElementById('modal-content');

  // Hide the Close button dynamically
  const closeButton = document.querySelector('#my_modal_5 .modal-action .btn');
  closeButton.style.display = 'none'; // Hide the close button

  // Initial countdown value
  let countdownValue = 3;

  // Set initial modal content
  getModalContent.innerHTML = `
    <div class="flex flex-col justify-center items-center pt-7 gap-5">
      <i class="fa-regular fa-handshake icon"></i>
      <h3 class="font-extrabold text-4xl">Congrats</h3>
      <h2 class="font-extrabold text-5xl colorBtnText">${countdownValue}</h2>
    </div>
  `;

  // Show the modal
  const modal = document.getElementById('my_modal_5');
  modal.showModal();

  // Set up the countdown
  const interval = setInterval(() => {
    countdownValue--;

    // Update the countdown display
    const countdownElement = getModalContent.querySelector('h2');
    countdownElement.textContent = `${countdownValue}`;

    // When countdown reaches 0, close the modal and clear the interval
    if (countdownValue === 0) {
      clearInterval(interval);
      modal.close();
      closeButton.style.display = 'block';
    }
  }, 1000); // Run the countdown every 1 second
};

// display All Pet Catefories Button..............@@@@@@@@@@@@@@@@@@@@@....................................
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
    createPetCardDiv.classList = 'border border-gray-200 p-5 rounded-lg';

    // Define custom text for unavailable values
    const breed = element.breed || 'Not Available';
    const birth = element.date_of_birth
      ? new Date(element.date_of_birth).getFullYear()
      : 'Not Available';
    const gender = element.gender || 'Not Available';
    const price =
      element.price !== null && !isNaN(element.price)
        ? `${element.price}$`
        : 'Not Available';

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
                     Breed: ${breed}</p>
                <p class="birth text-gray-400">
                    <i class="fa-regular fa-calendar"></i>
                     Birth: ${birth}</p>  
                <p class="gender text-gray-400">
                    <i class="fa-solid fa-mercury"></i>
                     Gender: ${gender}</p>
                <p class="price text-gray-400">
                    <i class="fa-solid fa-dollar-sign"></i>
                     Price: ${price}$</p>
            </div>
        </div>
        <div class="flex flex-col sm:flex-row lg:flex-row items-center mt-3 flex-wrap gap-1 lg:justify-evenly"> 
            <button onclick ="clickThumbsUP('${element.petId}')" class="border border-gray-300 px-2 sm:px-5 py-2 rounded-md w-full lg:w-auto">
                <i class="fa-regular fa-thumbs-up"></i>
            </button>
            <button onclick ="clickAdoptBtnDisplay()" class="border border-gray-300 px-2 sm:px-5 py-2 rounded-md colorBtnText font-bold w-full lg:w-auto ">Adopt</button>
            <button onclick="clickDetailsBtn('${element.petId}')" class="border border-gray-300 px-2 sm:px-5 py-2 rounded-md colorBtnText font-bold w-full lg:w-auto">Details</button>    
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

// On page load, show the spinner for 2 seconds and then load all pets
document.addEventListener('DOMContentLoaded', () => {
  showSpinner();
  setTimeout(() => {
    hideSpinner();
    fetchAllPets(); // Fetch all pets after spinner
  }, 2000);
});
