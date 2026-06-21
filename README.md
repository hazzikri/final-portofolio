# 3D Interactive Portfolio — Cloud Fullstack Deployment

[![Next.js Web App](https://img.shields.io/badge/Web%20App-Next.js%2014-000000?style=for-the-badge&logo=nextdotjs)](https://hazzikri.github.io/final-portofolio/)
[![React Three Fiber](https://img.shields.io/badge/3D%20Graphics-React%20Three%20Fiber-black?style=for-the-badge&logo=react)](https://docs.pmnd.rs/react-three-fiber/)
[![AWS EC2](https://img.shields.io/badge/Infrastructure-AWS%20EC2-FF9900?style=for-the-badge&logo=amazon-aws)](https://aws.amazon.com/ec2/)
[![CI/CD Pipelines](https://img.shields.io/badge/CI%20/_%20CD-GitHub%20Actions-2088FF?style=for-the-badge&logo=github-actions)](https://github.com/hazzikri/final-portofolio/actions)

An interactive, 3D web application demonstrating personal portfolio showcases. Built using **Next.js 14** and **React Three Fiber (R3F)**, containerized, and deployed to an **AWS EC2** virtual server behind an **Nginx Reverse Proxy**.

---

## 🎨 Interactive Preview
👉 **Live Deployment:** http://35.208.77.156/ (Temporary Cloud IP)

---

## 🛠️ Technology Stack

* **Frontend Framework:** Next.js 14 (App Router)
* **3D Components:** React Three Fiber & Three.js (WebGL rendering)
* **Process Manager:** PM2 (Node.js daemon manager)
* **Web Server & Reverse Proxy:** Nginx
* **Infrastructure Host:** AWS EC2 Virtual Machine (Ubuntu Server)
* **CI/CD Platform:** GitHub Actions

---

## ⚙️ Deployment & Running Locally

### Running Locally
To launch the development server on your local machine:
```bash
# Clone the repository
git clone https://github.com/hazzikri/final-portofolio.git
cd final-portofolio

# Install dependencies & run dev
yarn install
yarn dev
```

### Server Production Configuration
To host the application persistently on a virtual machine (EC2):
```bash
# Build the production bundle
yarn build

# Start Next.js using PM2 daemon manager
pm2 start yarn --name "final-portfolio" -- start

# Save daemon state to survive system reboots
pm2 save
```

---

## 🔁 CI/CD Deployment Automation

Deployments are automated through a GitHub Actions pipeline defined in `.github/workflows/deploy.yml`:
1. **Trigger Event:** Triggers on any commit pushed to the `master` branch.
2. **Build Stage:** Installs dependencies and runs `yarn build` on the GitHub runner to verify compilation.
3. **Deploy Stage:** Connects to the AWS EC2 container instance securely via SSH, pulls the latest commits, rebuilds, and restarts the PM2 process.

---

## 🔒 Security Hardening

* **Environment Isolation:** Crucial API credentials and site metadata are stored strictly in `.env.local` variables, excluded from version control via `.gitignore`.
* **Network Firewalls:** Inbound access via the EC2 Security Group is restricted solely to HTTP (Port `80`), HTTPS (Port `443`), and SSH (Port `22` restricted to trusted IPs).
* **Nginx Reverse Proxy:** Shields the Next.js execution port (`3000`) from direct external traffic, managing system resource headers and client connections.
