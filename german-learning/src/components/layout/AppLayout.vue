<template>
  <header class="app-header">
    <div class="header-content">
      <router-link to="/" class="logo">
        <span class="logo-icon">🇩🇪</span>
        <h1>Deutsch Lernen</h1>
      </router-link>

      <nav class="main-nav">
        <router-link to="/grammar" class="nav-link">Grammar</router-link>
        <router-link to="/exercises" class="nav-link">Exercises</router-link>
        <router-link to="/progress" class="nav-link">Progress</router-link>
      </nav>
    </div>
  </header>

  <main class="app-main">
    <router-view />
  </main>

  <footer class="app-footer">
    <p>&copy; 2024 Deutsch Lernen - Learn German Online</p>
  </footer>
</template>

<script setup lang="ts">
// Layout component - no logic needed
</script>

<style scoped>
.app-header {
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  color: white;
  padding: 1rem 2rem;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  text-decoration: none;
  color: white;
  transition: transform 0.2s ease;
}

.logo:hover {
  transform: scale(1.05);
}

.logo-icon {
  font-size: 2rem;
}

.logo h1 {
  font-size: 1.5rem;
  font-weight: 700;
  margin: 0;
}

.main-nav {
  display: flex;
  gap: 2rem;
}

.nav-link {
  color: rgba(255, 255, 255, 0.9);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  transition: all 0.3s ease;
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.1);
  color: white;
}

.nav-link.router-link-active {
  background: rgba(255, 255, 255, 0.2);
  color: white;
}

.app-main {
  min-height: calc(100vh - 180px);
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.app-footer {
  background: #1a1a2e;
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
  padding: 1.5rem;
  margin-top: auto;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .main-nav {
    gap: 1rem;
  }

  .app-main {
    padding: 1rem;
  }
}
</style>
