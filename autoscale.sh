#!/bin/bash

# Auto-scale EC2 jika CPU > 90%

# Threshold CPU
CPU_THRESHOLD=90

# Ambil penggunaan CPU real-time
CPU_USAGE=$(top -bn1 | grep "Cpu(s)" | awk '{print $2 + $4}' | cut -d'.' -f1)

echo "📊 CPU Usage saat ini: ${CPU_USAGE}%"

# Bandingkan dan tentukan scaling
if [ "$CPU_USAGE" -gt "$CPU_THRESHOLD" ]; then
  echo "🔥 CPU usage > ${CPU_THRESHOLD}%. Memulai instance EC2 baru..."

  # Ganti parameter ini sesuai konfigurasi kamu
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
