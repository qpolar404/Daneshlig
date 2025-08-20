        document.addEventListener('DOMContentLoaded', function() {
            const form = document.getElementById('registerForm');
            const inputs = form.querySelectorAll('input');
            const usernameInput = document.getElementById('username');
            const submit= document.getElementById('submit');
            
            // اعتبارسنجی هنگام تایپ
            inputs.forEach(input => {
                input.addEventListener('input', function() {
                    validateInput(this);
                });
            });
            
            // اعتبارسنجی ویژه نام کاربری هنگام تایپ
            usernameInput.addEventListener('input', function() {
                // جلوگیری از وارد کردن کاراکترهای نامعتبر
                const regex = /^[a-zA-Z0-9_\u0600-\u06FF]+$/;
                if ( !regex.test(this.value)){
                    this.value = this.value.replace(/[^a-zA-Z0-9_\u0600-\u06FF]/g, '');
                };
                validateInput(this);
        });
            
            // اعتبارسنجی هنگام ارسال فرم
            submit.addEventListener('click', function(e) {
                e.preventDefault();
                
                let isValid = true;
                inputs.forEach(input => {
                    if (!validateInput(input)) {
                        isValid = false;
                    }
                });
                
                if (isValid) {
                    form.submit();
                } else {
                    // نمایش پیام خطای کلی اگر نیاز باشد
                    alert('لطفاً اطلاعات فرم را به درستی تکمیل کنید.');
                }
            });
            
            // تابع اعتبارسنجی هر فیلد
            function validateInput(input) {
                const errorElement = document.getElementById(`${input.id}Error`);
                
                // بررسی فیلدهای خالی
                if (input.value.trim() === '') {
                    input.classList.add('input-error');
                    input.classList.remove('input-success');
                    errorElement.style.display = 'block';
                    errorElement.textContent = 'این فیلد نمی‌تواند خالی باشد';
                    return false;
                }
                
                // اعتبارسنجی خاص برای هر فیلد
                if (input.id === 'username') {
                    const username = input.value.trim();
                    
                    // بررسی طول نام کاربری
                    if (username.length < 3 || username.length > 30) {
                        input.classList.add('input-error');
                        input.classList.remove('input-success');
                        errorElement.style.display = 'block';
                        errorElement.textContent = 'نام کاربری باید بین ۳ تا ۳۰ کاراکتر باشد';
                        return false;
                    }
                    
                    // بررسی شروع با عدد
                    if (/^\d/.test(username)) {
                        input.classList.add('input-error');
                        input.classList.remove('input-success');
                        errorElement.style.display = 'block';
                        errorElement.textContent = 'نام کاربری نمی‌تواند با عدد شروع شود';
                        return false;
                    }
                    
                    // بررسی کاراکترهای مجاز (حروف فارسی، انگلیسی، اعداد و زیرخط)
                    const validCharsRegex = /^[a-zA-Z0-9_\u0600-\u06FF]+$/;
                    if (!validCharsRegex.test(username)) {
                        input.classList.add('input-error');
                        input.classList.remove('input-success');
                        errorElement.style.display = 'block';
                        errorElement.textContent = 'فقط حروف فارسی/انگلیسی، اعداد و _ مجاز هستند';
                        return false;
                    }
                    
                    // بررسی ایموجی و کاراکترهای خاص
                    const emojiRegex = /[\u{1F600}-\u{1F6FF}]/u;
                    if (emojiRegex.test(username)) {
                        input.classList.add('input-error');
                        input.classList.remove('input-success');
                        errorElement.style.display = 'block';
                        errorElement.textContent = 'استفاده از ایموجی مجاز نیست';
                        return false;
                    }
                }
                
                if (input.id === 'password' && input.value.length < 6) {
                    input.classList.add('input-error');
                    input.classList.remove('input-success');
                    errorElement.style.display = 'block';
                    errorElement.textContent = 'رمز عبور باید حداقل ۶ کاراکتر داشته باشد';
                    return false;
                }
                
                // اگر همه چیز درست بود
                input.classList.remove('input-error');
                input.classList.add('input-success');
                errorElement.style.display = 'none';
                return true;
            }
            
            // اعتبارسنجی هنگام از دست دادن فوکوس
            inputs.forEach(input => {
                input.addEventListener('blur', function() {
                    validateInput(this);
                });
            });
        });