document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const usernameInput = document.getElementById("username");
  const themeSelect = document.getElementById("theme");
  const speedSelect = document.getElementById("animation-speed");
  const savePrefsBtn = document.getElementById("save-prefs");
  const animateBtn = document.getElementById("animate-btn");
  const resetBtn = document.getElementById("reset-btn");
  const animatedBox = document.getElementById("animated-box");
  const body = document.body;

  // Load saved preferences
  loadPreferences();

  // Save preferences to localStorage
  savePrefsBtn.addEventListener("click", function () {
    const preferences = {
      username: usernameInput.value,
      theme: themeSelect.value,
      animationSpeed: speedSelect.value,
    };

    localStorage.setItem("userPreferences", JSON.stringify(preferences));
    applyPreferences(preferences);

    // Show feedback animation
    this.textContent = "Saved!";
    this.style.backgroundColor = "#2ecc71";
    setTimeout(() => {
      this.textContent = "Save Preferences";
      this.style.backgroundColor = "#4CAF50";
    }, 1000);
  });

  // Trigger animation
  animateBtn.addEventListener("click", function () {
    // Clear any existing animations
    animatedBox.style.animation = "none";
    void animatedBox.offsetWidth; // Trigger reflow

    // Get current animation speed
    const speed = speedSelect.value;
    const speedClass = `${speed}-animation`;

    // Apply animation
    animatedBox.classList.add(speedClass);
    animatedBox.style.animation =
      "bounce 2s infinite, spin 4s infinite, color-change 6s infinite";

    // Disable button during animation
    this.disabled = true;
    setTimeout(() => {
      this.disabled = false;
    }, 2000);
  });

  // Reset animation
  resetBtn.addEventListener("click", function () {
    animatedBox.style.animation = "none";
    animatedBox.classList.remove(
      "slow-animation",
      "normal-animation",
      "fast-animation"
    );
  });

  // Load preferences from localStorage
  function loadPreferences() {
    const savedPrefs = localStorage.getItem("userPreferences");
    if (savedPrefs) {
      const preferences = JSON.parse(savedPrefs);

      // Update form fields
      usernameInput.value = preferences.username || "";
      themeSelect.value = preferences.theme || "light";
      speedSelect.value = preferences.animationSpeed || "normal";

      // Apply preferences
      applyPreferences(preferences);
    }
  }

  // Apply preferences to the page
  function applyPreferences(preferences) {
    // Apply theme
    body.className = ""; // Clear existing theme classes
    body.classList.add(`${preferences.theme}-theme`);

    // Apply animation speed (will take effect on next animation)
    // No need to do anything here as it's handled when triggering animation
  }

  // Additional animation effect for page load
  setTimeout(() => {
    body.style.opacity = "1";
  }, 100);
});

// Initial page styling for fade-in effect
document.body.style.opacity = "0";
document.body.style.transition = "opacity 0.5s ease";
