// ================= SURVIVOR DATA =================

const survivors = {

    "RQ-1042": {
        location: "Sector 7 — Zone A",
        time: "21:43",
        food: "Required",
        medical: "Required",
        status: "TRAPPED"
    },

    "RQ-1098": {
        location: "Sector 4 — Zone B",
        time: "21:31",
        food: "Required",
        medical: "Stable",
        status: "NEEDS ASSISTANCE"
    },

    "RQ-1101": {
        location: "Sector 2 — Zone C",
        time: "20:58",
        food: "Provided",
        medical: "Stable",
        status: "RESCUED"
    }

};


// ================= PAGE NAVIGATION =================

function showPage(pageName) {

    document.querySelectorAll(".page").forEach(page => {
        page.classList.remove("active-page");
    });

    document.getElementById(pageName).classList.add("active-page");


    const titles = {
        dashboard: "Rescue Dashboard",
        survivors: "Survivor Database",
        band: "Band Simulator"
    };

    document.getElementById("page-title").textContent =
        titles[pageName];


    document.querySelectorAll(".nav-btn").forEach(button => {
        button.classList.remove("active");
    });

    event.target.classList.add("active");


    if (pageName === "survivors") {
        loadSurvivors();
    }
}


// ================= SURVIVOR MODAL =================

function openSurvivor(id) {

    const survivor = survivors[id];

    document.getElementById("modal-id").textContent = id;

    document.getElementById("modal-location").textContent =
        survivor.location;

    document.getElementById("modal-time").textContent =
        survivor.time;

    document.getElementById("modal-food").textContent =
        survivor.food;

    document.getElementById("modal-medical").textContent =
        survivor.medical;


    const status = document.getElementById("modal-status");

    status.textContent = survivor.status;

    status.className = "modal-status";


    if (survivor.status === "RESCUED") {

        status.classList.add("success");

    } else {

        status.classList.add("danger");

    }


    document.getElementById("survivor-modal")
        .classList.add("show");
}


function closeModal() {

    document.getElementById("survivor-modal")
        .classList.remove("show");
}


// ================= RESCUE ACTIONS =================

function assignTeam() {

    showToast(
        "🚑 Rescue Team Assigned",
        "Team Alpha-3 has been assigned to the survivor."
    );

}


function markRescued() {

    const id =
        document.getElementById("modal-id").textContent;

    survivors[id].status = "RESCUED";

    closeModal();

    showToast(
        "✅ Survivor Recovered",
        `${id} has been marked as successfully rescued.`
    );

}


// ================= BAND SIMULATION =================

function simulateEmergency() {

    survivors["RQ-1042"].status = "TRAPPED";

    showToast(
        "🚨 EMERGENCY ALERT",
        "RQ-1042 has triggered an emergency signal."
    );

    updateEmergencyCount(1);
}


function simulateFoodAlert() {

    survivors["RQ-1098"].food = "Required";

    showToast(
        "🍱 FOOD ALERT",
        "RQ-1098 requires food assistance."
    );

}


function simulateLocation() {

    showToast(
        "📍 LOCATION RECEIVED",
        "Location signal received from RQ-1042."
    );

}


function simulateSafe() {

    survivors["RQ-1042"].status = "SAFE";

    showToast(
        "🟢 STATUS UPDATE",
        "RQ-1042 has reported that they are safe."
    );

}


// ================= DASHBOARD =================

function updateEmergencyCount(amount) {

    const counter =
        document.getElementById("emergency-count");

    counter.textContent =
        parseInt(counter.textContent) + amount;
}


function refreshDashboard() {

    showToast(
        "↻ Dashboard Refreshed",
        "Latest ResQ Link signals have been checked."
    );

}


// ================= SURVIVOR LIST =================

function loadSurvivors() {

    const list =
        document.getElementById("survivor-list");

    list.innerHTML = "";


    Object.entries(survivors).forEach(([id, data]) => {

        const row = document.createElement("div");

        row.className = "survivor-row";

        row.innerHTML = `

            <div>

                <h3>${id}</h3>

                <p>
                    📍 ${data.location}
                    &nbsp; • &nbsp;
                    Last signal: ${data.time}
                </p>

            </div>

            <button
                class="secondary-btn"
                style="width:150px"
                onclick="openSurvivor('${id}')">

                View Profile

            </button>

        `;

        list.appendChild(row);

    });

}


// ================= NOTIFICATIONS =================

function showToast(title, message) {

    const toast =
        document.getElementById("toast");

    document.getElementById("toast-title")
        .textContent = title;

    document.getElementById("toast-message")
        .textContent = message;


    toast.classList.add("show");


    setTimeout(() => {

        toast.classList.remove("show");

    }, 3500);

}


// ================= CLOSE MODAL ON BACKGROUND CLICK =================

document.getElementById("survivor-modal")
    .addEventListener("click", function(event) {

        if (event.target === this) {
            closeModal();
        }

    });
