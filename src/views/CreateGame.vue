<template>
    <div class="container mt-5">
        <h1 class="mt-4">GENERATOR GRY MIEJSKIEJ</h1>
        <form @submit.prevent="createGame">
            <div v-if="currentStep === 1">
                <h2 class="stepTitle">Identyfikacja</h2>
                <div class="form-group">
                    <div class="upload-container mb-4">
                        <input type="file" @change="handleImageUpload" class="input-file" accept="image/*">
                        <p v-if="game.image">Zdjęcie zostało załadowane: {{ game.image.name }}</p>
                        <p v-else>Wgraj obrazek</p>
                    </div>
                    <label for="title">NAZWA</label>
                    <input type="text" class="form-control" id="title" v-model="game.title" required>
                </div>
                <div class="form-group">
                    <label for="description">OPIS</label>
                    <textarea class="form-control" id="description" v-model="game.description" rows="4" required></textarea>
                </div>
                <div class="mode-game-btn">
                    <label for="title">KOLEJNOŚĆ ETAPÓW</label>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-secondary" :class="{ active: game.mode.line === 'Liniowa' }">
                            <input type="radio" name="options-mode-line" autocomplete="off" value="Liniowa"
                                v-model="game.mode.line"> <b>Liniowa</b>
                        </label>
                        <label class="btn btn-secondary" :class="{ active: game.mode.line === 'Nieliniowa' }">
                            <input type="radio" name="options-mode-line" autocomplete="off" value="Nieliniowa"
                                v-model="game.mode.line"> <b>Nieliniowa</b>
                        </label>


                        <!-- <label class="btn btn-secondary">
    <input type="radio" name="options" id="option3" autocomplete="off" v-model="game.mode"> Radio
  </label> -->
                    </div>


                    <label for="title">TRYB GRY</label>
                    <div class="btn-group btn-group-toggle" data-toggle="buttons">
                        <label class="btn btn-secondary" :class="{ active: game.mode.players === 'offline' }">
                            <input type="radio" name="options-mode-player" autocomplete="off" value="offline"
                                v-model="game.mode.players"> <b>Offline</b> (z punktowymi)
                        </label>
                        <label class="btn btn-secondary" :class="{ active: game.mode.players === 'online' }">
                            <input type="radio" name="options-mode-player" autocomplete="off" value="online"
                                v-model="game.mode.players"> <b>Online</b> (bez punktowych)
                        </label>


                        <!-- <label class="btn btn-secondary">
    <input type="radio" name="options" id="option3" autocomplete="off" v-model="game.mode"> Radio
  </label> -->
                    </div>
                </div>

                <label for="URL">ADRES URL</label>
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text" id="basic-addon3">www.questcity.pl/games/</span>
                    </div>
                    <input type="text" class="form-control" id="basic-url" aria-describedby="basic-addon3"
                        v-model="game.urlAdress">
                </div>




                <button @click="nextStep" class="btn btn-primary" :disabled="!isStepValid(1)">Następny krok</button>
            </div>
            <div v-else-if="currentStep === 2">
                <h2 class="stepTitle">TWORZENIE FORMULARZA<br></h2>
                <div class="form-group">
                    <label for="taskCount">ILE CHCESZ ZADAŃ?</label>
                    <input v-model="taskCount" class="form-control" required v-on:keypress="NumbersOnly">
                </div>
                <ul v-for="i in parseInt(taskCount)" class="toDoList">
                    <li>
                        <p><strong>Zestaw {{ i }}:</strong></p>
                        <div class="form-group">
                            <label for="description">CO CHCESZ ZROBIĆ?</label>
                            <div class="btn-group btn-group-toggle" data-toggle="buttons">
                                <label class="btn btn-secondary" :class="{ active: game.addons === 'quiz' + i }">
                                    <input type="radio" :name="'options-addons-' + i" autocomplete="off" :value="'quiz' + i"
                                        v-model="game.addons[i]"> Quiz
                                </label>
                                <label class="btn btn-secondary" :class="{ active: game.addons === 'mission' + i }">
                                    <input type="radio" :name="'options-addons-' + i" autocomplete="off"
                                        :value="'mission' + i" v-model="game.addons[i]"> Misja
                                </label>
                                <label class="btn btn-secondary" :class="{ active: game.addons === 'findPlace' + i }">
                                    <input type="radio" :name="'options-addons-' + i" autocomplete="off"
                                        :value="'findPlace' + i" v-model="game.addons[i]"> Znajdź miejsce
                                </label>
                            </div>


                            <!-- ADDONS - QUIZ -->
                            <div v-if="game.addons[i] === 'quiz' + i">
                                <div class="form-group">
                                    <label for="taskCount">ILE CHCESZ ZADAŃ?</label>
                                    <input v-model="howMuchQuestions" class="form-control" required
                                        v-on:keypress="NumbersOnly">
                                    <label for="taskCount">ILE ODPOWIEDZI POWINNY MIEĆ PYTANIA?</label>
                                    <input v-model="howMuchAnswers" class="form-control" required
                                        v-on:keypress="NumbersOnly">
                                </div>
                                <ul v-for="i in parseInt(howMuchQuestions)">
                                    <li><b>Treść pytania {{ i }}:</b><input v-model="game.quiz.questions[i]"
                                            class="form-control" required></li>
                                    <ul v-for="j in parseInt(howMuchAnswers)">
                                        <li>Odpowiedź {{ j }}:<input v-model="game.quiz.answers[j]" class="form-control"
                                                required></li>
                                    </ul>
                                </ul>
                            </div>

                            <div v-if="game.addons[i] === 'mission' + i">
                                TEST-MISSION
                            </div>

                            <div v-if="game.addons[i] === 'findPlace' + i">
                                TEST-findPlace
                            </div>

                            <label for="description">OPIS</label>
                            <textarea class="form-control" id="description" v-model="game.descriptionTask[i - 1]" rows="4"
                                required></textarea>
                            <label for="description">ILE PUNKTÓW ZA WYKONANIE ZADANIA?</label>
                            <input v-model="game.howMuchPoint[i]" class="form-control" required v-on:keypress="NumbersOnly">
                        </div>
                        <label for="description">TWÓJ UNIKATOWY KOD QR DO ZADANIA</label>
                        <div class="d-flex justify-content-center"><img src="../assets/qrCode-placeholder.png"
                                class="qrCode"><label class="btn btn-secondary download align-self-center">Pobierz
                                plik</label></div>
                    </li>
                    <div style="width:100%; border-bottom: 2px solid rgba(0, 0, 0, 0.232); margin-bottom: 10px;"></div>
                </ul>


                <button @click="prevStep" class="btn btn-secondary">Wróć</button>
                <button @click="nextStep" class="btn btn-primary" :disabled="!isStepValid(2)">Następny krok</button>
            </div>
            <div v-else>
                <h2 class="stepTitle">Podsumowanie</h2>
                <p><strong>Tytuł gry:</strong> {{ game.title }}</p>
                <p><strong>Opis gry:</strong> {{ game.description }}</p>
                <p><strong>Strona Twojej gry:</strong> {{ game.urlAdress }}</p>
                <p><strong>Tryb gry:</strong> {{ game.mode.players }}</p>
                <p><strong>Kolejność etapów:</strong> {{ game.mode.line }}</p>
                <p><strong>Opis zadań:</strong></p>
                <ul>
                    <li v-for="(zadanie, index) in game.descriptionTask">
                        <h4>Zadanie {{ index + 1 }}.</h4>
                        <p> <b>Opis zadania: </b>{{ zadanie }}<br>
                        <p>Wybrany rodzaj zadania: {{ game.addons[index + 1] }}</p>
                        <!-- Powyżej sprawdzenie czy wyświetla prawidłowo opcję -->
                        <b>Maksymalna liczba punktów do zdobycia:</b> {{ game.howMuchPoint[index + 1] }} </p>


                    </li>
                </ul>
                <button @click="prevStep" class="btn btn-secondary">Wróć</button>
                <button type="submit" class="btn btn-primary">Utwórz grę</button>
            </div>
        </form>
    </div>
