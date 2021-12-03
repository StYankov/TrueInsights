<template>
  <div class="app">
    <Header />
    <main class="container-fluid">
      <Sidebar />
      <div class="main-content">
        <div class="content-container">
          <Nuxt />
        </div>
      </div>
    </main>

  </div>
</template>
<script>
import Sidebar from '@/components/Shared/Sidebar/Index';
import Header from '@/components/Shared/Header/Index';

export default {
  components: {
    Sidebar,
    Header
  },
  watch: {
    $route() {
      document.body.classList.remove('sidebar-open');
    }
  } 
}
</script>