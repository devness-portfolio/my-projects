document.addEventListener("DOMContentLoaded", function () {
  // Mobile Navigation Toggle
  const navToggle = document.querySelector(".nav-toggle");
  const mainNavUl = document.querySelector(".main-nav ul");
  const body = document.body;

  if (navToggle && mainNavUl) {
    navToggle.addEventListener("click", () => {
      mainNavUl.classList.toggle("nav-active");
      body.classList.toggle("nav-open"); // For styling hamburger icon to 'X'
    });
  }

  // Set current year in footer
  const currentYearSpan = document.getElementById("current-year");
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // Fetch and display prayer times (Home Page Specific)
  if (document.getElementById("prayer-times-content")) {
    fetchPrayerTimes();
  }
});

async function fetchPrayerTimes() {
  const prayerTimesContent = document.getElementById("prayer-times-content");
  const lastUpdatedP = document.getElementById("last-updated");
  const city = "New Orleans";
  const country = "USA";
  const method = 2; // ISNA method

  // Get today's date in YYYY-MM-DD format for the API if needed, or just use current timings
  // const today = new Date();
  // const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
  // For daily timings, the API usually doesn't require the date string for current day, but for specific date it is /v1/timings/{date}

  const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${encodeURIComponent(
    city
  )}&country=${encodeURIComponent(country)}&method=${method}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();

    if (data.code === 200 && data.data && data.data.timings) {
      const timings = data.data.timings;
      const prayerTimes = {
        Fajr: timings.Fajr,
        Dhuhr: timings.Dhuhr,
        Asr: timings.Asr,
        Maghrib: timings.Maghrib,
        Isha: timings.Isha,
        Sunrise: timings.Sunrise, // Optional: some like to display sunrise
        // Midnight: timings.Midnight // Optional
      };

      prayerTimesContent.innerHTML = ""; // Clear loading message

      for (const prayer in prayerTimes) {
        if (prayerTimes.hasOwnProperty(prayer)) {
          const timeItem = document.createElement("div");
          timeItem.classList.add("prayer-time-item");

          const prayerName = document.createElement("h3");
          prayerName.textContent = prayer;

          const prayerTime = document.createElement("p");
          prayerTime.textContent = formatTime(prayerTimes[prayer]);

          timeItem.appendChild(prayerName);
          timeItem.appendChild(prayerTime);
          prayerTimesContent.appendChild(timeItem);
        }
      }
      if (lastUpdatedP) {
        lastUpdatedP.textContent = `Last updated: ${new Date().toLocaleTimeString()} on ${
          data.data.date.readable
        }`;
      }
    } else {
      prayerTimesContent.innerHTML =
        "<p>Could not retrieve prayer times. Please try again later.</p>";
      console.error("Error in API data structure:", data);
    }
  } catch (error) {
    prayerTimesContent.innerHTML =
      "<p>Failed to load prayer times. Please check your internet connection or try again later.</p>";
    console.error("Error fetching prayer times:", error);
    if (lastUpdatedP) {
      lastUpdatedP.textContent = "Failed to update prayer times.";
    }
  }
}

function formatTime(time24) {
  if (!time24) return "N/A";
  const [hours, minutes] = time24.split(":");
  const h = parseInt(hours, 10);
  const m = parseInt(minutes, 10);

  const ampm = h >= 12 ? "PM" : "AM";
  const h12 = h % 12 || 12; // Convert 0 or 12 to 12 for 12-hour format

  return `${String(h12).padStart(2, "0")}:${String(m).padStart(
    2,
    "0"
  )} ${ampm}`;
}
