```javascript
const STORAGE_KEY = "smartCampusFeedback";

function getFeedback() {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        const feedback = data ? JSON.parse(data) : [];

        return Array.isArray(feedback) ? feedback : [];
    } catch (error) {
        console.error("Error reading feedback:", error);
        return [];
    }
}

function saveFeedback(feedbackList) {
    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(feedbackList)
    );
}

function updateDashboard() {
    const feedbackList = getFeedback();

    const totalElement = document.getElementById("totalFeedback");
    const averageElement = document.getElementById("averageRating");

    if (totalElement) {
        totalElement.textContent = feedbackList.length;
    }

    if (averageElement) {
        const totalRating = feedbackList.reduce(
            (sum, item) => sum + (Number(item.rating) || 0),
            0
        );

        const average = feedbackList.length
            ? totalRating / feedbackList.length
            : 0;

        averageElement.textContent = average.toFixed(1) + " ★";
    }

    console.log("Feedback loaded:", feedbackList.length);
}

window.SmartCampus = {
    getFeedback: getFeedback,
    saveFeedback: saveFeedback,
    updateDashboard: updateDashboard
};

document.addEventListener("DOMContentLoaded", function () {
    updateDashboard();
});

window.addEventListener("storage", function (event) {
    if (event.key === STORAGE_KEY) {
        updateDashboard();
    }
});
```
