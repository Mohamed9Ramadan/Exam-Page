(function () {
        document.addEventListener("DOMContentLoaded", function () {
                let studentName = '';
                let questions = [];
                let currentQuestionIndex = 0;
                let markedQuestions = [];
                let userAnswers = {};
                const examDuration = 3 * 60;
                let timeLeft = examDuration;
                let timerInterval;

                const nameContainer = document.getElementById("name-container");
                const examContainer = document.getElementById("exam-container");
                const studentNameInput = document.getElementById("student-name-input");
                const nameError = document.getElementById("name-error");
                const startExamButton = document.getElementById("start-exam-button");
                const questionsContainer = document.getElementById("questions-container");
                const markedQuestionsContainer = document.getElementById("marked-questions-list");
                const progressBar = document.getElementById("progress");
                const questionNumberDisplay = document.getElementById("question-number-display");
                const timerDisplay = document.getElementById("timer-display");
                const notification = document.getElementById("notification");

                startExamButton.addEventListener("click", function () {
                        studentName = studentNameInput.value.trim();
                        if (validateName(studentName)) {
                                nameError.style.display = "none";
                                nameContainer.style.display = "none";
                                examContainer.style.display = "block";
                                sessionStorage.setItem("studentName", studentName);
                                startExam();
                        } else {
                                nameError.textContent = "Please enter a valid name.";
                                nameError.style.display = "block";
                        }
                });

                function validateName(name) {
                        const pattern = /^[a-zA-Z\s'-]+$/;
                        return pattern.test(name);
                }

                function startExam() {
                        questions = [
                                { id: 1, question: "GIS stands for ____.", options: ["geographic information systems", "geographic internal systems", "global information systems", "none of the above"], answer: "geographic information systems" },
                                { id: 2, question: "GIS captures and analyzes ____ data.", options: ["spatial", "geographic", "geographic and spatial", "none of the above"], answer: "geographic and spatial" },
                                { id: 3, question: "Among the following, which don't come under the components of GIS?", options: ["Hardware", "Software", "Compiler", "Data"], answer: "Compiler" },
                                { id: 4, question: "Which type of geodatabase can have multiple editors but only if they work on different parts of the data?", options: ["File geodatabase", "Personal geodatabase", "Enterprise database", "Microsoft database"], answer: "Enterprise geodatabase" },
                                { id: 5, question: "What are the three type groups of vector data?", options: ["Points, lines, and imagery", "Points, lines, and polygons", "Points, polygons, and imagery", "Points, lines, polygons, and imagery"], answer: "Points, lines, and polygons" },
                        ];

                        questions.sort(() => Math.random() - 0.5);
                        questions.forEach(q => q.options.sort(() => Math.random() - 0.5));

                        currentQuestionIndex = parseInt(sessionStorage.getItem("currentQuestionIndex")) || 0;
                        markedQuestions = questions.filter(q => (JSON.parse(sessionStorage.getItem("markedQuestions")) || []).includes(q.id));
                        userAnswers = JSON.parse(sessionStorage.getItem("userAnswers")) || {};
                        timeLeft = parseInt(sessionStorage.getItem("timeLeft")) || examDuration;

                        displayQuestion(currentQuestionIndex);
                        updateMarkedQuestions();
                        startTimer();
                }

                function displayQuestion(index) {
                        questionsContainer.innerHTML = "";
                        const q = questions[index];
                        const questionDiv = document.createElement("div");
                        questionDiv.classList.add("question");

                        questionNumberDisplay.textContent = `Question ${index + 1} of ${questions.length}`;

                        const questionText = document.createElement("p");
                        questionText.textContent = q.question;
                        questionDiv.appendChild(questionText);

                        q.options.forEach((option, optionIndex) => {
                                const optionLabel = document.createElement("label");
                                optionLabel.setAttribute("for", `question-${q.id}-option-${optionIndex}`);
                                optionLabel.classList.add("option-label");

                                const optionInput = document.createElement("input");
                                optionInput.type = "radio";
                                optionInput.name = `question-${q.id}`;
                                optionInput.id = `question-${q.id}-option-${optionIndex}`;
                                optionInput.value = option;

                                if (userAnswers[q.id] === option) {
                                        optionInput.checked = true;
                                }

                                optionInput.addEventListener("change", () => {
                                        userAnswers[q.id] = option;
                                        sessionStorage.setItem("userAnswers", JSON.stringify(userAnswers));
                                });

                                const optionSpan = document.createElement("span");
                                optionSpan.textContent = option;

                                optionLabel.appendChild(optionInput);
                                optionLabel.appendChild(optionSpan);
                                questionDiv.appendChild(optionLabel);
                        });

                        questionsContainer.appendChild(questionDiv);
                        updateMarkButton();
                        updateNavigationButtons();

                        sessionStorage.setItem("currentQuestionIndex", currentQuestionIndex);
                }

                function updateMarkedQuestions() {
                        markedQuestionsContainer.innerHTML = "";
                        markedQuestions.forEach((q) => {
                                const listItem = document.createElement("li");
                                listItem.textContent = `Question ${questions.indexOf(q) + 1}: ${q.question}`;
                                listItem.classList.add("marked-question-item");
                                listItem.addEventListener("click", () => {
                                        currentQuestionIndex = questions.indexOf(q);
                                        displayQuestion(currentQuestionIndex);
                                });
                                markedQuestionsContainer.appendChild(listItem);
                        });
                        sessionStorage.setItem("markedQuestions", JSON.stringify(markedQuestions.map(q => q.id)));
                }

                function updateMarkButton() {
                        const markButton = document.getElementById("mark-button");
                        const markedQuestion = questions[currentQuestionIndex];
                        if (markedQuestions.includes(markedQuestion)) {
                                markButton.textContent = "Unmark Question";
                        } else {
                                markButton.textContent = "Mark Question";
                        }
                }

                function updateNavigationButtons() {
                        const nextButton = document.getElementById("next-button");
                        const prevButton = document.getElementById("previous-button");

                        prevButton.disabled = currentQuestionIndex === 0;
                        nextButton.disabled = currentQuestionIndex === questions.length - 1;
                }

                function startTimer() {
                        timerInterval = setInterval(() => {
                                const minutes = Math.floor(timeLeft / 60);
                                const seconds = timeLeft % 60;
                                timerDisplay.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;

                                const progressPercentage = (timeLeft / examDuration) * 100;
                                progressBar.style.width = `${progressPercentage}%`;

                                sessionStorage.setItem("timeLeft", timeLeft);

                                if (timeLeft <= 0) {
                                        clearInterval(timerInterval);
                                        showNotification("Time's up!");
                                        setTimeout(() => {
                                                location.href = `Time End.html`;
                                        }, 2000);
                                }
                                timeLeft--;
                        }, 1000);
                }

                document.getElementById("next-button").addEventListener("click", () => {
                        if (currentQuestionIndex < questions.length - 1) {
                                currentQuestionIndex++;
                                displayQuestion(currentQuestionIndex);
                        }
                });

                document.getElementById("previous-button").addEventListener("click", () => {
                        if (currentQuestionIndex > 0) {
                                currentQuestionIndex--;
                                displayQuestion(currentQuestionIndex);
                        }
                });

                document.getElementById("mark-button").addEventListener("click", () => {
                        const markedQuestion = questions[currentQuestionIndex];
                        const index = markedQuestions.indexOf(markedQuestion);
                        if (index === -1) {
                                markedQuestions.push(markedQuestion);
                                showNotification("Question marked!");
                        } else {
                                markedQuestions.splice(index, 1);
                                showNotification("Question unmarked!");
                        }
                        updateMarkedQuestions();
                        updateMarkButton();
                });

                document.getElementById("submit-button").addEventListener("click", () => {
                        const confirmSubmit = confirm("Are you sure you want to submit the exam?");
                        if (confirmSubmit) {
                                clearInterval(timerInterval);
                                submitExam();
                        }
                });

                function submitExam() {
                        let correctAnswers = 0;
                        questions.forEach(q => {
                                if (userAnswers[q.id] === q.answer) {
                                        correctAnswers++;
                                }
                        });
                        const score = Math.round((correctAnswers / questions.length) * 100);
                        sessionStorage.setItem("score", score);
                        sessionStorage.setItem("studentName", studentName);
                        showNotification("Exam submitted successfully!");
                        setTimeout(() => {
                                location.href = `Grade.html`;
                        }, 2000);
                }

                function showNotification(message) {
                        notification.textContent = message;
                        notification.style.display = 'block';
                        setTimeout(() => {
                                notification.style.display = 'none';
                        }, 3000);
                }
        });
})();