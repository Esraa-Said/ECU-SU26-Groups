// 1. Inputs
const studentName = "Nour El-Din";
const attendancePercentage = 85; // نسبة الحضور %
const midtermScore = 25; // من 30
const finalExamScore = 40; // من 50
const assignmentScore = 18; // من 20
const isTuitionPaid = true;

// 2. Logic
if (!isTuitionPaid) {
    console.log(`Error: Results locked for ${studentName}. Please complete tuition payment.`);
} else if (attendancePercentage < 75) {
    console.log(`Status: FAILED (Reason: Attendance below required threshold of 75%).`);
} else {
    // حساب المجموع الكلي (من 100)
    const totalScore = midtermScore + finalExamScore + assignmentScore;
    let letterGrade = "";

    // تحديد التقدير
    if (totalScore >= 90) {
        letterGrade = "A";
    } else if (totalScore >= 80) {
        letterGrade = "B";
    } else if (totalScore >= 70) {
        letterGrade = "C";
    } else if (totalScore >= 60) {
        letterGrade = "D";
    } else {
        letterGrade = "F";
    }

    // 3. Output
    console.log(`Student Name: ${studentName}`);
    console.log(`Attendance: ${attendancePercentage}%`);
    console.log(`Total Score: ${totalScore}/100`);
    console.log(`Grade: ${letterGrade}`);
    console.log(`Academic Status: ${totalScore >= 60 ? "PASSED" : "FAILED"}`);

    // شرط البونص: منحة تفوق
    if (totalScore >= 90) {
        console.log("Scholarship Eligibility: Congratulations! You are eligible for a merit scholarship.");
    }
}