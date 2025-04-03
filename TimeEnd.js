document.addEventListener("DOMContentLoaded", function () {
        const studentName = sessionStorage.getItem("studentName") || "Student";

        console.log("Retrieved Student Name:", studentName);

        document.getElementById('student-name').textContent = studentName;

        sessionStorage.clear();
});