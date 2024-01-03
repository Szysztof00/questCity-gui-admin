<template>
    <div class="container mt-5">
      <h1 class="mt-4">ZARZĄDZAJ UŻYTKOWNIKAMI</h1>
      <div class="text-center">
        <button @click="openUserModal('add')" class="btn btn-primary">Dodaj użytkownika</button>
  
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
              <th class="th-sm">Imię i nazwisko</th>
              <th class="th-sm">Email</th>
              <th class="th-sm">Akcje</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(user, index) in paginatedUsers" :key="user.id">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.email }}</td>
              <td>
                <button @click="openUserModal('edit', user)" class="btn btn-sm btn-warning">Edytuj</button>
                <button @click="deleteUser(user.id)" class="btn btn-sm btn-danger">Usuń</button>
              </td>
            </tr>
          </tbody>
          <tfoot>
            <tr>
              <th>ID</th>
              <th>Imię i nazwisko</th>
              <th>Email</th>
              <th>Akcje</th>
            </tr>
          </tfoot>
        </table>
  
        <div v-if="userModal" class="user-modal-popup">
          <div class="card">
            <div class="card-header">
              <h2 class="mb-0">{{ (modalType === 'add') ? 'Dodaj użytkownika' : 'Edytuj użytkownika' }}</h2>
            </div>
            <div class="card-body">
              <!-- Formularz edycji/dodawania użytkownika -->
              <label for="name">Imię i nazwisko:</label>
              <input type="text" v-model="editedUser.name" id="name" class="form-control mb-2">
  
              <label for="email">Email:</label>
              <input type="text" v-model="editedUser.email" id="email" class="form-control mb-2">

              
  
              <button @click="saveUser" class="btn btn-success mr-2">
                {{ (modalType === 'add') ? 'Dodaj' : 'Zapisz' }}
              </button>
              <button @click="closeUserModal" class="btn btn-secondary">Anuluj</button>
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
        users: JSON.parse(localStorage.getItem('users')) || [
          { id: 1, name: 'John Doe', email: 'john@example.com' },
          // Dodaj więcej użytkowników według potrzeb
        ],
        userModal: false,
        modalType: 'add',
        editedUser: {
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
      filteredUsers() {
        return this.users.filter(user => {
          return user.name.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                 user.email.toLowerCase().includes(this.searchTerm.toLowerCase());
        });
      },
      totalPages() {
        return Math.ceil(this.filteredUsers.length / this.itemsPerPage);
      },
      paginatedUsers() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.filteredUsers.slice(start, end);
      },
    },
    methods: {
      openUserModal(type, user = null) {
        this.modalType = type;
        this.userModal = true;
  
        if (type === 'edit' && user) {
          this.editedUser = { ...user };
        } else {
          this.editedUser = {
            id: null,
            name: '',
            email: '',
          };
        }
      },
      saveUser() {
        // Logika zapisywania użytkownika
        if (this.modalType === 'add') {
          this.users.push({ ...this.editedUser, id: this.users.length + 1 });
        } else if (this.modalType === 'edit') {
          const index = this.users.findIndex((user) => user.id === this.editedUser.id);
          if (index !== -1) {
            this.$set(this.users, index, { ...this.editedUser });
          }
        }
  
        // Zapisz dane w pamięci podręcznej
        localStorage.setItem('users', JSON.stringify(this.users));
  
        this.closeUserModal();
      },
      deleteUser(userId) {
        // Logika usuwania użytkownika
        const index = this.users.findIndex((user) => user.id === userId);
        if (index !== -1) {
          this.users.splice(index, 1);
        }
  
        // Zapisz dane w pamięci podręcznej
        localStorage.setItem('users', JSON.stringify(this.users));
      },
      closeUserModal() {
        this.userModal = false;
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
  /* Dodaj dowolne style CSS według potrzeb */
  
  /* Dodaj style dla popupu */
  .user-modal-popup {
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
  