document.addEventListener("DOMContentLoaded", function() {
  const prevSection = document.getElementById("read-section");
  const writeSection = document.getElementById("write-section");
  const blogList = document.getElementById("blog-list");
  const titleInput = document.getElementById("title");
  const authorInput = document.getElementById("author");
  const contentTextarea = document.getElementById("content");
  const datetime = document.getElementById("datetime");
  const toggleButton = document.getElementById("toggle-button");

  let isWritingMode = false; // Flag to track writing mode state
  let blogsData = []; // Array to store the blog data

  // Fetch current date and time
  const currentDate = new Date();
  datetime.textContent = currentDate.toLocaleString();

  // Load saved data from localStorage if available
  if (localStorage.getItem("blogsData")) {
    blogsData = JSON.parse(localStorage.getItem("blogsData"));
    displayBlogs();
  }

  // Toggle between reading and writing mode when the toggle button is clicked
  toggleButton.addEventListener("click", function() {
    isWritingMode = !isWritingMode;

    if (isWritingMode) {
      prevSection.classList.add("hidden");
      writeSection.classList.remove("hidden");
    } else {
      prevSection.classList.remove("hidden");
      writeSection.classList.add("hidden");
    }
  });

  // Save data to localStorage when Save button is clicked
  document.getElementById("save-button").addEventListener("click", function() {
    const blogData = {
      title: titleInput.value,
      author: authorInput.value,
      content: contentTextarea.value
    };
    blogsData.push(blogData);
    localStorage.setItem("blogsData", JSON.stringify(blogsData));
    alert("Blog saved successfully!");

    displayBlogs();

    titleInput.value = "";
    authorInput.value = "";
    contentTextarea.value = "";
  });

  // Reset data and clear localStorage when Reset button is clicked
  document.getElementById("reset-button").addEventListener("click", function() {
    blogsData = [];
    localStorage.removeItem("blogsData");
    alert("All blogs have been reset!");
    displayBlogs();
  });

  // Function to display the blogs
  function displayBlogs() {
    blogList.innerHTML = "";

    if (blogsData.length > 0) {
      blogsData.forEach(function(blog) {
        const blogItem = document.createElement("div");
        blogItem.classList.add("blog-item");

        const blogTitle = document.createElement("h3");
        blogTitle.classList.add("blog-title");
        blogTitle.textContent = blog.title;

        const blogAuthor = document.createElement("p");
        blogAuthor.classList.add("blog-author");
        blogAuthor.innerHTML = `<strong>Author:</strong> ${blog.author}`;

        const blogContent = document.createElement("p");
        blogContent.classList.add("blog-content");
        blogContent.textContent = blog.content;

        blogItem.appendChild(blogTitle);
        blogItem.appendChild(blogAuthor);
        blogItem.appendChild(blogContent);

        blogList.appendChild(blogItem);
      });
    } else {
      blogList.innerHTML = "<p>No blogs found.</p>";
    }
  }
});
