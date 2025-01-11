variable "domain" {
  type = string
}

variable "domain_s3" {
  type = string
}

variable "certificate_arn" {
  type = string
}

output "arn" {
  value = aws_cloudfront_distribution.www.arn
}

output "domain" {
  value = aws_cloudfront_distribution.www.domain_name
}

output "zone_id" {
  value = aws_cloudfront_distribution.www.hosted_zone_id
}