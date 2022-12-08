data "aws_route53_zone" "main" {
  name = local.domain
}

resource "aws_route53_record" "root_ipv4" {
  zone_id = data.aws_route53_zone.main.id
  name    = local.domain
  type    = "A"

  alias {
    name                   = aws_cloudfront_distribution.www.domain_name
    zone_id                = aws_cloudfront_distribution.www.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_ipv4" {
  zone_id = data.aws_route53_zone.main.id
  name    = "www.${local.domain}"
  type    = "A"

  alias {
    name                   = aws_route53_record.root_ipv4.name
    zone_id                = data.aws_route53_zone.main.id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "root_ipv6" {
  zone_id = data.aws_route53_zone.main.id
  name    = local.domain
  type    = "AAAA"

  alias {
    name                   = aws_cloudfront_distribution.www.domain_name
    zone_id                = aws_cloudfront_distribution.www.hosted_zone_id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "www_ipv6" {
  zone_id = data.aws_route53_zone.main.id
  name    = "www.${local.domain}"
  type    = "AAAA"

  alias {
    name                   = aws_route53_record.root_ipv6.name
    zone_id                = data.aws_route53_zone.main.id
    evaluate_target_health = false
  }
}

resource "aws_route53_record" "webshell_ipv4" {
  zone_id = data.aws_route53_zone.main.id
  name    = aws_apigatewayv2_domain_name.webshell.domain_name
  type    = "A"

  alias {
    name    = aws_apigatewayv2_domain_name.webshell.domain_name_configuration[0].target_domain_name
    zone_id = aws_apigatewayv2_domain_name.webshell.domain_name_configuration[0].hosted_zone_id

    evaluate_target_health = false
  }
}

resource "aws_route53_record" "webshell_ipv6" {
  zone_id = data.aws_route53_zone.main.id
  name    = aws_apigatewayv2_domain_name.webshell.domain_name
  type    = "AAAA"

  alias {
    name    = aws_apigatewayv2_domain_name.webshell.domain_name_configuration[0].target_domain_name
    zone_id = aws_apigatewayv2_domain_name.webshell.domain_name_configuration[0].hosted_zone_id

    evaluate_target_health = false
  }
}