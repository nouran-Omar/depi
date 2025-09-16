
        window.addEventListener('load', function() {
            setTimeout(() => {
                const loading = document.getElementById('loading');
                if (loading) {
                    loading.classList.add('hide');
                    console.log("✅ Loading hidden after 1.5s");
                }
            }, 1500);
            
            setTimeout(() => {
                const loading = document.getElementById('loading');
                if (loading) {
                    loading.classList.add('hide');
                    console.log("✅ Loading forced hidden after 5s");
                }
            }, 5000);
        });

        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'ease-in-out'
        });
        window.addEventListener('scroll', function() {
            const navbar = document.getElementById('mainNav');
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        flatpickr.localize(flatpickr.l10ns.ar);

        const checkInDate = flatpickr("#checkInDate", {
            minDate: "today",
            dateFormat: "Y-m-d",
            defaultDate: today,
            locale: "ar",
            onChange: function(selectedDates, dateStr, instance) {
                checkOutDate.set("minDate", new Date(selectedDates[0].getTime() + 86400000));
                if (checkOutDate.selectedDates[0] <= selectedDates[0]) {
                    const newCheckOut = new Date(selectedDates[0].getTime() + 86400000);
                    checkOutDate.setDate(newCheckOut);
                }
            }
        });

        const checkOutDate = flatpickr("#checkOutDate", {
            minDate: new Date(today.getTime() + 86400000),
            dateFormat: "Y-m-d",
            defaultDate: tomorrow,
            locale: "ar"
        });

        // معالجة نموذج البحث
        document.getElementById('searchForm').addEventListener('submit', function(e) {
            e.preventDefault();
            
            const destination = document.getElementById('destination').value;
            const checkIn = document.getElementById('checkInDate').value;
            const checkOut = document.getElementById('checkOutDate').value;
            const guests = document.getElementById('guests').value;
            
            if (!destination || guests === '0') {
                Swal.fire({
                    title: 'بيانات ناقصة',
                    text: 'يرجى ملء حقل الوجهة واختيار عدد الضيوف',
                    icon: 'warning',
                    confirmButtonColor: '#667eea'
                });
                return;
            }
            
            Swal.fire({
                title: 'جاري البحث...',
                text: `يتم البحث عن أماكن الإقامة في ${destination}`,
                icon: 'info',
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                background: '#fff',
                backdrop: 'rgba(102, 126, 234, 0.4)'
            }).then(() => {
                Swal.fire({
                    title: 'تم العثور على نتائج!',
                    html: `
                        <div style="text-align: right; direction: rtl;">
                            <p><strong>الوجهة:</strong> ${destination}</p>
                            <p><strong>تاريخ الوصول:</strong> ${checkIn || 'غير محدد'}</p>
                            <p><strong>تاريخ المغادرة:</strong> ${checkOut || 'غير محدد'}</p>
                            <p><strong>عدد الضيوف:</strong> ${guests} أشخاص</p>
                            <hr>
                            <p class="mt-3">وجدنا 127 خيار إقامة يناسب معايير البحث الخاصة بك</p>
                        </div>
                    `,
                    icon: 'success',
                    confirmButtonText: 'عرض النتائج',
                    cancelButtonText: 'تعديل البحث',
                    showCancelButton: true,
                    background: '#fff',
                    confirmButtonColor: '#667eea',
                    cancelButtonColor: '#6c757d'
                });
            });
        });
        document.getElementById('loginBtn').addEventListener('click', function() {
            Swal.fire({
                title: 'تسجيل الدخول',
                html: `
                    <input type="email" id="email" class="swal2-input" placeholder="البريد الإلكتروني" style="direction: rtl;">
                    <input type="password" id="password" class="swal2-input" placeholder="كلمة المرور" style="direction: rtl;">
                `,
                confirmButtonText: 'دخول',
                cancelButtonText: 'إلغاء',
                showCancelButton: true,
                background: '#fff',
                confirmButtonColor: '#667eea',
                cancelButtonColor: '#6c757d',
                preConfirm: () => {
                    const email = Swal.getPopup().querySelector('#email').value;
                    const password = Swal.getPopup().querySelector('#password').value;
                    if (!email || !password) {
                        Swal.showValidationMessage('يرجى ملء جميع الحقول');
                    }
                    return { email: email, password: password };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'مرحباً بك!',
                        text: 'تم تسجيل الدخول بنجاح',
                        icon: 'success',
                        confirmButtonColor: '#667eea'
                    });
                }
            });
        });
        document.getElementById('registerBtn').addEventListener('click', function() {
            Swal.fire({
                title: 'إنشاء حساب جديد',
                html: `
                    <input type="text" id="fullName" class="swal2-input" placeholder="الاسم الكامل" style="direction: rtl;">
                    <input type="email" id="email" class="swal2-input" placeholder="البريد الإلكتروني" style="direction: rtl;">
                    <input type="password" id="password" class="swal2-input" placeholder="كلمة المرور" style="direction: rtl;">
                    <input type="tel" id="phone" class="swal2-input" placeholder="رقم الهاتف" style="direction: rtl;">
                `,
                confirmButtonText: 'إنشاء الحساب',
                cancelButtonText: 'إلغاء',
                showCancelButton: true,
                background: '#fff',
                confirmButtonColor: '#667eea',
                cancelButtonColor: '#6c757d',
                preConfirm: () => {
                    const fullName = Swal.getPopup().querySelector('#fullName').value;
                    const email = Swal.getPopup().querySelector('#email').value;
                    const password = Swal.getPopup().querySelector('#password').value;
                    const phone = Swal.getPopup().querySelector('#phone').value;
                    if (!fullName || !email || !password || !phone) {
                        Swal.showValidationMessage('يرجى ملء جميع الحقول');
                    }
                    return { fullName, email, password, phone };
                }
            }).then((result) => {
                if (result.isConfirmed) {
                    Swal.fire({
                        title: 'تم إنشاء الحساب بنجاح!',
                        text: 'مرحباً بك في Mabeet',
                        icon: 'success',
                        confirmButtonColor: '#667eea'
                    });
                }
            });
        });
        document.querySelectorAll('.book-btn').forEach(button => {
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                const card = this.closest('.property-card, .student-card');
                const title = card.querySelector('h3').textContent;
                const price = card.querySelector('.property-price, .student-price').textContent;
                
                Swal.fire({
                    title: 'تأكيد الحجز',
                    html: `
                        <div class="text-start" style="direction: rtl;">
                            <h5>${title}</h5>
                            <p><strong>السعر:</strong> ${price}</p>
                            <hr>
                            <p>هل تريد المتابعة مع عملية الحجز?</p>
                        </div>
                    `,
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#667eea',
                    cancelButtonColor: '#6c757d',
                    confirmButtonText: 'نعم، احجز الآن',
                    cancelButtonText: 'إلغاء'
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: 'تم إرسال طلب الحجز!',
                            text: 'سيتم التواصل معك قريباً لتأكيد التفاصيل',
                            icon: 'success',
                            confirmButtonColor: '#667eea'
                        });
                    }
                });
            });
        });
        document.querySelectorAll('.btn-service').forEach(button => {
            button.addEventListener('click', function() {
                const serviceName = this.closest('.service-card').querySelector('h3').textContent;
                
                Swal.fire({
                    title: serviceName,
                    text: 'ستتم إعادة توجيهك لصفحة تفاصيل هذه الخدمة',
                    icon: 'info',
                    confirmButtonColor: '#667eea',
                    confirmButtonText: 'موافق'
                });
            });
        });
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const hero = document.querySelector('.hero');
            if (hero) {
                const rate = scrolled * -0.5;
                hero.style.transform = `translate3d(0, ${rate}px, 0)`;
            }
        });
        document.addEventListener('DOMContentLoaded', function() {
            const inputs = document.querySelectorAll('#searchForm input, #searchForm select');
            inputs.forEach(input => {
                input.style.pointerEvents = 'all';
                input.disabled = false;
            });
        });
