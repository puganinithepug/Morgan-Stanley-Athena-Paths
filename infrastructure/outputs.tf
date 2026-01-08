output "public_ip" {
  value = aws_eip.web_eip.public_ip
}

output "app_url" {
  value = "http://${aws_eip.web_eip.public_ip}"
}

