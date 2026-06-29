document.addEventListener('DOMContentLoaded', () => {
  const prayerTimesContainer = document.getElementById(
    'prayer-times-container'
  );

  // Function to format time (e.g., "13:05" to "1:05 PM")
  function formatTime(timeString) {
    if (!timeString) return 'N/A';
    const [hour, minute] = timeString.split(':');
    const hourInt = parseInt(hour, 10);
    const minuteInt = parseInt(minute, 10);
    const ampm = hourInt >= 12 ? 'PM' : 'AM';
    const formattedHour = hourInt % 12 === 0 ? 12 : hourInt % 12;
    return `${formattedHour}:${minuteInt.toString().padStart(2, '0')} ${ampm}`;
  }

  // Function to fetch and display prayer times
  async function fetchPrayerTimes() {
    // API Endpoint for New Orleans using Aladhan API (Method 2 = ISNA)
    // You can explore other methods if needed: https://aladhan.com/prayer-times-api#GetMethods
    const city = 'New Orleans';
    const country = 'USA';
    const method = 2; // ISNA (Islamic Society of North America)
    const apiUrl = `https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=${method}`;

    try {
      const response = await fetch(apiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();

      if (data.code === 200) {
        const timings = data.data.timings;
        // Select the prayers you want to display
        const prayers = {
          Fajr: timings.Fajr,
          Sunrise: timings.Sunrise, // Shuruq
          Dhuhr: timings.Dhuhr,
          Asr: timings.Asr,
          Maghrib: timings.Maghrib,
          Isha: timings.Isha,
        };

        // Clear loading state
        prayerTimesContainer.innerHTML = '';

        // Create and append prayer time elements
        for (const [name, time] of Object.entries(prayers)) {
          const prayerDiv = document.createElement('div');
          prayerDiv.className =
            'p-4 bg-green-50 rounded-lg shadow-sm border border-green-100'; // Added border

          const nameP = document.createElement('p');
          nameP.className = 'font-semibold text-green-800 text-sm sm:text-base';
          nameP.textContent = name;

          const timeP = document.createElement('p');
          timeP.className = 'text-lg font-bold text-green-600 mt-1';
          timeP.textContent = formatTime(time); // Format the time

          prayerDiv.appendChild(nameP);
          prayerDiv.appendChild(timeP);
          prayerTimesContainer.appendChild(prayerDiv);
        }
      } else {
        throw new Error('API returned non-200 status code.');
      }
    } catch (error) {
      console.error('Error fetching prayer times:', error);
      prayerTimesContainer.innerHTML = `<p class="text-red-600 col-span-full text-center">Could not load prayer times. Please try again later.</p>`;
    }
  }

  // Initial call to fetch prayer times if the container exists on the page
  if (prayerTimesContainer) {
    fetchPrayerTimes();
  } else {
    console.log('Prayer times container not found on this page.');
  }
});
