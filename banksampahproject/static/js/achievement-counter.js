$(document).ready(function () {
    var counted = false; // Hanya jalankan sekali saat pertama kali terlihat

    $(window).scroll(function () {
        var oTop = $('#achievement').offset().top - window.innerHeight;
        if (!counted && $(window).scrollTop() > oTop) {
            $('.achievement-number').each(function () {
                var $this = $(this),
                    countTo = $this.text();
                $({ countNum: 0 }).animate(
                    { countNum: countTo },
                    {
                        duration: 2000,
                        easing: 'swing',
                        step: function () {
                            $this.text(Math.floor(this.countNum));
                        },
                        complete: function () {
                            $this.text(this.countNum); // Agar angka final benar
                        }
                    }
                );
            });
            counted = true;
        }
    });
});
