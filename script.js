document.addEventListener('DOMContentLoaded', () => {
    const nutMenu = document.getElementById('nut-menu');
    const menuMobile = document.getElementById('menu-mobile');
    
    if (nutMenu && menuMobile) {
        nutMenu.addEventListener('click', () => {
            menuMobile.classList.toggle('active');
        });
    }

    const nutDoiGiaoDien = document.getElementById('nut-doi-giao-dien');
    if (nutDoiGiaoDien) {
        nutDoiGiaoDien.addEventListener('click', () => {
            document.body.classList.toggle('dark');
        });
    }

    const cacNutLoc = document.querySelectorAll('.nut-loc');
    const cacTheDuAn = document.querySelectorAll('.project-card');
    const oTimKiem = document.getElementById('o-tim-kiem');
    const thongBaoKhongThay = document.getElementById('thong-bao-khong-thay');

    let danhMucDangChon = 'all';
    let tuKhoa = '';

    function locDuAn() {
        let dem = 0;
        cacTheDuAn.forEach(the => {
            const loai = the.getAttribute('data-phan-loai');
            const tieuDe = the.getAttribute('data-tieu-de').toLowerCase();

            const hopLoai = (danhMucDangChon === 'all' || loai === danhMucDangChon);
            const hopTuKhoa = tieuDe.includes(tuKhoa);

            if (hopLoai && hopTuKhoa) {
                the.style.display = 'block';
                dem++;
            } else {
                the.style.display = 'none';
            }
        });

        if (thongBaoKhongThay) {
            thongBaoKhongThay.classList.toggle('hidden', dem > 0);
        }
    }

    cacNutLoc.forEach(nut => {
        nut.addEventListener('click', () => {
            cacNutLoc.forEach(n => n.classList.remove('active'));
            nut.classList.add('active');
            danhMucDangChon = nut.getAttribute('data-loc');
            locDuAn();
        });
    });

    if (oTimKiem) {
        oTimKiem.addEventListener('input', (e) => {
            tuKhoa = e.target.value.toLowerCase().trim();
            locDuAn();
        });
    }

    const nhapNoiDung = document.getElementById('nhap-noi-dung');
    const demKyTu = document.getElementById('dem-ky-tu');

    if (nhapNoiDung && demKyTu) {
        nhapNoiDung.addEventListener('input', () => {
            demKyTu.textContent = `${nhapNoiDung.value.length}/300 ký tự`;
        });
    }
    const formLienHe = document.getElementById('form-lien-he');
    const nhapHoTen = document.getElementById('nhap-ho-ten');
    const nhapEmail = document.getElementById('nhap-email');
    const loiHoTen = document.getElementById('loi-ho-ten');
    const loiEmail = document.getElementById('loi-email');
    const loiNoiDung = document.getElementById('loi-noi-dung');
    const thongBaoThanhCong = document.getElementById('thong-bao-thanh-cong');

    if (formLienHe) {
        formLienHe.addEventListener('submit', (e) => {
            e.preventDefault();
            let hopLe = true;

            if (!nhapHoTen.value.trim()) {
                loiHoTen.textContent = 'Vui lòng nhập họ tên.';
                hopLe = false;
            } else {
                loiHoTen.textContent = '';
            }

            const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!regexEmail.test(nhapEmail.value.trim())) {
                loiEmail.textContent = 'Email không hợp lệ.';
                hopLe = false;
            } else {
                loiEmail.textContent = '';
            }

            if (nhapNoiDung.value.trim().length < 5) {
                loiNoiDung.textContent = 'Tin nhắn quá ngắn.';
                hopLe = false;
            } else {
                loiNoiDung.textContent = '';
            }

            if (hopLe) {
                thongBaoThanhCong.classList.remove('hidden');
                formLienHe.reset();
                demKyTu.textContent = '0/300 ký tự';
                setTimeout(() => thongBaoThanhCong.classList.add('hidden'), 4000);
            }
        });
    }

    const namHienTai = document.getElementById('nam-hien-tai');
    if (namHienTai) {
        namHienTai.textContent = new Date().getFullYear();
    }

});