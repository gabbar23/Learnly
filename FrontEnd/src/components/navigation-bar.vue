<template>
    <div class="navbar">
      <div class="navbar-container">
        <div class="navbar-logo">
          <img src="" alt="Logo" />
        </div>
        <div class="navbar-links">
          <ul>
            <li v-for="link in links" :key="link.id">
              <a :href="link.url">{{ link.title }}</a>
            </li>
          </ul>
        </div>
        <div class="navbar-icons">
          <a href="#"><i class="fa fa-search"></i></a>
          <a href="#"><i class="fa fa-user"></i></a>
          <a href="#"><i class="fa fa-shopping-cart"></i></a>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        links: [
          { id: 1, title: 'Home', url: '/' },
          { id: 2, title: 'About', url: '/about' },
          { id: 3, title: 'Contact', url: '/contact' },
        ],
      };
    },
  };
  </script>
  
  <style>
  .navbar {
    background-color: #fff;
    color: #333;
    box-shadow: 0px 1px 5px #ccc;
    height: 80px;
  }
  
  .navbar-container {
    max-width: 1200px;
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100%;
  }
  
  .navbar-logo {
    flex: 1;
  }
  
  .navbar-logo img {
    max-height: 50px;
  }
  
  .navbar-links {
    flex: 3;
  }
  
  .navbar-links ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }
  
  .navbar-links li {
    margin: 0 15px;
  }
  
  .navbar-links a {
    color: #333;
    text-decoration: none;
    font-size: 18px;
    transition: all 0.3s ease-in-out;
  }
  
  .navbar-links a:hover {
    color: #007bff;
  }
  
  .navbar-icons {
    flex: 1;
    text-align: right;
  }
  
  .navbar-icons a {
    color: #333;
    text-decoration: none;
    margin-left: 20px;
    font-size: 20px;
    transition: all 0.3s ease-in-out;
  }
  
  .navbar-icons a:hover {
    color: #007bff;
  }
  </style>