# Portfolio – Cloud Fullstack Deployment

## 🧩 Deskripsi Project
Portofolio personal berbasis **Next.js + React Three Fiber**. Dideploy ke AWS EC2 dan dikonfigurasi dengan Nginx sebagai reverse proxy serta PM2 untuk menjalankan server secara stabil.

## 🚀 Live App
👉 http://<IP-PUBLIC-EC2>  
(Ganti dengan domain jika tersedia)

## 📦 Teknologi yang Digunakan
- Next.js 14
- React Three Fiber
- Yarn
- AWS EC2 (Ubuntu 22.04)
- PM2
- Nginx
- GitHub Actions (CI/CD)

## ⚙️ Deployment
Project dijalankan di EC2 menggunakan PM2 dan reverse proxy oleh Nginx.

### Perintah Manual:
```bash
yarn install
yarn build
yarn start
````

### Perintah Production:

```bash
pm2 start yarn --name final-portfolio -- start
pm2 save
```

## 🔁 CI/CD

Menggunakan GitHub Actions. Pipeline akan otomatis build project setiap kali push ke `main`.

📎 Link: [https://github.com/hazzikri/final-portofolio/actions](https://github.com/hazzikri/final-portofolio/actions)

## 🔐 Keamanan

* Port terbatas via Security Group
* Secrets disimpan di `.env.local` dan di-ignore dari Git

## 📈 Monitoring

Monitoring menggunakan PM2:

```bash
pm2 monit
pm2 logs
```

## 📊 Scaling

Project ini berjalan di satu EC2 instance. Namun, scaling dapat dilakukan manual:

* Menambah instance EC2
* Load Balancer + Auto Scaling Group (opsional)

## 📄 Lisensi

Proyek ini dibuat untuk kebutuhan portofolio dan latihan DevOps.
