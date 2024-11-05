// Function to load data into the form for editing
function loadRegistrationData(id) {
    fetch(`/bank_sampah_registration/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("registration-id").value = data.id;
            document.getElementById("nama_bank_sampah").value = data.nama_bank_sampah;
            document.getElementById("desa_kelurahan").value = data.desa_kelurahan;
            document.getElementById("rt").value = data.rt;
            document.getElementById("rw").value = data.rw;
            document.getElementById("tanggal_pendaftaran").value = data.tanggal_pendaftaran;
            document.getElementById("nama_pengepul").value = data.nama_pengepul;
        })
        .catch(error => console.error("Error loading data:", error));
}

// Function to update the registration data
function updateRegistration() {
    const id = document.getElementById("registration-id").value;
    const updatedData = {
        nama_bank_sampah: document.getElementById("nama_bank_sampah").value,
        desa_kelurahan: document.getElementById("desa_kelurahan").value,
        rt: document.getElementById("rt").value,
        rw: document.getElementById("rw").value,
        tanggal_pendaftaran: document.getElementById("tanggal_pendaftaran").value,
        nama_pengepul: document.getElementById("nama_pengepul").value
    };

    fetch(`/bank_sampah_registration/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (response.ok) {
            alert("Data updated successfully!");
            window.location.href = "{% url 'mitrabs' %}";
        } else {
            response.json().then(data => alert(`Error: ${data.detail}`));
        }
    })
    .catch(error => console.error("Error updating data:", error));
}

// Call this function with the ID of the registration you want to edit
// Example: loadRegistrationData(1);
