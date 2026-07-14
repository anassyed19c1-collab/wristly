# SNS topic - where alarm notifications get sent
resource "aws_sns_topic" "alerts" {
  name = "${var.project_name}-alerts"
}

resource "aws_sns_topic_subscription" "email" {
  topic_arn = aws_sns_topic.alerts.arn
  protocol  = "email"
  endpoint  = var.alert_email
}

# Alarm: fires when average CPU across the ASG goes above 70% for 2 checks in a row
resource "aws_cloudwatch_metric_alarm" "high_cpu" {
  alarm_name          = "${var.project_name}-high-cpu"
  comparison_operator = "GreaterThanThreshold"
  evaluation_periods  = 2
  metric_name         = "CPUUtilization"
  namespace           = "AWS/EC2"
  period              = 120
  statistic           = "Average"
  threshold           = 70

  dimensions = {
    AutoScalingGroupName = aws_autoscaling_group.app.name
  }

  alarm_description = "Triggers when average CPU is high across Wristly app servers"
  alarm_actions      = [aws_sns_topic.alerts.arn]

  tags = {
    Name = "${var.project_name}-high-cpu-alarm"
  }
}

# Alarm: fires if RDS free storage drops too low
resource "aws_cloudwatch_metric_alarm" "low_storage" {
  alarm_name          = "${var.project_name}-rds-low-storage"
  comparison_operator = "LessThanThreshold"
  evaluation_periods  = 1
  metric_name         = "FreeStorageSpace"
  namespace           = "AWS/RDS"
  period              = 300
  statistic           = "Average"
  threshold           = 2000000000 # ~2GB in bytes

  dimensions = {
    DBInstanceIdentifier = aws_db_instance.main.id
  }

  alarm_description = "Triggers when RDS free storage drops below 2GB"
  alarm_actions      = [aws_sns_topic.alerts.arn]

  tags = {
    Name = "${var.project_name}-rds-storage-alarm"
  }
}