// DeepCopy Function
function deepcopy(obj) {
  // Handle null or primitive values
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  // Handle arrays
  if (Array.isArray(obj)) {
    return obj.map((item) => deepcopy(item));
  }

  // Handle objects
  const result = {};
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      result[key] = deepcopy(obj[key]);
    }
  }

  return result;
}

// Generate particles
function createParticles() {
  const particlesContainer = document.getElementById("particles");
  for (let i = 0; i < 50; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.left = Math.random() * 100 + "%";
    particle.style.animationDelay = Math.random() * 6 + "s";
    particle.style.animationDuration = Math.random() * 3 + 3 + "s";
    particlesContainer.appendChild(particle);
  }
}

// Perform deep copy operation
function performDeepCopy() {
  const input = document.getElementById("objectInput").value;
  const outputDisplay = document.getElementById("outputDisplay");
  const copyBtn = document.getElementById("copyBtnText");

  try {
    // Show loading
    copyBtn.innerHTML = '<span class="loading"></span> Processing...';

    // Parse input
    const inputObj = JSON.parse(input);

    // Measure performance
    const startTime = performance.now();
    const copiedObj = deepcopy(inputObj);
    const endTime = performance.now();

    // Verify deep copy
    const isDeepCopy = verifyDeepCopy(inputObj, copiedObj);

    // Update output
    outputDisplay.className = "output-display";
    outputDisplay.innerHTML = `<span class="success-check">✓</span> Deep copy successful!\n\n${JSON.stringify(
      copiedObj,
      null,
      2
    )}`;

    // Update stats
    updateStats(inputObj, copiedObj, endTime - startTime, isDeepCopy);

    // Visualize objects
    visualizeObjects(inputObj, copiedObj);

    // Update button
    copyBtn.innerHTML =
      '<span class="success-check">✓</span> DeepCopy Complete!';
    setTimeout(() => {
      copyBtn.textContent = "Execute DeepCopy";
    }, 2000);
  } catch (error) {
    outputDisplay.className = "output-display error";
    outputDisplay.innerHTML = `<span style="color: var(--error-color);">✗ Error:</span> ${error.message}`;
    copyBtn.textContent = "Execute DeepCopy";
  }
}

// Verify deep copy integrity
function verifyDeepCopy(original, copy) {
  if (original === copy) return false;

  function deepEqual(obj1, obj2) {
    if (obj1 === obj2) return true;
    if (obj1 == null || obj2 == null) return false;
    if (typeof obj1 !== typeof obj2) return false;

    if (typeof obj1 === "object") {
      if (Array.isArray(obj1) !== Array.isArray(obj2)) return false;

      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) return false;

      for (let key of keys1) {
        if (!keys2.includes(key)) return false;
        if (!deepEqual(obj1[key], obj2[key])) return false;
      }
    }

    return true;
  }

  return deepEqual(original, copy);
}

// Update statistics
function updateStats(original, copy, copyTime, isDeepCopy) {
  document.getElementById("objectSize").textContent = JSON.stringify(
    original
  ).length;
  document.getElementById("copyTime").textContent = copyTime.toFixed(2);
  document.getElementById("nestedLevels").textContent = getNestedLevels(
    original
  );
  document.getElementById("isDeepCopy").textContent = isDeepCopy ? "✓" : "✗";
  document.getElementById("isDeepCopy").style.color = isDeepCopy
    ? "var(--success-color)"
    : "var(--error-color)";
}

// Get nested levels
function getNestedLevels(obj, level = 0) {
  let maxLevel = level;
  if (typeof obj === "object" && obj !== null) {
    for (let key in obj) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        maxLevel = Math.max(maxLevel, getNestedLevels(obj[key], level + 1));
      }
    }
  }
  return maxLevel;
}

// Visualize objects
function visualizeObjects(original, copy) {
  const visualizer = document.getElementById("objectVisualizer");
  visualizer.innerHTML = `
                <div class="object-node original">
                    <div class="node-header">
                        <span class="node-type">Original Object</span>
                        <span class="node-reference">Ref: ${getObjectRef(
                          original
                        )}</span>
                    </div>
                    <div class="node-content">${formatObjectPreview(
                      original
                    )}</div>
                </div>
                <div style="text-align: center; margin: 1rem 0; color: var(--primary-color);">
                    ↓ DeepCopy Applied ↓
                </div>
                <div class="object-node copy">
                    <div class="node-header">
                        <span class="node-type">Deep Copy</span>
                        <span class="node-reference">Ref: ${getObjectRef(
                          copy
                        )}</span>
                    </div>
                    <div class="node-content">${formatObjectPreview(copy)}</div>
                </div>
            `;
}

// Get object reference (simulated)
function getObjectRef(obj) {
  return "0x" + Math.random().toString(16).slice(2, 8).toUpperCase();
}

// Format object preview
function formatObjectPreview(obj) {
  const preview = JSON.stringify(obj, null, 2);
  return preview.length > 200 ? preview.slice(0, 200) + "..." : preview;
}

// Load example
function loadExample() {
  const example = {
    company: "TechCorp AI",
    founded: 2024,
    employees: [
      {
        name: "Alice Johnson",
        role: "AI Engineer",
        skills: ["Python", "TensorFlow", "PyTorch"]
      },
      {
        name: "Bob Smith",
        role: "Full Stack Developer",
        skills: ["JavaScript", "React", "Node.js"]
      },
      {
        name: "Carol White",
        role: "DevOps Engineer",
        skills: ["Docker", "Kubernetes", "AWS"]
      }
    ],
    headquarters: {
      city: "San Francisco",
      state: "CA",
      coordinates: { lat: 37.7749, lng: -122.4194 }
    },
    projects: {
      active: 12,
      completed: 48,
      success_rate: 96.5
    },
    metadata: {
      last_updated: "2024-01-03T10:30:00Z",
      version: "2.0.0",
      tags: ["innovation", "ai", "blockchain", "cloud-native"]
    }
  };

  document.getElementById("objectInput").value = JSON.stringify(
    example,
    null,
    2
  );
}

// Clear all
function clearAll() {
  document.getElementById("objectInput").value = "";
  document.getElementById("outputDisplay").innerHTML =
    'Click "Execute DeepCopy" to clone your object...';
  document.getElementById("outputDisplay").className = "output-display";
  document.getElementById("objectVisualizer").innerHTML =
    '<p style="color: var(--text-secondary); text-align: center; margin-top: 2rem;">Visual representation will appear here after deep copy...</p>';

  // Reset stats
  document.getElementById("objectSize").textContent = "0";
  document.getElementById("copyTime").textContent = "0";
  document.getElementById("nestedLevels").textContent = "0";
  document.getElementById("isDeepCopy").textContent = "✗";
  document.getElementById("isDeepCopy").style.color = "var(--text-primary)";
}

// Initialize
document.addEventListener("DOMContentLoaded", function () {
  createParticles();

  // Add keyboard shortcut
  document.addEventListener("keydown", function (e) {
    if (e.ctrlKey && e.key === "Enter") {
      performDeepCopy();
    }
  });
});
