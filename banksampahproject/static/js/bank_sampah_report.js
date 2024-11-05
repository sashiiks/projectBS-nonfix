document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    setupFilters();
});

async function fetchData() {
    try {
        const responseReports = await fetch('/bank_sampah_report/');
        const reports = await responseReports.json();

        const responseRegistrations = await fetch('/bank_sampah_registration/');
        const registrations = await responseRegistrations.json();

        populateTables(reports);
        populateCharts(reports, registrations);
        populateDropdowns(registrations);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

function populateTables(reports) {
    const salesWeightTable = document.querySelector("#salesWeightTable tbody");
    const salesPriceTable = document.querySelector("#salesPriceTable tbody");
    
    salesWeightTable.innerHTML = '';
    salesPriceTable.innerHTML = '';
    
    reports.forEach(report => {
        const rowWeight = `
            <tr>
                <td>${report.nama_bank_sampah}</td>
                <td>${report.penjualan_kg}</td>
            </tr>`;
        salesWeightTable.insertAdjacentHTML('beforeend', rowWeight);

        const rowPrice = `
            <tr>
                <td>${report.nama_bank_sampah}</td>
                <td>Rp ${report.jumlah_penjualan_rp}</td>
            </tr>`;
        salesPriceTable.insertAdjacentHTML('beforeend', rowPrice);
    });
}

function populateCharts(reports, registrations) {
    const ctxBar = document.getElementById('barChart').getContext('2d');
    const ctxDoughnut = document.getElementById('doughnutChart').getContext('2d');

    // Data processing for charts
    const bankSampahCounts = registrations.length;
    const totalNasabah = reports.reduce((sum, report) => sum + report.jumlah_nasabah, 0);
    const nasabahAktif = reports.reduce((sum, report) => sum + report.nasabah_aktif, 0);

    // Bar Chart for Jumlah Bank Sampah Daerah Mitra
    new Chart(ctxBar, {
        type: 'bar',
        data: {
            labels: registrations.map(r => r.nama_bank_sampah),
            datasets: [{
                label: 'Jumlah Bank Sampah',
                data: registrations.map(() => 1), // Each registration is counted as one
                backgroundColor: '#4CAF50'
            }]
        },
        options: { responsive: true }
    });

    // Doughnut Chart for Jumlah Nasabah
    new Chart(ctxDoughnut, {
        type: 'doughnut',
        data: {
            labels: ['Nasabah Aktif', 'Nasabah Tidak Aktif'],
            datasets: [{
                data: [nasabahAktif, totalNasabah - nasabahAktif],
                backgroundColor: ['#FF6384', '#36A2EB']
            }]
        },
        options: { responsive: true }
    });
}

function populateDropdowns(registrations) {
    const daerahDropdown = document.getElementById("daerah");
    daerahDropdown.innerHTML = '<option value="All" selected>All</option>';
    registrations.forEach(reg => {
        const option = document.createElement("option");
        option.value = reg.desa_kelurahan;
        option.textContent = reg.desa_kelurahan;
        daerahDropdown.appendChild(option);
    });
}

function setupFilters() {
    document.getElementById("bulan").addEventListener("change", applyFilters);
    document.getElementById("tahun").addEventListener("change", applyFilters);
    document.getElementById("daerah").addEventListener("change", applyFilters);
}

function applyFilters() {
    // Filter logic goes here (can be implemented based on selected month, year, and area)
}
