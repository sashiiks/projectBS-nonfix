function initMap() {
    var locations = [
        {lat: -6.200000, lng: 106.816666}, // Jakarta
        {lat: -7.250445, lng: 112.768845}, // Surabaya
        {lat: -6.914744, lng: 107.609810}  // Bandung
        // Tambah lokasi lain di sini
    ];

    var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 12,
        center: {lat: 33.5207, lng: -86.8025} // Koordinat pusat peta
    });

    locations.forEach(function(location) {
        new google.maps.Marker({
            position: location,
            map: map
        });
    });
}

// Panggil initMap saat halaman selesai dimuat
window.onload = initMap;
