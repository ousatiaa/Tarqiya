# Tarqiya - ترقية

تطبيق PWA لمساعدة الأستاذ في حساب نقاط الترقية ومعرفة الأهلية.

## 🌐 استضافة على GitHub Pages (مجاني) — للتحديث بدون إعادة تثبيت

### 1. إنشاء مستودع (Repository)
1. اذهب إلى https://github.com/new
2. اسم المستودع: `tarqiya` (أو أي اسم)
3. اجعله Public
4. لا تضف README (سنرفعه)
5. انقر "Create repository"

### 2. رفع الملفات
في PowerShell (في مجلد Tarqiya):
```
cd "C:\Users\OUSAMA\Documents\Default Project\Tarqiya"
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/tarqiya.git
git push -u origin main
```
(استبدل YOUR_USERNAME باسمك في GitHub)

### 3. تفعيل GitHub Pages
1. في المستودع → Settings → Pages
2. Source: "Deploy from a branch"
3. Branch: `main` / folder: `/ (root)`
4. Save
5. انتظر 1-2 دقيقة. الرابط: `https://YOUR_USERNAME.github.io/tarqiya/`

### 4. إعداد التطبيق
1. افتح التطبيق (APK) على телефонك
2. اضغط **🔄 تحديث** (أعلى، في الشريط الأخضر)
3. أدخل الرابط: `https://YOUR_USERNAME.github.io/tarqiya/`
4. من الآن، التحديث = رفع ملفات جديدة → زر "🔄 تحديث" (بدون APK جديد)

### 5. تحديث التطبيق (لاحقاً)
```
cd "C:\Users\OUSAMA\Documents\Default Project\Tarqiya"
git add .
git commit -m "Update"
git push
```
ثم في التطبيق: اضغط **🔄 تحديث**.

## 📦 APK
`Tarqiya.apk` — تطبيق Android (تثبيت أولي مرة واحدة).