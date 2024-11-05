// JavaScript to fetch data from API and populate transaction details

// Function to fetch data from API and populate the table and total statistics
async function fetchTransactionData() {
    try {
        const response = await fetch("/bank_sampah_report/"); // Update this with the correct endpoint for retrieving all reports
        if (!response.ok) {
            throw new Error("Failed to fetch transaction data");
        }
        
        const data = await response.json();
        const tableBody = document.getElementById("data-transactions-table");
        tableBody.innerHTML = ""; // Clear existing rows

        let totalCount = 0;
        let totalHargaPenjualan = 0;
        let totalBeratPenjualan = 0;

        data.forEach((report) => {
            totalCount += 1;
            totalHargaPenjualan += report.jumlah_penjualan_rp || 0;
            totalBeratPenjualan += report.penjualan_kg || 0;

            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${report.id}</td>
                <td>${report.nama_bank_sampah}</td>
                <td>${report.desa_kelurahan}</td>
                <td>${report.rt || "-"}</td>
                <td>${report.rw || "-"}</td>
                <td>${report.nama_pengepul || "-"}</td>
                <td>${report.jumlah_pembelian_rp}</td>
                <td>${report.pembelian_kg}</td>
                <td>${report.jumlah_penjualan_rp}</td>
                <td>${report.penjualan_kg}</td>
                <td>${report.tanggal}</td>
                <td>
                    <a href="/bank_sampah_report/edit/${report.id}" class="btn btn-sm btn-primary">Edit</a>
                </td>
            `;
            tableBody.appendChild(row);
        });

        // Update total values in the overview cards
        document.getElementById("total-count").innerText = totalCount;
        document.getElementById("total-harga-penjualan").innerText = `Rp ${totalHargaPenjualan.toLocaleString()}`;
        document.getElementById("total-berat-penjualan").innerText = `${totalBeratPenjualan.toLocaleString()} kg`;

    } catch (error) {
        console.error("Error fetching transaction data:", error);
    }
}

// Fetch and populate data when the page loads
document.addEventListener("DOMContentLoaded", fetchTransactionData);