</template>
  
<script>
export default {
    data() {
        return {
            game: {
                id: 1,
                title: '',
                description: '',
                descriptionTask: [],
                quiz: {
                    questions: [],
                    answers: [],
                },
                urlAdress: '',
                active: 'true', //Czy gra ma być aktywna (dodać pole do wyboru!)
                addons: [],
                howMuchPoint: [],
                mode: {
                    players: '',
                    line: '',

                },

            },
            currentStep: 1,
            taskCount: 1,
            howMuchQuestions: 1,
            howMuchAnswers: 1,
            taskContents: [],
            addonsOptions: ['quiz', 'mission', 'findPlace'],
        };
    },
    methods: {
        createGame() {
            // this.id++;
            

                // Log the game data to the console
                console.log('Nowa gra:', this.game);

                // Pobierz istniejące gry z local storage lub zainicjuj pustą tablicę
                const existingGames = JSON.parse(localStorage.getItem('games')) || [];

                // Dodaj bieżącą grę do tablicy
                existingGames.push(this.game);
                // Zapisz zaktualizowaną tablicę z powrotem do local storage
                localStorage.setItem('games', JSON.stringify(existingGames));


            },
            nextStep() {
                if (this.currentStep < 3) {
                    this.currentStep++;
                }
            },
            prevStep() {
                if (this.currentStep > 1) {
                    this.currentStep--;
                }
            },
            handleImageUpload(event) {
                const file = event.target.files[0];
                if (file) {
                    this.game.image = file;
                }
            },
            NumbersOnly(evt) {
                evt = evt ? evt : window.event;
                var charCode = evt.which ? evt.which : evt.keyCode;
                if ((charCode > 31 && (charCode < 48 || charCode > 57)) && charCode !== 46) {
                    evt.preventDefault();
                } else {
                    return true;
                }
            },
            isStepValid(step) {
                if (step === 1) {
                    const requiredFields = ['title', 'description', 'urlAdress'];
                    return requiredFields.every(field => this.game[field]);
                }
                else if (step === 2) {
                    return this.game.descriptionTask.every(description => description.trim() !== '');
                }
                return false; // Domyślnie zezwól na przejście
            },

        },

    };
</script>
  
<style scoped>
.btn .btn-secondary .align-self-center {
    height: 30px;
}

.btn-group-toggle {
    display: flex;
    margin-bottom: 10px;


}

.btn-secondary input {
    display: none;
}



.qrCode {
    width: 200px;
    height: 200px;
}

.toDoList {
    list-style: none;
}

.form-group {
    margin-bottom: 10px;
}

.upload-container {
    border: 2px dashed #ccc;
    padding: 20px;
    text-align: center;
    cursor: pointer;
    position: relative;
    margin-top: 5px;
    margin-bottom: 5px;
}

.upload-container:hover {
    background-color: rgba(231, 235, 239, 0.682);
}

.input-file {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    opacity: 0;
}

.container {
    font-family: 'Montserrat', sans-serif;
}

.mt-4 {
    width: 100%;
    text-align: center;
    color: #12456e !important;
    font-family: 'Montserrat', sans-serif;
    font-weight: 900;
}

.stepTitle {
    width: 100%;
    text-align: center;
    text-transform: uppercase;
    color: #12456eae;
    font-family: 'Montserrat', sans-serif;
    font-weight: 300;
}
</style>
  


  