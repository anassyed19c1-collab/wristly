packer {
  required_plugins {
    amazon = {
      version = ">= 1.2.0"
      source  = "github.com/hashicorp/amazon"
    }
  }
}

variable "region" {
  default = "us-east-1"
}

variable "github_repo" {
  default = "https://github.com/anassyed19c1-collab/wristly.git"
}

source "amazon-ebs" "wristly" {
  ami_name      = "wristly-app-{{timestamp}}"
  instance_type = "t3.micro"
  region        = var.region
  ssh_timeout = "10m"

  source_ami_filter {
    filters = {
      name                = "al2023-ami-*-x86_64"
      root-device-type    = "ebs"
      virtualization-type = "hvm"
    }
    owners      = ["amazon"]
    most_recent = true
  }

  ssh_username = "ec2-user"
}

build {
  name    = "wristly-app-image"
  sources = ["source.amazon-ebs.wristly"]

  provisioner "shell" {
    inline = [
      "set -e",
      "sudo dnf update -y",
      "sudo dnf install -y --setopt=install_weak_deps=False nodejs20 nodejs20-npm git",
      "sudo npm install -g pm2",
      "git clone ${var.github_repo} /home/ec2-user/app",
      "cd /home/ec2-user/app && npm ci --no-audit --fetch-retries=5 --fetch-retry-mintimeout=5000",
      "cd /home/ec2-user/app && npm run build",
      "sudo pm2 startup systemd -u ec2-user --hp /home/ec2-user"
    ]
  }
}