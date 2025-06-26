const reviews = [];

document.querySelector("form").addEventListener("submit", function(event) {
    event.preventDefault();

    const username = document.getElementById("username").value;
    const details = document.getElementById("scam-details").value;
    const category = document.getElementById("category").value;
    const rating = document.getElementById("rating").value;

    reviews.push({ username, details, category, rating });
    loadReviews();
    updateDashboard();
    document.querySelector("form").reset();
});

function loadReviews() {
    const categoryFilter = document.getElementById("category-filter").value;
    const reviewContainer = document.getElementById("review-container");
    reviewContainer.innerHTML = "";

    reviews.forEach(review => {
        if (categoryFilter === "All" || review.category === categoryFilter) {
            reviewContainer.innerHTML += `<div class="review">
                <h3>${review.username}</h3>
                <p>${review.details}</p>
                <p><strong>Category:</strong> ${review.category}</p>
                <p><strong>Severity:</strong> ${review.rating}</p>
            </div>`;
        }
    });
}

function updateDashboard() {
    document.getElementById("total-reports").textContent = reviews.length;

    const categories = reviews.map(r => r.category);
    const topCategory = mostFrequentCategory(categories);
    document.getElementById("top-category").textContent = topCategory;

    const avgRating = reviews.length ? (reviews.reduce((sum, r) => sum + parseInt(r.rating), 0) / reviews.length).toFixed(1) : "No data";
    document.getElementById("avg-rating").textContent = avgRating;

    const reportList = document.getElementById("report-list");
    reportList.innerHTML = "";
    reviews.slice(-5).reverse().forEach(report => {
        reportList.innerHTML += `<tr>
            <td>${report.username}</td>
            <td>${report.category}</td>
            <td>${report.rating}</td>
            <td>${report.details}</td>
        </tr>`;
    });
}

function mostFrequentCategory(arr) {
    const counts = arr.reduce((acc, cat) => {
        acc[cat] = (acc[cat] || 0) + 1;
        return acc;
    }, {});
    return Object.keys(counts).reduce((a, b) => counts[a] > counts[b] ? a : b);
}

// ⭐ Star Rating Interactivity
document.querySelectorAll(".star-rating span").forEach(star => {
    star.addEventListener("click", function () {
        const ratingValue = this.getAttribute("data-value");
        document.getElementById("rating").value = ratingValue;

        document.querySelectorAll(".star-rating span").forEach(s => {
            s.style.color = s.getAttribute("data-value") <= ratingValue ? "gold" : "#ccc";
        });
    });
});
