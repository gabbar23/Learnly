<template>
  <div class="container-fluid">
    <div class="row">
      <nav class="col-md-2 d-none d-md-block sidebar mt-5">
        <div class="sidebar-sticky">
          <ul class="nav flex-column">
            <li class="nav-item" @click="navigateTo('details')">
              <a
                class="nav-link"
                :class="{ active: currentRoute.path == '/buyer' }"
                href="javascript:void"
              >
                Details
              </a>
            </li>
            <li class="nav-item" @click="navigateTo('orders')">
              <a
                class="nav-link"
                :class="{ active: currentRoute.path == '/buyer/orders' }"
                href="javascript:void"
              >
                Orders
              </a>
            </li>
            <li class="nav-item" @click="navigateTo('report')">
              <a
                class="nav-link"
                :class="{ active: currentRoute.path == '/buyer/report-issue' }"
                href="javascript:void"
              >
                Report an Issue
              </a>
            </li>
            <li class="nav-item" @click="navigateTo('issues')">
              <a
                class="nav-link"
                :class="{ active: currentRoute.path == '/buyer/issues' }"
                href="javascript:void"
              >
                Issue History
              </a>
            </li>
            <!-- <li class="nav-item">
              <a class="nav-link"  :class="{ active: currentRoute.path == '/buyer' }"
                href="javascript:void">
                <i class="fas fa-cog"></i>
                Settings
              </a>
            </li> -->
          </ul>
        </div>
      </nav>

      <main role="main" class="col-md-9 ml-sm-auto col-lg-10 px-4">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
<script lang="ts" setup>
import router from "@/router";
import { computed } from "vue";

const currentRoute = computed(() => {
  return router.currentRoute.value;
});

const navigateTo = (buttonClicked: String) => {
  if (buttonClicked == "details") {
    router.push("/buyer");
  } else if (buttonClicked == "orders") {
    router.push("/buyer/orders");
  } else if (buttonClicked == "report") {
    router.push("/buyer/report-issue");
  }
  else if (buttonClicked=="issues"){
    router.push("/buyer/issues");
  }
};
</script>
<style>
/* Sidebar */
.sidebar {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  z-index: 100;
  padding: 48px 0 0;
  box-shadow: inset -1px 0 0 rgba(0, 0, 0, 0.1);
}

.sidebar-sticky {
  position: relative;
  top: 0;
  height: calc(100vh - 48px);
  padding-top: 0.5rem;
  overflow-x: hidden;
  overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
}

.sidebar .nav-link {
  font-weight: 500;
  color: #333;
}

.sidebar .nav-link .feather {
  margin-right: 4px;
  color: #999;
}

.sidebar .nav-link.active {
  color: #007bff;
}

.sidebar .nav-link:hover .feather,
.sidebar .nav-link.active .feather {
  color: inherit;
}

.sidebar-heading {
  font-size: 0.75rem;
  text-transform: uppercase;
}

/* Navbar */
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
}

/* Utility classes */
.border-bottom {
  border-bottom: 1px solid #e5e5e5;
}

.btn-group-sm > .btn,
.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;
  border-radius: 0.2rem;
}

.btn-outline-secondary {
  color: #6c757d;
  background-color: transparent;
  background-image: none;
  border-color: #6c757d;
}
.btn-outline-secondary:hover {
  color: #fff;
  background-color: #6c757d;
  border-color: #6c757d;
}

.btn-group-vertical {
  display: flex;
  flex-direction: column;
  align-items: stretch;
  width: 100%;
}
.btn-group-vertical .btn,
.btn-group-vertical .btn-group {
  width: 100%;
}
.btn-group-vertical > .btn:not(:first-child),
.btn-group-vertical > .btn-group:not(:first-child) {
  margin-top: -1px;
}
.btn-group-vertical > .btn.active,
.btn-group-vertical > .btn:active,
.btn-group-vertical > .btn:focus,
.btn-group-vertical > .btn:hover,
.btn-group-vertical > .btn-group.active > .btn,
.btn-group-vertical > .btn-group:active > .btn,
.btn-group-vertical > .btn-group:focus > .btn,
.btn-group-vertical > .btn-group:hover > .btn {
  z-index: 1;
}

.nav-link.active {
  background-color: #b9eedc;
  color: #fff;
}

/* Grid breakpoints */
@media (min-width: 768px) {
  .sidebar {
    padding-top: 56px; /* Space for fixed navbar */
  }
  /* [role="main"] {
    padding-top: 80px;
  } */
}
</style>
