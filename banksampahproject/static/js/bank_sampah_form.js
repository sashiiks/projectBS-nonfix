async function submitForm() {
    const form = document.getElementById('bankSampahForm');
    const notification = document.getElementById('notification');
    const data = {
        desa_kelurahan: form.desa_kelurahan.value,
        nama_bank_sampah: form.nama_bank_sampah.value,
        rt: form.rt.value || null,
        rw: form.rw.value || null,
        jumlah_nasabah: parseInt(form.jumlah_nasabah.value),
        nasabah_aktif: parseInt(form.nasabah_aktif.value),
        pembelian_kg: parseFloat(form.penerimaan_nasabah.value),
        jumlah_pembelian_rp: parseFloat(form.pemberian_sampah_nasabah.value),
        penjualan_kg: parseFloat(form.penjualan_sampah.value),
        jumlah_penjualan_rp: parseFloat(form.hasil_penjualan_sampah.value),
        nama_pengepul: form.nama_penginput.value,
        tanggal: form.tanggal_pendirian.value,
    };

    try {
        const response = await fetch('/bank_sampah_report/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-CSRFToken': form.querySelector('input[name="csrfmiddlewaretoken"]').value
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (response.ok) {
            notification.style.display = 'block';
            notification.className = 'alert alert-success';
            notification.textContent = 'Data berhasil disimpan!';
            form.reset(); // Reset the form after successful submission
        } else {
            throw new Error(result.detail || 'Error submitting data');
        }
    } catch (error) {
        notification.style.display = 'block';
        notification.className = 'alert alert-danger';
        notification.textContent = `Error: ${error.message}`;
    }
}
