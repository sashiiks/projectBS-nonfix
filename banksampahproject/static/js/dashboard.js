// Placeholder data for purchase chart
var purchaseCtx = document.getElementById('purchaseChart').getContext('2d');
var purchaseChart = new Chart(purchaseCtx, {
    type: 'line',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
            label: 'Jumlah Pembelian',
            data: [100, 200, 150, 300, 250, 400, 500, 450, 300, 350, 400, 600],
            borderColor: '#003399',
            fill: true,
            backgroundColor: 'rgba(0, 51, 153, 0.2)'
        }]
    },
    options: {
        responsive: true,
        plugins: {
            tooltip: {
                callbacks: {
                    label: function(context) {
                        return 'Pembelian: ' + context.raw;
                    }
                }
            }
        }
    }
});

// Placeholder data for customer chart
var customerCtx = document.getElementById('customerChart').getContext('2d');
var customerChart = new Chart(customerCtx, {
    type: 'bar',
    data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'],
        datasets: [{
            label: 'Jumlah Nasabah',
            data: [300, 350, 300, 400, 450, 500, 600, 650],
            backgroundColor: '#365E32',
            borderColor: '#003399',
            borderWidth: 1
        }]
    },
    options: {
        responsive: true,
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});