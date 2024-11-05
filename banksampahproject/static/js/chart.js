document.addEventListener('DOMContentLoaded', function() {
    // Bar Chart for Jumlah Bank Sampah
    const barCtx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(barCtx, {
        type: 'bar',
        data: {
            labels: [
                'Ciwalen', 
                'Citaringgul', 
                'Haribinangun', 
                'Luwukmakmur', 
                'Nangka', 
                'Pasirsuren', 
                'Penyangsongan', 
                'Tutur'
            ],
            datasets: [{
                label: 'Jumlah Bank Sampah',
                data: [10, 15, 8, 25, 20, 12, 22, 30], // Sesuaikan data ini dengan data sebenarnya
                backgroundColor: 'rgba(75, 192, 192, 0.6)', // Warna yang lebih lembut
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5 // Mengatur skala agar lebih proporsional
                    }
                },
                x: {
                    ticks: {
                        autoSkip: false, // Menampilkan semua label
                        maxRotation: 0, // Agar label tidak miring
                        minRotation: 0
                    }
                }
            },
            plugins: {
                legend: {
                    display: false // Menghilangkan label legend di atas
                }
            }
        }
    });

    // Doughnut Chart for Jumlah Nasabah
    const doughnutCtx = document.getElementById('doughnutChart').getContext('2d');
    const doughnutChart = new Chart(doughnutCtx, {
        type: 'doughnut',
        data: {
            labels: ['Nasabah Organik', 'Nasabah Anorganik'],
            datasets: [{
                data: [400, 200], // Sesuaikan data ini sesuai kebutuhan
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
                borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 99, 132, 1)'],
                borderWidth: 2,
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom', // Menempatkan legenda di bawah chart
                }
            }
        }
    });
});