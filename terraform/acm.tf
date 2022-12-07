resource "aws_acm_certificate" "www" {
  domain_name       = local.domain
  validation_method = "DNS"

  subject_alternative_names = [
    "*.${local.domain}"
  ]

  tags = {
    Name : local.domain
  }
}

resource "aws_route53_record" "certificate" {
  for_each = {
    for dvo in aws_acm_certificate.www.domain_validation_options : dvo.domain_name => {
      name   = dvo.resource_record_name
      record = dvo.resource_record_value
      type   = dvo.resource_record_type
    }
  }

  allow_overwrite = true
  zone_id         = data.aws_route53_zone.main.zone_id
  name            = each.value.name
  type            = each.value.type
  ttl             = 60

  records = [
    each.value.record
  ]
}

resource "aws_acm_certificate_validation" "www" {
  certificate_arn = aws_acm_certificate.www.arn
  validation_record_fqdns = [
    for record in aws_route53_record.certificate : record.fqdn
  ]
}
