// handle search button
//console.log("JS Added");

// Load Post

//https://openapi.programming-hero.com/api/retro-forum/posts

let allPost = {};

const loadPost = async (searchText) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchText}`      
    );
    const data = await res.json();   
    const posts = data.posts;
    allPost = posts;    
    displayPosts(posts);
    toggleLoadingSpinner(false);
  };


  const displayPosts = (posts) => {
    // step-1 declare the parent div to append to in a variable
    const postContainer = document.getElementById("post-container");
  
    //   clear post container cards before adding new cards
    postContainer.textContent = " ";
  
    
  
    posts.forEach((post) => {
      // step-2 create a div
      const postCard = document.createElement("div");
      //postCard.classList = `card bg-gray-100 p-4 shadow-xl`;
     

    postCard.innerHTML = ` <div class="flex bg-[#F3F3F5] p-6 shadow-lg rounded-lg mb-6">
    <div class="mr-6">
        <div class="indicator">
            <span class="indicator-item border-none badge badge-secondary ${post?.isActive? 'bg-green-500':'bg-red-500'} bg-green-500"></span>
            <div class="avatar">
                <div class="w-[100px] rounded-xl">
                    <img src="${post.image}" />
                </div>
            </div>

        </div>
    </div>

    <div class="flex-1">
        <div class="flex mb-3">
            <p class="mr-4"># ${post.category}</p>
            <p>Author : ${post.author.name}</p>
        </div>
        <h1 class="text-xl font-bold mb-4">${post.title}</h1>
        <p class="max-w-[560px]">${post.description}</p>
        <hr class="my-6 border-t-2 border-dashed">

        <div class="flex justify-between">
            <div class="flex lg:gap-8">
                <div class="flex gap-3 justify-between">
                    <img src="./images/message.png" alt="">
                    <p>${post.comment_count}</p>
                </div>

                <div class="flex gap-3 justify-between">
                    <img src="./images/eye.png" alt="">
                    <p>${post.view_count}</p>
                </div>

                <div class="flex gap-3 justify-between">
                    <img src="./images/clock-hour.png" alt="">
                    <p>${post.posted_time}</p>
                </div>
            </div>
            <div class="">
                <img onclick="addToRead(${post.id})" src="./images/email.png" alt="" class="hover:cursor-pointer">
            </div>

        </div>

    </div>
</div>`;

      // step-4 appendChild to parent div
      postContainer.appendChild(postCard);
    });
    
  };


//   Load Latest

const loadLatestPost = async (searchText) => {
    const res = await fetch(
        `https://openapi.programming-hero.com/api/retro-forum/latest-posts`      
    );
    const posts = await res.json();

    //console.log(data);
    
   // const posts = data.posts;    
    console.log(posts);
    displayLatestPosts(posts);
    toggleLoadingSpinner(false);
  };


  const displayLatestPosts = (posts) => {
    // step-1 declare the parent div to append to in a variable
    const postLatestContainer = document.getElementById("latest-post");
    

    posts.forEach((post) => {
      // step-2 create a div
      
      //postCard.classList = `card bg-gray-100 p-4 shadow-xl`;
      //console.log(post.posted_date);
      //alert(post.author.posted_date);
      const postCard = document.createElement("div");
     
      postCard.innerHTML = `<div class="card bg-base-100 shadow-xl border-solid border-2">
      <figure class="px-10 pt-10">
          <img src="${post.cover_image}" alt="Shoes"
              class="rounded-xl" />
      </figure>
      <div class="card-body items-start text-center">
          <div class="flex gap-3">
              <img src="./images/date.png" alt="">
              <p>${post?.author?.posted_date ? post.author.posted_date:"No publish date"}</p>
          </div>                            
          <p class="text-xl font-bold text-left">${post.title}</p>
          <p class="text-left">${post.description}</p>
          
          <div class="flex gap-3 items-start">                            
          <div class="avatar">
              <div class="w-12 rounded-full">
                <img src="${post.profile_image}" />
              </div>
            </div>
          <div>
              <p class="font-bold text-left">${post?.author.name}</p>
              <p class="text-left">${post?.author?.designation ? post.author.designation: "Unknown"}</p>
          </div>
          </div>                            
          
      </div>
  </div>`;
    
//phone?.others?.GPS ? phone.others.GPS : "No GPS Available"
      // step-4 appendChild to parent div
      postLatestContainer.appendChild(postCard);
    });
    
  };

  // handle loading spinner
const toggleLoadingSpinner = (isLoading) => {
    const loadingSpinner = document.getElementById("loading-spinner");
    if (isLoading) {
      loadingSpinner.classList.remove("hidden");
    } else {
      loadingSpinner.classList.add("hidden");
    }
  };


const addToRead = (postId) => {  
    let readCount = parseInt(document.getElementById("read-counter").innerText);
    //alert (allPost) 
    //alert(postId);
    // step-1 declare the parent div to append to in a variable
    const postRead = document.getElementById("post-read");
    
  
    //   clear post container cards before adding new cards
    //postRead.textContent = " ";


    allPost.forEach((post) => {
       
        if(post.id===postId)
        {
            const postRadCard = document.createElement("div");

            postRadCard.innerHTML = `<div class="p-3 shadow-lg bg-white rounded-xl mb-2">
            <div class="flex justify-center   p-2 rounded-xl">
                <p>${post.title}</p>
                <div class="flex items-start justify-center ">
                    <img src="./images/eye.png" alt="">
                    <span>${post.view_count}</span>
                </div>
            </div>
        </div>`;

        postRead.appendChild(postRadCard);
           
        }
    })
 
    readCount++;
    document.getElementById("read-counter").innerText = readCount;

}




const handleSearch = () => {
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    //alert(searchText);
    setTimeout(() => {
        loadPost(searchText);
      }, 2000);
        
    toggleLoadingSpinner(true);
  };

  setTimeout(() => {
    loadPost('');
  }, 2000);

  setTimeout(() => {
    loadLatestPost('');
  }, 2000);




  toggleLoadingSpinner(true);