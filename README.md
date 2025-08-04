# Final Portfolio – Cloud Fullstack Deployment

## 🧩 Deskripsi Project
Portofolio personal berbasis **Next.js + React Three Fiber**. Dideploy ke AWS EC2 dan dikonfigurasi dengan Nginx sebagai reverse proxy serta PM2 untuk menjalankan server secara stabil. Proyek ini dilengkapi CI/CD, monitoring, dan simulasi autoscaling manual.

## 🚀 Live App
👉 http://52.221.244.177/ 

## 📦 Teknologi yang Digunakan
- Next.js 14
- React Three Fiber
- Yarn
- AWS EC2 (Ubuntu 22.04)
- PM2
- Nginx
- GitHub Actions

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

CI/CD otomatis menggunakan GitHub Actions:

* Trigger: push ke `master`
* Build project di GitHub
* SSH ke EC2
* Pull latest code
* Restart dengan PM2

📎 [GitHub Actions Workflow](https://github.com/hazzikri/final-portofolio/actions)

## 🔐 Keamanan

* Secrets (seperti `.env.local`) tidak dimasukkan ke Git
* Akses EC2 dibatasi lewat Security Group

## 📈 Monitoring

Monitoring menggunakan PM2 (`pm2 monit`, `pm2 logs`).

📸 Screenshot:

![PM2 Monitoring](/public/pm2-monitoring.png)

## 📊 Simulasi Auto Scaling (Manual via CLI)

Script autoscaling: akan menjalankan instance EC2 baru jika CPU usage > 90%

📂 File: `scripts/auto-scale.sh`

```bash
#!/bin/bash

CPU_THRESHOLD=90
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}' | cut -d'.' -f1)

echo "📊 CPU Usage saat ini: ${CPU_USAGE}%"

if [ "$CPU_USAGE" -gt "$CPU_THRESHOLD" ]; then
  echo "🔥 CPU usage > ${CPU_THRESHOLD}%. Memulai instance EC2 baru..."

  aws ec2 run-instances \
    --image-id ami-0abcdef1234567890 \
    --count 1 \
    --instance-type t3.micro \
    --key-name my-key \
    --security-groups my-security-group \
    --tag-specifications 'ResourceType=instance,Tags=[{Key=Name,Value=autoscaled-instance}]'
else
  echo "✅ CPU usage normal. Tidak ada action."
fi
```

> 💡 Kamu bisa menjalankan script ini di server atau integrasikan dengan CloudWatch untuk real autoscaling.

## 📄 Lisensi

Proyek ini dibuat untuk kebutuhan portofolio dan latihan DevOps.
