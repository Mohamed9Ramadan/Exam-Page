document.addEventListener("DOMContentLoaded", function () {
        const studentName = sessionStorage.getItem("studentName") || "Student";
        const score = sessionStorage.getItem("score") || "0";

        document.getElementById('student-name').textContent = studentName;
        document.getElementById('student-score').textContent = score;

        sessionStorage.clear();
});