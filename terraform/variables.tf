variable "project_name" {
  default = "wristly"
}

variable "vpc_cidr" {
  default = "10.0.0.0/16"
}


variable "db_username" {
  default = "wristly_admin"
}

variable "db_password" {
  sensitive = true
}

variable "alert_email" {
  description = "Email to receive CloudWatch alarm notifications"
}

variable "database_url" {
  description = "Full MySQL connection string for RDS"
  sensitive   = true
}