<template>
  <div class="app">
    <Header />
    <main class="container-fluid">
      <Sidebar />
      <div class="content">
        <Nuxt />
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
  }  
}
</script>