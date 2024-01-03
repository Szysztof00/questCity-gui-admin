<template>
    <div class="container mt-5">
      <h1 class="mt-4">ZARZĄDZAJ GRAMI MIEJSKIMI</h1>
      <div class="text-center">
        <RouterLink to="/create"><button class="btn btn-primary">Stwórz nową grę miejską!</button></RouterLink>
  
        <!-- Dodano input dla wyszukiwania -->
        <div class="input-group mt-3">
          <input type="text" v-model="searchTerm" class="form-control" placeholder="Szukaj użytkownika...">
          <div class="input-group-append">
            <button @click="resetSearch" class="btn btn-outline-secondary" type="button">Resetuj</button>
          </div>
        </div>
  
        <table id="dtBasicExample" class="table table-striped table-bordered table-sm mt-3" cellspacing="0" width="100%">
          <thead class="thead-dark">
            <tr>
              <th class="th-sm">ID</th>
              <th class="th-sm">Nazwa gry</th>
              <th class="th-sm">Aktywność</th>
              <th class="th-sm">Akcje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(game, index) in paginatedGames" :key="game.id">
              <td>{{ game.id }}</td>
              <td>{{ game.title }}</td>
              <td v-if="game.active">Aktywna</td>
              <td v-else>Nieaktywna</td>
              <td>
                <button @click="openGameModal('edit', game)" class="btn btn-sm btn-warning">Edytuj</button>
                <button @click="deleteGame(game.id)" class="btn btn-sm btn-danger">Usuń</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>ID</th>
              <th>Nazwa gry</th>
              <th>Aktywność</th>
              <th>Akcje</th>
            </tr>
          </tfoot>
        </table>
  
        <div v-if="gameModal" class="game-modal-popup">
          <div class="card">
            <div class="card-header">
              <h2 class="mb-0">{{ (modalType === 'add') ? 'Dodaj grę' : 'Edytuj grę' }}</h2>
            </div>
            <div class="card-body">
              <!-- Formularz edycji/dodawania użytkownika -->
              <label for="name">Imię i nazwisko:</label>
              <input type="text" v-model="editedGame.name" id="name" class="form-control mb-2">
  
              <label for="email">Email:</label>
              <input type="text" v-model="editedGame.email" id="email" class="form-control mb-2">

              
  
              <button @click="saveGame" class="btn btn-success mr-2">
                {{ (modalType === 'add') ? 'Dodaj' : 'Zapisz' }}
              </button>
              <button @click="closeGameModal" class="btn btn-secondary">Anuluj</button>
            </div>
          </div>
        </div>
  
        <!-- Dodane przyciski paginacji -->
        <nav v-if="totalPages > 1">
          <ul class="pagination">
            <li class="page-item" :class="{ 'disabled': currentPage === 1 }">
              <a class="page-link" @click="changePage(currentPage - 1)">Poprzednia</a>
            </li>
            <li class="page-item" v-for="page in totalPages" :key="page" :class="{ 'active': currentPage === page }">
              <a class="page-link" @click="changePage(page)" >{{ page }}</a>
            </li>
            <li class="page-item" :class="{ 'disabled': currentPage === totalPages }">
              <a class="page-link" @click="changePage(currentPage + 1)">Następna</a>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        games: JSON.parse(localStorage.getItem('games')) || [],
        gameModal: false,
        modalType: 'add',
        editedGame: {
          id: null,
          name: '',
          email: '',
        },
        searchTerm: '',
        itemsPerPage: 10,
        currentPage: 1,
      };
    },
    computed: {
      filteredGames() {
        return this.games.filter(game => {
          return game.title.toLowerCase().includes(this.searchTerm.toLowerCase())
                //  game.email.toLowerCase().includes(this.searchTerm.toLowerCase())
                ;
        });
      },
      totalPages() {
        return Math.ceil(this.filteredGames.length / this.itemsPerPage);
      },
      paginatedGames() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredGames.slice(start, end);
      },
    },
    methods: {
      openGameModal(type, game = null) {
        this.modalType = type;
        this.gameModal = true;
  
        if (type === 'edit' && game) {
          this.editedGame = { ...game };
        } else {
          this.editedGame = {
            id: null,
            name: '',
            email: '',
          };
        }
      },
      saveGame() {
        // Logika zapisywania użytkownika
        if (this.modalType === 'add') {
          this.games.push({ ...this.editedGame, id: this.games.length + 1 });
        } else if (this.modalType === 'edit') {
          const index = this.games.findIndex((game) => game.id === this.editedGame.id);
          if (index !== -1) {
            this.$set(this.games, index, { ...this.editedGame });
          }
        }
  
        // Zapisz dane w pamięci podręcznej
        localStorage.setItem('games', JSON.stringify(this.games));
  
        this.closeGameModal();
      },
      deleteGame(gameId) {
        // Logika usuwania gry
        const index = this.games.findIndex((game) => game.id === gameId);
        if (index !== -1) {
          this.games.splice(index, 1);
        }
  
        // Zapisz dane w pamięci podręcznej
        localStorage.setItem('games', JSON.stringify(this.games));
      },
      closeGameModal() {
        this.gameModal = false;
      },
      resetSearch() {
        this.searchTerm = '';
      },
      changePage(page) {
        if (page >= 1 && page <= this.totalPages) {
          this.currentPage = page;
        }
      },
    },
  };
  </script>
  
  <style scoped>

  .game-modal-popup {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    padding: 20px;


  }

  .mt-4 {
    width: 100%;
    text-align: center;
    color: #12456e !important;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
}

  a{
    cursor: pointer;
  }
  </style>
  