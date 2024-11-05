// JavaScript to fetch data and manage actions for Bank Sampah Registration

// Function to fetch data from API and populate the table
async function fetchRegistrationData() {
    try {
        const response = await fetch("/bank_sampah_registration/");  // Adjust this URL based on the actual endpoint for listing all registrations
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        
        const tableBody = document.getElementById("data-registration-table");
        tableBody.innerHTML = ""; // Clear any existing rows

        data.forEach((registration) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${registration.id}</td>
                <td>${registration.nama_bank_sampah}</td>
                <td>${registration.desa_kelurahan}</td>
                <td>${registration.rt || "-"}</td>
                <td>${registration.rw || "-"}</td>
                <td>${registration.tanggal_pendaftaran}</td>
                <td>${registration.nama_pengepul}</td>
                <td>
                    <a href="#" class="btn btn-sm btn-primary" onclick="editData(${registration.id})">Edit</a>
                    <a href="#" class="btn btn-sm btn-danger" onclick="deleteData(${registration.id})">Delete</a>
                </td>
            `;
            tableBody.appendChild(row);
        });
    } catch (error) {
        console.error("Error fetching data:", error);
    }
}

// Function to edit data - replace this with actual edit logic if needed
function editData(registrationId) {
    alert(`Edit functionality for registration ID: ${registrationId} is not yet implemented.`);
}

// Function to delete data
async function deleteData(registrationId) {
    const confirmDelete = confirm("Are you sure you want to delete this data?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`/bank_sampah_registration/${registrationId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        });

        if (response.ok) {
            alert("Data deleted successfully");
            fetchRegistrationData(); // Refresh the table data
        } else {
            const result = await response.json();
            alert(result.detail || "Failed to delete data");
        }
    } catch (error) {
        console.error("Error deleting data:", error);
    }
}

// Fetch and populate data when the page loads
document.addEventListener("DOMContentLoaded", fetchRegistrationData);
