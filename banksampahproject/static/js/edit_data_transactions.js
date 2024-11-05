// Function to load report data into the form for editing
function loadReportData(id) {
    fetch(`/bank_sampah_report/${id}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById("report-id").value = data.id;
            document.getElementById("nama_bank_sampah").value = data.nama_bank_sampah;
            document.getElementById("desa_kelurahan").value = data.desa_kelurahan;
            document.getElementById("rt").value = data.rt;
            document.getElementById("rw").value = data.rw;
            document.getElementById("nama_pengepul").value = data.nama_pengepul;
            document.getElementById("total_harga_pembelian").value = data.total_harga_pembelian;
            document.getElementById("total_berat_pembelian").value = data.total_berat_pembelian;
            document.getElementById("total_harga_penjualan").value = data.total_harga_penjualan;
            document.getElementById("total_berat_penjualan").value = data.total_berat_penjualan;
            document.getElementById("tanggal_pendataan").value = data.tanggal_pendataan;
        })
        .catch(error => console.error("Error loading data:", error));
}

// Function to update the report data
function updateReport() {
    const id = document.getElementById("report-id").value;
    const updatedData = {
        nama_bank_sampah: document.getElementById("nama_bank_sampah").value,
        desa_kelurahan: document.getElementById("desa_kelurahan").value,
        rt: document.getElementById("rt").value,
        rw: document.getElementById("rw").value,
        nama_pengepul: document.getElementById("nama_pengepul").value,
        total_harga_pembelian: parseFloat(document.getElementById("total_harga_pembelian").value),
        total_berat_pembelian: parseFloat(document.getElementById("total_berat_pembelian").value),
        total_harga_penjualan: parseFloat(document.getElementById("total_harga_penjualan").value),
        total_berat_penjualan: parseFloat(document.getElementById("total_berat_penjualan").value),
        tanggal_pendataan: document.getElementById("tanggal_pendataan").value
    };

    fetch(`/bank_sampah_report/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedData)
    })
    .then(response => {
        if (response.ok) {
            alert("Data updated successfully!");
            window.location.href = "{% url 'transaction' %}";
        } else {
            response.json().then(data => alert(`Error: ${data.detail}`));
        }
    })
    .catch(error => console.error("Error updating data:", error));
}

// Call this function with the ID of the report you want to edit
// Example: loadReportData(1);
