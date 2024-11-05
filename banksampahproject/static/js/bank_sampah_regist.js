async function submitBankSampahForm() {
    const form = document.getElementById('bankSampahForm');
    const notification = document.getElementById('notification');
  
    // Ambil data dari form
    const data = {
      desa_kelurahan: form.desa_kelurahan.value,
      nama_bank_sampah: form.nama_bank_sampah.value,
      rt: form.rt.value || null,
      rw: form.rw.value || null,
      tanggal_pendaftaran: form.tanggal_pendaftaran.value,
      nama_pengepul: form.nama_pengepul.value,
    };
  
    try {
      const response = await fetch('/bank_sampah_registration/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (response.ok) {
        notification.className = 'alert alert-success';
        notification.innerText = 'Data berhasil disimpan!';
      } else {
        const result = await response.json();
        notification.className = 'alert alert-danger';
        notification.innerText = `Error: ${result.detail}`;
      }
    } catch (error) {
      notification.className = 'alert alert-danger';
      notification.innerText = `Error: ${error.message}`;
    }
  
    // Tampilkan notifikasi dan reset form jika berhasil
    notification.style.display = 'block';
    if (response.ok) form.reset();
  }
  